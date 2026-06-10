import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, Mail, RefreshCw, ShieldCheck } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import AmbientBackdrop from '../../components/AmbientBackdrop.jsx'

const OTP_TIMER_KEY = 'otp_timer_start'
const OTP_DURATION = 600 // 10 minutes

export default function VerifyOtp({ mode }) {
  const { verifyEmail, verifyLogin, resendOtp, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const protectKey = mode === 'login' ? 'protectlogin' : 'protectverify'
  const email = typeof window !== 'undefined' ? localStorage.getItem('useremail') : ''

  const inputs = useRef([])
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)
  const [timeLeft, setTimeLeft] = useState(OTP_DURATION)
  const [expired, setExpired] = useState(false)

  const from = location.state?.from || '/dashboard'

  // If user is already authenticated, skip OTP entirely.
  // Otherwise, if there is no `protect` token in storage, the user landed here without
  // first hitting login/register — bounce them back.
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true })
      return
    }
    if (!localStorage.getItem(protectKey)) {
      navigate(mode === 'login' ? '/login' : '/register', { replace: true })
    }
  }, [user, mode, navigate, protectKey, from])

  useEffect(() => {
    const start = localStorage.getItem(OTP_TIMER_KEY)
    if (start) {
      const elapsed = Math.floor((Date.now() - Number(start)) / 1000)
      const remaining = OTP_DURATION - elapsed
      if (remaining > 0) {
        setTimeLeft(remaining)
        setExpired(false)
      } else {
        setTimeLeft(0)
        setExpired(true)
      }
    } else {
      localStorage.setItem(OTP_TIMER_KEY, String(Date.now()))
    }
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) {
      setExpired(true)
      return
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const obfuscate = (e) => {
    if (!e) return ''
    const [name, domain] = e.split('@')
    if (!domain) return e
    const masked = name.length <= 2 ? name : `${name.slice(0, 2)}${'*'.repeat(Math.max(1, name.length - 2))}`
    return `${masked}@${domain}`
  }

  const onChange = (i, value) => {
    const next = [...code]
    if (value.length > 1) {
      const pasted = value.slice(0, 6).split('')
      for (let k = 0; k < 6; k++) next[k] = pasted[k] || ''
      setCode(next)
      const lastFilled = next.findLastIndex((d) => d !== '')
      const focusIdx = lastFilled < 5 ? lastFilled + 1 : 5
      inputs.current[focusIdx]?.focus()
    } else {
      next[i] = value.replace(/[^0-9]/g, '').slice(0, 1)
      setCode(next)
      if (next[i] && i < 5) inputs.current[i + 1]?.focus()
    }
  }

  const onKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 5) inputs.current[i + 1]?.focus()
  }

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (expired) {
      setError('Your code has expired. Please request a new one.')
      return
    }
    const final = code.join('')
    if (final.length !== 6) {
      setError('Please enter the full 6-digit code.')
      return
    }
    setSubmitting(true)
    try {
      const data = mode === 'login' ? await verifyLogin(final) : await verifyEmail(final)
      toast.success(data.message)
      // If the user has an authenticator-app enrolled, the AuthContext holds
      // the session in pending2fa state — route to the TOTP screen instead of
      // the destination.
      if (data.requires2fa) {
        navigate('/verify-2fa', { replace: true, state: { from } })
      } else {
        navigate(from, { replace: true })
      }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const resend = async () => {
    if (!email) return
    setResending(true)
    setError('')
    try {
      const data = await resendOtp(email, mode === 'login' ? 'login' : 'register')
      toast.success(data.message)
      setTimeLeft(OTP_DURATION)
      setExpired(false)
      setCode(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] grid place-items-center">
      <AmbientBackdrop />
      <div className="container-page relative max-w-xl w-full py-10 sm:py-16">
        <Link to={mode === 'login' ? '/login' : '/register'} className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-6 sm:mb-8">
          <ArrowLeft size={14} /> Back
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-5 sm:p-8 md:p-10">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300 flex-shrink-0">
              <Mail size={18} />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-300/80">
                {mode === 'login' ? 'Verify login' : 'Verify email'}
              </div>
              <div className="font-display text-xl sm:text-2xl leading-tight">Enter your 6-digit code.</div>
            </div>
          </div>

          <p className="text-sm text-sand-50/65 leading-relaxed break-words">
            We sent a verification code to <span className="text-gold-200 break-all">{obfuscate(email)}</span>.
            The code expires in <span className="text-gold-200 font-mono whitespace-nowrap">{formatTime(timeLeft)}</span>.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-5">
            <div className="otp-row">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => onChange(i, e.target.value)}
                  onKeyDown={(e) => onKeyDown(i, e)}
                  className="otp-cell"
                  autoFocus={i === 0}
                  autoComplete="one-time-code"
                />
              ))}
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                <span className="break-words min-w-0">{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || expired || code.some((d) => d === '')}
              className="btn-primary w-full justify-center disabled:opacity-40"
            >
              {submitting ? 'Verifying…' : expired ? 'Code expired' : <>Verify <ArrowRight size={14}/></>}
            </button>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-xs text-sand-50/55">
              <button
                type="button"
                onClick={resend}
                disabled={resending}
                className="inline-flex items-center gap-1.5 text-gold-300 hover:text-gold-200 disabled:opacity-50"
              >
                <RefreshCw size={12} className={resending ? 'animate-spin' : ''} />
                {resending ? 'Sending…' : 'Resend code'}
              </button>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={12} className="text-gold-300" /> Encrypted in transit
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .otp-row {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 6px;
          width: 100%;
        }
        @media (min-width: 380px) { .otp-row { gap: 8px; } }
        @media (min-width: 480px) { .otp-row { gap: 10px; } }

        .otp-cell {
          width: 100%;
          min-width: 0;
          aspect-ratio: 1 / 1;
          max-width: 56px;
          margin: 0 auto;
          background: #0f1218;
          border: 1px solid rgba(247,244,238,0.08);
          border-radius: 12px;
          color: #f7f4ee;
          font-size: clamp(18px, 5.5vw, 22px);
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          text-align: center;
          padding: 0;
        }
        .otp-cell:focus {
          outline: none;
          border-color: rgba(216,187,106,0.6);
          box-shadow: 0 0 0 3px rgba(216,187,106,0.08);
        }
      `}</style>
    </div>
  )
}
