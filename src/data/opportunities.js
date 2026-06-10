// Investment Opportunities — Segregated Portfolios (SPs) within PQS Fund SPC.
// Each Segregated Portfolio maps to exactly one fund portfolio, which sets its
// risk profile:
//   Asset-Backed SP          → PQS Axis Digital Reserve SP1 (Conservative)
//   Assisted Living SP       → Aurora Quant Income Fund    (Moderate)
//   Art-Backed SP            → Aurora Quant Income Fund    (Moderate)
//   Cannabis Extraction SP   → Orbit Macro Growth Fund     (High)
//   Pharmaceutical SP        → Orbit Macro Growth Fund     (High)
//
// `fundSlug` links back to data/funds.js so the page can resolve the
// fund name and risk profile from a single source of truth.

export const opportunities = [
  {
    slug: 'asset-backed-sp',
    name: 'Asset-Backed SP',
    category: 'Segregated Portfolio',
    tagline:
      'Secured exposure to collateralised lending and receivables — structured for capital preservation and predictable income.',
    image:
      'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-indigo-500/20',
    accentTo: 'to-gold-500/10',

    // Risk allocated into this fund portfolio
    fundSlug: 'axis-digital-reserve-fund',

    overview: [
      'The Asset-Backed Segregated Portfolio invests in secured loans, receivables financing, and structured notes backed by tangible collateral.',
      'Each position is underwritten against an identifiable asset base, with conservative loan-to-value limits and documented security.',
      'Risk for this Segregated Portfolio is allocated into the Axis Digital Reserve Fund, the platform\'s conservative anchor.'
    ],
    highlights: [
      'Collateralised positions with conservative loan-to-value limits.',
      'Receivables and structured-finance exposure with documented security.',
      'Capital preservation prioritised over speculative upside.'
    ]
  },
  {
    slug: 'assisted-living-sp',
    name: 'Assisted Living SP',
    category: 'Segregated Portfolio',
    tagline:
      'Income-oriented exposure to senior housing and assisted-living real assets — steady distributions from a defensive sector.',
    image:
      'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-sky-500/20',
    accentTo: 'to-gold-500/10',

    fundSlug: 'aurora-quant-income-fund',

    overview: [
      'The Assisted Living Segregated Portfolio invests in senior housing and assisted-living real assets across the development and stabilisation lifecycle.',
      'The sector offers defensive, demographically-supported demand and yield-bearing operating assets.',
      'Risk for this Segregated Portfolio is allocated into the Aurora Quant Income Fund, a systematic, income-oriented strategy.'
    ],
    highlights: [
      'Senior housing and assisted-living operating assets.',
      'Defensive, demographically-supported demand profile.',
      'Targeted regular distributions from yield-bearing positions.'
    ]
  },
  {
    slug: 'art-backed-sp',
    name: 'Art-Backed SP',
    category: 'Segregated Portfolio',
    tagline:
      'Concentrated, conviction-led exposure to fine-art assets and art-secured financing — meaningful upside with commensurate volatility.',
    image:
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-emerald-500/20',
    accentTo: 'to-gold-500/10',

    fundSlug: 'aurora-quant-income-fund',

    overview: [
      'The Art-Backed Segregated Portfolio invests in fine-art assets and art-secured financing structures.',
      'Positions are diversified across artists, periods, and structures to smooth volatility while preserving exposure to the asset class.',
      'Risk for this Segregated Portfolio is allocated into the Aurora Quant Income Fund, a systematic, income-oriented strategy with measured growth exposure.'
    ],
    highlights: [
      'Fine-art assets and art-secured financing structures.',
      'Diversified positioning across artists, periods, and deal structures.',
      'Balanced exposure with measured volatility versus pure concentrated strategies.'
    ]
  },
  {
    slug: 'cannabis-extraction-sp',
    name: 'Cannabis Extraction SP',
    category: 'Segregated Portfolio',
    tagline:
      'Asset-backed exposure to licensed cannabis extraction and processing infrastructure — concentrated, conviction-led positioning with meaningful upside.',
    image:
      'https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-emerald-500/20',
    accentTo: 'to-gold-500/10',

    fundSlug: 'orbit-marco-growth-fund',

    overview: [
      'The Cannabis Extraction Segregated Portfolio invests in licensed cannabis extraction and processing infrastructure, including equipment financing and operating-asset structures.',
      'Positions are concentrated, conviction-led, and underwritten against tangible, licensed operating assets.',
      'Risk for this Segregated Portfolio is allocated into the Orbit Macro Growth Fund, the platform\'s high-conviction growth strategy.'
    ],
    highlights: [
      'Licensed cannabis extraction and processing infrastructure exposure.',
      'Asset-backed structures secured against tangible operating assets.',
      'Concentrated positioning with asymmetric upside and elevated volatility.'
    ]
  },
  {
    slug: 'pharmaceutical-sp',
    name: 'Pharmaceutical SP',
    category: 'Segregated Portfolio',
    tagline:
      'Concentrated, conviction-led exposure to regulated pharmaceutical assets — royalties, licensing, and structured financing with meaningful upside.',
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80',
    accentFrom: 'from-emerald-500/20',
    accentTo: 'to-gold-500/10',

    fundSlug: 'orbit-marco-growth-fund',

    overview: [
      'The Pharmaceutical Segregated Portfolio invests in regulated pharmaceutical assets through royalties, licensing, and structured financing.',
      'Exposure is sized to capture meaningful upside from clinical, regulatory, and commercialisation milestones while managing single-asset risk.',
      'Risk for this Segregated Portfolio is allocated into the Orbit Macro Growth Fund, the platform\'s high-conviction growth strategy.'
    ],
    highlights: [
      'Royalties, licensing, and structured financing across regulated pharma.',
      'Compliance-driven structures with documented underwriting.',
      'Concentrated positioning with asymmetric upside and elevated volatility.'
    ]
  }
]

export const getOpportunityBySlug = (slug) =>
  opportunities.find((o) => o.slug === slug)
