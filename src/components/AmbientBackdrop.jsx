import { motion } from 'framer-motion'

// Hero-class atmospheric backdrop with parallax orbs and a faint grid.
export default function AmbientBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      {/* grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #c9a14a22 1px, transparent 1px), linear-gradient(to bottom, #c9a14a22 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 35%, transparent 75%)'
        }}
      />
      {/* gold orb */}
      <motion.div
        className="absolute -top-40 -right-32 w-[640px] h-[640px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(216,187,106,0.28) 0%, rgba(216,187,106,0.08) 30%, rgba(216,187,106,0) 65%)'
        }}
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* steel orb */}
      <motion.div
        className="absolute top-40 -left-40 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(96,128,180,0.18) 0%, rgba(96,128,180,0.05) 35%, transparent 70%)'
        }}
        animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* film grain */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay" />
    </div>
  )
}
