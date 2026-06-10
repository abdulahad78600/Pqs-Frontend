import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ShieldCheck, AlertCircle, CheckCircle2, Clock, FileUp, User2, Building2, Loader2,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import { PanelCard } from '../../components/dashboard/widgets.jsx'
import { fetchUserKyc, submitKyc } from '../../utils/api.js'
import { fmtDate } from '../../utils/format.js'

const STATUS = {
  0: { label: 'Pending review', tone: 'amber', icon: Clock,        copy: 'Your KYC submission is awaiting review by the compliance team.' },
  1: { label: 'Verified',       tone: 'emerald', icon: CheckCircle2, copy: 'Your identity has been verified. You can now subscribe to funds.' },
  2: { label: 'Rejected',       tone: 'rose',    icon: AlertCircle,  copy: 'Your KYC was rejected. Please review the notes and resubmit.' },
}

// Corporate document fields — these map 1:1 to the backend multer fields
// (see backend kycRoute.js fileUploadFields).
const CORPORATE_DOCS = [
  { key: 'listDirectors',        label: 'List of Directors' },
  { key: 'listShareHolders',     label: 'List of Shareholders' },
  { key: 'listBeneficialOwners', label: 'List of Beneficial Owners' },
  { key: 'listOwnersHoldings',   label: "Owners' Holdings" },
  { key: 'certificate',          label: 'Certificate of Incorporation' },
  { key: 'memorandum',           label: 'Memorandum & Articles' },
  { key: 'financialAccounts',    label: 'Latest Financial Accounts' },
]

export default function KycPage() {
  const { user } = useAuth()
  const userId = user?._id

  const [kyc, setKyc]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  // 'individual' | 'company' — sent to the backend as identityType
  const [identityKind, setIdentityKind] = useState('individual')
  const [form, setForm] = useState({
    // Individual
    firstName: '', lastName: '', phone: '', dob: '', gender: '',
    designation: '',
    // Shared address
    postal: '', address: '', street: '', city: '', state: '', country: '',
    // Document type (individual)
    documentType: 'Passport',
    // Corporate
    companyName: '', companyRegNum: '', companyAddress: '', countryOfInc: '',
  })
  const [files, setFiles] = useState({
    nationalId: null,
    proofOfResidence: null,
    signature: null,
    listDirectors: null,
    listShareHolders: null,
    listBeneficialOwners: null,
    listOwnersHoldings: null,
    certificate: null,
    memorandum: null,
    financialAccounts: null,
  })

  useEffect(() => {
    if (!userId) return
    let alive = true
    setLoading(true)
    fetchUserKyc(userId)
      .then((data) => { if (alive && data?.success) setKyc(data.kyc) })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false) })
    return () => { alive = false }
  }, [userId])

  const setField = (k) => (e) => setForm((s) => ({ ...s, [k]: e.target.value }))
  const setFile  = (k) => (e) => setFiles((s) => ({ ...s, [k]: e.target.files?.[0] || null }))

  const submit = async (e) => {
    e.preventDefault()
    const isCorporate = identityKind === 'company'

    if (isCorporate) {
      if (!form.companyName || !form.companyRegNum || !form.companyAddress || !form.countryOfInc) {
        toast.error('Please fill in all required corporate fields.')
        return
      }
      const missingDoc = CORPORATE_DOCS.find((d) => !files[d.key])
      if (missingDoc) {
        toast.error(`Please upload: ${missingDoc.label}.`)
        return
      }
    } else {
      if (!form.firstName || !form.lastName || !form.phone || !form.country) {
        toast.error('Please fill in all required fields.')
        return
      }
      if (!files.nationalId || !files.proofOfResidence) {
        toast.error('Please upload National ID and Proof of Residence.')
        return
      }
    }

    setSubmitting(true)
    try {
      const fd = new FormData()
      fd.append('id', userId)
      fd.append('email', user?.email || '')
      fd.append('identityType', identityKind)
      fd.append('firstName', form.firstName)
      fd.append('lastName', form.lastName)
      fd.append('phone', form.phone)
      fd.append('dob', form.dob)
      fd.append('gender', form.gender)
      fd.append('designation', form.designation)
      fd.append('postal', form.postal)
      // Corporate uses companyAddress / countryOfInc for the shared columns
      fd.append('address', isCorporate ? form.companyAddress : form.address)
      fd.append('street', form.street)
      fd.append('city', form.city)
      fd.append('state', form.state)
      fd.append('country', isCorporate ? form.countryOfInc : form.country)
      fd.append('companyName', form.companyName)
      fd.append('companyRegNum', form.companyRegNum)

      if (isCorporate) {
        CORPORATE_DOCS.forEach((d) => files[d.key] && fd.append(d.key, files[d.key]))
      } else {
        files.nationalId && fd.append('nationalId', files.nationalId)
        files.proofOfResidence && fd.append('proofOfResidence', files.proofOfResidence)
        files.signature && fd.append('signature', files.signature)
      }

      const data = await submitKyc(fd)
      if (data?.success) {
        toast.success(data.message || 'KYC submitted successfully.')
        const refreshed = await fetchUserKyc(userId).catch(() => null)
        if (refreshed?.success) setKyc(refreshed.kyc)
      } else {
        toast.error(data?.message || 'KYC submission failed.')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'KYC submission failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const status = kyc ? STATUS[kyc.status] || STATUS[0] : null
  const isCorporate = identityKind === 'company'

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">KYC Verification</h2>
        <p className="text-sm text-sand-50/60 mt-1">Verify your identity to unlock fund subscriptions and withdrawals.</p>
      </div>

      {/* Status banner */}
      {loading ? (
        <div className="card-glass p-6 text-center text-sand-50/55">
          <Loader2 className="mx-auto animate-spin mb-2" size={20}/> Loading KYC status…
        </div>
      ) : kyc ? (
        <StatusBanner status={status} kyc={kyc} />
      ) : (
        <div className="card-glass p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300 flex-shrink-0">
            <ShieldCheck size={18}/>
          </div>
          <div>
            <div className="text-sm text-sand-50">Your account isn't verified yet.</div>
            <div className="text-xs text-sand-50/60 mt-1">Complete the form below to submit a KYC request.</div>
          </div>
        </div>
      )}

      {/* Form */}
      {(!kyc || kyc.status === 2) && (
        <form onSubmit={submit} className="space-y-5">
          <PanelCard eyebrow="Step 1" title="Identity type">
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { id: 'individual', label: 'Individual',  icon: User2,    desc: 'I am applying as a private investor.' },
                { id: 'company',    label: 'Corporate',   icon: Building2, desc: 'I am applying on behalf of a legal entity.' },
              ].map((o) => (
                <button key={o.id} type="button" onClick={() => setIdentityKind(o.id)}
                  className={`text-left p-4 rounded-xl border transition-all ${
                    identityKind === o.id ? 'bg-gold-500/10 border-gold-500/40' : 'border-sand-50/8 hover:border-sand-50/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-ink-900 border border-sand-50/10 grid place-items-center ${identityKind === o.id ? 'text-gold-300' : 'text-sand-50/65'}`}>
                      <o.icon size={18} />
                    </div>
                    <div>
                      <div className="text-sm text-sand-50">{o.label}</div>
                      <div className="text-[11px] text-sand-50/55">{o.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </PanelCard>

          {/* ---------- INDIVIDUAL FLOW ---------- */}
          {!isCorporate && (
            <>
              <PanelCard eyebrow="Step 2" title="Personal information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" required>
                    <input className="input" value={form.firstName} onChange={setField('firstName')} required/>
                  </Field>
                  <Field label="Last name" required>
                    <input className="input" value={form.lastName} onChange={setField('lastName')} required/>
                  </Field>
                  <Field label="Phone" required>
                    <input className="input" type="tel" value={form.phone} onChange={setField('phone')} required/>
                  </Field>
                  <Field label="Date of birth">
                    <input className="input" type="date" value={form.dob} onChange={setField('dob')} />
                  </Field>
                  <Field label="Gender">
                    <select className="input" value={form.gender} onChange={setField('gender')}>
                      <option value="" className="bg-ink-900">Select…</option>
                      <option className="bg-ink-900">Male</option>
                      <option className="bg-ink-900">Female</option>
                      <option className="bg-ink-900">Other</option>
                    </select>
                  </Field>
                  <Field label="Identity document" required>
                    <select className="input" value={form.documentType} onChange={setField('documentType')} required>
                      <option className="bg-ink-900">Passport</option>
                      <option className="bg-ink-900">Driver's License</option>
                      <option className="bg-ink-900">National ID</option>
                    </select>
                  </Field>
                </div>
              </PanelCard>

              <PanelCard eyebrow="Step 3" title="Address">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Country" required>
                    <input className="input" value={form.country} onChange={setField('country')} required/>
                  </Field>
                  <Field label="State / Province">
                    <input className="input" value={form.state} onChange={setField('state')} />
                  </Field>
                  <Field label="City">
                    <input className="input" value={form.city} onChange={setField('city')} />
                  </Field>
                  <Field label="Postal code">
                    <input className="input" value={form.postal} onChange={setField('postal')} />
                  </Field>
                  <Field label="Street">
                    <input className="input" value={form.street} onChange={setField('street')} />
                  </Field>
                  <Field label="Address line">
                    <input className="input" value={form.address} onChange={setField('address')} />
                  </Field>
                </div>
              </PanelCard>

              <PanelCard eyebrow="Step 4" title="Documents">
                <div className="grid sm:grid-cols-2 gap-4">
                  <FileField label="National ID / Passport" file={files.nationalId} onChange={setFile('nationalId')} required/>
                  <FileField label="Proof of residence" file={files.proofOfResidence} onChange={setFile('proofOfResidence')} required/>
                  <FileField label="Signature (image)" file={files.signature} onChange={setFile('signature')} accept="image/*"/>
                </div>
              </PanelCard>
            </>
          )}

          {/* ---------- CORPORATE FLOW ---------- */}
          {isCorporate && (
            <>
              <PanelCard eyebrow="Step 2" title="Company information">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Company name" required>
                    <input className="input" value={form.companyName} onChange={setField('companyName')} required/>
                  </Field>
                  <Field label="Registration number" required>
                    <input className="input" value={form.companyRegNum} onChange={setField('companyRegNum')} required/>
                  </Field>
                  <Field label="Registered address" required>
                    <input className="input" value={form.companyAddress} onChange={setField('companyAddress')} required/>
                  </Field>
                  <Field label="Street">
                    <input className="input" value={form.street} onChange={setField('street')} />
                  </Field>
                  <Field label="City">
                    <input className="input" value={form.city} onChange={setField('city')} />
                  </Field>
                  <Field label="Postal code">
                    <input className="input" value={form.postal} onChange={setField('postal')} />
                  </Field>
                  <Field label="Country of incorporation" required>
                    <input className="input" value={form.countryOfInc} onChange={setField('countryOfInc')} required/>
                  </Field>
                  <Field label="Designation">
                    <input className="input" value={form.designation} onChange={setField('designation')} placeholder="e.g. CFO, Director"/>
                  </Field>
                </div>
              </PanelCard>

              <PanelCard eyebrow="Step 3" title="Corporate documents">
                <p className="text-[11px] text-sand-50/55 mb-4 -mt-1">
                  All documents are required. Upload each as a PDF.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {CORPORATE_DOCS.map((d) => (
                    <FileField
                      key={d.key}
                      label={d.label}
                      file={files[d.key]}
                      onChange={setFile(d.key)}
                      accept="application/pdf"
                      required
                    />
                  ))}
                </div>
              </PanelCard>
            </>
          )}

          <div className="flex items-center justify-end">
            <button type="submit" disabled={submitting} className="btn-primary text-sm">
              {submitting ? <><Loader2 size={14} className="animate-spin"/> Submitting…</> : <><ShieldCheck size={14}/> Submit for review</>}
            </button>
          </div>
        </form>
      )}

      {kyc && kyc.status === 0 && (
        <div className="card-glass p-5 text-sm text-sand-50/65">
          Submitted on {fmtDate(kyc.createdAt)}. We'll notify you by email once a compliance officer reviews your documents.
        </div>
      )}

      <style>{`
        .input { width:100%; background:#0f1218; border:1px solid rgba(247,244,238,0.08); border-radius:12px; padding:12px 14px; color:#f7f4ee; font-size:14px; }
        .input:focus { outline:none; border-color:rgba(216,187,106,0.5); box-shadow:0 0 0 3px rgba(216,187,106,0.08); }
        .input::placeholder { color:rgba(247,244,238,0.35); }
      `}</style>
    </div>
  )
}

function StatusBanner({ status, kyc }) {
  const Icon = status.icon
  const ring = {
    emerald: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
    amber:   'bg-amber-500/10 border-amber-500/30 text-amber-300',
    rose:    'bg-rose-500/10 border-rose-500/30 text-rose-300',
  }[status.tone]
  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
      className={`card-glass p-5 flex items-start gap-4 border ${ring}`}>
      <div className="w-10 h-10 rounded-lg border bg-current/10 grid place-items-center flex-shrink-0">
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="text-sm text-sand-50">{status.label}</div>
        <div className="text-xs text-sand-50/65 mt-1">{status.copy}</div>
        <div className="text-[11px] text-sand-50/45 mt-2">Submitted {fmtDate(kyc.createdAt)}</div>
      </div>
    </motion.div>
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

function FileField({ label, file, onChange, accept, required }) {
  return (
    <label className="block cursor-pointer">
      <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">
        {label} {required && <span className="text-gold-400">*</span>}
      </span>
      <div className="card-glass p-4 flex items-center gap-3 border-dashed">
        <div className="w-10 h-10 rounded-lg bg-ink-900 border border-sand-50/10 grid place-items-center text-sand-50/65 flex-shrink-0">
          {file ? <CheckCircle2 size={16} className="text-emerald-300" /> : <FileUp size={16} />}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm text-sand-50 truncate">{file?.name || 'Choose file…'}</div>
          <div className="text-[11px] text-sand-50/55">
            {accept === 'application/pdf' ? 'PDF up to 10MB' : 'PDF or image up to 10MB'}
          </div>
        </div>
      </div>
      <input type="file" className="hidden" accept={accept || 'image/*,application/pdf'} onChange={onChange} required={required}/>
    </label>
  )
}
