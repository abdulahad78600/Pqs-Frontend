import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import Home from './pages/Home.jsx'
import GetStarted from './pages/GetStarted.jsx'
import Funds from './pages/Funds.jsx'
import FundDetail from './pages/FundDetail.jsx'
import InvestmentOpportunities from './pages/InvestmentOpportunities.jsx'
import About from './pages/About.jsx'
import Mission from './pages/Mission.jsx'
import Team from './pages/Team.jsx'
import Leadership from './pages/Leadership.jsx'
import FundOverview from './pages/FundOverview.jsx'
import Insights from './pages/Insights.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

import Disclaimer from './pages/terms/Disclaimer.jsx'
import Privacy from './pages/terms/Privacy.jsx'
import Terms from './pages/terms/Terms.jsx'
import Aml from './pages/terms/Aml.jsx'

import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import VerifyOtp from './pages/auth/VerifyOtp.jsx'
import Verify2fa from './pages/auth/Verify2fa.jsx'
import ForgotPassword from './pages/auth/ForgotPassword.jsx'
import ResetPassword from './pages/auth/ResetPassword.jsx'

import { AuthProvider } from './auth/AuthContext.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import DashboardLayout from './components/dashboard/DashboardLayout.jsx'
import DashboardOverview from './pages/dashboard/Overview.jsx'
import DashboardSettings from './pages/dashboard/Settings.jsx'
import WalletPage from './pages/dashboard/Wallet.jsx'
import KycPage from './pages/dashboard/Kyc.jsx'
import NotificationsPage from './pages/dashboard/Notifications.jsx'
import SubscribePage from './pages/dashboard/Subscribe.jsx'
import WithdrawalsPage from './pages/dashboard/Withdrawals.jsx'
import StatementsPage from './pages/dashboard/Statements.jsx'

// Investor
import InvestorPortfolio from './pages/dashboard/investor/Portfolio.jsx'
import InvestorReports from './pages/dashboard/investor/Reports.jsx'
import InvestorInsights from './pages/dashboard/investor/Insights.jsx'

// Pharma
import PharmaCatalog from './pages/dashboard/pharma/Catalog.jsx'
import PharmaRnd from './pages/dashboard/pharma/Rnd.jsx'
import PharmaLicensing from './pages/dashboard/pharma/Licensing.jsx'
import PharmaClinical from './pages/dashboard/pharma/Clinical.jsx'

// Regulator
import RegulatorCompliance from './pages/dashboard/regulator/Compliance.jsx'
import RegulatorLicensingStatus from './pages/dashboard/regulator/LicensingStatus.jsx'
import RegulatorFacilities from './pages/dashboard/regulator/Facilities.jsx'

// RE Investor
import REProperties from './pages/dashboard/re_investor/Properties.jsx'
import REPerformance from './pages/dashboard/re_investor/Performance.jsx'
import REMarket from './pages/dashboard/re_investor/Market.jsx'
import REDevelopment from './pages/dashboard/re_investor/Development.jsx'

// Developer
import DeveloperProjects from './pages/dashboard/developer/Projects.jsx'
import DeveloperMilestones from './pages/dashboard/developer/Milestones.jsx'
import DeveloperBids from './pages/dashboard/developer/Bids.jsx'

// Senior / Family
import SeniorFindCare from './pages/dashboard/senior/FindCare.jsx'
import SeniorBookings from './pages/dashboard/senior/Bookings.jsx'
import SeniorSaved from './pages/dashboard/senior/Saved.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.25 } }
}

function AnimatedPage({ children }) {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  )
}

function Shell({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  )
}

// Hard-navigate to a static asset in /public, leaving the SPA entirely.
// Used by /cex so the standalone CannaExtract HTML page (public/cex.html)
// renders on its own — no PQS navbar/shell wrapping it.
function ExternalRedirect({ to }) {
  if (typeof window !== 'undefined') window.location.replace(to)
  return null
}

export default function App() {
  const location = useLocation()
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* PUBLIC landing — About + Login/Get Started only */}
          <Route path="/" element={<Shell><AnimatedPage><Home /></AnimatedPage></Shell>} />

          {/* CannaExtract standalone landing page (static public/cex.html) */}
          <Route path="/cex" element={<ExternalRedirect to="/cex.html" />} />
          <Route path="/CEX" element={<ExternalRedirect to="/cex.html" />} />
          <Route path="/get-started" element={<Shell><AnimatedPage><GetStarted /></AnimatedPage></Shell>} />

          {/* All other content is gated — guests are bounced to /login */}
          <Route path="/funds" element={
            <ProtectedRoute><Shell><AnimatedPage><Funds /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/funds/:slug" element={
            <ProtectedRoute><Shell><AnimatedPage><FundDetail /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/investment-opportunities" element={
            <ProtectedRoute><Shell><AnimatedPage><InvestmentOpportunities /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/about" element={<Shell><AnimatedPage><About /></AnimatedPage></Shell>} />
          <Route path="/team" element={<Shell><AnimatedPage><Team /></AnimatedPage></Shell>} />
          <Route path="/leadership" element={
            <ProtectedRoute><Shell><AnimatedPage><Leadership /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/mission" element={
            <ProtectedRoute><Shell><AnimatedPage><Mission /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/fund-overview" element={
            <ProtectedRoute><Shell><AnimatedPage><FundOverview /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/insights" element={
            <ProtectedRoute><Shell><AnimatedPage><Insights /></AnimatedPage></Shell></ProtectedRoute>
          } />
          <Route path="/contact" element={
            <ProtectedRoute><Shell><AnimatedPage><Contact /></AnimatedPage></Shell></ProtectedRoute>
          } />

          {/* LEGAL pages — public, wrapped in Shell */}
          <Route path="/disclaimer" element={<Shell><AnimatedPage><Disclaimer /></AnimatedPage></Shell>} />
          <Route path="/privacy-policy" element={<Shell><AnimatedPage><Privacy /></AnimatedPage></Shell>} />
          <Route path="/terms" element={<Shell><AnimatedPage><Terms /></AnimatedPage></Shell>} />
          <Route path="/aml-statement" element={<Shell><AnimatedPage><Aml /></AnimatedPage></Shell>} />

          {/* AUTH pages — wrapped in Shell */}
          <Route path="/login" element={<Shell><AnimatedPage><Login /></AnimatedPage></Shell>} />
          <Route path="/register" element={<Shell><AnimatedPage><Register /></AnimatedPage></Shell>} />
          <Route path="/verify-email" element={<Shell><AnimatedPage><VerifyOtp mode="register" /></AnimatedPage></Shell>} />
          <Route path="/verify-login" element={<Shell><AnimatedPage><VerifyOtp mode="login" /></AnimatedPage></Shell>} />
          <Route path="/verify-2fa"   element={<Shell><AnimatedPage><Verify2fa /></AnimatedPage></Shell>} />
          <Route path="/forgot-password" element={<Shell><AnimatedPage><ForgotPassword /></AnimatedPage></Shell>} />
          <Route path="/reset-password/:token" element={<Shell><AnimatedPage><ResetPassword /></AnimatedPage></Shell>} />

          {/* DASHBOARD — protected, nested */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Shell><DashboardLayout /></Shell>
            </ProtectedRoute>
          }>
            <Route index element={<DashboardOverview />} />

            {/* Investor */}
            <Route path="portfolio"  element={<InvestorPortfolio />} />
            <Route path="reports"    element={<InvestorReports />} />
            <Route path="insights"   element={<InvestorInsights />} />

            {/* Consolidated three-fund browse view */}
            <Route path="funds"            element={<Funds />} />
            <Route path="funds/:slug"      element={<FundDetail />} />

            {/* Account / API-backed pages */}
            <Route path="wallet"           element={<WalletPage />} />
            <Route path="kyc"              element={<KycPage />} />
            <Route path="notifications"    element={<NotificationsPage />} />
            <Route path="subscribe"        element={<SubscribePage />} />
            <Route path="subscribe/:fundId" element={<SubscribePage />} />
            <Route path="withdrawals"      element={<WithdrawalsPage />} />
            <Route path="statements"       element={<StatementsPage />} />

            {/* Pharma */}
            <Route path="catalog"   element={<PharmaCatalog />} />
            <Route path="rnd"       element={<PharmaRnd />} />
            <Route path="licensing" element={<PharmaLicensing />} />
            <Route path="clinical"  element={<PharmaClinical />} />

            {/* Regulator */}
            <Route path="compliance"        element={<RegulatorCompliance />} />
            <Route path="licensing-status"  element={<RegulatorLicensingStatus />} />
            <Route path="facilities"        element={<RegulatorFacilities />} />

            {/* RE Investor */}
            <Route path="properties"  element={<REProperties />} />
            <Route path="performance" element={<REPerformance />} />
            <Route path="market"      element={<REMarket />} />
            <Route path="development" element={<REDevelopment />} />

            {/* Developer */}
            <Route path="projects"   element={<DeveloperProjects />} />
            <Route path="milestones" element={<DeveloperMilestones />} />
            <Route path="bids"       element={<DeveloperBids />} />

            {/* Senior / Family */}
            <Route path="find-care" element={<SeniorFindCare />} />
            <Route path="bookings"  element={<SeniorBookings />} />
            <Route path="saved"     element={<SeniorSaved />} />

            {/* Shared */}
            <Route path="settings" element={<DashboardSettings />} />

            <Route path="*" element={<DashboardOverview />} />
          </Route>

          <Route path="*" element={<Shell><AnimatedPage><NotFound /></AnimatedPage></Shell>} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  )
}
