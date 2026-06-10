// Ported from pqsFrontend/src/pages/user/Reports.jsx.
// Functional parity (filters, table layout, PDF/CSV export, account summary)
// is preserved verbatim from the source; only the visual chrome is restyled
// to match new-pqs (ink/gold/sand, framer-motion, lucide icons).
import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Download, AlertCircle, FileText, ChevronDown, X,
} from 'lucide-react'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import Papa from 'papaparse'
import { useAuth } from '../../auth/AuthContext.jsx'
import {
  fetchUserTransactions,
  fetchUserProfit,
  fetchUserData,
} from '../../utils/api.js'
import { getCurrencyFlag, getAssetFlag } from '../../data/currencyOptions.js'

const TABS = [
  { key: 'crypto', label: 'Crypto' },
  { key: 'fiat',   label: 'Fiat' },
  { key: 'profit', label: 'Profit / Loss' },
]

const DISCLAIMER =
  'The Premier Quantitative Strategies SP Fund is our main investment vehicle which is an open-ended mutual fund based in the Cayman Islands and regulated by the Cayman Island Monetary Authority (CIMA). The Premier Quantitative Strategies (PQS) SP Fund is only available to institutional investors and high net worth individuals who can be classified as professional investors. The Offering Memorandum is the only authorized document for the offering of shares in the PQS SP FUND. Its distribution is subject to the particular laws and regulations of the jurisdictions in which a potential investor resides as well as the categorization of the potential investor as a professional client in accordance with FCA rules.'

export default function Statements() {
  const { user } = useAuth()
  const userId = user?._id

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [allTransactions, setAllTransactions] = useState([])
  const [allProfits, setAllProfits] = useState([])
  const [userData, setUserData] = useState(null)
  const [activeTab, setActiveTab] = useState('crypto')

  // Filters — names match pqsFrontend
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedAssets, setSelectedAssets] = useState([])
  const [selectedFunds, setSelectedFunds] = useState([])
  const [selectedClasses, setSelectedClasses] = useState([])
  const [status, setStatus] = useState('all')
  const [transactionId, setTransactionId] = useState('')

  const [showOptions, setShowOptions] = useState(false)
  const exportRef = useRef(null)

  // 1) Fetch transactions + profits + user details
  useEffect(() => {
    if (!userId) return
    let alive = true
    setLoading(true)
    setError('')
    Promise.allSettled([
      fetchUserTransactions(userId),
      fetchUserProfit(userId),
      fetchUserData(userId),
    ]).then(([tx, pr, ud]) => {
      if (!alive) return
      if (tx.status === 'fulfilled' && tx.value?.success) {
        const sorted = [...(tx.value.transactions || [])].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        setAllTransactions(sorted)
      } else if (tx.status === 'rejected') {
        setError("We couldn't load your transactions. Please try again.")
      }
      if (pr.status === 'fulfilled' && pr.value?.success) {
        // Source sorts by .date (which doesn't exist on profit objects);
        // fall back to createdAt to actually order them.
        const sorted = [...(pr.value.result || [])].sort(
          (a, b) => new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date)
        )
        setAllProfits(sorted)
      }
      if (ud.status === 'fulfilled') {
        const data = ud.value?.user || ud.value?.data || ud.value || {}
        // pqsFrontend reads from auth.user.profile.details[0] — fall back to
        // a flat shape if the API doesn't return it.
        setUserData(data?.profile?.details?.[0] || data)
      }
      setLoading(false)
    })
    return () => { alive = false }
  }, [userId])

  // 2) Outside-click for export menu
  useEffect(() => {
    if (!showOptions) return
    const onClick = (e) => { if (!exportRef.current?.contains(e.target)) setShowOptions(false) }
    const onKey = (e) => { if (e.key === 'Escape') setShowOptions(false) }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [showOptions])

  // 3) Unique filter options (identical logic to source)
  const getUniqueTypes = () => {
    if (activeTab === 'profit') return ['profit', 'loss']
    return [...new Set(allTransactions.map((t) => t.type).filter(Boolean))]
  }
  const getUniqueAssets = () => {
    if (activeTab === 'profit') {
      return [...new Set(allProfits.map((p) => p.currency).filter(Boolean))]
    }
    return [...new Set(allTransactions.map((t) => t.currency || t.asset).filter(Boolean))]
  }
  const getUniqueFunds = () => {
    if (activeTab === 'profit') {
      return [...new Set(allProfits.map((p) => p.fundId?.name || 'Unknown fund'))]
    }
    const fiatTx = allTransactions.filter((t) => t.paymentMethod === 'Fiat')
    return [...new Set(fiatTx.map((t) => t.fundEnrollment?.fund?.name || ''))].filter(Boolean)
  }
  const getUniqueClasses = () => {
    if (activeTab === 'profit') {
      return [...new Set(allProfits.map((p) => p.classId?.class || 'Unknown class'))]
    }
    const fiatTx = allTransactions.filter((t) => t.paymentMethod === 'Fiat')
    return [...new Set(fiatTx.map((t) => t.fundEnrollment?.class?.class || ''))].filter(Boolean)
  }

  // 4) Filtered data — identical logic to source
  const filteredData = useMemo(() => {
    let dataToFilter = []
    if (activeTab === 'crypto') {
      dataToFilter = allTransactions.filter((t) => t.paymentMethod === 'Crypto')
    } else if (activeTab === 'fiat') {
      dataToFilter = allTransactions.filter((t) => t.paymentMethod === 'Fiat')
    } else {
      dataToFilter = [...allProfits]
    }

    if (startDate && endDate) {
      dataToFilter = dataToFilter.filter((item) => {
        const rawDate = item.date || item.createdAt
        const itemDate = new Date(rawDate)
        const adjustedEndDate = new Date(endDate)
        adjustedEndDate.setDate(adjustedEndDate.getDate() + 1)
        return itemDate >= new Date(startDate) && itemDate < adjustedEndDate
      })
    }

    if (selectedTypes.length > 0) {
      dataToFilter = dataToFilter.filter((item) => selectedTypes.includes(item.type))
    }

    if (selectedAssets.length > 0) {
      if (activeTab === 'profit') {
        dataToFilter = dataToFilter.filter((item) => selectedAssets.includes(item.currency))
      } else {
        dataToFilter = dataToFilter.filter((item) =>
          selectedAssets.includes(item.currency || item.asset)
        )
      }
    }

    if (selectedFunds.length > 0 && (activeTab === 'fiat' || activeTab === 'profit')) {
      if (activeTab === 'profit') {
        dataToFilter = dataToFilter.filter((item) => selectedFunds.includes(item.fundId?.name))
      } else {
        dataToFilter = dataToFilter.filter((item) =>
          selectedFunds.includes(item.fundEnrollment?.fund?.name)
        )
      }
    }

    if (selectedClasses.length > 0 && (activeTab === 'fiat' || activeTab === 'profit')) {
      if (activeTab === 'profit') {
        dataToFilter = dataToFilter.filter((item) => selectedClasses.includes(item.classId?.class))
      } else {
        dataToFilter = dataToFilter.filter((item) =>
          selectedClasses.includes(item.fundEnrollment?.class?.class)
        )
      }
    }

    if (status !== 'all' && activeTab !== 'profit') {
      const statusValue = parseInt(status, 10)
      dataToFilter = dataToFilter.filter((item) => item.status === statusValue)
    }

    if (transactionId) {
      dataToFilter = dataToFilter.filter((item) => (item._id || '').includes(transactionId))
    }

    return dataToFilter
  }, [activeTab, allTransactions, allProfits, startDate, endDate, selectedTypes,
      selectedAssets, selectedFunds, selectedClasses, status, transactionId])

  const clearDateFilters = () => { setStartDate(''); setEndDate('') }

  // 5) PDF export — verbatim port (Account Summary + per-asset tables + colored amounts)
  const exportToPdf = () => {
    if (!filteredData.length) return
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const leftMargin = 14
    const lineSpacing = 6

    const renderHeader = () => {
      const headerHeight = 30
      doc.setFillColor('#F0F0F0')
      doc.rect(0, 0, pageWidth, headerHeight, 'F')
      doc.setFontSize(16)
      doc.setTextColor('#0E2340')
      doc.text('Premier Quantitative Strategies (PQS) SPC FUND', leftMargin + 2, 14)
      doc.setFontSize(11)
      doc.text('21 Arlington St, London SW1A 1RD, United Kingdom', leftMargin + 2, 22)
    }

    const addFooter = () => {
      doc.setFontSize(8)
      doc.setTextColor('#444444')
      doc.text(DISCLAIMER, pageWidth / 2, pageHeight - 20, {
        align: 'center',
        maxWidth: pageWidth - 40,
      })
    }

    const renderToAndPeriod = (sectionStartY) => {
      const u = userData || {}
      const fullName = [u.firstName, u.lastName].filter(Boolean).join(' ')
      const toDetails = [
        fullName || u.name || u.email || 'No Name',
        u.companyName || '',
        u.address || 'No Address',
        u.street || 'No Street',
        u.country || 'No Country',
      ].filter((line) => line !== '')

      doc.setTextColor('#1a1d24')
      doc.setFontSize(12)
      let yPosition = sectionStartY
      toDetails.forEach((line) => {
        doc.text(line, leftMargin, yPosition)
        yPosition += lineSpacing
      })

      const todayDate = new Date().toLocaleDateString('en-GB')
      const dateOf = (item) => item?.date || item?.createdAt
      const calculatedStart = startDate ||
        (filteredData.length > 0 ? dateOf(filteredData[filteredData.length - 1]) : 'N/A')
      const calculatedEnd = endDate ||
        (filteredData.length > 0 ? dateOf(filteredData[0]) : 'N/A')

      const fmt = (v) => v === 'N/A' || !v ? 'N/A' : new Date(v).toLocaleDateString('en-GB')

      const statementInfoX = pageWidth / 2 + 10
      doc.text(`Statement Date: ${todayDate}`, statementInfoX, sectionStartY)
      doc.text(
        `Period Covered: ${fmt(calculatedStart)} - ${fmt(calculatedEnd)}`,
        statementInfoX, sectionStartY + lineSpacing,
      )

      doc.setDrawColor('#0E2340')
      doc.setLineWidth(0.5)
      doc.line(leftMargin, yPosition, pageWidth - leftMargin, yPosition)
      return yPosition + 10
    }

    // Group by asset/currency for transaction tabs
    const transactionsByAsset = filteredData.reduce((acc, txn) => {
      const asset = txn.currency || txn.asset
      if (!asset) return acc
      if (!acc[asset]) acc[asset] = []
      acc[asset].push(txn)
      return acc
    }, {})

    renderHeader()
    let yPosition = renderToAndPeriod(50)

    if (activeTab !== 'profit') {
      // ----- ACCOUNT SUMMARY -----
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text('Account Summary', leftMargin, yPosition)
      doc.setFont(undefined, 'normal')
      doc.setFontSize(12)
      yPosition += lineSpacing

      const assetSummaryData = Object.keys(transactionsByAsset).map((asset) => {
        const txns = transactionsByAsset[asset]
        const deposits = txns.filter((t) => t.type === 'Deposit')
        const withdrawals = txns.filter((t) => t.type !== 'Deposit')
        const totalDeposits = deposits.reduce((s, t) => s + Number(t.amount || 0), 0)
        const totalWithdrawals = withdrawals.reduce((s, t) => s + Number(t.amount || 0), 0)
        const sortedForBalance = [...txns].sort((a, b) => new Date(a.date) - new Date(b.date))
        const firstTxn = sortedForBalance[0]
        const lastTxn = sortedForBalance[sortedForBalance.length - 1]
        const openingBalance = firstTxn ? (firstTxn.closingBalance || 0) - Number(firstTxn.amount || 0) : 0
        const closingBalance = lastTxn?.closingBalance || 0
        return [
          asset,
          `${openingBalance.toFixed(2)} ${asset}`,
          `${totalWithdrawals.toFixed(2)} ${asset}`,
          `${totalDeposits.toFixed(2)} ${asset}`,
          `${closingBalance.toFixed(2)} ${asset}`,
        ]
      })

      autoTable(doc, {
        startY: yPosition,
        head: [['Asset/Currency', 'Opening Value', 'Amount Out', 'Amount In', 'Closing Value']],
        body: assetSummaryData,
        margin: { left: leftMargin },
        headStyles: { fillColor: null, textColor: '#0E2340', fontStyle: 'bold' },
        bodyStyles: { fillColor: null, textColor: '#0E2340' },
      })
      yPosition = doc.lastAutoTable.finalY + 20

      // ----- Per-asset transactions tables -----
      Object.keys(transactionsByAsset).forEach((asset) => {
        doc.setFont(undefined, 'bold')
        doc.setFontSize(14)
        doc.text(`Transactions for ${asset}`, leftMargin, yPosition)
        doc.setFont(undefined, 'normal')
        doc.setFontSize(12)
        yPosition += lineSpacing

        const txns = transactionsByAsset[asset]
        const headRow = activeTab === 'fiat'
          ? ['Date', 'Type', 'Fund', 'Class', 'Debit', 'Credit', 'Network', 'Transaction ID', 'Balance']
          : ['Date', 'Type', 'Debit', 'Credit', 'Network', 'Transaction ID', 'Balance']

        const bodyRows = txns.map((txn) => {
          const dateStr = new Date(txn.date).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
          })
          const debit = txn.type !== 'Deposit' && txn.amount
            ? `- ${Number(txn.amount).toFixed(2)} ${asset}` : ''
          const credit = txn.type === 'Deposit' && txn.amount
            ? `+ ${Number(txn.amount).toFixed(2)} ${asset}` : ''
          const balance = txn.closingBalance != null
            ? `${Number(txn.closingBalance).toFixed(2)} ${asset}` : ''

          if (activeTab === 'fiat') {
            return [
              dateStr, txn.type,
              txn.fundEnrollment?.fund?.name || '-',
              txn.fundEnrollment?.class?.class || '-',
              debit, credit, txn.network || '-', txn._id, balance,
            ]
          }
          return [
            dateStr, txn.type, debit, credit, txn.network || '-', txn._id, balance,
          ]
        })

        autoTable(doc, {
          startY: yPosition,
          head: [headRow],
          body: bodyRows,
          margin: { left: leftMargin },
          headStyles: { fillColor: '#0E2340', textColor: '#FFFFFF', fontStyle: 'bold' },
          bodyStyles: { textColor: '#0E2340' },
          didParseCell: (data) => {
            const debitColIndex = activeTab === 'fiat' ? 4 : 2
            const creditColIndex = activeTab === 'fiat' ? 5 : 3
            const raw = String(data.cell.raw || '')
            if (data.column.index === debitColIndex && raw.startsWith('-')) {
              data.cell.styles.textColor = '#FF0000'
            }
            if (data.column.index === creditColIndex && raw.startsWith('+')) {
              data.cell.styles.textColor = '#00AA00'
            }
          },
        })
        yPosition = doc.lastAutoTable.finalY + 20
      })
    } else {
      // ----- PROFIT/LOSS Report -----
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text('Profit/Loss Report', leftMargin, yPosition)
      doc.setFont(undefined, 'normal')
      doc.setFontSize(12)
      yPosition += lineSpacing

      const headers = [['Date', 'Type', 'Fund', 'Class', 'Currency', 'Amount', 'Transaction ID']]
      const bodyData = filteredData.map((item) => [
        new Date(item.createdAt).toLocaleString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
        }),
        item.type,
        item.fundId?.name || '-',
        item.classId?.class || '-',
        item.currency || '-',
        item.type === 'profit' ? `+ ${Number(item.amount || 0).toFixed(2)}` : `- ${Number(item.amount || 0).toFixed(2)}`,
        item._id,
      ])

      autoTable(doc, {
        startY: yPosition,
        head: headers,
        body: bodyData,
        margin: { left: leftMargin },
        headStyles: { fillColor: '#0E2340', textColor: '#FFFFFF', fontStyle: 'bold' },
        bodyStyles: { textColor: '#0E2340' },
        didParseCell: (data) => {
          if (data.column.index === 5) {
            const raw = String(data.cell.raw || '')
            if (raw.startsWith('-')) data.cell.styles.textColor = '#FF0000'
            if (raw.startsWith('+')) data.cell.styles.textColor = '#00AA00'
          }
        },
      })
    }

    addFooter()
    doc.save(`${activeTab}-report.pdf`)
  }

  // 6) CSV export — verbatim port
  const exportToCsv = () => {
    if (!filteredData.length) return
    let csvData = []

    if (activeTab === 'profit') {
      csvData.push(['Date', 'Type', 'Fund', 'Class', 'Currency', 'Amount', 'Transaction ID'])
      filteredData.forEach((item) => {
        csvData.push([
          new Date(item.createdAt).toLocaleString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit', second: '2-digit',
          }),
          item.type,
          item.fundId?.name || '-',
          item.classId?.class || '-',
          item.currency || '-',
          item.type === 'profit' ? `+${Number(item.amount || 0).toFixed(2)}` : `-${Number(item.amount || 0).toFixed(2)}`,
          item._id,
        ])
      })
    } else {
      if (activeTab === 'fiat') {
        csvData.push(['Date', 'Type', 'Fund', 'Class', 'Debit', 'Credit', 'Network', 'Transaction ID', 'Balance'])
      } else {
        csvData.push(['Date', 'Type', 'Debit', 'Credit', 'Network', 'Transaction ID', 'Balance'])
      }
      filteredData.forEach((item) => {
        const dateStr = new Date(item.date).toLocaleString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit', second: '2-digit',
        })
        const asset = item.currency || item.asset
        const debit  = item.type !== 'Deposit' && item.amount ? `-${Number(item.amount).toFixed(2)} ${asset}` : ''
        const credit = item.type === 'Deposit' && item.amount ? `+${Number(item.amount).toFixed(2)} ${asset}` : ''
        const balance = item.closingBalance != null ? `${Number(item.closingBalance).toFixed(2)} ${asset}` : ''
        if (activeTab === 'fiat') {
          csvData.push([
            dateStr, item.type,
            item.fundEnrollment?.fund?.name || '-',
            item.fundEnrollment?.class?.class || '-',
            debit, credit, item.network || '-', item._id, balance,
          ])
        } else {
          csvData.push([dateStr, item.type, debit, credit, item.network || '-', item._id, balance])
        }
      })
    }

    const csv = Papa.unparse(csvData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `${activeTab}-report.csv`
    link.click()
    URL.revokeObjectURL(link.href)
  }

  const today = new Date().toISOString().split('T')[0]
  const showTypeFilter   = true // present on all 3 tabs; source supplies ['profit','loss'] for profit
  const showFundFilter   = activeTab === 'fiat' || activeTab === 'profit'
  const showClassFilter  = activeTab === 'fiat' || activeTab === 'profit'
  const showStatusFilter = activeTab !== 'profit'

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <div className="eyebrow mb-2">Investor records</div>
          <h2 className="font-display text-3xl md:text-4xl text-sand-50">Statements</h2>
          <p className="text-sm text-sand-50/60 mt-2 max-w-xl">
            Transaction history and profit / loss reports with PDF and CSV export.
          </p>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 text-sm text-rose-300 bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
          <AlertCircle size={14} /> {error}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all
              ${activeTab === t.key
                ? 'bg-gradient-to-r from-gold-400 to-gold-600 text-ink-950 shadow-lg shadow-gold-500/20'
                : 'border border-sand-50/15 text-sand-50/75 hover:border-gold-300/60 hover:text-gold-200'}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="card-glass p-4 md:p-5 space-y-4">
        {/* Date range + Export */}
        <div className="grid md:grid-cols-2 gap-4 md:items-end">
          <div>
            <label className="eyebrow block mb-2">Date Range</label>
            {/* Mobile: stack dates + buttons in a clean 2-row grid. Desktop: single row. */}
            <div className="grid grid-cols-[1fr_auto_1fr] sm:flex sm:items-center gap-2 items-center">
              <input
                type="date"
                value={startDate}
                max={today}
                onChange={(e) => setStartDate(e.target.value)}
                className="min-w-0 w-full sm:flex-1 bg-ink-900 border border-sand-50/10 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-sand-50 focus:outline-none focus:border-gold-500/50"
              />
              <span className="text-sand-50/45 text-xs px-0.5">to</span>
              <input
                type="date"
                value={endDate}
                max={today}
                onChange={(e) => setEndDate(e.target.value)}
                className="min-w-0 w-full sm:flex-1 bg-ink-900 border border-sand-50/10 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-sand-50 focus:outline-none focus:border-gold-500/50"
              />
              <button
                onClick={clearDateFilters}
                className="col-span-3 sm:col-auto text-xs px-3 py-2 rounded-lg border border-sand-50/10 text-sand-50/70 hover:text-gold-200 hover:border-gold-500/40"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="flex md:justify-end">
            <div className="relative w-full md:w-auto" ref={exportRef}>
              <button
                onClick={() => setShowOptions((v) => !v)}
                disabled={!filteredData.length}
                className="btn-primary text-sm py-2.5 px-5 w-full md:w-auto justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download size={14} /> Export Data
                <ChevronDown size={14} className={`transition-transform ${showOptions ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.12 }}
                    className="absolute right-0 top-full mt-2 w-full md:w-48 z-30 card-glass overflow-hidden"
                  >
                    <button onClick={() => { exportToPdf(); setShowOptions(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gold-500/10 text-sand-50">
                      Download PDF
                    </button>
                    <button onClick={() => { exportToCsv(); setShowOptions(false) }}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gold-500/10 text-sand-50 border-t border-sand-50/8">
                      Download CSV
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Type / Asset / Fund / Class / Status / Transaction ID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {showTypeFilter && (
            <MultiSelect
              label="Type"
              placeholder="Select Type(s)"
              options={getUniqueTypes()}
              value={selectedTypes}
              onChange={setSelectedTypes}
            />
          )}
          <MultiSelect
            label={activeTab === 'profit' ? 'Currency' : 'Asset/Currency'}
            placeholder={`Select ${activeTab === 'profit' ? 'Currency' : 'Asset'}(s)`}
            options={getUniqueAssets()}
            value={selectedAssets}
            onChange={setSelectedAssets}
          />
          {showFundFilter && (
            <MultiSelect
              label="Fund"
              placeholder="Select Fund(s)"
              options={getUniqueFunds()}
              value={selectedFunds}
              onChange={setSelectedFunds}
            />
          )}
          {showClassFilter && (
            <MultiSelect
              label="Class"
              placeholder="Select Class(es)"
              options={getUniqueClasses()}
              value={selectedClasses}
              onChange={setSelectedClasses}
            />
          )}
          {showStatusFilter && (
            <div>
              <label className="eyebrow block mb-2">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-ink-900 border border-sand-50/10 rounded-lg px-3 py-2 text-sm text-sand-50 focus:outline-none focus:border-gold-500/50"
              >
                <option className="bg-ink-900" value="all">All</option>
                <option className="bg-ink-900" value="0">Pending</option>
                <option className="bg-ink-900" value="1">Completed</option>
                <option className="bg-ink-900" value="2">Failed</option>
              </select>
            </div>
          )}
          <div>
            <label className="eyebrow block mb-2">Transaction ID</label>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-ink-900 border border-sand-50/10 focus-within:border-gold-500/50">
              <Search size={14} className="text-sand-50/40" />
              <input
                type="text"
                placeholder="Search"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                className="flex-1 bg-transparent text-sm text-sand-50 focus:outline-none placeholder:text-sand-50/40"
              />
              {transactionId && (
                <button onClick={() => setTransactionId('')} className="text-sand-50/50 hover:text-gold-200">
                  <X size={14} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card-glass p-3 sm:p-5 md:p-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-gold-500/8 blur-2xl pointer-events-none" />
        <div className="relative flex items-start justify-between mb-5 gap-4 flex-wrap">
          <div>
            <div className="eyebrow mb-1">
              {activeTab === 'profit' ? 'Profit & Loss' : activeTab === 'crypto' ? 'Crypto transactions' : 'Fiat transactions'}
            </div>
            <h3 className="font-display text-xl text-sand-50">
              {loading ? 'Loading…' : `${filteredData.length} record${filteredData.length === 1 ? '' : 's'}`}
            </h3>
          </div>
        </div>

        <div className="relative">
          {loading ? (
            <TableSkeleton />
          ) : filteredData.length === 0 ? (
            <div className="py-14 text-center text-sand-50/65">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 grid place-items-center mx-auto mb-4">
                <FileText size={20} className="text-gold-300" />
              </div>
              <div className="font-display text-lg text-sand-50">No Data Found</div>
            </div>
          ) : (
            <div className="overflow-x-auto -mx-3 sm:-mx-2 px-3 sm:px-0">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="text-[10px] uppercase tracking-widest text-sand-50/45 border-b border-sand-50/8">
                    <th className="text-left p-2 whitespace-nowrap">Date / Time</th>
                    {activeTab === 'profit' && (
                      <>
                        <th className="text-left p-2">Type</th>
                        <th className="text-left p-2">Fund</th>
                        <th className="text-left p-2">Class</th>
                        <th className="text-left p-2">Currency</th>
                        <th className="text-right p-2">Amount</th>
                      </>
                    )}
                    {activeTab !== 'profit' && (
                      <>
                        <th className="text-left p-2">Asset / Currency</th>
                        {activeTab === 'crypto' && <th className="text-left p-2">Network</th>}
                        {activeTab === 'fiat' && <th className="text-left p-2">Fund</th>}
                        {activeTab === 'fiat' && <th className="text-left p-2">Class</th>}
                        <th className="text-left p-2">Type</th>
                        <th className="text-right p-2">Amount</th>
                        <th className="text-right p-2">Status</th>
                      </>
                    )}
                    <th className="text-left p-2 hidden md:table-cell">Transaction ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, i) => (
                    <Row key={item._id} item={item} activeTab={activeTab} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// =========================== Row ===========================
function Row({ item, activeTab, index }) {
  if (activeTab === 'profit') {
    const flag = getCurrencyFlag(item.currency)
    return (
      <motion.tr
        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(index, 10) * 0.02 }}
        className="border-b border-sand-50/5 hover:bg-sand-50/3"
      >
        <td className="p-2 text-sand-50/70 whitespace-nowrap">
          {new Date(item.createdAt).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric',
          })},<br />
          <span className="text-sand-50/55 text-xs">
            {new Date(item.createdAt).toLocaleTimeString('en-GB')}
          </span>
        </td>
        <td className="p-2 text-sand-50 capitalize">{item.type}</td>
        <td className="p-2 text-sand-50/80 capitalize">{item?.fundId?.name || '—'}</td>
        <td className="p-2 text-sand-50/65 capitalize">{item?.classId?.class || '—'}</td>
        <td className="p-2 text-sand-50/80">
          <div className="inline-flex items-center gap-2">
            {flag && <img src={flag} alt={item.currency} className="w-5 h-3 object-cover rounded-sm" />}
            <span>{item.currency || '—'}</span>
          </div>
        </td>
        <td className={`p-2 text-right font-medium whitespace-nowrap ${
          item.type === 'profit' ? 'text-emerald-300' : 'text-rose-300'
        }`}>
          {item.type === 'profit' ? '+ ' : '- '}{Number(item.amount || 0).toFixed(2)}
        </td>
        <td className="p-2 text-sand-50/55 text-xs hidden md:table-cell font-mono">{item._id}</td>
      </motion.tr>
    )
  }

  // Crypto / Fiat
  const currencyFlag = getCurrencyFlag(item.currency)
  const assetFlag = getAssetFlag(item.asset)
  const flag = currencyFlag || assetFlag
  const tone = item.status === 0 ? 'amber' : item.status === 1 ? 'emerald' : 'rose'
  const statusLabel = item.status === 0 ? 'Pending' : item.status === 1 ? 'Completed' : 'Failed'

  return (
    <motion.tr
      initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index, 10) * 0.02 }}
      className="border-b border-sand-50/5 hover:bg-sand-50/3"
    >
      <td className="p-2 text-sand-50/70 whitespace-nowrap">
        {new Date(item.date).toLocaleDateString('en-GB', {
          day: '2-digit', month: 'short', year: 'numeric',
        })},<br />
        <span className="text-sand-50/55 text-xs">
          {new Date(item.date).toLocaleTimeString('en-GB')}
        </span>
      </td>
      <td className="p-2 text-sand-50">
        <div className="inline-flex items-center gap-2">
          {flag && (
            <img
              src={flag}
              alt={item.currency || item.asset}
              className="w-5 h-5 object-contain rounded-sm"
              onError={(e) => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <span>{item.currency || item.asset || '—'}</span>
        </div>
      </td>
      {activeTab === 'crypto' && (
        <td className="p-2 text-sand-50/70">{item.network || '—'}</td>
      )}
      {activeTab === 'fiat' && (
        <td className="p-2 text-sand-50/80">{item?.fundEnrollment?.fund?.name || '—'}</td>
      )}
      {activeTab === 'fiat' && (
        <td className="p-2 text-sand-50/65">{item?.fundEnrollment?.class?.class || '—'}</td>
      )}
      <td className="p-2 text-sand-50/80 capitalize">{item.type || '—'}</td>
      <td className={`p-2 text-right font-medium whitespace-nowrap ${
        item.type === 'Deposit' ? 'text-emerald-300' : 'text-sand-50'
      }`}>
        {Number(item.amount || 0).toFixed(2)}
      </td>
      <td className="p-2 text-right">
        <Pill tone={tone}>{statusLabel}</Pill>
      </td>
      <td className="p-2 text-sand-50/55 text-xs hidden md:table-cell font-mono">{item._id}</td>
    </motion.tr>
  )
}

// =========================== presentational helpers ===========================
function Pill({ tone, children }) {
  const cls = {
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    amber:   'bg-amber-500/10 text-amber-300 border-amber-500/20',
    rose:    'bg-rose-500/10 text-rose-300 border-rose-500/20',
  }[tone] || 'bg-sand-50/5 text-sand-50/70 border-sand-50/10'
  return <span className={`inline-block text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${cls}`}>{children}</span>
}

function TableSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-7 rounded bg-sand-50/5" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-10 rounded bg-sand-50/5 animate-pulse" style={{ animationDelay: `${i * 60}ms` }} />
      ))}
    </div>
  )
}

function MultiSelect({ label, placeholder = 'Any', options, value, onChange }) {
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

  const toggle = (opt) =>
    onChange(value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt])

  return (
    <div className="relative" ref={ref}>
      <label className="eyebrow block mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between gap-2 bg-ink-900 border rounded-lg px-2.5 py-2 text-sm text-sand-50 hover:border-gold-500/50 ${
          value.length ? 'border-gold-500/40' : 'border-sand-50/10'
        }`}
      >
        <span className={`min-w-0 flex-1 truncate text-left ${value.length ? 'text-sand-50' : 'text-sand-50/45'}`}>
          {value.length === 0 ? placeholder :
            value.length === 1 ? value[0] :
            `${value.length} selected`}
        </span>
        <ChevronDown size={14} className={`text-sand-50/60 transition-transform flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute z-30 mt-1 w-full max-h-60 overflow-auto card-glass py-1"
          >
            {options.length === 0 ? (
              <div className="px-3 py-3 text-xs text-sand-50/45 italic">No options available</div>
            ) : (
              <>
                {options.map((opt) => (
                  <label key={opt} className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gold-500/10 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value.includes(opt)}
                      onChange={() => toggle(opt)}
                      className="accent-gold-500 w-3.5 h-3.5"
                    />
                    <span className="text-sand-50/85 truncate">{opt}</span>
                  </label>
                ))}
                {value.length > 0 && (
                  <button
                    onClick={() => onChange([])}
                    className="w-full text-left px-3 py-2 text-xs text-gold-300 hover:bg-gold-500/10 border-t border-sand-50/8 mt-1"
                  >
                    Clear selection
                  </button>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
