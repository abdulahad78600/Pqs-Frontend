// 1=very conservative, 5=high
export default function RiskMeter({ level = 2, label }) {
  const segments = 5
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1">
        {Array.from({ length: segments }).map((_, i) => (
          <span key={i}
            className={`h-1.5 w-6 rounded-full transition-colors ${
              i < level
                ? 'bg-gradient-to-r from-gold-400 to-gold-600'
                : 'bg-sand-50/10'
            }`}
          />
        ))}
      </div>
      {label && <span className="text-xs uppercase tracking-widest text-sand-50/60">{label}</span>}
    </div>
  )
}
