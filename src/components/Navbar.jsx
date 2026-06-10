import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, User, Sun, Moon, LogIn, UserPlus, BookOpen, Info, Target, Users, Crown, Layers, Presentation, ExternalLink } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo.jsx'
import { funds } from '../data/funds.js'
import { useAuth } from '../auth/AuthContext.jsx'
import { useTheme } from '../theme/ThemeContext.jsx'
import { ROLE_DEFINITIONS } from '../auth/roles.js'

const publicLinks = []

// External presentation surfaced in the Funds dropdown (logged-in users only,
// since the whole nav renders only when a user is present).
const TRUST_WEALTH_PRESENTATION_URL = 'https://effortless-parfait-82fe4c.netlify.app/'

const companyItems = [
  { to: '/about',      label: 'About Us',   desc: 'Who we are and what we stand for',     icon: Info },
  { to: '/mission',    label: 'Mission',    desc: 'Our purpose and guiding principles',   icon: Target },
  { to: '/leadership', label: 'Leadership', desc: 'Senior Executive Team',                icon: Crown },
  { to: '/team',       label: 'Team',       desc: 'Compliance & Support specialists',     icon: Users }
]

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Company', kind: 'company' },
  { to: '/funds', label: 'Funds', kind: 'funds' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [fundsOpen, setFundsOpen] = useState(false)
  const [companyOpen, setCompanyOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const role = user ? ROLE_DEFINITIONS[user.role] : null

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false); setFundsOpen(false); setCompanyOpen(false); setUserOpen(false) }, [pathname])

  const doLogout = () => { logout(); navigate('/') }

  return (
    <header
      className={`fixed top-4 inset-x-0 z-50 px-3 md:px-5 transition-all duration-300 ${
        scrolled ? 'drop-shadow-[0_18px_45px_rgba(0,0,0,0.28)]' : 'drop-shadow-[0_12px_32px_rgba(0,0,0,0.18)]'
      }`}
    >
      <div
        className={`container-page flex items-center justify-between h-20 rounded-[28px] border transition-all duration-300 shadow-2xl shadow-black/50 ${
          scrolled
            ? 'border-sand-50/12 bg-ink-950 backdrop-blur-2xl'
            : 'border-sand-50/10 bg-ink-950/98 backdrop-blur-2xl'
        } px-5 md:px-7`}
      >
        <Link to="/" className="hover:opacity-90 transition-opacity"><Logo /></Link>

        <nav className="hidden lg:flex items-center gap-8">
          {!user && publicLinks.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors ${
                  isActive ? 'text-gold-300' : 'text-sand-50/80 hover:text-gold-200'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {user && links.map((l) => {
            if (l.kind === 'company') {
              return (
                <div key={l.to}
                  className="relative"
                  onMouseEnter={() => setCompanyOpen(true)}
                  onMouseLeave={() => setCompanyOpen(false)}
                >
                  <NavLink to={l.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-sm tracking-wide transition-colors ${
                        isActive ? 'text-gold-300' : 'text-sand-50/80 hover:text-gold-200'
                      }`
                    }
                  >
                    {l.label} <ChevronDown size={14} className={`transition-transform ${companyOpen ? 'rotate-180' : ''}`} />
                  </NavLink>
                  <AnimatePresence>
                    {companyOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[340px]"
                      >
                        <div className="card-glass p-3 shadow-2xl shadow-black/40">
                          <div className="px-3 pt-2 pb-3">
                            <span className="eyebrow">Company</span>
                          </div>
                          <div className="space-y-1">
                            {companyItems.map((c) => {
                              const Icon = c.icon
                              return (
                                <Link key={c.to} to={c.to}
                                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold-500/5 transition-colors"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/20 border border-gold-500/20 flex-shrink-0 grid place-items-center text-gold-300">
                                    <Icon size={16} />
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm text-sand-50 group-hover:text-gold-200 truncate">{c.label}</div>
                                    <div className="text-xs text-sand-50/50 truncate">{c.desc}</div>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            if (l.kind === 'funds') {
              return (
                <div key={l.to}
                  className="relative"
                  onMouseEnter={() => setFundsOpen(true)}
                  onMouseLeave={() => setFundsOpen(false)}
                >
                  <NavLink to={l.to}
                    className={({ isActive }) =>
                      `flex items-center gap-1 text-sm tracking-wide transition-colors ${
                        isActive ? 'text-gold-300' : 'text-sand-50/80 hover:text-gold-200'
                      }`
                    }
                  >
                    {l.label} <ChevronDown size={14} className={`transition-transform ${fundsOpen ? 'rotate-180' : ''}`} />
                  </NavLink>
                  <AnimatePresence>
                    {fundsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[420px]"
                      >
                        <div className="card-glass p-3 shadow-2xl shadow-black/40">
                          <div className="px-3 pt-2 pb-3 flex items-center justify-between">
                            <span className="eyebrow">Active Offerings</span>
                            <Link to="/funds" className="text-xs text-gold-300 hover:text-gold-200">View all →</Link>
                          </div>
                          <div className="space-y-1">
                            <Link to="/fund-overview"
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold-500/5 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/20 border border-gold-500/20 flex-shrink-0 grid place-items-center text-gold-300">
                                <BookOpen size={16} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm text-sand-50 group-hover:text-gold-200 truncate">Fund Overview</div>
                                <div className="text-xs text-sand-50/50 truncate">Platform-wide investor brief</div>
                              </div>
                            </Link>
                            <Link to="/investment-opportunities"
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold-500/5 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/20 border border-gold-500/20 flex-shrink-0 grid place-items-center text-gold-300">
                                <Layers size={16} />
                              </div>
                              <div className="min-w-0">
                                <div className="text-sm text-sand-50 group-hover:text-gold-200 truncate">Investment Opportunities</div>
                                <div className="text-xs text-sand-50/50 truncate">Asset-Backed, Assisted Living & Art-Backed SPs</div>
                              </div>
                            </Link>
                            <a href={TRUST_WEALTH_PRESENTATION_URL} target="_blank" rel="noopener noreferrer"
                              className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold-500/5 transition-colors"
                            >
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/20 border border-gold-500/20 flex-shrink-0 grid place-items-center text-gold-300">
                                <Presentation size={16} />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm text-sand-50 group-hover:text-gold-200 truncate flex items-center gap-1.5">
                                  Trust & Wealth Presentation <ExternalLink size={11} className="text-sand-50/40" />
                                </div>
                                <div className="text-xs text-sand-50/50 truncate">Investor presentation — platform & fund strategies</div>
                              </div>
                            </a>
                            <div className="my-1 border-t border-sand-50/8" />
                            {[...funds].reverse().map((f) => (
                              <Link key={f.slug} to={`/funds/${f.slug}`}
                                className="group flex items-start gap-3 p-3 rounded-xl hover:bg-gold-500/5 transition-colors"
                              >
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-400/20 to-gold-700/20 border border-gold-500/20 flex-shrink-0 grid place-items-center">
                                  <span className="font-display text-gold-300 text-base">{f.name.charAt(0)}</span>
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm text-sand-50 group-hover:text-gold-200 truncate">{f.name}</div>
                                  <div className="text-xs text-sand-50/50 truncate">{f.subName || f.category}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }
            return (
              <NavLink key={l.to} to={l.to} end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wide transition-colors ${
                    isActive ? 'text-gold-300' : 'text-sand-50/80 hover:text-gold-200'
                  }`
                }
              >
                {l.label}
              </NavLink>
            )
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            className="w-9 h-9 rounded-full border border-sand-50/10 grid place-items-center text-sand-50/70 hover:text-gold-200 hover:border-gold-500/40 transition-colors"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
          {!user ? (
            <>
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm font-medium px-5 py-2.5 rounded-full border border-gold-500/40 text-gold-200 hover:bg-gold-500/10 hover:border-gold-500/60 transition-colors"
              >
                <LogIn size={15} /> Login
              </Link>
              <Link
                to="/get-started"
                className="btn-primary text-sm py-2.5 px-5"
              >
                <UserPlus size={15} /> Get Started
              </Link>
            </>
          ) : (
            <div
              className="relative"
              onMouseEnter={() => setUserOpen(true)}
              onMouseLeave={() => setUserOpen(false)}
            >
              <button className="flex items-center gap-2.5 px-3 py-2 rounded-full border border-sand-50/10 hover:border-gold-500/40 transition-colors">
                <div className={`w-7 h-7 rounded-full bg-ink-900 border border-sand-50/10 grid place-items-center ${role?.iconColor}`}>
                  {role && <role.icon size={14} />}
                </div>
                <span className="text-sm text-sand-50">{(user.name || user.email || 'Account').split(' ')[0]}</span>
                <ChevronDown size={14} className={`text-sand-50/50 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {userOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full pt-3 w-64"
                  >
                    <div className="card-glass p-2 shadow-2xl shadow-black/40">
                      <div className="px-3 py-3 border-b border-sand-50/8">
                        <div className="text-sm text-sand-50">{user.name}</div>
                        <div className="text-[11px] text-sand-50/55 truncate">{user.email}</div>
                        <div className="mt-1 text-[10px] uppercase tracking-widest text-gold-300/80">{role?.label}</div>
                      </div>
                      <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gold-500/5 text-sm text-sand-50/85">
                        <LayoutDashboard size={14}/> Dashboard
                      </Link>
                      <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sand-50/5 text-sm text-sand-50/85">
                        <User size={14}/> Profile
                      </button>
                      <button onClick={doLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-rose-500/10 text-sm text-rose-300/85">
                        <LogOut size={14}/> Sign out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-sand-50">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="lg:hidden overflow-hidden mt-3 mx-auto max-w-[calc(100%-1.5rem)] rounded-[28px] border border-sand-50/10 bg-ink-950/94 backdrop-blur-2xl shadow-2xl shadow-black/35"
          >
            <div className="container-page py-6 space-y-2">
              {!user && publicLinks.map((l) => (
                <NavLink key={l.to} to={l.to} end={l.to === '/'}
                  className={({ isActive }) =>
                    `block py-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/85'}`
                  }
                >
                  {l.label}
                </NavLink>
              ))}
              {user && links.flatMap((l) => {
                if (l.kind === 'company') {
                  return [
                    <div key="company-label" className="pt-3 pb-1 text-[10px] uppercase tracking-widest text-sand-50/45">Company</div>,
                    ...companyItems.map((c) => (
                      <NavLink key={c.to} to={c.to}
                        className={({ isActive }) =>
                          `block py-3 pl-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/85'}`
                        }
                      >
                        {c.label}
                      </NavLink>
                    ))
                  ]
                }
                if (l.kind === 'funds') {
                  return [
                    <NavLink key={l.to} to={l.to} end={l.to === '/'}
                      className={({ isActive }) =>
                        `block py-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/85'}`
                      }
                    >
                      {l.label}
                    </NavLink>,
                    <NavLink key="/fund-overview" to="/fund-overview"
                      className={({ isActive }) =>
                        `block py-3 pl-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/75'}`
                      }
                    >
                      Fund Overview
                    </NavLink>,
                    <NavLink key="/investment-opportunities" to="/investment-opportunities"
                      className={({ isActive }) =>
                        `block py-3 pl-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/75'}`
                      }
                    >
                      Investment Opportunities
                    </NavLink>,
                    <a key="trust-wealth-presentation" href={TRUST_WEALTH_PRESENTATION_URL} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 py-3 pl-3 text-sm border-b border-sand-50/5 text-sand-50/75"
                    >
                      Trust & Wealth Presentation <ExternalLink size={12} className="text-sand-50/40" />
                    </a>
                  ]
                }
                return [
                  <NavLink key={l.to} to={l.to} end={l.to === '/'}
                    className={({ isActive }) =>
                      `block py-3 text-sm border-b border-sand-50/5 ${isActive ? 'text-gold-300' : 'text-sand-50/85'}`
                    }
                  >
                    {l.label}
                  </NavLink>
                ]
              })}
              <button
                onClick={toggleTheme}
                className="w-full flex items-center justify-between py-3 text-sm text-sand-50/85 border-b border-sand-50/5"
              >
                <span>Appearance</span>
                <span className="flex items-center gap-1.5 text-xs text-gold-300">
                  {theme === 'light' ? <><Moon size={13}/> Light</> : <><Sun size={13}/> Dark</>}
                </span>
              </button>
              {!user ? (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/login" className="btn-primary w-full justify-center">
                    <LogIn size={14}/> Login
                  </Link>
                  <Link
                    to="/get-started"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-gold-500/40 text-gold-200 hover:bg-gold-500/10 transition-colors text-sm font-medium"
                  >
                    <UserPlus size={14}/> Get Started
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2 mt-4">
                  <Link to="/dashboard" className="btn-primary w-full justify-center"><LayoutDashboard size={14}/> Dashboard</Link>
                  <button onClick={doLogout} className="btn-ghost w-full justify-center"><LogOut size={14}/> Sign out</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
