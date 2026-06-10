import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Briefcase, ShieldCheck, BookOpenCheck, Scale, Lock,
  TrendingUp, FileCheck2, Globe2, Building2, GraduationCap, Users, ArrowRight
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

function PublicTeam() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Our Team"
            title={<>Senior <span className="gold-text">Executive Leadership</span> at PQS.</>}
            subtitle="The Senior Executive Team brings together decades of global leadership experience across investment banking, private equity, quantitative trading, institutional finance, commodities, emerging technologies, and strategic advisory services."
          />
        </div>
      </section>

      {/* Senior Executive Leadership */}
      <section className="container-page pb-20 md:pb-28">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <div className="eyebrow">Senior Executive Leadership Team</div>
            <p className="text-sand-50/75 leading-relaxed">
              The team combines deep expertise in capital markets, systematic trading, cross-border
              transactions, operational scaling, and institutional relationship management to
              deliver sophisticated investment and advisory solutions across global markets.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              Collectively, the leadership team has structured and advised on hundreds of millions
              of dollars in international transactions spanning technology, telecommunications,
              commodities, pharmaceuticals, infrastructure, mining, real estate development,
              digital assets, and alternative investments. Their experience includes working with
              institutional investors, family offices, ultra-high-net-worth individuals, hedge
              funds, banks, sovereign-related entities, and multinational corporations.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              The executive leadership possesses extensive expertise in mergers and acquisitions,
              private equity structuring, trade finance, wealth management, and strategic
              enterprise growth — including building and scaling international advisory platforms,
              developing institutional partnerships, leading complex negotiations across multiple
              jurisdictions, and executing innovative financing structures designed to support
              long-term value creation and operational efficiency.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              On the quantitative and trading side, the team brings substantial experience in
              systematic macro strategies, systematic trading, electronic market
              infrastructure, and low-latency execution systems across foreign exchange and
              precious metals markets. Their capabilities include the design and deployment of
              algorithmic trading strategies driven by market microstructure, order book analytics,
              statistical arbitrage, liquidity modeling, and real-time risk management frameworks
              operating in highly dynamic global markets.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              The team also has significant operational experience building institutional-grade
              trading infrastructure, including liquidity aggregation systems, prime brokerage
              relationships, execution architecture, risk management protocols, and automated
              portfolio allocation frameworks. This experience has provided deep insight into
              electronic market behavior, dealer pricing mechanisms, liquidity provisioning, and
              cross-asset trading dynamics.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              In addition to financial markets expertise, the executive team has successfully led
              initiatives in emerging technologies, AI commercialization, crypto-backed lending
              structures, commodity procurement and trade finance, pharmaceutical manufacturing
              platforms, infrastructure financing, and affordable real estate development projects.
              Their multidisciplinary approach integrates financial discipline, operational
              execution, strategic partnerships, and global market connectivity.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              Supported by strong academic foundations in finance, actuarial science, statistics,
              economics, and business administration, the leadership team combines analytical rigor
              with entrepreneurial execution, positioning the organization to identify
              opportunities, manage risk effectively, and deliver innovative solutions across
              evolving global markets.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 lg:sticky lg:top-28">
            {[
              { i: Briefcase, t: 'Cross-Border', v: 'Transactions' },
              { i: TrendingUp, t: 'Systematic', v: 'Trading' },
              { i: Globe2, t: 'Global Markets', v: 'Connectivity' },
              { i: Building2, t: 'Institutional', v: 'Relationships' },
              { i: GraduationCap, t: 'Analytical', v: 'Rigor' },
              { i: Users, t: 'Multidisciplinary', v: 'Approach' }
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-glass p-5"
              >
                <s.i size={18} className="text-gold-300" />
                <div className="mt-3 text-sm text-sand-50">{s.t}</div>
                <div className="mt-1 font-display text-xl gold-text">{s.v}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance & Support Team */}
      <section className="container-page pb-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 lg:sticky lg:top-28 order-2 lg:order-1">
            {[
              { i: ShieldCheck, t: 'AML/CFT', v: 'Compliance' },
              { i: FileCheck2, t: 'Fund Accounting', v: 'IFRS / GAAP' },
              { i: Scale, t: 'Governance', v: 'Frameworks' },
              { i: Lock, t: 'Sanctions', v: 'Screening' },
              { i: BookOpenCheck, t: 'Regulatory', v: 'Reporting' },
              { i: Users, t: 'KYC / CDD', v: 'Procedures' }
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-glass p-5"
              >
                <s.i size={18} className="text-gold-300" />
                <div className="mt-3 text-sm text-sand-50">{s.t}</div>
                <div className="mt-1 font-display text-xl gold-text">{s.v}</div>
              </motion.div>
            ))}
          </div>
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="eyebrow">Compliance & Support Team</div>
            <h3 className="h-display text-3xl md:text-4xl leading-snug">
              Decades of <span className="gold-text">regulatory and operational</span> experience.
            </h3>
            <p className="text-sand-50/75 leading-relaxed">
              Our Compliance & Support Team brings together a highly experienced group of
              professionals with extensive expertise across financial services, fund
              administration, banking operations, accounting, legal advisory, AML/CFT compliance,
              and regulatory governance. Collectively, the team possesses decades of industry
              experience supporting regulated entities, investment structures, financial
              institutions, and international business operations.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              The team has substantial experience in fund accounting and financial operations,
              including NAV computation, financial reporting under IFRS and GAAP standards,
              taxation, investor reporting, cash flow management, and corporate administration.
              Members of the team have worked extensively with global business companies,
              investment funds, and portfolio management structures while supporting auditors,
              investment managers, brokers, and regulatory authorities. Their expertise also
              extends to process automation, financial systems implementation, and operational
              efficiency improvements.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              In the area of compliance and regulatory oversight, the team demonstrates strong
              capabilities in AML/CFT compliance, KYC and customer due diligence procedures,
              sanctions screening, transaction monitoring, FATCA and CRS reporting, governance
              frameworks, and regulatory inspections. The team has practical experience serving as
              Compliance Officers, MLROs, and compliance advisors for regulated entities within
              the financial services and fintech sectors, ensuring adherence to evolving
              regulatory requirements and international best practices.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              The team also benefits from extensive banking and financial crime operations
              expertise gained through senior roles within leading banking institutions. This
              includes experience in sanctions monitoring, politically exposed persons (PEP)
              screening, AML watchlist management, financial crime reporting, operational risk
              management, retail onboarding compliance, and banking operations oversight. Their
              strong understanding of regulatory expectations supports robust risk management and
              internal control frameworks.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              In addition, the team possesses strong legal and governance capabilities, including
              legal advisory services, regulatory interpretation, contract drafting, compliance
              audits, policy implementation, and board-level reporting. Experience spans
              traditional financial services as well as emerging sectors such as fintech,
              blockchain, and digital assets, enabling the team to navigate increasingly complex
              regulatory environments with confidence and professionalism.
            </p>
            <p className="text-sand-50/70 leading-relaxed">
              Supported by internationally recognized qualifications and hands-on industry
              experience, the Compliance & Support Team is committed to maintaining the highest
              standards of integrity, operational excellence, regulatory compliance, and client
              service across all aspects of its work.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
const complianceTeam = [
  {
    role: 'Senior Portfolio Accountant | Fund Administration & Financial Operations Specialist',
    body: [
      'A qualified ACCA professional with extensive experience in fund accounting, financial reporting, taxation, and corporate administration within the financial services industry. Specializes in the preparation and review of Net Asset Value (NAV) calculations for investment funds across daily, monthly, and quarterly cycles, while overseeing broker data transformation, financial process automation, management and performance fee calculations, and coordination with auditors, brokers, investment managers, and clients.',
      'Brings significant expertise in fund administration, investor reporting, KYC and CDD compliance, IFRS and GAAP financial statement review, and regulatory reporting including FATCA and CRS obligations. Possesses strong analytical and operational capabilities with practical experience in accounting automation, taxation, and investor servicing, supporting complex fund structures and financial operations.'
    ]
  },
  {
    role: 'Financial Crime & Banking Operations Specialist',
    body: [
      'A seasoned financial services professional with over two decades of experience across banking operations, financial crime compliance, AML monitoring, sanctions screening, and regulatory oversight. Extensive expertise in sanctions alert monitoring, politically exposed persons (PEP) screening, AML watchlist management, enhanced due diligence reviews, and financial crime reporting within the banking sector.',
      'Experienced in ensuring compliance with regulations issued by major regulatory authorities while supporting operational risk management and internal control functions. Professional background spans multiple banking disciplines including retail KYC onboarding, bancassurance, insurance operations, affluent client servicing, and underwriting. Combines strong analytical capabilities with extensive operational knowledge to support robust compliance and governance frameworks.'
    ]
  },
  {
    role: 'Accounting & Regulatory Reporting Specialist',
    body: [
      'An ACCA-qualified accounting professional with strong experience in accounting, finance operations, taxation, and regulatory reporting across domestic and global business sectors. Expertise includes preparation of financial statements, regulatory compliance management, payroll administration, cash flow reporting, audit coordination, and operational financial support for domestic and GBC entities.',
      'Highly experienced in IFRS reporting standards, tax compliance management, and regulatory filings through direct engagement with regulatory authorities and auditors. Demonstrates advanced proficiency in accounting systems including Sage 50, Sage 200, and QuickBooks, while utilizing automation and reporting tools to improve operational efficiency. Recognized for analytical thinking, leadership qualities, and strong communication skills in supporting financial governance and reporting functions.'
    ]
  },
  {
    role: 'Legal & AML/CFT Compliance Advisor',
    body: [
      'An experienced legal and compliance professional with deep expertise in AML/CFT compliance, regulatory advisory, legal risk management, and financial services governance. Extensive international experience across Mauritius and London within banking, fintech, capital markets, and financial services sectors.',
      'Provides advisory services on AML/CFT frameworks, risk assessments, customer due diligence procedures, compliance audits, regulatory reporting obligations, and governance structures. Has held senior compliance leadership roles responsible for managing compliance risk frameworks, implementing AML/CFT policies, supervising KYC controls, and advising boards and executive management on regulatory obligations.',
      'Combines strong legal expertise with practical experience in derivatives documentation, regulatory compliance, fintech, blockchain, and digital assets, delivering strategic guidance across both traditional and emerging financial sectors.'
    ]
  },
  {
    role: 'Compliance Manager & MLRO',
    body: [
      'An experienced compliance and risk management professional specializing in AML/CFT compliance, governance, internal controls, fintech regulation, and operational risk oversight. Extensive experience serving in senior compliance roles across financial services and fintech organizations, with responsibilities covering client onboarding compliance, periodic CDD reviews, AML/CFT framework monitoring, transaction monitoring, compliance committee reporting, regulatory inspections, and independent AML/CFT audit coordination.',
      'Possesses specialized exposure to blockchain technology, digital asset custody services, crypto asset compliance frameworks, and fintech licensing processes. Experienced in working with leading compliance monitoring and screening platforms while supporting external audits and regulatory engagements related to digital assets and emerging technologies.',
      'Combines strong analytical capabilities with practical compliance leadership and governance expertise to support regulatory compliance, operational integrity, and risk management initiatives across regulated financial environments.'
    ]
  }
]

function MemberTeam() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Our Team"
            title={<>Compliance & <span className="gold-text">Support Team</span>.</>}
            subtitle="A dedicated team of qualified specialists supporting fund administration, regulatory governance, AML/CFT compliance, and operational integrity."
          />
        </div>
      </section>

      {/* Pointer to Executive Leadership page */}
      <section className="container-page pb-12">
        <Link to="/leadership"
          className="card-glass p-6 md:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-gold-500/[0.04] hover:border-gold-500/30 transition-colors group"
        >
          <div>
            <div className="eyebrow mb-2">Executive Leadership</div>
            <div className="font-display text-2xl text-sand-50">
              Meet the <span className="gold-text">Senior Executive Team</span>.
            </div>
            <div className="mt-1.5 text-sm text-sand-50/65 max-w-2xl">
              Named profiles for the Managing Directors leading PQS Fund SPC across quantitative trading, capital markets, and strategic advisory.
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 text-sm text-gold-300 group-hover:text-gold-200 flex-shrink-0">
            View leadership <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
          </span>
        </Link>
      </section>

      {/* Compliance & Support Team — unnamed profiles */}
      <section className="container-page pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-5">
          {complianceTeam.map((m, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-glass p-7"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-ink-900 border border-gold-500/30 grid place-items-center text-gold-300">
                  <ShieldCheck size={18} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-gold-300/80">
                  Profile · 0{i + 1}
                </div>
              </div>
              <h4 className="mt-5 font-display text-xl leading-snug text-sand-50">
                {m.role}
              </h4>
              <div className="mt-4 space-y-3">
                {m.body.map((p, j) => (
                  <p key={j} className="text-sm text-sand-50/70 leading-relaxed">{p}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default function Team() {
  const { user } = useAuth()
  return user ? <MemberTeam /> : <PublicTeam />
}
