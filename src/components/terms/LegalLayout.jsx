import { motion } from 'framer-motion'
import AmbientBackdrop from '../AmbientBackdrop.jsx'

export default function LegalLayout({ eyebrow, title, intro, children, lastUpdated }) {
  return (
    <div>
      <section className="relative py-20 md:py-28">
        <AmbientBackdrop />
        <div className="container-page relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {eyebrow && <div className="eyebrow mb-4">{eyebrow}</div>}
            <h1 className="h-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              {title}
            </h1>
            {intro && (
              <p className="mt-6 text-sand-50/75 leading-relaxed text-base md:text-lg">
                {intro}
              </p>
            )}
            {lastUpdated && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-sand-50/45">
                Last updated · {lastUpdated}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      <section className="container-page pb-24 md:pb-32">
        <div className="max-w-4xl legal-prose">{children}</div>
      </section>
    </div>
  )
}

export function Section({ title, children }) {
  return (
    <section className="mt-12 first:mt-0">
      <h2 className="font-display text-2xl md:text-3xl text-sand-50 leading-snug">
        {title}
      </h2>
      <div className="mt-2 h-px w-16 bg-gradient-to-r from-gold-400/70 to-transparent" />
      <div className="mt-5 space-y-4 text-sand-50/75 leading-relaxed">
        {children}
      </div>
    </section>
  )
}

export function SubSection({ title, children }) {
  return (
    <div className="mt-6">
      <h3 className="font-display text-lg md:text-xl text-gold-200/95">{title}</h3>
      <div className="mt-3 space-y-3 text-sand-50/75 leading-relaxed">{children}</div>
    </div>
  )
}

export function Paragraphs({ text }) {
  return text
    .split('\n\n')
    .filter(Boolean)
    .map((p, i) => <p key={i}>{p}</p>)
}
