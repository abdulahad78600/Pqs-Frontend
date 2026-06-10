import { motion } from 'framer-motion'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

const overview = [
  'The Senior Executive Team represents a multidisciplinary leadership group with extensive global experience spanning investment banking, quantitative finance, private equity, institutional trading, wealth management, commodities, telecommunications, infrastructure development, emerging technologies, and international advisory services.',
  'The leadership platform has been built upon decades of combined experience operating across highly regulated financial markets, institutional capital environments, and cross-border transactional ecosystems throughout North America, Europe, Asia, the Middle East, and emerging international markets.',
  'The executive leadership combines institutional financial expertise with entrepreneurial execution, creating a uniquely diversified management platform capable of identifying opportunities, structuring sophisticated investment solutions, managing operational complexity, and navigating evolving global market conditions. Their collective experience encompasses institutional capital raising, strategic acquisitions, private equity placements, quantitative trading systems, trade finance, real estate development, structured lending, infrastructure financing, and international business transformation initiatives.'
]

const pillars = [
  {
    eyebrow: '01',
    title: 'Quantitative Trading & Electronic Market Infrastructure',
    paragraphs: [
      'A core pillar of the leadership team’s expertise lies in quantitative trading, systematic macro strategies, and electronic market infrastructure. The team has extensive experience designing, developing, and scaling institutional-grade systematic trading platforms focused on global foreign exchange, precious metals, and multi-asset trading environments. Their work has involved the development of highly sophisticated trading models utilizing market microstructure analytics, statistical arbitrage frameworks, cross-venue liquidity analysis, volatility regime detection, and short-horizon alpha extraction methodologies.',
      'The executive leadership has engineered and overseen advanced automated trading systems capable of operating in highly leveraged, systematic, and latency-sensitive institutional environments. This includes the implementation of low-latency execution architecture, smart order routing systems, liquidity aggregation frameworks, real-time risk monitoring engines, fill probability modeling, and dynamic leverage allocation systems designed to optimize execution quality while maintaining strict institutional risk controls.',
      'Through leadership roles within proprietary trading firms, institutional brokerage platforms, and private capital environments, the team has gained deep expertise in dealer pricing behavior, electronic execution science, liquidity provisioning dynamics, inventory management, order book analytics, and fragmented market structure optimization. Their experience includes building institutional trading infrastructure from inception, managing prime brokerage relationships, negotiating ISDA agreements, integrating multi-bank liquidity providers, and implementing sophisticated portfolio construction frameworks calibrated to volatility, liquidity, and cross-asset correlations.'
    ]
  },
  {
    eyebrow: '02',
    title: 'Investment Banking, M&A & International Capital Formation',
    paragraphs: [
      'In parallel with their quantitative and institutional trading capabilities, the executive team possesses substantial experience across investment banking, mergers and acquisitions, private equity advisory, and international capital formation. Throughout their careers, the leadership group has structured and advised on transactions totaling hundreds of millions of dollars across sectors including technology, telecommunications, infrastructure, pharmaceuticals, mining, commodities, energy, cannabis, digital assets, and real estate development.',
      'Their transaction experience includes leading complex cross-border acquisitions, private equity placements, structured financings, recapitalizations, joint ventures, and strategic restructurings involving institutional investors, sovereign-related entities, family offices, multinational corporations, and ultra-high-net-worth individuals. The leadership team has extensive experience coordinating international legal, banking, and compliance frameworks across multiple jurisdictions while managing the operational and regulatory complexities associated with global transactions.'
    ]
  },
  {
    eyebrow: '03',
    title: 'Wealth Management & Strategic Capital Planning',
    paragraphs: [
      'The executive platform also brings significant expertise in wealth management, institutional advisory services, and strategic capital planning for sophisticated investors and family offices. This includes the design of bespoke investment structures, liquidity management solutions, asset acquisition strategies, cross-border banking arrangements, international compliance frameworks, and alternative investment vehicles tailored to long-term capital preservation and growth objectives.'
    ]
  },
  {
    eyebrow: '04',
    title: 'Commodities, Trade Finance & Global Supply Chains',
    paragraphs: [
      'The leadership team has further demonstrated strong capabilities in commodities procurement, international trade finance, and structured global supply chain transactions involving both hard and soft commodities. Their experience spans oil, LNG, hydrogen, uranium, metals, fertilizers, and other strategic resources, including the structuring of trade finance arrangements compliant with international banking standards and commercial frameworks.',
      'This includes experience managing complex procurement operations, coordinating global counterparties, and implementing financing solutions supported by international banking institutions.'
    ]
  },
  {
    eyebrow: '05',
    title: 'Emerging Technologies & Alternative Asset Sectors',
    paragraphs: [
      'Beyond traditional financial markets, the executive leadership has been actively involved in the commercialization and financing of emerging technologies and alternative asset sectors. Their work has included pioneering crypto-collateralized lending structures, facilitating institutional digital asset financing solutions, advising on AI and software commercialization strategies, and supporting pharmaceutical extraction and manufacturing initiatives regulated under international compliance standards.'
    ]
  },
  {
    eyebrow: '06',
    title: 'Infrastructure Development & Real Estate Investment',
    paragraphs: [
      'The leadership team has also played a strategic role in infrastructure development and real estate investment initiatives, particularly within long-term care, retirement living, and community-focused development projects. This includes the structuring of real estate investment vehicles, infrastructure-backed financing models, and development platforms designed to attract institutional capital while addressing long-term demographic and social infrastructure needs.'
    ]
  },
  {
    eyebrow: '07',
    title: 'Enterprise Leadership & Operational Transformation',
    paragraphs: [
      'Operationally, the executive group possesses substantial enterprise leadership experience across banking, telecommunications, and technology sectors. This includes managing large-scale enterprise portfolios, leading strategic revenue growth initiatives, negotiating international commercial partnerships, scaling technology-driven businesses, and overseeing complex operational transformation projects across global markets. The leadership team has consistently demonstrated an ability to integrate operational discipline with strategic growth initiatives while maintaining strong governance and institutional oversight standards.'
    ]
  },
  {
    eyebrow: '08',
    title: 'Academic & Professional Foundations',
    paragraphs: [
      'Academically and professionally, the executive leadership is supported by advanced educational foundations in actuarial science, financial mathematics, statistics, probability theory, enterprise analysis, finance, marketing, strategic management, and international law. This multidisciplinary expertise provides the organization with a highly analytical, research-driven, and risk-focused approach to investment management, capital allocation, operational execution, and strategic decision-making.'
    ]
  }
]

const disciplines = [
  'Investment Banking',
  'Quantitative Finance',
  'Private Equity',
  'Institutional Trading',
  'Wealth Management',
  'Commodities & Trade Finance',
  'Telecommunications',
  'Infrastructure Development',
  'Emerging Technologies',
  'International Advisory'
]

const regions = [
  'North America',
  'Europe',
  'Asia',
  'Middle East',
  'Emerging Markets'
]

export default function Leadership() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Executive Leadership"
            title={<>Senior <span className="gold-text">Executive Team</span>.</>}
            subtitle="A globally connected, institutionally disciplined leadership framework focused on capital preservation, strategic innovation, operational excellence, and sustainable long-term value creation."
          />
        </div>
      </section>

      {/* Overview narrative */}
      <section className="mx-auto max-w-[1500px] px-4 md:px-8 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-glass p-8 md:p-12 ring-1 ring-gold-500/30 bg-gold-500/[0.03] shadow-[0_0_60px_-15px_rgba(212,175,90,0.25)]"
        >
          <div className="flex items-center gap-3 pb-6 border-b border-sand-50/8">
            <div className="text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
              Leadership Overview
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
          </div>
          <div className="mt-8 space-y-4">
            {overview.map((p, i) => (
              <p
                key={i}
                className={`leading-relaxed ${i === 0 ? 'text-sand-50/75' : 'text-sand-50/70'}`}
              >
                {p}
              </p>
            ))}
          </div>

          {/* Disciplines + regions */}
          <div className="mt-10 grid md:grid-cols-2 gap-8 pt-8 border-t border-sand-50/8">
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold-300/80 mb-4">
                Core Disciplines
              </div>
              <div className="flex flex-wrap gap-2">
                {disciplines.map((d) => (
                  <span
                    key={d}
                    className="text-[12px] px-3 py-1.5 rounded-full bg-sand-50/[0.04] border border-sand-50/10 text-sand-50/80"
                  >
                    {d}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.4em] text-gold-300/80 mb-4">
                Global Footprint
              </div>
              <div className="flex flex-wrap gap-2">
                {regions.map((r) => (
                  <span
                    key={r}
                    className="text-[12px] px-3 py-1.5 rounded-full bg-gold-500/[0.06] border border-gold-500/25 text-gold-200/90"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pillars grid */}
      <section className="mx-auto max-w-[1500px] px-4 md:px-8 pb-16 md:pb-20">
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {pillars.map((pillar, idx) => (
            <motion.article
              key={pillar.eyebrow}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (idx % 2) * 0.08 }}
              className="card-glass p-8 md:p-10 h-full"
            >
              <div className="flex flex-col gap-3 pb-5 border-b border-sand-50/8">
                <div className="flex items-center gap-3">
                  <div className="text-[10px] uppercase tracking-[0.4em] text-gold-300/80">
                    {pillar.eyebrow} · Pillar
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-gold-500/20 to-transparent" />
                </div>
                <h3 className="h-display text-2xl md:text-[28px] leading-tight text-sand-50">
                  {pillar.title}
                </h3>
              </div>
              <div className="mt-5 space-y-3">
                {pillar.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`leading-relaxed ${
                      i === 0 ? 'text-sand-50/85 text-[15px]' : 'text-sand-50/70 text-[14px]'
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Closing statement */}
      <section className="mx-auto max-w-[1500px] px-4 md:px-8 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-glass p-8 md:p-12 text-center"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] text-gold-300/80 mb-5">
            Collective Mandate
          </div>
          <p className="max-w-4xl mx-auto leading-relaxed text-sand-50/75">
            Collectively, the Senior Executive Team provides a globally connected and institutionally disciplined leadership framework focused on capital preservation, strategic innovation, operational excellence, and sustainable long-term value creation. Through the integration of quantitative rigor, institutional financial expertise, global transaction experience, and entrepreneurial leadership, the team is positioned to navigate complex international markets while delivering sophisticated solutions aligned with the evolving needs of investors, partners, and stakeholders.
          </p>
        </motion.div>
      </section>
    </div>
  )
}
