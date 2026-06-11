import { useEffect, useState } from 'react'
import { ShieldCheck, ArrowRight, ScrollText } from 'lucide-react'
import Logo from './Logo.jsx'

// Professional-use acceptance gate, shown once when a visitor first reaches the
// site. The disclaimer states this platform is directed only at Professional
// Clients / Eligible Counterparties — visitors must Accept to continue or
// Decline to be turned away. Acceptance persists for the browser tab
// (sessionStorage), so closing the window prompts the gate again, matching the
// behaviour of the SiteLock passcode gate it sits alongside.
const STORAGE_KEY = 'pqs.disclaimerAccepted'

export default function DisclaimerGate({ children }) {
  const [accepted, setAccepted] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) === '1'
  )
  const [declined, setDeclined] = useState(false)

  useEffect(() => {
    if (accepted) sessionStorage.setItem(STORAGE_KEY, '1')
  }, [accepted])

  if (accepted) return children

  return (
    <div className="min-h-screen relative overflow-hidden bg-ink-950 text-sand-50 grid place-items-center px-6 py-12">
      {/* Ambient gold glow + faint grid — matches SiteLock chrome */}
      <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gold-500/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />

      <div className="relative w-full max-w-2xl">
        <div className="card-glass p-8 md:p-10 border border-sand-50/10">
          <div className="flex flex-col items-center text-center">
            <Logo />
            <div className="mt-8 w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
              {declined ? <ScrollText size={22} /> : <ShieldCheck size={22} />}
            </div>
            <div className="mt-5 eyebrow">Important — Professional Use Only</div>
            <h1 className="mt-3 font-display text-3xl md:text-4xl text-sand-50">
              Disclaimer &amp; <span className="gold-text">Confirmation</span>
            </h1>
          </div>

          {declined ? (
            <div className="mt-7 text-center">
              <p className="text-sm md:text-base text-sand-50/75 leading-relaxed max-w-md mx-auto">
                We are unable to grant you access. The information on this website
                is available only to Professional Clients and Eligible
                Counterparties. If you believe this is in error, please review the
                disclaimer again.
              </p>
              <button
                onClick={() => setDeclined(false)}
                className="btn-ghost mt-7 justify-center"
              >
                Back to disclaimer
              </button>
            </div>
          ) : (
            <>
              <div className="mt-7 max-h-[42vh] overflow-y-auto pr-2 space-y-4 text-sm md:text-[15px] text-sand-50/75 leading-relaxed">
                <p>
                  PQS Fund SPC (&ldquo;PQS Fund&rdquo;, the &ldquo;Fund&rdquo;, or the &ldquo;Company&rdquo;) is a regulated Cayman
                  Islands investment fund established exclusively for{' '}
                  <span className="text-sand-50">qualified, accredited, sophisticated, institutional, professional, and high-net-worth investors</span>{' '}
                  who satisfy the eligibility requirements applicable in their respective jurisdictions.
                </p>
                <p>
                  This website and the information contained herein are intended solely for persons who
                  are legally permitted to receive such information and who qualify to invest in private
                  and alternative investment funds. The information presented is not intended for{' '}
                  <span className="text-sand-50">retail investors</span> or members of the general public.
                </p>
                <p>
                  By accessing this website, you acknowledge and represent that you are a qualified
                  investor, that you understand the risks associated with alternative investments, and
                  that you are legally entitled to access the information contained herein.
                </p>
                <p>
                  The information within this website is unsuitable for any party who does not qualify
                  as a Professional Client or Eligible Counterparty and, by selecting{' '}
                  <span className="text-sand-50">Accept</span> below, you confirm that you fall within
                  one of these definitions. Premier Quantitative Strategies Fund SP cannot and will not
                  conduct business with Retail Clients; as such the website is not intended for viewing
                  by Retail Clients. If you are in any doubt, you should consult a financial adviser.
                </p>
                <p>
                  If you are uncertain as to whether you qualify as an eligible investor, you should seek
                  independent legal, tax, financial, or investment advice before proceeding.
                </p>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setDeclined(true)}
                  className="btn-ghost w-full justify-center"
                >
                  Decline
                </button>
                <button
                  onClick={() => setAccepted(true)}
                  className="btn-primary w-full justify-center"
                >
                  Accept &amp; Continue <ArrowRight size={16} />
                </button>
              </div>
            </>
          )}

          <p className="mt-8 text-[10px] text-sand-50/40 text-center leading-relaxed">
            © {new Date().getFullYear()} Premier Quantitative Strategies Fund SP ·
            Professional Clients &amp; Eligible Counterparties only
          </p>
        </div>
      </div>
    </div>
  )
}
