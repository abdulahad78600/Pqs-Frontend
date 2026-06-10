import { Link } from 'react-router-dom'
import { ArrowUpRight, FileSignature, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import RiskMeter from './RiskMeter.jsx'
import { generateFundFactSheet } from '../utils/factSheetPdf.js'

export default function FundCard({ fund, index = 0 }) {
  // Guests get bounced to /login by ProtectedRoute (which preserves the original
  // path), so a single deep-link works for both authed and unauthed visitors.
  const subscribeHref = `/dashboard/subscribe/${fund.slug}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      <div className="card-glass overflow-hidden lift-on-hover h-full flex flex-col">
        <Link to={`/funds/${fund.slug}`} className="block">
          <div className="relative h-56 overflow-hidden">
            <img src={fund.image} alt={fund.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            <div className={`absolute inset-0 bg-gradient-to-tr ${fund.accentFrom} ${fund.accentTo} mix-blend-overlay`} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
            <div className="absolute top-4 left-4 right-16 px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/10 text-[10px] uppercase tracking-widest text-gold-200 truncate" title={fund.category}>
              {fund.category}
            </div>
            <div className="absolute bottom-4 right-4 w-10 h-10 grid place-items-center rounded-full bg-gold-500/90 text-ink-950 group-hover:bg-gold-400 group-hover:rotate-45 transition-all duration-500">
              <ArrowUpRight size={18} />
            </div>
            {fund.comingSoon && (
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-gold-500/90 text-ink-950 text-[10px] uppercase tracking-widest font-semibold shadow-lg shadow-ink-950/40">
                Coming soon
              </div>
            )}
          </div>
        </Link>

        <div className="p-6 flex-1 flex flex-col">
          <Link to={`/funds/${fund.slug}`} className="block">
            <h3 className="font-display text-2xl text-sand-50 group-hover:text-gold-200 transition-colors">{fund.name}</h3>
            {fund.subName && <div className="mt-1 text-sm text-gold-300/70 font-display italic">{fund.subName}</div>}
            <p className="mt-2 text-sm text-sand-50/60 leading-relaxed flex-1">{fund.tagline}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-sand-50/8">
              <Metric label="Target Yield" value={fund.targetDividend} />
              <Metric label="Horizon" value={fund.horizon} />
              <Metric label="Minimum" value={fund.minimum} />
              <Metric label="Location" value={fund.location} />
            </div>
          </Link>

          <div className="mt-5 flex items-center justify-between gap-3 flex-wrap">
            <RiskMeter level={fund.riskLevel} label={fund.riskProfile} />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); generateFundFactSheet(fund) }}
                title="Download fact sheet (PDF)"
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sand-50/5 border border-sand-50/15 text-sand-50/80 hover:bg-sand-50/10 hover:text-sand-50 transition-colors"
              >
                <Download size={12}/> Fact sheet
              </button>
              {fund.comingSoon ? (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-sand-50/5 border border-sand-50/15 text-sand-50/50 cursor-not-allowed"
                  title="Subscription opens soon"
                >
                  <FileSignature size={12}/> Coming soon
                </span>
              ) : (
                <Link
                  to={subscribeHref}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/40 text-gold-200 hover:bg-gold-500/25 hover:text-gold-100 transition-colors"
                >
                  <FileSignature size={12}/> Subscribe
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function Metric({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      <div className="text-sm text-sand-50 mt-0.5 truncate" title={value}>{value}</div>
    </div>
  )
}
