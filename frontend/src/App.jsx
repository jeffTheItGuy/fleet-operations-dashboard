import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar.jsx'
import Header from './components/Layout/Header.jsx'
import LandingPage from './pages/Landing/LandingPage.jsx'
// Pages
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import EVFleetPage from './pages/Fleet/EVFleetPage.jsx'
import CombustionFleetPage from './pages/Fleet/CombustionFleetPage.jsx'
import MaintenanceAlertsPage from './pages/Maintenance/MaintenanceAlertsPage.jsx'
import ServiceLogPage from './pages/Maintenance/ServiceLogPage.jsx'
import RouteStatusPage from './pages/Transport/RouteStatusPage.jsx'
import IncidentLogPage from './pages/Transport/IncidentLogPage.jsx'
import AssetInventoryPage from './pages/ITAssets/AssetInventoryPage.jsx'
import AssetDetailPage from './pages/ITAssets/AssetDetailPage.jsx'
import TicketListPage from './pages/Helpdesk/TicketListPage.jsx'
import TicketDetailPage from './pages/Helpdesk/TicketDetailPage.jsx'
import ComplianceTrackerPage from './pages/Cybersecurity/ComplianceTrackerPage.jsx'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <Routes>
      {/* Landing / demo intro — no sidebar or header */}
      <Route path="/" element={<LandingPage />} />

      {/* Everything else lives inside the app shell */}
      <Route
        path="/*"
        element={
          <div className="layout">
            <Sidebar
              className={mobileMenuOpen ? 'open' : ''}
              onClose={() => setMobileMenuOpen(false)}
            />
            <div className="main-content">
              <Header
                onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                isMobileMenuOpen={mobileMenuOpen}
              />
              <div className="content-area">
                <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* Fleet */}
                  <Route path="/fleet/ev" element={<EVFleetPage />} />
                  <Route path="/fleet/combustion" element={<CombustionFleetPage />} />
                  {/* Maintenance */}
                  <Route path="/maintenance/alerts" element={<MaintenanceAlertsPage />} />
                  <Route path="/maintenance/log" element={<ServiceLogPage />} />
                  {/* Transport */}
                  <Route path="/transport/routes" element={<RouteStatusPage />} />
                  <Route path="/transport/incidents" element={<IncidentLogPage />} />
                  {/* IT Assets */}
                  <Route path="/assets/inventory" element={<AssetInventoryPage />} />
                  <Route path="/assets/detail" element={<AssetDetailPage />} />
                  {/* Helpdesk */}
                  <Route path="/helpdesk/tickets" element={<TicketListPage />} />
                  <Route path="/helpdesk/ticket/:id" element={<TicketDetailPage />} />
                  {/* Compliance */}
                  <Route path="/compliance" element={<ComplianceTrackerPage />} />
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  )
}

export default App