import { motion } from 'framer-motion'
import { FileSignature, Globe, Clock, CheckCircle2 } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const LICENSES = [
  { product: 'Amoxicillin 500mg', region: 'EU — EMA',      ref: 'EMA/2024/AMX-1129', status: 'Approved', expiry: '2029-04-12' },
  { product: 'Metformin 850mg',   region: 'US — FDA',      ref: 'NDA-216-447',       status: 'Approved', expiry: '2031-09-04' },
  { product: 'Omeprazole 20mg',   region: 'UK — MHRA',     ref: 'PL 47210/0091',     status: 'Renewal',  expiry: '2026-08-30' },
  { product: 'Azithromycin 500mg',region: 'WHO Prequalif.',ref: 'WHO-PQ-AZI-104',    status: 'Pending',  expiry: '—' },
]

const TONE = {
  Approved: 'bg-emerald-500/15 text-emerald-300',
  Renewal:  'bg-gold-500/15 text-gold-200',
  Pending:  'bg-sky-500/15 text-sky-300',
}

export default function PharmaLicensing() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Licensing</h2>
        <p className="text-sm text-sand-50/60 mt-1">Marketing authorizations, renewals, and active filings across regions.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active licenses"   value="84" icon={FileSignature} accent="emerald" />
        <StatCard label="Regions"           value="36" icon={Globe} />
        <StatCard label="Renewals < 90d"    value="6"  icon={Clock} />
        <StatCard label="Pending approval"  value="11" icon={CheckCircle2} accent="emerald" />
      </div>

      <PanelCard eyebrow="Authorizations" title="Recent licensing activity">
        <div className="space-y-2">
          {LICENSES.map((l, i) => (
            <motion.div key={l.ref}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8 hover:border-gold-500/30 transition-colors"
            >
              <div className="col-span-4 font-display text-sand-50">{l.product}</div>
              <div className="col-span-3 text-xs text-sand-50/65">{l.region}</div>
              <div className="col-span-3 text-[11px] text-sand-50/55 font-mono">{l.ref}</div>
              <div className="col-span-1 text-xs text-sand-50/65">{l.expiry}</div>
              <div className="col-span-1 flex justify-end">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[l.status]}`}>
                  {l.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
