import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, KeyRound, Mail, CheckCircle2 } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import AmbientBackdrop from '../../components/AmbientBackdrop.jsx'

export default function ForgotPassword() {
  const { forgotPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.includes('@')) {
      setError("Please include '@' in your email.")
      return
    }
    setSubmitting(true)
    try {
      const data = await forgotPassword(email)
      toast.success(data.message)
      setSent(true)
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
          {!sent ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
                  <KeyRound size={18} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">Forgot password</div>
                  <div className="font-display text-2xl">Reset your password.</div>
                </div>
              </div>
              <p className="text-sm text-sand-50/65 leading-relaxed mb-6">
                Enter the email address linked to your account. We'll send you a secure link to set a new password.
              </p>
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

                {error && (
                  <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                    <AlertCircle size={14} /> {error}
                  </div>
                )}

                <button type="submit" disabled={submitting} className="btn-primary w-full justify-center">
                  {submitting ? 'Sending link…' : <>Send reset link <ArrowRight size={14}/></>}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-2">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 grid place-items-center text-emerald-300 mb-5">
                <CheckCircle2 size={26} />
              </div>
              <div className="font-display text-2xl mb-2">Check your inbox</div>
              <p className="text-sm text-sand-50/65 leading-relaxed max-w-md mx-auto">
                We've sent a password reset link to <span className="text-gold-200">{email}</span>.
                The link will expire in 1 hour.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 text-xs text-sand-50/55">
                <Mail size={12} className="text-gold-300" /> Don't see it? Check your spam folder.
              </div>
              <div className="mt-8">
                <Link to="/login" className="btn-primary inline-flex">
                  Back to sign in <ArrowRight size={14}/>
                </Link>
              </div>
            </div>
          )}
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
