/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace']
      },
      colors: {
        ink: {
          950: '#0a0c10',
          900: '#0f1218',
          800: '#161a23',
          700: '#1f2430',
          600: '#2a3142'
        },
        gold: {
          50:  '#faf6ec',
          100: '#f1e8c9',
          200: '#e6d49a',
          300: '#d8bb6a',
          400: '#c9a14a',
          500: '#b88a35',
          600: '#9a6f29',
          700: '#7a5621',
          800: '#5d401a',
          900: '#412c12'
        },
        sand: {
          50:  '#f7f4ee',
          100: '#ece6d8',
          200: '#d8ccae',
          300: '#beac80',
          400: '#a48c5b'
        }
      },
      backgroundImage: {
        'grid-fade': 'radial-gradient(circle at 50% 0%, rgba(201,161,74,0.18), transparent 60%)',
        'noise': "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.55 0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")"
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        floaty: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        pulseGlow: {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,161,74,0.45)' },
          '50%': { boxShadow: '0 0 32px 4px rgba(201,161,74,0.25)' }
        }
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        floaty: 'floaty 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
}
