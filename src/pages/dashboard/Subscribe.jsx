import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, AlertCircle, Loader2, Building2, CheckCircle2, FileSignature,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import { PanelCard } from '../../components/dashboard/widgets.jsx'
import {
  fetchAllFunds,
  fetchFundClasses,
  submitFundSubscription,
  fetchUserData,
} from '../../utils/api.js'
import { fmtMoney } from '../../utils/format.js'
import { funds as catalog } from '../../data/funds.js'

// Public funds use slugs; backend funds use _id. When a deep-link from /funds/:slug
// drops users into /dashboard/subscribe/:slug, we resolve the slug → expected fund
// name and pick the matching API fund.
const resolveFundIdFromParam = (param, list) => {
  if (!param || !Array.isArray(list) || list.length === 0) return ''
  const direct = list.find((f) => f._id === param)
  if (direct) return direct._id
  const local = catalog.find((f) => f.slug === param)
  if (!local) return ''
  const wanted = (local.subName || local.name || '').toLowerCase().trim()
  if (!wanted) return ''
  const byName = list.find((f) => {
    const candidate = (f.fundName || f.name || '').toLowerCase().trim()
    return candidate === wanted || candidate.includes(wanted) || wanted.includes(candidate)
  })
  return byName?._id || ''
}

export default function SubscribePage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { fundId: paramFundId } = useParams()

  const [funds, setFunds]       = useState([])
  const [classes, setClasses]   = useState([])
  const [step, setStep]         = useState(1)
  const [loading, setLoading]   = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError]       = useState('')

  const [form, setForm] = useState({
    fundId: '',
    classId: '',
    firstName: '', surname: '',
    email: user?.email || '', phone: '',
    address: '', city: '', state: '', country: '', postal: '',
    placeOfBirth: '', dob: '', nationality: '', passportID: '',
    occupation: '', sourceOfCapital: '',
    bankName: '', iban: '', bankCountry: '',
    subscriptionSum: '', subscriptionCurrency: '', subscriptionInWords: '',
  })

  useEffect(() => {
    let alive = true
    setLoading(true)
    fetchAllFunds()
      .then((data) => {
        if (!alive) return
        const list = Array.isArray(data) ? data : data?.funds || []
        setFunds(list)
        const resolved = resolveFundIdFromParam(paramFundId, list)
        if (resolved) setForm((s) => ({ ...s, fundId: resolved }))
      })
      .catch(() => setError("We couldn't load funds."))
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [paramFundId])

  // Hydrate Personal details from the user's profile so investors don't retype.
  useEffect(() => {
    if (!user?._id) return
    let alive = true
    fetchUserData(user._id)
      .then((data) => {
        if (!alive || !data?.success) return
        const d = data.details || {}
        setForm((s) => ({
          ...s,
          firstName: s.firstName || d.firstName || (user.name?.split(' ')[0] || ''),
          surname:   s.surname   || d.lastName  || (user.name?.split(' ').slice(1).join(' ') || ''),
          email:     s.email     || data.email  || user.email || '',
          phone:     s.phone     || d.phone     || user.meta?.phone || '',
          dob:       s.dob       || d.dob       || '',
          nationality: s.nationality || d.country || '',
          address:   s.address   || d.address   || '',
          city:      s.city      || d.city      || '',
          state:     s.state     || d.state     || '',
          country:   s.country   || d.country   || '',
          postal:    s.postal    || d.postal    || '',
          occupation: s.occupation || d.designation || '',
          passportID: s.passportID || d.identityNumber || '',
        }))
      })
      .catch(() => {})
    return () => { alive = false }
  }, [user?._id])

  useEffect(() => {
    if (!form.fundId) { setClasses([]); return }
    fetchFundClasses(form.fundId)
      .then((data) => {
        const list = data?.data || data?.classes || data || []
        setClasses(Array.isArray(list) ? list : [])
      })
      .catch(() => setClasses([]))
  }, [form.fundId])

  const setField = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))
  const selectedFund = funds.find((f) => f._id === form.fundId)
  const selectedClass = classes.find((c) => c._id === form.classId)

  const submit = async (e) => {
    e.preventDefault()
    if (!form.fundId || !form.classId || !form.subscriptionSum) {
      toast.error('Please pick a fund, share class, and subscription amount.')
      return
    }
    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('userId', user?._id || '')
      Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''))
      const data = await submitFundSubscription(fd)
      if (data?.success) {
        toast.success(data.message || 'Subscription request submitted.')
        navigate('/dashboard/portfolio')
      } else {
        toast.error(data?.message || 'Subscription failed.')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Subscription failed.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="card-glass p-12 text-center text-sand-50/55">
        <Loader2 className="mx-auto animate-spin mb-3" size={22}/> Loading funds…
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Subscribe to a fund</h2>
          <p className="text-sm text-sand-50/60 mt-1">Submit a subscription request — our team will review and finalize the allocation.</p>
        </div>
        <button onClick={() => navigate(-1)} className="btn-ghost text-xs py-2"><ArrowLeft size={14}/> Back</button>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="flex items-center gap-2">
        {[1, 2, 3].map((n, i) => (
          <div key={n} className="flex items-center flex-1 last:flex-none">
            <div className={`h-9 w-9 rounded-full grid place-items-center text-sm font-display border transition-all ${
              step >= n
                ? 'bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 border-gold-500/60'
                : 'bg-ink-900 text-sand-50/50 border-sand-50/10'
            }`}>
              {step > n ? <CheckCircle2 size={16}/> : n}
            </div>
            {i < 2 && <div className={`h-px flex-1 mx-2 ${step > n ? 'bg-gold-500/60' : 'bg-sand-50/10'}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={submit} className="space-y-5">
        {step === 1 && (
          <PanelCard eyebrow="Step 1" title="Choose a fund">
            {funds.length === 0 ? (
              <div className="py-8 text-center text-sand-50/55">No funds available right now.</div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {funds.map((f) => (
                  <button key={f._id} type="button"
                    onClick={() => setForm((s) => ({ ...s, fundId: f._id, classId: '' }))}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      form.fundId === f._id ? 'bg-gold-500/10 border-gold-500/40' : 'border-sand-50/8 hover:border-sand-50/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-ink-900 border border-sand-50/10 grid place-items-center text-gold-300">
                        <Building2 size={16}/>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm text-sand-50 truncate">{f.fundName || f.name || 'Fund'}</div>
                        <div className="text-[11px] text-sand-50/55 truncate">{f.subAcc || f.category || 'PQS Fund'}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {form.fundId && (
              <div className="mt-5">
                <div className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-2">Share class</div>
                {classes.length === 0 ? (
                  <div className="text-xs text-sand-50/55">No share classes for this fund.</div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-2">
                    {classes.map((c) => (
                      <button key={c._id} type="button"
                        onClick={() => setForm((s) => ({ ...s, classId: c._id, subscriptionCurrency: c.currency || s.subscriptionCurrency }))}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          form.classId === c._id ? 'bg-gold-500/10 border-gold-500/40' : 'border-sand-50/8 hover:border-sand-50/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-sand-50">{c.className || c.name || 'Class'}</div>
                          {form.classId === c._id && <CheckCircle2 size={14} className="text-gold-300"/>}
                        </div>
                        <div className="text-[11px] text-sand-50/55 mt-1">
                          Min: {fmtMoney(c.minInvestment || c.min || 0, c.currency || 'USD')} · Currency: {c.currency || '—'}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button type="button"
                onClick={() => setStep(2)}
                disabled={!form.fundId || !form.classId}
                className="btn-primary text-sm disabled:opacity-40"
              >
                Continue <ArrowRight size={14}/>
              </button>
            </div>
          </PanelCard>
        )}

        {step === 2 && (
          <>
            <PanelCard eyebrow="Step 2" title="Personal details">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="First name" required>
                  <input className="input" value={form.firstName} onChange={setField('firstName')} required/>
                </Field>
                <Field label="Surname" required>
                  <input className="input" value={form.surname} onChange={setField('surname')} required/>
                </Field>
                <Field label="Email" required>
                  <input className="input" type="email" value={form.email} onChange={setField('email')} required/>
                </Field>
                <Field label="Phone" required>
                  <input className="input" type="tel" value={form.phone} onChange={setField('phone')} required/>
                </Field>
                <Field label="Date of birth"><input className="input" type="date" value={form.dob} onChange={setField('dob')}/></Field>
                <Field label="Place of birth"><input className="input" value={form.placeOfBirth} onChange={setField('placeOfBirth')}/></Field>
                <Field label="Nationality"><input className="input" value={form.nationality} onChange={setField('nationality')}/></Field>
                <Field label="Passport / ID #"><input className="input" value={form.passportID} onChange={setField('passportID')}/></Field>
                <Field label="Address"><input className="input" value={form.address} onChange={setField('address')}/></Field>
                <Field label="City"><input className="input" value={form.city} onChange={setField('city')}/></Field>
                <Field label="State / Province"><input className="input" value={form.state} onChange={setField('state')}/></Field>
                <Field label="Postal code"><input className="input" value={form.postal} onChange={setField('postal')}/></Field>
                <Field label="Country"><input className="input" value={form.country} onChange={setField('country')}/></Field>
                <Field label="Occupation"><input className="input" value={form.occupation} onChange={setField('occupation')}/></Field>
              </div>
            </PanelCard>

            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setStep(1)} className="btn-ghost text-xs py-2"><ArrowLeft size={14}/> Back</button>
              <button type="button" onClick={() => setStep(3)} className="btn-primary text-sm">Continue <ArrowRight size={14}/></button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <PanelCard eyebrow="Step 3" title="Investment & banking">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Subscription amount" required>
                  <input className="input" type="number" min="0" value={form.subscriptionSum} onChange={setField('subscriptionSum')} required/>
                </Field>
                <Field label="Currency" required>
                  <input className="input" value={form.subscriptionCurrency} onChange={setField('subscriptionCurrency')} placeholder="USD" required/>
                </Field>
                <Field label="Amount in words"><input className="input" value={form.subscriptionInWords} onChange={setField('subscriptionInWords')}/></Field>
                <Field label="Source of capital"><input className="input" value={form.sourceOfCapital} onChange={setField('sourceOfCapital')} placeholder="e.g. business income, savings"/></Field>
                <Field label="Bank name"><input className="input" value={form.bankName} onChange={setField('bankName')}/></Field>
                <Field label="IBAN / Account"><input className="input" value={form.iban} onChange={setField('iban')}/></Field>
                <Field label="Bank country"><input className="input" value={form.bankCountry} onChange={setField('bankCountry')}/></Field>
              </div>
            </PanelCard>

            {selectedFund && selectedClass && (
              <PanelCard eyebrow="Summary" title="Subscription overview">
                <div className="grid sm:grid-cols-3 gap-4 text-sm">
                  <Stat label="Fund" value={selectedFund.fundName || selectedFund.name || '—'}/>
                  <Stat label="Class" value={selectedClass.className || selectedClass.name || '—'}/>
                  <Stat label="Amount" value={form.subscriptionSum ? fmtMoney(form.subscriptionSum, form.subscriptionCurrency || 'USD') : '—'}/>
                </div>
              </PanelCard>
            )}

            <div className="flex items-center justify-between">
              <button type="button" onClick={() => setStep(2)} className="btn-ghost text-xs py-2"><ArrowLeft size={14}/> Back</button>
              <button type="submit" disabled={submitting} className="btn-primary text-sm">
                {submitting ? <><Loader2 size={14} className="animate-spin"/> Submitting…</> : <><FileSignature size={14}/> Submit subscription</>}
              </button>
            </div>
          </>
        )}
      </form>

      <style>{`
        .input { width:100%; background:#0f1218; border:1px solid rgba(247,244,238,0.08); border-radius:12px; padding:12px 14px; color:#f7f4ee; font-size:14px; }
        .input:focus { outline:none; border-color:rgba(216,187,106,0.5); box-shadow:0 0 0 3px rgba(216,187,106,0.08); }
        .input::placeholder { color:rgba(247,244,238,0.35); }
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

function Stat({ label, value }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      <div className="mt-1 font-display text-base text-sand-50">{value}</div>
    </div>
  )
}
