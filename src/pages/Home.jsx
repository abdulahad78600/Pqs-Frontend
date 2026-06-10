import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import {
  ArrowRight, ShieldCheck, Globe2, Layers, Landmark,
  LogIn, UserPlus, Sparkles, Lock, Building2, Coins,
  LineChart, Scale, Workflow, FileCheck2, ExternalLink, Presentation
} from 'lucide-react'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import { useAuth } from '../auth/AuthContext.jsx'

// External resource surfaced on the logged-in home page.
// (Cana Extract moved to the Investment Opportunities page.)
const PQS_PRESENTATION_URL = 'https://effortless-parfait-82fe4c.netlify.app/'

export default function Home() {
  const { user } = useAuth()
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2])

  return (
    <div>
      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center overflow-hidden">
        <AmbientBackdrop />
        <motion.div style={{ y, opacity }} className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow"
          >
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
              PQS Fund SPC
            </span>
          </motion.div>

          <h1 className="mt-6 h-display text-5xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-tight max-w-5xl">
            Secure, asset-backed <br className="hidden md:block" />
            <span className="gold-text italic">investment opportunities.</span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-8 max-w-2xl text-base md:text-lg text-sand-50/70 leading-relaxed"
          >
            PQS Fund is a Cayman Islands registered Segregated Portfolio Company (SPC) focused on
            delivering secure, asset-backed investment opportunities through institutional-grade
            structuring, disciplined risk management, and diversified private market strategies.
            {!user && (
              <span className="block mt-3 text-sand-50/55">
                Sign in or create an investor account to access the platform.
              </span>
            )}
          </motion.p>

          {!user ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/login" className="btn-primary text-base px-7 py-3.5">
                <LogIn size={18} /> Login
              </Link>
              <Link to="/get-started" className="btn-ghost text-base px-7 py-3.5 border-gold-500/40 text-gold-200 hover:bg-gold-500/10">
                <UserPlus size={18} /> Get Started
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <Link to="/dashboard" className="btn-primary">
                Open Dashboard <ArrowRight size={16} />
              </Link>
              <Link to="/funds" className="btn-ghost">Browse funds</Link>
            </motion.div>
          )}
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em] text-sand-50/40">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            scroll · fund overview
          </motion.div>
        </div>
      </section>

      {/* FUND OVERVIEW */}
      <section className="container-page py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-4">PQS Fund · Overview</div>
            <h2 className="h-display text-4xl md:text-5xl leading-tight">
              A platform for <span className="gold-text">stable, predictable</span> returns.
            </h2>
            <p className="mt-6 text-sand-50/75 leading-relaxed">
              The Fund provides investors and asset contributors access to a platform designed to
              generate stable, predictable returns while emphasizing capital preservation through
              exposure to high-quality real assets and structured investments in established
              jurisdictions.
            </p>
            <p className="mt-4 text-sand-50/70 leading-relaxed">
              Through its Cayman SPC structure, PQS is able to establish dedicated segregated
              portfolios for specific investment strategies and mandates, providing enhanced
              flexibility, transparency, and investor protection.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {[
              { i: ShieldCheck, t: 'Capital Preservation', v: 'First Principle' },
              { i: Globe2, t: 'Established', v: 'Jurisdictions' },
              { i: Layers, t: 'Segregated', v: 'Portfolios' },
              { i: Landmark, t: 'Cayman SPC', v: 'Registered under CR-434478' }
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

      {/* SPECIALIZATIONS */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Specializations"
          align="center"
          title={<>PQS <span className="gold-text">specializes</span> in.</>}
          subtitle="A curated set of strategies focused on real assets, structured finance, and disciplined market exposure."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            { i: ShieldCheck, t: 'Asset-backed investments', d: 'Exposure to high-quality real assets with structural downside protection.' },
            { i: Coins, t: 'Structured finance and private credit', d: 'Contractual cash flows underwritten with disciplined risk management.' },
            { i: Building2, t: 'Real estate and development', d: 'Diversified development opportunities across established jurisdictions.' },
            { i: LineChart, t: 'Systematic trading strategies', d: 'Systematic market participation engineered for capital efficiency.' },
            { i: Scale, t: 'Market-neutral collateral strategies', d: 'Reduced correlation to public markets through balanced exposure.' },
            { i: Workflow, t: 'Alternative and specialty finance', d: 'Bespoke structuring and specialty solutions tailored to investor mandates.' }
          ].map((v, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card-glass p-6"
            >
              <v.i size={20} className="text-gold-300" />
              <div className="mt-4 font-display text-xl">{v.t}</div>
              <p className="mt-3 text-sm text-sand-50/65 leading-relaxed">{v.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INVESTMENT APPROACH */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Investment Approach"
          title={<>Opportunities with <span className="gold-text">conviction</span>.</>}
          subtitle="The Fund's investment approach focuses on identifying opportunities with clearly defined structural protections."
        />
        <div className="mt-12 grid md:grid-cols-4 gap-6 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
          {[
            { n: '01', t: 'Contractual cash flows', d: 'Income streams secured through clearly defined contractual arrangements.' },
            { n: '02', t: 'Structural downside protection', d: 'Strategies built with embedded protections that limit capital loss.' },
            { n: '03', t: 'Asset-backed security', d: 'Investments anchored by tangible, high-quality real assets.' },
            { n: '04', t: 'Diversification', d: 'Allocation across sectors and jurisdictions to reduce concentration risk.' }
          ].map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative text-center md:text-left"
            >
              <div className="w-16 h-16 mx-auto md:mx-0 rounded-full bg-ink-900 border border-gold-500/30 grid place-items-center font-display text-gold-300 text-lg relative">
                {s.n}
                <span className="absolute inset-0 rounded-full animate-pulseGlow" />
              </div>
              <div className="mt-5 font-display text-xl">{s.t}</div>
              <p className="mt-2 text-sm text-sand-50/65 leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLATFORM OUTCOMES */}
      <section className="container-page pb-20 md:pb-28">
        <SectionHeader
          eyebrow="Platform Outcomes"
          title={<>Designed to <span className="gold-text">deliver</span>.</>}
          subtitle="PQS combines sophisticated financial structuring with real asset exposure to create a platform designed to deliver:"
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { i: Coins, t: 'Consistent income generation' },
            { i: Scale, t: 'Reduced correlation to public markets' },
            { i: LineChart, t: 'Enhanced capital efficiency' },
            { i: ShieldCheck, t: 'Long-term wealth preservation' }
          ].map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
              className="card-glass p-6"
            >
              <c.i size={20} className="text-gold-300" />
              <div className="mt-4 font-display text-lg leading-snug">{c.t}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl text-sand-50/70 leading-relaxed">
          Whether through direct investment participation or contribution of qualifying assets into
          the Fund, PQS offers customized solutions tailored to the unique objectives of each
          investor and asset partner.
        </p>
      </section>

      {/* EXTERNAL RESOURCES — PQS Presentation (logged-in only).
          Cana Extract now lives under Funds → Investment Opportunities. */}
      {user && (
        <section className="container-page pb-20 md:pb-28">
          <SectionHeader
            eyebrow="Explore more"
            align="center"
            title={<>Discover the <span className="gold-text">PQS ecosystem</span>.</>}
            subtitle="View the PQS presentation to learn more about the opportunities available."
          />
          <div className="mt-12 grid gap-5 max-w-md mx-auto">
            {/* PQS Presentation — external link */}
            <motion.a
              href={PQS_PRESENTATION_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
              className="card-glass p-7 lift-on-hover group flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-400/15 to-gold-700/15 border border-gold-500/25 grid place-items-center text-gold-300">
                  <Presentation size={22} />
                </div>
                <ExternalLink size={16} className="text-sand-50/40 group-hover:text-gold-300 transition-colors" />
              </div>
              <div className="mt-5 font-display text-2xl group-hover:text-gold-200 transition-colors">PQS Presentation</div>
              <p className="mt-3 text-sm text-sand-50/65 leading-relaxed flex-1">
                View the PQS investor presentation for a detailed overview of the platform, fund
                strategies, and the opportunities available to qualified investors.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold-300 group-hover:text-gold-200">
                View presentation <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </motion.a>
          </div>
        </section>
      )}

      {/* CTA */}
      {!user && (
        <section className="container-page pb-24 md:pb-32">
          <div className="card-glass overflow-hidden p-10 md:p-16 relative">
            <div className="absolute inset-0 bg-grid-fade pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-gold-500/10 blur-3xl" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="eyebrow flex items-center gap-2"><Sparkles size={12} /> Ready to begin</div>
                <h3 className="mt-4 h-display text-4xl md:text-5xl">
                  Access the <span className="gold-text">Investment Platform</span>.
                </h3>
                <p className="mt-5 text-sand-50/65 max-w-xl">
                  Qualified investors are encouraged to make use of the investment platform, which
                  provides streamlined access to a comprehensive range of investment resources.
                  These include multiple funds, diverse opportunities, fund parameters, and quarterly
                  reports — all available within the platform. To get started, please sign in or
                  register your investor account below.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link to="/login" className="btn-primary"><LogIn size={16}/> Login</Link>
                  <Link to="/get-started" className="btn-ghost border-gold-500/40 text-gold-200 hover:bg-gold-500/10">
                    <UserPlus size={16}/> Get Started
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { i: ShieldCheck, t: 'Capital preservation' },
                    { i: FileCheck2, t: 'Investor protection' },
                    { i: Globe2, t: 'Diversified exposure' },
                    { i: Lock, t: 'Accredited only' }
                  ].map((c, i) => (
                    <div key={i} className="card-glass p-5">
                      <c.i size={18} className="text-gold-300" />
                      <div className="mt-3 text-sm text-sand-50">{c.t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
