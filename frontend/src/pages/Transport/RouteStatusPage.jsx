import React, { useState, useEffect } from 'react'
import { Bus, MapPin, Clock, Users, AlertCircle, CheckCircle2 } from 'lucide-react'
import { transportApi } from '../../services/api.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

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
  { key: 'startTime', label: 'Start Time', render: (val) => val || '—' },
  { key: 'currentLocation', label: 'Current Location' },
  { key: 'nextStop', label: 'Next Stop', render: (val) => val || '—' },
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
  const [routeData, setRouteData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    transportApi.getRoutes()
      .then(res => setRouteData(res.data))
      .finally(() => setLoading(false))
  }, [])

  const activeRoutes = routeData?.filter(r => r.status === 'active').length || 0
  const totalPassengers = routeData?.filter(r => r.status === 'active').reduce((sum, r) => sum + (r.passengers || 0), 0) || 0

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
            <h3>{routeData?.filter(r => r.delay !== 'On time').length || 0}</h3>
            <p>Delayed Routes</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertCircle size={24} /></div>
          <div className="stat-content">
            <h3>{routeData?.filter(r => r.status === 'maintenance' || r.status === 'inactive').length || 0}</h3>
            <p>Out of Service</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Active Routes</h3>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <DataTable columns={columns} data={routeData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default RouteStatusPage
