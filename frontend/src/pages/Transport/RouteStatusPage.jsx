import React from 'react'
import { Bus, MapPin, Clock, Users, AlertCircle, CheckCircle2 } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const routeData = [
  { id: 'R-001', routeName: 'Harare CBD - Mbare', bus: 'ZUP-104', driver: 'J. Mupfumi', status: 'active', passengers: 45, startTime: '05:30', currentLocation: 'Mbare Terminus', nextStop: 'Copacabana', delay: 'On time' },
  { id: 'R-002', routeName: 'Harare - Chitungwiza', bus: 'EV-003', driver: 'T. Chikwava', status: 'active', passengers: 38, startTime: '06:00', currentLocation: 'Chitungwiza Town Centre', nextStop: 'Zengeza 4', delay: 'On time' },
  { id: 'R-003', routeName: 'Harare - Borrowdale', bus: 'ZUP-105', driver: 'S. Mangwiro', status: 'active', passengers: 28, startTime: '06:15', currentLocation: 'Samora Machel Ave', nextStop: 'Borrowdale Road', delay: '+10 min' },
  { id: 'R-004', routeName: 'Harare - Kuwadzana', bus: 'ZUP-106', driver: 'P. Musvuri', status: 'active', passengers: 52, startTime: '05:45', currentLocation: 'Kuwadzana Roundabout', nextStop: 'Kuwadzana 3', delay: 'On time' },
  { id: 'R-005', routeName: 'Harare - Highfield', bus: 'EV-002', driver: 'R. Gumbo', status: 'charging', passengers: 0, startTime: '07:00', currentLocation: 'Harare Depot', nextStop: 'Glenara Shops', delay: 'Delayed' },
  { id: 'R-006', routeName: 'Harare - Epworth', bus: 'ZUP-107', driver: 'M. Chari', status: 'active', passengers: 41, startTime: '06:30', currentLocation: 'Dombo Shops', nextStop: 'Stop 4', delay: 'On time' },
  { id: 'R-007', routeName: 'Victoria Falls - Airport', bus: 'ZUP-208', driver: 'K. Ndhlovu', status: 'active', passengers: 22, startTime: '08:00', currentLocation: 'Airport Road', nextStop: 'Victoria Falls Airport', delay: 'On time' },
  { id: 'R-008', routeName: 'Bulawayo - Nketa', bus: 'ZUP-108', driver: 'L. Sibanda', status: 'maintenance', passengers: 0, startTime: '—', currentLocation: 'Bulawayo Depot', nextStop: '—', delay: 'Out of Service' },
]

const columns = [
  { key: 'routeName', label: 'Route' },
  { key: 'bus', label: 'Bus', width: '100px' },
  { key: 'driver', label: 'Driver' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'passengers', label: 'Passengers', render: (val) => val > 0 ? val : '—' },
  { key: 'startTime', label: 'Start Time' },
  { key: 'currentLocation', label: 'Current Location' },
  { key: 'nextStop', label: 'Next Stop' },
  {
    key: 'delay',
    label: 'Delay',
    render: (val) => (
      <span style={{
        color: val === 'On time' ? '#27ae60' : val === 'Delayed' || val.includes('overdue') ? '#e74c3c' : '#f39c12',
        fontWeight: 600,
        fontSize: '0.85rem'
      }}>
        {val === 'On time' && <CheckCircle2 size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />}
        {val === 'Delayed' && <AlertCircle size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />}
        {val}
      </span>
    )
  },
]

function RouteStatusPage() {
  const activeRoutes = routeData.filter(r => r.status === 'active').length
  const totalPassengers = routeData.filter(r => r.status === 'active').reduce((sum, r) => sum + r.passengers, 0)

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Route Status Monitor</h1>
      <p className="page-subtitle">
        Live operational status of CMED Urban Transit routes
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><Bus size={24} /></div>
          <div className="stat-content">
            <h3>{activeRoutes}</h3>
            <p>Active Routes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Users size={24} /></div>
          <div className="stat-content">
            <h3>{totalPassengers}</h3>
            <p>Passengers Onboard</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={24} /></div>
          <div className="stat-content">
            <h3>1</h3>
            <p>Delayed Routes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertCircle size={24} /></div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Out of Service</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Active Routes</h3>
          <button className="btn btn-outline btn-sm">Refresh Status</button>
        </div>
        <DataTable columns={columns} data={routeData} pageSize={8} />
      </div>
    </div>
  )
}

export default RouteStatusPage
