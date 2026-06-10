import {
  LayoutDashboard, Wallet, Coins, FileSignature, ArrowDownToLine,
  FileText, ShieldCheck, MessageSquare, Layers, Receipt,
} from 'lucide-react'

// Grouped sidebar nav. Each group has a small uppercase header.
// `badge` is a key into the badge context (see useDashboardBadges) so values
// can stay live without prop-drilling through DashboardLayout.
export const dashboardNavSections = [
  {
    title: 'Overview',
    items: [
      { to: '/dashboard',               label: 'Dashboard',          icon: LayoutDashboard },
      { to: '/dashboard/notifications', label: 'Messages',           icon: MessageSquare, badge: 'unread' },
      { to: '/dashboard/funds',         label: 'Funds',              icon: Layers },
    ],
  },
  {
    title: 'Account',
    items: [
      { to: '/dashboard/portfolio',     label: 'Portfolio',          icon: Wallet },
      { to: '/dashboard/wallet',        label: 'Wallet',             icon: Coins },
      { to: '/dashboard/subscribe',     label: 'Subscribe',          icon: FileSignature },
      { to: '/dashboard/withdrawals',   label: 'Withdrawals',        icon: ArrowDownToLine },
      { to: '/dashboard/kyc',           label: 'KYC',                icon: ShieldCheck, badge: 'kyc' },
    ],
  },
  {
    title: 'Reports',
    items: [
      { to: '/dashboard/reports',       label: 'Reports',            icon: FileText },
      { to: '/dashboard/statements',    label: 'Statements',         icon: Receipt },
    ],
  },
]

// Flat list kept for any consumer that still wants it (search, breadcrumbs, etc.)
export const dashboardNav = dashboardNavSections.flatMap((s) => s.items)
