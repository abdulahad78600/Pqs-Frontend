import { motion } from 'framer-motion'
import { Search, MapPin, Heart, Star, Filter } from 'lucide-react'
import { PanelCard } from '../../../components/dashboard/widgets.jsx'

const PROVIDERS = [
  { id: 'C-014', name: 'Lumière Senior Residence', city: 'Toronto, CA',  type: 'Assisted living', rating: 4.8, capacity: 'Open' },
  { id: 'C-009', name: 'Maison Verte',             city: 'Lisbon, PT',   type: 'Memory care',     rating: 4.9, capacity: 'Open' },
  { id: 'C-006', name: 'Harborview Care',          city: 'Boston, US',   type: 'Skilled nursing', rating: 4.6, capacity: 'Waitlist' },
  { id: 'C-003', name: 'Cedar Hill Estate',        city: 'Vancouver, CA',type: 'Independent',     rating: 4.7, capacity: 'Open' },
]

const CAP = {
  Open:     'bg-emerald-500/15 text-emerald-300',
  Waitlist: 'bg-gold-500/15 text-gold-200',
  Full:     'bg-rose-500/15 text-rose-300',
}

export default function SeniorFindCare() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Find care</h2>
        <p className="text-sm text-sand-50/60 mt-1">Curated PQS-affiliated senior care providers — verified, audited, and ready to welcome you.</p>
      </div>

      <div className="card-glass p-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex items-center gap-2 flex-1 bg-ink-900/60 border border-sand-50/10 rounded-full px-4 py-3">
            <Search size={14} className="text-sand-50/45" />
            <input
              placeholder="Care type, condition, or specialty…"
              className="bg-transparent flex-1 text-sm text-sand-50 placeholder:text-sand-50/35 outline-none"
            />
          </div>
          <div className="flex items-center gap-2 bg-ink-900/60 border border-sand-50/10 rounded-full px-4 py-3 md:w-72">
            <MapPin size={14} className="text-sand-50/45" />
            <input
              placeholder="City or postal code"
              className="bg-transparent flex-1 text-sm text-sand-50 placeholder:text-sand-50/35 outline-none"
            />
          </div>
          <button className="btn-ghost text-xs"><Filter size={14}/> Filters</button>
          <button className="btn-primary text-xs">Search</button>
        </div>
      </div>

      <PanelCard eyebrow="Results" title="Verified providers near you" accent>
        <div className="grid md:grid-cols-2 gap-4">
          {PROVIDERS.map((p, i) => (
            <motion.div key={p.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5 lift-on-hover"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.type}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{p.name}</div>
                  <div className="mt-1 text-xs text-sand-50/55"><MapPin size={11} className="inline mr-1" />{p.city}</div>
                </div>
                <button className="text-sand-50/40 hover:text-rose-300 transition-colors" aria-label="Save">
                  <Heart size={16} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-between pt-4 border-t border-sand-50/8">
                <div className="flex items-center gap-1 text-xs text-sand-50">
                  <Star size={12} className="text-gold-300 fill-gold-300" /> {p.rating.toFixed(1)}
                </div>
                <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${CAP[p.capacity]}`}>
                  {p.capacity}
                </span>
                <button className="btn-ghost text-xs py-1.5">Book tour</button>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
