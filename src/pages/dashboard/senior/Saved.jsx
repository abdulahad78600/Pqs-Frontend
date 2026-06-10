import { motion } from 'framer-motion'
import { Heart, MapPin, Star, Trash2 } from 'lucide-react'
import { PanelCard } from '../../../components/dashboard/widgets.jsx'

const SAVED = [
  { id: 'C-014', name: 'Lumière Senior Residence', city: 'Toronto, CA',  type: 'Assisted living', rating: 4.8, note: 'Great reviews on memory program.' },
  { id: 'C-009', name: 'Maison Verte',             city: 'Lisbon, PT',   type: 'Memory care',     rating: 4.9, note: 'Toured digitally — beautiful grounds.' },
  { id: 'C-006', name: 'Harborview Care',          city: 'Boston, US',   type: 'Skilled nursing', rating: 4.6, note: 'Wait time ~3 months.' },
]

export default function SeniorSaved() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Saved providers</h2>
        <p className="text-sm text-sand-50/60 mt-1">Your shortlist of care providers — easy to compare and revisit.</p>
      </div>

      {SAVED.length === 0 ? (
        <PanelCard eyebrow="Shortlist" title="No saved providers yet">
          <div className="text-center py-10">
            <Heart size={28} className="mx-auto text-sand-50/25" />
            <p className="mt-3 text-sm text-sand-50/60">Tap the heart icon on a provider to keep it here for later.</p>
          </div>
        </PanelCard>
      ) : (
        <PanelCard eyebrow="Shortlist" title="Providers you’ve saved" accent>
          <div className="grid md:grid-cols-2 gap-4">
            {SAVED.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="card-glass p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{p.type}</div>
                    <div className="mt-1 font-display text-lg text-sand-50">{p.name}</div>
                    <div className="mt-1 text-xs text-sand-50/55"><MapPin size={11} className="inline mr-1" />{p.city}</div>
                  </div>
                  <button className="text-rose-300 hover:text-rose-200 transition-colors" aria-label="Remove">
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="mt-3 text-xs text-sand-50/65 italic">“{p.note}”</p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-sand-50/8">
                  <div className="flex items-center gap-1 text-xs text-sand-50">
                    <Star size={12} className="text-gold-300 fill-gold-300" /> {p.rating.toFixed(1)}
                  </div>
                  <button className="btn-ghost text-xs py-1.5">Book tour</button>
                </div>
              </motion.div>
            ))}
          </div>
        </PanelCard>
      )}
    </div>
  )
}
