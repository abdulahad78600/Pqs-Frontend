import { motion } from 'framer-motion'
import { ShieldCheck, AlertTriangle, FileWarning, CheckCircle2 } from 'lucide-react'
import { StatCard, PanelCard, ProgressBar } from '../../../components/dashboard/widgets.jsx'

const FINDINGS = [
  { id: 'CMP-2026-041', entity: 'PQS Pharma — Site B',  type: 'GMP audit',     severity: 'Minor',  age: '4d',  status: 'Open' },
  { id: 'CMP-2026-038', entity: 'PQS Real Estate Fund', type: 'AML review',    severity: 'Major',  age: '11d', status: 'Open' },
  { id: 'CMP-2026-029', entity: 'PQS Capital II',       type: 'Disclosure',    severity: 'Minor',  age: '23d', status: 'Resolved' },
  { id: 'CMP-2026-022', entity: 'PQS Senior Care',      type: 'Facility audit',severity: 'Critical', age: '1d',status: 'Open' },
]

const TONE = {
  Critical: 'bg-rose-500/15 text-rose-300',
  Major:    'bg-gold-500/15 text-gold-200',
  Minor:    'bg-sky-500/15 text-sky-300',
}

export default function RegulatorCompliance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Compliance</h2>
        <p className="text-sm text-sand-50/60 mt-1">Audit findings, regulatory exposure, and remediation status across regulated entities.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open findings"     value="14" icon={AlertTriangle} />
        <StatCard label="Critical / unresolved" value="1" icon={FileWarning} />
        <StatCard label="Compliance score"  value="94%" icon={ShieldCheck} accent="emerald" />
        <StatCard label="Closed YTD"        value="62" icon={CheckCircle2} accent="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <PanelCard className="lg:col-span-2" eyebrow="Findings" title="Open audit items" accent>
          <div className="space-y-2">
            {FINDINGS.map((f, i) => (
              <motion.div key={f.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8"
              >
                <div className="col-span-3 text-[10px] uppercase tracking-widest text-gold-300/80">{f.id}</div>
                <div className="col-span-4 font-display text-sand-50">{f.entity}</div>
                <div className="col-span-2 text-xs text-sand-50/65">{f.type}</div>
                <div className="col-span-1 text-xs text-sand-50/55">{f.age}</div>
                <div className="col-span-2 flex justify-end">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[f.severity]}`}>
                    {f.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </PanelCard>

        <PanelCard eyebrow="Coverage" title="Domain compliance">
          <div className="space-y-4">
            <ProgressBar label="GMP / Pharma"    value={96} suffix="%" />
            <ProgressBar label="AML / Capital"   value={91} suffix="%" />
            <ProgressBar label="Real estate"     value={94} suffix="%" />
            <ProgressBar label="Senior care"     value={88} suffix="%" />
          </div>
        </PanelCard>
      </div>
    </div>
  )
}
