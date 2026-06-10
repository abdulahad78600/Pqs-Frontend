import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react'

export function StatCard({ label, value, delta, deltaType = 'up', icon: Icon, accent = 'gold' }) {
  const isUp = deltaType === 'up'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="card-glass p-5 relative overflow-hidden"
    >
      <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl ${
        accent === 'gold' ? 'bg-gold-500/10' : accent === 'emerald' ? 'bg-emerald-500/10' : 'bg-sky-500/10'
      }`} />
      <div className="relative flex items-start justify-between">
        <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
        {Icon && <Icon size={16} className="text-gold-300" />}
      </div>
      <div className="relative mt-2 font-display text-2xl text-sand-50">{value}</div>
      {delta && (
        <div className={`relative mt-1 flex items-center gap-1 text-xs ${isUp ? 'text-emerald-300' : 'text-rose-300'}`}>
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {delta}
        </div>
      )}
    </motion.div>
  )
}

export function PanelCard({ title, action, children, eyebrow, accent, className = '' }) {
  return (
    <div className={`card-glass p-6 relative overflow-hidden ${className}`}>
      {accent && <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold-500/8 blur-2xl" />}
      <div className="relative flex items-start justify-between mb-5">
        <div>
          {eyebrow && <div className="text-[10px] uppercase tracking-widest text-gold-300/80 mb-1">{eyebrow}</div>}
          {title && <h3 className="font-display text-xl text-sand-50">{title}</h3>}
        </div>
        {action}
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}

export function AIInsightCard({ title, body }) {
  return (
    <div className="card-glass p-5 border-l-4 border-l-gold-500/60 rounded-l-md">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-300/80 mb-2">
        <Sparkles size={11} /> AI Insight
      </div>
      <div className="font-display text-sand-50">{title}</div>
      <p className="mt-2 text-xs text-sand-50/65 leading-relaxed">{body}</p>
    </div>
  )
}

export function ProgressBar({ label, value, max = 100, suffix = '%' }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-xs text-sand-50/70">{label}</div>
        <div className="text-xs text-sand-50">{value}{suffix}</div>
      </div>
      <div className="h-1.5 rounded-full bg-sand-50/8 overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-gold-400 to-gold-600"
        />
      </div>
    </div>
  )
}

export function Sparkline({ data = [12, 18, 14, 22, 28, 24, 32, 30, 38, 42, 40, 48], color = '#d8bb6a' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100
    const y = 100 - ((d - min) / (max - min || 1)) * 100
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-16">
      <defs>
        <linearGradient id="spark-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${points} 100,100`} fill="url(#spark-grad)" />
    </svg>
  )
}
