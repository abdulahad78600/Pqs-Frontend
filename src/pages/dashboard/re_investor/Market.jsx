import { motion } from 'framer-motion'
import { Globe2, TrendingUp, TrendingDown, Building } from 'lucide-react'
import { StatCard, PanelCard, AIInsightCard } from '../../../components/dashboard/widgets.jsx'

const MARKETS = [
  { city: 'Dubai',     yoy: 9.4,  yieldRange: '6.5–8.2%', sentiment: 'Strong' },
  { city: 'London',    yoy: 2.1,  yieldRange: '4.0–5.6%', sentiment: 'Stable' },
  { city: 'Singapore', yoy: 7.2,  yieldRange: '5.8–7.4%', sentiment: 'Strong' },
  { city: 'Lisbon',    yoy: 5.0,  yieldRange: '5.2–6.8%', sentiment: 'Stable' },
  { city: 'Frankfurt', yoy: -1.4, yieldRange: '3.8–5.1%', sentiment: 'Cautious' },
]

const TONE = {
  Strong:   'bg-emerald-500/15 text-emerald-300',
  Stable:   'bg-sky-500/15 text-sky-300',
  Cautious: 'bg-gold-500/15 text-gold-200',
}

export default function REMarket() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Market intelligence</h2>
        <p className="text-sm text-sand-50/60 mt-1">Real-time signals on real-estate markets where PQS is active or evaluating exposure.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Markets tracked"    value="24" icon={Globe2} />
        <StatCard label="Markets up YoY"     value="18" icon={TrendingUp} accent="emerald" />
        <StatCard label="Markets down YoY"   value="3"  icon={TrendingDown} />
        <StatCard label="New launches Q1"    value="6"  icon={Building} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <PanelCard className="lg:col-span-2" eyebrow="Markets" title="Top tracked cities" accent>
          <div className="space-y-2">
            {MARKETS.map((m, i) => (
              <motion.div key={m.city}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8"
              >
                <div className="col-span-3 font-display text-sand-50">{m.city}</div>
                <div className="col-span-3 text-xs text-sand-50/65">YoY: <span className={m.yoy >= 0 ? 'text-emerald-300' : 'text-rose-300'}>{m.yoy >= 0 ? '+' : ''}{m.yoy.toFixed(1)}%</span></div>
                <div className="col-span-4 text-xs text-sand-50/65">Yields {m.yieldRange}</div>
                <div className="col-span-2 flex justify-end">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[m.sentiment]}`}>
                    {m.sentiment}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        <AIInsightCard
          title="Singapore industrial — opportunity window"
          body="Tightening logistics supply combined with a sustained 7%+ YoY rental uplift suggests adding incremental industrial exposure in Singapore over the next two quarters."
        />
      </div>
    </div>
  )
}
