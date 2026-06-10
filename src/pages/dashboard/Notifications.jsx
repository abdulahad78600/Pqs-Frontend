import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Bell, CheckCheck, RefreshCw, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import { PanelCard } from '../../components/dashboard/widgets.jsx'
import { fetchNotifications, markAllNotificationsRead } from '../../utils/api.js'
import { fmtRelative } from '../../utils/format.js'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = () => {
    setLoading(true)
    setError('')
    fetchNotifications()
      .then((data) => {
        if (data?.success) {
          setNotifications(data.notifications || [])
          setUnreadCount(data.unreadCount || 0)
        } else {
          setError(data?.message || "We couldn't load notifications.")
        }
      })
      .catch(() => setError("We couldn't load notifications."))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const markAll = async () => {
    try {
      const data = await markAllNotificationsRead()
      if (data?.success) {
        toast.success(data.message || 'All notifications marked as read.')
        setUnreadCount(0)
        setNotifications((list) => list.map((n) => ({ ...n, isRead: true })))
      }
    } catch {
      toast.error("Failed to mark notifications as read.")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl">Messages & Updates</h2>
          <p className="text-sm text-sand-50/60 mt-1">
            {loading
              ? 'Loading…'
              : unreadCount > 0
                ? `You have ${unreadCount} unread message${unreadCount === 1 ? '' : 's'}.`
                : 'You\'re all caught up.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load} className="btn-ghost text-xs py-2"><RefreshCw size={14}/> Refresh</button>
          <button onClick={markAll} disabled={unreadCount === 0} className="btn-primary text-xs py-2 disabled:opacity-40">
            <CheckCheck size={14}/> Mark all read
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      <PanelCard eyebrow="Inbox" title={`${notifications.length} record${notifications.length === 1 ? '' : 's'}`}>
        {notifications.length === 0 ? (
          <div className="py-12 text-center text-sand-50/55">
            <Bell size={28} className="mx-auto opacity-50 mb-3" />
            {loading ? 'Loading…' : 'No notifications yet.'}
          </div>
        ) : (
          <ul className="space-y-2">
            {notifications.map((n, i) => (
              <motion.li key={n._id}
                initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i, 10) * 0.02 }}
                className={`p-4 rounded-xl border flex items-start gap-3 ${
                  n.isRead ? 'border-sand-50/8' : 'bg-gold-500/5 border-gold-500/20'
                }`}
              >
                <div className={`w-9 h-9 rounded-lg grid place-items-center flex-shrink-0 ${
                  n.isRead ? 'bg-ink-900 border border-sand-50/10 text-sand-50/65' : 'bg-gold-500/15 border border-gold-500/30 text-gold-300'
                }`}>
                  <Bell size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm text-sand-50 truncate">{n.title || 'Notification'}</div>
                    <div className="text-[10px] text-sand-50/45 uppercase tracking-widest flex-shrink-0">
                      {fmtRelative(n.createdAt)}
                    </div>
                  </div>
                  {n.message && <div className="text-xs text-sand-50/65 mt-1 leading-relaxed">{n.message}</div>}
                  {n.type && (
                    <div className="text-[10px] uppercase tracking-widest text-gold-300/80 mt-2">{n.type}</div>
                  )}
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </PanelCard>
    </div>
  )
}
