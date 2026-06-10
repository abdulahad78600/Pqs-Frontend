import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wallet, FileText, ArrowRight, MessageSquare, AlertCircle,
  Layers, CircleDollarSign, Activity, Bell,
} from 'lucide-react'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { PanelCard } from '../../../components/dashboard/widgets.jsx'
import {
  fetchUserBalance,
  fetchUserFundsAndNavs,
  fetchUserTransactions,
  fetchBaseCurrency,
  fetchNotifications,
} from '../../../utils/api.js'
import { fmtMoney, fmtRelative, txStatusLabel, txStatusTone } from '../../../utils/format.js'

export default function InvestorOverview() {
  const { user } = useAuth()
  const userId = user?._id

  const [currency, setCurrency] = useState('USD')
  const [balances, setBalances] = useState(null)
  const [funds, setFunds] = useState([])
  const [transactions, setTransactions] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    let alive = true
    setLoading(true)
    setError('')

    Promise.allSettled([
      fetchBaseCurrency(userId),
      fetchUserBalance(userId),
      fetchUserFundsAndNavs(),
      fetchUserTransactions(userId),
      fetchNotifications(),
    ]).then((results) => {
      if (!alive) return
      const [curr, bal, fnds, tx, notif] = results

      if (curr.status === 'fulfilled' && curr.value?.success) {
        setCurrency(curr.value.currency?.currency || 'USD')
      }
      if (bal.status === 'fulfilled' && bal.value?.success) {
        setBalances(bal.value.balances)
      }
      if (fnds.status === 'fulfilled' && fnds.value?.success) {
        setFunds(fnds.value.data || [])
      }
      if (tx.status === 'fulfilled' && tx.value?.success) {
        const sorted = [...(tx.value.transactions || [])].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setTransactions(sorted)
      }
      if (notif.status === 'fulfilled' && notif.value?.success) {
        setNotifications(notif.value.notifications || [])
      }

      if (results.every((r) => r.status === 'rejected')) {
        setError("We couldn't load your data. Please try again shortly.")
      }
      setLoading(false)
    })

    return () => { alive = false }
  }, [userId])

  // ────────── derived ──────────
  const fiatTotal = useMemo(
    () => (balances?.fiat || []).reduce((s, f) => s + (f.availableBalance || 0), 0),
    [balances]
  )

  const totalNav = useMemo(
    () => funds.reduce((s, f) => s + (f.balance || 0), 0),
    [funds]
  )

  // Stablecoin portion of crypto balances (USDC/USDT/DAI), priced 1:1 against USD.
  const stablecoinTotal = useMemo(() => {
    const stables = new Set(['USDT', 'USDC', 'DAI', 'BUSD', 'TUSD'])
    let total = 0
    ;(balances?.crypto || []).forEach((c) => {
      if (stables.has(String(c.asset).toUpperCase())) {
        total += (c.networks || []).reduce((s, n) => s + (n.availableBalance || 0), 0)
      }
    })
    return total
  }, [balances])

  // Asset balances grid — always show the standard set (USD / BTC / ETH / USDT)
  // so the layout matches the reference even when balances are empty. Real
  // values overwrite the defaults when the API returns them.
  const assetBalances = useMemo(() => {
    const order = ['USD', 'BTC', 'ETH', 'USDT']
    const totals = Object.fromEntries(order.map((a) => [a, 0]))
    ;(balances?.fiat || []).forEach((f) => {
      const k = String(f.currency || '').toUpperCase()
      if (k in totals) totals[k] += f.availableBalance || 0
      else totals[k] = f.availableBalance || 0
    })
    ;(balances?.crypto || []).forEach((c) => {
      const k = String(c.asset || '').toUpperCase()
      const sum = (c.networks || []).reduce((s, n) => s + (n.availableBalance || 0), 0)
      if (k in totals) totals[k] += sum
      else totals[k] = sum
    })
    // Stable display order: USD, BTC, ETH, USDT, then any extras from the API.
    const extras = Object.keys(totals).filter((k) => !order.includes(k))
    return [...order, ...extras].slice(0, 8).map((asset) => ({ asset, total: totals[asset] || 0 }))
  }, [balances])

  const totalLiveHoldings = fiatTotal + totalNav + stablecoinTotal

  const openActions = useMemo(
    () => transactions.filter((t) => t.status === 0).length,
    [transactions]
  )

  // Composition pieces for donut (cash, fund investments, stablecoins).
  // Always render all three so the legend matches the reference even when
  // values are zero — DonutChart falls back to even thirds in that case.
  const composition = useMemo(() => [
    { label: 'Cash Holdings',     value: fiatTotal,        color: '#a78bfa' },
    { label: 'Fund Investments',  value: totalNav,         color: '#34d399' },
    { label: 'Stablecoins',       value: stablecoinTotal,  color: '#60a5fa' },
  ], [fiatTotal, totalNav, stablecoinTotal])

  const recentTx = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* ─── Hero / welcome block ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="card-glass p-7 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold-500/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-300/80 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-gold-400" />
            Investor Overview
          </div>
          <h1 className="mt-5 font-display text-3xl md:text-5xl tracking-tight text-sand-50">
            Welcome back, <span className="gold-text">{(user?.name || user?.email || 'Investor').split(' ')[0]}</span>.
          </h1>
          <p className="mt-3 max-w-3xl text-sm md:text-base text-sand-50/65 leading-relaxed">
            Your account has successfully cleared our Kyc. Wallet management, subscription
            actions, reporting, and withdrawal requests are available.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/dashboard/funds" className="btn-primary text-sm">
              Explore funds <ArrowRight size={14} />
            </Link>
            <Link to="/dashboard/wallet" className="btn-ghost text-sm">
              Manage wallets
            </Link>
          </div>
        </div>
      </motion.div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {/* ─── Top stat row ─── */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BigStatCard
          label="Total Live Holdings"
          icon={Wallet}
          value={loading ? '…' : fmtMoney(totalLiveHoldings, currency)}
          hint="Cash, stablecoins, and active fund positions combined."
        />
        <BigStatCard
          label="Fund Investments"
          icon={Layers}
          value={loading ? '…' : fmtMoney(totalNav, currency)}
          hint={`${funds.length} live fund enrolment${funds.length === 1 ? '' : 's'} active.`}
        />
        <BigStatCard
          label="Cash Balance"
          icon={CircleDollarSign}
          value={loading ? '…' : fmtMoney(fiatTotal, currency)}
          hint="Available USD after deposits, subscriptions, and withdrawals."
        />
        <BigStatCard
          label="Open Actions"
          icon={Activity}
          value={loading ? '…' : `${openActions}`}
          hint="Requests pending operational review or processing."
        />
      </div>

      {/* ─── Messages & Updates surfaced (kept from prior brief) ─── */}
      <PanelCard
        eyebrow="Messages & Updates"
        title={
          <span className="inline-flex items-center gap-2">
            <MessageSquare size={16} className="text-gold-300" />
            {notifications.length > 0
              ? `You have ${notifications.length} update${notifications.length === 1 ? '' : 's'}`
              : 'No new messages'}
          </span>
        }
        action={<Link to="/dashboard/notifications" className="text-xs text-gold-300 hover:text-gold-200">View all →</Link>}
        accent
      >
        {notifications.length > 0 ? (
          <ul className="space-y-3">
            {notifications.slice(0, 3).map((n) => (
              <li key={n._id} className="border-b border-sand-50/8 last:border-0 pb-3 last:pb-0">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm text-sand-50">{n.title || 'Update'}</div>
                    {n.message && (
                      <p className="mt-1 text-xs text-sand-50/65 leading-relaxed line-clamp-2">{n.message}</p>
                    )}
                  </div>
                  <div className="text-[10px] text-sand-50/45 uppercase tracking-widest flex-shrink-0">
                    {fmtRelative(n.createdAt)}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-sand-50/60 py-2">
            {loading ? 'Loading…' : 'New messages and informational updates from the PQS team will appear here.'}
          </p>
        )}
      </PanelCard>

      {/* ─── Portfolio Composition (donut) + Asset Balances grid ─── */}
      <div className="grid lg:grid-cols-2 gap-5">
        <PanelCard eyebrow="Portfolio Composition">
          <div className="flex flex-col sm:flex-row items-center gap-8 py-4">
            <DonutChart
              segments={composition}
              centerValue={fmtCompactMoney(totalLiveHoldings, currency)}
            />
            <ul className="flex-1 w-full space-y-5">
              {composition.map((s) => (
                <li key={s.label} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                  <div className="min-w-0">
                    <div className="text-sm text-sand-50">{s.label}</div>
                    <div className="text-xs text-sand-50/60 mt-0.5">{fmtMoney(s.value, currency)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </PanelCard>

        <PanelCard eyebrow="Asset Balances">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {assetBalances.map((a) => (
              <div
                key={a.asset}
                className="rounded-xl border border-sand-50/10 bg-ink-900/40 px-4 py-5 hover:border-gold-500/30 transition-colors"
              >
                <div className="text-[11px] uppercase tracking-widest text-sand-50/55">{a.asset}</div>
                <div className="mt-2 font-display text-2xl gold-text leading-none">{fmtCompact(a.total)}</div>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      {/* ─── Live Holdings (table) + Notification Pulse ─── */}
      <div className="grid lg:grid-cols-2 gap-5">
        <PanelCard eyebrow="Live Holdings"
          action={<Link to="/dashboard/portfolio" className="text-xs text-gold-300 hover:text-gold-200">Open portfolio →</Link>}
        >
          {funds.length === 0 ? (
            <EmptyHint
              message={loading ? 'Loading enrolments…' : 'You have no fund enrolments yet.'}
              cta={!loading ? { to: '/dashboard/funds', label: 'Browse funds' } : null}
            />
          ) : (
            <div className="overflow-x-auto -mx-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="text-[10px] uppercase tracking-widest text-sand-50/45 font-normal pb-3 px-2">Fund</th>
                    <th className="text-[10px] uppercase tracking-widest text-sand-50/45 font-normal pb-3 px-2">Class</th>
                    <th className="text-[10px] uppercase tracking-widest text-sand-50/45 font-normal pb-3 px-2">Value</th>
                    <th className="text-[10px] uppercase tracking-widest text-sand-50/45 font-normal pb-3 px-2">Units</th>
                  </tr>
                </thead>
                <tbody>
                  {funds.map((f) => (
                    <tr key={f.enrollmentId || f._id} className="border-t border-sand-50/8">
                      <td className="px-2 py-3 text-sand-50">{f.fund?.name || f.fund?.fundName || 'Fund'}</td>
                      <td className="px-2 py-3 text-sand-50/75">{f.shareClass?.className || f.className || '—'}</td>
                      <td className="px-2 py-3 text-sand-50">{fmtMoney(f.balance || 0, currency)}</td>
                      <td className="px-2 py-3 text-sand-50/75 font-mono">{f.units != null ? Number(f.units).toFixed(2) : '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </PanelCard>

        <PanelCard eyebrow="Notification Pulse"
          action={<Link to="/dashboard/notifications" className="text-xs text-gold-300 hover:text-gold-200">All →</Link>}
        >
          {recentTx.length === 0 && notifications.length === 0 ? (
            <div className="py-10 text-center text-sand-50/55">
              <Bell size={22} className="mx-auto opacity-50 mb-2" />
              {loading ? 'Loading…' : 'No recent activity yet.'}
            </div>
          ) : (
            <ul className="space-y-3">
              {recentTx.slice(0, 4).map((tx) => (
                <li key={tx._id} className="flex items-start justify-between gap-3 border-b border-sand-50/8 last:border-0 pb-3 last:pb-0">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-sand-50">{tx.type} · {tx.currency || tx.asset}</div>
                    <div className="text-[11px] text-sand-50/55">{fmtRelative(tx.date)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-sand-50">{fmtMoney(tx.amount, tx.currency || currency)}</div>
                    <Pill tone={txStatusTone(tx.status)}>{txStatusLabel(tx.status)}</Pill>
                  </div>
                </li>
              ))}
              {recentTx.length === 0 && notifications.slice(0, 3).map((n) => (
                <li key={n._id} className="border-b border-sand-50/8 last:border-0 pb-3 last:pb-0">
                  <div className="text-sm text-sand-50">{n.title || 'Update'}</div>
                  {n.message && <p className="mt-1 text-xs text-sand-50/65 leading-relaxed line-clamp-2">{n.message}</p>}
                </li>
              ))}
            </ul>
          )}
        </PanelCard>
      </div>
    </div>
  )
}

// ─── Local presentational components ───

function BigStatCard({ label, value, hint, icon: Icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="card-glass p-6 relative overflow-hidden"
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl bg-gold-500/10 pointer-events-none" />
      <div className="relative">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest text-gold-300/80 px-2.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/25">
            <span className="h-1 w-1 rounded-full bg-gold-400" />
            {label}
          </span>
          {Icon && <Icon size={14} className="text-gold-300/70 ml-auto" />}
        </div>
        <div className="mt-4 font-display text-3xl md:text-4xl gold-text leading-none">{value}</div>
        {hint && <p className="mt-3 text-xs text-sand-50/60 leading-relaxed">{hint}</p>}
      </div>
    </motion.div>
  )
}

function DonutChart({ segments, centerValue }) {
  // When the portfolio has no value yet, render three even slices so the
  // chart visually matches the reference (a tri-color ring) instead of an
  // empty grey circle. Real values take over once balances arrive.
  const realTotal = segments.reduce((s, x) => s + x.value, 0)
  const total = realTotal || segments.length
  const slices = segments.map((s) => ({
    ...s,
    portion: realTotal ? s.value / total : 1 / total,
  }))

  const r = 44
  const c = 2 * Math.PI * r
  const gap = 1.5 // visual gap between segments, in stroke units
  let offset = 0

  return (
    <div className="relative w-52 h-52 flex-shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(247,244,238,0.05)" strokeWidth="13" />
        {slices.map((s, i) => {
          const len = Math.max(0, s.portion * c - gap)
          const dasharray = `${len} ${c - len}`
          const dashoffset = -offset
          offset += s.portion * c
          return (
            <circle key={i}
              cx="60" cy="60" r={r}
              fill="none"
              stroke={s.color}
              strokeWidth="13"
              strokeLinecap="butt"
              strokeDasharray={dasharray}
              strokeDashoffset={dashoffset}
            />
          )
        })}
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="font-display text-xl text-sand-50">{centerValue}</div>
          <div className="text-[9px] uppercase tracking-widest text-sand-50/55 mt-1">USD equiv.</div>
        </div>
      </div>
    </div>
  )
}

function EmptyHint({ message, cta }) {
  return (
    <div className="py-10 text-center">
      <div className="text-sm text-sand-50/60">{message}</div>
      {cta && (
        <Link to={cta.to} className="mt-3 inline-flex btn-ghost text-xs py-2">{cta.label}</Link>
      )}
    </div>
  )
}

function Pill({ tone, children }) {
  const cls = {
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber:   'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose:    'bg-rose-500/10 text-rose-300 border-rose-500/20',
  }[tone] || 'bg-sand-50/5 text-sand-50/70 border-sand-50/10'
  return <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>{children}</span>
}

// ─── Formatters ───

function fmtCompact(n) {
  if (n == null || isNaN(n)) return '—'
  const abs = Math.abs(n)
  if (abs >= 1e6) return `${(n / 1e6).toFixed(2)}M`
  if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return Number(n).toFixed(2)
}

function fmtCompactMoney(n, currency) {
  if (n == null || isNaN(n) || n === 0) return fmtMoney(0, currency)
  const abs = Math.abs(n)
  if (abs >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (abs >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return fmtMoney(n, currency)
}
