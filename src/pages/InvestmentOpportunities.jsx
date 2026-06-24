import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowRight, ShieldCheck, TrendingUp, Layers, FlaskConical, ExternalLink, Lock, KeyRound,
  ChevronDown, Download
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import { opportunities } from '../data/opportunities.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { trackEvent } from '../utils/tracking.js'
import { generateFundFactSheet } from '../utils/factSheetPdf.js'

const CANA_EXTRACT_URL = 'https://stately-pudding-dc7bac.netlify.app/'

// TEMPORARY mock credentials so prospects/non-clients can preview Cana Extract.
// ⚠️ This is a CLIENT-SIDE check only — anyone can read these in the JS bundle.
// It is NOT secure and must be replaced with a real backend/Netlify gate before
// it protects anything sensitive. See the note in CanaExtractGate below.
const GUEST_CREDS = { id: 'cana-guest', password: 'preview2026' }

const riskTone = {
  Conservative: { tag: 'bg-emerald-500/25 text-emerald-100 border-emerald-400/60', icon: ShieldCheck },
  Moderate:     { tag: 'bg-sky-500/25 text-sky-100 border-sky-400/60', icon: Layers },
  High:         { tag: 'bg-rose-500/25 text-rose-100 border-rose-400/60', icon: TrendingUp }
}

function CanaExtractAccess() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  const visit = (via) => {
    trackEvent('cana_extract_open', { via, userId: user?.id || null, email: user?.email || null })
    window.open(CANA_EXTRACT_URL, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // MOCK CHECK — replace with a real backend call before production.
    if (id.trim() === GUEST_CREDS.id && password === GUEST_CREDS.password) {
      setError('')
      setUnlocked(true)
      trackEvent('cana_extract_guest_login', { id: id.trim(), result: 'success' })
      visit('guest')
    } else {
      setError('Invalid ID or password. Please check your access details.')
      trackEvent('cana_extract_guest_login', { id: id.trim(), result: 'failed' })
    }
  }

  return user ? (
    <button
      type="button"
      onClick={() => visit('client')}
      className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-gold-300 hover:text-gold-200 self-start"
    >
      Visit Cana Extract <ExternalLink size={14} />
    </button>
  ) : unlocked ? (
    <button
      type="button"
      onClick={() => visit('guest')}
      className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-medium text-emerald-300 hover:text-emerald-200 self-start"
    >
      Access granted — open Cana Extract <ExternalLink size={14} />
    </button>
  ) : (
    <div className="mt-5 pt-5 border-t border-sand-50/8">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 hover:text-gold-200"
        >
          <Lock size={13} /> Non-client access
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="text-[10px] uppercase tracking-widest text-sand-50/45 flex items-center gap-1.5">
            <KeyRound size={12} /> Enter your access credentials
          </div>
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="User ID"
            autoComplete="username"
            className="w-full rounded-lg bg-ink-950/60 border border-sand-50/12 px-3 py-2 text-sm text-sand-50 placeholder:text-sand-50/35 focus:outline-none focus:border-gold-500/50"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            className="w-full rounded-lg bg-ink-950/60 border border-sand-50/12 px-3 py-2 text-sm text-sand-50 placeholder:text-sand-50/35 focus:outline-none focus:border-gold-500/50"
          />
          {error && <div className="text-xs text-rose-300">{error}</div>}
          <button
            type="submit"
            className="w-full rounded-lg bg-gold-500/15 border border-gold-500/30 px-3 py-2 text-sm font-medium text-gold-200 hover:bg-gold-500/25 transition-colors inline-flex items-center justify-center gap-1.5"
          >
            Unlock access <ArrowRight size={14} />
          </button>
        </form>
      )}
    </div>
  )
}

// Earlier version of the card linked out to the opportunity's underlying fund
// page (via getFundBySlug(o.fundSlug)) and showed that fund's name/risk badge
// directly on the card, e.g.:
//
//   <Link to={`/funds/${fund.slug}`} className="mt-1.5 flex items-center justify-between gap-3 group">
//     <div className="min-w-0">
//       <div className="text-sm text-sand-50 group-hover:text-gold-200 transition-colors truncate">{fund.name}</div>
//       <div className="text-[11px] text-sand-50/55">{fund.fundNumber}</div>
//     </div>
//     <ArrowRight size={14} className="text-gold-300 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
//   </Link>
//
// Replaced with the self-contained OpportunityCard below (own risk profile,
// inline "full details" expand, own fact-sheet download) so opportunities no
// longer surface Axis/Aurora/Orbit branding. Kept here in case the
// link-to-fund-page approach is needed again later.

function OpportunityCard({ opportunity: o, index: i, expanded, onToggleExpanded }) {
  const tone = riskTone[o.riskProfile] || riskTone.Moderate
  const ToneIcon = tone.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
      className="card-glass overflow-hidden lift-on-hover flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={o.image}
          alt={o.name}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Unsplash sometimes drops photo IDs — fall back to a generic
            // institutional image so the card never renders blank.
            e.currentTarget.onerror = null
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80'
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-tr ${o.accentFrom} ${o.accentTo} mix-blend-overlay`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/15 text-[10px] uppercase tracking-widest text-gold-200">
          {o.category}
        </div>
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 backdrop-blur-sm shadow-lg shadow-ink-950/40 ${tone.tag}`}>
          <ToneIcon size={11} /> {o.riskProfile} risk
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="font-display text-2xl text-sand-50">{o.name}</h3>
        <p className="mt-2 text-sm text-sand-50/65 leading-relaxed flex-1">{o.tagline}</p>

        <div className="mt-5 space-y-2">
          {o.highlights.map((h) => (
            <div key={h} className="flex items-start gap-2 text-xs text-sand-50/70">
              <span className="text-gold-400 mt-0.5">—</span>
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Click for full Fund Details */}
        <div className="mt-5 pt-5 border-t border-sand-50/8">
          <button
            type="button"
            onClick={onToggleExpanded}
            className="btn-primary text-sm justify-center w-full"
            aria-expanded={expanded}
          >
            Click for full Fund Details
            <ChevronDown size={14} className={`transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-4 space-y-3">
                  {o.overview.map((p) => (
                    <p key={p} className="text-xs text-sand-50/65 leading-relaxed">{p}</p>
                  ))}
                  <div className="grid grid-cols-2 gap-4 pt-3">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Horizon</div>
                      <div className="text-sm text-sand-50 mt-0.5">{o.horizon}</div>
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Minimum</div>
                      <div className="text-sm text-sand-50 mt-0.5">{o.minimum}</div>
                    </div>
                  </div>

                  {o.slug === 'cannabis-extraction-sp' && (
                    <div className="pt-3 border-t border-sand-50/8">
                      <div className="text-[10px] uppercase tracking-widest text-sand-50/45 flex items-center gap-1.5">
                        <FlaskConical size={12} /> Cana Extract access
                      </div>
                      <p className="mt-2 text-xs text-sand-50/60 leading-relaxed">
                        Vertically integrated extraction and production platform for premium oil-based
                        products in regulated markets.
                      </p>
                      <CanaExtractAccess />
                    </div>
                  )}

                  {/* Scroll down for Download Fact Sheet */}
                  <div className="pt-3 border-t border-sand-50/8">
                    <button
                      type="button"
                      onClick={() => generateFundFactSheet(o)}
                      className="btn-ghost text-sm justify-center w-full"
                    >
                      <Download size={14} /> Download Fact Sheet
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default function InvestmentOpportunities() {
  const [expandedSlug, setExpandedSlug] = useState(null)

  return (
    <div>
      <section className="relative py-20 md:py-28">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Investment Opportunities"
            title={<>Segregated Portfolios <span className="gold-text">within PQS Fund SPC.</span></>}
            subtitle="Each opportunity is a Segregated Portfolio (SP) — a ring-fenced strategy with its own risk profile, full details, and downloadable fact sheet."
          />
        </div>
      </section>

      {/* Segregated Portfolio cards */}
      <section className="container-page pt-6 md:pt-10 pb-20 md:pb-24">
        <div className="flex items-center gap-3 mb-5">
          <span className="eyebrow">Segregated Portfolios</span>
          <span className="h-px flex-1 bg-sand-50/8" />
        </div>
        <div className={`grid lg:grid-cols-3 gap-6 md:gap-8 ${expandedSlug ? 'items-start' : 'items-stretch'}`}>
          {opportunities.map((o, i) => (
            <OpportunityCard
              key={o.slug}
              opportunity={o}
              index={i}
              expanded={expandedSlug === o.slug}
              onToggleExpanded={() => setExpandedSlug((v) => (v === o.slug ? null : o.slug))}
            />
          ))}
        </div>
      </section>

      {/* Allocation summary — removed from UI per request, kept here in case it's needed again later
      <section className="container-page pb-24">
        <SectionHeader
          eyebrow="Risk allocation"
          title={<>How opportunities map to <span className="gold-text">fund portfolios</span>.</>}
        />
        <div className="mt-10 card-glass overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-900/60 border-b border-sand-50/8">
              <tr>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Segregated Portfolio</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Risk allocated into</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Risk Profile</th>
                <th className="text-right text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Open</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((o) => {
                const fund = getFundBySlug(o.fundSlug)
                return (
                  <tr key={o.slug} className="border-b border-sand-50/5 last:border-0 hover:bg-gold-500/5 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-display text-sand-50">{o.name}</div>
                      <div className="text-[11px] text-sand-50/55">{o.category}</div>
                    </td>
                    <td className="px-5 py-4 text-sand-50/80">{fund?.name}</td>
                    <td className="px-5 py-4 text-sand-50/70">{fund?.riskProfile}</td>
                    <td className="px-5 py-4 text-right">
                      <Link to={`/funds/${fund?.slug}`} className="text-xs text-gold-300 hover:text-gold-200 inline-flex items-center gap-1">
                        Fund details <ArrowRight size={12} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>
      */}
    </div>
  )
}
