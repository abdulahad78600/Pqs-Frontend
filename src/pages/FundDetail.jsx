import { useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, ShieldCheck, TrendingUp, MapPin, Layers,
  CheckCircle2, FileText, Mail, ChevronDown, BookOpen, Building2,
  Globe2, Lock, Eye, EyeOff, Sparkles, FileSignature, Download,
  Briefcase, Banknote, FlaskConical, Sprout
} from 'lucide-react'
import { generateFundFactSheet } from '../utils/factSheetPdf.js'

const verticalIcons = {
  'Private Equity': Briefcase,
  'Structured Finance & Asset-Based Lending': Banknote,
  'Real Assets & Development': Building2,
  'Pharmaceutical & Life Sciences': FlaskConical,
  'Regulated Alternative Sectors': Sprout
}
import { getFundBySlug, liveFunds } from '../data/funds.js'
import RiskMeter from '../components/RiskMeter.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

export default function FundDetail() {
  const { slug } = useParams()
  const fund = getFundBySlug(slug)
  if (!fund) return <Navigate to="/funds" replace />

  const { user } = useAuth()
  const [expanded, setExpanded] = useState(false)
  const others = liveFunds.filter((f) => f.slug !== fund.slug).slice(0, 3)
  // Either authed users land straight on the subscribe form (slug resolved server-side
  // by the Subscribe page) or guests get bounced through /login by ProtectedRoute,
  // which already preserves the original destination via location.state.from.
  const subscribeHref = `/dashboard/subscribe/${fund.slug}`

  return (
    <div>
      {/* ─── HERO ─── */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] md:h-[70vh] md:min-h-[520px] overflow-hidden">
          <motion.img
            src={fund.image} alt={fund.name}
            initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-tr ${fund.accentFrom} ${fund.accentTo} mix-blend-overlay`} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/30" />
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />

          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-14 md:pb-20 w-full">
              <Link to="/funds" className="inline-flex items-center gap-2 text-sm text-sand-50/70 hover:text-gold-200 mb-8">
                <ArrowLeft size={14} /> All funds
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/10 text-[11px] uppercase tracking-widest text-gold-200">
                  {fund.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/10 text-[11px] uppercase tracking-widest text-sand-50/70">
                  {fund.location}
                </span>
                {fund.comingSoon && (
                  <span className="px-3 py-1 rounded-full bg-gold-500/90 text-ink-950 text-[11px] uppercase tracking-widest font-semibold">
                    Coming soon
                  </span>
                )}
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                className="h-display text-4xl sm:text-5xl md:text-7xl tracking-tight max-w-5xl break-words"
              >
                {fund.name}
              </motion.h1>
              {fund.subName && (
                <div className="mt-3 text-lg md:text-xl text-gold-300/80 font-display italic">{fund.subName}</div>
              )}
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="mt-5 max-w-2xl text-base md:text-lg text-sand-50/75"
              >
                {fund.tagline}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SUMMARY CARD (matches brief one-for-one) ─── */}
      <section className="container-page -mt-10 relative z-10">
        <div className="card-glass p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={14} className="text-gold-300" />
            <span className="eyebrow">Fund Summary</span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <SummaryRow label="Risk Profile" value={fund.riskProfile} extra={<RiskMeter level={fund.riskLevel} />} />
            <SummaryRow label="Returns" value={fund.returns} long />
            <SummaryRow label="Dividends" value={fund.dividends} long />
            <SummaryRow label="Horizon · Minimum" value={`${fund.horizon} · ${fund.minimum}`} />
          </div>
          {(fund.cusip || fund.isin || fund.assetGrade) && (
            <div className="mt-6 pt-6 border-t border-sand-50/8 flex flex-wrap gap-x-8 gap-y-3">
              {fund.cusip && <IdChip label="CUSIP Number" value={fund.cusip} />}
              {fund.isin && <IdChip label="ISIN Number" value={fund.isin} />}
              {fund.assetGrade && <IdChip label="Assets" value={fund.assetGrade} />}
            </div>
          )}

          {fund.shareClasses && (
            <div className="mt-6 pt-6 border-t border-sand-50/8">
              <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-3">Subscription Classes</div>
              <div className="grid sm:grid-cols-2 gap-4">
                {fund.shareClasses.map((c) => (
                  <div key={c.name} className="rounded-lg bg-sand-50/5 border border-sand-50/10 p-4">
                    <div className="font-display text-lg text-sand-50">{c.name}</div>
                    <div className="mt-1 text-sm text-sand-50/70">Minimum subscription: <span className="text-sand-50">{c.minimum}</span></div>
                    <div className="text-sm text-gold-300/90">{c.premium}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-sand-50/8">
            <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-2">Fund Details</div>
            <p className="text-sand-50/80 leading-relaxed">{fund.fundDetailsIntro}</p>
          </div>
        </div>
      </section>

      {/* ─── FACILITY / ASSET ATTRIBUTES (verbatim list from brief) ─── */}
      <section className="container-page py-20 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Use the following for Fund Details"
              title={<>Underlying <span className="gold-text">attributes</span>.</>}
              subtitle="The structural pillars, licenses, and capabilities that anchor this offering — drawn directly from the offering memorandum."
            />
          </div>
          <div className="lg:col-span-7 card-glass p-6 md:p-8">
            <ol className="space-y-3 list-none">
              {fund.facilityAttributes.map((a, i) => (
                <motion.li key={i}
                  initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.025 }}
                  className="flex gap-4 text-sm text-sand-50/85"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-md bg-gold-500/10 border border-gold-500/30 grid place-items-center text-[11px] font-mono text-gold-300">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="leading-relaxed">{a}</span>
                </motion.li>
              ))}
            </ol>
            {fund.facilityClosing && (
              <p className="mt-6 pt-6 border-t border-sand-50/8 text-xs italic text-sand-50/55 leading-relaxed">
                {fund.facilityClosing}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ─── EXPAND PROFILE TOGGLE ─── */}
      <section className="container-page pb-12">
        <div className="text-center">
          <p className="text-sm text-sand-50/55 italic mb-4">
            **More Details when you click into the profile of the opportunity**
          </p>
          <button
            onClick={() => setExpanded((s) => !s)}
            className="btn-primary"
          >
            {expanded ? <><EyeOff size={16}/> Collapse profile</> : <><Eye size={16}/> View full profile</>}
          </button>
        </div>
      </section>

      {/* ─── EXPANDED PROFILE ─── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            {fund.profileTeaser && (
              <section className="container-page pb-10">
                <div className="card-glass p-8 md:p-10 border-l-4 border-l-gold-500/60 rounded-l-md">
                  <div className="text-xs uppercase tracking-widest text-gold-300 mb-3">Profile Teaser</div>
                  <p className="text-base md:text-lg text-sand-50/85 leading-relaxed font-display italic">
                    {fund.profileTeaser}
                  </p>
                </div>
              </section>
            )}

            {/* Overview */}
            {fund.profileOverview && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="More Detailed General Profile" title={<>{fund.subName || fund.name} <span className="gold-text">Overview</span></>} />
                <div className="mt-8 space-y-4 text-sand-50/80 leading-relaxed max-w-4xl">
                  {fund.profileOverview.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </section>
            )}

            {/* Investment Highlights */}
            {fund.investmentHighlights && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Investment Highlights" title={<>Why this <span className="gold-text">opportunity</span>.</>} />
                <div className="mt-12 grid md:grid-cols-2 gap-5">
                  {fund.investmentHighlights.map((h, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="card-glass p-6 lift-on-hover"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300 flex-shrink-0">
                          <span className="font-display text-sm">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div className="font-display text-xl text-sand-50 mt-1">{h.title}</div>
                      </div>
                      <ul className="space-y-2 ml-13 pl-13">
                        {h.bullets.map((b, j) => (
                          <li key={j} className="text-sm text-sand-50/70 leading-relaxed flex gap-2">
                            <span className="text-gold-400 mt-1">○</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Investment Verticals */}
            {fund.verticals && (
              <section className="container-page py-12">
                <SectionHeader
                  eyebrow="Investment Verticals"
                  title={<>Where this fund <span className="gold-text">deploys</span>.</>}
                />
                <div className="mt-12 grid md:grid-cols-2 gap-5">
                  {fund.verticals.map((v, i) => {
                    const Icon = verticalIcons[v.t] || Layers
                    return (
                      <motion.div key={v.t}
                        initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                        className="card-glass p-7 h-full"
                      >
                        <div className="flex items-center justify-between">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-700/15 border border-gold-500/25 grid place-items-center text-gold-300">
                            <Icon size={20} />
                          </div>
                          <div className="font-display text-2xl text-gold-300/40">{String(i + 1).padStart(2, '0')}</div>
                        </div>
                        <div className="mt-5 font-display text-xl leading-snug">{v.t}</div>
                        <ul className="mt-4 space-y-2.5">
                          {v.points.map((p, j) => (
                            <li key={j} className="flex gap-2.5 text-sm text-sand-50/70 leading-relaxed">
                              <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-gold-400/70 flex-shrink-0" />
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* TAM */}
            {fund.tam && (
              <section className="container-page py-12">
                <SectionHeader
                  eyebrow="Market Opportunity (TAM)"
                  title={<>The <span className="gold-text">addressable</span> market.</>}
                />
                <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {fund.tam.map((m, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                      className="card-glass p-6 relative overflow-hidden"
                    >
                      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-500/5 blur-2xl" />
                      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{m.label}</div>
                      <div className="mt-2 font-display text-2xl gold-text">{m.headline}</div>
                      <ul className="mt-4 space-y-1.5">
                        {m.bullets.map((b, j) => (
                          <li key={j} className="text-xs text-sand-50/60 leading-relaxed flex gap-2">
                            <span className="text-gold-400/70">•</span><span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                {fund.combinedTamSub && (
                  <div className="mt-8 card-glass p-6 text-center">
                    <div className="font-display text-3xl md:text-5xl gold-text break-words">{fund.combinedTam}</div>
                    <p className="mt-3 text-sand-50/65 max-w-2xl mx-auto">{fund.combinedTamSub}</p>
                  </div>
                )}
              </section>
            )}

            {/* Regulatory & Technical Strengths */}
            {fund.regulatoryStrengths && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Regulatory & Technical Strengths" title={<>Structural <span className="gold-text">strengths</span>.</>} />
                <div className="mt-10 grid md:grid-cols-2 gap-4">
                  {fund.regulatoryStrengths.map((s, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                      className="card-glass p-5 flex gap-4"
                    >
                      <ShieldCheck className="text-gold-300 flex-shrink-0 mt-1" size={20} />
                      <div>
                        <div className="font-display text-lg">{s.title}</div>
                        <p className="mt-1 text-sm text-sand-50/70 leading-relaxed">{s.body}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {/* Symington-only deep dive */}
            {fund.oltFindings && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="OLT Findings" title={<>Ontario Land Tribunal <span className="gold-text">findings</span>.</>} />
                <div className="mt-8 card-glass p-8">
                  <p className="text-sand-50/80 leading-relaxed">{fund.oltFindings}</p>
                </div>
              </section>
            )}

            {fund.whyCanada && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Market Context" title={<>Why <span className="gold-text">Canada</span>.</>} />
                <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fund.whyCanada.map((p, i) => (
                    <div key={i} className="card-glass p-5 flex gap-3">
                      <Globe2 size={18} className="text-gold-300 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-sand-50/75 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {fund.fundStructure && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Fund Structure & Security" title={<>Structure & <span className="gold-text">security</span>.</>} />
                <div className="mt-8 card-glass p-8">
                  <ul className="space-y-3">
                    {fund.fundStructure.map((p, i) => (
                      <li key={i} className="flex gap-3 text-sm text-sand-50/80">
                        <Lock size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {fund.primaryAsset && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Primary Asset" title={<>Toronto <span className="gold-text">development site</span>.</>} />
                <div className="mt-8 grid md:grid-cols-2 gap-5">
                  <div className="card-glass p-6">
                    <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-2">Location & Type</div>
                    <div className="text-sand-50">{fund.primaryAsset.location}</div>
                    <div className="text-sand-50/70 text-sm mt-1">{fund.primaryAsset.type}</div>
                    <div className="text-sand-50/55 text-sm mt-2 italic">{fund.primaryAsset.address}</div>
                  </div>
                  <AssetGroup label="Current Position" items={fund.primaryAsset.currentPosition} />
                  <AssetGroup label="Valuation & Support" items={fund.primaryAsset.valuation} />
                  <AssetGroup label="Income Profile" items={fund.primaryAsset.income} />
                </div>
              </section>
            )}

            {fund.secondaryAsset && (
              <section className="container-page py-12">
                <SectionHeader eyebrow="Secondary Asset (Optional)" title={<>Additional <span className="gold-text">collateral</span>.</>} />
                <div className="mt-8 card-glass p-6">
                  <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-2">Location</div>
                  <div className="text-sand-50 font-display text-lg">{fund.secondaryAsset.location}</div>
                  <ul className="mt-4 space-y-2">
                    {fund.secondaryAsset.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 text-sm text-sand-50/75">
                        <CheckCircle2 size={14} className="text-gold-400 flex-shrink-0 mt-1" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {fund.riskMitigation && (
              <BulletSection
                eyebrow="Risk Mitigation"
                title={<>Layered <span className="gold-text">downside protection</span>.</>}
                items={fund.riskMitigation}
                icon={ShieldCheck}
              />
            )}

            {fund.futureUpside && (
              <BulletSection
                eyebrow="Future Upside"
                title={<>Controlled <span className="gold-text">development exposure</span>.</>}
                items={fund.futureUpside}
                icon={TrendingUp}
              />
            )}

            {fund.positioning && (
              <BulletSection
                eyebrow="Investment Positioning"
                title={<>Best suited <span className="gold-text">for</span>.</>}
                items={fund.positioning}
                icon={Building2}
              />
            )}

            {fund.keyHighlights && (
              <BulletSection
                eyebrow="Key Highlights"
                title={<>The <span className="gold-text">essentials</span>.</>}
                items={fund.keyHighlights}
                icon={Sparkles}
              />
            )}

            {fund.closingStatement && (
              <section className="container-page py-12">
                <div className="card-glass p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
                  <div className="text-xs uppercase tracking-widest text-gold-300 mb-4">Closing Statement</div>
                  <p className="text-base md:text-lg text-sand-50/85 leading-relaxed font-display italic max-w-4xl">
                    {fund.closingStatement}
                  </p>
                </div>
              </section>
            )}

            {/* Symington exec summary block */}
            {fund.symingtonExec && (
              <section className="container-page py-12">
                <SectionHeader
                  eyebrow="Executive Summary"
                  title={<>{fund.symingtonExec.title.replace('Executive Summary — ', '')}</>}
                />
                <div className="mt-8 card-glass p-8 md:p-10 space-y-8">
                  <p className="text-sand-50/80 leading-relaxed">{fund.symingtonExec.body}</p>

                  <SubBlock title="Asset Overview & Current Value" body={fund.symingtonExec.assetOverview} />
                  <SubList title="Planning Approval & De-Risking Milestone" items={fund.symingtonExec.planningApproval} />
                  <SubList title="Development Upside" items={fund.symingtonExec.developmentUpside} />
                  <SubList title="Investment Structure & Security" items={fund.symingtonExec.structureAndSecurity} />
                  <SubList title="Risk Mitigation" items={fund.symingtonExec.riskMitigation} />
                  <SubList title="Investment Thesis" items={fund.symingtonExec.thesis} />

                  <div className="pt-4 border-t border-sand-50/8">
                    <div className="text-xs uppercase tracking-widest text-gold-300 mb-2">Conclusion</div>
                    <p className="text-sand-50/80 leading-relaxed">{fund.symingtonExec.conclusion}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Conclusion */}
            {fund.conclusion && (
              <section className="container-page py-12">
                <div className="card-glass p-10 md:p-14 relative overflow-hidden">
                  <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
                  <div className="text-xs uppercase tracking-widest text-gold-300 mb-4">Conclusion</div>
                  <p className="text-base md:text-lg text-sand-50/85 leading-relaxed max-w-4xl">{fund.conclusion}</p>
                </div>
              </section>
            )}

            {/* Conservative Profile (Pharma only) */}
            {fund.conservativeProfile && (
              <section className="container-page py-12">
                <SectionHeader
                  eyebrow="Alternate Framing"
                  title={<>{fund.conservativeProfile.title.replace('More Conservative ', 'More Conservative ')}</>}
                  subtitle="A more measured framing of the same opportunity — useful for risk-averse audiences."
                />
                <div className="mt-8 card-glass p-8 space-y-6 border-l-4 border-l-sand-300/40 rounded-l-md">
                  <p className="text-sand-50/80 leading-relaxed">{fund.conservativeProfile.body}</p>
                  <div className="pt-4 border-t border-sand-50/8">
                    <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-2">Conclusion</div>
                    <p className="text-sand-50/80 leading-relaxed">{fund.conservativeProfile.conclusion}</p>
                  </div>
                </div>
              </section>
            )}

            {/* Appendix A (Assisted Living only) */}
            {fund.appendix && (
              <section className="container-page py-12">
                <SectionHeader
                  eyebrow="Appendix A"
                  title={<>General Guidelines for Setting Up a <span className="gold-text">Long-Term Care Facility</span> in Canada</>}
                  subtitle={fund.appendix.intro}
                />
                <div className="mt-10 grid md:grid-cols-2 gap-5">
                  {fund.appendix.groups.map((g, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="card-glass p-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen size={14} className="text-gold-300" />
                        <div className="font-display text-lg">{g.name}</div>
                      </div>
                      <ul className="space-y-2">
                        {g.items.map((item, j) => (
                          <li key={j} className="flex gap-2 text-sm text-sand-50/70 leading-relaxed">
                            <span className="text-gold-400/70 flex-shrink-0">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CTA ─── */}
      <section className="container-page pt-12 pb-24">
        <div className="card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="grid md:grid-cols-2 gap-10 relative">
            <div>
              <div className="eyebrow">Take the next step</div>
              <h3 className="mt-3 h-display text-3xl md:text-4xl">
                Subscribe to <span className="gold-text">{fund.subName || fund.name}</span>.
              </h3>
              <p className="mt-4 text-sand-50/65 max-w-lg">
                Submit your subscription request online — KYC-gated, with private placement materials,
                third-party appraisals, and detailed financials available under NDA where required.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 max-w-md">
              {fund.comingSoon ? (
                <span className="btn-primary justify-center opacity-60 cursor-not-allowed pointer-events-none" aria-disabled="true">
                  <FileSignature size={16}/> Subscription opens soon
                </span>
              ) : (
                <Link to={subscribeHref} className="btn-primary justify-center">
                  <FileSignature size={16}/> Subscribe to this fund <ArrowRight size={16}/>
                </Link>
              )}
              <button
                type="button"
                onClick={() => generateFundFactSheet(fund)}
                className="btn-ghost justify-center"
              >
                <Download size={16}/> Download fact sheet (PDF)
              </button>
              <Link to="/contact" className="btn-ghost justify-center">
                <Mail size={16}/> Request investor pack
              </Link>
              <Link to="/contact" className="btn-ghost justify-center">
                <FileText size={16}/> Speak with our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── OTHER FUNDS ─── */}
      <section className="container-page pb-24">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="Continue Exploring" title={<>Other <span className="gold-text">offerings</span>.</>} />
          <Link to="/funds" className="btn-ghost">View all <ArrowRight size={14}/></Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {others.map((f) => (
            <Link key={f.slug} to={`/funds/${f.slug}`} className="card-glass overflow-hidden lift-on-hover group">
              <div className="relative h-44 overflow-hidden">
                <img src={f.image} alt={f.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-widest text-gold-300/80">{f.category}</div>
                <div className="mt-1 font-display text-lg group-hover:text-gold-200 transition-colors">{f.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function IdChip({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">{label}</div>
      <div className="font-mono text-sm text-sand-50">{value}</div>
    </div>
  )
}

function SummaryRow({ label, value, extra, long }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45 mb-1">{label}</div>
      <div className={`text-sand-50 ${long ? 'text-sm leading-relaxed' : 'font-display text-xl'}`}>{value}</div>
      {extra && <div className="mt-2">{extra}</div>}
    </div>
  )
}

function AssetGroup({ label, items }) {
  return (
    <div className="card-glass p-6">
      <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-3">{label}</div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2 text-sm text-sand-50/75 leading-relaxed">
            <span className="text-gold-400/80 flex-shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function BulletSection({ eyebrow, title, items, icon: Icon = CheckCircle2 }) {
  return (
    <section className="container-page py-12">
      <SectionHeader eyebrow={eyebrow} title={title} />
      <div className="mt-8 card-glass p-8">
        <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
          {items.map((p, i) => (
            <motion.li key={i}
              initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex gap-3 text-sm text-sand-50/80"
            >
              <Icon size={16} className="text-gold-400 flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">{p}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

function SubBlock({ title, body }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-2">{title}</div>
      <p className="text-sand-50/80 leading-relaxed">{body}</p>
    </div>
  )
}

function SubList({ title, items }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-gold-300/80 mb-3">{title}</div>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-3 text-sm text-sand-50/80">
            <CheckCircle2 size={14} className="text-gold-400 flex-shrink-0 mt-1" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
