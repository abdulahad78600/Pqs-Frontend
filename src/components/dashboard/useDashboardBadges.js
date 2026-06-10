import { useEffect, useState } from 'react'
import { fetchNotifications, fetchUserData } from '../../utils/api.js'
import { useAuth } from '../../auth/AuthContext.jsx'

// Polls light-weight count sources so sidebar badges stay accurate without
// requiring each consumer page to re-fetch.
export function useDashboardBadges() {
  const { user } = useAuth()
  const [badges, setBadges] = useState({ unread: 0, kyc: null })

  useEffect(() => {
    if (!user?._id) return
    let alive = true
    const load = () => {
      Promise.allSettled([
        fetchNotifications(),
        fetchUserData(user._id),
      ]).then(([n, u]) => {
        if (!alive) return
        const next = {}
        if (n.status === 'fulfilled' && n.value?.success) {
          next.unread = Number(n.value.unreadCount || 0)
        }
        if (u.status === 'fulfilled') {
          const data = u.value?.user || u.value?.data || u.value || {}
          // kycStatus convention from pqsFrontend: 0 unverified, 1 pending, 2 verified, 3 rejected.
          // Show a badge only when the user needs to take action.
          const status = data?.kycStatus ?? data?.profile?.details?.[0]?.kycStatus
          if (status === undefined || status === null) next.kyc = null
          else if (status === 2) next.kyc = null         // verified — no badge
          else if (status === 1) next.kyc = 'pending'
          else if (status === 3) next.kyc = 'rejected'
          else                   next.kyc = 'verify'
        }
        setBadges((prev) => ({ ...prev, ...next }))
      })
    }
    load()
    const id = setInterval(load, 60_000)
    return () => { alive = false; clearInterval(id) }
  }, [user?._id])

  return badges
}
