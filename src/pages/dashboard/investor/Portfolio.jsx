import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Wallet, TrendingUp, Download, ArrowRight, PieChart, ChevronRight, AlertCircle } from 'lucide-react'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { StatCard, PanelCard, ProgressBar, Sparkline } from '../../../components/dashboard/widgets.jsx'
import { fetchUserFundsAndNavs, fetchSubscriptions, fetchBaseCurrency } from '../../../utils/api.js'
import { fmtMoney } from '../../../utils/format.js'

const SEGMENT_COLORS = ['#d8bb6a', '#7dd3fc', '#a78bfa', '#fb7185', '#34d399', '#fbbf24']

export default function InvestorPortfolio() {
  const { user } = useAuth()
  const userId = user?._id

  const [view, setView] = useState('summary')
  const [enrollments, setEnrollments] = useState([])
  const [subscriptions, setSubscriptions] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    let alive = true
    setLoading(true)
    setError('')

    Promise.allSettled([
      fetchBaseCurrency(userId),
      fetchUserFundsAndNavs(),
      fetchSubscriptions(),
    ]).then((results) => {
      if (!alive) return
      const [curr, fnds, subs] = results
      if (curr.status === 'fulfilled' && curr.value?.success) {
        setCurrency(curr.value.currency?.currency || 'USD')
      }
      if (fnds.status === 'fulfilled' && fnds.value?.success) {
        setEnrollments(fnds.value.data || [])
      }
      if (subs.status === 'fulfilled' && Array.isArray(subs.value)) {
        setSubscriptions(subs.value)
      } else if (subs.status === 'fulfilled' && subs.value?.success) {
        setSubscriptions(subs.value.subscriptions || [])
      }
      if (results.every((r) => r.status === 'rejected')) {
        setError("We couldn't load your portfolio. Please try again shortly.")
      }
      setLoading(false)
    })
    return () => { alive = false }
  }, [userId])

  const totalCommitted    = useMemo(() => enrollments.reduce((s, e) => s + (e.depositBalance || 0), 0), [enrollments])
  const totalNav          = useMemo(() => enrollments.reduce((s, e) => s + (e.balance || 0), 0), [enrollments])
  const totalProfit       = totalNav - totalCommitted
  const weightedReturn    = useMemo(() => {
    const weighted = enrollments
      .filter((e) => e.depositBalance > 0)
      .reduce((s, e) => s + ((e.balance - e.depositBalance) / e.depositBalance) * (e.depositBalance / Math.max(totalCommitted, 1)), 0)
    return weighted * 100
  }, [enrollments, totalCommitted])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Portfolio</h2>
          <p className="text-sm text-sand-50/60 mt-1">Live positions across your enrolled PQS funds.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-ink-900 border border-sand-50/10 rounded-full p-1">
            {['summary', 'by-fund'].map((v) => (
              <button key={v} onClick={() => setView(v)}
                className={`px-3 py-1.5 text-xs uppercase tracking-widest rounded-full transition-all ${
                  view === v ? 'bg-gold-500/20 text-gold-200' : 'text-sand-50/55 hover:text-sand-50'
                }`}
              >
                {v === 'summary' ? 'Summary' : 'By fund'}
              </button>
            ))}
          </div>
          <button className="btn-ghost text-xs py-2"><Download size={14}/> Export PDF</button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capital deployed" value={loading ? '…' : fmtMoney(totalCommitted, currency)} icon={Wallet} />
        <StatCard label="Total NAV"        value={loading ? '…' : fmtMoney(totalNav, currency)} delta={totalCommitted ? `${((totalNav / totalCommitted - 1) * 100).toFixed(1)}% vs cost` : null} accent="emerald" />
        <StatCard label="Unrealized P/L"   value={loading ? '…' : fmtMoney(totalProfit, currency)} accent={totalProfit >= 0 ? 'emerald' : 'gold'} />
        <StatCard label="Weighted return"  value={loading ? '…' : `${weightedReturn.toFixed(1)}%`} icon={TrendingUp} accent="emerald" />
      </div>

      {view === 'summary' && (
        <div className="grid lg:grid-cols-3 gap-5">
          <PanelCard className="lg:col-span-2" eyebrow="Allocation" title="Fund-level exposure" accent>
            {enrollments.length > 0 ? (
              <div className="flex items-center gap-6 flex-wrap">
                <DonutChart
                  segments={enrollments.map((e, i) => ({
                    value: e.balance || 0,
                    color: SEGMENT_COLORS[i % SEGMENT_COLORS.length],
                  }))}
                  total={totalNav}
                  currency={currency}
                />
                <div className="flex-1 min-w-[220px] space-y-3">
                  {enrollments.map((e, i) => {
                    const pct = totalNav > 0 ? (e.balance / totalNav) * 100 : 0
                    return (
                      <div key={e.enrollmentId}>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: SEGMENT_COLORS[i % SEGMENT_COLORS.length] }} />
                            <span className="text-sand-50 truncate">{e.fund?.name || e.fund?.fundName || 'Fund'}</span>
                          </div>
                          <span className="text-sand-50/55 ml-2 flex-shrink-0">{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <Empty loading={loading} message="You have no fund enrollments yet." cta={{ to: '/funds', label: 'Browse funds' }} />
            )}
          </PanelCard>

          <PanelCard eyebrow="NAV trend" title="Latest fund">
            {enrollments[0]?.navHistory?.length > 1 ? (
              <>
                <Sparkline data={enrollments[0].navHistory.map((p) => p.navValue).slice(-12)} />
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-sand-50/8">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Latest NAV</div>
                    <div className="font-display text-base text-sand-50">
                      {fmtMoney(enrollments[0].navHistory.at(-1).navValue, currency)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-sand-50/45">Records</div>
                    <div className="font-display text-base text-sand-50">{enrollments[0].navHistory.length}</div>
                  </div>
                </div>
              </>
            ) : (
              <Empty loading={loading} message="No NAV history yet." small />
            )}
          </PanelCard>
        </div>
      )}

      <PanelCard eyebrow="Positions" title={view === 'by-fund' ? 'Fund-by-fund detail' : 'Top positions'}>
        {enrollments.length > 0 ? (
          <div className="space-y-3">
            {enrollments.map((e, i) => {
              const fund = e.fund || {}
              const pl = (e.balance || 0) - (e.depositBalance || 0)
              const plPct = e.depositBalance > 0 ? (pl / e.depositBalance) * 100 : 0
              return (
                <motion.div key={e.enrollmentId}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="card-glass p-5 lift-on-hover"
                >
                  <div className="grid lg:grid-cols-12 gap-4 items-center">
                    <div className="lg:col-span-4">
                      <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{fund.subAcc || 'PQS Fund'}</div>
                      <div className="mt-1 font-display text-lg text-sand-50 truncate">{fund.name || fund.fundName || 'Fund'}</div>
                    </div>
                    <div className="lg:col-span-2">
                      <Cell label="Capital" value={fmtMoney(e.depositBalance, currency)} />
                    </div>
                    <div className="lg:col-span-2">
                      <Cell label="NAV" value={fmtMoney(e.balance, currency)} />
                    </div>
                    <div className="lg:col-span-2">
                      <Cell label="P/L" value={fmtMoney(pl, currency)} accent={pl >= 0 ? 'emerald' : 'rose'} />
                    </div>
                    <div className="lg:col-span-2 flex justify-end items-center gap-2">
                      <span className={`text-xs ${plPct >= 0 ? 'text-emerald-300' : 'text-rose-300'}`}>{plPct.toFixed(1)}%</span>
                      <button className="btn-ghost text-xs py-2">View <ChevronRight size={14}/></button>
                    </div>
                  </div>
                  {view === 'by-fund' && (
                    <div className="mt-4 pt-4 border-t border-sand-50/8 grid sm:grid-cols-3 gap-3">
                      <ProgressBar label="Capital deployed" value={Math.min(100, totalCommitted ? (e.depositBalance / totalCommitted) * 100 : 0)} suffix="%" />
                      <ProgressBar label="NAV share" value={Math.min(100, totalNav ? (e.balance / totalNav) * 100 : 0)} suffix="%" />
                      <ProgressBar label="P/L" value={Math.max(-50, Math.min(50, plPct))} max={50} suffix="%" />
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        ) : (
          <Empty loading={loading} message="No active positions yet." />
        )}
      </PanelCard>

      {subscriptions.length > 0 && (
        <PanelCard eyebrow="Subscriptions" title="Submitted subscription requests">
          <ul className="space-y-3">
            {subscriptions.map((s) => (
              <li key={s._id} className="flex items-center justify-between border-b border-sand-50/8 last:border-0 pb-3 last:pb-0">
                <div className="min-w-0">
                  <div className="text-sm text-sand-50 truncate">{s.fund?.fundName || s.fundName || 'Fund subscription'}</div>
                  <div className="text-[11px] text-sand-50/55">{s.status === 1 ? 'Approved' : s.status === 2 ? 'Rejected' : 'Pending review'}</div>
                </div>
                <div className="text-sm text-sand-50">{fmtMoney(s.amount, s.currency || currency)}</div>
              </li>
            ))}
          </ul>
        </PanelCard>
      )}

      <div className="card-glass p-7 relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="eyebrow flex items-center gap-2"><PieChart size={11}/> Rebalance opportunity</div>
            <h3 className="mt-1 font-display text-2xl">Add exposure to lift expected return.</h3>
            <p className="mt-2 text-sm text-sand-50/65 max-w-xl">Browse the open PQS funds to subscribe and increase your committed capital.</p>
          </div>
          <Link to="/funds" className="btn-primary text-sm">Browse funds <ArrowRight size={14}/></Link>
        </div>
      </div>
    </div>
  )
}

function Cell({ label, value, accent }) {
  const tone = accent === 'emerald' ? 'text-emerald-300' : accent === 'rose' ? 'text-rose-300' : 'text-sand-50'
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      <div className={`mt-0.5 font-display text-base ${tone}`}>{value}</div>
    </div>
  )
}

function Empty({ loading, message, cta, small }) {
  return (
    <div className={`text-center ${small ? 'py-4' : 'py-10'}`}>
      <div className="text-sm text-sand-50/60">{loading ? 'Loading…' : message}</div>
      {!loading && cta && (
        <Link to={cta.to} className="mt-3 inline-flex btn-ghost text-xs py-2">
          {cta.label}
        </Link>
      )}
    </div>
  )
}

function DonutChart({ segments, total, currency, size = 140 }) {
  const stroke = 22
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0
  if (total <= 0) {
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(247,244,238,0.06)" strokeWidth={stroke} />
        <text x={size/2} y={size/2 + 4} textAnchor="middle" fill="#9797a0" fontSize="10">No data</text>
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="flex-shrink-0">
      <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(247,244,238,0.06)" strokeWidth={stroke} />
      {segments.map((s, i) => {
        const len = (s.value / total) * circumference
        const dasharray = `${len} ${circumference - len}`
        const dashoffset = -cumulative
        cumulative += len
        return (
          <circle key={i} cx={size/2} cy={size/2} r={radius}
            fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={dasharray} strokeDashoffset={dashoffset}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            strokeLinecap="butt"
          />
        )
      })}
      <text x={size/2} y={size/2 - 4} textAnchor="middle" fill="#f4f4f5" fontFamily="Cormorant Garamond" fontSize="18" fontWeight="500">
        {fmtMoney(total, currency, 0)}
      </text>
      <text x={size/2} y={size/2 + 14} textAnchor="middle" fill="#9797a0" fontSize="9" letterSpacing="2">
        TOTAL NAV
      </text>
    </svg>
  )
}
