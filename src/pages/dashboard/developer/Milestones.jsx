import { motion } from 'framer-motion'
import { Flag, Calendar, CheckCircle2, AlertTriangle } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const MILESTONES = [
  { id: 'MS-441', project: 'P-2041 · Marina Heights', name: 'Structural completion', due: '2026-06-30', status: 'On track' },
  { id: 'MS-440', project: 'P-2032 · Hyde Park Annex', name: 'Foundation cure',      due: '2026-05-12', status: 'Delayed'  },
  { id: 'MS-439', project: 'P-2028 · Riverside',       name: 'Final inspection',     due: '2026-05-22', status: 'On track' },
  { id: 'MS-438', project: 'P-2038 · Atlantic Plaza',  name: 'Façade install',       due: '2026-07-04', status: 'On track' },
  { id: 'MS-437', project: 'P-2041 · Marina Heights',  name: 'MEP rough-in',         due: '2026-04-18', status: 'Complete' },
]

const TONE = {
  'On track':  'bg-sky-500/15 text-sky-300',
  'Delayed':   'bg-gold-500/15 text-gold-200',
  'At risk':   'bg-rose-500/15 text-rose-300',
  'Complete':  'bg-emerald-500/15 text-emerald-300',
}

export default function DeveloperMilestones() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Milestones</h2>
        <p className="text-sm text-sand-50/60 mt-1">Critical path checkpoints across active projects.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total milestones" value="62" icon={Flag} />
        <StatCard label="Due this month"   value="8"  icon={Calendar} />
        <StatCard label="Completed YTD"    value="34" icon={CheckCircle2} accent="emerald" />
        <StatCard label="Delayed"          value="3"  icon={AlertTriangle} />
      </div>

      <PanelCard eyebrow="Schedule" title="Upcoming milestones" accent>
        <div className="space-y-2">
          {MILESTONES.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8"
            >
              <div className="col-span-2 text-[10px] uppercase tracking-widest text-gold-300/80">{m.id}</div>
              <div className="col-span-4 text-xs text-sand-50/65">{m.project}</div>
              <div className="col-span-3 font-display text-sand-50">{m.name}</div>
              <div className="col-span-2 text-xs text-sand-50/55"><Calendar size={11} className="inline mr-1" />{m.due}</div>
              <div className="col-span-1 flex justify-end">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[m.status]}`}>
                  {m.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
