import { motion } from 'framer-motion'
import { HardHat, Hammer, Calendar, DollarSign } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar } from '../../../components/dashboard/widgets.jsx'

const PROJECTS = [
  { code: 'DEV-031', name: 'Marina Heights — Phase II', city: 'Dubai',    progress: 72, due: 'Q4 2026', budget: '$184M' },
  { code: 'DEV-024', name: 'Atlantic Plaza Refurb',     city: 'Lisbon',   progress: 48, due: 'Q2 2027', budget: '$62M'  },
  { code: 'DEV-019', name: 'Hyde Park Tower — Annex',   city: 'London',   progress: 14, due: 'Q1 2028', budget: '$210M' },
]

export default function REDevelopment() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Development pipeline</h2>
        <p className="text-sm text-sand-50/60 mt-1">Active construction, refurbishment, and ground-up projects across the PQS RE portfolio.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active projects"   value="9"     icon={HardHat} />
        <StatCard label="Capex committed"   value="$842M" icon={DollarSign} />
        <StatCard label="Avg. completion"   value="58%"   icon={Hammer} accent="emerald" />
        <StatCard label="Next delivery"     value="Q4 26" icon={Calendar} />
      </div>

      <PanelCard eyebrow="Pipeline" title="Active development projects" accent>
        <div className="space-y-3">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5"
            >
              <div className="grid lg:grid-cols-12 gap-4 items-center">
                <div className="lg:col-span-5">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.code} · {p.city}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{p.name}</div>
                </div>
                <div className="lg:col-span-4">
                  <ProgressBar label="Construction progress" value={p.progress} suffix="%" />
                </div>
                <div className="lg:col-span-3 grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Budget</div>
                    <div className="mt-0.5 font-display text-base text-sand-50">{p.budget}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Delivery</div>
                    <div className="mt-0.5 font-display text-base text-sand-50">{p.due}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
