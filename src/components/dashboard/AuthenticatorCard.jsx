import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { Smartphone, ShieldCheck, AlertCircle, Copy, CheckCircle2, Loader2, X } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import { generateTotp } from '../../utils/totp.js'
import { PanelCard } from './widgets.jsx'

// Card lives inside the Security tab. Two states:
//   - Disabled  → "Set up authenticator app" → reveals QR + verify code form.
//   - Enabled   → green confirmation + "Disable" form (requires current code).
export default function AuthenticatorCard() {
  const { user, totpEnabled, enrollTotp, disableTotp } = useAuth()

  const [setupOpen, setSetupOpen]   = useState(false)
  const [disableOpen, setDisableOpen] = useState(false)
  const [pending, setPending] = useState(null)  // { secret, otpauthUrl }
  const [code, setCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [secretCopied, setSecretCopied] = useState(false)

  // Generate a fresh secret each time the setup modal opens.
  useEffect(() => {
    if (!setupOpen) {
      setPending(null)
      setCode('')
      setSecretCopied(false)
      return
    }
    const label = user?.email || user?.name || 'account'
    setPending(generateTotp(label))
  }, [setupOpen, user])

  const enroll = async (e) => {
    e?.preventDefault()
    if (!pending?.secret) return
    setSubmitting(true)
    try {
      enrollTotp(pending.secret, code)
      toast.success('Authenticator app enabled. You\'ll be asked for a code on every sign-in.')
      setSetupOpen(false)
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const disable = async (e) => {
    e?.preventDefault()
    setSubmitting(true)
    try {
      disableTotp(code)
      toast.success('Authenticator app disabled.')
      setDisableOpen(false)
      setCode('')
    } catch (err) {
      toast.error(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const copySecret = () => {
    if (!pending?.secret) return
    navigator.clipboard.writeText(pending.secret)
    setSecretCopied(true)
    setTimeout(() => setSecretCopied(false), 1500)
  }

  return (
    <PanelCard eyebrow="Authenticator app" title="Time-based 2FA (TOTP)">
      <div className="flex items-start gap-4">
        <div className={`w-11 h-11 rounded-xl border grid place-items-center flex-shrink-0 ${
          totpEnabled
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300'
            : 'bg-sand-50/8 border-sand-50/15 text-sand-50/55'
        }`}>
          <Smartphone size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-display text-base text-sand-50">
            {totpEnabled ? 'Authenticator app enabled' : 'Authenticator app not configured'}
          </div>
          <p className="text-sm text-sand-50/65 mt-1 leading-relaxed">
            {totpEnabled
              ? 'After your email code, you\'ll be asked for a 6-digit code from your authenticator app to finish signing in.'
              : 'Add a second factor: scan a QR code with Google Authenticator, Authy, or 1Password to require a rotating 6-digit code at sign-in.'}
          </p>
          <div className="mt-2 flex items-start gap-2 text-[11px] text-amber-300/85">
            <AlertCircle size={12} className="flex-shrink-0 mt-0.5"/>
            <span>This is device-local: the secret is stored in this browser only. If you sign in from another browser or clear site data, you'll need to set it up again.</span>
          </div>
          <div className="mt-4 flex gap-2 flex-wrap">
            {totpEnabled ? (
              <button onClick={() => { setDisableOpen(true); setCode('') }} className="btn-ghost text-xs py-2">
                Disable authenticator
              </button>
            ) : (
              <button onClick={() => setSetupOpen(true)} className="btn-primary text-xs py-2">
                <ShieldCheck size={12}/> Set up authenticator
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Enrollment modal */}
      <AnimatePresence>
        {setupOpen && (
          <Modal onClose={() => !submitting && setSetupOpen(false)} title="Set up authenticator app">
            <ol className="space-y-5 text-sm text-sand-50/80">
              <li>
                <div className="flex items-start gap-3">
                  <Step n={1}/>
                  <div>
                    <div className="text-sand-50">Open your authenticator app</div>
                    <div className="text-xs text-sand-50/55 mt-0.5">Google Authenticator, Authy, 1Password, Microsoft Authenticator, or any TOTP-compatible app.</div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Step n={2}/>
                  <div className="flex-1 min-w-0">
                    <div className="text-sand-50">Scan this QR code</div>
                    <div className="mt-3 grid sm:grid-cols-[auto_1fr] gap-4 items-start">
                      <div className="bg-white p-3 rounded-xl">
                        {pending?.otpauthUrl ? (
                          <QRCodeSVG value={pending.otpauthUrl} size={148} includeMargin={false} level="M"/>
                        ) : (
                          <div className="w-[148px] h-[148px] grid place-items-center text-sand-50/40">
                            <Loader2 className="animate-spin" size={20}/>
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[11px] uppercase tracking-widest text-sand-50/55">Or enter the secret manually</div>
                        <div className="mt-1 flex items-center gap-2">
                          <code className="flex-1 font-mono text-xs break-all text-sand-50/85 bg-ink-900 border border-sand-50/8 rounded-lg px-2 py-1.5">
                            {pending?.secret || '…'}
                          </code>
                          <button type="button" onClick={copySecret} className="btn-ghost text-xs py-1.5 flex-shrink-0">
                            {secretCopied ? <><CheckCircle2 size={12}/> Copied</> : <><Copy size={12}/> Copy</>}
                          </button>
                        </div>
                        <div className="mt-2 text-[11px] text-sand-50/55">Account: {user?.email}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <Step n={3}/>
                  <form onSubmit={enroll} className="flex-1">
                    <div className="text-sand-50">Confirm with the current code</div>
                    <div className="text-xs text-sand-50/55 mt-0.5">Enter the 6-digit code your app is showing right now.</div>
                    <div className="mt-3 flex gap-2">
                      <input
                        autoFocus
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={6}
                        value={code}
                        onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                        placeholder="••••••"
                        className="flex-1 input font-mono text-lg tracking-[0.25em] text-center"
                      />
                      <button type="submit" disabled={code.length !== 6 || submitting} className="btn-primary text-sm disabled:opacity-40">
                        {submitting ? <><Loader2 size={14} className="animate-spin"/> Enabling…</> : 'Enable'}
                      </button>
                    </div>
                  </form>
                </div>
              </li>
            </ol>
          </Modal>
        )}
      </AnimatePresence>

      {/* Disable modal */}
      <AnimatePresence>
        {disableOpen && (
          <Modal onClose={() => !submitting && setDisableOpen(false)} title="Disable authenticator">
            <p className="text-sm text-sand-50/70 leading-relaxed">
              Enter your current authenticator code to confirm. Once disabled, signing in will only require your password and email OTP.
            </p>
            <form onSubmit={disable} className="mt-4 flex gap-2">
              <input
                autoFocus
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))}
                placeholder="000000"
                className="flex-1 input font-mono text-lg tracking-[0.4em] text-center"
              />
              <button type="submit" disabled={code.length !== 6 || submitting} className="text-xs px-4 py-2 rounded-full border border-rose-500/40 text-rose-300 hover:bg-rose-500/10 disabled:opacity-40">
                {submitting ? <><Loader2 size={12} className="animate-spin"/> Disabling…</> : 'Disable 2FA'}
              </button>
            </form>
          </Modal>
        )}
      </AnimatePresence>
    </PanelCard>
  )
}

function Step({ n }) {
  return (
    <div className="w-7 h-7 rounded-full bg-gold-500/15 border border-gold-500/30 grid place-items-center text-gold-300 text-xs flex-shrink-0">
      {n}
    </div>
  )
}

function Modal({ title, children, onClose }) {
  // Portal to <body> so the modal escapes the parent card-glass stacking
  // context (which uses backdrop-blur and would otherwise clip a fixed child).
  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-ink-950/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
        className="relative rounded-2xl border border-sand-50/10 bg-ink-900 p-6 max-w-2xl w-full max-h-[88vh] overflow-y-auto shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-300/80">Security</div>
            <h3 className="font-display text-xl mt-1">{title}</h3>
          </div>
          <button onClick={onClose} className="text-sand-50/60 hover:text-sand-50">
            <X size={18}/>
          </button>
        </div>
        {children}
        <style>{`
          .input { width:100%; background:#0f1218; border:1px solid rgba(247,244,238,0.08); border-radius:12px; padding:12px 14px; color:#f7f4ee; font-size:14px; }
          .input:focus { outline:none; border-color:rgba(216,187,106,0.5); box-shadow:0 0 0 3px rgba(216,187,106,0.08); }
          .input::placeholder { color:rgba(247,244,238,0.35); }
        `}</style>
      </motion.div>
    </div>,
    document.body
  )
}
