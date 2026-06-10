import { motion } from 'framer-motion'
import { Stethoscope, Users, Activity, AlertCircle } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar } from '../../../components/dashboard/widgets.jsx'

const TRIALS = [
  { id: 'CT-2025-019', drug: 'PQS-RX-031', phase: 'Phase II', sites: 14, enrolled: 312, target: 480, status: 'Recruiting' },
  { id: 'CT-2024-087', drug: 'PQS-RX-009', phase: 'Phase III', sites: 32, enrolled: 1284, target: 1500, status: 'Active' },
  { id: 'CT-2025-004', drug: 'PQS-RX-022', phase: 'Phase I', sites: 4, enrolled: 48, target: 60, status: 'Active' },
]

const TONE = {
  Recruiting: 'bg-gold-500/15 text-gold-200',
  Active:     'bg-emerald-500/15 text-emerald-300',
  Closed:     'bg-sand-50/10 text-sand-50/65',
}

export default function PharmaClinical() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Clinical trials</h2>
        <p className="text-sm text-sand-50/60 mt-1">Active studies, enrollment progress, and safety signals across our trial network.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active trials"   value="9"   icon={Stethoscope} />
        <StatCard label="Patients enrolled" value="1,644" icon={Users} accent="emerald" />
        <StatCard label="Sites"           value="50"  icon={Activity} />
        <StatCard label="Open SAEs"       value="2"   icon={AlertCircle} />
      </div>

      <PanelCard eyebrow="Studies" title="Trial enrollment status" accent>
        <div className="space-y-4">
          {TRIALS.map((t, i) => {
            const pct = Math.round((t.enrolled / t.target) * 100)
            return (
              <motion.div key={t.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card-glass p-5"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{t.id} · {t.phase}</div>
                    <div className="mt-1 font-display text-lg text-sand-50">{t.drug}</div>
                    <div className="mt-1 text-xs text-sand-50/55">{t.sites} sites · {t.enrolled.toLocaleString()} / {t.target.toLocaleString()} patients</div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[t.status]}`}>
                    {t.status}
                  </span>
                </div>
                <div className="mt-4">
                  <ProgressBar label="Enrollment" value={pct} suffix="%" />
                </div>
              </motion.div>
            )
          })}
        </div>
      </PanelCard>
    </div>
  )
}
