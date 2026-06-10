export const fmtMoney = (n, currency = 'USD', maxFrac = 2) => {
  if (n === null || n === undefined || isNaN(n)) return '—'
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: maxFrac,
    }).format(Number(n))
  } catch {
    return `${currency} ${Number(n).toFixed(maxFrac)}`
  }
}

export const fmtNumber = (n, maxFrac = 2) => {
  if (n === null || n === undefined || isNaN(n)) return '—'
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: maxFrac }).format(Number(n))
}

export const fmtDate = (d) => {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date)) return '—'
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const fmtDateTime = (d) => {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date)) return '—'
  return `${date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}, ${date.toLocaleTimeString('en-GB')}`
}

export const fmtRelative = (d) => {
  if (!d) return '—'
  const ms = Date.now() - new Date(d).getTime()
  const min = Math.round(ms / 60000)
  if (min < 1) return 'just now'
  if (min < 60) return `${min} min ago`
  const h = Math.round(min / 60)
  if (h < 24) return `${h} hour${h > 1 ? 's' : ''} ago`
  const days = Math.round(h / 24)
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
  return fmtDate(d)
}

export const txStatusLabel = (status) =>
  status === 0 ? 'Pending' : status === 1 ? 'Completed' : 'Failed'

export const txStatusTone = (status) =>
  status === 0 ? 'amber' : status === 1 ? 'emerald' : 'rose'
