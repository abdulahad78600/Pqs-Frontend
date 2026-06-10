import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, ShieldCheck, KeyRound, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import AmbientBackdrop from '../../components/AmbientBackdrop.jsx'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [attemptsLeft, setAttemptsLeft] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from || '/dashboard'

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setAttemptsLeft(null)

    if (!email.includes('@')) {
      setError("Please include '@' in your email.")
      return
    }
    if (!password) {
      setError('Password is required.')
      return
    }

    setSubmitting(true)
    try {
      const result = await login(email, password)
      toast.success(result.message)
      if (result.step === 'verify-email') {
        navigate('/verify-email', { state: { from } })
      } else if (result.step === 'verify-login') {
        navigate('/verify-login', { state: { from } })
      }
    } catch (err) {
      setError(err.message)
      if (err.attemptsLeft !== undefined) setAttemptsLeft(err.attemptsLeft)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] grid place-items-center">
      <AmbientBackdrop />
      <div className="container-page relative max-w-xl w-full py-16">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-8">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
              <KeyRound size={18} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-300/80">Sign In</div>
              <div className="font-display text-2xl">Welcome back.</div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <Field label="Email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@firm.com"
                autoFocus
              />
            </Field>
            <Field label="Password">
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-50/55 hover:text-gold-300"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-sand-50/55">
                <input type="checkbox" className="accent-gold-500" /> Remember me
              </label>
              <Link to="/forgot-password" className="text-gold-300 hover:text-gold-200">Forgot password?</Link>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            {attemptsLeft !== null && attemptsLeft >= 0 && (
              <div className="text-xs text-rose-300/90">
                {attemptsLeft === 0
                  ? 'Account locked. Please contact support@pqs.fund.'
                  : `Attempts remaining: ${attemptsLeft}`}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
              {submitting ? 'Signing in…' : <>Sign in <ArrowRight size={14}/></>}
            </button>

            <div className="flex items-center gap-2 text-[11px] text-sand-50/55 pt-2">
              <ShieldCheck size={12} className="text-gold-300" />
              <span>A 6-digit verification code will be sent to your email.</span>
            </div>
          </form>
        </motion.div>

        <div className="mt-6 text-center text-sm text-sand-50/55">
          New here? <Link to="/register" className="text-gold-300 hover:text-gold-200">Create an account</Link>
        </div>
      </div>

      <style>{`
        .input { width: 100%; background: #0f1218; border: 1px solid rgba(247,244,238,0.08); border-radius: 12px; padding: 12px 14px; color: #f7f4ee; font-size: 14px; }
        .input:focus { outline: none; border-color: rgba(216,187,106,0.5); box-shadow: 0 0 0 3px rgba(216,187,106,0.08); }
        .input::placeholder { color: rgba(247,244,238,0.35); }
      `}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">{label}</span>
      {children}
    </label>
  )
}
