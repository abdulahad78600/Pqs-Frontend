import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone, LogIn, UserPlus } from 'lucide-react'
import { toast } from 'react-toastify'
import Logo from './Logo.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function Footer() {
  const { user } = useAuth()
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    toast.success("You're subscribed to receive quarterly briefings.")
    setNewsletterEmail('')
  }

  return (
    <footer className="relative mt-20 md:mt-32 border-t border-sand-50/8 bg-ink-950/60">
      <div className="absolute inset-x-0 top-0 divider-line" />
      <div className="container-page py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-8 md:gap-10">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 text-[11px] md:text-xs text-sand-50/60 leading-relaxed">
              PQS provides institutional-grade access to private credit, real estate, pharmaceutical,
              structured finance, and asset-backed opportunities exclusively for qualified and accredited
              investors focused on capital preservation, disciplined risk management, and long-term wealth
              creation. Through rigorous due diligence and active portfolio oversight, the Fund delivers
              exposure to specialized private market investments supported by strong fundamentals,
              tangible assets, and cash-flow-generating structures with a focus on downside protection
              and asymmetric return potential.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[13px] md:text-sm text-sand-50/70">
              <Mail size={14} className="text-gold-300" />
              <a href="mailto:admin@pqs.fund" className="hover:text-gold-200">admin@pqs.fund</a>
            </div>
            <div className="mt-2 flex items-center gap-2 text-[13px] md:text-sm text-sand-50/70">
              <Phone size={14} className="text-gold-300" />
              <a href="tel:+442071675747" className="hover:text-gold-200">+44 (0) 207 167 5747</a>
            </div>
            <div className="mt-2 flex items-start gap-2 text-[13px] md:text-sm text-sand-50/70">
              <MapPin size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
              <span>
                Corporate Offices — London, UK<br />
                21 Arlington Street, London, SW1A 1RD, United Kingdom
              </span>
            </div>
          </div>

          {user ? (
            <>
              <div className="md:col-span-4">
                <div className="eyebrow mb-4">Company</div>
                <ul className="space-y-2 text-[13px] md:text-sm">
                  <li><Link to="/about" className="text-sand-50/75 hover:text-gold-200">About</Link></li>
                  <li><Link to="/insights" className="text-sand-50/75 hover:text-gold-200">Insights</Link></li>
                  <li><Link to="/contact" className="text-sand-50/75 hover:text-gold-200">Contact</Link></li>
                </ul>
              </div>

              <div className="md:col-span-4">
                <div className="eyebrow mb-4">Stay informed</div>
                <p className="text-[13px] md:text-sm text-sand-50/60 mb-3">Receive quarterly briefings on private credit and alternatives.</p>
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="you@firm.com"
                    className="flex-1 min-w-0 bg-ink-900 border border-sand-50/10 rounded-l-full px-4 py-2.5 text-[13px] md:text-sm text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-500/50" />
                  <button type="submit" className="rounded-r-full px-4 py-2.5 bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 text-[13px] md:text-sm font-medium hover:from-gold-300 hover:to-gold-500 transition-colors flex-shrink-0">Join</button>
                </form>
              </div>
            </>
          ) : (
            <div className="md:col-span-8">
              <div className="eyebrow mb-4">Access the platform</div>
              <p className="text-[13px] md:text-sm text-sand-50/65 leading-relaxed mb-5">
                Access the secure investor platform to review fund materials, investment strategies,
                reporting, and portfolio updates. Qualified and accredited investors may sign in to
                manage their accounts and monitor holdings, while prospective investors can create
                an account to explore available opportunities and complete onboarding requirements.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/login" className="btn-primary text-[13px] md:text-sm py-2.5 px-5">
                  <LogIn size={14}/> Login
                </Link>
                <Link
                  to="/get-started"
                  className="inline-flex items-center gap-2 text-[13px] md:text-sm font-medium px-5 py-2.5 rounded-full border border-gold-500/40 text-gold-200 hover:bg-gold-500/10 transition-colors"
                >
                  <UserPlus size={14}/> Get Started
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 pt-8 border-t border-sand-50/8 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <div className="eyebrow mb-3">Corporate Offices</div>
            <div className="flex items-start gap-2 text-[13px] md:text-sm text-sand-50/70">
              <MapPin size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
              <span>
                <span className="text-sand-50/90"> UK</span><br />
                21 Arlington Street, London, SW1A 1RD, United Kingdom
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Operations</div>
            <div className="flex items-start gap-2 text-[13px] md:text-sm text-sand-50/70">
              <MapPin size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
              <span>
                <span className="text-sand-50/90">Mauritius</span><br />
                PQS Fund — Head Office<br />
                20 Van Der Meersch, Rose Hill, Mauritius
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Registered Offices</div>
            <div className="space-y-4">
              <div className="flex items-start gap-2 text-[13px] md:text-sm text-sand-50/70">
                <MapPin size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="text-sand-50/90">Cayman Islands</span><br />
                  WB Corporate Services (Cayman) Ltd. (&ldquo;WBCS&rdquo;)<br />
                  P.O. Box 2775, 71 Fort Street, 3rd Floor, Grand Cayman, KY1-1111, Cayman Islands<br />
                  <a href="mailto:support@pqs.fund" className="hover:text-gold-200">support@pqs.fund</a>
                </span>
              </div>
              <div className="flex items-start gap-2 text-[13px] md:text-sm text-sand-50/70">
                <MapPin size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
                <span>
                  <span className="text-sand-50/90">Bahamas</span><br />
                  Winterbotham Place, Marlborough &amp; Queen Streets<br />
                  P.O. Box SP 62556, Nassau, Bahamas<br />
                  <a href="mailto:support@pqs.fund" className="hover:text-gold-200">support@pqs.fund</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-sand-50/8">
          <div className="eyebrow mb-3">Coming Soon</div>
          <div className="flex flex-wrap gap-2">
            {['Toronto — Canada', 'NY — USA', 'Dubai — UAE', 'Singapore', 'Mumbai — India'].map((c) => (
              <span key={c} className="text-xs text-sand-50/70 border border-sand-50/12 rounded-full px-3 py-1">{c}</span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-sand-50/8 space-y-4">
          <p className="text-[11px] leading-relaxed text-sand-50/55 max-w-4xl">
            PQS FUND SPC, registered under number CR-434478, operates as a Segregated Portfolio Company
            incorporated in the Cayman Islands and regulated by the Cayman Islands Monetary Authority (CIMA).
            The Company&rsquo;s registered office is located at WB Corporate Services (Cayman) Ltd.
            (&ldquo;WBCS&rdquo;), P.O. Box 2775, 71 Fort Street, 3rd Floor, Grand Cayman, KY1-1111,
            Cayman Islands.
          </p>
          <p className="text-[11px] leading-relaxed text-sand-50/55 max-w-4xl">
            This information is provided solely for qualified and accredited investors and does not
            constitute an offer or solicitation in any jurisdiction where such activity is prohibited
            by law. The Fund is not offered to U.S. Persons or citizens/residents of the United States
            under applicable U.S. securities laws and regulations.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-sand-50/8 flex flex-col md:flex-row justify-between gap-4 text-[10px] text-sand-50/50">
          <div>© {new Date().getFullYear()} PQS Fund SPC. All offerings restricted to accredited investors.</div>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link to="/privacy-policy" className="hover:text-gold-200">Privacy</Link>
            <Link to="/terms" className="hover:text-gold-200">Terms</Link>
            <Link to="/disclaimer" className="hover:text-gold-200">Disclaimer</Link>
            <Link to="/aml-statement" className="hover:text-gold-200">AML Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
