import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Bell, ShieldCheck, Globe, Save, CheckCircle2, AlertCircle, Mail, Phone, KeyRound, LogOut, Loader2, Sun, Moon, Palette, Eye, EyeOff, Check, X, ChevronDown } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuth } from '../../auth/AuthContext.jsx'
import { ROLE_DEFINITIONS } from '../../auth/roles.js'
import { PanelCard } from '../../components/dashboard/widgets.jsx'
import AuthenticatorCard from '../../components/dashboard/AuthenticatorCard.jsx'
import { fetchUserData, updateUserProfile } from '../../utils/api.js'
import { useTheme } from '../../theme/ThemeContext.jsx'

const tabs = [
  { id: 'profile',       label: 'Profile',       icon: User },
  { id: 'security',      label: 'Security',      icon: ShieldCheck },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'preferences',   label: 'Preferences',   icon: Globe }
]

export default function Settings() {
  const { user, updateProfile, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const [tab, setTab] = useState('profile')
  const [saved, setSaved] = useState(false)
  const [saving, setSaving] = useState(false)
  const role = ROLE_DEFINITIONS[user.role]

  const [profile, setProfile] = useState({
    name: user.name || '',
    firstName: '',
    lastName: '',
    email: user.email || '',
    organization: user.organization || '',
    phone: user.meta?.phone || '',
    bio: user.meta?.bio || '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal: '',
    dob: '',
    gender: '',
    designation: '',
    identityType: '',
  })

  // Hydrate from real user profile (auth/get-user-data)
  useEffect(() => {
    if (!user?._id) return
    fetchUserData(user._id)
      .then((data) => {
        if (!data?.success) return
        const d = data.details || {}
        setProfile((s) => ({
          ...s,
          firstName: d.firstName || '',
          lastName: d.lastName || '',
          phone: d.phone || s.phone,
          dob: d.dob || '',
          gender: d.gender || '',
          address: d.address || '',
          city: d.city || '',
          state: d.state || '',
          country: d.country || '',
          postal: d.postal || '',
          designation: d.designation || '',
          identityType: d.identityType || '',
          email: data.email || s.email,
        }))
      })
      .catch(() => {})
  }, [user?._id])

  const [notif, setNotif] = useState({
    productUpdates: true,
    quarterlyLetters: true,
    aiInsights: true,
    smsAlerts: false,
    marketing: false
  })

  const [prefs, setPrefs] = useState({
    timezone: 'America/Toronto',
    currency: 'USD',
    language: 'English (US)'
  })

  const [sessions, setSessions] = useState([
    { id: 1, device: 'Chrome — macOS', loc: 'Toronto, ON', last: 'Active now', current: true },
    { id: 2, device: 'Safari — iPhone', loc: 'Toronto, ON', last: '2h ago' }
  ])

  const revokeSession = (id) => {
    setSessions((list) => list.filter((s) => s.id !== id))
    toast.success('Session revoked.')
  }

  const [passwordForm, setPasswordForm] = useState({ current: '', next: '', confirm: '' })
  const passwordRequirements = getPasswordRequirements(passwordForm.next)
  const passwordsMatch = passwordForm.confirm.length > 0 && passwordForm.next === passwordForm.confirm
  const canUpdatePassword =
    passwordForm.current.length > 0 &&
    passwordRequirements.every((r) => r.met) &&
    passwordsMatch

  const handleUpdatePassword = () => {
    if (!canUpdatePassword) return
    // No "change password while signed in" endpoint exists yet on the backend
    // (only the email reset-link flow). This validates client-side and
    // confirms intent; wire to a real API once that route exists.
    toast.success('Password requirements met. Submission will go live once the change-password API is available.')
    setPasswordForm({ current: '', next: '', confirm: '' })
  }

  const handleSave = async (e) => {
    e?.preventDefault()
    if (!user?._id) return
    setSaving(true)
    try {
      const data = await updateUserProfile(user._id, {
        email: profile.email,
        firstName: profile.firstName || profile.name?.split(' ')[0] || '',
        lastName:  profile.lastName  || profile.name?.split(' ').slice(1).join(' ') || '',
        phone: profile.phone,
        gender: profile.gender,
        postal: profile.postal,
        address: profile.address,
        city: profile.city,
        state: profile.state,
        dob: profile.dob,
        country: profile.country,
        designation: profile.designation,
        identityType: profile.identityType,
      })
      if (data?.success === false) {
        toast.error(data?.message || 'Failed to save profile.')
      } else {
        toast.success('Profile updated.')
        // Keep the AuthContext copy in sync for the navbar display
        updateProfile({
          name: profile.name,
          organization: profile.organization,
          meta: { ...user.meta, phone: profile.phone, bio: profile.bio, prefs, notif },
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 2200)
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message || 'Failed to save profile.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Settings</h2>
        <p className="text-sm text-sand-50/60 mt-1">Manage your profile, security, notifications, and account preferences.</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto pb-1 -mx-2 px-2">
        {tabs.map((t) => {
          const Icon = t.icon
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm whitespace-nowrap transition-all border ${
                tab === t.id
                  ? 'bg-gold-500/15 border-gold-500/40 text-gold-200'
                  : 'border-sand-50/8 text-sand-50/65 hover:text-sand-50 hover:border-sand-50/20'
              }`}
            >
              <Icon size={14} /> {t.label}
            </button>
          )
        })}
      </div>

      {/* Profile */}
      {tab === 'profile' && (
        <motion.form onSubmit={handleSave}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <PanelCard eyebrow="Your account" title="Profile information">
            <div className="flex items-center gap-5 pb-6 mb-6 border-b border-sand-50/8">
              <div className={`w-20 h-20 rounded-full bg-ink-900 border-2 border-gold-500/30 grid place-items-center ${role?.iconColor}`}>
                <role.icon size={32} />
              </div>
              <div>
                <div className="font-display text-xl">{user.name}</div>
                <div className="text-xs uppercase tracking-widest text-gold-300/80 mt-1">{role?.label}</div>
                <div className="text-[11px] text-sand-50/55 mt-0.5">Member since {new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Full name">
                <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </Field>
              <Field label="Email" hint="Used for account access and verification.">
                <input type="email" className="input" value={profile.email} disabled />
              </Field>
              <Field label="Organization">
                <input className="input" value={profile.organization} onChange={(e) => setProfile({ ...profile, organization: e.target.value })} placeholder="Optional" />
              </Field>
              <Field label="Phone" hint="Select your country code, then enter digits only.">
                <PhoneField value={profile.phone} onChange={(phone) => setProfile({ ...profile, phone })} />
              </Field>
              <Field label="Short bio" full>
                <textarea rows={3} className="input resize-none" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} placeholder={`A short description visible to ${role?.label === 'Senior / Family' ? 'facility advisors' : 'fund managers and counterparties'}.`} />
              </Field>
            </div>
          </PanelCard>

          <SaveBar saved={saved} saving={saving} />
        </motion.form>
      )}

      {/* Security */}
      {tab === 'security' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <PanelCard eyebrow="Sign-in" title="Password">
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Current password">
                <PasswordInput value={passwordForm.current} onChange={(v) => setPasswordForm({ ...passwordForm, current: v })} placeholder="••••••••" />
              </Field>
              <Field label="New password">
                <PasswordInput value={passwordForm.next} onChange={(v) => setPasswordForm({ ...passwordForm, next: v })} placeholder="Min 8 chars" />
              </Field>
              <Field label="Confirm new password">
                <PasswordInput value={passwordForm.confirm} onChange={(v) => setPasswordForm({ ...passwordForm, confirm: v })} placeholder="Repeat" />
              </Field>
            </div>

            {passwordForm.next && (
              <ul className="mt-4 grid sm:grid-cols-2 gap-1.5">
                {passwordRequirements.map((r) => (
                  <li key={r.label} className={`flex items-center gap-2 text-xs ${r.met ? 'text-emerald-300' : 'text-sand-50/50'}`}>
                    {r.met ? <Check size={13} /> : <X size={13} />} {r.label}
                  </li>
                ))}
                <li className={`flex items-center gap-2 text-xs ${passwordsMatch ? 'text-emerald-300' : 'text-sand-50/50'}`}>
                  {passwordsMatch ? <Check size={13} /> : <X size={13} />} Passwords match
                </li>
              </ul>
            )}

            <button
              type="button"
              onClick={handleUpdatePassword}
              disabled={!canUpdatePassword}
              className="btn-primary text-xs py-2 mt-5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <KeyRound size={12}/> Update password
            </button>
          </PanelCard>

          <AuthenticatorCard />

          <PanelCard eyebrow="Multi-factor" title="MFA settings">
            <div className="flex items-start gap-4">
              <div className={`w-11 h-11 rounded-xl ${role?.requiresMfa ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-sand-50/8 border-sand-50/15 text-sand-50/55'} border grid place-items-center flex-shrink-0`}>
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1">
                <div className="font-display text-base text-sand-50">
                  {role?.requiresMfa ? 'MFA enabled (required)' : 'MFA optional'}
                </div>
                <p className="text-sm text-sand-50/65 mt-1 leading-relaxed">
                  {role?.requiresMfa
                    ? 'As an Investor / Pharma / Regulator, multi-factor authentication is mandatory. We send a 6-digit code on every sign-in.'
                    : 'You can opt-in to MFA for additional account security.'}
                </p>
                <div className="mt-3 flex gap-2">
                  <button className="btn-ghost text-xs py-2"><Mail size={12}/> Email codes</button>
                  <button className="btn-ghost text-xs py-2"><Phone size={12}/> SMS codes</button>
                </div>
              </div>
            </div>
          </PanelCard>

          <PanelCard eyebrow="Active sessions" title="">
            <div className="space-y-3">
              {sessions.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-sand-50/8">
                  <div className="flex-1">
                    <div className="text-sm text-sand-50">{s.device} {s.current && <span className="ml-2 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">This device</span>}</div>
                    <div className="text-[11px] text-sand-50/55">{s.loc} · {s.last}</div>
                  </div>
                  {!s.current && <button onClick={() => revokeSession(s.id)} className="text-xs text-rose-300 hover:text-rose-200">Revoke</button>}
                </div>
              ))}
            </div>
          </PanelCard>

          <PanelCard eyebrow="Danger zone" title="">
            <div className="flex items-center gap-4">
              <AlertCircle size={20} className="text-rose-300 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm text-sand-50">Sign out everywhere</div>
                <div className="text-[11px] text-sand-50/55">Force a sign-out across all devices and browser sessions.</div>
              </div>
              <button onClick={logout} className="inline-flex items-center gap-1.5 text-xs px-4 py-2 rounded-full border border-rose-500/40 text-rose-300 hover:bg-rose-500/10"><LogOut size={12}/> Sign out</button>
            </div>
          </PanelCard>
        </motion.div>
      )}

      {/* Notifications */}
      {tab === 'notifications' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <PanelCard eyebrow="Notifications" title="What we send and how">
            <div className="space-y-3">
              <Toggle label="Product updates"     description="New features, releases, and scheduled maintenance."    value={notif.productUpdates}     onChange={(v) => setNotif({ ...notif, productUpdates: v })} />
              <Toggle label="Quarterly letters"    description="PDF investor letters and operations memos."             value={notif.quarterlyLetters}    onChange={(v) => setNotif({ ...notif, quarterlyLetters: v })} />
              <Toggle label="AI market insights"   description="Personalized signals based on your portfolio and role."  value={notif.aiInsights}          onChange={(v) => setNotif({ ...notif, aiInsights: v })} />
              <Toggle label="SMS alerts"           description="Time-sensitive — capital calls, distributions, MFA. Message and data rates may apply."     value={notif.smsAlerts}           onChange={(v) => setNotif({ ...notif, smsAlerts: v })} />
              <Toggle label="Marketing"            description="Occasional updates about new offerings."                  value={notif.marketing}           onChange={(v) => setNotif({ ...notif, marketing: v })} />
            </div>
          </PanelCard>
          <SaveBar saved={saved} saving={saving} onClick={handleSave} />
        </motion.div>
      )}

      {/* Preferences */}
      {tab === 'preferences' && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <PanelCard eyebrow="Appearance" title="Theme">
            <p className="text-sm text-sand-50/65 mb-4 leading-relaxed">
              Choose how PQS looks to you. Your selection is saved on this device and applied across the entire site.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <ThemeOption
                active={theme === 'dark'}
                onClick={() => setTheme('dark')}
                icon={Moon}
                label="Dark"
                description="Low-light, cinematic — the original PQS aesthetic."
                preview="dark"
              />
              <ThemeOption
                active={theme === 'light'}
                onClick={() => setTheme('light')}
                icon={Sun}
                label="Light"
                description="Bright, paper-white surfaces with deep ink text."
                preview="light"
              />
            </div>
          </PanelCard>

          <PanelCard eyebrow="Localization" title="">
            <div className="grid md:grid-cols-3 gap-4">
              <Field label="Timezone">
                <Combobox
                  value={prefs.timezone}
                  onChange={(v) => setPrefs({ ...prefs, timezone: v })}
                  options={[
                    { value: 'America/Toronto',  label: 'North America/Toronto' },
                    { value: 'America/New_York',  label: 'North America/New York' },
                    { value: 'Europe/Lisbon',     label: 'Europe/Lisbon' },
                    { value: 'Asia/Dubai',        label: 'Asia/Dubai' },
                  ]}
                />
              </Field>
              <Field label="Currency">
                <Combobox
                  value={prefs.currency}
                  onChange={(v) => setPrefs({ ...prefs, currency: v })}
                  options={['USD', 'CAD', 'EUR', 'AED'].map((c) => ({ value: c, label: c }))}
                />
              </Field>
              <Field label="Language">
                <Combobox
                  value={prefs.language}
                  onChange={(v) => setPrefs({ ...prefs, language: v })}
                  options={['English (US)', 'English (UK)', 'Português', 'العربية'].map((l) => ({ value: l, label: l }))}
                />
              </Field>
            </div>
          </PanelCard>
          <SaveBar saved={saved} saving={saving} onClick={handleSave} />
        </motion.div>
      )}

      <style>{`
        .input { width: 100%; background: #0f1218; border: 1px solid rgba(247,244,238,0.08); border-radius: 12px; padding: 12px 14px; color: #f7f4ee; font-size: 14px; }
        .input:focus { outline: none; border-color: rgba(216,187,106,0.5); box-shadow: 0 0 0 3px rgba(216,187,106,0.08); }
        .input::placeholder { color: rgba(247,244,238,0.35); }
        .input:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>
    </div>
  )
}

function getPasswordRequirements(password) {
  return [
    { label: 'At least 8 characters', met: password.length >= 8 },
    { label: 'One uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'One lowercase letter', met: /[a-z]/.test(password) },
    { label: 'One number', met: /\d/.test(password) },
    { label: 'One special character', met: /[^A-Za-z0-9]/.test(password) },
  ]
}

function PasswordInput({ value, onChange, placeholder }) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        className="input pr-10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-sand-50/45 hover:text-sand-50/80 cursor-pointer"
      >
        {visible ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>
    </div>
  )
}

// Dial codes covering PQS's primary investor jurisdictions plus common
// international ones. Value is the E.164 calling code (kept distinct from
// "preferences > localization" which sets the display timezone, not phone country).
const DIAL_CODES = [
  { code: '+1',   label: 'North America (+1)' },
  { code: '+44',  label: 'United Kingdom (+44)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+65',  label: 'Singapore (+65)' },
  { code: '+91',  label: 'India (+91)' },
  { code: '+351', label: 'Portugal (+351)' },
  { code: '+1242', label: 'Bahamas (+1242)' },
  { code: '+1345', label: 'Cayman Islands (+1345)' },
]

function splitPhone(phone) {
  const match = DIAL_CODES
    .slice()
    .sort((a, b) => b.code.length - a.code.length)
    .find((d) => phone.startsWith(d.code))
  if (match) return { dial: match.code, number: phone.slice(match.code.length).trim() }
  return { dial: DIAL_CODES[0].code, number: phone.replace(/^\+/, '') }
}

// Generic dropdown that always opens below its trigger and never overlaps
// it — replaces native <select> so we control positioning and hover state
// consistently everywhere it's used (phone dial code, timezone, currency, language).
// The menu is portaled to <body> because PanelCard uses overflow-hidden for
// its decorative glow, which would otherwise clip an absolutely-positioned menu.
function Combobox({ value, onChange, options }) {
  const [open, setOpen] = useState(false)
  const [rect, setRect] = useState(null)
  const triggerRef = useRef(null)
  const menuRef = useRef(null)
  const current = options.find((o) => o.value === value)

  useEffect(() => {
    if (!open) return
    const updateRect = () => {
      const r = triggerRef.current?.getBoundingClientRect()
      if (r) setRect(r)
    }
    updateRect()
    const onClick = (e) => {
      if (!triggerRef.current?.contains(e.target) && !menuRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    window.addEventListener('scroll', updateRect, true)
    window.addEventListener('resize', updateRect)
    return () => {
      document.removeEventListener('mousedown', onClick)
      window.removeEventListener('scroll', updateRect, true)
      window.removeEventListener('resize', updateRect)
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen((v) => !v)}
        className="input w-full flex items-center justify-between cursor-pointer"
      >
        <span className="truncate">{current?.label ?? value}</span>
        <ChevronDown size={14} className={`text-sand-50/50 flex-shrink-0 ml-2 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && rect && createPortal(
        <AnimatePresence>
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{ position: 'fixed', top: rect.bottom + 4, left: rect.left, width: rect.width, zIndex: 100 }}
            className="max-h-56 overflow-y-auto card-glass py-1"
          >
            {options.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false) }}
                className={`w-full text-left px-3 py-2 text-sm cursor-pointer hover:bg-gold-500/10 ${o.value === value ? 'text-gold-200' : 'text-sand-50/85'}`}
              >
                {o.label}
              </button>
            ))}
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}

function PhoneField({ value, onChange }) {
  const { dial, number } = splitPhone(value || '')
  const numberRef = useRef(null)

  // Always keep the dial code, even before any digits are typed — otherwise
  // picking a code with an empty number field silently resets to the default.
  // Changing the code later never touches the digits already typed.
  const update = (nextDial, nextNumber) => {
    const digits = nextNumber.replace(/\D/g, '')
    onChange(`${nextDial} ${digits}`.trim())
  }

  return (
    <div className="flex gap-2">
      <div className="w-[7.5rem] flex-shrink-0">
        <Combobox
          value={dial}
          onChange={(nextDial) => { update(nextDial, number); numberRef.current?.focus() }}
          options={DIAL_CODES.map((d) => ({ value: d.code, label: d.code }))}
        />
      </div>
      <input
        ref={numberRef}
        type="tel"
        inputMode="numeric"
        className="input flex-1"
        value={number}
        onChange={(e) => update(dial, e.target.value.replace(/\D/g, ''))}
        placeholder="555 000 0000"
      />
    </div>
  )
}

function Field({ label, hint, children, full }) {
  return (
    <label className={`block ${full ? 'md:col-span-2' : ''}`}>
      <span className="text-[11px] uppercase tracking-widest text-sand-50/55 mb-1.5 inline-block">{label}</span>
      {children}
      {hint && <span className="text-[11px] text-sand-50/45 mt-1 inline-block">{hint}</span>}
    </label>
  )
}

function Toggle({ label, description, value, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      className="w-full flex items-center gap-4 p-4 rounded-xl border border-sand-50/8 hover:border-sand-50/15 text-left transition-colors"
    >
      <div className="flex-1">
        <div className="text-sm text-sand-50">{label}</div>
        <div className="text-[11px] text-sand-50/55 mt-0.5">{description}</div>
      </div>
      <div className={`w-11 h-6 rounded-full p-0.5 transition-colors flex-shrink-0 ${value ? 'bg-gradient-to-r from-gold-400 to-gold-600' : 'bg-sand-50/15'}`}>
        <div className={`w-5 h-5 rounded-full bg-ink-950 shadow-md transition-transform ${value ? 'translate-x-5' : ''}`} />
      </div>
    </button>
  )
}

function ThemeOption({ active, onClick, icon: Icon, label, description, preview }) {
  const isDark = preview === 'dark'
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative text-left p-4 rounded-xl border transition-all overflow-hidden ${
        active
          ? 'bg-gold-500/10 border-gold-500/40'
          : 'border-sand-50/8 hover:border-sand-50/20'
      }`}
    >
      {/* Preview swatch */}
      <div
        className="h-20 rounded-lg mb-3 relative overflow-hidden border"
        style={
          isDark
            ? {
                background:
                  'radial-gradient(120% 80% at 80% -10%, rgba(201,161,74,0.28), transparent 60%), #0f1218',
                borderColor: 'rgba(247,244,238,0.1)',
              }
            : {
                background:
                  'radial-gradient(120% 80% at 80% -10%, rgba(201,161,74,0.28), transparent 60%), #ffffff',
                borderColor: 'rgba(40,40,40,0.1)',
              }
        }
      >
        <div
          className="absolute left-3 top-3 h-2 w-16 rounded-full"
          style={{
            background: isDark
              ? 'linear-gradient(90deg, #f1e8c9, #9a6f29)'
              : 'linear-gradient(90deg, #9a6f29, #5d401a)',
          }}
        />
        <div
          className="absolute left-3 top-7 h-1.5 w-24 rounded-full"
          style={{ background: isDark ? 'rgba(247,244,238,0.35)' : 'rgba(26,29,36,0.35)' }}
        />
        <div
          className="absolute left-3 top-11 h-1.5 w-20 rounded-full"
          style={{ background: isDark ? 'rgba(247,244,238,0.18)' : 'rgba(26,29,36,0.18)' }}
        />
        <div
          className="absolute right-3 bottom-3 h-6 w-14 rounded-full grid place-items-center"
          style={{
            background: 'linear-gradient(90deg, #d8bb6a, #9a6f29)',
            color: '#0a0c10',
            fontSize: 9,
            fontWeight: 600,
          }}
        >
          AaBb
        </div>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon size={16} className={active ? 'text-gold-300' : 'text-sand-50/70'} />
          <div className="text-sm text-sand-50">{label}</div>
        </div>
        {active && (
          <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-200">
            Active
          </span>
        )}
      </div>
      <div className="text-[11px] text-sand-50/55 mt-1">{description}</div>
    </button>
  )
}

function SaveBar({ saved, saving, onClick }) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-xl card-glass sticky bottom-4">
      <div className={`text-sm transition-all ${saved ? 'text-emerald-300' : 'text-sand-50/55'}`}>
        {saved ? <><CheckCircle2 size={14} className="inline -mt-0.5"/> Saved</> : saving ? 'Saving…' : 'Unsaved changes'}
      </div>
      <button type={onClick ? 'button' : 'submit'} onClick={onClick} disabled={saving} className="btn-primary text-sm disabled:opacity-50">
        {saving ? <><Loader2 size={14} className="animate-spin"/> Saving…</> : <><Save size={14} /> Save changes</>}
      </button>
    </div>
  )
}
