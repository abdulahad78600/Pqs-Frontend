import { Link, useParams, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ShieldCheck, TrendingUp, Layers, Download, Quote } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import { opportunities, getOpportunityBySlug } from '../data/opportunities.js'
import { generateFundFactSheet } from '../utils/factSheetPdf.js'

const riskTone = {
  Conservative: { tag: 'bg-emerald-500/25 text-emerald-100 border-emerald-400/60', icon: ShieldCheck },
  Moderate:     { tag: 'bg-sky-500/25 text-sky-100 border-sky-400/60', icon: Layers },
  High:         { tag: 'bg-rose-500/25 text-rose-100 border-rose-400/60', icon: TrendingUp }
}

export default function OpportunityDetail() {
  const { slug } = useParams()
  const o = getOpportunityBySlug(slug)
  if (!o || !o.details) return <Navigate to="/investment-opportunities" replace />

  const d = o.details
  const tone = riskTone[o.riskProfile] || riskTone.Moderate
  const ToneIcon = tone.icon
  const others = opportunities.filter((x) => x.slug !== o.slug && x.details).slice(0, 3)

  return (
    <div>
      {/* HERO */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[380px] md:h-[60vh] md:min-h-[460px] overflow-hidden">
          <img src={o.image} alt={o.name} className="absolute inset-0 w-full h-full object-cover" />
          <div className={`absolute inset-0 bg-gradient-to-tr ${o.accentFrom} ${o.accentTo} mix-blend-overlay`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />

          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-12 md:pb-16 w-full">
              <Link to="/investment-opportunities" className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-8">
                <ArrowLeft size={14} /> All opportunities
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/10 text-[11px] uppercase tracking-widest text-gold-200">
                  {o.category}
                </span>
                <span className={`px-3 py-1 rounded-full border text-[11px] uppercase tracking-widest font-semibold inline-flex items-center gap-1.5 ${tone.tag}`}>
                  <ToneIcon size={12} /> {o.riskProfile} risk
                </span>
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                className="h-display text-4xl sm:text-5xl md:text-6xl tracking-tight max-w-4xl"
              >
                {d.title || o.name}
              </motion.h1>
              {d.subtitle && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.7 }}
                  className="mt-4 max-w-2xl text-base md:text-lg text-gold-200/80 font-display italic"
                >
                  {d.subtitle}
                </motion.p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY CARD */}
      <section className="container-page -mt-10 relative z-10">
        <div className="card-glass p-6 md:p-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">Horizon</div>
              <div className="font-display text-xl text-sand-50">{o.horizon}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">Minimum</div>
              <div className="font-display text-xl text-sand-50">{o.minimum}</div>
            </div>
            {d.assetRating && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">Asset Rating</div>
                <div className="font-display text-xl text-sand-50">{d.assetRating}</div>
              </div>
            )}
            {(d.isin || d.cusip) && (
              <div>
                <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">ISIN · CUSIP</div>
                <div className="text-sm text-sand-50 mt-1.5 font-mono">{d.isin} {d.cusip && `· ${d.cusip}`}</div>
              </div>
            )}
          </div>

          {d.shareClasses && (
            <div className="mt-6 pt-6 border-t border-sand-50/8">
              <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-3">Subscription Classes</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {d.shareClasses.map((c) => (
                  <div key={c.name} className="rounded-lg bg-sand-50/5 border border-sand-50/10 p-4">
                    <div className="font-display text-lg text-sand-50">{c.name} shares</div>
                    <div className="mt-1 text-sm text-sand-50/70">Dividends: <span className="text-gold-300">{c.dividends}</span></div>
                    <div className="text-sm text-sand-50/70">Minimum investment: <span className="text-sand-50">{c.minimum}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* QUOTE (pharma-style call-out) */}
      {d.quote && (
        <section className="container-page pt-12">
          <div className="card-glass p-8 md:p-10 border-l-4 border-l-gold-500/60 rounded-l-md flex gap-4">
            <Quote size={22} className="text-gold-300 flex-shrink-0" />
            <p className="text-base md:text-lg text-sand-50/85 leading-relaxed font-display italic">{d.quote}</p>
          </div>
        </section>
      )}

      {/* THESIS */}
      {d.thesis && (
        <section className="container-page py-12">
          <SectionHeader eyebrow="Executive Investment Thesis" title={<>The <span className="gold-text">thesis</span>.</>} />
          <div className="mt-8 space-y-4 text-sand-50/80 leading-relaxed max-w-4xl">
            {d.thesis.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          {d.thesisCombines && (
            <div className="mt-8 flex flex-wrap gap-3">
              {d.thesisCombines.map((p, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-gold-500/30 bg-ink-900/40 text-sm text-sand-50/85">
                  {p}
                </span>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECTIONS */}
      {d.sections && d.sections.map((s, si) => (
        <section key={si} className="container-page py-12">
          <SectionHeader eyebrow={`Section ${si + 1}`} title={s.heading} />
          {s.body && (
            <div className="mt-6 space-y-4 text-sand-50/80 leading-relaxed max-w-4xl">
              {s.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
          {s.groups && (
            <div className="mt-8 grid md:grid-cols-2 gap-5">
              {s.groups.map((g, gi) => (
                <motion.div key={gi}
                  initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.45, delay: gi * 0.05 }}
                  className="card-glass p-6"
                >
                  <div className="font-display text-lg text-sand-50 mb-3">{g.title}</div>
                  <ul className="space-y-2">
                    {g.items.map((item, ii) => (
                      <li key={ii} className="flex gap-2.5 text-sm text-sand-50/75 leading-relaxed">
                        <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-gold-400/70 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
          {s.table && (
            <div className="mt-8 card-glass overflow-hidden">
              <div className="px-6 py-4 border-b border-sand-50/8 font-display text-lg text-sand-50">{s.table.title}</div>
              <table className="w-full text-sm">
                <thead className="bg-ink-900/60 border-b border-sand-50/8">
                  <tr>
                    {s.table.cols.map((c, ci) => (
                      <th key={ci} className="text-left text-[10px] uppercase tracking-widest text-sand-50/55 px-5 py-3">{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {s.table.rows.map((row, ri) => (
                    <tr key={ri} className="border-b border-sand-50/5 last:border-0">
                      {row.map((cell, ci) => (
                        <td key={ci} className="px-5 py-3 text-sand-50/80">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.closing && (
            <p className="mt-6 text-sand-50/75 leading-relaxed max-w-4xl italic">{s.closing}</p>
          )}
        </section>
      ))}

      {/* CONCLUSION */}
      {d.conclusion && (
        <section className="container-page py-12">
          <div className="card-glass p-10 md:p-14 relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-gold-300 mb-5">Conclusion</div>
            <ul className="space-y-3 max-w-3xl">
              {d.conclusion.map((p, i) => (
                <li key={i} className="flex gap-3 text-sand-50/85 leading-relaxed">
                  <span className="text-gold-400 mt-1">✓</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            {d.conclusionClosing && (
              <p className="mt-6 pt-6 border-t border-sand-50/8 text-base text-sand-50/80 leading-relaxed max-w-4xl">
                {d.conclusionClosing}
              </p>
            )}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="container-page py-12">
        <div className="card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="grid md:grid-cols-2 gap-10 relative">
            <div>
              <div className="eyebrow">Take the next step</div>
              <h3 className="mt-3 h-display text-3xl md:text-4xl">
                Interested in <span className="gold-text">{o.name}</span>?
              </h3>
              <p className="mt-4 text-sand-50/65 max-w-lg">
                Speak with our team for private placement materials, due diligence
                documents, and onboarding requirements.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 max-w-md">
              <button
                type="button"
                onClick={() => window.open(`/investment-opportunities/${o.slug}`, '_blank', 'noopener,noreferrer')}
                className="btn-ghost justify-center"
              >
                <Download size={16}/> View source document
              </button>
              <button type="button" onClick={() => generateFundFactSheet(o)} className="btn-ghost justify-center">
                <Download size={16}/> Download fact sheet (PDF)
              </button>
              <Link to="/contact" className="btn-primary justify-center">
                Speak with our team <ArrowRight size={16}/>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OTHER OPPORTUNITIES */}
      {others.length > 0 && (
        <section className="container-page pb-24">
          <div className="flex items-end justify-between mb-10">
            <SectionHeader eyebrow="Continue Exploring" title={<>Other <span className="gold-text">opportunities</span>.</>} />
            <Link to="/investment-opportunities" className="btn-ghost">View all <ArrowRight size={14}/></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {others.map((x) => (
              <Link key={x.slug} to={`/investment-opportunities/${x.slug}`} className="card-glass overflow-hidden lift-on-hover group">
                <div className="relative h-44 overflow-hidden">
                  <img src={x.image} alt={x.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-xs uppercase tracking-widest text-gold-300/80">{x.category}</div>
                  <div className="mt-1 font-display text-lg group-hover:text-gold-200 transition-colors">{x.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
