import { useEffect, useState } from 'react'
import { Lock, ArrowRight } from 'lucide-react'
import Logo from './Logo.jsx'

// Soft full-site passcode gate. Bypass persists for the current browser tab
// (sessionStorage), so closing the window forces re-entry. The code lives in
// the client bundle — this is a "not yet public" gate, not real security.
const PASSCODE = '78692'
const STORAGE_KEY = 'pqs.siteUnlocked'

export default function SiteLock({ children }) {
  const [unlocked, setUnlocked] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  )
  const [code, setCode] = useState('')
  const [error, setError] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (unlocked) sessionStorage.setItem(STORAGE_KEY, '1')
  }, [unlocked])

  const submit = (e) => {
    e.preventDefault()
    if (code.trim() === PASSCODE) {
      setError(false)
      setUnlocked(true)
    } else {
      setError(true)
      setShake(true)
      setTimeout(() => setShake(false), 450)
    }
  }

  if (unlocked) return children

  return (
    <div className="min-h-screen relative overflow-hidden bg-ink-950 text-sand-50 grid place-items-center px-6">
      {/* Ambient gold glow + faint grid */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

      <div className={`relative w-full max-w-md ${shake ? 'animate-shake' : ''}`}>
        <div className="card-glass p-8 md:p-10 border border-sand-50/10">
          <div className="flex flex-col items-center text-center">
            <Logo />
            <div className="mt-8 w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
              <Lock size={22} />
            </div>
            <h1 className="mt-5 font-display text-3xl text-sand-50">
              Site <span className="gold-text">locked</span>
            </h1>
            <p className="mt-3 text-sm text-sand-50/65 max-w-xs leading-relaxed">
              This platform is currently restricted. Please enter the access code
              provided to continue.
            </p>
          </div>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest text-sand-50/55">
                Access code
              </label>
              <input
                autoFocus
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={code}
                onChange={(e) => { setCode(e.target.value); if (error) setError(false) }}
                placeholder="• • • • •"
                className={`mt-2 w-full bg-ink-900/80 border rounded-xl px-4 py-3 text-center text-xl tracking-[0.6em] text-sand-50 placeholder:text-sand-50/30 focus:outline-none transition-colors ${
                  error
                    ? 'border-rose-500/60 focus:border-rose-400/80'
                    : 'border-sand-50/12 focus:border-gold-500/60'
                }`}
              />
              {error && (
                <p className="mt-2 text-xs text-rose-300/90 text-center">
                  Incorrect code. Please try again.
                </p>
              )}
            </div>

            <button type="submit" className="btn-primary w-full justify-center">
              Unlock <ArrowRight size={16} />
            </button>
          </form>

          <p className="mt-8 text-[10px] text-sand-50/40 text-center leading-relaxed">
            © {new Date().getFullYear()} PQS Fund SPC · Restricted access ·
            Authorised personnel only
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pqs-shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }
        .animate-shake { animation: pqs-shake 0.4s ease-in-out; }
      `}</style>
    </div>
  )
}
