import { motion } from 'framer-motion'
import { Building, MapPin, TrendingUp, Home } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar } from '../../../components/dashboard/widgets.jsx'

const PROPERTIES = [
  { code: 'RE-021', name: 'Marina Heights',       city: 'Dubai',       type: 'Residential', occupancy: 94, yield: 7.2 },
  { code: 'RE-018', name: 'Hyde Park Tower',      city: 'London',      type: 'Mixed-use',   occupancy: 88, yield: 5.8 },
  { code: 'RE-014', name: 'Marina Bay Logistics', city: 'Singapore',   type: 'Industrial',  occupancy: 100,yield: 8.4 },
  { code: 'RE-009', name: 'Atlantic Plaza',       city: 'Lisbon',      type: 'Office',      occupancy: 79, yield: 6.1 },
]

export default function REProperties() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Properties</h2>
        <p className="text-sm text-sand-50/60 mt-1">Real-estate holdings across the PQS RE Fund — occupancy, yield, and asset class.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Properties"    value="42"   icon={Building} />
        <StatCard label="Total GLA"     value="3.4M ft²" icon={Home} />
        <StatCard label="Occupancy"     value="91%"  icon={TrendingUp} accent="emerald" />
        <StatCard label="Cities"        value="18"   icon={MapPin} />
      </div>

      <PanelCard eyebrow="Holdings" title="Active assets" accent>
        <div className="space-y-3">
          {PROPERTIES.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5"
            >
              <div className="grid lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-4">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.code} · {p.type}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{p.name}</div>
                  <div className="mt-1 text-xs text-sand-50/55"><MapPin size={11} className="inline mr-1" />{p.city}</div>
                </div>
                <div className="lg:col-span-4">
                  <ProgressBar label="Occupancy" value={p.occupancy} suffix="%" />
                </div>
                <div className="lg:col-span-2">
                  <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Net yield</div>
                  <div className="mt-0.5 font-display text-base text-emerald-300">{p.yield.toFixed(1)}%</div>
                </div>
                <div className="lg:col-span-2 flex justify-end">
                  <button className="btn-ghost text-xs py-2">View asset</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
