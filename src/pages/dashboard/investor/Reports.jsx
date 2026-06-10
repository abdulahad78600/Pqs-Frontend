import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, AlertCircle, FileText } from 'lucide-react'
import { useAuth } from '../../../auth/AuthContext.jsx'
import { PanelCard } from '../../../components/dashboard/widgets.jsx'
import { fetchUserTransactions, fetchBaseCurrency } from '../../../utils/api.js'
import { fmtMoney, fmtDateTime, txStatusLabel, txStatusTone } from '../../../utils/format.js'

const TYPES = ['All', 'Deposit', 'Withdrawal', 'Fee', 'Profit']

export default function InvestorReports() {
  const { user } = useAuth()
  const userId = user?._id

  const [transactions, setTransactions] = useState([])
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [q, setQ] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  useEffect(() => {
    if (!userId) return
    let alive = true
    setLoading(true)
    setError('')

    Promise.allSettled([
      fetchBaseCurrency(userId),
      fetchUserTransactions(userId),
    ]).then((results) => {
      if (!alive) return
      const [curr, tx] = results
      if (curr.status === 'fulfilled' && curr.value?.success) {
        setCurrency(curr.value.currency?.currency || 'USD')
      }
      if (tx.status === 'fulfilled' && tx.value?.success) {
        const sorted = [...(tx.value.transactions || [])].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setTransactions(sorted)
      } else if (tx.status === 'rejected') {
        setError("We couldn't load your reports.")
      }
      setLoading(false)
    })
    return () => { alive = false }
  }, [userId])

  const filtered = useMemo(() => transactions.filter((t) => {
    const text = `${t.type || ''} ${t.currency || ''} ${t.asset || ''} ${t.paymentMethod || ''}`.toLowerCase()
    if (q && !text.includes(q.toLowerCase())) return false
    if (typeFilter !== 'All' && t.type !== typeFilter) return false
    return true
  }), [transactions, q, typeFilter])

  const exportCsv = () => {
    if (!filtered.length) return
    const rows = [
      ['Date', 'Type', 'Asset', 'Method', 'Amount', 'Currency', 'Status'],
      ...filtered.map((t) => [
        new Date(t.date).toISOString(),
        t.type || '',
        t.asset || t.currency || '',
        t.paymentMethod || '',
        t.amount ?? '',
        t.currency || '',
        txStatusLabel(t.status),
      ]),
    ]
    const csv = rows.map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `pqs-transactions-${Date.now()}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Investment Reports</h2>
        <p className="text-sm text-sand-50/60 mt-1">Full transaction history and downloadable activity log.</p>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="card-glass p-4 flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex items-center gap-2 flex-1 px-3 py-2 rounded-full bg-ink-900 border border-sand-50/8">
          <Search size={14} className="text-sand-50/40" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search by type, asset or method…"
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-sand-50/40" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-ink-900 border border-sand-50/8 rounded-full px-4 py-2 text-sm text-sand-50 focus:outline-none focus:border-gold-500/50"
        >
          {TYPES.map((t) => <option key={t} className="bg-ink-900" value={t}>{t}</option>)}
        </select>
        <button onClick={exportCsv} disabled={!filtered.length} className="btn-ghost text-xs py-2 disabled:opacity-40">
          <Download size={14}/> Export CSV
        </button>
      </div>

      <PanelCard eyebrow="Activity" title={loading ? 'Loading…' : `${filtered.length} record${filtered.length === 1 ? '' : 's'}`}>
        {filtered.length === 0 ? (
          <div className="py-10 text-center text-sand-50/55">
            <FileText size={28} className="mx-auto opacity-50 mb-3" />
            {loading ? 'Loading transactions…' : 'No transactions match your filters.'}
          </div>
        ) : (
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-widest text-sand-50/45 border-b border-sand-50/8">
                  <th className="text-left p-2">Date</th>
                  <th className="text-left p-2">Type</th>
                  <th className="text-left p-2">Asset</th>
                  <th className="text-left p-2">Method</th>
                  <th className="text-right p-2">Amount</th>
                  <th className="text-right p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((t, i) => (
                  <motion.tr key={t._id}
                    initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 10) * 0.02 }}
                    className="border-b border-sand-50/5 hover:bg-sand-50/3"
                  >
                    <td className="p-2 text-sand-50/70 whitespace-nowrap">{fmtDateTime(t.date)}</td>
                    <td className="p-2 text-sand-50">{t.type || '—'}</td>
                    <td className="p-2 text-sand-50/80">{t.asset || t.currency || '—'}</td>
                    <td className="p-2 text-sand-50/65">{t.paymentMethod || '—'}</td>
                    <td className="p-2 text-right text-sand-50">{fmtMoney(t.amount, t.currency || currency)}</td>
                    <td className="p-2 text-right">
                      <Pill tone={txStatusTone(t.status)}>{txStatusLabel(t.status)}</Pill>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </PanelCard>
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
