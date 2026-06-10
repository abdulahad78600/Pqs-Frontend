import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Wallet as WalletIcon, Plus, Copy, CheckCircle2, AlertCircle, Coins, RefreshCw, Loader2, ServerCrash,
  ArrowDownToLine, X,
} from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import { StatCard, PanelCard } from '../../components/dashboard/widgets.jsx'
import {
  fetchUserBalance,
  fetchWallets,
  fetchWalletCoins,
  createWallet,
  fetchBaseCurrency,
} from '../../utils/api.js'
import { fmtMoney, fmtNumber } from '../../utils/format.js'

export default function WalletPage() {
  const { user } = useAuth()
  const userId = user?._id

  const [balances, setBalances] = useState(null)
  const [wallets, setWallets] = useState([])
  const [coins, setCoins] = useState([])
  const [coinsLoading, setCoinsLoading] = useState(false)
  const [coinsError, setCoinsError] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showCreate, setShowCreate] = useState(false)
  const [selectedCoins, setSelectedCoins] = useState([])
  const [error, setError] = useState('')
  const [copiedKey, setCopiedKey] = useState(null)

  // Deposit modal: pick one of the user's existing wallets, show its address + QR.
  const [showDeposit, setShowDeposit] = useState(false)
  const [depositWalletId, setDepositWalletId] = useState('')
  const [depositAmount, setDepositAmount] = useState('')

  const loadData = () => {
    if (!userId) return
    setLoading(true)
    setError('')
    Promise.allSettled([
      fetchBaseCurrency(userId),
      fetchUserBalance(userId),
      fetchWallets(userId),
    ]).then((results) => {
      const [curr, bal, wal] = results
      if (curr.status === 'fulfilled' && curr.value?.success) {
        setCurrency(curr.value.currency?.currency || 'USD')
      }
      if (bal.status === 'fulfilled' && bal.value?.success) {
        setBalances(bal.value.balances)
      }
      if (wal.status === 'fulfilled' && wal.value?.success) {
        setWallets(wal.value.wallets || [])
      } else if (wal.status === 'fulfilled') {
        setWallets([])
      }
      if (results.every((r) => r.status === 'rejected')) {
        setError("We couldn't load your wallet data.")
      }
      setLoading(false)
    })
  }

  useEffect(() => { loadData() }, [userId])

  const loadCoins = async () => {
    setCoinsLoading(true)
    setCoinsError('')
    try {
      const data = await fetchWalletCoins()
      const list = Array.isArray(data) ? data : data?.data || []
      setCoins(list)
      if (list.length === 0) {
        setCoinsError('No supported assets are available right now.')
      }
    } catch (err) {
      const msg = err?.response?.data?.message || 'Crypto provider is unreachable right now. Please try again in a moment.'
      setCoinsError(msg)
    } finally {
      setCoinsLoading(false)
    }
  }

  const openCreate = () => {
    setShowCreate(true)
    if (coins.length === 0 && !coinsLoading) loadCoins()
  }

  const toggleCoin = (coin) => {
    setSelectedCoins((prev) => {
      const exists = prev.find((c) => c.chain_id === coin.chain_id && c.asset === coin.asset)
      return exists
        ? prev.filter((c) => !(c.chain_id === coin.chain_id && c.asset === coin.asset))
        : [...prev, coin]
    })
  }

  const handleCreate = async () => {
    if (selectedCoins.length === 0) {
      toast.error('Select at least one coin to create a wallet for.')
      return
    }
    setCreating(true)
    try {
      const payload = selectedCoins.map((c) => ({
        asset: c.asset,
        chain_id: c.chain_id,
        token_id: c.token_id,
        network: c.network || c.chain,
      }))
      const data = await createWallet(payload)
      if (data?.success) {
        toast.success(data.message || 'Wallet created successfully.')
        setShowCreate(false)
        setSelectedCoins([])
        loadData()
      } else {
        toast.error(data?.message || 'Failed to create wallet.')
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Failed to create wallet.')
    } finally {
      setCreating(false)
    }
  }

  const copyAddress = (address, key) => {
    navigator.clipboard.writeText(address)
    setCopiedKey(key)
    toast.success('Address copied.')
    setTimeout(() => setCopiedKey(null), 1500)
  }

  // Open the deposit modal. If the user has wallets, preselect the first one;
  // otherwise the modal prompts them to create a wallet first.
  const openDeposit = () => {
    setDepositWalletId((prev) => prev || wallets[0]?._id || '')
    setDepositAmount('')
    setShowDeposit(true)
  }
  const depositWallet = wallets.find((w) => w._id === depositWalletId) || null

  const fiatTotal = useMemo(
    () => (balances?.fiat || []).reduce((s, f) => s + (f.availableBalance || 0), 0),
    [balances]
  )
  const cryptoTotalAssets = useMemo(() => {
    const map = {}
    ;(balances?.crypto || []).forEach((c) => {
      const total = (c.networks || []).reduce((s, n) => s + (n.availableBalance || 0), 0)
      map[c.asset] = (map[c.asset] || 0) + total
    })
    return Object.entries(map).map(([asset, total]) => ({ asset, total }))
  }, [balances])

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Wallet</h2>
          <p className="text-sm text-sand-50/60 mt-1">Manage your fiat balances and crypto deposit addresses.</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadData} className="btn-ghost text-xs py-2"><RefreshCw size={14}/> Refresh</button>
          <button onClick={openDeposit} className="btn-ghost text-xs py-2"><ArrowDownToLine size={14}/> Deposit</button>
          <button onClick={openCreate} className="btn-primary text-xs py-2"><Plus size={14}/> Create wallet</button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Fiat balance" value={loading ? '…' : fmtMoney(fiatTotal, currency)} icon={WalletIcon} />
        <StatCard label="Active addresses" value={loading ? '…' : `${wallets.length}`} icon={Coins} />
        <StatCard label="Crypto assets" value={loading ? '…' : `${cryptoTotalAssets.length}`} />
        <StatCard label="Base currency" value={currency} />
      </div>

      <PanelCard eyebrow="Fiat balances" title="Available currencies">
        {balances?.fiat?.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {balances.fiat.map((f) => (
              <div key={f.currency} className="card-glass p-4">
                <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{f.currency}</div>
                <div className="mt-1 font-display text-xl text-sand-50">{fmtMoney(f.availableBalance || 0, f.currency)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sand-50/55">{loading ? 'Loading…' : 'No fiat balances yet.'}</div>
        )}
      </PanelCard>

      <PanelCard eyebrow="Crypto holdings" title="Asset summary">
        {cryptoTotalAssets.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {cryptoTotalAssets.map((c) => (
              <div key={c.asset} className="card-glass p-4">
                <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{c.asset}</div>
                <div className="mt-1 font-display text-xl text-sand-50">{fmtNumber(c.total, 6)}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sand-50/55">{loading ? 'Loading…' : 'No crypto holdings yet.'}</div>
        )}
      </PanelCard>

      <PanelCard eyebrow="Deposit addresses" title="Crypto wallets">
        {wallets.length > 0 ? (
          <div className="space-y-3">
            {wallets.map((w) => (
              <motion.div key={w._id}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                className="card-glass p-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300 flex-shrink-0">
                  <Coins size={16} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm text-sand-50">{w.asset} <span className="text-sand-50/45 text-[11px]">· {w.network || 'Network'}</span></div>
                  <div className="font-mono text-[11px] text-sand-50/65 truncate">{w.wallet}</div>
                </div>
                <button onClick={() => copyAddress(w.wallet, w._id)} className="btn-ghost text-xs py-2 flex-shrink-0">
                  {copiedKey === w._id ? <><CheckCircle2 size={14}/> Copied</> : <><Copy size={14}/> Copy</>}
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-sand-50/55">
            {loading ? 'Loading…' : 'No crypto deposit addresses yet. Click “Create wallet” to generate one.'}
          </div>
        )}
      </PanelCard>

      {/* Create wallet modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-950/70 backdrop-blur-sm p-4" onClick={() => !creating && setShowCreate(false)}>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className="card-glass p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-300/80">Create wallet</div>
                <h3 className="font-display text-xl mt-1">Select assets &amp; networks</h3>
              </div>
              <button onClick={() => !creating && setShowCreate(false)} className="text-sand-50/60 hover:text-sand-50">×</button>
            </div>

            {coinsLoading ? (
              <div className="py-12 text-center text-sand-50/55">
                <Loader2 className="mx-auto animate-spin mb-3" size={20} />
                Loading supported coins…
              </div>
            ) : coinsError ? (
              <div className="py-10 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/30 grid place-items-center text-rose-300 mb-4">
                  <ServerCrash size={20} />
                </div>
                <div className="font-display text-lg text-sand-50">Couldn't load supported coins</div>
                <p className="mt-2 text-sm text-sand-50/65 max-w-md mx-auto leading-relaxed">{coinsError}</p>
                <p className="mt-2 text-[11px] text-sand-50/45">
                  This is a temporary issue with our crypto provider — your account is fine.
                </p>
                <div className="mt-5 flex items-center justify-center gap-2">
                  <button onClick={() => setShowCreate(false)} className="btn-ghost text-xs py-2">Close</button>
                  <button onClick={loadCoins} className="btn-primary text-xs py-2">
                    <RefreshCw size={14}/> Try again
                  </button>
                </div>
              </div>
            ) : coins.length === 0 ? (
              <div className="py-12 text-center text-sand-50/55">
                No supported assets are available right now.
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
                  {coins.map((c) => {
                    const key = `${c.chain_id}-${c.asset}`
                    const selected = selectedCoins.some((s) => s.chain_id === c.chain_id && s.asset === c.asset)
                    return (
                      <button key={key} type="button"
                        onClick={() => toggleCoin(c)}
                        className={`text-left p-3 rounded-lg border transition-all ${
                          selected ? 'bg-gold-500/10 border-gold-500/40' : 'border-sand-50/8 hover:border-sand-50/20'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-sand-50">{c.asset}</div>
                          {selected && <CheckCircle2 size={14} className="text-gold-300" />}
                        </div>
                        <div className="text-[10px] text-sand-50/55 uppercase tracking-widest mt-1">{c.network || c.chain || `chain ${c.chain_id}`}</div>
                      </button>
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center justify-end gap-2">
                  <button onClick={() => setShowCreate(false)} disabled={creating} className="btn-ghost text-xs py-2">Cancel</button>
                  <button onClick={handleCreate} disabled={creating || selectedCoins.length === 0} className="btn-primary text-xs py-2 disabled:opacity-40">
                    {creating ? <><Loader2 size={14} className="animate-spin"/> Creating…</> : <><Plus size={14}/> Create {selectedCoins.length || ''}</>}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}

      {/* Deposit modal — pick an existing wallet, show its address + QR to receive funds */}
      {showDeposit && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink-950/70 backdrop-blur-sm p-4" onClick={() => setShowDeposit(false)}>
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            className="card-glass p-6 max-w-md w-full max-h-[88vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <div className="text-xs uppercase tracking-widest text-gold-300/80">Deposit crypto</div>
                <h3 className="font-display text-xl mt-1">Receive funds</h3>
              </div>
              <button onClick={() => setShowDeposit(false)} className="text-sand-50/60 hover:text-sand-50"><X size={18} /></button>
            </div>

            {wallets.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 grid place-items-center text-gold-300 mb-4">
                  <Coins size={20} />
                </div>
                <div className="font-display text-lg text-sand-50">No deposit address yet</div>
                <p className="mt-2 text-sm text-sand-50/65 leading-relaxed">
                  You need a crypto wallet address before you can deposit. Create one first.
                </p>
                <button
                  onClick={() => { setShowDeposit(false); openCreate() }}
                  className="btn-primary text-xs py-2 mt-5"
                >
                  <Plus size={14}/> Create wallet
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Asset / network selector */}
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">Asset / Network</span>
                  <select
                    value={depositWalletId}
                    onChange={(e) => setDepositWalletId(e.target.value)}
                    className="w-full bg-ink-900 border border-sand-50/10 rounded-lg px-3 py-2.5 text-sm text-sand-50 focus:outline-none focus:border-gold-500/50"
                  >
                    {wallets.map((w) => (
                      <option key={w._id} value={w._id} className="bg-ink-900">
                        {w.asset} · {w.network || 'Network'}
                      </option>
                    ))}
                  </select>
                </label>

                {/* Amount — for the user's reference only (deposits credit automatically on-chain) */}
                <label className="block">
                  <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">Amount (optional, for your reference)</span>
                  <input
                    type="number" min="0" step="any" placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                    className="w-full bg-ink-900 border border-sand-50/10 rounded-lg px-3 py-2.5 text-sm text-sand-50 focus:outline-none focus:border-gold-500/50 placeholder:text-sand-50/35"
                  />
                </label>

                {depositWallet && (
                  <>
                    {/* QR */}
                    <div className="flex justify-center pt-1">
                      <div className="bg-white p-3 rounded-xl">
                        <QRCodeCanvas value={depositWallet.wallet} size={168} includeMargin={false} />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">
                        Your {depositWallet.asset} deposit address
                      </span>
                      <div className="flex items-center gap-2 bg-ink-900 border border-sand-50/10 rounded-lg px-3 py-2.5">
                        <span className="font-mono text-[11px] text-sand-50/80 break-all flex-1">{depositWallet.wallet}</span>
                        <button
                          onClick={() => copyAddress(depositWallet.wallet, `deposit-${depositWallet._id}`)}
                          className="btn-ghost text-xs py-1.5 flex-shrink-0"
                        >
                          {copiedKey === `deposit-${depositWallet._id}`
                            ? <><CheckCircle2 size={14}/> Copied</>
                            : <><Copy size={14}/> Copy</>}
                        </button>
                      </div>
                    </div>

                    {/* Guidance */}
                    <div className="flex items-start gap-2 text-xs text-sand-50/60 bg-sand-50/4 border border-sand-50/8 rounded-lg px-3 py-2.5">
                      <AlertCircle size={13} className="text-gold-300 flex-shrink-0 mt-0.5" />
                      <span>
                        Send only <b className="text-sand-50/85">{depositWallet.asset}</b> on the{' '}
                        <b className="text-sand-50/85">{depositWallet.network || 'selected'}</b> network to this address.
                        Your balance updates automatically once the deposit is confirmed on-chain.
                      </span>
                    </div>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}
