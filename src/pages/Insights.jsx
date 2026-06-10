import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, X, Clock, Eye, Calendar } from 'lucide-react'
import SectionHeader from '../components/SectionHeader.jsx'
import AmbientBackdrop from '../components/AmbientBackdrop.jsx'

// Generic video briefings — strategy and platform overviews only.
// We intentionally do not identify any specific opportunity here.
const videos = [
  {
    id: 'v-platform-overview',
    title: 'Welcome to PQS — A Platform Overview',
    description: 'A concise overview of the PQS platform, our investor approach, and the three risk-segmented funds available to accredited investors.',
    category: 'Platform',
    duration: '4:12',
    views: '2.4K',
    date: 'Apr 2026',
    thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    featured: true
  },
  {
    id: 'v-fund-1-growth',
    title: 'Fund 1 — Orbit Macro Growth Fund Briefing',
    description: 'A walkthrough of the high-conviction growth strategy: position sizing, risk budget, and how upside is pursued without impairing the fund.',
    category: 'Strategy',
    duration: '6:48',
    views: '1.8K',
    date: 'Apr 2026',
    thumb: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 'v-fund-2-income',
    title: 'Fund 2 — Aurora Quant Income Fund Briefing',
    description: 'Inside the systematic income strategy — the rules-based process, diversification framework, and how distributions are targeted.',
    category: 'Strategy',
    duration: '5:21',
    views: '3.1K',
    date: 'Mar 2026',
    thumb: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
  },
  {
    id: 'v-fund-3-reserve',
    title: 'Fund 3 — Axis Digital Reserve Fund Briefing',
    description: 'How the conservative reserve fund preserves capital, maintains liquidity, and delivers modest, predictable returns.',
    category: 'Strategy',
    duration: '5:03',
    views: '1.1K',
    date: 'Jan 2026',
    thumb: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'v-investor-thesis',
    title: 'Capital Preservation First, Upside Second — The PQS Thesis',
    description: 'Why downside-first underwriting outperforms across cycles, and how risk discipline is the foundation of every PQS offering.',
    category: 'Strategy',
    duration: '8:18',
    views: '5.2K',
    date: 'Jan 2026',
    thumb: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
  },
  {
    id: 'v-onboarding-walkthrough',
    title: 'Stakeholder Walkthrough — From Account to Allocation',
    description: 'A step-by-step walkthrough of onboarding: account creation, KYC, accreditation, and subscribing to your chosen fund.',
    category: 'Platform',
    duration: '7:32',
    views: '2.9K',
    date: 'Feb 2026',
    thumb: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4'
  }
]

const categories = ['All', 'Platform', 'Strategy']

export default function Insights() {
  const [active, setActive] = useState(null)
  const [filter, setFilter] = useState('All')

  const featured = videos.find((v) => v.featured) || videos[0]
  const grid = videos.filter((v) => !v.featured && (filter === 'All' || v.category === filter))

  // Lock background scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [active])

  // Close on ESC
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setActive(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <AmbientBackdrop />
        <div className="container-page relative">
          <SectionHeader
            eyebrow="Insights · Video Library"
            title={<>Watch our <span className="gold-text">market briefings</span>.</>}
            subtitle="Facility walkthroughs, deal anatomies, sector commentary, and partner conversations — recorded by our investment team."
          />
        </div>
      </section>

      {/* Featured video */}
      <section className="container-page pb-12">
        <motion.button
          onClick={() => setActive(featured)}
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="block w-full text-left card-glass overflow-hidden grid lg:grid-cols-2 group cursor-pointer relative"
        >
          <div className="relative h-72 lg:h-auto overflow-hidden">
            <img src={featured.thumb} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-950/40 via-transparent to-ink-950" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="relative">
                <span className="absolute inset-0 rounded-full bg-gold-500/30 blur-xl animate-pulse" />
                <span className="relative w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 grid place-items-center text-ink-950 shadow-2xl shadow-gold-500/40 group-hover:scale-110 transition-transform duration-300">
                  <Play size={28} fill="currentColor" className="ml-1" />
                </span>
              </span>
            </div>
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-ink-950/70 border border-sand-50/15 text-[10px] uppercase tracking-widest text-gold-200">
              Featured · {featured.category}
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-ink-950/80 text-[11px] text-sand-50 inline-flex items-center gap-1">
              <Clock size={11} /> {featured.duration}
            </div>
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-xs text-sand-50/55">
              <span className="flex items-center gap-1"><Calendar size={11}/> {featured.date}</span>
              <span className="opacity-40">•</span>
              <span className="flex items-center gap-1"><Eye size={11}/> {featured.views} views</span>
            </div>
            <h3 className="mt-4 h-display text-3xl md:text-4xl leading-snug group-hover:text-gold-100 transition-colors">{featured.title}</h3>
            <p className="mt-4 text-sand-50/65 leading-relaxed">{featured.description}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-gold-300 group-hover:text-gold-200">
              <Play size={14} fill="currentColor"/> Watch now
            </span>
          </div>
        </motion.button>
      </section>

      {/* Filter pills */}
      <section className="container-page pb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button key={c} onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest whitespace-nowrap border transition-all ${
                filter === c
                  ? 'bg-gold-500/15 border-gold-500/40 text-gold-200'
                  : 'border-sand-50/10 text-sand-50/65 hover:text-sand-50 hover:border-sand-50/20'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Grid */}
      <section className="container-page pb-24">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {grid.map((v, i) => (
            <VideoCard key={v.id} video={v} index={i} onPlay={() => setActive(v)} />
          ))}
        </div>
        {grid.length === 0 && (
          <div className="text-center py-20 text-sand-50/55">No videos in this category yet.</div>
        )}
      </section>

      {/* Player modal */}
      <AnimatePresence>
        {active && <PlayerModal video={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </div>
  )
}

function VideoCard({ video, index, onPlay }) {
  return (
    <motion.button
      onClick={onPlay}
      initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }} transition={{ duration: 0.5, delay: index * 0.06 }}
      className="card-glass overflow-hidden lift-on-hover group text-left"
    >
      <div className="relative aspect-video overflow-hidden">
        <img src={video.thumb} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />

        {/* Play overlay */}
        <div className="absolute inset-0 grid place-items-center">
          <span className="w-14 h-14 rounded-full bg-ink-950/70 border border-gold-500/40 grid place-items-center text-gold-200 group-hover:bg-gold-500 group-hover:text-ink-950 group-hover:scale-110 transition-all duration-300">
            <Play size={20} fill="currentColor" className="ml-0.5" />
          </span>
        </div>

        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-ink-950/70 border border-sand-50/15 text-[10px] uppercase tracking-widest text-gold-200">
          {video.category}
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-ink-950/85 text-[11px] text-sand-50 inline-flex items-center gap-1 font-mono">
          <Clock size={10} /> {video.duration}
        </div>
      </div>
      <div className="p-5">
        <h4 className="font-display text-lg leading-snug group-hover:text-gold-200 transition-colors line-clamp-2">{video.title}</h4>
        <p className="mt-2 text-xs text-sand-50/60 leading-relaxed line-clamp-2">{video.description}</p>
        <div className="mt-4 pt-4 border-t border-sand-50/8 flex items-center justify-between text-[11px] text-sand-50/55">
          <span className="flex items-center gap-1"><Eye size={10}/> {video.views}</span>
          <span className="flex items-center gap-1"><Calendar size={10}/> {video.date}</span>
        </div>
      </div>
    </motion.button>
  )
}

function PlayerModal({ video, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] grid place-items-center p-4 md:p-8 bg-ink-950/85 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl card-glass overflow-hidden"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-ink-950/80 border border-sand-50/15 grid place-items-center text-sand-50 hover:text-gold-200 hover:border-gold-500/40 transition-all"
        >
          <X size={18} />
        </button>

        <div className="aspect-video bg-ink-950">
          <video
            src={video.src}
            poster={video.thumb}
            controls autoPlay
            className="w-full h-full"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-gold-300/80">
            <span>{video.category}</span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 text-sand-50/55"><Calendar size={11}/> {video.date}</span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 text-sand-50/55"><Eye size={11}/> {video.views} views</span>
            <span className="opacity-40">•</span>
            <span className="flex items-center gap-1 text-sand-50/55"><Clock size={11}/> {video.duration}</span>
          </div>
          <h3 className="mt-3 h-display text-2xl md:text-3xl leading-snug">{video.title}</h3>
          <p className="mt-3 text-sm text-sand-50/70 leading-relaxed">{video.description}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
