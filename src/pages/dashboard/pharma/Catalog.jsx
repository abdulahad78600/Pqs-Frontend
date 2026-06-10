import { motion } from 'framer-motion'
import { Pill, Search, Filter, Plus, Package, ShieldCheck, Globe } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const PRODUCTS = [
  { code: 'PQS-AMX-500', name: 'Amoxicillin 500mg', form: 'Capsule', markets: 12, status: 'Active' },
  { code: 'PQS-PAR-1G',  name: 'Paracetamol 1g',    form: 'Tablet',  markets: 24, status: 'Active' },
  { code: 'PQS-MET-850', name: 'Metformin 850mg',   form: 'Tablet',  markets: 9,  status: 'Active' },
  { code: 'PQS-OMP-20',  name: 'Omeprazole 20mg',   form: 'Capsule', markets: 17, status: 'Review' },
  { code: 'PQS-AZI-500', name: 'Azithromycin 500mg',form: 'Tablet',  markets: 14, status: 'Active' },
]

export default function PharmaCatalog() {
  return (
    <div className="space-y-6">
      <Header />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active SKUs"     value="148" icon={Package} />
        <StatCard label="Markets covered" value="36"  icon={Globe} accent="emerald" />
        <StatCard label="GMP certified"   value="100%" icon={ShieldCheck} accent="emerald" />
        <StatCard label="In review"       value="12"  icon={Pill} />
      </div>

      <PanelCard
        eyebrow="Product catalog"
        title="Registered SKUs"
        action={
          <div className="flex items-center gap-2">
            <button className="btn-ghost text-xs py-2"><Filter size={14}/> Filter</button>
            <button className="btn-primary text-xs py-2"><Plus size={14}/> New SKU</button>
          </div>
        }
      >
        <div className="flex items-center gap-2 mb-4 bg-ink-900/60 border border-sand-50/10 rounded-full px-3 py-2">
          <Search size={14} className="text-sand-50/45" />
          <input
            placeholder="Search by name, code, or market…"
            className="bg-transparent flex-1 text-sm text-sand-50 placeholder:text-sand-50/35 outline-none"
          />
        </div>
        <div className="space-y-2">
          {PRODUCTS.map((p, i) => (
            <motion.div key={p.code}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 gap-3 items-center px-4 py-3 rounded-lg border border-sand-50/8 hover:border-gold-500/30 hover:bg-gold-500/5 transition-colors"
            >
              <div className="col-span-3 text-[10px] uppercase tracking-widest text-gold-300/80">{p.code}</div>
              <div className="col-span-4 font-display text-sand-50">{p.name}</div>
              <div className="col-span-2 text-xs text-sand-50/65">{p.form}</div>
              <div className="col-span-2 text-xs text-sand-50/65">{p.markets} markets</div>
              <div className="col-span-1 flex justify-end">
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                  p.status === 'Active' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-gold-500/15 text-gold-200'
                }`}>{p.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}

function Header() {
  return (
    <div className="flex items-end justify-between gap-4 flex-wrap">
      <div>
        <h2 className="font-display text-2xl">Product catalog</h2>
        <p className="text-sm text-sand-50/60 mt-1">SKUs, formulations, and registered markets across the PQS pharma portfolio.</p>
      </div>
    </div>
  )
}
