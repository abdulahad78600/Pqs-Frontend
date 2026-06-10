// Frontend-only TOTP (RFC 6238) using `otpauth`.
//
// Trade-off: the secret lives in localStorage, scoped per user. An attacker
// who steals localStorage gets both password and TOTP secret, so this is not
// equivalent to a server-side 2FA enrollment — it's an additional speed bump
// on top of the existing email OTP. Document this clearly to users.
import * as OTPAuth from 'otpauth'

const ISSUER = 'PQS Fund'
const STORAGE_PREFIX = 'pqs.totp:'  // pqs.totp:<userId> -> { secret, enabledAt }

const userKey = (userId) => `${STORAGE_PREFIX}${userId}`

// Generate a fresh base32 secret + the TOTP instance for QR rendering.
export function generateTotp(label) {
  const secret = new OTPAuth.Secret({ size: 20 }) // 160-bit, base32-encoded
  const totp = new OTPAuth.TOTP({
    issuer: ISSUER,
    label: label || 'account',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret,
  })
  return { secret: secret.base32, otpauthUrl: totp.toString() }
}

// Verify a 6-digit code against a stored base32 secret. Window of ±1 step
// (90s total tolerance) handles minor clock drift between phone and laptop.
export function verifyTotp(secretBase32, token) {
  if (!secretBase32 || !token) return false
  try {
    const totp = new OTPAuth.TOTP({
      issuer: ISSUER,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: OTPAuth.Secret.fromBase32(secretBase32),
    })
    const delta = totp.validate({ token: String(token).replace(/\s/g, ''), window: 1 })
    return delta !== null
  } catch {
    return false
  }
}

// Storage helpers, scoped per user so multiple accounts on the same browser
// don't share a secret.
export function getStoredTotp(userId) {
  if (!userId) return null
  try { return JSON.parse(localStorage.getItem(userKey(userId)) || 'null') } catch { return null }
}

export function saveTotp(userId, secret) {
  if (!userId || !secret) return
  localStorage.setItem(userKey(userId), JSON.stringify({ secret, enabledAt: Date.now() }))
}

export function removeTotp(userId) {
  if (!userId) return
  localStorage.removeItem(userKey(userId))
}

export function isTotpEnabled(userId) {
  return Boolean(getStoredTotp(userId)?.secret)
}
