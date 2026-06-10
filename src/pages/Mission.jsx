import { motion } from 'framer-motion'
import {
  Target, ShieldCheck, Eye, Scale, FileCheck2, Sparkles, Compass, Layers
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

export default function Mission() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Mission Statement"
            title={<>Redefining <span className="gold-text">private investing</span>.</>}
            subtitle="Our mission is to redefine private investing through a disciplined, transparent, and institutionally grounded approach that places investor alignment at the center of every decision."
          />
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="eyebrow mb-4">Our Standard</div>
          <h3 className="h-display text-3xl md:text-4xl leading-snug">
            Institutional <span className="gold-text">clarity, accountability, and rigor</span>.
          </h3>
          <p className="mt-6 text-sand-50/75 leading-relaxed">
            We believe that access to private markets should be accompanied by the same standards of
            clarity, accountability, and rigor expected of the world's leading institutional
            investment platforms.
          </p>
          <p className="mt-4 text-sand-50/70 leading-relaxed">
            We are committed to delivering thoughtfully constructed, risk-segmented investment
            strategies designed to meet the distinct objectives, mandates, and risk tolerances of
            our investors. Through rigorous underwriting, disciplined portfolio construction, and
            continuous oversight, we seek to preserve capital, generate durable long-term value,
            and maintain consistency across market cycles.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {[
            { i: Target, t: 'Investor Alignment', v: 'At the Center' },
            { i: ShieldCheck, t: 'Capital Preservation', v: 'Continuous' },
            { i: Layers, t: 'Risk-Segmented', v: 'Strategies' },
            { i: Compass, t: 'Across Market', v: 'Cycles' }
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
      </section>

      {/* Transparency */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Transparency"
          title={<>Fundamental to our <span className="gold-text">philosophy</span>.</>}
        />
        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {[
            {
              i: FileCheck2,
              t: 'Comprehensive reporting',
              d: 'Detailed reporting that lets investors evaluate performance, risk exposure, and portfolio positioning with confidence and precision.'
            },
            {
              i: Eye,
              t: 'Independent verification',
              d: 'Third-party verification underpins every disclosure — investors can rely on what they see.'
            },
            {
              i: Scale,
              t: 'Uncompromising governance',
              d: 'Institutional investment discipline combined with governance standards designed for enduring partnerships.'
            }
          ].map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glass p-6"
            >
              <v.i size={20} className="text-gold-300" />
              <div className="mt-4 font-display text-2xl">{v.t}</div>
              <p className="mt-3 text-sm text-sand-50/65 leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="container-page pb-24 md:pb-32">
        <div className="card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="eyebrow flex items-center gap-2"><Sparkles size={12} /> Our Purpose</div>
            <h3 className="mt-4 h-display text-3xl md:text-4xl leading-snug">
              A higher standard for how <span className="gold-text">private capital is stewarded</span>.
            </h3>
            <p className="mt-6 text-sand-50/75 leading-relaxed">
              By combining institutional investment discipline with uncompromising governance
              standards, we strive to build enduring partnerships founded on trust, integrity, and
              alignment of interests.
            </p>
            <p className="mt-4 text-sand-50/70 leading-relaxed">
              Our purpose is not only to provide access to private investment opportunities, but to
              establish a higher standard for how private capital is managed, communicated, and
              stewarded on behalf of investors.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
