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
    slug: "asset-backed-sp",
    name: "Asset-Backed Fund",
    category: "Segregated Portfolio",
    tagline:
      "Asset-Backed Fund Institutional - grade investment strategy providing exposure to a diversified portfolio of high-quality Canadian and European hard assets, structured finance, and real assets — all held within the Fund to prioritize capital preservation and long-term value creation.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80",
    accentFrom: "from-indigo-500/20",
    accentTo: "to-gold-500/10",

    riskProfile: "Conservative",
    riskLevel: 1,
    horizon: "5–10 yrs",
    minimum: "$1M",

    overview: [
      "Every dollar invested is supported by corresponding underlying assets owned or controlled by the Fund, providing a fully asset-backed investment structure.",
      "Diversified exposure to income-producing real estate, infrastructure, structured finance, receivables, and other institutional-quality alternative assets.",
      "Conservative capital management emphasizing asset security, prudent underwriting standards, and long-term capital preservation over speculative investment strategies.",
      "Highly disciplined portfolio construction with institutional governance, independent oversight, and rigorous due diligence designed to protect investor capital.",
      "Designed exclusively for qualified and accredited investors seeking stable, asset-backed returns through a regulated Cayman Islands investment vehicle managed by a regulated Bahamas investment manager.",
    ],
    highlights: [
      "Every dollar invested is supported by corresponding underlying assets owned or controlled by the Fund, providing a fully asset-backed investment structure.",
      "Diversified exposure to income-producing real estate, infrastructure, structured finance, receivables, and other institutional-quality alternative assets.",
      "Conservative capital management emphasizing asset security, prudent underwriting standards, and long-term capital preservation over speculative investment strategies.",
      "Highly disciplined portfolio construction with institutional governance, independent oversight, and rigorous due diligence designed to protect investor capital.",
      "Designed exclusively for qualified and accredited investors seeking stable, asset-backed returns through a regulated Cayman Islands investment vehicle managed by a regulated Bahamas investment manager.",
    ],
    detailsFile:
      "/folders/ASSET BACKED (Canadian Real Estate Development) Fund - synopsis.pdf",

    details: {
      shareClasses: [
        { name: "Class A", dividends: "4–8%", minimum: "$1M" },
        { name: "Class B", dividends: "6–12%", minimum: "$5M" },
      ],
      isin: "KYG7S14W1016",
      cusip: "G7S14W 101",
      assetRating: "AA+",
      title: "Canadian Real Estate Security Fund",
      subtitle:
        "Institutional-Grade Asset-Backed Real Estate Strategy — Secured by Prime Toronto Development Assets",
      thesis: [
        "The Canadian Real Estate Security Fund has been designed to provide qualified investors with a rare combination of capital preservation, hard asset security, inflation protection, and long-term capital appreciation through direct exposure to one of North America's most desirable and supply-constrained real estate markets.",
        "Unlike traditional real estate funds that rely heavily on future development execution or speculative business plans, this investment is fundamentally supported by a strategically located Toronto development asset valued at approximately USD $300M+ (CAD $450M+) when fully realized, before accounting for any future appreciation associated with zoning enhancements, development approvals, density increases, infrastructure improvements, or construction activities.",
      ],
      thesisCombines: [
        "Existing hard asset value",
        "Long-term land appreciation",
        "Urban intensification opportunities",
        "Development upside",
        "Institutional-quality exit strategies",
        "Conservative capital structuring",
      ],
      sections: [
        {
          heading:
            "1. The Market Opportunity — Canadian Real Estate: A Multi-Trillion Dollar Asset Class",
          body: [
            "Canada's real estate market is estimated to exceed CAD $8 trillion in value and remains one of the most attractive jurisdictions globally for long-term capital deployment.",
          ],
          groups: [
            {
              title: "Economic Stability — Canada Maintains",
              items: [
                "AAA / AA+ sovereign credit ratings",
                "One of the world's strongest banking systems",
                "Stable monetary policy",
                "Low geopolitical risk",
                "Strong legal protections for investors",
              ],
            },
            {
              title: "Historically Resilient During",
              items: [
                "Global recessions",
                "Financial crises",
                "Inflationary cycles",
                "Interest rate volatility",
                "Currency fluctuations",
              ],
            },
            {
              title: "Toronto: Canada's Economic Engine — The GTA",
              items: [
                "Represents approximately 20% of Canada's GDP",
                "Houses more than 7 million residents",
                "Continues to grow rapidly through immigration",
                "Serves as Canada's financial and commercial capital",
                "Attracts significant institutional capital globally",
              ],
            },
            {
              title: "Immigration Driving Long-Term Demand",
              items: [
                "Most newcomers settle in Toronto, Vancouver, Montreal — Toronto receives the largest share",
                "Increasing demand for housing, rental units, condominiums, mixed-use and transit-oriented developments",
              ],
            },
            {
              title: "Structural Housing Shortage Creates",
              items: [
                "Higher land values",
                "Increased condominium pricing",
                "Rising rental rates",
                "Increased demand for development lands",
                "Strong appreciation in urban properties",
              ],
            },
            {
              title: "Institutional Capital Continues to Enter the Market",
              items: [
                "Canadian Pension Funds",
                "Sovereign Wealth Funds",
                "Global Asset Managers",
                "Insurance Companies",
                "Private Equity Firms",
                "International Family Offices",
              ],
            },
          ],
        },
        {
          heading:
            "2. The Problem in Today's Market — Investors Face Increasing Uncertainty",
          groups: [
            {
              title: "Equity Markets",
              items: [
                "Elevated valuations",
                "Market volatility",
                "Geopolitical uncertainty",
                "Inflation concerns",
              ],
            },
            {
              title: "Fixed Income Investments",
              items: [
                "Fail to keep pace with inflation",
                "Offer limited upside",
                "Provide no participation in real asset appreciation",
              ],
            },
            {
              title: "Private Equity",
              items: [
                "Require long holding periods",
                "Depend heavily on management execution",
                "Often lack hard asset collateral",
              ],
            },
            {
              title: "Development Investments Involve",
              items: [
                "Land not yet acquired",
                "Approvals not yet obtained",
                "Construction not yet financed",
                "Significant execution risk",
              ],
            },
            {
              title: "Sophisticated Investors Increasingly Seek",
              items: [
                "Security of principal",
                "Asset-backed investments",
                "Inflation protection",
                "Long-term appreciation",
                "Stable jurisdictions without sacrificing return potential",
              ],
            },
          ],
        },
        {
          heading: "3. Our Solution — Canadian Real Estate Security Fund",
          body: [
            "The Fund has been specifically structured to solve these challenges.",
          ],
          groups: [
            {
              title: "A. Hard Asset Backing",
              items: [
                "Real property ownership",
                "Land value appreciation",
                "Development rights",
                "Existing collateral security",
              ],
            },
            {
              title: "B. Prime Toronto, ON, Canada Development Asset",
              items: [
                "Prime location",
                "Transit accessibility",
                "Mixed-use redevelopment potential",
                "High-density development opportunity",
                "Long-term appreciation characteristics",
              ],
            },
            {
              title: "C. Appreciation Before Construction",
              items: [
                "Phase 1 — Land ownership and preservation: COMPLETED",
                "Phase 2 — Planning and entitlement optimization: COMPLETED",
                "Phase 3 — Rezoning and density enhancement: COMPLETED",
                "Phase 4 — Development advancement",
                "Phase 5 — Construction and monetization",
              ],
            },
            {
              title: "D. Conservative Investment Structure",
              items: [
                "Hard asset collateralization",
                "Conservative leverage",
                "Strategic financing",
                "Institutional governance",
                "Independent valuation oversight",
              ],
            },
            {
              title: "E. Multiple Exit Strategies",
              items: [
                "Refinancing",
                "Asset sales",
                "Institutional acquisitions",
                "Joint ventures",
                "Recapitalizations",
                "REIT conversions",
                "Securitizations",
              ],
            },
          ],
        },
        {
          heading: "4. Why This Investment Is Superior",
          groups: [
            {
              title: "1. Asset Backed by Real Property",
              items: [
                "Many funds offer exposure to ideas. This Fund offers exposure to real assets.",
                "Investors gain security through ownership of tangible Canadian real estate.",
              ],
            },
            {
              title: "2. Located in an AA+ Jurisdiction",
              items: [
                "Strong legal protections",
                "Reliable land registry systems",
                "Stable banking institutions",
                "Strong creditor rights",
                "Political stability",
              ],
            },
            {
              title: "3. Exposure to Toronto's Growth Story",
              items: [
                "Immigration growth",
                "Housing shortages",
                "Limited land supply",
                "Infrastructure investment",
                "Strong institutional demand",
              ],
            },
            {
              title: "4. Institutional-Grade Opportunity",
              items: [
                "Access to opportunities typically reserved for Pension Funds, Sovereign Wealth Funds, Global Real Estate Funds, and Large Family Offices",
              ],
            },
            {
              title: "5. Inflation Protection",
              items: [
                "As replacement costs increase: land values rise, development values increase, rental rates improve, asset prices appreciate",
              ],
            },
            {
              title: "6. Multiple Layers of Appreciation",
              items: [
                "Existing Land Value — immediate hard asset security",
                "Density Increases — additional buildable area",
                "Entitlement Enhancements — improved development economics",
                "Infrastructure Expansion — increased surrounding property values",
                "Population Growth — continued housing demand",
                "Institutional Demand — higher exit valuations",
              ],
            },
          ],
          table: {
            title: "7. Attractive Risk-Adjusted Return Profile",
            cols: ["Capital Preservation", "Growth Potential"],
            rows: [
              ["Hard Asset Security", "Development Appreciation"],
              ["Existing Land Value", "Density Optimization"],
              ["Strong Jurisdiction", "Rezoning Upside"],
              ["Conservative Structure", "Institutional Exit Premium"],
              ["Tangible Collateral", "Long-Term Capital Growth"],
            ],
          },
        },
        {
          heading: "Why Investors Are Looking at This Fund Today",
          body: ["Most investors today are searching for three things:"],
          groups: [
            {
              title: "1. Security",
              items: ["Protection of capital through tangible hard assets."],
            },
            {
              title: "2. Stability",
              items: [
                "Exposure to one of the safest legal and banking jurisdictions globally.",
              ],
            },
            {
              title: "3. Growth",
              items: [
                "Participation in one of North America's strongest urban development markets.",
              ],
            },
          ],
          closing:
            "The Canadian Real Estate Security Fund delivers all three through a structure that combines immediate hard-asset collateral with long-term institutional-grade development upside. This creates a compelling investment opportunity for qualified investors seeking both preservation of wealth and substantial future appreciation potential in a market supported by powerful demographic, economic, and real estate fundamentals.",
        },
        {
          heading:
            "Footnote for Valuation — Value Creation & Appreciation Potential",
          body: [
            "The current valuation of the underlying Toronto development asset is based primarily on its existing land value and current development profile. Importantly, this valuation does not fully reflect the substantial value that may be realized through future planning approvals, density increases, rezoning initiatives, infrastructure enhancements, entitlement optimization, and ultimate development execution.",
            "Based on preliminary development concepts and projected intensification potential, management believes the property has the potential to achieve a fully realized gross development value in excess of USD $300 million (CAD $450 million), subject to market conditions, regulatory approvals, financing availability, and successful execution of the development strategy.",
            "Unlike traditional development investments that require investors to assume substantial early-stage construction risk, the Fund's strategy allows investors to participate in the appreciation of a tangible underlying asset while benefiting from the potential transformation of a current $100 million asset into a fully realized development with an estimated value exceeding USD $300 million (CAD $450 million) upon completion.",
          ],
          groups: [
            {
              title: "Investors Gain Exposure To",
              items: [
                "Existing hard asset security at current valuations",
                "Long-term land appreciation",
                "Increased density and entitlement value",
                "Enhanced project economics through redevelopment",
                "Potential realization of a fully developed asset value exceeding USD $300 million (CAD $450 million)",
                "Institutional-grade exit opportunities through sale, recapitalization, refinancing, joint ventures, or strategic acquisitions",
              ],
            },
            {
              title: "Enhanced Investment Thesis",
              items: [
                "Current Asset Value: Approximately $100 million",
                "Potential Fully Realized Development Value: USD $300 million+ (CAD $450 million+)",
                "Potential Value Creation: USD $200 million+ (CAD $350 million+) of incremental value creation",
              ],
            },
          ],
        },
      ],
      conclusion: [
        "A current hard asset valued at approximately $100 million",
        "Located in one of the world's safest real estate jurisdictions",
        "Backed by strong demographic and housing demand fundamentals",
        "Supported by a development pathway that may increase the asset's value to CAD $450 million+",
        "Providing a potential 4.5x increase in underlying asset value over the development lifecycle",
      ],
      conclusionClosing:
        "This combination of asset-backed security, capital preservation, and substantial development-driven appreciation represents the core differentiator of the Canadian Real Estate Security Fund.",
    },

    factSheet: {
      accentHex: "#818CF8",
      asOf: "Q1 2026",
      strategyType: "Asset-Backed Lending · Capital Preservation",
      domicile: "Cayman Islands SPC (Segregated Portfolio)",
      shareClass: "Participating Shares",
      currencies: "USD (CAD, GBP, EUR on approval)",
      subscriptionFreq: "Periodic, subject to approval",
      redemptionFreq: "Limited; aligned to underlying loan terms",
      lockup: "Aligned to 5–10 yr horizon",
      managementFee: "0.75% per annum of NAV",
      performanceFee: "None",
      benchmark: "Secured lending (reference only)",
      targetIrr: "5% – 10% net (anticipated)",
      targetCashYield: "5% – 10% (anticipated)",
      leverageCap: "Conservative loan-to-value",
      administrator: "Independent third-party administrator",
      auditor: "Baker Tilly",
      custodian: "International banking institution(s)",
      governingLaw: "Cayman Islands",
      allocation: [
        { label: "Secured Loans", weight: 45 },
        { label: "Receivables Financing", weight: 30 },
        { label: "Structured Notes", weight: 15 },
        { label: "Cash & Equivalents", weight: 10 },
      ],
      indicativeTrack: [
        100, 100.4, 100.9, 101.5, 102.1, 102.8, 103.6, 104.3, 105.1, 106.0,
        106.9, 107.8,
      ],
      keyRisks: [
        "Credit and counterparty risk on underlying secured loans.",
        "Collateral valuation risk despite conservative loan-to-value limits.",
        "Returns are anticipated, not guaranteed.",
        "Illiquidity — redemptions aligned to underlying loan terms.",
      ],
    },
  },
  {
    slug: "assisted-living-sp",
    name: "Assisted Living Canada Fund",
    category: "Segregated Portfolio",
    tagline:
      "Assisted Living Canada Fund provides institutional investors with income-oriented exposure to essential senior housing and assisted-living real assets through a fully asset-backed investment strategy backed by prime Canadian real estate.",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1600&q=80",
    accentFrom: "from-sky-500/20",
    accentTo: "to-gold-500/10",

    riskProfile: "Moderate",
    riskLevel: 3,
    horizon: "3–5 yrs",
    minimum: "$1,000,000",

    overview: [
      "The Fund focuses on the development, ownership, and operation of affordable assisted living communities that generate stable, recurring income from a defensive, demographically driven sector supported by Canada's rapidly aging population and predictable pension-based resident income.",
      "Designed as essential social infrastructure rather than traditional real estate, the Fund combines conservative asset backing, long-term capital appreciation, and targeted regular distributions with strong government alignment, healthcare integration, and meaningful ESG impact, offering investors a resilient investment platform focused on capital preservation, sustainable yield, and long-term value creation.",
    ],
    highlights: [
      "The Fund focuses on the development, ownership, and operation of affordable assisted living communities that generate stable, recurring income from a defensive, demographically driven sector supported by Canada's rapidly aging population and predictable pension-based resident income.",
      "Designed as essential social infrastructure rather than traditional real estate, the Fund combines conservative asset backing, long-term capital appreciation, and targeted regular distributions with strong government alignment, healthcare integration, and meaningful ESG impact, offering investors a resilient investment platform focused on capital preservation, sustainable yield, and long-term value creation.",
    ],
    detailsFile: "/folders/Assisted Living SP.pdf",

    details: {
      shareClasses: [
        { name: "Class A", dividends: "3–4%", minimum: "$2.5M" },
        { name: "Class B", dividends: "4–6%", minimum: "$10M" },
      ],
      title: "PQS Assisted Living Canada Fund",
      subtitle:
        "Institutional Investment Memorandum — Executive Investment Thesis",
      thesis: [
        "The PQS Assisted Living Canada Fund has been established to address one of the largest and fastest-growing demographic and healthcare challenges facing Canada: the severe shortage of affordable assisted living and supportive retirement housing for seniors.",
        "The Fund seeks to develop, acquire, own, and operate a scalable network of affordable assisted living communities across Ontario and eventually throughout Canada and selected international markets. Built upon the foundation of PQS Accessible Retirement Residences, a registered Canadian charitable organization, the Fund combines institutional-grade real estate ownership, recurring operating income, healthcare integration, and measurable social impact.",
        "Unlike traditional retirement home operators, PQS is uniquely positioned between independent living and long-term care, providing affordable supportive housing for seniors who require assistance but do not require full institutional nursing care. This creates a highly underserved market segment with significant barriers to entry and exceptional long-term demand characteristics.",
      ],
      thesisCombines: [
        "Prime Canadian real estate assets",
        "Essential social infrastructure",
        "Government-aligned healthcare solutions",
        "Long-term demographic growth",
        "Stable recurring income streams",
        "Attractive dividend distributions",
        "Capital appreciation through real estate ownership",
        "Strong ESG and impact investing credentials",
      ],
      sections: [
        {
          heading:
            "1. Market Opportunity — A Multi-Billion-Dollar Demographic Megatrend",
          body: [
            "Canada is experiencing a demographic transformation unlike anything seen in its modern history. The post-war baby boomer generation is entering retirement age at unprecedented rates, creating significant pressure on housing, healthcare, and social support systems.",
            "Ontario alone has seen its senior population increase from approximately 651,000 individuals in 1971 to more than 2.5 million today, with projections indicating growth to approximately 4.6 million seniors by 2046.",
          ],
          groups: [
            {
              title: "Nationally",
              items: [
                "More than 7 million Canadians are currently over the age of 65.",
                "Seniors represent the fastest-growing demographic segment.",
                "Life expectancy continues to increase.",
                "Demand for housing and support services is accelerating annually.",
              ],
            },
            {
              title: "Healthcare Infrastructure Cannot Keep Pace — Today",
              items: [
                "More than 40,000 Ontarians remain in hospitals while waiting for suitable housing solutions.",
                "Thousands occupy long-term care beds despite not requiring institutional care.",
                "Waitlists for affordable retirement housing continue to grow.",
                "Existing private retirement facilities remain financially inaccessible to many seniors.",
              ],
            },
            {
              title: "Why This Opportunity Is Different",
              items: [
                "Most real estate sectors are influenced by economic growth, interest rates, employment levels, and consumer confidence.",
                "Assisted living demand is driven by age, health requirements, and necessity — seniors require housing and care regardless of economic conditions, creating one of the most defensive investment sectors available today.",
              ],
            },
          ],
        },
        {
          heading: "2. The Current Problem — The Missing Middle",
          body: [
            "The Canadian senior care system suffers from a significant structural gap. Currently, seniors typically have only three options:",
          ],
          groups: [
            {
              title: "Option 1: Stay at Home",
              items: [
                "Many seniors remain in homes that are no longer safe or appropriate for their needs.",
                "Challenges: social isolation, mobility concerns, caregiver burden, increased healthcare costs.",
              ],
            },
            {
              title: "Option 2: Traditional Retirement Homes",
              items: [
                "Most private retirement residences charge $5,500–$7,000+ per month, making them unaffordable for many Canadians living on pensions.",
              ],
            },
            {
              title: "Option 3: Long-Term Care",
              items: [
                "Designed for individuals requiring extensive medical supervision. Many residents do not require this level of care, waitlists are extensive, and costs continue to increase.",
              ],
            },
            {
              title: "Pressure on Government Healthcare Systems",
              items: [
                "Hospital Bed Occupancy — thousands of seniors remain in hospitals simply because suitable housing is unavailable, costing up to $10,000+/day per patient.",
                "Healthcare Cost Escalation — governments spend significantly more maintaining seniors in hospitals than in community-based housing.",
                "Long-Term Care Shortages — construction has failed to keep pace with population growth.",
                "Fiscal Pressures — the aging population is expected to become one of the largest public expenditure challenges over the next two decades.",
              ],
            },
          ],
        },
        {
          heading:
            "3. Our Solution — A Fully Integrated Assisted Living Platform",
          body: [
            'PQS has developed a scalable "Aging in Place" model specifically designed to fill the gap between independent living and long-term care. The model enables seniors to remain within the same residence while receiving progressively greater levels of support as their needs evolve, dramatically improving resident quality of life, family satisfaction, healthcare outcomes, and occupancy retention.',
          ],
          groups: [
            {
              title:
                "Fully Asset-Backed Investment Structure — Asset Composition",
              items: [
                "Prime Canadian land",
                "Purpose-built assisted living facilities",
                "Income-producing real estate",
                "Essential healthcare infrastructure",
              ],
            },
            {
              title: "Why This Matters — Investors Are Investing Into",
              items: [
                "Physical assets",
                "Appreciating real estate",
                "Essential infrastructure",
                "Revenue-generating facilities — providing a significant margin of safety relative to many alternative investments.",
              ],
            },
            {
              title: "AA+ Canadian Prime Real Estate",
              items: [
                "The Fund focuses on strategically located Canadian real estate assets in communities experiencing population growth, increasing senior populations, healthcare shortages, and strong municipal support.",
              ],
            },
            {
              title: "Stable Revenue from Pension-Supported Residents",
              items: [
                "Residents receive income from CPP, OAS, GIS, employer pensions, and retirement savings.",
                "This creates predictable cash flow, low default risk, long-term occupancy, and reduced economic sensitivity.",
              ],
            },
            {
              title: "Healthcare Integration",
              items: [
                "Personal support workers",
                "Medication management",
                "Wellness programs",
                "Nutrition programs",
                "Community services",
                "Caregiver respite services",
              ],
            },
            {
              title: "Charitable Structure Advantage",
              items: [
                "Reduced development costs (development charge reductions, land acquisition opportunities, government partnerships)",
                "Reduced operating costs (HST rebates, property tax efficiencies, access to grants and incentives)",
                "Enhanced public sector relationships",
              ],
            },
          ],
        },
        {
          heading:
            "4. Why Our Investment Is Better Than Anything in the Marketplace Today",
          groups: [
            {
              title: "1. Triple-Layer Return Profile",
              items: [
                "Real Estate Appreciation — underlying property values increase over time.",
                "Operating Income — monthly revenues generated from residents.",
                "Platform Growth — expansion of the PQS operating platform across Canada.",
              ],
            },
            {
              title:
                "2. Infrastructure Characteristics with Real Estate Ownership",
              items: [
                "Should be viewed similarly to hospitals, utilities, transportation infrastructure, and long-term care systems — demand driven by societal necessity.",
              ],
            },
            {
              title: "3. Government-Aligned Business Model",
              items: [
                "Municipal — affordable housing, community development.",
                "Provincial — healthcare cost reduction, hospital capacity improvements.",
                "Federal — aging population strategies, affordable housing initiatives.",
              ],
            },
            {
              title: "4. High Barriers to Entry",
              items: [
                "Competitors would need healthcare partnerships, municipal relationships, charitable governance, specialized operational expertise, and regulatory approvals.",
              ],
            },
            {
              title: "5. Demographic Certainty",
              items: [
                "The aging of Canada's population is not a forecast — it is already occurring.",
                "PQS benefits from one of the most predictable long-term demand drivers available globally.",
              ],
            },
            {
              title: "6. Institutional ESG Credentials",
              items: [
                "PQS directly contributes to affordable housing, healthcare accessibility, senior wellbeing, social equity, and community sustainability — attractive to pension funds, foundations, family offices, impact investors, and ESG-focused institutions.",
              ],
            },
          ],
        },
      ],
      conclusion: [
        "Defensive Asset Protection — Fully asset-backed by Canadian real estate",
        "Stable Income — Pension-supported resident base",
        "Long-Term Growth — Demographic-driven demand",
        "Essential Infrastructure — Government-supported social infrastructure",
        "Scalable Platform — Potential for 100+ communities across Ontario and beyond",
        "Social Impact — Improving quality of life for seniors while reducing strain on Canada's healthcare system",
      ],
      conclusionClosing:
        "The result is an investment strategy capable of delivering long-term capital preservation, stable recurring income, meaningful real estate appreciation, and measurable social impact — positioning PQS as one of the most compelling assisted living investment opportunities in Canada today.",
    },

    factSheet: {
      accentHex: "#38BDF8",
      asOf: "Q1 2026",
      strategyType: "Senior Housing · Income-Oriented Real Assets",
      domicile: "Cayman Islands SPC (Segregated Portfolio)",
      shareClass: "Participating Shares",
      currencies: "USD (CAD, GBP, EUR on approval)",
      subscriptionFreq: "Monthly",
      redemptionFreq: "Quarterly, 60-day notice",
      lockup: "6 months",
      managementFee: "1.25% per annum of NAV",
      performanceFee: "15% above 5% hurdle, high-water mark",
      benchmark: "Senior housing income (reference only)",
      targetIrr: "8% – 12% net",
      targetCashYield: "6% – 8% distributed quarterly",
      leverageCap: "Up to 1.0× NAV",
      administrator: "Independent third-party administrator",
      auditor: "Baker Tilly",
      custodian: "Tier-1 custodian network",
      governingLaw: "Cayman Islands",
      allocation: [
        { label: "Stabilised Operating Assets", weight: 40 },
        { label: "Development & Lease-Up", weight: 30 },
        { label: "Mezzanine & Debt", weight: 20 },
        { label: "Cash & Equivalents", weight: 10 },
      ],
      indicativeTrack: [
        100, 100.7, 101.5, 102.1, 102.9, 103.4, 104.1, 104.9, 105.5, 106.2,
        106.9, 107.6,
      ],
      keyRisks: [
        "Operating and occupancy risk across senior housing assets.",
        "Interest rate and financing risk on debt-structured positions.",
        "Distribution targets are not guaranteed.",
        "Currency exposure if subscribing in non-USD share class.",
      ],
    },
  },
  {
    slug: "art-backed-sp",
    name: "Art-Backed Fund",
    category: "Segregated Portfolio",
    tagline: [
      "The Fund provides institutional investors with professionally managed exposure to museum-quality fine art and art-secured financing strategies through a diversified portfolio of globally recognized masterpieces and structured investment opportunities.",
      "The Fund combines long-term capital appreciation from scarce, investment-grade artworks with innovative art-backed financing, lending, and monetization strategies designed to enhance capital efficiency while preserving ownership of appreciating assets.",
    ],
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1600&q=80",
    accentFrom: "from-emerald-500/20",
    accentTo: "to-gold-500/10",

    riskProfile: "Moderate",
    riskLevel: 3,
    horizon: "3–5 yrs",
    minimum: "$1,000,000",

    overview: [
      "The Fund combines long-term capital appreciation from scarce, investment-grade artworks with innovative art-backed financing, lending, and monetization strategies designed to enhance capital efficiency while preserving ownership of appreciating assets.",
      "By diversifying across renowned artists, historical periods, geographic markets, and structured finance transactions, the Fund seeks to balance meaningful long-term upside with disciplined risk management and lower correlation to traditional financial markets.",
      "Designed for qualified investors seeking tangible hard assets, inflation protection, and institutional-grade wealth preservation, the Fund offers a differentiated alternative investment platform focused on capital appreciation, portfolio diversification, and the strategic utilization of one of the world's most enduring stores of value.",
    ],
    highlights: [
      "By diversifying across renowned artists, historical periods, geographic markets, and structured finance transactions, the Fund seeks to balance meaningful long-term upside with disciplined risk management and lower correlation to traditional financial markets.",
      "Designed for qualified investors seeking tangible hard assets, inflation protection, and institutional-grade wealth preservation, the Fund offers a differentiated alternative investment platform focused on capital appreciation, portfolio diversification, and the strategic utilization of one of the world's most enduring stores of value.",
    ],
    detailsFile: "/folders/Art Backed Fund SP.pdf",

    details: {
      shareClasses: [
        { name: "Class A", dividends: "3–4%", minimum: "$500k" },
        { name: "Class B", dividends: "4–8%", minimum: "$5M" },
      ],
      isin: "Coming soon",
      cusip: "Coming soon",
      assetRating: "AA+",
      title: "Art-Backed Strategic Opportunities Fund",
      subtitle: "Institutional Investment Memorandum & Opportunity Analysis",
      sections: [
        {
          heading: "1. The Market Opportunity",
          body: [
            "Fine art has been regarded for centuries as a premier store of wealth alongside real estate, gold, and private business ownership. Historically reserved for royalty, sovereigns, aristocratic families, museums, and the world's wealthiest individuals, fine art has evolved into a recognized institutional asset class attracting increasing allocations from family offices, pension funds, endowments, and alternative asset managers.",
            "The global art market consistently generates annual transaction volumes exceeding US$60 billion, while the total value of privately held fine art is estimated to exceed several trillion dollars globally.",
          ],
          groups: [
            {
              title: "Key Growth Drivers",
              items: [
                "Expansion of global wealth, particularly among ultra-high-net-worth individuals.",
                "Significant wealth creation in North America, Europe, the Middle East, and Asia.",
                "Growing demand from sovereign wealth funds and family offices.",
                "Increasing institutional acceptance of alternative assets.",
                "Investor demand for inflation-resistant hard assets.",
                "Portfolio diversification away from public markets.",
              ],
            },
            {
              title: "A Finite Asset Class",
              items: [
                "Governments can print more currency, companies can issue shares, bonds can be created, real estate can be built — but no new Picasso, Monet, or Basquiat originals can ever be created.",
                "The supply of museum-quality artwork is permanently fixed; as global wealth expands and collector demand increases, scarcity has historically contributed to significant appreciation over time.",
              ],
            },
            {
              title: "Historical Performance of Blue-Chip Art",
              items: [
                "Pablo Picasso — works purchased for hundreds of thousands of dollars decades ago have sold for tens and hundreds of millions in recent years.",
                "Claude Monet — major works have appreciated dramatically as museums and institutional collectors compete for limited inventory.",
                "Jean-Michel Basquiat — among the highest appreciation rates in modern art history, with individual works selling for over US$100 million.",
                "Andy Warhol — remains among the most traded and institutionally recognized artists globally, with sustained auction demand over multiple decades.",
              ],
            },
            {
              title: "Why Institutions Are Allocating to Art",
              items: [
                "Portfolio diversification — lower correlation to equity markets, interest rates, bond markets, and currency movements.",
                "Inflation protection — scarce tangible assets have historically preserved purchasing power.",
                "Wealth preservation — a multigenerational store of value that can survive economic cycles.",
                "Legacy assets — museum-quality works often become family office and estate planning assets held across generations.",
              ],
            },
          ],
        },
        {
          heading: "2. The Problem That Needs to Be Solved",
          body: [
            "Despite the attractiveness of fine art as an asset class, the market remains highly inefficient.",
          ],
          groups: [
            {
              title: "Problem #1 — Access Is Limited",
              items: [
                "Historically restricted to billionaires, family offices, museums, sovereign collections, and private collectors.",
                "Most investors cannot access the acquisition opportunities that drive the majority of value creation.",
              ],
            },
            {
              title: "Problem #2 — Illiquidity",
              items: [
                "Art ownership traditionally requires long holding periods, significant capital commitments, auction participation, specialist advisors, and global sourcing capabilities.",
              ],
            },
            {
              title: "Problem #3 — Lack of Professional Management",
              items: [
                "Private collectors face authentication risks, valuation uncertainty, insurance complexities, storage requirements, and provenance verification challenges.",
              ],
            },
            {
              title: "Problem #4 — Underutilized Assets",
              items: [
                "Art traditionally sits in vaults, museums, private residences, and corporate collections — appreciating but generating little additional value while held. Billions of dollars of art globally remain economically dormant.",
              ],
            },
            {
              title: "Problem #5 — Cash Is Losing Purchasing Power",
              items: [
                "Inflation erosion, low interest rates, currency devaluation, and limited growth potential require alternatives capable of preserving wealth while generating long-term appreciation.",
              ],
            },
          ],
        },
        {
          heading:
            "3. Our Solution — The Art-Backed Strategic Opportunities Fund",
          body: [
            "The Fund transforms fine art from a passive collectible into an institutional-grade investment platform.",
          ],
          groups: [
            {
              title: "Step 1: Acquire Exceptional Art Assets",
              items: [
                "Museum-quality masterpieces by artists such as Pablo Picasso, Claude Monet, Andy Warhol, Jean-Michel Basquiat, Francis Bacon, Gerhard Richter, and David Hockney.",
                "Priority given to proven provenance, strong authentication records, museum exhibition history, historical significance, and global collector demand.",
              ],
            },
            {
              title: "Step 2: Diversify Across the Entire Art Ecosystem",
              items: [
                "Historical periods — Old Masters, Impressionist, Post-Impressionist, Modern, Post-War, Contemporary, Ultra-Contemporary.",
                "Geographic markets — North America, Europe, United Kingdom, Middle East, Asia-Pacific.",
                "No single artist dominates the portfolio, significantly reducing concentration risk.",
              ],
            },
            {
              title: "Step 3: Generate Appreciation",
              items: [
                "The Fund benefits from the long-term appreciation of scarce, culturally significant works by institutionally recognized artists as global wealth and competition for elite artworks intensifies.",
              ],
            },
            {
              title:
                "Step 4: Unlock Additional Value Through Structured Finance",
              items: [
                "Art-Backed Lending — valuable artwork pledged as collateral for acquisition financing, institutional lending facilities, credit lines, and asset-backed financing structures, accessing liquidity without selling appreciating assets.",
                "Museum Loan Programs — lending artworks to museums, international exhibitions, and cultural institutions for revenue, enhanced provenance, and higher future valuations.",
                "Corporate Leasing Programs — display within luxury hotels, financial institutions, corporate headquarters, and luxury brands.",
                "Structured Investment Vehicles — SPVs, fractional ownership vehicles, institutional co-investment programs, and art-backed financing structures.",
              ],
            },
          ],
        },
        {
          heading: "4. Why This Investment Is Superior to Alternatives",
          groups: [
            {
              title:
                "Advantage #1 — Every Dollar Is Backed by Tangible Hard Assets",
              items: [
                "The Fund owns physical assets with globally recognized value, not financial engineering or market speculation.",
              ],
            },
            {
              title: "Advantage #2 — Scarcity Cannot Be Manufactured",
              items: [
                "As wealth expands globally, demand rises while supply remains fixed, creating a powerful long-term value proposition.",
              ],
            },
            {
              title: "Advantage #3 — Dual Return Engine",
              items: [
                "Most art funds rely solely on appreciation. The Fund seeks value creation through appreciation AND monetization (lending, financing, institutional partnerships, leasing).",
              ],
            },
            {
              title:
                "Advantage #4 — Historically Low Correlation to Public Markets",
              items: [
                "Fine art values are driven by wealth creation, collector demand, scarcity, and cultural relevance — not daily stock market fluctuations.",
              ],
            },
            {
              title: "Advantage #5 — Institutional Risk Management",
              items: [
                "Independent valuations by major auction houses, accredited appraisers, and industry specialists.",
                "Authentication verification — provenance analysis, title verification, authenticity certification, forensic review.",
                "Insurance protection — theft, damage, transportation, storage, exhibition risk.",
              ],
            },
            {
              title: "Advantage #6 — Potential Inflation Hedge",
              items: [
                "Scarce hard assets have historically preserved wealth during inflation, currency devaluation, and economic uncertainty.",
              ],
            },
            {
              title: "Advantage #7 — Wealth Preservation Across Generations",
              items: [
                "Long-term capital appreciation, intergenerational wealth transfer, estate planning efficiency, and legacy asset ownership.",
              ],
            },
            {
              title:
                "Advantage #8 — Institutional Access to an Exclusive Asset Class",
              items: [
                "Access to opportunities traditionally available only to billionaire collectors, sovereign wealth funds, family offices, major museums, and institutional buyers.",
              ],
            },
          ],
        },
        {
          heading: "Why This Fund Matters Today",
          body: [
            "Global investors are increasingly seeking alternatives to overvalued public equities, low-yield fixed income, inflation-eroding cash balances, and highly leveraged financial assets.",
          ],
          groups: [
            {
              title: "The Fund Offers Exposure To",
              items: [
                "Museum-Quality Hard Assets",
                "Institutional Portfolio Diversification",
                "Scarcity-Driven Appreciation",
                "Inflation Protection",
                "Wealth Preservation",
                "Structured Finance Enhancement",
                "Global Cultural Assets",
                "Multi-Generational Value Creation",
                "Low Correlation to Traditional Markets",
                "Institutional Risk Management",
              ],
            },
          ],
          closing:
            "Core Investment Thesis: The world's most valuable artworks are not merely collectibles — they are globally recognized hard assets with permanent scarcity, institutional demand, and centuries of proven wealth-preservation characteristics. By combining ownership of museum-quality masterpieces with sophisticated structured finance strategies, the Art-Backed Strategic Opportunities Fund seeks to transform fine art into a modern institutional investment platform capable of delivering long-term appreciation, capital preservation, liquidity enhancement, and generational wealth creation.",
        },
      ],
    },

    factSheet: {
      accentHex: "#34D399",
      asOf: "Q1 2026",
      strategyType: "Fine Art · Art-Secured Financing",
      domicile: "Cayman Islands SPC (Segregated Portfolio)",
      shareClass: "Participating Shares",
      currencies: "USD (CAD, GBP, EUR on approval)",
      subscriptionFreq: "Monthly",
      redemptionFreq: "Quarterly, 60-day notice",
      lockup: "6 months",
      managementFee: "1.25% per annum of NAV",
      performanceFee: "15% above 5% hurdle, high-water mark",
      benchmark: "Fine art indices (reference only)",
      targetIrr: "8% – 14% net",
      targetCashYield: "Variable",
      leverageCap: "Up to 1.0× NAV",
      administrator: "Independent third-party administrator",
      auditor: "Baker Tilly",
      custodian: "Specialist fine-art custodian network",
      governingLaw: "Cayman Islands",
      allocation: [
        { label: "Fine-Art Holdings", weight: 50 },
        { label: "Art-Secured Financing", weight: 35 },
        { label: "Cash & Equivalents", weight: 15 },
      ],
      indicativeTrack: [
        100, 100.9, 101.8, 103.1, 104.0, 105.2, 106.0, 107.3, 108.5, 109.6,
        110.8, 112.1,
      ],
      keyRisks: [
        "Valuation and liquidity risk inherent to fine-art assets.",
        "Concentration risk across artists, periods and structures despite diversification.",
        "Returns are not guaranteed and may be volatile.",
        "Specialist custody and provenance risk.",
      ],
    },
  },
  {
    slug: "cannabis-extraction-sp",
    name: "CanaExtract Fund",
    category: "Segregated Portfolio",
    tagline:
      "The Fund provides qualified investors with asset-backed exposure to a vertically integrated cannabis extraction, manufacturing, and processing platform centered on proprietary, patent-pending extraction technology.",
    image:
      "https://images.unsplash.com/photo-1603909223429-69bb7101f420?auto=format&fit=crop&w=1600&q=80",
    accentFrom: "from-emerald-500/20",
    accentTo: "to-gold-500/10",
    externalUrl: "https://stately-pudding-dc7bac.netlify.app/",

    riskProfile: "High",
    riskLevel: 5,
    horizon: "2–3 yrs",
    minimum: "$1M",

    overview: [
      "Focused on the highest-margin segment of the regulated cannabis industry, the Fund invests in licensed extraction and processing infrastructure rather than commodity cultivation, generating diversified revenue from toll processing, premium oil production, white-label manufacturing, branded consumer products, packaging, and international distribution.",
      "Supported by tangible operating assets, proprietary machinery, and intellectual property, CanaExtract is strategically positioned to capitalize on the growing global demand for premium cannabis oils and extracts, evolving regulatory frameworks, and expanding medical cannabis markets.",
      "The Fund offers a concentrated, conviction-led investment strategy with meaningful long-term upside through scalable infrastructure, multiple recurring revenue streams, and exposure to one of the fastest-growing segments of the global cannabis industry.",
    ],
    highlights: [
      "Focused on the highest-margin segment of the regulated cannabis industry, the Fund invests in licensed extraction and processing infrastructure rather than commodity cultivation, generating diversified revenue from toll processing, premium oil production, white-label manufacturing, branded consumer products, packaging, and international distribution.",
      "Supported by tangible operating assets, proprietary machinery, and intellectual property, CanaExtract is strategically positioned to capitalize on the growing global demand for premium cannabis oils and extracts, evolving regulatory frameworks, and expanding medical cannabis markets.",
      "The Fund offers a concentrated, conviction-led investment strategy with meaningful long-term upside through scalable infrastructure, multiple recurring revenue streams, and exposure to one of the fastest-growing segments of the global cannabis industry.",
    ],

    factSheet: {
      accentHex: "#10B981",
      asOf: "Q1 2026",
      strategyType: "Licensed Extraction Infrastructure · Growth",
      domicile: "Cayman Islands SPC (Segregated Portfolio)",
      shareClass: "Participating Shares",
      currencies: "USD (CAD, GBP, EUR on approval)",
      subscriptionFreq: "Periodic, subject to approval",
      redemptionFreq: "Buyout-driven; 2–3 year horizon",
      lockup: "Aligned to 2–3 yr horizon",
      managementFee: "2.00% per annum of NAV",
      performanceFee: "20% above 6% hurdle, high-water mark",
      benchmark: "Regulated production sector (reference only)",
      targetIrr: "15% – 22% net",
      targetCashYield: "Variable",
      leverageCap: "Up to 1.5× NAV",
      administrator: "Independent third-party administrator",
      auditor: "Baker Tilly",
      custodian: "Tier-1 prime brokerage",
      governingLaw: "Cayman Islands",
      allocation: [
        { label: "Extraction & Processing Equipment", weight: 45 },
        { label: "Licensed Operating Assets", weight: 30 },
        { label: "Working Capital", weight: 15 },
        { label: "Cash & Equivalents", weight: 10 },
      ],
      indicativeTrack: [
        100, 102.4, 101.1, 104.8, 107.2, 105.6, 109.4, 112.1, 110.8, 114.6,
        117.9, 121.3,
      ],
      keyRisks: [
        "Regulatory risk in licensed cannabis extraction and processing markets.",
        "Concentration risk — small number of high-conviction positions.",
        "Leverage may amplify both gains and losses.",
        "Liquidity windows are limited; capital is long-duration.",
      ],
    },
  },
  {
    slug: "pharmaceutical-sp",
    name: "AI Precision Pharmaceutical SP",
    category: "Segregated Portfolio",
    tagline:
      "AI Precision Pharmaceutical SP - Concentrated, conviction-led exposure to the next generation of pharmaceutical innovation through patented cannabinoid active pharmaceutical ingredients (APIs), AI-enabled drug discovery, precision medicine, and regulated pharmaceutical intellectual property.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    accentFrom: "from-emerald-500/20",
    accentTo: "to-gold-500/10",

    riskProfile: "High",
    riskLevel: 5,
    horizon: "2–3 yrs",
    minimum: "$1M",

    overview: [
      "Our strategy targets high-value opportunities across pharmaceutical manufacturing, licensing, royalties, structured financing, and therapeutic development, underpinned by a fully issued process patent, compliance-driven operations, and proprietary AI-powered discovery.",
      "By combining pharmaceutical-grade cannabinoid production with advanced data analytics and precision therapeutics, we seek to build a differentiated portfolio of scalable healthcare assets positioned at the intersection of biotechnology, artificial intelligence, and regulated pharmaceuticals.",
      "This concentrated strategy is designed to capture asymmetric long-term value through proprietary intellectual property, strategic partnerships, and the commercialization of next-generation cannabinoid-based medicines, while recognizing the elevated risk and volatility inherent in early-stage pharmaceutical innovation.",
    ],
    highlights: [
      "Our strategy targets high-value opportunities across pharmaceutical manufacturing, licensing, royalties, structured financing, and therapeutic development, underpinned by a fully issued process patent, compliance-driven operations, and proprietary AI-powered discovery.",
      "By combining pharmaceutical-grade cannabinoid production with advanced data analytics and precision therapeutics, we seek to build a differentiated portfolio of scalable healthcare assets positioned at the intersection of biotechnology, artificial intelligence, and regulated pharmaceuticals.",
      "This concentrated strategy is designed to capture asymmetric long-term value through proprietary intellectual property, strategic partnerships, and the commercialization of next-generation cannabinoid-based medicines, while recognizing the elevated risk and volatility inherent in early-stage pharmaceutical innovation.",
    ],
    detailsFile: "/folders/Pharmaceutical Fund ii SP .pdf",

    details: {
      shareClasses: [
        { name: "Class A", dividends: "TBD", minimum: "$1M" },
        { name: "Class B", dividends: "TBD", minimum: "$5M" },
      ],
      title: "Pharmaceutical Fund ii SP",
      subtitle:
        "The Future of Medicine Will Be Personalized. The Future of Cannabinoids Will Be Pharmaceutical. We Are Building Both.",
      quote:
        "We are not building a cannabinoid manufacturer. We are building the world's first AI-powered precision cannabinoid pharmaceutical platform, enabled by a patented manufacturing process that provides a unique regulatory and supply-chain advantage.",
      sections: [
        {
          heading:
            "Investment Opportunity — Building the World's First AI-Powered Precision Cannabinoid Pharmaceutical Platform",
          body: [
            "Healthcare is approaching a breaking point. Chronic disease now accounts for approximately 74% of global deaths according to the World Health Organization. More than 1.7 billion people worldwide suffer from chronic pain, over 970 million suffer from mental health disorders, more than 55 million live with dementia, and hundreds of millions suffer from autoimmune and inflammatory diseases.",
            "Yet the pharmaceutical industry continues to rely largely on a treatment model developed decades ago: one drug, one indication, one patient population. This model is becoming increasingly ineffective, expensive, and unsustainable — global healthcare spending exceeded $10 trillion annually and is projected to surpass $15 trillion over the next decade.",
            "The next evolution of medicine will not be defined by discovering another blockbuster drug. It will be defined by precision medicine — matching the right therapy to the right patient at the right time. Our company is uniquely positioned at the convergence of four transformative global megatrends: Artificial Intelligence, Precision Medicine, Pharmaceutical Manufacturing, and Cannabinoid Therapeutics.",
            "Our vision is not to participate in the cannabinoid industry. Our vision is to redefine it.",
          ],
        },
        {
          heading:
            "The Global Problem — The Failure of Traditional Pharmaceutical Models",
          body: [
            "The pharmaceutical industry spends approximately $2.6 billion to bring a single new drug to market. Drug development timelines often exceed 10 to 15 years. More than 90% of drug candidates fail during clinical development, and many approved therapies produce highly variable outcomes between patients.",
          ],
          groups: [
            {
              title: "The Result",
              items: [
                "Rising healthcare costs",
                "Growing patient dissatisfaction",
                "Increasing drug dependency",
                "Significant adverse events",
                "Limited treatment personalization",
              ],
            },
            {
              title: "In the United States Alone",
              items: [
                "More than 80,000 opioid-related deaths occur annually",
                "Chronic pain affects over 50 million adults",
                "Healthcare expenditures exceed $4.5 trillion annually",
              ],
            },
            {
              title: "Globally",
              items: [
                "Depression affects approximately 280 million people",
                "Anxiety disorders affect over 300 million people",
                "Sleep disorders affect over 1 billion people",
                "Autoimmune diseases impact hundreds of millions",
                "Neurological diseases are among the fastest growing causes of disability",
              ],
            },
          ],
        },
        {
          heading:
            "Why Cannabinoids? — The Most Underdeveloped Pharmaceutical Opportunity of the Century",
          body: [
            "The human endocannabinoid system is one of the largest biological regulatory systems in the body, influencing pain signaling, inflammation, immune function, mood, sleep, neuroprotection, metabolism, gastrointestinal function, and cellular homeostasis.",
            "Researchers have identified over 140 cannabinoids, yet only a small fraction have been investigated systematically. Today the global cannabinoid market remains largely fragmented and dominated by consumer products, wellness products, commodity ingredients, and non-standardized formulations. Virtually no company has successfully integrated pharmaceutical-grade manufacturing, artificial intelligence, precision medicine, proprietary patient data, and drug discovery into a single platform — creating a once-in-a-generation opportunity.",
          ],
        },
        {
          heading: "Our Solution — The Cannabinoid Intelligence Platform™",
          body: [
            "We are building an integrated platform consisting of three proprietary pillars.",
          ],
          groups: [
            {
              title: "Pillar 1: Patented Pharmaceutical Manufacturing",
              items: [
                "Our fully issued process patent establishes a defensible position in the production of pharmaceutical cannabinoid active pharmaceutical ingredients (APIs).",
                "Provides intellectual property protection, regulatory differentiation, manufacturing defensibility, strategic partnering opportunities, and potential licensing revenue.",
                "As global regulations evolve toward pharmaceutical standards, compliance becomes a critical competitive advantage — many current producers will be unable to meet future pharmaceutical requirements.",
              ],
            },
            {
              title: "Pillar 2: Artificial Intelligence Drug Discovery",
              items: [
                "Our AI platform analyzes millions of data points across scientific literature, clinical studies, pharmacological databases, molecular interactions, disease pathways, and patient outcomes.",
                "The system identifies previously undiscovered relationships between cannabinoids, targets, disease states, and patient populations.",
                "Traditional pharmaceutical discovery takes 10–15 years; AI-assisted discovery can potentially be 30–70% faster for target identification and candidate prioritization.",
              ],
            },
            {
              title: "Pillar 3: Precision Cannabinoid Medicine",
              items: [
                "Current medicine treats populations — we intend to treat individuals.",
                "Using AI-driven analytics, we aim to identify which cannabinoid works best, which disease subtype responds, which patient characteristics predict success, and optimal dosing and delivery methods.",
                "This transforms cannabinoid therapy from generalized treatment into precision medicine.",
              ],
            },
          ],
        },
        {
          heading:
            "The Data Moat — The Most Valuable Asset Will Not Be Cannabinoids",
          body: [
            "The most valuable asset will be data — every patient outcome, every formulation, every dosage protocol, every indication investigated, every biomarker identified creates proprietary intelligence. As the platform grows, the AI becomes increasingly predictive, and the resulting data moat becomes exponentially more valuable.",
            "Competitors can replicate products. They cannot replicate years of proprietary patient data and machine learning models.",
          ],
        },
        {
          heading: "Market Opportunity — Multiple Multi-Billion-Dollar Markets",
          groups: [
            {
              title: "Therapeutic Markets",
              items: [
                "Pain Management = $80+ Billion",
                "Neurology = $150+ Billion",
                "Mental Health = $400+ Billion",
                "Sleep Therapeutics = $100+ Billion",
                "Inflammatory & Autoimmune Diseases = $120+ Billion",
              ],
            },
            {
              title: "Adjacent Platform Markets",
              items: [
                "Precision Medicine — projected to exceed $250 Billion by 2030",
                "Artificial Intelligence in Healthcare — projected to exceed $180 Billion by 2030",
                "Cannabinoid Therapeutics — projected to exceed $60 Billion globally over the next decade",
              ],
            },
          ],
          closing:
            "Our platform sits directly at the intersection of all these markets.",
        },
        {
          heading: "Competitive Advantage — Why We Win",
          groups: [
            {
              title: "Traditional Cannabis Companies",
              items: [
                "Compete on cultivation",
                "Compete on extraction",
                "Compete on price",
                "Low margins",
                "Minimal IP",
              ],
            },
            {
              title: "Biotechnology Companies",
              items: [
                "Expensive discovery",
                "Long timelines",
                "Limited cannabinoid expertise",
              ],
            },
            {
              title: "Technology Companies",
              items: ["AI expertise", "No pharmaceutical infrastructure"],
            },
            {
              title: "Our Platform Combines",
              items: [
                "Patented Manufacturing",
                "Pharmaceutical Compliance",
                "AI Discovery",
                "Precision Medicine",
                "Proprietary Clinical Data",
                "Novel Intellectual Property Creation",
                "Regulatory Advantage",
              ],
            },
          ],
          closing:
            "This combination is extremely rare and difficult to replicate.",
        },
        {
          heading: "Revenue Model",
          groups: [
            {
              title: "Seven Revenue Streams",
              items: [
                "Pharmaceutical API Sales",
                "AI Discovery Partnerships",
                "Drug Development Collaborations",
                "Licensing of Novel Therapeutic Applications",
                "Precision Medicine Software Platforms",
                "Intellectual Property Licensing",
                "Strategic Pharmaceutical Partnerships",
              ],
            },
          ],
        },
        {
          heading: "Exit Potential",
          body: [
            "The largest pharmaceutical companies are actively pursuing AI-enabled drug discovery, precision medicine platforms, novel therapeutic modalities, and data-rich healthcare assets.",
          ],
          groups: [
            {
              title: "Potential Acquirers Include",
              items: [
                "Major pharmaceutical companies",
                "Major biotechnology companies",
                "Healthcare AI companies",
                "Global contract manufacturing organizations",
                "Large healthcare platforms",
              ],
            },
          ],
          closing:
            "The most valuable pharmaceutical acquisitions of the last decade have centered around proprietary platforms rather than individual products. Our objective is to build a platform company. Not a single-product company.",
        },
        {
          heading: "Vision",
          body: [
            "We believe the future of medicine is personalized. We believe cannabinoids represent one of the largest untapped therapeutic opportunities in modern healthcare. We believe artificial intelligence will fundamentally transform drug discovery.",
            "By combining patented pharmaceutical manufacturing, artificial intelligence, precision medicine, and proprietary clinical data, we are creating a company positioned to become the global leader in cannabinoid-based precision therapeutics.",
            "This is not the next cannabis company. This is the next-generation pharmaceutical platform. And we believe it has the potential to transform how chronic disease is treated worldwide.",
          ],
        },
      ],
    },

    factSheet: {
      accentHex: "#10B981",
      asOf: "Q1 2026",
      strategyType: "Pharma Royalties & Licensing · Growth",
      domicile: "Cayman Islands SPC (Segregated Portfolio)",
      shareClass: "Participating Shares",
      currencies: "USD (CAD, GBP, EUR on approval)",
      subscriptionFreq: "Periodic, subject to approval",
      redemptionFreq: "Buyout-driven; 2–3 year horizon",
      lockup: "Aligned to 2–3 yr horizon",
      managementFee: "2.00% per annum of NAV",
      performanceFee: "20% above 6% hurdle, high-water mark",
      benchmark: "Regulated pharma sector (reference only)",
      targetIrr: "15% – 22% net",
      targetCashYield: "Variable",
      leverageCap: "Up to 1.5× NAV",
      administrator: "Independent third-party administrator",
      auditor: "Baker Tilly",
      custodian: "Tier-1 prime brokerage",
      governingLaw: "Cayman Islands",
      allocation: [
        { label: "Royalty Streams", weight: 40 },
        { label: "Licensing Agreements", weight: 30 },
        { label: "Structured Financing", weight: 20 },
        { label: "Cash & Equivalents", weight: 10 },
      ],
      indicativeTrack: [
        100, 101.8, 103.1, 104.9, 106.2, 108.4, 110.1, 112.6, 114.3, 116.9,
        119.2, 122.0,
      ],
      keyRisks: [
        "Regulatory and clinical-milestone risk on underlying pharma assets.",
        "Concentration risk — small number of high-conviction positions.",
        "Returns and milestones are anticipated, not guaranteed.",
        "Liquidity windows are limited; capital is long-duration.",
      ],
    },
  },
];

export const getOpportunityBySlug = (slug) =>
  opportunities.find((o) => o.slug === slug);
