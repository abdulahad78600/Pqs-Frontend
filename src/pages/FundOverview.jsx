import { motion } from 'framer-motion'
import {
  ShieldCheck, TrendingUp, CalendarClock, Wallet, Activity,
  Layers, Coins, Workflow,
  Scale, LineChart, Globe2, FileCheck2, Filter, Sparkles,
  ArrowDown, Network
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

const propositionStats = [
  { i: TrendingUp, label: 'Target Returns', value: 'Up to 8%', note: 'annually' },
  { i: ShieldCheck, label: 'Structure', value: 'Asset-backed', note: 'cash-flow-driven' },
  { i: CalendarClock, label: 'Term', value: '3–5 yr', note: 'lock-up' },
  { i: Wallet, label: 'Distributions', value: 'Semi-annual', note: 'dividends' },
  { i: Activity, label: 'Risk Profile', value: 'Limited Downside', note: 'structural protection' }
]

const whyInvest = [
  {
    i: TrendingUp,
    t: 'Attractive Risk-Adjusted Returns',
    points: [
      'Yield premium: 300–800+ bps over traditional credit strategies',
      'Higher yield than traditional fixed income',
      'More predictable than equity investments'
    ]
  },
  {
    i: ShieldCheck,
    t: 'Structural Advantages',
    points: [
      'Downside protection: fully secured, contract-based cash flows',
      'Overcollateralization & excess spread enhance investor protection',
      'Tranching structure: losses absorbed by equity first, protecting senior and mezzanine investors'
    ]
  },
  {
    i: Network,
    t: 'Origination & Market Edge',
    points: [
      'Proprietary deal sourcing and structuring capability',
      'Access to illiquid opportunities generating liquidity premiums',
      'Ability to capitalize on regulatory inefficiencies (Basel-driven constraints on banks)'
    ]
  },
  {
    i: Scale,
    t: 'Low Market Correlation',
    points: [
      'Minimal exposure to public market volatility',
      'Returns driven by cash flows and structural design, not market sentiment'
    ]
  },
  {
    i: LineChart,
    t: 'Structural Alpha',
    points: [
      'Financial structuring',
      'Securitization timing',
      'Capital optimization',
      'Not solely dependent on asset selection'
    ]
  },
  {
    i: Coins,
    t: 'Consistent Cash Flow',
    points: [
      'Semi-annual distributions',
      'Predictable income vs. long-dated private equity exits'
    ]
  }
]

const flowSteps = [
  { t: 'Investors', d: 'Subscriptions into the Fund' },
  { t: 'Cayman Fund', d: 'LP / Feeder / Master Structure' },
  { t: 'Asset SPVs', d: 'Onshore / Offshore' },
  { t: 'Diversified Asset Pool', d: 'Loans, receivables, real estate, developments, asset-backed positions' },
  { t: 'Cash Flow Generation', d: 'Interest + Principal' },
  { t: 'Investor Distributions', d: 'Distributed to investors or securitized (notes / tranches)' }
]

const portfolioComposition = [
  'AA+ quality, debt-free physical assets',
  'Commercial and residential real estate',
  'Development projects',
  'Asset-backed lending and structured credit',
  'Private equity and hybrid instruments'
]

const leverageTools = [
  'NAV facilities',
  'Asset-backed financing',
  'Subscription lines',
  'Collateralized lending arrangements'
]

const leverageOutcomes = [
  { i: Wallet, t: 'Liquidity' },
  { i: LineChart, t: 'Capital efficiency' },
  { i: TrendingUp, t: 'Return scalability' }
]

const riskFramework = [
  'Diversification across sectors, geographies, and asset classes',
  'Strong underwriting discipline',
  'Continuous monitoring of asset performance',
  'Structural protections embedded at the deal level'
]

const thesisIntersection = [
  { i: Coins, t: 'Private credit yield generation' },
  { i: ShieldCheck, t: 'Asset-backed security' },
  { i: Workflow, t: 'Institutional structuring sophistication' }
]

const investorBenefits = [
  'Enhanced yield vs. traditional markets',
  'Predictable income streams',
  'Strong downside protection',
  'Low correlation to public markets',
  'Scalable, structurally driven returns'
]

export default function FundOverview() {
  return (
    <div>
      {/* HERO — Executive Summary */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <AmbientBackdrop />
        <div className="container-page relative">
          <div className="eyebrow mb-6">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              PQS Fund · Investor Overview
            </span>
          </div>
          <h1 className="h-display text-4xl md:text-6xl lg:text-7xl leading-[0.98] tracking-tight max-w-5xl">
            <span className="gold-text italic">Asset-backed</span> investment platform.
          </h1>
          <p className="mt-8 max-w-3xl text-base md:text-lg text-sand-50/75 leading-relaxed">
            PQS Fund is an asset-backed investment platform managing
            <span className="text-sand-50"> $180M+ in AUM</span>, with a strong growth
            trajectory driven by disciplined deployment into secured, cash-flowing opportunities.
            The Fund provides investors with the opportunity to achieve
            <span className="text-sand-50"> up to 8% annual returns</span>, supported by hard,
            physical assets located in AA+ rated jurisdictions, offering a compelling balance between
            yield generation and capital preservation.
          </p>

          {/* Headline stats strip */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {[
              { v: '$180M+', l: 'AUM' },
              { v: 'Up to 8%', l: 'Target Annual Returns' },
              { v: 'AA+', l: 'Rating' }
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="card-glass p-6"
              >
                <div className="font-display text-3xl md:text-4xl gold-text">{s.v}</div>
                <div className="mt-2 text-xs uppercase tracking-[0.3em] text-sand-50/55">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INVESTMENT PROPOSITION */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Investment Proposition"
          title={<>The <span className="gold-text">terms</span>.</>}
          subtitle="Every dollar invested is supported by tangible underlying assets, providing transparency, security, and predictable cash flow visibility."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {propositionStats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass p-6"
            >
              <s.i size={20} className="text-gold-300" />
              <div className="mt-4 text-[10px] uppercase tracking-[0.3em] text-sand-50/55">
                {s.label}
              </div>
              <div className="mt-2 font-display text-2xl text-sand-50 leading-tight">{s.value}</div>
              <div className="mt-1 text-xs text-sand-50/60">{s.note}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHY INVEST */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Why Invest in PQS Fund"
          title={<>Six <span className="gold-text">pillars</span> of the thesis.</>}
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyInvest.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass p-7 h-full"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-ink-900 border border-gold-500/30 grid place-items-center text-gold-300">
                  <v.i size={18} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/80">
                  Pillar · 0{i + 1}
                </div>
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
          ))}
        </div>

        {/* Positioning callout */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-10 card-glass p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <Sparkles size={20} className="text-gold-300 mt-1" />
            <div>
              <div className="eyebrow">Positioning</div>
              <p className="mt-3 text-lg md:text-xl text-sand-50/85 leading-relaxed max-w-3xl">
                PQS delivers <span className="gold-text">private equity–like returns</span> with
                <span className="gold-text"> credit-like downside protection</span> and current
                income.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FUND STRUCTURE — Investor Capital Flow */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Fund Structure"
          title={<>Investor <span className="gold-text">capital flow</span>.</>}
          subtitle="A transparent, institutionally structured path from investor capital to distributed cash flows."
        />
        <div className="mt-12 max-w-2xl mx-auto space-y-3">
          {flowSteps.map((step, i) => (
            <div key={i}>
              <motion.div
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.07 }}
                className="card-glass p-5 md:p-6 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-ink-900 border border-gold-500/40 grid place-items-center font-display text-gold-300 flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <div className="font-display text-lg text-sand-50">{step.t}</div>
                  <div className="mt-1 text-sm text-sand-50/65 leading-relaxed">{step.d}</div>
                </div>
              </motion.div>
              {i < flowSteps.length - 1 && (
                <div className="flex justify-center py-1">
                  <ArrowDown size={16} className="text-gold-400/60" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO COMPOSITION */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Portfolio Composition"
          title={<>A <span className="gold-text">diversified</span> asset base.</>}
          subtitle="The Fund invests across a diversified set of asset classes."
        />
        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          {portfolioComposition.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-5 py-3 rounded-full border border-gold-500/30 bg-ink-900/40 text-sm text-sand-50/85"
            >
              {p}
            </motion.div>
          ))}
        </div>
      </section>

      {/* INVESTMENT STRATEGY */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Investment Strategy & Approach"
          title={<>Objective and <span className="gold-text">core strategy</span>.</>}
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="card-glass p-7"
          >
            <div className="eyebrow">Objective</div>
            <p className="mt-4 text-sand-50/75 leading-relaxed">
              To generate risk-adjusted returns above cash rates over the medium to long term
              through diversified private investments.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="card-glass p-7"
          >
            <div className="eyebrow">Core Strategy</div>
            <ul className="mt-4 space-y-2.5">
              {[
                'Focus on asset-backed and cash-flowing investments',
                'Emphasis on structural protections and downside mitigation',
                'Flexible mandate across geographies, sectors, and structures'
              ].map((p, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-sand-50/75 leading-relaxed">
                  <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-gold-400/70 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* USE OF LEVERAGE & STRUCTURING */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Use of Leverage & Structuring"
          title={<>Institutional-grade <span className="gold-text">structuring tools</span>.</>}
        />
        <div className="mt-12 grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="card-glass p-7 lg:col-span-7"
          >
            <div className="eyebrow">Tools Employed</div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {leverageTools.map((p, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-sand-50/75 leading-relaxed">
                  <FileCheck2 size={14} className="text-gold-300 mt-0.5 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="card-glass p-7 lg:col-span-5"
          >
            <div className="eyebrow">These Enhance</div>
            <div className="mt-4 space-y-3">
              {leverageOutcomes.map((o, j) => (
                <div key={j} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-ink-900 border border-gold-500/30 grid place-items-center text-gold-300">
                    <o.i size={15} />
                  </div>
                  <div className="text-sm text-sand-50/85">{o.t}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* RISK MANAGEMENT FRAMEWORK */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Risk Management Framework"
          title={<>Risk managed at <span className="gold-text">every level</span>.</>}
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {riskFramework.map((r, i) => {
            const Icon = [Globe2, ShieldCheck, Activity, Layers][i]
            return (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-glass p-6"
              >
                <Icon size={20} className="text-gold-300" />
                <p className="mt-4 text-sm text-sand-50/80 leading-relaxed">{r}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* INVESTMENT THESIS SUMMARY */}
      <section className="container-page pb-24 md:pb-32">
        <SectionHeader
          eyebrow="Investment Thesis Summary"
          title={<>Positioned at the <span className="gold-text">intersection</span>.</>}
          subtitle="PQS Fund is positioned at the intersection of:"
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {thesisIntersection.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glass p-7"
            >
              <t.i size={22} className="text-gold-300" />
              <div className="mt-5 font-display text-xl leading-snug">{t.t}</div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative">
            <div className="eyebrow flex items-center gap-2"><Filter size={12} /> It offers investors</div>
            <h3 className="mt-4 h-display text-3xl md:text-4xl leading-snug max-w-3xl">
              <span className="gold-text">Five outcomes</span> for our investors.
            </h3>
            <ul className="mt-8 grid md:grid-cols-2 gap-3">
              {investorBenefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-sand-50/85 leading-relaxed">
                  <div className="w-7 h-7 rounded-full bg-ink-900 border border-gold-500/40 grid place-items-center text-gold-300 flex-shrink-0 mt-0.5">
                    <span className="font-display text-xs">{i + 1}</span>
                  </div>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
