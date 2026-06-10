import { motion } from 'framer-motion'
import { CalendarCheck, Clock, MapPin, Phone } from 'lucide-react'
import { StatCard, PanelCard } from '../../../components/dashboard/widgets.jsx'

const BOOKINGS = [
  { id: 'BK-2041', provider: 'Lumière Senior Residence', kind: 'Tour',          date: '2026-05-12 14:00', city: 'Toronto, CA', status: 'Confirmed' },
  { id: 'BK-2038', provider: 'Maison Verte',             kind: 'Consultation',  date: '2026-05-19 10:30', city: 'Lisbon, PT',  status: 'Confirmed' },
  { id: 'BK-2034', provider: 'Harborview Care',          kind: 'Tour',          date: '2026-05-04 15:30', city: 'Boston, US',  status: 'Awaiting' },
  { id: 'BK-2029', provider: 'Cedar Hill Estate',        kind: 'Tour',          date: '2026-04-22 11:00', city: 'Vancouver',   status: 'Completed' },
]

const TONE = {
  Confirmed: 'bg-emerald-500/15 text-emerald-300',
  Awaiting:  'bg-gold-500/15 text-gold-200',
  Completed: 'bg-sand-50/10 text-sand-50/65',
  Cancelled: 'bg-rose-500/15 text-rose-300',
}

export default function SeniorBookings() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Bookings</h2>
        <p className="text-sm text-sand-50/60 mt-1">Tours, consultations, and visits scheduled with care providers.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Upcoming"   value="3" icon={CalendarCheck} accent="emerald" />
        <StatCard label="This week"  value="1" icon={Clock} />
        <StatCard label="Cities"     value="3" icon={MapPin} />
        <StatCard label="Completed"  value="6" icon={Phone} />
      </div>

      <PanelCard eyebrow="Schedule" title="Your bookings" accent>
        <div className="space-y-3">
          {BOOKINGS.map((b, i) => (
            <motion.div key={b.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5"
            >
              <div className="grid md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{b.id} · {b.kind}</div>
                  <div className="mt-1 font-display text-lg text-sand-50">{b.provider}</div>
                  <div className="mt-1 text-xs text-sand-50/55"><MapPin size={11} className="inline mr-1" />{b.city}</div>
                </div>
                <div className="md:col-span-4 text-sm text-sand-50">
                  <Clock size={12} className="inline mr-2 text-gold-300" />{b.date}
                </div>
                <div className="md:col-span-2 flex md:justify-center">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${TONE[b.status]}`}>
                    {b.status}
                  </span>
                </div>
                <div className="md:col-span-2 flex md:justify-end gap-2">
                  <button className="btn-ghost text-xs py-1.5">Reschedule</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>
    </div>
  )
}
