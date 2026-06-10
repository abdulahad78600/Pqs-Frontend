import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, AlertCircle, Clock, ArrowRight } from 'lucide-react'
import { useAuth } from '../../auth/AuthContext.jsx'
import { fetchUserKyc } from '../../utils/api.js'

// Wrap a page that requires verified KYC. Renders a friendly gate banner
// (linking to /dashboard/kyc) until status === 1; renders children once verified.
export default function KycGate({ children, action = 'continue' }) {
  const { user } = useAuth()
  const [status, setStatus] = useState(null) // null = loading, 0 pending, 1 verified, 2 rejected, -1 not submitted
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!user?._id) return
    let alive = true
    fetchUserKyc(user._id)
      .then((data) => {
        if (!alive) return
        if (data?.success && data.kyc) {
          setStatus(typeof data.kyc.status === 'number' ? data.kyc.status : 0)
        } else {
          setStatus(-1) // never submitted
        }
      })
      .catch(() => alive && setStatus(-1))
      .finally(() => alive && setLoaded(true))
    return () => { alive = false }
  }, [user?._id])

  if (!loaded) {
    return <div className="card-glass p-6 text-center text-sand-50/55">Checking your verification status…</div>
  }

  if (status === 1) return children

  const banners = {
    [-1]: {
      tone: 'amber',
      icon: ShieldCheck,
      title: 'Verify your identity to continue',
      body: `Investors must complete KYC before they can ${action}. It only takes a few minutes — you'll need a government ID and a proof of address.`,
      cta: 'Start KYC',
    },
    0: {
      tone: 'amber',
      icon: Clock,
      title: 'KYC is under review',
      body: `Your documents are with our compliance team. You'll be able to ${action} once verification completes — usually within 1 business day. We'll notify you by email and in-app.`,
      cta: 'View status',
    },
    2: {
      tone: 'rose',
      icon: AlertCircle,
      title: 'KYC was rejected',
      body: `Please review the notes from our compliance team and resubmit your documents. You can ${action} once verification passes.`,
      cta: 'Resubmit KYC',
    },
  }
  const b = banners[status] || banners[-1]
  const Icon = b.icon
  const tone = {
    amber: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
    rose:  'border-rose-500/30 bg-rose-500/10 text-rose-300',
  }[b.tone]

  return (
    <div className={`card-glass p-6 border ${tone} flex items-start gap-4`}>
      <div className="w-11 h-11 rounded-xl border border-current/30 bg-current/10 grid place-items-center flex-shrink-0">
        <Icon size={20}/>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display text-lg text-sand-50">{b.title}</div>
        <p className="mt-1.5 text-sm text-sand-50/70 leading-relaxed">{b.body}</p>
        <Link to="/dashboard/kyc" className="btn-primary text-xs py-2 mt-4 inline-flex">
          <ShieldCheck size={14}/> {b.cta} <ArrowRight size={14}/>
        </Link>
      </div>
    </div>
  )
}
