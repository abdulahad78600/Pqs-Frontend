import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, AlertCircle, Smartphone, ShieldCheck, RefreshCw } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import AmbientBackdrop from '../../components/AmbientBackdrop.jsx'

const TOTP_PERIOD = 30 // seconds

export default function Verify2fa() {
  const { pending2fa, verify2fa, cancel2fa, user, hydrated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const inputs = useRef([])
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [secondsLeft, setSecondsLeft] = useState(TOTP_PERIOD - (Math.floor(Date.now() / 1000) % TOTP_PERIOD))

  const from = location.state?.from || '/dashboard'

  // Bail if no challenge in progress / user already authed.
  useEffect(() => {
    if (!hydrated) return
    if (user) {
      navigate(from, { replace: true })
      return
    }
    if (!pending2fa) {
      navigate('/login', { replace: true })
    }
  }, [hydrated, user, pending2fa, from, navigate])

  // Live countdown synced to TOTP epoch boundary.
  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(TOTP_PERIOD - (Math.floor(Date.now() / 1000) % TOTP_PERIOD))
    }, 250)
    return () => clearInterval(id)
  }, [])

  const onChange = (i, value) => {
    setError('')
    const next = [...code]
    if (value.length > 1) {
      const pasted = value.replace(/[^0-9]/g, '').slice(0, 6).split('')
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

  const submit = (e) => {
    e.preventDefault()
    setError('')
    const final = code.join('')
    if (final.length !== 6) {
      setError('Please enter the full 6-digit code from your app.')
      return
    }
    setSubmitting(true)
    try {
      verify2fa(final)
      toast.success('Signed in.')
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      setCode(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  const goBack = () => {
    cancel2fa()
    navigate('/login', { replace: true })
  }

  const ringProgress = secondsLeft / TOTP_PERIOD
  const ringCircumference = 2 * Math.PI * 22

  return (
    <div className="relative min-h-[calc(100vh-5rem)] grid place-items-center overflow-hidden">
      <AmbientBackdrop />
      <div className="container-page relative max-w-5xl w-full py-16 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">

        {/* LEFT — Phone mockup illustrates "this is the app on your phone" */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block relative"
        >
          <button onClick={goBack} className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-12">
            <ArrowLeft size={14} /> Back to sign in
          </button>

          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-10 bg-gold-500/10 blur-3xl rounded-full" />

            {/* Phone frame */}
            <div className="relative mx-auto w-[280px] aspect-[9/19] rounded-[3rem] border-[10px] border-ink-700 bg-ink-950 shadow-2xl shadow-black/60 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-ink-950 rounded-b-2xl z-10" />

              {/* App screen */}
              <div className="absolute inset-0 pt-10 px-5 pb-5 flex flex-col">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-sand-50/55">
                  <ShieldCheck size={11} className="text-gold-300"/>
                  <span>Authenticator</span>
                </div>

                <div className="mt-5 card-glass p-4 relative overflow-hidden flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">PQS Fund</div>
                  <div className="text-[11px] text-sand-50/55 truncate">{pending2fa?.user?.email}</div>

                  {/* Animated 6-digit display */}
                  <div className="mt-5 flex items-center justify-between">
                    <div className="font-mono font-display text-[28px] tracking-[0.18em] text-gold-200">
                      <CodeShimmer key={Math.floor(Date.now() / 1000 / TOTP_PERIOD)} />
                    </div>
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <svg viewBox="0 0 50 50" className="w-12 h-12 -rotate-90">
                        <circle cx="25" cy="25" r="22" fill="none" stroke="rgba(247,244,238,0.08)" strokeWidth="3"/>
                        <circle
                          cx="25" cy="25" r="22" fill="none"
                          stroke={secondsLeft <= 5 ? '#fda4af' : '#d8bb6a'}
                          strokeWidth="3" strokeLinecap="round"
                          strokeDasharray={ringCircumference}
                          strokeDashoffset={ringCircumference * (1 - ringProgress)}
                          style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s' }}
                        />
                      </svg>
                      <div className="absolute inset-0 grid place-items-center text-[11px] font-mono text-sand-50/80">
                        {secondsLeft}s
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-3 left-4 right-4 text-[10px] text-sand-50/45 leading-relaxed">
                    Tap to copy. Code rotates every 30 seconds.
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-sand-50/40">
                  <RefreshCw size={9} className={secondsLeft <= 5 ? 'text-rose-300' : ''}/>
                  Synced
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT — Code entry */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
          <button onClick={goBack} className="lg:hidden inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-6">
            <ArrowLeft size={14} /> Back to sign in
          </button>

          <div className="text-[11px] uppercase tracking-widest text-gold-300/80 flex items-center gap-2">
            <Smartphone size={12}/> Two-factor authentication
          </div>
          <h1 className="font-display text-3xl md:text-4xl mt-2 leading-tight">
            Approve sign-in from your <span className="gold-text">authenticator app</span>.
          </h1>
          <p className="mt-3 text-sm text-sand-50/65 leading-relaxed">
            Open the app on your phone and enter the 6-digit code currently shown for{' '}
            <span className="text-gold-200">{pending2fa?.user?.email || 'your PQS account'}</span>.
          </p>

          {/* Compatible apps */}
          <div className="mt-5 flex flex-wrap gap-2">
            {['Google Authenticator', 'Authy', '1Password', 'Microsoft Authenticator'].map((a) => (
              <span key={a} className="text-[11px] px-2.5 py-1 rounded-full bg-ink-900 border border-sand-50/8 text-sand-50/65">
                {a}
              </span>
            ))}
          </div>

          <form onSubmit={submit} className="mt-7 space-y-5">
            <div className="flex justify-between gap-2 max-w-md">
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
                  aria-label={`Digit ${i + 1}`}
                />
              ))}
            </div>

            {/* Mobile-only countdown line */}
            <div className="lg:hidden flex items-center gap-3 text-xs">
              <div className="flex-1 h-1 rounded-full bg-sand-50/8 overflow-hidden">
                <div
                  className={`h-full ${secondsLeft <= 5 ? 'bg-rose-400' : 'bg-gold-400'}`}
                  style={{ width: `${ringProgress * 100}%`, transition: 'width 0.25s linear' }}
                />
              </div>
              <span className="font-mono text-sand-50/60 text-[11px] tabular-nums">{secondsLeft}s left</span>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2 max-w-md">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <div className="flex items-center gap-3 max-w-md">
              <button
                type="submit"
                disabled={submitting || code.some((d) => d === '')}
                className="btn-primary justify-center flex-1 disabled:opacity-40"
              >
                {submitting ? 'Verifying…' : <>Verify &amp; sign in <ArrowRight size={14}/></>}
              </button>
            </div>

            <div className="flex flex-col gap-2 text-[11px] text-sand-50/55 max-w-md">
              <div className="flex items-start gap-2">
                <RefreshCw size={11} className="text-gold-300 flex-shrink-0 mt-0.5"/>
                <span>Codes refresh every 30 seconds. If yours just changed, wait a moment for the next one.</span>
              </div>
              <div className="flex items-start gap-2">
                <ShieldCheck size={11} className="text-gold-300 flex-shrink-0 mt-0.5"/>
                <span>Lost access to your authenticator? <button type="button" onClick={goBack} className="text-gold-300 hover:text-gold-200 underline-offset-2 hover:underline">Sign in again</button> from a device where it's set up.</span>
              </div>
            </div>
          </form>
        </motion.div>
      </div>

      <style>{`
        .otp-cell {
          flex: 1;
          aspect-ratio: 1 / 1;
          max-width: 64px;
          background: linear-gradient(180deg, rgba(15,18,24,0.9), rgba(15,18,24,0.6));
          border: 1px solid rgba(247,244,238,0.08);
          border-radius: 14px;
          color: #f7f4ee;
          font-size: 26px;
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          text-align: center;
          transition: all 0.18s ease;
        }
        .otp-cell:focus {
          outline: none;
          border-color: rgba(216,187,106,0.7);
          box-shadow: 0 0 0 4px rgba(216,187,106,0.10), 0 8px 24px rgba(216,187,106,0.06);
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}

// Decorative shimmer of digits in the phone mockup. Re-keys every 30s so the
// "current code" appears to change with the countdown without exposing the
// real secret in the UI.
function CodeShimmer() {
  const [digits] = useState(() => Array.from({ length: 6 }, () => Math.floor(Math.random() * 10)))
  return (
    <span className="inline-flex gap-[2px]">
      {digits.map((d, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          {d}
        </motion.span>
      ))}
    </span>
  )
}
