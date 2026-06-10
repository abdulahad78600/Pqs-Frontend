import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, KeyRound, Eye, EyeOff } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import AmbientBackdrop from '../../components/AmbientBackdrop.jsx'

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#^()_+\-=[\]{};':"\\|,.<>/~])[A-Za-z\d@$!%*?&.#^()_+\-=[\]{};':"\\|,.<>/~]{8,}$/

export default function ResetPassword() {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const { token } = useParams()

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')

    if (!passwordRegex.test(password)) {
      return setError('Password must be at least 8 chars with uppercase, lowercase, number, and special character.')
    }
    if (password !== confirm) return setError('Passwords do not match.')

    setSubmitting(true)
    try {
      const data = await resetPassword(token, password)
      toast.success(data.message || 'Password reset successfully.')
      navigate('/login', { replace: true })
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative min-h-[calc(100vh-5rem)] grid place-items-center">
      <AmbientBackdrop />
      <div className="container-page relative max-w-xl w-full py-16">
        <Link to="/login" className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-8">
          <ArrowLeft size={14} /> Back to sign in
        </Link>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-8 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
              <KeyRound size={18} />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-gold-300/80">Set new password</div>
              <div className="font-display text-2xl">Choose a strong password.</div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <Field label="New password">
              <div className="relative">
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pr-10"
                  placeholder="Min 8 chars · upper · lower · number · symbol"
                  minLength={8}
                  autoFocus
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

            <Field label="Confirm new password">
              <div className="relative">
                <input
                  required
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input pr-10"
                  placeholder="Re-enter your new password"
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-50/55 hover:text-gold-300"
                  tabIndex={-1}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
              {submitting ? 'Resetting…' : <>Reset password <ArrowRight size={14}/></>}
            </button>
          </form>
        </motion.div>
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
