import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, TrendingUp, AlertTriangle, Send, RefreshCw, Bot, ChevronRight } from 'lucide-react'
import { PanelCard, AIInsightCard, Sparkline } from '../../../components/dashboard/widgets.jsx'

const aiCards = [
  { tag: 'Fund 1 · Growth',  title: 'Macro tailwinds firming for the growth book',
    body: 'Composite signals across the high-conviction macro positions in Orbit Macro Growth Fund have improved week-over-week. Position sizing remains within mandated risk limits.',
    impact: 'Positive', delta: '+3.2%' },
  { tag: 'Fund 2 · Income',  title: 'Yield spreads stable on the income book',
    body: 'The diversified yield-bearing portfolio in Aurora Quant Income Fund shows steady distribution coverage. No material drift in target distribution profile.',
    impact: 'Neutral', delta: 'flat' },
  { tag: 'Fund 3 · Reserve', title: 'Reserve liquidity buffer above target',
    body: 'Axis Digital Reserve Fund liquidity buffer remains above its target band — preserving optionality for opportunistic deployment if dislocations appear.',
    impact: 'Positive', delta: '+1.4%' },
  { tag: 'Toronto · Note',   title: 'Toronto position update available',
    body: 'A Toronto position note has been published to the platform — open the messages section in your dashboard for the latest update.',
    impact: 'Neutral', delta: '—' },
  { tag: 'Macro',            title: 'Conservative banking environment continues',
    body: 'Recent commentary suggests continued tight underwriting. Constructive backdrop for the conservative reserve allocation.',
    impact: 'Neutral', delta: '—' },
  { tag: 'Risk',             title: 'Quarterly risk review window opens',
    body: 'The next quarterly risk review begins shortly. Review your allocations against your stated mandate before submitting changes.',
    impact: 'Watch', delta: '—' }
]

const suggestedQuestions = [
  'What is my expected return if I add $200K to Fund 1?',
  'Compare distribution profiles between Fund 2 and Fund 3.',
  'How is my portfolio split across the three funds?',
  'Summarize the latest investor message in three bullet points.'
]

export default function InvestorInsights() {
  const [chat, setChat] = useState([
    { role: 'ai', text: "Hello — I'm your AI portfolio analyst. Ask me about returns, allocations, fund mechanics, or recent market movements. I'll respond using your portfolio context." }
  ])
  const [input, setInput] = useState('')
  const [thinking, setThinking] = useState(false)

  const send = (text) => {
    if (!text.trim()) return
    const userMsg = { role: 'user', text }
    setChat((c) => [...c, userMsg])
    setInput('')
    setThinking(true)
    // Simulated AI response — would call Claude/OpenAI in production.
    setTimeout(() => {
      setChat((c) => [...c, { role: 'ai', text: simulateAIResponse(text) }])
      setThinking(false)
    }, 900)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="font-display text-2xl flex items-center gap-2">
            AI Market Insights <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-200">Beta</span>
          </h2>
          <p className="text-sm text-sand-50/60 mt-1">Patient-driven and market data signals — analyzed in your portfolio context.</p>
        </div>
        <button className="btn-ghost text-xs py-2"><RefreshCw size={14}/> Refresh feed</button>
      </div>

      {/* AI sentiment summary */}
      <div className="grid lg:grid-cols-3 gap-5">
        <PanelCard className="lg:col-span-2" eyebrow="Portfolio Sentiment" title="Composite signal — 30 day" accent>
          <Sparkline data={[55, 58, 56, 62, 65, 68, 64, 70, 72, 75, 73, 78]} color="#10b981" />
          <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-sand-50/8">
            <SentimentStat label="Overall" value="+78" subtitle="Bullish" />
            <SentimentStat label="Income" value="+71" subtitle="Constructive" />
            <SentimentStat label="Reserve" value="+82" subtitle="Stable" />
          </div>
        </PanelCard>
        <PanelCard eyebrow="AI Coverage" title="">
          <ul className="space-y-3 text-sm">
            {[
              { l: 'Funds analyzed', v: '3 / 3' },
              { l: 'Data sources', v: '23' },
              { l: 'Last refreshed', v: '2 min ago' },
              { l: 'Confidence (avg)', v: '94%' }
            ].map((s) => (
              <li key={s.l} className="flex items-center justify-between border-b border-sand-50/8 last:border-0 pb-2 last:pb-0">
                <span className="text-sand-50/60">{s.l}</span>
                <span className="text-sand-50">{s.v}</span>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      {/* AI cards grid */}
      <PanelCard eyebrow="Insights" title="Latest signals">
        <div className="grid md:grid-cols-2 gap-4">
          {aiCards.map((c, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              className="card-glass p-5 lift-on-hover relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gold-500/8 blur-2xl" />
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[10px] uppercase tracking-widest text-gold-300/80">{c.tag}</div>
                  <ImpactBadge impact={c.impact} delta={c.delta} />
                </div>
                <div className="font-display text-lg text-sand-50">{c.title}</div>
                <p className="mt-2 text-sm text-sand-50/65 leading-relaxed">{c.body}</p>
                <button className="mt-3 text-xs text-gold-300 hover:text-gold-200 inline-flex items-center gap-1">
                  Read full analysis <ChevronRight size={12}/>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </PanelCard>

      {/* AI Chat */}
      <PanelCard eyebrow="Ask the analyst" title="">
        <div className="space-y-4">
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {chat.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 grid place-items-center ${
                  m.role === 'ai' ? 'bg-gold-500/15 border border-gold-500/30 text-gold-300' : 'bg-ink-700 border border-sand-50/10 text-sand-50/70'
                }`}>
                  {m.role === 'ai' ? <Bot size={14}/> : <span className="text-xs font-display">You</span>}
                </div>
                <div className={`flex-1 px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  m.role === 'ai' ? 'bg-ink-900 border border-sand-50/8 text-sand-50/85' : 'bg-gold-500/10 border border-gold-500/20 text-sand-50/90'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {thinking && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gold-500/15 border border-gold-500/30 grid place-items-center text-gold-300">
                  <Bot size={14}/>
                </div>
                <div className="px-4 py-3 rounded-2xl bg-ink-900 border border-sand-50/8 text-sand-50/65 text-sm">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </span>
                </div>
              </div>
            )}
          </div>

          {chat.length <= 1 && (
            <div className="grid sm:grid-cols-2 gap-2">
              {suggestedQuestions.map((q) => (
                <button key={q} onClick={() => send(q)}
                  className="text-left text-xs text-sand-50/70 hover:text-gold-200 border border-sand-50/8 hover:border-gold-500/40 rounded-lg px-3 py-2 transition-all"
                >
                  <Sparkles size={11} className="inline text-gold-300 mr-1.5" /> {q}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={(e) => { e.preventDefault(); send(input) }} className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your portfolio, returns, or market signals…"
              className="flex-1 bg-ink-900 border border-sand-50/10 rounded-full px-5 py-3 text-sm text-sand-50 placeholder:text-sand-50/40 focus:outline-none focus:border-gold-500/50" />
            <button type="submit" disabled={!input.trim()} className="btn-primary disabled:opacity-40 px-5 py-3"><Send size={14}/></button>
          </form>
        </div>
      </PanelCard>
    </div>
  )
}

function ImpactBadge({ impact, delta }) {
  const map = {
    Positive: { cls: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300', icon: TrendingUp },
    Neutral:  { cls: 'bg-sand-50/8 border-sand-50/15 text-sand-50/70',           icon: Sparkles },
    Watch:    { cls: 'bg-amber-500/15 border-amber-500/30 text-amber-300',       icon: AlertTriangle }
  }
  const m = map[impact] || map.Neutral
  const Icon = m.icon
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border ${m.cls}`}>
      <Icon size={10} /> {delta}
    </span>
  )
}

function SentimentStat({ label, value, subtitle }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      <div className="font-display text-2xl text-emerald-300 mt-1">{value}</div>
      <div className="text-xs text-sand-50/55">{subtitle}</div>
    </div>
  )
}

function simulateAIResponse(question) {
  const q = question.toLowerCase()
  if (q.includes('return') && q.includes('fund 1')) return 'Adding $200K to Fund 1 (Orbit Macro Growth) at the current entry NAV would lift your weighted return by an estimated 120bps, assuming the fund continues at its model trajectory. This also shifts your allocation toward the higher-volatility growth book — review your mandate before confirming.'
  if (q.includes('fund 2') && q.includes('fund 3')) return 'Fund 2 (Aurora Quant Income) targets steady distributions from a diversified yield-bearing book. Fund 3 (Axis Digital Reserve) prioritises capital preservation and liquidity over distributions. Fund 2 has more income; Fund 3 has more stability.'
  if (q.includes('split') || q.includes('allocation')) return 'Your portfolio is currently split across all three funds. The allocation panel on your overview shows the precise weights — open it to view percentages and rebalance options.'
  if (q.includes('message') || q.includes('letter')) return 'Latest investor messages are published to the messages section of your dashboard. Open Notifications from the sidebar to view full details.'
  return "Based on your current portfolio mix and recent platform signals, I'd suggest reviewing the latest insight cards above. Want me to draft a rebalance proposal aligned to your mandate?"
}
