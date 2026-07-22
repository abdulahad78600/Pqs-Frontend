// Single source of truth for every fund offering.
// One live fund plus three roadmap / inactive funds, segmented by risk profile:
//   Fund 1 — Orbit Macro Growth Fund          — High risk
//   Fund 2 — Aurora Quant Income Fund          — Moderate risk
//   Fund 3 — PQS Axis Digital Reserve Fund SP1 — Conservative risk (asset-backed RE, Toronto)
//   Fund 4 — Orbit Macro Growth Fund SP1       — High risk (coming soon, regulated production)

export const funds = [
  // ─────────────────────────────────────────────────────────────
  // FUND 1 — Orbit Macro Growth Fund (High risk)
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'orbit-marco-growth-fund',
    fundNumber: 'Fund 1',
    category: 'Orbit Macro Growth Fund',
    name: 'Orbit Macro Growth Fund',
    isLive: false,
    tagline:
      'Concentrated, conviction-led exposure to global macro themes — engineered for investors who want meaningful upside and accept commensurate volatility.',
    location: 'Global',
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-emerald-500/20',
    accentTo: 'to-gold-500/10',

    // ── Summary card ──
    riskProfile: 'High',
    riskLevel: 5,
    returns:
      'Annualized dividend with primary upside from equity-value growth and selective tactical positions.',
    dividends:
      'Variable. Distributions depend on realisations and prevailing market conditions.',
    fundDetailsIntro:
      'Orbit Macro Growth Fund seeks asymmetric returns by concentrating capital in a small number of high-conviction macro themes — sized for investors comfortable with elevated volatility in pursuit of meaningful upside.',

    horizon: '5–7 yrs',
    minimum: '$1M+',
    targetDividend: 'Variable',

    facilityAttributes: [
      'High-conviction, concentrated portfolio of macro and growth-oriented positions.',
      'Disciplined risk budgeting — sized so a single position cannot impair the fund.',
      'Active management with monthly rebalancing windows.',
      'Independent third-party administration and reporting.',
      'Designed for accredited investors with a long horizon and high risk tolerance.'
    ],
    facilityClosing:
      'The fund is owned and operated under the manager\'s mandate, pursuant to the private placement memorandum herein.',

    profileTeaser:
      'A concentrated, high-conviction growth strategy designed for investors who can accept volatility in pursuit of asymmetric upside.',

    profileOverview: [
      'Orbit Macro Growth Fund pursues asymmetric returns through a small, high-conviction book of macro and growth-oriented positions.',
      'Capital is allocated where the manager has the strongest fundamental, structural, or thematic edge — and sized so individual outcomes do not impair the fund.',
      'The strategy is intentionally concentrated: investors should expect periods of elevated volatility, balanced by the potential for meaningful upside over a multi-year horizon.'
    ],

    investmentHighlights: [
      {
        title: 'Conviction-Led Allocation',
        bullets: [
          'Small number of positions, each underwritten with a clear thesis and exit path.',
          'Capital concentrated where the manager has the strongest edge.',
          'Position sizing keeps any single outcome from impairing the fund.'
        ]
      },
      {
        title: 'Asymmetric Return Profile',
        bullets: [
          'Designed for meaningful upside over a multi-year horizon.',
          'Volatility accepted as the cost of pursuing that upside.',
          'Suited to investors with long horizons and high risk tolerance.'
        ]
      },
      {
        title: 'Disciplined Risk Framework',
        bullets: [
          'Hard limits on position size, sector weights, and drawdown thresholds.',
          'Monthly rebalancing windows with documented review.',
          'Independent administrator and third-party reporting.'
        ]
      }
    ],

    tam: [
      { label: 'Strategy', headline: 'Macro Growth', bullets: ['Concentrated, high-conviction book.'] },
      { label: 'Risk Budget', headline: 'High', bullets: ['Volatility expected; sized so no single position impairs the fund.'] },
      { label: 'Horizon', headline: '5–7 yrs', bullets: ['Long-duration capital appropriate for the strategy.'] },
      { label: 'Liquidity', headline: 'Quarterly', bullets: ['Subject to standard notice periods.'] }
    ],
    combinedTam: 'High Upside',
    combinedTamSub:
      'Concentrated growth exposure for investors prepared to accept volatility in pursuit of meaningful upside.',

    regulatoryStrengths: [
      { title: 'Independent Administration', body: 'Third-party fund administration and audited NAV reporting.' },
      { title: 'Documented Mandate', body: 'Strategy, limits, and risk framework defined in the PPM.' },
      { title: 'Accredited-Only', body: 'Subscription restricted to accredited investors with full KYC.' },
      { title: 'Aligned Sponsorship', body: 'Manager invests alongside investors in the strategy.' }
    ],

    verticals: [
      {
        t: 'Private Equity',
        points: [
          'Growth capital, buyouts, recapitalizations',
          'Minority and control investments',
          'Structured equity and hybrid securities'
        ]
      },
      {
        t: 'Pharmaceutical & Life Sciences',
        points: [
          'Royalties, licensing, structured financing',
          'Exposure to regulated healthcare assets via compliant structures'
        ]
      }
    ],

    conclusion:
      'Orbit Macro Growth Fund is built for investors who want concentrated, conviction-led exposure to macro and growth themes — and who understand that meaningful upside is paired with elevated volatility.',

    // ── Fact-sheet data (used by the downloadable PDF) ──
    factSheet: {
      // Distinct emerald/gold accent for the PDF chrome.
      accentHex: '#10B981',
      asOf: 'Q1 2026',
      strategyType: 'Global Macro · Growth Equity',
      domicile: 'Cayman Islands SPC',
      shareClass: 'Class A Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Monthly',
      redemptionFreq: 'Quarterly, 90-day notice',
      lockup: '12 months',
      managementFee: '2.00% per annum of NAV',
      performanceFee: '20% above 6% hurdle, high-water mark',
      benchmark: 'MSCI ACWI (reference only)',
      targetIrr: '15% – 22% net',
      targetCashYield: 'Variable',
      leverageCap: 'Up to 1.5× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 prime brokerage',
      governingLaw: 'Cayman Islands',
      // Indicative allocation — used for the pie / table in the PDF.
      allocation: [
        { label: 'Macro Equity (Long)',  weight: 45 },
        { label: 'Thematic / Sector',    weight: 25 },
        { label: 'Special Situations',   weight: 15 },
        { label: 'Hedges & Overlays',    weight: 10 },
        { label: 'Cash & Equivalents',   weight:  5 }
      ],
      // Synthetic / indicative monthly track for the spark chart.
      indicativeTrack: [100, 102.4, 101.1, 104.8, 107.2, 105.6, 109.4, 112.1, 110.8, 114.6, 117.9, 121.3],
      keyRisks: [
        'Concentration risk — small number of high-conviction positions.',
        'Market and volatility risk in macro and growth-oriented assets.',
        'Leverage may amplify both gains and losses.',
        'Liquidity windows are limited; capital is long-duration.'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // FUND 2 — Aurora Quant Income Fund (Moderate risk)
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'aurora-quant-income-fund',
    fundNumber: 'Fund 2',
    category: 'Aurora Quant Income Fund',
    name: 'Aurora Quant Income Fund',
    isLive: false,
    tagline:
      'A systematic, income-oriented strategy targeting steady distributions and balanced growth across diversified positions.',
    location: 'Global',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-sky-500/20',
    accentTo: 'to-gold-500/10',

    riskProfile: 'Moderate',
    riskLevel: 3,
    returns:
      'Steady distributions targeted from yield-bearing positions, with balanced upside from disciplined exposure to growth.',
    dividends: 'Targeted regular distributions — subject to performance and market conditions.',
    fundDetailsIntro:
      'Aurora Quant Income Fund applies a systematic, rules-based process to assemble a diversified, income-oriented portfolio engineered for steady distributions and balanced growth.',

    horizon: '3–5 yrs',
    minimum: '$1,000,000',
    targetDividend: 'Targeted',

    facilityAttributes: [
      'Systematic, rules-based portfolio construction.',
      'Diversified across yield-bearing positions to smooth distributions.',
      'Balanced exposure between income generation and capital growth.',
      'Independent administrator, audited NAV, and quarterly reporting.',
      'Designed for investors seeking moderate risk and a steady distribution profile.'
    ],
    facilityClosing:
      'The fund is owned and operated under the manager\'s mandate, pursuant to the private placement memorandum herein.',

    profileTeaser:
      'A systematic, income-oriented strategy combining steady distributions with balanced exposure to growth.',

    profileOverview: [
      'Aurora Quant Income Fund is built around a rules-based investment process, removing discretionary noise and embedding consistent risk controls into every allocation.',
      'The portfolio is diversified across multiple yield-bearing positions, smoothing distributions and reducing the impact of any single underperforming line.',
      'It is designed for investors who want a steady income profile alongside measured growth — without taking on the volatility of a concentrated strategy.'
    ],

    investmentHighlights: [
      {
        title: 'Systematic Process',
        bullets: [
          'Rules-based portfolio construction with documented signals.',
          'Removes discretionary bias from allocation decisions.',
          'Embedded risk controls applied consistently across positions.'
        ]
      },
      {
        title: 'Income First',
        bullets: [
          'Portfolio weighted toward yield-bearing positions.',
          'Targeted regular distributions for investors seeking cash flow.',
          'Diversification reduces reliance on any single position for income.'
        ]
      },
      {
        title: 'Balanced Growth',
        bullets: [
          'Measured exposure to growth complements the income engine.',
          'Sized to enhance returns without distorting the risk profile.',
          'Quarterly review keeps the income/growth balance on target.'
        ]
      }
    ],

    tam: [
      { label: 'Strategy', headline: 'Systematic Income', bullets: ['Rules-based, diversified, income-oriented book.'] },
      { label: 'Risk Profile', headline: 'Moderate', bullets: ['Diversification reduces concentration and tail risk.'] },
      { label: 'Distributions', headline: 'Targeted', bullets: ['Regular distributions targeted from yield-bearing positions.'] },
      { label: 'Liquidity', headline: 'Quarterly', bullets: ['Subject to standard notice periods.'] }
    ],
    combinedTam: 'Steady Income',
    combinedTamSub:
      'Diversified, systematic income with measured growth — for investors who want cash flow and balanced exposure.',

    regulatoryStrengths: [
      { title: 'Documented Process', body: 'Rules and risk controls defined in the PPM and applied consistently.' },
      { title: 'Independent Administration', body: 'Third-party fund administration and audited NAV reporting.' },
      { title: 'Accredited-Only', body: 'Subscription restricted to accredited investors with full KYC.' },
      { title: 'Quarterly Reporting', body: 'Regular performance and attribution reporting to all investors.' }
    ],

    verticals: [
      {
        t: 'Real Assets & Development',
        points: [
          'Residential, commercial, industrial and mixed-use developments',
          'Investments across full lifecycle (land to stabilization)',
          'Equity, mezzanine, and debt structures'
        ]
      },
      {
        t: 'Regulated Alternative Sectors',
        points: [
          'Asset-backed investments in regulated agricultural and wellness sectors',
          'Focus on secured, compliance-driven structures'
        ]
      }
    ],

    conclusion:
      'Aurora Quant Income Fund offers a disciplined, systematic approach to income — diversified, balanced, and built for investors who value consistency.',

    factSheet: {
      accentHex: '#38BDF8',
      asOf: 'Q1 2026',
      strategyType: 'Systematic Multi-Asset Income',
      domicile: 'Cayman Islands SPC',
      shareClass: 'Class B Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Monthly',
      redemptionFreq: 'Quarterly, 60-day notice',
      lockup: '6 months',
      managementFee: '1.25% per annum of NAV',
      performanceFee: '15% above 5% hurdle, high-water mark',
      benchmark: 'Bloomberg Multi-Asset Income (reference only)',
      targetIrr: '8% – 12% net',
      targetCashYield: '6% – 8% distributed quarterly',
      leverageCap: 'Up to 1.0× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 custodian network',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Investment-Grade Credit', weight: 30 },
        { label: 'High-Yield / Structured', weight: 20 },
        { label: 'Dividend Equity',          weight: 20 },
        { label: 'Real Assets',              weight: 15 },
        { label: 'Alternatives',             weight: 10 },
        { label: 'Cash & Equivalents',       weight:  5 }
      ],
      indicativeTrack: [100, 100.7, 101.5, 102.1, 102.9, 103.4, 104.1, 104.9, 105.5, 106.2, 106.9, 107.6],
      keyRisks: [
        'Interest rate and credit spread risk across income positions.',
        'Model risk — systematic signals may underperform in regime change.',
        'Distribution targets are not guaranteed.',
        'Currency exposure if subscribing in non-USD share class.'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // FUND 3 — PQS Axis Digital Reserve Fund SP1 (Conservative risk)
  // A segregated portfolio of PQS Fund SPC. Underlying asset: an
  // institutional-grade (AA+) development asset in Toronto, Ontario, Canada.
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'axis-digital-reserve-fund',
    fundNumber: 'Fund 3',
    category: 'PQS Axis Digital Reserve Fund SP1',
    name: 'PQS Axis Digital Reserve Fund SP1',
    isLive: true,
    subName: 'Segregated Portfolio One (SP1)',
    cusip: 'G7S14W 101',
    isin: 'KYG7S14W1016',
    tagline:
      'A Canadian real estate-backed investment vehicle secured by a strategically positioned development asset in Toronto, Ontario — hard-asset collateralization with long-term development upside.',
    location: 'Toronto, Ontario, Canada',
    image:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-indigo-500/20',
    accentTo: 'to-gold-500/10',

    riskProfile: 'Conservative',
    riskLevel: 1,
    assetGrade: 'AA+',
    returns: 'Downside protection through hard-asset collateralization, with future appreciation through planned development and intensification.',
    dividends: 'Conservative distributions — calibrated to preserve capital first, supported by tangible Canadian real estate.',
    fundDetailsIntro:
      'The Fund presents investors with a rare opportunity to participate in a Canadian real estate-backed investment vehicle secured by a strategically positioned development asset in Toronto, Ontario, Canada. The investment structure is centered around preserving downside protection through hard-asset collateralization, while simultaneously positioning investors to benefit from significant future appreciation through planned development and intensification. Unlike speculative ventures reliant solely on projected business performance, this opportunity is fundamentally supported by a tangible Canadian real estate asset located in one of North America\'s most stable and resilient property markets.',

    horizon: '5–10 yrs',
    minimum: '$1M',
    targetDividend: '5–10% (anticipated)',

    facilityAttributes: [
      'Asset preservation as the first principle — secured against a tangible Canadian real estate asset.',
      'Security of Canadian collateral in one of North America\'s most stable and resilient property markets.',
      'Conservative structuring focused on protecting downside.',
      'Long-term development upside through planned development and intensification.',
      'Institutional-grade (AA+) real estate fundamentals in Toronto, Ontario.'
    ],
    facilityClosing:
      'The fund is owned and operated under the manager\'s mandate, pursuant to the private placement memorandum herein.',

    profileTeaser:
      'A capital-preservation-first strategy secured by a strategically positioned Toronto development asset, with hard-asset collateralization and long-term development upside.',

    profileOverview: [
      'PQS Axis Digital Reserve Fund SP1 offers investors participation in a Canadian real estate-backed vehicle secured by a strategically positioned development asset in Toronto, Ontario.',
      'The structure preserves downside protection through hard-asset collateralization, while positioning investors to benefit from future appreciation through planned development and intensification.',
      'Unlike speculative ventures reliant solely on projected business performance, the opportunity is fundamentally supported by a tangible Canadian real estate asset in one of North America\'s most stable property markets.'
    ],

    investmentHighlights: [
      {
        title: 'Asset Preservation',
        bullets: [
          'Secured by a tangible Canadian real estate asset — not projected business performance.',
          'Hard-asset collateralization preserves downside protection.',
          'Institutional-grade (AA+) real estate fundamentals.'
        ]
      },
      {
        title: 'Security of Canadian Collateral',
        bullets: [
          'Strategically positioned development asset in Toronto, Ontario.',
          'One of North America\'s most stable and resilient property markets.',
          'Conservative structuring centered on protecting capital.'
        ]
      },
      {
        title: 'Long-Term Development Upside',
        bullets: [
          'Future appreciation through planned development and intensification.',
          'Conservative loan-to-value preserves land security.',
          '5–10 year horizon appropriate for development value creation.'
        ]
      }
    ],

    tam: [
      { label: 'Strategy', headline: 'Asset-Backed RE', bullets: ['Toronto, Ontario development asset.'] },
      { label: 'Asset Grade', headline: 'AA+', bullets: ['Institutional-grade Canadian real estate fundamentals.'] },
      { label: 'Risk Profile', headline: 'Conservative', bullets: ['Preservation prioritised; hard-asset collateralization.'] },
      { label: 'Horizon', headline: '5–10 yrs', bullets: ['Long-duration capital appropriate for development.'] }
    ],
    combinedTam: 'Hard-Asset Backed',
    combinedTamSub:
      'A conservative Canadian real estate-backed strategy — capital preservation through hard-asset collateralization with long-term development upside.',

    regulatoryStrengths: [
      { title: 'Segregated Portfolio', body: 'Established under PQS Fund SPC, a Cayman Islands Segregated Portfolio Company.' },
      { title: 'Hard-Asset Collateral', body: 'Secured against a tangible Canadian real estate asset in Toronto, Ontario.' },
      { title: 'Conservative Mandate', body: 'Preservation-first mandate with conservative structuring in the PPM.' },
      { title: 'Accredited-Only', body: 'Subscription restricted to accredited investors with full KYC.' }
    ],

    verticals: [
      {
        t: 'Real Assets & Development',
        points: [
          'Strategically positioned Toronto development asset',
          'Planned development and intensification',
          'Hard-asset collateralized financing structures'
        ]
      }
    ],

    conclusion:
      'PQS Axis Digital Reserve Fund SP1 combines asset preservation, the security of Canadian collateral, conservative structuring, long-term development upside, and institutional-grade real estate fundamentals — a conservative anchor backed by tangible Canadian real estate.',

    factSheet: {
      accentHex: '#818CF8',
      asOf: 'Q1 2026',
      cusip: 'G7S14W 101',
      isin: 'KYG7S14W1016',
      strategyType: 'Asset-Backed Real Estate · Capital Preservation',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD / CAD (GBP, EUR on approval)',
      subscriptionFreq: 'Periodic, subject to Fund approval',
      redemptionFreq: 'Limited; aligned to development horizon',
      lockup: 'Aligned to 5–10 yr horizon',
      managementFee: '0.75% per annum of NAV',
      performanceFee: 'None',
      benchmark: 'Toronto urban real estate (reference only)',
      targetIrr: '5% – 10% net (anticipated)',
      targetCashYield: '5% – 10% (anticipated)',
      leverageCap: 'Conservative loan-to-value',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'International / Canadian banking institution(s)',
      governingLaw: 'Cayman Islands (subject to Canadian RE & securities regulation)',
      pdfUrl: '/folders/PQS_Asset_Backed_Fund_SP1_Fact_Sheet.pdf',
      allocation: [
        { label: 'Acquisition & Closing',     weight: 50 },
        { label: 'Development & Intensification', weight: 25 },
        { label: 'Reserves',                   weight: 15 },
        { label: 'Working Capital',            weight: 10 }
      ],
      indicativeTrack: [100, 100.4, 100.9, 101.5, 102.1, 102.8, 103.6, 104.3, 105.1, 106.0, 106.9, 107.8],
      keyRisks: [
        'Real estate market, financing and interest-rate risk.',
        'Zoning, entitlement and development risk on the Toronto asset.',
        'Returns are anticipated, not guaranteed.',
        'Illiquidity — redemptions aligned to a 5–10 year development horizon.'
      ]
    }
  },

  // ─────────────────────────────────────────────────────────────
  // FUND 4 — Orbit Macro Growth Fund SP1 (Coming soon)
  // A segregated portfolio of PQS Fund SPC. A vertically integrated
  // manufacturing, processing, extraction, bottling, packaging and
  // distribution platform for premium oil-based products in regulated markets.
  // ─────────────────────────────────────────────────────────────
  {
    slug: 'orbit-macro-growth-fund-sp1',
    fundNumber: 'Fund 4',
    category: 'Orbit Macro Growth Fund SP1',
    name: 'Orbit Macro Growth Fund SP1',
    isLive: false,
    subName: 'Segregated Portfolio One (SP1)',
    comingSoon: true,
    cusip: 'Coming soon',
    isin: 'Coming soon',
    tagline:
      'A vertically integrated manufacturing, processing, extraction, bottling, packaging and distribution platform producing premium oil-based products for regulated markets.',
    location: 'North America · International',
    image:
      'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-emerald-500/20',
    accentTo: 'to-gold-500/10',

    // ── Summary card ──
    riskProfile: 'High',
    riskLevel: 5,
    returns:
      'High-margin returns generated across every stage of the value chain — processing, extraction, manufacturing, packaging and distribution.',
    dividends:
      'Class A Shares — 20% buyout premium. Class B Shares — 30% buyout premium.',
    fundDetailsIntro:
      'Orbit Macro Growth Fund SP1 is a vertically integrated manufacturing, processing, extraction, bottling, packaging, and distribution platform focused on producing premium oil-based products for regulated markets. Utilizing a patent-pending extraction technology, our facilities will process regulated flower from both third-party licensed cultivators and our own licensed operations, converting raw biomass into high-quality oil with superior yield, purity, and terpene retention. Through a toll-processing model, cultivators gain access to advanced extraction capabilities without the significant capital investment typically required, while we secure a cost-effective supply of premium oil for downstream manufacturing and distribution.',

    horizon: '2–3 yrs',
    minimum: '$1M (Class A) · $5M (Class B)',
    targetDividend: '8–12% (anticipated)',

    // ── Subscription tiers (Class A / Class B) ──
    shareClasses: [
      { name: 'Class A', minimum: '$1M', premium: '20% buyout premium' },
      { name: 'Class B', minimum: '$5M', premium: '30% buyout premium' }
    ],

    facilityAttributes: [
      'Vertically integrated: extraction, formulation, filling, bottling, packaging, white-label manufacturing, and wholesale distribution.',
      'Patent-pending extraction technology delivering superior yield, purity, and terpene retention.',
      'Toll-processing model gives cultivators advanced extraction without heavy capital investment.',
      'Cost-effective supply of premium oil secured for downstream manufacturing and distribution.',
      'Scalable, high-margin production platform serving North American and international regulated markets.'
    ],
    facilityClosing:
      'The fund is owned and operated under the manager\'s mandate, pursuant to the private placement memorandum herein.',

    profileTeaser:
      'A fully integrated production platform — from regulated biomass to finished premium oil-based consumer products — generating revenue across every stage of the value chain.',

    profileOverview: [
      'Orbit Macro Growth Fund SP1 is a vertically integrated platform producing premium oil-based products for regulated markets, using patent-pending extraction technology to convert raw biomass into high-quality oil with superior yield, purity, and terpene retention.',
      'Facilities process regulated flower from third-party licensed cultivators and the fund\'s own licensed operations; a toll-processing model gives cultivators access to advanced extraction without significant capital investment while securing a cost-effective oil supply for downstream manufacturing.',
      'Operating as fully integrated production hubs, the facilities provide extraction, formulation, filling, bottling, packaging, white-label manufacturing and wholesale distribution — producing bulk oil and finished consumer products for the fund\'s own brands and third-party clients across North American and international regulated markets.'
    ],

    investmentHighlights: [
      {
        title: 'Vertical Integration',
        bullets: [
          'Revenue captured across processing, extraction, manufacturing, packaging and distribution.',
          'Fully integrated production hubs from biomass to finished consumer products.',
          'Own brands plus white-label manufacturing for third-party clients.'
        ]
      },
      {
        title: 'Proprietary Extraction',
        bullets: [
          'Patent-pending extraction technology with superior yield, purity and terpene retention.',
          'Toll-processing model secures cost-effective premium oil supply.',
          'Cultivators gain advanced extraction without heavy capital outlay.'
        ]
      },
      {
        title: 'Scalable, High-Margin Platform',
        bullets: [
          'Positioned as a scalable, high-margin production platform.',
          'Serves both North American and international regulated markets.',
          'Class A (20%) and Class B (30%) buyout premiums for subscribers.'
        ]
      }
    ],

    tam: [
      { label: 'Strategy', headline: 'Vertically Integrated', bullets: ['Extraction through distribution platform.'] },
      { label: 'Technology', headline: 'Patent-Pending', bullets: ['Superior yield, purity and terpene retention.'] },
      { label: 'Horizon', headline: '2–3 yrs', bullets: ['Buyout-driven exit profile.'] },
      { label: 'Markets', headline: 'NA + Intl', bullets: ['Regulated North American and international markets.'] }
    ],
    combinedTam: 'Full Value Chain',
    combinedTamSub:
      'Revenue across every stage — from processing and extraction through manufacturing, packaging and distribution — for regulated North American and international markets.',

    regulatoryStrengths: [
      { title: 'Segregated Portfolio', body: 'Established under PQS Fund SPC, a Cayman Islands Segregated Portfolio Company.' },
      { title: 'Licensed Operations', body: 'Processes regulated flower from licensed cultivators and own licensed operations.' },
      { title: 'Regulated Markets', body: 'Products manufactured and distributed for regulated North American and international markets.' },
      { title: 'Accredited-Only', body: 'Subscription restricted to accredited investors with full KYC.' }
    ],

    verticals: [
      {
        t: 'Regulated Alternative Sectors',
        points: [
          'Extraction, formulation, filling, bottling and packaging',
          'White-label manufacturing and wholesale distribution',
          'Premium consumer products and oil-based formulations'
        ]
      }
    ],

    conclusion:
      'By generating revenue across every stage of the value chain — from processing and extraction through manufacturing, packaging, and distribution — Orbit Macro Growth Fund SP1 is positioned to operate as a scalable, high-margin production platform serving both North American and international regulated markets.',

    // ── Fact-sheet data (used by the downloadable PDF) ──
    factSheet: {
      accentHex: '#10B981',
      asOf: 'Coming soon',
      cusip: 'Coming soon',
      isin: 'Coming soon',
      strategyType: 'Vertically Integrated Production · Regulated Markets',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Class A & Class B Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Periodic, subject to Fund approval',
      redemptionFreq: 'Buyout-driven; 2–3 year horizon',
      lockup: 'Aligned to 2–3 yr horizon',
      managementFee: 'Per offering documents',
      performanceFee: 'Class A 20% / Class B 30% buyout premium',
      benchmark: 'Regulated production sector (reference only)',
      targetIrr: '8% – 12% (anticipated)',
      targetCashYield: '8% – 12% (anticipated)',
      leverageCap: 'Per offering documents',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 custodian network',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Facilities & Equipment',   weight: 40 },
        { label: 'Extraction & Processing',  weight: 25 },
        { label: 'Manufacturing & Packaging', weight: 20 },
        { label: 'Distribution & Working Capital', weight: 15 }
      ],
      indicativeTrack: [100, 101.8, 103.1, 104.9, 106.2, 108.4, 110.1, 112.6, 114.3, 116.9, 119.2, 122.0],
      keyRisks: [
        'Regulatory risk in regulated production and distribution markets.',
        'Execution risk — facilities and extraction technology are in development.',
        'Returns and buyout premiums are anticipated, not guaranteed.',
        'CUSIP / ISIN and final terms are pending (coming soon).'
      ]
    }
  }
]

export const getFundBySlug = (slug) => funds.find((f) => f.slug === slug)
export const liveFunds = funds.filter((f) => f.isLive)
