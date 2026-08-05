import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Layout/Sidebar.jsx'
import Header from './components/Layout/Header.jsx'

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
import NewTicketPage from './pages/Helpdesk/NewTicketPage.jsx'
import ComplianceTrackerPage from './pages/Cybersecurity/ComplianceTrackerPage.jsx'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  return (
    <div className="layout">
      <Sidebar className={mobileMenuOpen ? 'open' : ''} />
      <div className="main-content">
        <Header
          onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          isMobileMenuOpen={mobileMenuOpen}
        />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />

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
            <Route path="/helpdesk/new" element={<NewTicketPage />} />

            {/* Compliance */}
            <Route path="/compliance" element={<ComplianceTrackerPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
