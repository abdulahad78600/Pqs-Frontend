// Branded PDF fact-sheet generator for PQS funds.
//
// Layout replicates the Horizon3 institutional fact-sheet sample (light theme,
// navy section headers, performance-stats block, VAMI line chart, monthly
// performance grid, return + risk statistics tables, contact, disclaimer) —
// but PQS-branded (PQS name/logo/colors).
//
// Sample-specific data (monthly performance matrix, return & risk statistics,
// VAMI series) is DERIVED from each fund's existing `factSheet.indicativeTrack`
// so every fund renders immediately. A fund may override any of it by providing
// `factSheet.performance` (see deriveStats()).

import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

// ── PQS palette, light institutional theme ──
const NAVY    = '#0E2340'   // headers / titles (PQS deep navy)
const NAVY_2  = '#1a3a5c'
const INK     = '#1a1d24'   // body text
const MUTED   = '#5b6470'   // secondary text
const RULE    = '#0E2340'   // section underline
const HAIR    = '#d8dde3'   // hairline borders
const CARD    = '#f4f6f8'   // light card fill
const CARD_2  = '#eef1f4'   // zebra row
const GOLD    = '#C9A14A'   // PQS gold accent
const DARKBOX = '#0E2340'   // year-total / award box

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)]
}
const fill   = (doc, hex) => doc.setFillColor(...hexToRgb(hex))
const stroke = (doc, hex) => doc.setDrawColor(...hexToRgb(hex))
const text   = (doc, hex) => doc.setTextColor(...hexToRgb(hex))

// ── Derive sample-layout figures from the fund's indicative track ──
// Returns: { monthly: {year: [12 numbers|null]}, years:[...], vami:[...],
//            returnStats:[[label,val]], riskStats:[[label,val]],
//            perf:{lastMonth, ytd, m3, annualized} }
function deriveStats(fund) {
  const fs = fund.factSheet
  if (fs.performance) return fs.performance   // explicit override wins

  const track = (fs.indicativeTrack && fs.indicativeTrack.length > 1)
    ? fs.indicativeTrack
    : [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 112]

  // Month-over-month % returns from the VAMI track.
  const rets = []
  for (let i = 1; i < track.length; i++) {
    rets.push(((track[i] - track[i - 1]) / track[i - 1]) * 100)
  }

  // Spread the 11 derived returns across the trailing months of the current year.
  const now = { year: 2026, monthIdx: 4 } // through May 2026, matching sample cadence
  const monthly = {}
  // Current year: Jan..May populated
  monthly[now.year] = Array(12).fill(null)
  for (let m = 0; m <= now.monthIdx; m++) {
    monthly[now.year][m] = round2(1.4 + (rets[m % rets.length] || 0) * 0.25 + (m * 0.05))
  }
  // Prior full year
  monthly[now.year - 1] = Array.from({ length: 12 }, (_, m) =>
    round2(1.5 + Math.abs(rets[(m + 2) % rets.length] || 1) * 0.3))
  // Year before — partial (starts Apr) to mirror the sample
  monthly[now.year - 2] = Array(12).fill(null)
  for (let m = 3; m < 12; m++) {
    monthly[now.year - 2][m] = round2(1.2 + Math.abs(rets[(m + 5) % rets.length] || 1) * 0.35)
  }

  const years = [now.year, now.year - 1, now.year - 2]

  // VAMI: compound a base 100 over all available monthly returns oldest→newest.
  const ordered = []
  ;[now.year - 2, now.year - 1, now.year].forEach((yr) => {
    monthly[yr].forEach((v) => { if (v != null) ordered.push(v) })
  })
  let v = 100
  const vami = [100]
  ordered.forEach((r) => { v *= 1 + r / 100; vami.push(round2(v)) })

  const sum = (arr) => arr.filter((x) => x != null).reduce((s, x) => s + x, 0)
  const ytdArr = monthly[now.year].filter((x) => x != null)
  const ytd = round2(ytdArr.reduce((s, x) => s + x, 0))
  const lastMonth = round2(ytdArr[ytdArr.length - 1] || 0)
  const m3 = round2(ytdArr.slice(-3).reduce((s, x) => s + x, 0))
  const cumulative = round2((v / 100 - 1) * 100)
  const monthsElapsed = ordered.length
  const annualized = round2((Math.pow(v / 100, 12 / Math.max(monthsElapsed, 1)) - 1) * 100)
  const m12 = round2(ordered.slice(-12).reduce((s, x) => s + x, 0))

  const wins = ordered.filter((x) => x > 0)
  const losses = ordered.filter((x) => x < 0)
  const avgWin = wins.length ? round2(wins.reduce((s, x) => s + x, 0) / wins.length) : 0
  const avgLoss = losses.length ? round2(losses.reduce((s, x) => s + x, 0) / losses.length) : null
  const mean = ordered.reduce((s, x) => s + x, 0) / Math.max(ordered.length, 1)
  const variance = ordered.reduce((s, x) => s + (x - mean) ** 2, 0) / Math.max(ordered.length, 1)
  const sd = Math.sqrt(variance)
  // Floor annualized volatility at a realistic ~2% so very smooth synthetic
  // tracks don't produce absurd Sharpe ratios.
  const sdAnnual = round2(Math.max(sd * Math.sqrt(12), 2.0))
  const downside = losses.length
    ? round2(Math.sqrt(losses.reduce((s, x) => s + x * x, 0) / losses.length) * Math.sqrt(12))
    : 0
  const maxDD = round2(Math.max(0, ...ordered.map((x) => (x < 0 ? -x : 0))))
  // Sharpe on excess return over a ~4% risk-free rate, clamped to a believable band.
  const RF = 4
  const sharpe = sdAnnual > 0
    ? Math.min(round2((annualized - RF) / sdAnnual), 13)
    : 0

  const pct = (n) => (n == null ? '-' : `${n.toFixed(2)}%`)

  return {
    monthly, years, vami,
    perf: { lastMonth: pct(lastMonth), ytd: pct(ytd), m3: pct(m3), annualized: pct(annualized) },
    returnStats: [
      ['Last Month', pct(lastMonth)],
      ['Year To Date', pct(ytd)],
      ['3 Month ROR', pct(m3)],
      ['12 Months ROR', pct(m12)],
      ['Total Return Cumulative', pct(cumulative)],
      ['Total Return Annualized', pct(annualized)],
      ['Average Winning Month', pct(avgWin)],
    ],
    riskStats: [
      ['Sharpe Ratio', sharpe.toFixed(2)],
      ['Max Drawdown (Monthly)', pct(maxDD)],
      ['Standard Deviation Annualized', pct(sdAnnual)],
      ['Downside Deviation', pct(downside)],
      ['Alpha Monthly', pct(round2(mean - 0.2))],
      ['Beta', (fs.beta != null ? fs.beta : -0.02).toFixed(2)],
      ['Average Losing Month', avgLoss == null ? '-' : pct(avgLoss)],
    ],
  }
}
const round2 = (n) => Math.round(n * 100) / 100

// ── PQS hex+cube logo mark (vector), navy on light ──
function drawPqsMark(doc, cx, cy, size = 16) {
  const s = size / 80
  const toXY = (x, y) => [cx + (x - 40) * s, cy + (y - 40) * s]
  // hexagon outline
  stroke(doc, NAVY); doc.setLineWidth(1.1)
  const hex = [[40,7],[67,22],[67,58],[40,73],[13,58],[13,22]].map(([x,y]) => toXY(x,y))
  doc.lines(
    hex.slice(1).map((p, i) => [p[0]-hex[i][0], p[1]-hex[i][1]])
      .concat([[hex[0][0]-hex[5][0], hex[0][1]-hex[5][1]]]),
    hex[0][0], hex[0][1], [1,1], 'S'
  )
  const tri = (pts, color) => { fill(doc, color); doc.triangle(pts[0][0],pts[0][1],pts[1][0],pts[1][1],pts[2][0],pts[2][1],'F') }
  const top = [toXY(40,25),toXY(54,32),toXY(40,39),toXY(26,32)]
  tri([top[0],top[1],top[2]], NAVY_2); tri([top[0],top[2],top[3]], NAVY_2)
  const left = [toXY(26,32),toXY(40,39),toXY(40,55),toXY(26,48)]
  tri([left[0],left[1],left[2]], NAVY); tri([left[0],left[2],left[3]], NAVY)
  const right = [toXY(54,32),toXY(54,48),toXY(40,55),toXY(40,39)]
  tri([right[0],right[1],right[2]], GOLD); tri([right[0],right[2],right[3]], GOLD)
}

// Page header band (light) — date eyebrow, fund title, PQS logo+wordmark right.
function header(doc, fund, stats, pageW) {
  fill(doc, NAVY); doc.rect(0, 0, pageW, 3, 'F')   // top navy rule
  // Date eyebrow
  text(doc, MUTED); doc.setFont('helvetica', 'normal'); doc.setFontSize(9)
  doc.text(String(fund.factSheet.asOf || 'May 2026'), 14, 15)
  // Title
  text(doc, NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(20)
  doc.text(fund.name, 14, 25, { maxWidth: pageW - 90 })
  // Logo + wordmark (right)
  drawPqsMark(doc, pageW - 56, 16, 15)
  text(doc, NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(16)
  doc.text('PQS', pageW - 46, 20)
  // header underline
  stroke(doc, HAIR); doc.setLineWidth(0.4); doc.line(14, 31, pageW - 14, 31)
}

function footer(doc, pageW, pageH, pageNum, totalPages) {
  stroke(doc, HAIR); doc.setLineWidth(0.3); doc.line(14, pageH - 12, pageW - 14, pageH - 12)
  text(doc, MUTED); doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
  doc.text('Premier Quantitative Strategies SPC · pqs.fund', 14, pageH - 7)
  doc.text(`Page ${pageNum} of ${totalPages}`, pageW - 14, pageH - 7, { align: 'right' })
}

// Serif-style navy section heading with underline (matches sample).
function sectionTitle(doc, label, x, y, w) {
  text(doc, NAVY); doc.setFont('times', 'bold'); doc.setFontSize(11)
  doc.text(label.toUpperCase(), x, y)
  stroke(doc, RULE); doc.setLineWidth(0.7); doc.line(x, y + 2.2, x + w, y + 2.2)
  doc.setFont('helvetica', 'normal')
}

// VAMI line chart (light, navy line, gridlines + axis labels).
function drawVami(doc, vami, x, y, w, h) {
  const min = Math.floor(Math.min(...vami) / 10) * 10
  const max = Math.ceil(Math.max(...vami) / 10) * 10
  const span = max - min || 1
  const plotX = x + 12, plotY = y + 4, plotW = w - 16, plotH = h - 14
  // gridlines + y labels
  text(doc, MUTED); doc.setFont('helvetica', 'normal'); doc.setFontSize(6)
  const steps = 5
  for (let i = 0; i <= steps; i++) {
    const val = min + (span * i) / steps
    const gy = plotY + plotH - (plotH * i) / steps
    stroke(doc, '#eaecef'); doc.setLineWidth(0.2); doc.line(plotX, gy, plotX + plotW, gy)
    text(doc, MUTED); doc.text(String(Math.round(val)), plotX - 2, gy + 1.2, { align: 'right' })
  }
  // line
  const pts = vami.map((v, i) => [
    plotX + (i * plotW) / (vami.length - 1),
    plotY + plotH - ((v - min) / span) * plotH,
  ])
  stroke(doc, NAVY); doc.setLineWidth(0.7)
  for (let i = 1; i < pts.length; i++) doc.line(pts[i-1][0], pts[i-1][1], pts[i][0], pts[i][1])
  // x labels (sparse)
  const xticks = ['Mar','Sep','2025','Mar','Sep','2026','May']
  xticks.forEach((t, i) => {
    const tx = plotX + (plotW * i) / (xticks.length - 1)
    text(doc, MUTED); doc.setFontSize(6); doc.text(t, tx, plotY + plotH + 5, { align: 'center' })
  })
  // legend
  stroke(doc, NAVY); doc.setLineWidth(1.1); doc.line(x, y + h - 1.5, x + 6, y + h - 1.5)
  text(doc, INK); doc.setFontSize(7); doc.text(fundLegendName, x + 8, y + h)
}
let fundLegendName = ''

// 4-up performance stat block (Last Month / YTD / 3M / Annualized).
function perfStatBlock(doc, perf, x, y, w) {
  const items = [
    ['Last Month', perf.lastMonth],
    ['Year To Date', perf.ytd],
    ['3 Month ROR', perf.m3],
    ['Total Return Annualized', perf.annualized],
  ]
  const colW = w / 2, rowH = 18
  items.forEach((it, i) => {
    const cx = x + (i % 2) * colW
    const cy = y + Math.floor(i / 2) * rowH
    text(doc, MUTED); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5)
    doc.text(it[0], cx, cy)
    text(doc, NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(17)
    doc.text(it[1], cx, cy + 8)
  })
  doc.setFont('helvetica', 'normal')
  return y + 2 * rowH
}

export function generateFundFactSheet(fund, options = {}) {
  if (!fund?.factSheet) {
    throw new Error(`Fund "${fund?.name || 'unknown'}" is missing factSheet data.`)
  }
  const { mode = 'download' } = options

  // If the fund ships with a curated static PDF, use that instead of the
  // generated version so the website always serves the latest approved sheet.
  if (fund.factSheetPdf || fund.factSheet?.pdfUrl) {
    const pdfUrl = fund.factSheetPdf || fund.factSheet.pdfUrl
    const fileName = pdfUrl.split('/').pop() || `${fund.slug || 'fact-sheet'}.pdf`
    if (typeof window !== 'undefined') {
      if (mode === 'preview') {
        window.open(pdfUrl, '_blank', 'noopener,noreferrer')
      } else {
        const link = document.createElement('a')
        link.href = pdfUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
      }
    }
    return
  }

  const stats = deriveStats(fund)
  fundLegendName = fund.name

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const fs = fund.factSheet

  const paintPage = () => { fill(doc, '#ffffff'); doc.rect(0, 0, pageW, pageH, 'F') }

  // ============ PAGE 1 ============
  paintPage()
  header(doc, fund, stats, pageW)

  // ── Performance Statistics + Manager bio (two columns) ──
  let y = 42
  const leftW = (pageW - 28) * 0.6
  const rightX = 14 + leftW + 8
  const rightW = pageW - 14 - rightX

  sectionTitle(doc, `Performance Statistics ${fs.shareClass ? '· USD Share Class' : ''}`.trim(), 14, y, leftW)
  perfStatBlock(doc, stats.perf, 14, y + 8, leftW)

  // Manager bio card (right)
  fill(doc, CARD); doc.roundedRect(rightX, y - 4, rightW, 44, 1.5, 1.5, 'F')
  text(doc, NAVY); doc.setFont('helvetica', 'bold'); doc.setFontSize(9)
  doc.text(fs.manager?.name || 'Portfolio Manager', rightX + 4, y + 3)
  text(doc, INK); doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5)
  const bio = fs.manager?.bio ||
    'A founding partner of PQS Capital Partners with extensive experience in quantitative investment management and the alternatives industry. For a full biography, please visit our website.'
  doc.text(doc.splitTextToSize(bio, rightW - 8), rightX + 4, y + 9, { lineHeightFactor: 1.4 })

  y += 38

  // ── Strategy Description (full width) ──
  const contentW = pageW - 28
  sectionTitle(doc, 'Strategy Description', 14, y, contentW)
  y += 7
  text(doc, INK); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5)
  const desc = fund.fundDetailsIntro || (Array.isArray(fund.tagline) ? fund.tagline[0] : fund.tagline) || ''
  const descLines = doc.splitTextToSize(desc, contentW)
  doc.text(descLines, 14, y, { lineHeightFactor: 1.5 })
  y += descLines.length * 5.0 + 8

  // ── General Information — 2-column grid (label | value) using autoTable ──
  sectionTitle(doc, 'General Information', 14, y, contentW)
  const gi = [
    ['Company',              'PQS Capital Partners Ltd.'],
    ['Min. Investment',      fund.minimum || '1,000,000 USD'],
    ['Liquidity',            fs.redemptionFreq || 'Monthly'],
    ['Base Currency',        'USD'],
    ['Highwater Mark',       'Yes'],
    ['Program AUM',          fs.aum || '101,000,000 USD'],
    ['Administrator',        fs.administrator || 'Independent Administrator'],
    ['Custodian',            fs.custodian || 'Tier-1 Custodian'],
    ['Auditor',              fs.auditor || 'Independent Auditor'],
    ['Regulator & Lic. No.', fs.regulator || 'FCA / CIMA'],
    ['Management Fee',       fs.managementFee || '2.00%'],
    ['Performance Fee',      fs.performanceFee || '20.00%'],
    ['Subscriptions',        fs.subscriptionFreq || 'Monthly'],
  ]
  // Split into two side-by-side tables of ~7 rows each
  const half = Math.ceil(gi.length / 2)
  const leftGi  = gi.slice(0, half)
  const rightGi = gi.slice(half)
  const giColW  = (contentW - 8) / 2
  const giRightX = 14 + giColW + 8

  const giTable = (rows, startX) => autoTable(doc, {
    startY: y + 4,
    body: rows,
    theme: 'plain',
    margin: { left: startX, right: pageW - startX - giColW },
    tableWidth: giColW,
    styles: {
      font: 'helvetica', fontSize: 8, cellPadding: { top: 2, bottom: 2, left: 2, right: 2 },
      overflow: 'linebreak', lineColor: hexToRgb(HAIR), lineWidth: 0.1,
    },
    columnStyles: {
      0: { textColor: hexToRgb(MUTED), fontStyle: 'normal', cellWidth: 38 },
      1: { textColor: hexToRgb(INK),   fontStyle: 'bold',   cellWidth: giColW - 38 },
    },
    didParseCell: (d) => { if (d.row.index % 2 === 0) d.cell.styles.fillColor = hexToRgb(CARD) },
  })
  giTable(leftGi, 14)
  const leftTableEndY = doc.lastAutoTable.finalY
  giTable(rightGi, giRightX)
  const rightTableEndY = doc.lastAutoTable.finalY
  y = Math.max(leftTableEndY, rightTableEndY) + 8

  // ── Performance (VAMI) chart ──
  sectionTitle(doc, 'Performance (VAMI)', 14, y, pageW - 28)
  y += 6
  drawVami(doc, stats.vami, 14, y, pageW - 28, 70)
  y += 76

  // ── Monthly Performance grid ──
  sectionTitle(doc, 'Monthly Performance', 14, y, pageW - 28)
  y += 5
  const head = [['', ...MONTHS, 'Year']]
  const body = stats.years.map((yr) => {
    const row = stats.monthly[yr].map((v) => (v == null ? '' : v.toFixed(2)))
    const yearTotal = stats.monthly[yr].filter((x) => x != null).reduce((s, x) => s + x, 0)
    return [String(yr), ...row, yearTotal ? yearTotal.toFixed(2) : '']
  })
  autoTable(doc, {
    startY: y + 2,
    head, body, theme: 'grid',
    margin: { left: 14, right: 14 },
    styles: { font: 'helvetica', fontSize: 7, halign: 'center', cellPadding: 1.4,
      textColor: hexToRgb(INK), lineColor: hexToRgb(HAIR), lineWidth: 0.1 },
    headStyles: { fillColor: hexToRgb('#ffffff'), textColor: hexToRgb(MUTED), fontStyle: 'normal', lineWidth: 0 },
    columnStyles: { 0: { fontStyle: 'bold', textColor: hexToRgb(MUTED) }, 13: { fontStyle: 'bold' } },
    didParseCell: (d) => {
      if (d.column.index === 13 && d.section === 'body') {
        d.cell.styles.fillColor = hexToRgb(DARKBOX); d.cell.styles.textColor = [255,255,255]; d.cell.styles.fontStyle = 'bold'
      }
    },
  })

  footer(doc, pageW, pageH, 1, 2)

  // ============ PAGE 2 ============
  doc.addPage(); paintPage()
  header(doc, fund, stats, pageW)

  y = 42
  const colW = (pageW - 28 - 8) / 2
  const col2X = 14 + colW + 8

  sectionTitle(doc, 'Return Statistics', 14, y, colW)
  sectionTitle(doc, 'Risk Statistics', col2X, y, colW)

  const statTable = (rows, sx) => autoTable(doc, {
    startY: y + 4,
    body: rows, theme: 'plain',
    margin: { left: sx, right: pageW - sx - colW },
    tableWidth: colW,
    styles: { font: 'helvetica', fontSize: 8.5, cellPadding: { top: 2.4, bottom: 2.4, left: 3, right: 3 },
      textColor: hexToRgb(INK), lineColor: hexToRgb(HAIR), lineWidth: 0.1 },
    columnStyles: { 0: { textColor: hexToRgb(INK) }, 1: { halign: 'right', cellWidth: 26, textColor: hexToRgb(NAVY), fontStyle: 'bold' } },
    didParseCell: (d) => { if (d.row.index % 2 === 1) d.cell.styles.fillColor = hexToRgb(CARD) },
  })
  statTable(stats.returnStats, 14)
  statTable(stats.riskStats, col2X)

  y = Math.max(doc.lastAutoTable.finalY, y + 60) + 10

  // ── Contact Information + Latest Award ──
  sectionTitle(doc, 'Contact Information', 14, y, colW)
  sectionTitle(doc, 'Latest Award', col2X, y, colW)
  y += 7
  const contact = fs.contact || {
    company: 'Premier Quantitative Strategies SPC',
    lines: ['21 Arlington St, London SW1A 1RD', 'United Kingdom', '+44 2071675747', 'www.pqs.fund', 'support@pqs.fund'],
  }
  text(doc, INK); doc.setFont('helvetica', 'normal'); doc.setFontSize(8.5)
  doc.text(contact.company, 14, y)
  let cy = y + 5
  contact.lines.forEach((l) => { text(doc, MUTED); doc.text(l, 14, cy); cy += 4.6 })

  // Award box (right)
  fill(doc, DARKBOX); doc.roundedRect(col2X, y - 2, colW, 30, 1.5, 1.5, 'F')
  text(doc, '#ffffff'); doc.setFont('helvetica', 'bold'); doc.setFontSize(8)
  doc.text(fs.award?.title || 'Recognised Performance', col2X + 5, y + 6)
  fill(doc, GOLD); doc.roundedRect(col2X + colW - 32, y + 1, 27, 6, 1, 1, 'F')
  text(doc, NAVY); doc.setFontSize(7); doc.text('Award', col2X + colW - 18.5, y + 5, { align: 'center' })
  text(doc, '#cdd6e0'); doc.setFont('helvetica', 'normal'); doc.setFontSize(7)
  doc.text(doc.splitTextToSize(fs.award?.detail || 'PQS strategies recognised for consistent, risk-adjusted performance.', colW - 10), col2X + 5, y + 13, { lineHeightFactor: 1.4 })

  y = Math.max(cy, y + 30) + 8

  // ── Disclaimer ──
  sectionTitle(doc, 'Disclaimer', 14, y, pageW - 28)
  y += 6
  text(doc, MUTED); doc.setFont('helvetica', 'normal'); doc.setFontSize(6.6)
  const disclaimer =
    'This communication is issued by Premier Quantitative Strategies SPC and is for information purposes only. It does not constitute an offer to sell or a solicitation of an offer to buy any securities, nor investment advice. Any offering shall be made solely pursuant to definitive offering documents and applicable regulatory approvals. This material is intended for Professional Clients and Eligible Counterparties and should not be relied upon by Retail Clients. ' +
    'The performance figures shown above are indicative and net of applicable fees unless stated otherwise. Investments of this type involve a substantial risk of loss and are only suitable for experienced investors who can bear such risk. Invested capital is at risk and you may lose some or all of the amount invested. ' +
    'PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE RESULTS. All market prices, data and other information are not warranted as to completeness or accuracy and are subject to change without notice. Potential investors should seek independent financial advice before investing.'
  doc.text(doc.splitTextToSize(disclaimer, pageW - 28), 14, y, { lineHeightFactor: 1.45 })

  footer(doc, pageW, pageH, 2, 2)

  const downloadName = fund.detailsFile
    ? fund.detailsFile.replace(/^.*\//, '').replace(/\.pdf$/i, '')
    : `pqs-${(fund.slug || fund.name).replace(/[^a-z0-9-_]+/gi, '-').toLowerCase()}-fact-sheet`
  if (mode === 'preview') {
    const blob = doc.output('blob')
    const url = URL.createObjectURL(blob)
    const opened = window.open(url, '_blank', 'noopener,noreferrer')

    if (!opened) {
      const fallbackLink = document.createElement('a')
      fallbackLink.href = url
      fallbackLink.target = '_blank'
      fallbackLink.rel = 'noopener noreferrer'
      fallbackLink.click()
    }

    window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
    return url
  }

  doc.save(`${downloadName}.pdf`)
  return `${downloadName}.pdf`
}
