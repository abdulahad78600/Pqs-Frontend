import { motion } from 'framer-motion'
import { FileSignature, Hourglass, CheckCircle2, XCircle } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const FILINGS = [
  { id: 'LIC-1019', applicant: 'PQS Pharma',         type: 'Marketing auth.', region: 'EU',  age: '12d', status: 'Approved' },
  { id: 'LIC-1018', applicant: 'PQS Capital III',    type: 'Fund manager',    region: 'UK',  age: '21d', status: 'Pending' },
  { id: 'LIC-1017', applicant: 'PQS Real Estate',    type: 'Operator',        region: 'AE',  age: '6d',  status: 'Pending' },
  { id: 'LIC-1016', applicant: 'PQS Senior Care',    type: 'Facility',        region: 'CA',  age: '38d', status: 'Approved' },
  { id: 'LIC-1015', applicant: 'PQS Pharma — Br.',   type: 'Manufacturing',   region: 'IN',  age: '45d', status: 'Rejected' },
]

const TONE = {
  Approved: 'bg-emerald-500/15 text-emerald-300',
  Pending:  'bg-gold-500/15 text-gold-200',
  Rejected: 'bg-rose-500/15 text-rose-300',
}

export default function RegulatorLicensingStatus() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Licensing status</h2>
        <p className="text-sm text-sand-50/60 mt-1">Filings, approvals, and outstanding regulator requests across all registered entities.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Filings YTD"        value="142" icon={FileSignature} />
        <StatCard label="Pending review"     value="18"  icon={Hourglass} />
        <StatCard label="Approved YTD"       value="118" icon={CheckCircle2} accent="emerald" />
        <StatCard label="Rejected / withdrawn" value="6"  icon={XCircle} />
      </div>

      <PanelCard eyebrow="Filings" title="Recent regulatory submissions">
        <div className="space-y-2">
          {FILINGS.map((f, i) => (
            <motion.div key={f.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8"
            >
              <div className="col-span-2 text-[10px] uppercase tracking-widest text-gold-300/80">{f.id}</div>
              <div className="col-span-3 font-display text-sand-50">{f.applicant}</div>
              <div className="col-span-3 text-xs text-sand-50/65">{f.type}</div>
              <div className="col-span-1 text-xs text-sand-50/65">{f.region}</div>
              <div className="col-span-1 text-xs text-sand-50/55">{f.age}</div>
              <div className="col-span-2 flex justify-end">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[f.status]}`}>
                  {f.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
