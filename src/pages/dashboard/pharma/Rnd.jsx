import { motion } from 'framer-motion'
import { FlaskConical, Beaker, Microscope, Calendar } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar, AIInsightCard } from '../../../components/dashboard/widgets.jsx'

const PIPELINE = [
  { code: 'PQS-RX-014', target: 'Oncology — solid tumor', phase: 'Pre-clinical', progress: 28, lead: 'Dr. K. Adler' },
  { code: 'PQS-RX-022', target: 'Cardio — anticoagulant', phase: 'Phase I',      progress: 54, lead: 'Dr. M. Owusu' },
  { code: 'PQS-RX-031', target: 'Diabetes — GLP-1',        phase: 'Phase II',     progress: 71, lead: 'Dr. L. Chen' },
  { code: 'PQS-RX-009', target: 'Antiviral — broad',       phase: 'Phase III',    progress: 88, lead: 'Dr. R. Singh' },
]

export default function PharmaRnd() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Research & Development</h2>
        <p className="text-sm text-sand-50/60 mt-1">Active pipeline assets, phase progression, and R&D capital deployment.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active programs"  value="14" icon={FlaskConical} />
        <StatCard label="In Phase II–III"   value="6"  icon={Microscope} accent="emerald" />
        <StatCard label="R&D spend YTD"     value="$28.4M" icon={Beaker} />
        <StatCard label="Filings this year" value="3"  icon={Calendar} accent="emerald" />
      </div>

      <PanelCard eyebrow="Pipeline" title="Active programs by phase" accent>
        <div className="space-y-4">
          {PIPELINE.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.code} · {p.phase}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{p.target}</div>
                  <div className="mt-1 text-xs text-sand-50/55">Lead: {p.lead}</div>
                </div>
                <div className="min-w-[220px] flex-1 max-w-sm">
                  <ProgressBar label="Phase progress" value={p.progress} suffix="%" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>

      <AIInsightCard
        title="Allocate additional capacity to PQS-RX-031"
        body="Based on current Phase II progression and competitor filings, accelerating PQS-RX-031 by one quarter could capture an estimated 4–6% additional market share at launch."
      />
    </div>
  )
}
