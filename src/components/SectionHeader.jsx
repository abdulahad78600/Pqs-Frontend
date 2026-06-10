import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, subtitle, align = 'left', children }) {
  const alignment = align === 'center' ? 'text-center mx-auto' : ''
  return (
    <div className={`max-w-3xl ${alignment}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="eyebrow mb-4"
        >
          {eyebrow}
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
        className="h-display text-4xl md:text-5xl leading-tight"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-base md:text-lg text-sand-50/65 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
      {children}
    </div>
  )
}
