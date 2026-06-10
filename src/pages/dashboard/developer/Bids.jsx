import { motion } from 'framer-motion'
import { Gavel, FileText, DollarSign, Clock } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const BIDS = [
  { id: 'BID-0091', project: 'Marina Heights — fit-out',  vendor: 'Nordic Interiors',  amount: '$12.4M', status: 'Open' },
  { id: 'BID-0090', project: 'Hyde Park Annex — MEP',     vendor: 'Helix Engineering', amount: '$28.1M', status: 'Awarded' },
  { id: 'BID-0089', project: 'Riverside — landscaping',   vendor: 'Verde Studios',     amount: '$3.6M',  status: 'Open' },
  { id: 'BID-0088', project: 'Atlantic Plaza — façade',   vendor: 'Solaris Cladding',  amount: '$9.2M',  status: 'Closed' },
]

const TONE = {
  Open:    'bg-gold-500/15 text-gold-200',
  Awarded: 'bg-emerald-500/15 text-emerald-300',
  Closed:  'bg-sand-50/10 text-sand-50/65',
}

export default function DeveloperBids() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Bids & tenders</h2>
        <p className="text-sm text-sand-50/60 mt-1">Active procurement, vendor responses, and award status across projects.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Open bids"        value="14"     icon={Gavel} />
        <StatCard label="Total value open" value="$96M"   icon={DollarSign} />
        <StatCard label="Closing < 7d"     value="4"      icon={Clock} />
        <StatCard label="Awarded YTD"      value="22"     icon={FileText} accent="emerald" />
      </div>

      <PanelCard eyebrow="Procurement" title="Recent bids" accent>
        <div className="space-y-2">
          {BIDS.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8"
            >
              <div className="col-span-2 text-[10px] uppercase tracking-widest text-gold-300/80">{b.id}</div>
              <div className="col-span-4 font-display text-sand-50">{b.project}</div>
              <div className="col-span-3 text-xs text-sand-50/65">{b.vendor}</div>
              <div className="col-span-2 text-xs text-sand-50">{b.amount}</div>
              <div className="col-span-1 flex justify-end">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[b.status]}`}>
                  {b.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
