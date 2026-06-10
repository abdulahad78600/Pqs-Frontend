// Single source of truth for roles, permissions (RBAC), and role metadata.
// Add a new role here → it appears in registration and gets its own dashboard.

import {
  TrendingUp, FlaskConical, ShieldCheck, Building2, HardHat, Heart
} from 'lucide-react'

export const ROLES = {
  INVESTOR:        'investor',
  PHARMA:          'pharma',
  REGULATOR:       'regulator',
  RE_INVESTOR:     're_investor',
  DEVELOPER:       'developer',
  SENIOR_FAMILY:   'senior_family'
}

export const PERMISSIONS = {
  VIEW_INVESTMENT_REPORTS:   'view:investment_reports',
  VIEW_FINANCIAL_DATA:       'view:financial_data',
  VIEW_AI_INSIGHTS:          'view:ai_insights',
  VIEW_PROJECT_UPDATES:      'view:project_updates',
  VIEW_PRODUCT_CATALOG:      'view:product_catalog',
  VIEW_RND_PROGRESS:         'view:rnd_progress',
  VIEW_LICENSING:            'view:licensing',
  MONITOR_COMPLIANCE:        'monitor:compliance',
  VIEW_PROPERTY_PORTFOLIO:   'view:property_portfolio',
  VIEW_MARKET_ANALYSIS:      'view:market_analysis',
  TRACK_CONSTRUCTION:        'track:construction',
  SUBMIT_BIDS:               'submit:bids',
  BROWSE_FACILITIES:         'browse:facilities',
  BOOK_FACILITY:             'book:facility',
  ACCESS_VIRTUAL_TOURS:      'access:virtual_tours'
}

export const ROLE_DEFINITIONS = {
  [ROLES.INVESTOR]: {
    id: ROLES.INVESTOR,
    label: 'Investor',
    description: 'Access investment reports, real-time project updates, AI-driven market insights, and financial data across our pharma and real estate funds.',
    icon: TrendingUp,
    accent: 'from-emerald-500/30 to-gold-500/10',
    iconColor: 'text-emerald-300',
    permissions: [
      PERMISSIONS.VIEW_INVESTMENT_REPORTS,
      PERMISSIONS.VIEW_FINANCIAL_DATA,
      PERMISSIONS.VIEW_AI_INSIGHTS,
      PERMISSIONS.VIEW_PROJECT_UPDATES,
      PERMISSIONS.VIEW_MARKET_ANALYSIS
    ],
    requiresMfa: true,
    onboardingFields: ['organization', 'accreditation', 'ticketSize']
  },
  [ROLES.PHARMA]: {
    id: ROLES.PHARMA,
    label: 'Pharmaceutical Company',
    description: 'Source APIs, license cannabinoid technology, view R&D progress, and partner on Halal-compliant pharmaceutical products.',
    icon: FlaskConical,
    accent: 'from-violet-500/30 to-gold-500/10',
    iconColor: 'text-violet-300',
    permissions: [
      PERMISSIONS.VIEW_PRODUCT_CATALOG,
      PERMISSIONS.VIEW_RND_PROGRESS,
      PERMISSIONS.VIEW_LICENSING,
      PERMISSIONS.VIEW_AI_INSIGHTS
    ],
    requiresMfa: true,
    onboardingFields: ['organization', 'license', 'sector']
  },
  [ROLES.REGULATOR]: {
    id: ROLES.REGULATOR,
    label: 'Regulatory Authority',
    description: 'Monitor compliance, licensing status, and facility progress against EU GMP, API, Halal, and CRA frameworks.',
    icon: ShieldCheck,
    accent: 'from-sky-500/30 to-gold-500/10',
    iconColor: 'text-sky-300',
    permissions: [
      PERMISSIONS.MONITOR_COMPLIANCE,
      PERMISSIONS.VIEW_LICENSING,
      PERMISSIONS.VIEW_PROJECT_UPDATES
    ],
    requiresMfa: true,
    onboardingFields: ['organization', 'jurisdiction', 'authorityId']
  },
  [ROLES.RE_INVESTOR]: {
    id: ROLES.RE_INVESTOR,
    label: 'Real Estate Investor',
    description: 'Access property portfolios, financial performance, market analysis, and senior-living development updates.',
    icon: Building2,
    accent: 'from-amber-500/30 to-gold-500/10',
    iconColor: 'text-amber-300',
    permissions: [
      PERMISSIONS.VIEW_PROPERTY_PORTFOLIO,
      PERMISSIONS.VIEW_FINANCIAL_DATA,
      PERMISSIONS.VIEW_MARKET_ANALYSIS,
      PERMISSIONS.VIEW_PROJECT_UPDATES
    ],
    requiresMfa: true,
    onboardingFields: ['organization', 'accreditation', 'ticketSize']
  },
  [ROLES.DEVELOPER]: {
    id: ROLES.DEVELOPER,
    label: 'Developer / Construction Partner',
    description: 'Track construction milestones, communicate with fund managers, and submit bids on new modular and urban infill projects.',
    icon: HardHat,
    accent: 'from-orange-500/30 to-gold-500/10',
    iconColor: 'text-orange-300',
    permissions: [
      PERMISSIONS.TRACK_CONSTRUCTION,
      PERMISSIONS.SUBMIT_BIDS,
      PERMISSIONS.VIEW_PROJECT_UPDATES
    ],
    requiresMfa: false,
    onboardingFields: ['organization', 'specialty', 'license']
  },
  [ROLES.SENIOR_FAMILY]: {
    id: ROLES.SENIOR_FAMILY,
    label: 'Senior / Family',
    description: 'Find and book affordable long-term care facilities, view pricing, take virtual tours, and reserve accommodations.',
    icon: Heart,
    accent: 'from-rose-500/30 to-gold-500/10',
    iconColor: 'text-rose-300',
    permissions: [
      PERMISSIONS.BROWSE_FACILITIES,
      PERMISSIONS.BOOK_FACILITY,
      PERMISSIONS.ACCESS_VIRTUAL_TOURS
    ],
    requiresMfa: false,
    onboardingFields: ['relationship', 'preferredCity']
  }
}

export const ALL_ROLES = Object.values(ROLE_DEFINITIONS)
export const getRole = (roleId) => ROLE_DEFINITIONS[roleId]
export const hasPermission = (user, permission) =>
  !!user && (getRole(user.role)?.permissions || []).includes(permission)
