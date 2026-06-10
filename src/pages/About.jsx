import { motion } from 'framer-motion'
import {
  ShieldCheck, Compass, Eye, Target, Layers, MessageSquare,
  Sparkles, BookOpenCheck, Scale, Filter
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

function PublicAbout() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="About PQS"
            title={<>Disciplined investing. <span className="gold-text">Long-term alignment.</span></>}
            subtitle="PQS is a private capital platform focused on disciplined investing, structured opportunities, and long-term alignment with investors."
          />
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="eyebrow mb-4">Our Approach</div>
          <h3 className="h-display text-3xl md:text-4xl leading-snug">
            Curated private market opportunities for <span className="gold-text">accredited investors</span>.
          </h3>
          <p className="mt-6 text-sand-50/75 leading-relaxed">
            We provide accredited investors access to curated private market opportunities through
            professionally managed fund strategies designed around distinct investment objectives —
            growth, income, and capital preservation. Every strategy is built on a conviction-led
            approach that prioritizes risk management, disciplined underwriting, and thoughtful
            capital allocation.
          </p>
          <p className="mt-4 text-sand-50/70 leading-relaxed">
            Our philosophy is simple: capital preservation comes first. We believe sustainable
            returns are achieved through selective investing, rigorous analysis, and maintaining
            discipline across market cycles. Rather than pursuing volume or speculation, we focus
            on opportunities where structure, downside protection, and asymmetric return potential
            are clearly defined.
          </p>
          <p className="mt-4 text-sand-50/70 leading-relaxed">
            At PQS, transparency is fundamental. Investors deserve clarity on strategy, risk,
            structure, and expectations. We aim to provide a straightforward and professional
            experience for investors seeking exposure to alternatives without unnecessary
            complexity.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {[
            { i: ShieldCheck, t: 'Capital Preservation', v: 'Comes First' },
            { i: Target, t: 'Conviction-Led', v: 'Selective' },
            { i: Eye, t: 'Transparency', v: 'Fundamental' },
            { i: Compass, t: 'Discipline', v: 'Across Cycles' }
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

      {/* What We Stand For */}
      <section className="container-page pb-24 md:pb-32">
        <SectionHeader
          eyebrow="What We Stand For"
          title={<>Our <span className="gold-text">principles</span>.</>}
        />
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              i: BookOpenCheck,
              t: 'Discipline',
              d: 'Every investment is evaluated through a consistent framework centered on risk-adjusted returns and long-term value creation.'
            },
            {
              i: Scale,
              t: 'Alignment',
              d: 'Our strategies are built with investor interests first, emphasizing stewardship, accountability, and prudent capital management.'
            },
            {
              i: Eye,
              t: 'Transparency',
              d: 'We believe serious investors deserve honest communication, clear structures, and direct access to information.'
            },
            {
              i: Filter,
              t: 'Selective Opportunities',
              d: 'We focus on a curated set of investments where conviction is high and execution can be controlled with discipline.'
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
        <p className="mt-12 max-w-3xl text-sand-50/70 leading-relaxed">
          PQS was built for investors who value structure over speculation, clarity over noise,
          and long-term capital stewardship over short-term trends.
        </p>
      </section>
    </div>
  )
}

function MemberAbout() {
  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="About Us"
            title={<>An Investment Fund built for <span className="gold-text">disciplined private capital</span>.</>}
            subtitle="PQS was founded on a simple belief: private capital should be approached with discipline, transparency, and alignment. We provide accredited investors with structured access to a curated set of private opportunities — all managed under a single, conviction-led investment philosophy."
          />
        </div>
      </section>

      <section className="container-page pb-20 md:pb-28 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7">
          <div className="eyebrow mb-4">Our Investment Platform</div>
          <h3 className="h-display text-3xl md:text-4xl leading-snug">
            Structured access for <span className="gold-text">serious investors</span>.
          </h3>
          <p className="mt-6 text-sand-50/75 leading-relaxed">
            Our Investment Platform is designed for investors seeking more than broad market exposure. Whether
            the objective is long-term growth, dependable income, or capital preservation, PQS
            offers tailored fund strategies built around clearly defined mandates and risk
            parameters.
          </p>
          <p className="mt-4 text-sand-50/70 leading-relaxed">
            We exist to give serious investors a clear, honest, and transparent path into
            alternative investments. Every offering begins with the same principle: preserve
            capital first. From there, each strategy is structured to pursue returns appropriate to
            the investor's selected risk profile, without compromising discipline or underwriting
            standards.
          </p>
        </div>
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          {[
            { i: ShieldCheck, t: 'Preserve Capital', v: 'First' },
            { i: Target, t: 'Tailored Mandates', v: 'Defined' },
            { i: Layers, t: 'Risk Parameters', v: 'Transparent' },
            { i: Compass, t: 'Conviction-Led', v: 'Philosophy' }
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

      {/* What we focus on */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="At PQS, we focus on"
          title={<>Our <span className="gold-text">focus</span>.</>}
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: Filter, t: 'Rigorous opportunity selection' },
            { i: ShieldCheck, t: 'Thoughtful risk management' },
            { i: Scale, t: 'Alignment of interests' },
            { i: MessageSquare, t: 'Clear communication and transparency' },
            { i: Compass, t: 'Long-term capital stewardship' }
          ].map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glass p-6"
            >
              <v.i size={20} className="text-gold-300" />
              <div className="mt-4 font-display text-xl leading-snug">{v.t}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing */}
      <section className="container-page pb-24 md:pb-32">
        <div className="card-glass p-10 md:p-14 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
          <div className="relative max-w-3xl">
            <div className="eyebrow flex items-center gap-2"><Sparkles size={12} /> Our Approach</div>
            <h3 className="mt-4 h-display text-3xl md:text-4xl leading-snug">
              <span className="gold-text">Patience, structure,</span> and disciplined execution.
            </h3>
            <p className="mt-6 text-sand-50/75 leading-relaxed">
              We believe strong investing is not driven by speculation, but by patience, structure,
              and disciplined execution. Our approach emphasizes quality over volume, selective
              deployment of capital, and strategies designed to perform through changing market
              conditions.
            </p>
            <p className="mt-4 text-sand-50/70 leading-relaxed">
              PQS serves accredited investors who value institutional discipline, straightforward
              communication, and a long-term perspective on wealth creation and preservation.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function About() {
  const { user } = useAuth()
  return user ? <MemberAbout /> : <PublicAbout />
}
