import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import api from '../utils/axios.js'
import { isTotpEnabled, verifyTotp, getStoredTotp, saveTotp, removeTotp } from '../utils/totp.js'

const TOKEN_KEY = 'token'
const AUTH_KEY = 'auth'
const PENDING_2FA_KEY = 'pqs.pending2fa'

const AuthContext = createContext(null)

const loadAuth = () => {
  try { return JSON.parse(localStorage.getItem(AUTH_KEY) || 'null') } catch { return null }
}
const saveAuth = (auth) =>
  auth ? localStorage.setItem(AUTH_KEY, JSON.stringify(auth))
       : localStorage.removeItem(AUTH_KEY)

// Pending 2FA = user passed email-OTP but the dashboard is still gated behind
// the authenticator-app code. Stored in sessionStorage so a refresh on /verify-2fa
// keeps state, but a closed tab clears it.
const loadPending2fa = () => {
  try { return JSON.parse(sessionStorage.getItem(PENDING_2FA_KEY) || 'null') } catch { return null }
}
const savePending2fa = (p) =>
  p ? sessionStorage.setItem(PENDING_2FA_KEY, JSON.stringify(p))
    : sessionStorage.removeItem(PENDING_2FA_KEY)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [pending2fa, setPending2fa] = useState(null) // { user, token } awaiting TOTP
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = loadAuth()
    if (stored?.token && stored?.user) {
      // Backfill role for sessions persisted before role-defaulting was added.
      const u = stored.user.role ? stored.user : { ...stored.user, role: 'investor' }
      setUser(u)
      setToken(stored.token)
    }
    const pending = loadPending2fa()
    if (pending?.user && pending?.token) setPending2fa(pending)
    setHydrated(true)
  }, [])

  // Step 1 — register: server returns { success, message, user:{email}, protect }
  const register = useCallback(async ({ name, email, password }) => {
    const { data } = await api.post('/auth/register', { name, email, password })
    if (!data.success) {
      throw new Error(data.message || 'Registration failed')
    }
    localStorage.setItem('protectverify', data.protect)
    localStorage.setItem('useremail', data.user.email)
    localStorage.setItem('otp_timer_start', Date.now().toString())
    return data
  }, [])

  // Step 2 — login: server returns OTP-pending response (success:true, no token yet)
  // Possible flows:
  //   condition === 204 -> email not verified, route to /verify-email
  //   success === true  -> OTP sent, route to /verify-login
  //   success === false -> wrong creds, attemptsLeft may be present
  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })

    if (data.condition === 204) {
      localStorage.setItem('protectverify', data.protect)
      localStorage.setItem('useremail', data.email)
      localStorage.setItem('otp_timer_start', Date.now().toString())
      return { step: 'verify-email', message: data.message }
    }

    if (data.success) {
      localStorage.setItem('protectlogin', data.protect)
      localStorage.setItem('useremail', data.user.email)
      localStorage.setItem('otp_timer_start', Date.now().toString())
      return { step: 'verify-login', message: data.message }
    }

    const err = new Error(data.message || 'Invalid credentials')
    err.attemptsLeft = data.attemptsLeft
    throw err
  }, [])

  // Verify email OTP after registration -> token issued.
  // Email verification means the user just enrolled, so they cannot have set
  // up TOTP yet — log them straight in.
  const verifyEmail = useCallback(async (code) => {
    const { data } = await api.post('/auth/verify-email', { code })
    if (!data.success) throw new Error(data.message || 'Verification failed')
    persistSession(data.user, data.token)
    return { ...data, requires2fa: false }
  }, [])

  // Verify login OTP after login. If the user has a TOTP secret stored locally,
  // hold them in pending2fa state instead of finishing the login.
  const verifyLogin = useCallback(async (code) => {
    const { data } = await api.post('/auth/verify-login', { code })
    if (!data.success) throw new Error(data.message || 'Verification failed')

    const requires2fa = isTotpEnabled(data.user?._id)
    if (requires2fa) {
      const pending = { user: { ...data.user, role: data.user?.role || 'investor' }, token: data.token }
      setPending2fa(pending)
      savePending2fa(pending)
      // Clean up email-OTP scratchpad even though we haven't finalized session.
      localStorage.removeItem('protectlogin')
      localStorage.removeItem('useremail')
      localStorage.removeItem('otp_timer_start')
      return { ...data, requires2fa: true }
    }

    persistSession(data.user, data.token)
    return { ...data, requires2fa: false }
  }, [])

  // Confirm the authenticator-app code and finalize the session.
  const verify2fa = useCallback((code) => {
    if (!pending2fa) throw new Error('No 2FA challenge in progress.')
    const stored = getStoredTotp(pending2fa.user._id)
    if (!stored?.secret) {
      // Edge case: secret was cleared in another tab. Fail safely back to login.
      setPending2fa(null)
      savePending2fa(null)
      throw new Error('Authenticator is no longer registered on this device. Please sign in again.')
    }
    if (!verifyTotp(stored.secret, code)) {
      throw new Error('Incorrect or expired code. Try the latest code from your authenticator app.')
    }
    persistSession(pending2fa.user, pending2fa.token)
    setPending2fa(null)
    savePending2fa(null)
  }, [pending2fa])

  const cancel2fa = useCallback(() => {
    setPending2fa(null)
    savePending2fa(null)
  }, [])

  // Settings: enroll a new authenticator. Caller passes the base32 secret it
  // just generated and a confirmation code — both must match before we save.
  const enrollTotp = useCallback((secret, code) => {
    if (!user?._id) throw new Error('You must be signed in to enroll an authenticator.')
    if (!verifyTotp(secret, code)) {
      throw new Error('Incorrect code. Make sure your phone time is correct and try the latest code.')
    }
    saveTotp(user._id, secret)
    return true
  }, [user])

  const disableTotp = useCallback((code) => {
    if (!user?._id) return
    const stored = getStoredTotp(user._id)
    if (!stored?.secret) return
    if (!verifyTotp(stored.secret, code)) {
      throw new Error('Incorrect code. Enter your current authenticator code to disable 2FA.')
    }
    removeTotp(user._id)
  }, [user])

  const resendOtp = useCallback(async (email, mode = 'login') => {
    const path = mode === 'login' ? '/auth/login-otp-again' : '/auth/send-otp-again'
    const { data } = await api.post(path, { email })
    if (!data.success) throw new Error(data.message || 'Failed to resend OTP')
    localStorage.setItem('otp_timer_start', Date.now().toString())
    return data
  }, [])

  const forgotPassword = useCallback(async (email) => {
    const { data } = await api.post('/auth/forgot-password', { email })
    if (!data.success) throw new Error(data.message || 'Failed to send reset link')
    return data
  }, [])

  const resetPassword = useCallback(async (token, password) => {
    const { data } = await api.post(`/auth/reset-password/${token}`, { password })
    if (!data.success) throw new Error(data.message || 'Password reset failed')
    return data
  }, [])

  const persistSession = (nextUser, nextToken) => {
    // Backend doesn't return a `role`; default to 'investor' so dashboard chrome
    // (sidebar, sections) renders without changes to existing role-driven UI.
    const userWithRole = { ...nextUser, role: nextUser?.role || 'investor' }
    setUser(userWithRole)
    setToken(nextToken)
    localStorage.setItem(TOKEN_KEY, nextToken)
    saveAuth({ user: userWithRole, token: nextToken })
    localStorage.removeItem('protectlogin')
    localStorage.removeItem('protectverify')
    localStorage.removeItem('useremail')
    localStorage.removeItem('otp_timer_start')
  }

  const logout = useCallback(async () => {
    try { await api.post('/auth/logout') } catch { /* ignore */ }
    setUser(null)
    setToken(null)
    localStorage.removeItem(TOKEN_KEY)
    saveAuth(null)
  }, [])

  const updateProfile = useCallback((patch) => {
    if (!user) return
    const next = { ...user, ...patch }
    setUser(next)
    saveAuth({ user: next, token })
  }, [user, token])

  return (
    <AuthContext.Provider value={{
      user,
      token,
      hydrated,
      pending2fa,
      totpEnabled: Boolean(user && isTotpEnabled(user._id)),
      register,
      login,
      verifyEmail,
      verifyLogin,
      verify2fa,
      cancel2fa,
      enrollTotp,
      disableTotp,
      resendOtp,
      forgotPassword,
      resetPassword,
      logout,
      updateProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
