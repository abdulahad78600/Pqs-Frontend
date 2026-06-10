import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownToLine, AlertCircle, Banknote, Coins, Loader2, RefreshCw, ShieldCheck,
} from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import KycGate from '../../components/dashboard/KycGate.jsx'
import { PanelCard } from '../../components/dashboard/widgets.jsx'
import {
  fetchUserBalance,
  fetchUserFundsAndNavs,
  requestFiatWithdrawal,
  requestCryptoWithdrawal,
  fetchUserTransactions,
} from '../../utils/api.js'
import { fmtMoney, fmtNumber, fmtDate, txStatusLabel, txStatusTone } from '../../utils/format.js'

export default function WithdrawalsPage() {
  const { user } = useAuth()
  const userId = user?._id

  const [tab, setTab] = useState('fiat') // fiat | crypto
  const [balances, setBalances] = useState(null)
  const [enrollments, setEnrollments] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [fiatForm, setFiatForm] = useState({
    fund: '', classa: '', amount: '', currency: '',
  })
  const [cryptoForm, setCryptoForm] = useState({
    asset: '', network: '', amount: '', address: '',
  })

  const load = () => {
    if (!userId) return
    setLoading(true)
    Promise.allSettled([
      fetchUserBalance(userId),
      fetchUserFundsAndNavs(),
      fetchUserTransactions(userId),
    ]).then((results) => {
      const [bal, fnds, tx] = results
      if (bal.status === 'fulfilled' && bal.value?.success) setBalances(bal.value.balances)
      if (fnds.status === 'fulfilled' && fnds.value?.success) setEnrollments(fnds.value.data || [])
      if (tx.status === 'fulfilled' && tx.value?.success) {
        setHistory(
          (tx.value.transactions || [])
            .filter((t) => t.type === 'Withdrawal')
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        )
      }
      setLoading(false)
    })
  }

  useEffect(() => { load() }, [userId])

  const submitFiat = async (e) => {
    e.preventDefault()
    if (!fiatForm.fund || !fiatForm.classa || !fiatForm.amount || !fiatForm.currency) {
      toast.error('Please complete all fiat withdrawal fields.')
      return
    }
    setSubmitting(true)
    try {
      const data = await requestFiatWithdrawal({
        id: userId,
        account: 'pqsfund',
        fund: fiatForm.fund,
        classa: fiatForm.classa,
        amount: Number(fiatForm.amount),
        currency: fiatForm.currency,
      })
      if (data?.success) {
        toast.success(data.message || 'Withdrawal request submitted.')
        setFiatForm({ fund: '', classa: '', amount: '', currency: '' })
        load()
      } else {
        toast.error(data?.message || 'Withdrawal failed.')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Withdrawal failed.')
    } finally {
      setSubmitting(false)
    }
  }

  const submitCrypto = async (e) => {
    e.preventDefault()
    // Backend (newCryptoWithdrawal) requires: userId, asset, network,
    // walletAddress, amount — and rejects if any is missing.
    if (!cryptoForm.asset || !cryptoForm.network || !cryptoForm.amount || !cryptoForm.address) {
      toast.error('Please complete all crypto withdrawal fields, including the network.')
      return
    }
    setSubmitting(true)
    try {
      const data = await requestCryptoWithdrawal({
        userId,
        asset: cryptoForm.asset,
        network: cryptoForm.network,
        amount: Number(cryptoForm.amount),
        walletAddress: cryptoForm.address,
      })
      if (data?.success || data?.message) {
        toast.success(data.message || 'Crypto withdrawal request submitted.')
        setCryptoForm({ asset: '', network: '', amount: '', address: '' })
        load()
      } else {
        toast.error('Withdrawal failed.')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Withdrawal failed.')
    } finally {
      setSubmitting(false)
    }
  }

  // Balance schema stores the chain under `networkName` (UserModel.balances.crypto.networks);
  // fall back to the legacy keys just in case older records exist.
  const cryptoHoldings = (balances?.crypto || []).flatMap((c) =>
    (c.networks || []).map((n) => ({
      asset: c.asset,
      network: n.networkName || n.network || n.name || '',
      amount: n.availableBalance || 0,
    }))
  )

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Withdrawals</h2>
          <p className="text-sm text-sand-50/60 mt-1">Request fiat redemptions or send crypto to an external wallet.</p>
        </div>
        <button onClick={load} className="btn-ghost text-xs py-2"><RefreshCw size={14}/> Refresh</button>
      </div>

      <KycGate action="request a withdrawal">
      <div className="flex gap-1 overflow-x-auto pb-1">
        {[
          { id: 'fiat',   label: 'Fiat redemption', icon: Banknote },
          { id: 'crypto', label: 'Crypto withdrawal', icon: Coins },
        ].map((t) => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all border ${
              tab === t.id ? 'bg-gold-500/15 border-gold-500/40 text-gold-200' : 'border-sand-50/8 text-sand-50/65 hover:text-sand-50 hover:border-sand-50/20'
            }`}
          >
            <t.icon size={14}/> {t.label}
          </button>
        ))}
      </div>

      {tab === 'fiat' && (
        <PanelCard eyebrow="New request" title="Fiat redemption">
          <form onSubmit={submitFiat} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Fund" required>
                <select className="input" value={fiatForm.fund} onChange={(e) => setFiatForm((s) => ({ ...s, fund: e.target.value }))} required>
                  <option value="" className="bg-ink-900">Select fund…</option>
                  {enrollments.map((e) => (
                    <option key={e.fund?._id} value={e.fund?._id} className="bg-ink-900">
                      {e.fund?.name || e.fund?.fundName || 'Fund'}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Class name" required>
                <input className="input" value={fiatForm.classa} onChange={(e) => setFiatForm((s) => ({ ...s, classa: e.target.value }))} required/>
              </Field>
              <Field label="Currency" required>
                <select className="input" value={fiatForm.currency} onChange={(e) => setFiatForm((s) => ({ ...s, currency: e.target.value }))} required>
                  <option value="" className="bg-ink-900">Select currency…</option>
                  {(balances?.fiat || []).map((f) => (
                    <option key={f.currency} value={f.currency} className="bg-ink-900">
                      {f.currency} — {fmtMoney(f.availableBalance || 0, f.currency)} available
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Amount" required>
                <input type="number" min="0" step="0.01" className="input" value={fiatForm.amount} onChange={(e) => setFiatForm((s) => ({ ...s, amount: e.target.value }))} required/>
              </Field>
            </div>

            <div className="flex items-start gap-2 text-xs text-sand-50/55">
              <ShieldCheck size={12} className="text-gold-300 flex-shrink-0 mt-0.5"/>
              <span>Withdrawals are reviewed by our compliance team before processing. Settlement times depend on the fund and currency selected.</span>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={submitting} className="btn-primary text-sm">
                {submitting ? <><Loader2 size={14} className="animate-spin"/> Submitting…</> : <><ArrowDownToLine size={14}/> Submit request</>}
              </button>
            </div>
          </form>
        </PanelCard>
      )}

      {tab === 'crypto' && (
        <PanelCard eyebrow="New request" title="Crypto withdrawal">
          <form onSubmit={submitCrypto} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Asset" required>
                {/* Value encodes asset+network so an asset held on multiple chains
                    is uniquely selectable and auto-fills the matching network. */}
                <select className="input" value={`${cryptoForm.asset}|${cryptoForm.network}`}
                  onChange={(e) => {
                    const [asset, network] = e.target.value.split('|')
                    setCryptoForm((s) => ({ ...s, asset, network: network || s.network }))
                  }} required>
                  <option value="|" className="bg-ink-900">Select asset…</option>
                  {cryptoHoldings.map((h) => (
                    <option key={`${h.asset}-${h.network}`} value={`${h.asset}|${h.network}`} className="bg-ink-900">
                      {h.asset} · {h.network} — {fmtNumber(h.amount, 6)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Network" required>
                <input className="input" value={cryptoForm.network} onChange={(e) => setCryptoForm((s) => ({ ...s, network: e.target.value }))} required/>
              </Field>
              <Field label="Amount" required>
                <input type="number" min="0" step="any" className="input" value={cryptoForm.amount} onChange={(e) => setCryptoForm((s) => ({ ...s, amount: e.target.value }))} required/>
              </Field>
              <Field label="Destination address" required>
                <input className="input font-mono" value={cryptoForm.address} onChange={(e) => setCryptoForm((s) => ({ ...s, address: e.target.value }))} required/>
              </Field>
            </div>

            <div className="flex items-start gap-2 text-xs text-rose-300/85">
              <AlertCircle size={12} className="flex-shrink-0 mt-0.5"/>
              <span>Verify the network and address carefully — crypto transfers are irreversible.</span>
            </div>

            <div className="flex justify-end">
              <button type="submit" disabled={submitting} className="btn-primary text-sm">
                {submitting ? <><Loader2 size={14} className="animate-spin"/> Submitting…</> : <><Coins size={14}/> Submit withdrawal</>}
              </button>
            </div>
          </form>
        </PanelCard>
      )}
      </KycGate>

      <PanelCard eyebrow="History" title="Past withdrawal requests">
        {loading ? (
          <div className="py-8 text-center text-sand-50/55">Loading…</div>
        ) : history.length === 0 ? (
          <div className="py-8 text-center text-sand-50/55">No withdrawal history yet.</div>
        ) : (
          <ul className="space-y-2">
            {history.map((tx, i) => (
              <motion.li key={tx._id}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 10) * 0.02 }}
                className="p-3 rounded-lg border border-sand-50/8 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-rose-500/10 border border-rose-500/30 grid place-items-center text-rose-300 flex-shrink-0">
                  <ArrowDownToLine size={14}/>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-sand-50">{tx.paymentMethod || 'Withdrawal'} · {tx.currency || tx.asset}</div>
                  <div className="text-[11px] text-sand-50/55">{fmtDate(tx.date)}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-sand-50">{fmtMoney(tx.amount, tx.currency || 'USD')}</div>
                  <Pill tone={txStatusTone(tx.status)}>{txStatusLabel(tx.status)}</Pill>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </PanelCard>

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

function Pill({ tone, children }) {
  const cls = {
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber:   'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose:    'bg-rose-500/10 text-rose-300 border-rose-500/20',
  }[tone] || 'bg-sand-50/5 text-sand-50/70 border-sand-50/10'
  return <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls} mt-1`}>{children}</span>
}
