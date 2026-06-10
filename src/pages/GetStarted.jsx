import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ShieldCheck, FileText, FileSignature, Smartphone,
  CheckCircle2, UserPlus, LogIn, AlertCircle, Lock, ScrollText, ClipboardCheck
} from 'lucide-react'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

const steps = [
  {
    n: '01',
    id: 'disclosures',
    label: 'Disclosures',
    icon: ScrollText,
    title: 'Investor disclosures',
    intro:
      'Before you can subscribe, we ask you to read and acknowledge the standard investor disclosures.',
    bullets: [
      'PQS offerings are restricted to accredited investors only.',
      'Private investments are illiquid and may result in loss of capital.',
      'Past performance does not guarantee future results.',
      'Subscription is subject to compliance review and acceptance by the manager.',
      'You confirm you are not subject to sanctions or restrictions in your jurisdiction.'
    ],
    cta: 'Acknowledge & continue'
  },
  {
    n: '02',
    id: 'account',
    label: 'Create account',
    icon: UserPlus,
    title: 'Create your investor account',
    intro:
      'Set up your secure investor account. We will email you a verification code, and you will then complete KYC and set up multi-factor authentication.',
    bullets: [
      'Email + strong password (8+ chars · upper · lower · number · symbol).',
      '6-digit email OTP verification.',
      'Free to create — fees apply only at subscription.'
    ],
    cta: 'Create account',
    href: '/register'
  },
  {
    n: '03',
    id: 'kyc',
    label: 'KYC / AML',
    icon: ClipboardCheck,
    title: 'KYC & AML documents',
    intro:
      'Upload your identity and proof-of-residence documents. The compliance team reviews submissions within 1–2 business days.',
    bullets: [
      'Government-issued photo ID (passport, driver\'s licence, or national ID).',
      'Proof of residence dated within the last 3 months.',
      'Source-of-funds declaration (for subscriptions above the standard threshold).',
      'Corporate investors: certificate of incorporation and beneficial-owner register.'
    ],
    cta: 'Open KYC form',
    href: '/dashboard/kyc',
    requiresAuth: true
  },
  {
    n: '04',
    id: 'mfa',
    label: 'Authenticator',
    icon: Smartphone,
    title: 'Microsoft Authenticator (or similar)',
    intro:
      'Enable an authenticator app for multi-factor sign-in. Microsoft Authenticator, Google Authenticator, 1Password, and Authy all work.',
    bullets: [
      'Open your authenticator app and tap "Add account".',
      'Scan the QR code shown in Settings → Security.',
      'Enter the 6-digit code your app generates to confirm enrolment.',
      'Codes are required on every sign-in for compliance.'
    ],
    cta: 'Enable in Settings',
    href: '/dashboard/settings',
    requiresAuth: true
  },
  {
    n: '05',
    id: 'subscribe',
    label: 'Subscription',
    icon: FileSignature,
    title: 'Subscription agreement',
    intro:
      'Pick a fund, share class, and amount. Sign the subscription agreement online. The manager may request additional onboarding documents prior to acceptance.',
    bullets: [
      'Choose Fund 1 (Orbit Macro Growth), Fund 2 (Aurora Quant Income), or Fund 3 (Axis Digital Reserve).',
      'Select share class and currency.',
      'Confirm subscription amount and source of capital.',
      'Sign the subscription agreement and submit — the manager will confirm acceptance.'
    ],
    cta: 'Open subscription',
    href: '/dashboard/subscribe',
    requiresAuth: true
  }
]

export default function GetStarted() {
  const { user } = useAuth()
  const [active, setActive] = useState(0)
  const [acknowledged, setAcknowledged] = useState(false)

  const step = steps[active]
  const StepIcon = step.icon

  const next = () => setActive((i) => Math.min(i + 1, steps.length - 1))
  const prev = () => setActive((i) => Math.max(i - 1, 0))

  return (
    <div className="relative">
      <AmbientBackdrop />

      <section className="container-page relative pt-12 pb-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-6">
          <ArrowLeft size={14} /> Back to home
        </Link>

        <div className="max-w-3xl">
          <div className="eyebrow mb-3">Get Started · New Investors</div>
          <h1 className="h-display text-4xl md:text-5xl leading-tight">
            From <span className="gold-text">first visit</span> to first subscription.
          </h1>
          <p className="mt-5 text-sand-50/70 leading-relaxed">
            Five steps. Disclosures, account, KYC, authenticator, and your first subscription.
            You can pause and return at any point — your progress is saved to your account.
          </p>
          {!user && (
            <div className="mt-5 inline-flex items-center gap-2 text-xs text-sand-50/60 bg-ink-900/60 border border-sand-50/8 rounded-full px-4 py-2">
              <LogIn size={12} className="text-gold-300" />
              Already have an account? <Link to="/login" className="text-gold-300 hover:text-gold-200 ml-1">Sign in here</Link>
            </div>
          )}
        </div>
      </section>

      {/* Stepper rail */}
      <section className="container-page relative pb-8">
        <div className="card-glass p-2 md:p-3 overflow-x-auto">
          <div className="flex items-center gap-1 min-w-max">
            {steps.map((s, i) => {
              const Icon = s.icon
              const isActive = i === active
              const isDone = i < active
              return (
                <button key={s.id}
                  onClick={() => setActive(i)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gold-500/15 border border-gold-500/40 text-gold-200'
                      : isDone
                        ? 'text-emerald-300 hover:bg-emerald-500/5'
                        : 'text-sand-50/65 hover:bg-sand-50/5 border border-transparent'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg grid place-items-center flex-shrink-0 ${
                    isActive ? 'bg-gold-500/20 border border-gold-500/40' :
                    isDone ? 'bg-emerald-500/15 border border-emerald-500/30' :
                    'bg-ink-900 border border-sand-50/10'
                  }`}>
                    {isDone ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-widest opacity-70">Step {s.n}</div>
                    <div className="text-sm">{s.label}</div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Active step card */}
      <section className="container-page pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-12 gap-6"
          >
            {/* Main card */}
            <div className="lg:col-span-8 card-glass p-8 md:p-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300">
                  <StepIcon size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">Step {step.n}</div>
                  <h2 className="font-display text-2xl md:text-3xl">{step.title}</h2>
                </div>
              </div>

              <p className="text-sand-50/80 leading-relaxed">{step.intro}</p>

              <ul className="mt-6 space-y-3">
                {step.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-sm text-sand-50/80">
                    <CheckCircle2 size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>

              {step.id === 'disclosures' && (
                <label className="mt-7 flex items-start gap-2 text-sm text-sand-50/75 p-4 rounded-xl border border-sand-50/8">
                  <input
                    type="checkbox"
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                    className="mt-0.5 accent-gold-500"
                  />
                  <span>
                    I confirm I am an accredited investor and I have read and understood the
                    disclosures above.
                  </span>
                </label>
              )}

              {step.requiresAuth && !user && (
                <div className="mt-6 flex items-start gap-2 text-sm text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>You'll need to be signed in to complete this step. Create your account in step 02 first.</span>
                </div>
              )}

              <div className="mt-8 flex items-center justify-between gap-3">
                <button
                  onClick={prev}
                  disabled={active === 0}
                  className="btn-ghost text-sm disabled:opacity-40"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                <div className="flex items-center gap-3">
                  {step.href ? (
                    <Link
                      to={step.requiresAuth && !user ? '/register' : step.href}
                      className="btn-primary text-sm"
                    >
                      {step.cta} <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <button
                      onClick={next}
                      disabled={step.id === 'disclosures' && !acknowledged}
                      className="btn-primary text-sm disabled:opacity-40"
                    >
                      {step.cta} <ArrowRight size={14} />
                    </button>
                  )}
                  {active < steps.length - 1 && (
                    <button onClick={next} className="text-xs text-sand-50/55 hover:text-gold-200">
                      Skip →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-4">
              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck size={14} className="text-gold-300" />
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">What happens next</div>
                </div>
                <ol className="space-y-3 text-sm text-sand-50/75">
                  {steps.slice(active + 1).slice(0, 3).map((s) => (
                    <li key={s.id} className="flex gap-3">
                      <span className="font-mono text-gold-300/70 text-[11px] mt-0.5">{s.n}</span>
                      <span>{s.label} — {s.title.toLowerCase()}</span>
                    </li>
                  ))}
                  {active === steps.length - 1 && (
                    <li className="text-sand-50/60 italic">You're at the final step. Once submitted, the manager will review and confirm.</li>
                  )}
                </ol>
              </div>

              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Lock size={14} className="text-gold-300" />
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">Security</div>
                </div>
                <p className="text-sm text-sand-50/70 leading-relaxed">
                  PQS uses email OTP, Microsoft Authenticator–compatible TOTP, and full KYC/AML
                  review. All documents are stored encrypted and only accessible to the compliance
                  team.
                </p>
              </div>

              <div className="card-glass p-6">
                <div className="flex items-center gap-2 mb-3">
                  <FileText size={14} className="text-gold-300" />
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">Need help?</div>
                </div>
                <p className="text-sm text-sand-50/70 leading-relaxed mb-3">
                  Reach our investor relations team if you have questions about onboarding,
                  documents, or fund selection.
                </p>
                <Link to="/contact" className="text-sm text-gold-300 hover:text-gold-200 inline-flex items-center gap-1">
                  Contact us <ArrowRight size={12} />
                </Link>
              </div>
            </aside>
          </motion.div>
        </AnimatePresence>
      </section>
    </div>
  )
}
