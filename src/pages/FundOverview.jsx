import { motion } from 'framer-motion'
import {
  ShieldCheck, TrendingUp, CalendarClock, Wallet, Activity,
  Layers, Coins, Workflow,
  Scale, LineChart, Globe2, FileCheck2, Filter, Sparkles,
  ArrowDown, Network, Landmark, Building2, ClipboardCheck, Users, Banknote
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

// const propositionStats = [
//   { i: TrendingUp, label: 'Target Returns', value: 'Up to 8%', note: 'annually' },
//   { i: ShieldCheck, label: 'Structure', value: 'Asset-backed', note: 'cash-flow-driven' },
//   { i: CalendarClock, label: 'Term', value: '3–5 yr', note: 'lock-up' },
//   { i: Wallet, label: 'Distributions', value: 'Semi-annual', note: 'dividends' },
//   { i: Activity, label: 'Risk Profile', value: 'Limited Downside', note: 'structural protection' }
// ]

// const whyInvest = [
//   {
//     i: TrendingUp,
//     t: 'Attractive Risk-Adjusted Returns',
//     points: [
//       'Yield premium: 300–800+ bps over traditional credit strategies',
//       'Higher yield than traditional fixed income',
//       'More predictable than equity investments'
//     ]
//   },
//   {
//     i: ShieldCheck,
//     t: 'Structural Advantages',
//     points: [
//       'Downside protection: fully secured, contract-based cash flows',
//       'Overcollateralization & excess spread enhance investor protection',
//       'Tranching structure: losses absorbed by equity first, protecting senior and mezzanine investors'
//     ]
//   },
//   {
//     i: Network,
//     t: 'Origination & Market Edge',
//     points: [
//       'Proprietary deal sourcing and structuring capability',
//       'Access to illiquid opportunities generating liquidity premiums',
//       'Ability to capitalize on regulatory inefficiencies (Basel-driven constraints on banks)'
//     ]
//   },
//   {
//     i: Scale,
//     t: 'Low Market Correlation',
//     points: [
//       'Minimal exposure to public market volatility',
//       'Returns driven by cash flows and structural design, not market sentiment'
//     ]
//   },
//   {
//     i: LineChart,
//     t: 'Structural Alpha',
//     points: [
//       'Financial structuring',
//       'Securitization timing',
//       'Capital optimization',
//       'Not solely dependent on asset selection'
//     ]
//   },
//   {
//     i: Coins,
//     t: 'Consistent Cash Flow',
//     points: [
//       'Semi-annual distributions',
//       'Predictable income vs. long-dated private equity exits'
//     ]
//   }
// ]

// const flowSteps = [
//   { t: 'Investors', d: 'Subscriptions into the Fund' },
//   { t: 'Cayman Fund', d: 'LP / Feeder / Master Structure' },
//   { t: 'Asset SPVs', d: 'Onshore / Offshore' },
//   { t: 'Diversified Asset Pool', d: 'Loans, receivables, real estate, developments, asset-backed positions' },
//   { t: 'Cash Flow Generation', d: 'Interest + Principal' },
//   { t: 'Investor Distributions', d: 'Distributed to investors or securitized (notes / tranches)' }
// ]

// const portfolioComposition = [
//   'AA+ quality, debt-free physical assets',
//   'Commercial and residential real estate',
//   'Development projects',
//   'Asset-backed lending and structured credit',
//   'Private equity and hybrid instruments'
// ]

// const leverageTools = [
//   'NAV facilities',
//   'Asset-backed financing',
//   'Subscription lines',
//   'Collateralized lending arrangements'
// ]

// const leverageOutcomes = [
//   { i: Wallet, t: 'Liquidity' },
//   { i: LineChart, t: 'Capital efficiency' },
//   { i: TrendingUp, t: 'Return scalability' }
// ]

// const riskFramework = [
//   'Diversification across sectors, geographies, and asset classes',
//   'Strong underwriting discipline',
//   'Continuous monitoring of asset performance',
//   'Structural protections embedded at the deal level'
// ]

// const thesisIntersection = [
//   { i: Coins, t: 'Private credit yield generation' },
//   { i: ShieldCheck, t: 'Asset-backed security' },
//   { i: Workflow, t: 'Institutional structuring sophistication' }
// ]

// const investorBenefits = [
//   'Enhanced yield vs. traditional markets',
//   'Predictable income streams',
//   'Strong downside protection',
//   'Low correlation to public markets',
//   'Scalable, structurally driven returns'
// ]

const platformIncludes = [
  'Cayman Islands Monetary Authority (CIMA) regulated Segregated Portfolio Company (SPC)',
  'Managed by PQS Capital Partners, a licensed Bahamas Investment Manager',
  'Independent Fund Administration',
  'Independent Annual Audit',
  'Independent Directors',
  'Comprehensive AML/KYC and Compliance Framework',
  'Institutional Custody and Prime Brokerage Relationships',
  'IFRS Financial Reporting',
  'Robust Corporate Governance Standards'
]

const underlyingAssets = [
  'Commercial Real Estate',
  'Residential Developments',
  'Healthcare & Assisted Living Facilities',
  'Industrial & Logistics Assets',
  'Infrastructure Projects',
  'Operating Businesses',
  'Precious Metals',
  'Institutional Financial Assets',
  'Specialized Asset-Backed Opportunities'
]

const diversifiedStrategies = [
  {
    i: Building2,
    t: 'Asset-Backed Development & Real Estate',
    d: 'Investment opportunities secured by high-quality commercial, residential, healthcare, and infrastructure assets, with a focus on long-term capital appreciation and recurring income.'
  },
  {
    i: FileCheck2,
    t: 'Private Credit & Structured Finance',
    d: 'Customized institutional lending, collateralized finance, bridge financing, trade finance, and bespoke structured capital solutions secured by tangible collateral and contractual cash flows.'
  },
  {
    i: Activity,
    t: 'Pharmaceutical & Healthcare',
    d: 'Investments in pharmaceutical development, patented technologies, cannabinoid sciences, healthcare manufacturing, processing, distribution, and medical infrastructure.'
  },
  {
    i: LineChart,
    t: 'High Frequency Trading',
    d: 'Technology-driven quantitative trading strategies utilizing proprietary algorithms, sophisticated risk controls, and market-neutral execution methodologies.'
  },
  {
    i: Coins,
    t: 'Precious Metals & Hard Assets',
    d: 'Institutional exposure to gold and other strategic hard assets designed to provide portfolio diversification and long-term inflation protection.'
  },
  {
    i: Workflow,
    t: 'Private Equity & Special Situations',
    d: 'Strategic investments in operating businesses, acquisitions, restructurings, growth capital transactions, and unique institutional opportunities.'
  }
]

const trustServices = [
  'Family Trusts',
  'Dynasty Trusts',
  'Asset Protection Trusts',
  'Private Trust Companies',
  'Estate & Succession Planning',
  'International Holding Structures',
  'Family Office Governance',
  'Corporate Administration'
]

const bankingRegions = ['Switzerland', 'Canada', 'United States', 'Europe', 'Middle East', 'South East Asia']

const bankingServices = [
  'Multi-Currency Banking',
  'International Treasury Management',
  'Cross-Border Banking',
  'Institutional Custody',
  'Wealth Management',
  'Portfolio Financing',
  'Lombard Lending',
  'Asset-Based Lending',
  'Structured Credit Facilities'
]

const investorBenefitsList = [
  'Regulated Cayman Islands investment platform',
  'Institutional governance and oversight',
  'Asset-backed investment philosophy',
  'Diversified alternative investment strategies',
  'Global banking and fiduciary capabilities',
  'Independent administration and auditing',
  'International ISIN/CUSIP investment structures',
  'Access reserved exclusively for qualified investors'
]

const sophisticatedInvestors = [
  'Qualified Investors',
  'Accredited Investors',
  'Institutional Investors',
  'Family Offices',
  'Private Banks',
  'Trustees & Fiduciaries',
  'Foundations',
  'Ultra-High-Net-Worth Individuals'
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
            Institutional Alternative Investments. Backed by Real Assets. Built for Capital Preservation.
          </p>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-sand-50/75 leading-relaxed">
            PQS Fund SPC is a Cayman Islands Segregated Portfolio Company (SPC) regulated by the
            Cayman Islands Monetary Authority (CIMA), providing qualified and accredited investors
            with access to institutional-grade alternative investment opportunities through a
            diversified platform of asset-backed investment strategies.
          </p>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-sand-50/75 leading-relaxed">
            Managed by PQS Capital Partners, a licensed Bahamas investment manager, the Fund combines
            institutional governance, regulatory oversight, disciplined risk management, and tangible
            asset ownership to deliver investment solutions focused on capital preservation, income
            generation, and long-term wealth creation.
          </p>
          <p className="mt-5 max-w-3xl text-base md:text-lg text-sand-50/75 leading-relaxed">
            Unlike many alternative investment platforms that rely primarily on financial engineering
            or leveraged market exposure, PQS Fund is founded on a simple principle: every investment
            strategy should be supported by identifiable, high-quality underlying assets whenever
            appropriate to the strategy. The Fund focuses on acquiring, financing, and managing
            investments secured by institutional-quality assets across
            <span className="text-sand-50"> Canada, Europe, and other developed markets</span>.
          </p>
        </div>
      </section>

      {/* A REGULATED INSTITUTIONAL INVESTMENT PLATFORM */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="A Regulated Institutional Investment Platform"
          title={<>Built on <span className="gold-text">governance</span> and oversight.</>}
          subtitle="PQS Fund operates within a comprehensive institutional governance framework designed to provide transparency, accountability, and investor confidence. Our investment platform includes:"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {platformIncludes.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-glass p-6 flex items-start gap-3"
            >
              <ShieldCheck size={18} className="text-gold-300 mt-0.5 flex-shrink-0" />
              <span className="text-sm text-sand-50/80 leading-relaxed">{p}</span>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl text-sm text-sand-50/65 leading-relaxed"
        >
          Each investment portfolio within PQS Fund is structured as a distinct segregated portfolio
          and is intended to maintain its own internationally recognized ISIN and/or CUSIP
          identification, facilitating institutional investment, custody, reporting, and global
          securities administration.
        </motion.p>
      </section>

      {/* ASSET-BACKED INVESTMENT PHILOSOPHY */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Asset-Backed Investment Philosophy"
          title={<>Capital <span className="gold-text">preservation</span> first.</>}
          subtitle="Capital preservation remains the cornerstone of every investment decision. The Fund seeks to maintain meaningful exposure to tangible, income-producing assets that provide intrinsic value beyond traditional financial markets. These assets are primarily located within stable developed economies, with particular emphasis on Canada and Europe."
        />
        <div className="mt-10">
          <div className="eyebrow mb-4">Underlying assets may include</div>
          <div className="flex flex-wrap gap-3">
            {underlyingAssets.map((p, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                className="px-5 py-3 rounded-full border border-gold-500/30 bg-ink-900/40 text-sm text-sand-50/85"
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl text-sm text-sand-50/65 leading-relaxed"
        >
          This disciplined approach seeks to reduce downside risk while providing investors with
          diversified exposure to sectors that exhibit long-term structural demand.
        </motion.p>
      </section>

      {/* DIVERSIFIED INVESTMENT STRATEGIES */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Diversified Investment Strategies"
          title={<>A suite of <span className="gold-text">institutional strategies</span>.</>}
          subtitle="PQS Fund offers a suite of institutional investment strategies across multiple alternative asset classes."
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {diversifiedStrategies.map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass p-7 h-full"
            >
              <div className="w-11 h-11 rounded-full bg-ink-900 border border-gold-500/30 grid place-items-center text-gold-300">
                <v.i size={18} />
              </div>
              <div className="mt-5 font-display text-xl leading-snug">{v.t}</div>
              <p className="mt-3 text-sm text-sand-50/70 leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BEYOND INVESTMENT MANAGEMENT — TRUST & FIDUCIARY */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Beyond Investment Management"
          title={<>Trust & <span className="gold-text">fiduciary services</span>.</>}
          subtitle="PQS provides a comprehensive ecosystem of institutional financial solutions for qualified investors, family offices, trustees, and private banking clients. Through strategic relationships with international fiduciaries and legal professionals, PQS assists clients with sophisticated wealth preservation structures, including:"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trustServices.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
              className="card-glass p-6"
            >
              <Landmark size={20} className="text-gold-300" />
              <p className="mt-4 text-sm text-sand-50/80 leading-relaxed">{t}</p>
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl text-sm text-sand-50/65 leading-relaxed"
        >
          These structures are designed to facilitate long-term wealth preservation, succession
          planning, confidentiality, and efficient ownership across multiple jurisdictions.
        </motion.p>
      </section>

      {/* GLOBAL BANKING SOLUTIONS */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Global Banking Solutions"
          title={<>A worldwide <span className="gold-text">banking network</span>.</>}
          subtitle="PQS works alongside leading international banking institutions to facilitate bespoke banking relationships for qualified investors."
        />
        <div className="mt-10 grid lg:grid-cols-12 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="card-glass p-7 lg:col-span-5"
          >
            <div className="eyebrow flex items-center gap-2"><Globe2 size={12} /> Our network includes</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {bankingRegions.map((r) => (
                <span key={r} className="text-xs text-sand-50/80 border border-sand-50/12 rounded-full px-3 py-1.5">{r}</span>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            className="card-glass p-7 lg:col-span-7"
          >
            <div className="eyebrow flex items-center gap-2"><Banknote size={12} /> Services may include</div>
            <ul className="mt-4 grid sm:grid-cols-2 gap-2.5">
              {bankingServices.map((p, j) => (
                <li key={j} className="flex gap-2.5 text-sm text-sand-50/75 leading-relaxed">
                  <span className="mt-1.5 inline-block w-1 h-1 rounded-full bg-gold-400/70 flex-shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* WHY PQS FUND */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Why PQS Fund"
          title={<>Discipline meets <span className="gold-text">flexibility</span>.</>}
          subtitle="PQS combines institutional investment discipline with the flexibility of a diversified alternative investment platform. Our objective is not simply to generate attractive returns, but to construct resilient portfolios supported by tangible assets, conservative underwriting, independent oversight, and disciplined governance."
        />
        <div className="mt-10 card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative">
            <div className="eyebrow flex items-center gap-2"><Sparkles size={12} /> Investors benefit from</div>
            <ul className="mt-8 grid md:grid-cols-2 gap-3">
              {investorBenefitsList.map((b, i) => (
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

      {/* FOR SOPHISTICATED INVESTORS */}
      <section className="container-page pb-24 md:pb-32">
        <SectionHeader
          eyebrow="For Sophisticated Investors"
          title={<>Designed exclusively for <span className="gold-text">qualified investors</span>.</>}
        />
        <div className="mt-12 flex flex-wrap gap-3">
          {sophisticatedInvestors.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="px-5 py-3 rounded-full border border-gold-500/30 bg-ink-900/40 text-sm text-sand-50/85 inline-flex items-center gap-2"
            >
              <Users size={14} className="text-gold-300" />
              {s}
            </motion.div>
          ))}
        </div>
        <motion.p
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mt-8 max-w-3xl text-sm text-sand-50/65 leading-relaxed flex items-start gap-2.5"
        >
          <ClipboardCheck size={16} className="text-gold-300 mt-0.5 flex-shrink-0" />
          <span>
            Access to the Fund and its investment opportunities is subject to investor
            qualification, applicable securities laws, regulatory requirements, and successful
            completion of the Fund&rsquo;s onboarding and due diligence procedures.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-12 card-glass p-10 md:p-14 relative overflow-hidden text-center"
        >
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative">
            <h3 className="h-display text-3xl md:text-4xl leading-snug">
              <span className="gold-text">Protect Capital.</span> Invest with Confidence.
            </h3>
            <p className="mt-5 max-w-2xl mx-auto text-base text-sand-50/75 leading-relaxed">
              Discover an institutional investment platform built on regulation, transparency,
              disciplined risk management, and real asset ownership.
            </p>
            <p className="mt-3 max-w-2xl mx-auto text-base text-sand-50/75 leading-relaxed">
              Explore our investment strategies, trust services, and global wealth solutions
              designed exclusively for qualified investors.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
