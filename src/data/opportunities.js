// Investment Opportunities — Segregated Portfolios (SPs).
// Each SP is presented as its own standalone opportunity: risk type,
// executive summary, full details, and a downloadable fact sheet.
// They are NOT compiled into / branded as Orbit, Axis or Aurora — those
// fund names must not surface on this page. `fundSlug` is kept only as
// an internal note of which fund historically backstopped the risk (see
// data/funds.js) in case that linkage is ever needed again; nothing here
// should render it.
//
// const PRIOR_FUND_LINKAGE = {
//   'asset-backed-sp':        'axis-digital-reserve-fund',
//   'assisted-living-sp':     'aurora-quant-income-fund',
//   'art-backed-sp':          'aurora-quant-income-fund',
//   'cannabis-extraction-sp': 'orbit-marco-growth-fund',
//   'pharmaceutical-sp':      'orbit-marco-growth-fund',
// }

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

    riskProfile: 'Conservative',
    riskLevel: 1,
    horizon: '5–10 yrs',
    minimum: '$1M',

    overview: [
      'The Asset-Backed Segregated Portfolio invests in secured loans, receivables financing, and structured notes backed by tangible collateral.',
      'Each position is underwritten against an identifiable asset base, with conservative loan-to-value limits and documented security.',
      'Capital preservation is the first principle of this Segregated Portfolio, with conservative structuring throughout.'
    ],
    highlights: [
      'Collateralised positions with conservative loan-to-value limits.',
      'Receivables and structured-finance exposure with documented security.',
      'Capital preservation prioritised over speculative upside.'
    ],

    factSheet: {
      accentHex: '#818CF8',
      asOf: 'Q1 2026',
      strategyType: 'Asset-Backed Lending · Capital Preservation',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Periodic, subject to approval',
      redemptionFreq: 'Limited; aligned to underlying loan terms',
      lockup: 'Aligned to 5–10 yr horizon',
      managementFee: '0.75% per annum of NAV',
      performanceFee: 'None',
      benchmark: 'Secured lending (reference only)',
      targetIrr: '5% – 10% net (anticipated)',
      targetCashYield: '5% – 10% (anticipated)',
      leverageCap: 'Conservative loan-to-value',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'International banking institution(s)',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Secured Loans',          weight: 45 },
        { label: 'Receivables Financing',  weight: 30 },
        { label: 'Structured Notes',       weight: 15 },
        { label: 'Cash & Equivalents',     weight: 10 }
      ],
      indicativeTrack: [100, 100.4, 100.9, 101.5, 102.1, 102.8, 103.6, 104.3, 105.1, 106.0, 106.9, 107.8],
      keyRisks: [
        'Credit and counterparty risk on underlying secured loans.',
        'Collateral valuation risk despite conservative loan-to-value limits.',
        'Returns are anticipated, not guaranteed.',
        'Illiquidity — redemptions aligned to underlying loan terms.'
      ]
    }
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

    riskProfile: 'Moderate',
    riskLevel: 3,
    horizon: '3–5 yrs',
    minimum: '$1,000,000',

    overview: [
      'The Assisted Living Segregated Portfolio invests in senior housing and assisted-living real assets across the development and stabilisation lifecycle.',
      'The sector offers defensive, demographically-supported demand and yield-bearing operating assets.',
      'A systematic, income-oriented approach targets steady distributions and balanced growth.'
    ],
    highlights: [
      'Senior housing and assisted-living operating assets.',
      'Defensive, demographically-supported demand profile.',
      'Targeted regular distributions from yield-bearing positions.'
    ],

    factSheet: {
      accentHex: '#38BDF8',
      asOf: 'Q1 2026',
      strategyType: 'Senior Housing · Income-Oriented Real Assets',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Monthly',
      redemptionFreq: 'Quarterly, 60-day notice',
      lockup: '6 months',
      managementFee: '1.25% per annum of NAV',
      performanceFee: '15% above 5% hurdle, high-water mark',
      benchmark: 'Senior housing income (reference only)',
      targetIrr: '8% – 12% net',
      targetCashYield: '6% – 8% distributed quarterly',
      leverageCap: 'Up to 1.0× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 custodian network',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Stabilised Operating Assets', weight: 40 },
        { label: 'Development & Lease-Up',      weight: 30 },
        { label: 'Mezzanine & Debt',             weight: 20 },
        { label: 'Cash & Equivalents',           weight: 10 }
      ],
      indicativeTrack: [100, 100.7, 101.5, 102.1, 102.9, 103.4, 104.1, 104.9, 105.5, 106.2, 106.9, 107.6],
      keyRisks: [
        'Operating and occupancy risk across senior housing assets.',
        'Interest rate and financing risk on debt-structured positions.',
        'Distribution targets are not guaranteed.',
        'Currency exposure if subscribing in non-USD share class.'
      ]
    }
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

    riskProfile: 'Moderate',
    riskLevel: 3,
    horizon: '3–5 yrs',
    minimum: '$1,000,000',

    overview: [
      'The Art-Backed Segregated Portfolio invests in fine-art assets and art-secured financing structures.',
      'Positions are diversified across artists, periods, and structures to smooth volatility while preserving exposure to the asset class.',
      'A measured-growth approach balances exposure to a traditionally volatile asset class.'
    ],
    highlights: [
      'Fine-art assets and art-secured financing structures.',
      'Diversified positioning across artists, periods, and deal structures.',
      'Balanced exposure with measured volatility versus pure concentrated strategies.'
    ],

    factSheet: {
      accentHex: '#34D399',
      asOf: 'Q1 2026',
      strategyType: 'Fine Art · Art-Secured Financing',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Monthly',
      redemptionFreq: 'Quarterly, 60-day notice',
      lockup: '6 months',
      managementFee: '1.25% per annum of NAV',
      performanceFee: '15% above 5% hurdle, high-water mark',
      benchmark: 'Fine art indices (reference only)',
      targetIrr: '8% – 14% net',
      targetCashYield: 'Variable',
      leverageCap: 'Up to 1.0× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Specialist fine-art custodian network',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Fine-Art Holdings',        weight: 50 },
        { label: 'Art-Secured Financing',    weight: 35 },
        { label: 'Cash & Equivalents',       weight: 15 }
      ],
      indicativeTrack: [100, 100.9, 101.8, 103.1, 104.0, 105.2, 106.0, 107.3, 108.5, 109.6, 110.8, 112.1],
      keyRisks: [
        'Valuation and liquidity risk inherent to fine-art assets.',
        'Concentration risk across artists, periods and structures despite diversification.',
        'Returns are not guaranteed and may be volatile.',
        'Specialist custody and provenance risk.'
      ]
    }
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

    riskProfile: 'High',
    riskLevel: 5,
    horizon: '2–3 yrs',
    minimum: '$1M',

    overview: [
      'The Cannabis Extraction Segregated Portfolio invests in licensed cannabis extraction and processing infrastructure, including equipment financing and operating-asset structures.',
      'Positions are concentrated, conviction-led, and underwritten against tangible, licensed operating assets.',
      'A high-conviction growth approach is sized for investors comfortable with elevated volatility.'
    ],
    highlights: [
      'Licensed cannabis extraction and processing infrastructure exposure.',
      'Asset-backed structures secured against tangible operating assets.',
      'Concentrated positioning with asymmetric upside and elevated volatility.'
    ],

    factSheet: {
      accentHex: '#10B981',
      asOf: 'Q1 2026',
      strategyType: 'Licensed Extraction Infrastructure · Growth',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Periodic, subject to approval',
      redemptionFreq: 'Buyout-driven; 2–3 year horizon',
      lockup: 'Aligned to 2–3 yr horizon',
      managementFee: '2.00% per annum of NAV',
      performanceFee: '20% above 6% hurdle, high-water mark',
      benchmark: 'Regulated production sector (reference only)',
      targetIrr: '15% – 22% net',
      targetCashYield: 'Variable',
      leverageCap: 'Up to 1.5× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 prime brokerage',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Extraction & Processing Equipment', weight: 45 },
        { label: 'Licensed Operating Assets',          weight: 30 },
        { label: 'Working Capital',                    weight: 15 },
        { label: 'Cash & Equivalents',                 weight: 10 }
      ],
      indicativeTrack: [100, 102.4, 101.1, 104.8, 107.2, 105.6, 109.4, 112.1, 110.8, 114.6, 117.9, 121.3],
      keyRisks: [
        'Regulatory risk in licensed cannabis extraction and processing markets.',
        'Concentration risk — small number of high-conviction positions.',
        'Leverage may amplify both gains and losses.',
        'Liquidity windows are limited; capital is long-duration.'
      ]
    }
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

    riskProfile: 'High',
    riskLevel: 5,
    horizon: '2–3 yrs',
    minimum: '$1M',

    overview: [
      'The Pharmaceutical Segregated Portfolio invests in regulated pharmaceutical assets through royalties, licensing, and structured financing.',
      'Exposure is sized to capture meaningful upside from clinical, regulatory, and commercialisation milestones while managing single-asset risk.',
      'A high-conviction growth approach is sized for investors comfortable with elevated volatility.'
    ],
    highlights: [
      'Royalties, licensing, and structured financing across regulated pharma.',
      'Compliance-driven structures with documented underwriting.',
      'Concentrated positioning with asymmetric upside and elevated volatility.'
    ],

    factSheet: {
      accentHex: '#10B981',
      asOf: 'Q1 2026',
      strategyType: 'Pharma Royalties & Licensing · Growth',
      domicile: 'Cayman Islands SPC (Segregated Portfolio)',
      shareClass: 'Participating Shares',
      currencies: 'USD (CAD, GBP, EUR on approval)',
      subscriptionFreq: 'Periodic, subject to approval',
      redemptionFreq: 'Buyout-driven; 2–3 year horizon',
      lockup: 'Aligned to 2–3 yr horizon',
      managementFee: '2.00% per annum of NAV',
      performanceFee: '20% above 6% hurdle, high-water mark',
      benchmark: 'Regulated pharma sector (reference only)',
      targetIrr: '15% – 22% net',
      targetCashYield: 'Variable',
      leverageCap: 'Up to 1.5× NAV',
      administrator: 'Independent third-party administrator',
      auditor: 'Baker Tilly',
      custodian: 'Tier-1 prime brokerage',
      governingLaw: 'Cayman Islands',
      allocation: [
        { label: 'Royalty Streams',          weight: 40 },
        { label: 'Licensing Agreements',     weight: 30 },
        { label: 'Structured Financing',     weight: 20 },
        { label: 'Cash & Equivalents',       weight: 10 }
      ],
      indicativeTrack: [100, 101.8, 103.1, 104.9, 106.2, 108.4, 110.1, 112.6, 114.3, 116.9, 119.2, 122.0],
      keyRisks: [
        'Regulatory and clinical-milestone risk on underlying pharma assets.',
        'Concentration risk — small number of high-conviction positions.',
        'Returns and milestones are anticipated, not guaranteed.',
        'Liquidity windows are limited; capital is long-duration.'
      ]
    }
  }
]

export const getOpportunityBySlug = (slug) =>
  opportunities.find((o) => o.slug === slug)
