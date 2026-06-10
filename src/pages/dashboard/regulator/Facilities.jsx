import { motion } from 'framer-motion'
import { Building2, MapPin, ShieldCheck, Calendar } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const FACILITIES = [
  { id: 'FAC-001', name: 'PQS Pharma — Plant A',  region: 'Berlin, DE',     last: '2025-11-04', score: 96 },
  { id: 'FAC-002', name: 'PQS Pharma — Plant B',  region: 'Hyderabad, IN',  last: '2025-10-19', score: 91 },
  { id: 'FAC-003', name: 'PQS Senior Care — N.1', region: 'Toronto, CA',    last: '2026-02-12', score: 88 },
  { id: 'FAC-004', name: 'PQS Real Estate — HQ',  region: 'Dubai, AE',      last: '2025-09-28', score: 94 },
  { id: 'FAC-005', name: 'PQS Pharma — R&D Lab',  region: 'Boston, US',     last: '2026-01-22', score: 98 },
]

export default function RegulatorFacilities() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Registered facilities</h2>
        <p className="text-sm text-sand-50/60 mt-1">Manufacturing sites, care facilities, and operational locations under regulatory oversight.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total facilities"   value="32" icon={Building2} />
        <StatCard label="Countries"          value="14" icon={MapPin} />
        <StatCard label="Avg audit score"    value="93" icon={ShieldCheck} accent="emerald" />
        <StatCard label="Inspections / year" value="48" icon={Calendar} />
      </div>

      <PanelCard eyebrow="Sites" title="Facility audit register" accent>
        <div className="space-y-2">
          {FACILITIES.map((f, i) => (
            <motion.div key={f.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8 hover:border-gold-500/30 transition-colors"
            >
              <div className="col-span-2 text-[10px] uppercase tracking-widest text-gold-300/80">{f.id}</div>
              <div className="col-span-4 font-display text-sand-50">{f.name}</div>
              <div className="col-span-3 text-xs text-sand-50/65">{f.region}</div>
              <div className="col-span-2 text-xs text-sand-50/55">Last: {f.last}</div>
              <div className="col-span-1 text-right">
                <span className={`font-display text-base ${
                  f.score >= 95 ? 'text-emerald-300' : f.score >= 90 ? 'text-sand-50' : 'text-gold-200'
                }`}>{f.score}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
