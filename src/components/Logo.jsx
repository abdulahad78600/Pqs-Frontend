// PQS brand mark.
//
// Primary source of truth is the supplied PNG artwork in /public:
//   pqs-logo-dark.png  — gold mark + wordmark on a dark/transparent ground
//   pqs-logo-light.png — gold mark + wordmark on a light/cream ground
//   pqs-mark-dark.png  — hex+cube mark only (no wordmark), dark ground   [optional]
//   pqs-mark-light.png — hex+cube mark only (no wordmark), light ground  [optional]
//
// The app chrome (Navbar, Footer, SiteLock) all sit on dark surfaces, so the
// "dark" asset is the default. Pass tone="light" for light-background surfaces,
// and variant="mark" for the symbol-only lockup in tight spaces.
//
// If the PNG ever fails to load, we fall back to the inline SVG recreation
// (hex outline + isometric cube, plus the "PQS" wordmark for the full lockup)
// so the brand never renders blank.
import { useState } from 'react'

const LOGO_SRC = {
  default: { dark: '/pqs-logo-dark.png', light: '/pqs-logo-light.png' },
  mark:    { dark: '/pqs-mark-dark.png', light: '/pqs-mark-light.png' },
}

export default function Logo({ variant = 'default', tone = 'dark', className = '' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const showWordmark = variant !== 'mark'
  const sources = LOGO_SRC[variant] || LOGO_SRC.default

  // Use the supplied PNG artwork unless it fails to load.
  if (!imgFailed) {
    return (
      <img
        src={sources[tone] || sources.dark}
        alt="PQS"
        // Match the previous mark height (~44px); wordmark variant is wider.
        className={`flex-shrink-0 w-auto ${variant === 'mark' ? 'h-11' : 'h-10'} ${className}`}
        onError={() => setImgFailed(true)}
      />
    )
  }

  // ── Fallback: inline SVG recreation ──
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <HexCubeMark />
      {showWordmark && (
        <span
          className="font-display font-semibold text-sand-50 leading-none"
          style={{
            fontSize: '30px',
            letterSpacing: '-0.02em',
          }}
        >
          P<span className="gold-text">Q</span>S
        </span>
      )}
    </div>
  )
}

function HexCubeMark({ size = 44 }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className="flex-shrink-0"
      aria-label="PQS"
    >
      <defs>
        {/* Hexagon outline — light → mid → deep gold */}
        <linearGradient id="pqs-hex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#f1e8c9" />
          <stop offset="55%"  stopColor="#d8bb6a" />
          <stop offset="100%" stopColor="#9a6f29" />
        </linearGradient>

        {/* Cube top — brightest face */}
        <linearGradient id="pqs-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#f7f4ee" />
          <stop offset="100%" stopColor="#e6d49a" />
        </linearGradient>
        {/* Cube left — deep shadow face */}
        <linearGradient id="pqs-left" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#7a5621" />
          <stop offset="100%" stopColor="#412c12" />
        </linearGradient>
        {/* Cube right — mid-tone face */}
        <linearGradient id="pqs-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#d8bb6a" />
          <stop offset="100%" stopColor="#9a6f29" />
        </linearGradient>
      </defs>

      {/* Hexagon outline (flat-top), thick rounded stroke matching the source */}
      <path
        d="M40 7 L67 22 L67 58 L40 73 L13 58 L13 22 Z"
        fill="none"
        stroke="url(#pqs-hex)"
        strokeWidth="3.4"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Isometric cube — three diamond faces meeting at center */}
      <path d="M40 25 L54 32 L40 39 L26 32 Z" fill="url(#pqs-top)" />
      <path d="M26 32 L40 39 L40 55 L26 48 Z" fill="url(#pqs-left)" />
      <path d="M54 32 L54 48 L40 55 L40 39 Z" fill="url(#pqs-right)" />

      {/* Subtle separator at the Y-junction so geometry reads clearly */}
      <path
        d="M26 32 L40 39 L54 32 M40 39 L40 55"
        fill="none"
        stroke="#0a0c10"
        strokeOpacity="0.35"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}
