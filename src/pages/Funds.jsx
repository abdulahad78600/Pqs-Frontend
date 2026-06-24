import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, TrendingUp, Layers } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import RiskMeter from '../components/RiskMeter.jsx'
import { funds } from '../data/funds.js'

const riskTone = {
  Conservative: { tag: 'bg-emerald-500/25 text-emerald-100 border-emerald-400/60', icon: ShieldCheck },
  Moderate:     { tag: 'bg-sky-500/25 text-sky-100 border-sky-400/60', icon: Layers },
  High:         { tag: 'bg-rose-500/25 text-rose-100 border-rose-400/60', icon: TrendingUp }
}

export default function Funds() {
  const orderedFunds = [...funds].sort((a, b) => a.riskLevel - b.riskLevel)
  return (
    <div>
      <section className="relative py-20 md:py-28">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Active Offerings"
            title={<>Four funds. <span className="gold-text">One platform.</span></>}
            subtitle="Pick the fund that matches your mandate. Each fund opens to a list of underlying investment opportunities and full detail."
          />
        </div>
      </section>

      {/* Consolidated fund cards */}
      <section className="container-page pt-6 md:pt-10 pb-20 md:pb-24">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {orderedFunds.map((f, i) => {
            const tone = riskTone[f.riskProfile] || riskTone.Moderate
            const ToneIcon = tone.icon
            return (
              <motion.div key={f.slug}
                initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="card-glass overflow-hidden lift-on-hover flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className={`absolute inset-0 bg-gradient-to-tr ${f.accentFrom} ${f.accentTo} mix-blend-overlay`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/15 text-[10px] uppercase tracking-widest text-gold-200">
                    {f.fundNumber || `Fund ${i + 1}`}
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border text-[10px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 backdrop-blur-sm shadow-lg shadow-ink-950/40 ${tone.tag}`}>
                    <ToneIcon size={11} /> {f.riskProfile} risk
                  </div>
                  {f.comingSoon && (
                    <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-gold-500/90 text-ink-950 text-[10px] uppercase tracking-widest font-semibold backdrop-blur-sm shadow-lg shadow-ink-950/40">
                      Coming soon
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-display text-2xl text-sand-50">{f.name}</h3>
                  <p className="mt-2 text-sm text-sand-50/65 leading-relaxed flex-1">{f.tagline}</p>

                  <div className="mt-5 grid grid-cols-2 gap-4 pt-5 border-t border-sand-50/8">
                    <Metric label="Target Profile" value={f.targetDividend} />
                    <Metric label="Horizon" value={f.horizon} />
                    <Metric label="Minimum" value={f.minimum} />
                    <Metric label="Risk Level">
                      <RiskMeter level={f.riskLevel} />
                    </Metric>
                  </div>

                  <Link
                    to={`/funds/${f.slug}`}
                    className="mt-6 btn-primary text-sm justify-center"
                  >
                    {f.comingSoon ? 'Preview fund' : 'View opportunities'} <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Quick comparison row */}
      <section className="container-page pb-24">
        <SectionHeader
          eyebrow="At a glance"
          title={<>Side-by-side <span className="gold-text">comparison</span>.</>}
        />
        <div className="mt-10 card-glass overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-900/60 border-b border-sand-50/8">
              <tr>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Fund</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Risk</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Profile</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Horizon</th>
                <th className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Minimum</th>
                <th className="text-right text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-4">Open</th>
              </tr>
            </thead>
            <tbody>
              {orderedFunds.map((f, i) => (
                <tr key={f.slug} className="border-b border-sand-50/5 last:border-0 hover:bg-gold-500/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-display text-sand-50">{f.name}</div>
                    <div className="text-[11px] text-sand-50/55">{f.fundNumber || `Fund ${i + 1}`}</div>
                  </td>
                  <td className="px-5 py-4 text-sand-50/80">{f.riskProfile}</td>
                  <td className="px-5 py-4 text-sand-50/70">{f.targetDividend}</td>
                  <td className="px-5 py-4 text-sand-50/70">{f.horizon}</td>
                  <td className="px-5 py-4 text-sand-50/80">{f.minimum}</td>
                  <td className="px-5 py-4 text-right">
                    <Link to={`/funds/${f.slug}`} className="text-xs text-gold-300 hover:text-gold-200 inline-flex items-center gap-1">
                      {f.comingSoon ? 'Coming soon' : 'Details'} <ArrowRight size={12} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

function Metric({ label, value, children }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      {children ? <div className="mt-1.5">{children}</div> : <div className="text-sm text-sand-50 mt-0.5 truncate" title={value}>{value}</div>}
    </div>
  )
}
