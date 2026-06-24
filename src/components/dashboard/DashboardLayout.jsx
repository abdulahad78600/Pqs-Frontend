import { useState } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { LogOut, Settings as SettingsIcon, User, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../auth/AuthContext.jsx'
import { dashboardNavSections } from './nav.js'
import { DashboardBadgesProvider, useDashboardBadges } from './DashboardBadgesContext.jsx'

export default function DashboardLayout() {
  return (
    <DashboardBadgesProvider>
      <DashboardLayoutInner />
    </DashboardBadgesProvider>
  )
}

function DashboardLayoutInner() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { badges } = useDashboardBadges()
  if (!user) return null

  const doLogout = () => { logout(); navigate('/') }

  const sidebarContent = (
    <Sidebar user={user} badges={badges} onNavigate={() => setMobileNavOpen(false)} onLogout={doLogout} />
  )

  return (
    <div className="min-h-[calc(100vh-5rem)]">
      <div className="container-page py-6 md:py-10 grid lg:grid-cols-12 gap-6 lg:gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-28 self-start">
          {sidebarContent}
        </aside>

        {/* Main */}
        <section className="lg:col-span-9 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-5">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden w-10 h-10 rounded-full border border-sand-50/10 grid place-items-center text-sand-50/70 hover:text-gold-200 hover:border-gold-500/40 flex-shrink-0"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>

          <Outlet />
        </section>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-[60] bg-ink-950/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              key={pathname}
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[85%] max-w-sm overflow-y-auto p-5 bg-ink-950/95 backdrop-blur-xl border-r border-sand-50/10 lg:hidden"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="text-[10px] uppercase tracking-widest text-gold-300/80">Dashboard</div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="w-9 h-9 rounded-full border border-sand-50/10 grid place-items-center text-sand-50/70"
                  aria-label="Close menu"
                >
                  <X size={16} />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}


function Sidebar({ user, badges, onNavigate, onLogout }) {
  return (
    <div className="card-glass p-5">
      <UserBlock user={user} />

      <nav className="mt-5 space-y-5">
        {dashboardNavSections.map((section) => (
          <NavSection
            key={section.title}
            title={section.title}
            items={section.items}
            badges={badges}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="mt-5 pt-5 border-t border-sand-50/8 space-y-1">
        <NavLink
          to="/dashboard/settings"
          end
          onClick={onNavigate}
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              isActive
                ? 'bg-sand-50/8 text-sand-50'
                : 'text-sand-50/70 hover:bg-sand-50/5 hover:text-sand-50'
            }`
          }
        >
          <SettingsIcon size={16} /> Settings
        </NavLink>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-rose-300/80 hover:bg-rose-500/10 hover:text-rose-200 transition-colors"
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </div>
  )
}

// =========================== User block ===========================
// Static identity display only — account/session actions live in the
// single top-right user menu (see Navbar.jsx) to avoid a duplicate
// user-select control on the page....
function UserBlock({ user }) {
  const initials = (user.name || user.email || 'U')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

  return (
    <div className="flex items-center gap-3 pb-5 border-b border-sand-50/8">
      <Avatar initials={initials} />
      <div className="min-w-0 flex-1">
        <div className="font-display text-base text-sand-50 truncate">{user.name || 'Investor'}</div>
        <div className="text-xs text-sand-50/55 truncate">{user.email || '—'}</div>
      </div>
    </div>
  )
}

function Avatar({ initials }) {
  return (
    <div className="relative w-10 h-10 rounded-full flex-shrink-0 bg-gradient-to-br from-gold-400/30 via-gold-500/15 to-ink-900 border border-gold-500/30 grid place-items-center text-sm font-display text-gold-200">
      {initials || <User size={16} />}
      <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-ink-950" />
    </div>
  )
}

// =========================== Nav section ===========================
function NavSection({ title, items, badges, onNavigate }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-sand-50/40 px-3 mb-2">
        {title}
      </div>
      <div className="space-y-0.5">
        {items.map((item) => (
          <NavRow key={item.to} item={item} badge={item.badge ? badges[item.badge] : undefined} onClick={onNavigate} />
        ))}
      </div>
    </div>
  )
}

function NavRow({ item, badge, onClick }) {
  return (
    <NavLink
      to={item.to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors group ${
          isActive
            ? 'bg-sand-50/8 text-sand-50 border border-gold-500/20'
            : 'text-sand-50/72 hover:bg-sand-50/5 hover:text-sand-50 border border-transparent'
        }`
      }
    >
      {({ isActive }) => (
        <>
          <item.icon
            size={16}
            className={`flex-shrink-0 ${isActive ? 'text-gold-300' : 'text-sand-50/55 group-hover:text-gold-300/80'}`}
          />
          <span className="truncate flex-1">{item.label}</span>
          <Badge value={badge} active={isActive} />
        </>
      )}
    </NavLink>
  )
}

// =========================== Badge ===========================
function Badge({ value, active }) {
  if (value === undefined || value === null || value === 0 || value === '') return null

  // Status-style string badges (KYC verify / pending / rejected)
  if (typeof value === 'string') {
    const tone = value === 'rejected' ? 'rose'
              : value === 'pending'  ? 'amber'
              : 'gold' // 'verify' or anything else
    const label = value === 'verify' ? 'Verify' : value.charAt(0).toUpperCase() + value.slice(1)
    const cls = {
      gold:  'bg-gold-500/15 text-gold-200 border-gold-500/30',
      amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
      rose:  'bg-rose-500/10 text-rose-300 border-rose-500/30',
    }[tone]
    return (
      <span className={`ml-auto text-[9.5px] uppercase tracking-widest px-1.5 py-0.5 rounded border ${cls}`}>
        {label}
      </span>
    )
  }

  // Numeric badges
  const n = Number(value)
  const display = n > 99 ? '99+' : String(n)
  return (
    <span
      className={`ml-auto min-w-[20px] text-[10px] font-medium px-1.5 py-0.5 rounded-full grid place-items-center border ${
        active
          ? 'bg-gold-500/20 text-gold-100 border-gold-500/40'
          : 'bg-sand-50/6 text-sand-50/65 border-sand-50/10'
      }`}
    >
      {display}
    </span>
  )
}
