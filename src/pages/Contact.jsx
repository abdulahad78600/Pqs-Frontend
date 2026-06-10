import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, CheckCircle2, Send } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'
import { funds } from '../data/funds.js'

const offices = [
  { city: 'London, United Kingdom', line: 'PQS Fund — Head Office · 21 Arlington St, London SW1A 1RD, UK', tz: 'GMT · UTC+0' },
  { city: 'Toronto, Canada',  comingSoon: true },
  { city: 'New York, USA',    comingSoon: true },
  { city: 'Singapore',        comingSoon: true },
  { city: 'Dubai, UAE',       comingSoon: true },
  { city: 'Mumbai, India',    comingSoon: true }
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', firm: '', interest: funds[0].slug, ticket: '$500K – $1M', message: ''
  })

  const handle = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))
  const submit = (e) => { e.preventDefault(); setSubmitted(true) }

  return (
    <div>
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Contact"
            title={<>Open a <span className="gold-text">private dialogue</span>.</>}
            subtitle="Share a few details and our investor relations team will respond within one business day with the right materials and a private briefing slot."
          />
        </div>
      </section>

      <section className="container-page pb-24 grid lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 card-glass p-7 md:p-10">
          {submitted ? (
            <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="py-16 text-center">
              <div className="mx-auto w-16 h-16 rounded-full bg-gold-500/15 border border-gold-500/30 grid place-items-center text-gold-300 mb-5">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="h-display text-3xl">Thank you, {form.name || 'investor'}.</h3>
              <p className="mt-4 text-sand-50/65 max-w-md mx-auto">
                Your enquiry has been received. A member of our investor relations team will be in touch shortly with the requested materials.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Full name" required>
                  <input required value={form.name} onChange={handle('name')} className="input" placeholder="Jane Doe" />
                </Field>
                <Field label="Email" required>
                  <input required type="email" value={form.email} onChange={handle('email')} className="input" placeholder="jane@firm.com" />
                </Field>
              </div>
              <Field label="Firm / Family Office">
                <input value={form.firm} onChange={handle('firm')} className="input" placeholder="Optional" />
              </Field>
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Fund of interest">
                  <select value={form.interest} onChange={handle('interest')} className="input">
                    {funds.map((f) => <option key={f.slug} value={f.slug} className="bg-ink-900">{f.name}</option>)}
                    <option value="multi" className="bg-ink-900">Multi-fund / Platform-wide</option>
                  </select>
                </Field>
                <Field label="Indicative ticket">
                  <select value={form.ticket} onChange={handle('ticket')} className="input">
                    {['$500K – $1M','$1M – $5M','$5M – $10M','$10M+'].map((t) => (
                      <option key={t} className="bg-ink-900">{t}</option>
                    ))}
                  </select>
                </Field>
              </div>
              <Field label="Message">
                <textarea rows={4} value={form.message} onChange={handle('message')} className="input resize-none" placeholder="Tell us about your mandate, timeline, and any questions." />
              </Field>
              <div className="flex items-start gap-3 text-xs text-sand-50/55">
                <input type="checkbox" required className="mt-1 accent-gold-500"/>
                <span>I confirm that I am an accredited investor and consent to being contacted by PQS.</span>
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                <Send size={16}/> Send enquiry
              </button>
            </form>
          )}
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="card-glass p-6">
            <div className="eyebrow mb-4">Direct Channels</div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail size={14} className="text-gold-300" /> <a href="mailto:admin@pqs.fund" className="hover:text-gold-200">admin@pqs.fund</a></li>
              <li className="flex items-center gap-3"><Phone size={14} className="text-gold-300" /> <a href="tel:+442071675747" className="hover:text-gold-200">+44 (0) 207 167 5747</a></li>
              <li className="flex items-center gap-3"><MapPin size={14} className="text-gold-300" /> 21 Arlington St, London SW1A 1RD, UK</li>
            </ul>
          </div>
          <div className="card-glass p-6">
            <div className="eyebrow mb-4">Offices</div>
            <ul className="space-y-4">
              {offices.map((o) => (
                <li key={o.city} className="flex items-start gap-3 text-sm">
                  <div className={`w-8 h-8 rounded-md grid place-items-center flex-shrink-0 border ${
                    o.comingSoon
                      ? 'bg-sand-50/5 border-sand-50/10 text-sand-50/40'
                      : 'bg-gold-500/10 border-gold-500/30 text-gold-300'
                  }`}>
                    <MapPin size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={o.comingSoon ? 'text-sand-50/65' : 'text-sand-50'}>{o.city}</span>
                      {o.comingSoon && (
                        <span className="text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded border border-sand-50/15 text-sand-50/50">
                          Coming soon
                        </span>
                      )}
                    </div>
                    {o.line && <div className="text-sand-50/55 text-xs">{o.line}</div>}
                    {o.tz && <div className="text-sand-50/40 text-[10px] uppercase tracking-widest mt-0.5">{o.tz}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          background: #0f1218;
          border: 1px solid rgba(247,244,238,0.08);
          border-radius: 12px;
          padding: 12px 14px;
          color: #f7f4ee;
          font-size: 14px;
          transition: border-color .2s, box-shadow .2s;
        }
        .input::placeholder { color: rgba(247,244,238,0.35); }
        .input:focus { outline: none; border-color: rgba(216,187,106,0.5); box-shadow: 0 0 0 3px rgba(216,187,106,0.08); }
      `}</style>
    </div>
  )
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">
        {label} {required && <span className="text-gold-400">*</span>}
      </span>
      {children}
    </label>
  )
}
