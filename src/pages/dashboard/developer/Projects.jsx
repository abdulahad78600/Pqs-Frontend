import { motion } from 'framer-motion'
import { HardHat, Hammer, MapPin, Plus } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar } from '../../../components/dashboard/widgets.jsx'

const PROJECTS = [
  { code: 'P-2041', name: 'Marina Heights — Phase II', city: 'Dubai',  type: 'Residential', progress: 72, status: 'On track' },
  { code: 'P-2038', name: 'Atlantic Plaza Refurb',     city: 'Lisbon', type: 'Office',      progress: 48, status: 'On track' },
  { code: 'P-2032', name: 'Hyde Park Tower Annex',     city: 'London', type: 'Mixed-use',   progress: 14, status: 'Delayed' },
  { code: 'P-2028', name: 'Riverside Logistics Park',  city: 'Rotterdam', type: 'Industrial', progress: 91, status: 'On track' },
]

const TONE = {
  'On track': 'bg-emerald-500/15 text-emerald-300',
  'Delayed':  'bg-gold-500/15 text-gold-200',
  'At risk':  'bg-rose-500/15 text-rose-300',
}

export default function DeveloperProjects() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Projects</h2>
          <p className="text-sm text-sand-50/60 mt-1">Active development sites and their construction progress.</p>
        </div>
        <button className="btn-primary text-xs py-2"><Plus size={14}/> New project</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active sites"   value="9"     icon={HardHat} />
        <StatCard label="Cities"         value="6"     icon={MapPin} />
        <StatCard label="Avg. progress"  value="58%"   icon={Hammer} accent="emerald" />
        <StatCard label="At risk"        value="1"     icon={HardHat} />
      </div>

      <PanelCard eyebrow="Builds" title="Active development projects" accent>
        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5"
            >
              <div className="grid lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-5">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.code} · {p.type}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{p.name}</div>
                  <div className="mt-1 text-xs text-sand-50/55"><MapPin size={11} className="inline mr-1" />{p.city}</div>
                </div>
                <div className="lg:col-span-5">
                  <ProgressBar label="Construction" value={p.progress} suffix="%" />
                </div>
                <div className="lg:col-span-2 flex justify-end">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[p.status]}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
