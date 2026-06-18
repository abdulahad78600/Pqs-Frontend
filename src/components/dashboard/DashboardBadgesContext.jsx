import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { fetchNotifications, fetchUserData } from '../../utils/api.js'
import { useAuth } from '../../auth/AuthContext.jsx'

// Shared badge state for the dashboard sidebar (unread messages, KYC status).
// Lives in context so any dashboard page (e.g. Notifications marking all
// read) can update the count immediately instead of waiting on the poll.
const DashboardBadgesContext = createContext(null)

export function DashboardBadgesProvider({ children }) {
  const { user } = useAuth()
  const [badges, setBadges] = useState({ unread: 0, kyc: null })

  const refetch = useCallback(() => {
    if (!user?._id) return
    return Promise.allSettled([
      fetchNotifications(),
      fetchUserData(user._id),
    ]).then(([n, u]) => {
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
  }, [user?._id])

  useEffect(() => {
    if (!user?._id) return
    refetch()
    const id = setInterval(refetch, 60_000)
    return () => clearInterval(id)
  }, [user?._id, refetch])

  const markAllRead = useCallback(() => setBadges((prev) => ({ ...prev, unread: 0 })), [])

  return (
    <DashboardBadgesContext.Provider value={{ badges, refetch, markAllRead }}>
      {children}
    </DashboardBadgesContext.Provider>
  )
}

export function useDashboardBadges() {
  const ctx = useContext(DashboardBadgesContext)
  if (!ctx) throw new Error('useDashboardBadges must be used within DashboardBadgesProvider')
  return ctx
}
