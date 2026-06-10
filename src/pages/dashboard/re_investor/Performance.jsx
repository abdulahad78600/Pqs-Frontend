import { TrendingUp, Wallet, Percent, Building } from 'lucide-react'
import { StatCard, PanelCard, Sparkline, ProgressBar } from '../../../components/dashboard/widgets.jsx'

export default function REPerformance() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl">Performance</h2>
        <p className="text-sm text-sand-50/60 mt-1">NAV trajectory, distributions, and yield metrics for the PQS Real Estate Fund.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Fund NAV"          value="$1.42B" icon={Wallet} />
        <StatCard label="YTD return"        value="+11.8%" icon={TrendingUp} accent="emerald" />
        <StatCard label="Distribution yield"value="6.4%"   icon={Percent} accent="emerald" />
        <StatCard label="Properties"        value="42"     icon={Building} />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <PanelCard className="lg:col-span-2" eyebrow="NAV trajectory" title="Trailing 12 months" accent>
          <Sparkline data={[100, 102, 105, 104, 108, 111, 110, 114, 118, 117, 121, 124]} />
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-sand-50/8">
            <Cell label="Starting NAV" value="$1.27B" />
            <Cell label="Net inflows"  value="$48M" tone="emerald" />
            <Cell label="Capital returned" value="$96M" />
          </div>
        </PanelCard>

        <PanelCard eyebrow="Mix" title="Asset class allocation">
          <div className="space-y-4">
            <ProgressBar label="Residential" value={38} suffix="%" />
            <ProgressBar label="Office"      value={24} suffix="%" />
            <ProgressBar label="Industrial"  value={22} suffix="%" />
            <ProgressBar label="Mixed-use"   value={16} suffix="%" />
          </div>
        </PanelCard>
      </div>
    </div>
  )
}

function Cell({ label, value, tone }) {
  const c = tone === 'emerald' ? 'text-emerald-300' : 'text-sand-50'
  return (
    <div>
      <div className="text-[10px] uppercase tracking-widest text-sand-50/45">{label}</div>
      <div className={`mt-0.5 font-display text-base ${c}`}>{value}</div>
    </div>
  )
}
