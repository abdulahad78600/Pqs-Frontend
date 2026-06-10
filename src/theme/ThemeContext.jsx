import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const THEME_KEY = 'pqs.theme'
const ThemeContext = createContext(null)

const applyTheme = (theme) => {
  const root = document.documentElement
  root.classList.remove('theme-light', 'theme-dark')
  root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark')
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
}

const readStored = () => {
  try {
    const v = localStorage.getItem(THEME_KEY)
    if (v === 'light' || v === 'dark') return v
  } catch {}
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => readStored())

  useEffect(() => { applyTheme(theme) }, [theme])

  const setTheme = useCallback((next) => {
    const t = next === 'light' ? 'light' : 'dark'
    try { localStorage.setItem(THEME_KEY, t) } catch {}
    setThemeState(t)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }, [theme, setTheme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isLight: theme === 'light' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
