import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  LogOut, Settings as SettingsIcon, User, Bell, Menu, X, Sun, Moon,
  ChevronDown, UserCircle, KeyRound,
} from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../../auth/AuthContext.jsx'
import { useTheme } from '../../theme/ThemeContext.jsx'
import { dashboardNavSections } from './nav.js'
import { useDashboardBadges } from './useDashboardBadges.js'

export default function DashboardLayout() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const badges = useDashboardBadges()
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
            <div className="ml-auto flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                className="w-10 h-10 rounded-full border border-sand-50/10 grid place-items-center text-sand-50/70 hover:text-gold-200 hover:border-gold-500/40"
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>
              <Link to="/dashboard/notifications" className="w-10 h-10 rounded-full border border-sand-50/10 grid place-items-center text-sand-50/70 hover:text-gold-200 hover:border-gold-500/40 relative">
                <Bell size={16} />
                {badges.unread > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold-500 text-ink-950 text-[10px] font-medium grid place-items-center border-2 border-ink-950">
                    {badges.unread > 99 ? '99+' : badges.unread}
                  </span>
                )}
              </Link>
              <Link to="/" className="hidden sm:inline-flex btn-ghost text-xs py-2">View site</Link>
            </div>
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

// =========================== Sidebar ===========================
function Sidebar({ user, badges, onNavigate, onLogout }) {
  return (
    <div className="card-glass p-5">
      <UserBlock user={user} onSignOut={onLogout} />

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

// =========================== User block + dropdown ===========================
function UserBlock({ user, onSignOut }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e) => { if (!ref.current?.contains(e.target)) setOpen(false) }
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const initials = (user.name || user.email || 'U')
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join('')

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 pb-5 border-b border-sand-50/8 text-left group"
      >
        <Avatar initials={initials} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-sand-50 truncate">
            <span className="font-display text-base truncate">{user.name || 'Investor'}</span>
            <ChevronDown
              size={14}
              className={`text-sand-50/55 flex-shrink-0 transition-transform group-hover:text-gold-300 ${open ? 'rotate-180' : ''}`}
            />
          </div>
          <div className="text-xs text-sand-50/55 truncate">{user.email || '—'}</div>
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 left-0 right-0 top-[68px] card-glass overflow-hidden py-1"
          >
            <UserMenuItem to="/dashboard/settings" icon={UserCircle} label="Profile & preferences" onClick={() => setOpen(false)} />
            <UserMenuItem to="/dashboard/settings"      icon={KeyRound}    label="Security" onClick={() => setOpen(false)} />
            <UserMenuItem to="/dashboard/notifications" icon={Bell}        label="Notifications" onClick={() => setOpen(false)} />
            <div className="border-t border-sand-50/8 my-1" />
            <button
              onClick={() => { setOpen(false); onSignOut() }}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-300/85 hover:bg-rose-500/10 hover:text-rose-200"
            >
              <LogOut size={14} /> Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
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

function UserMenuItem({ to, icon: Icon, label, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 text-sm text-sand-50/85 hover:bg-gold-500/10 hover:text-sand-50"
    >
      <Icon size={14} className="text-gold-300/80" />
      {label}
    </Link>
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
