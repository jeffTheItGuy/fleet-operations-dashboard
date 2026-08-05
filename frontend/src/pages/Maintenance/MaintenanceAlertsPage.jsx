import React, { useState, useEffect } from 'react'
import { Bell, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import { maintenanceApi } from '../../services/api.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'
import { MaintenanceCostChart } from '../../components/Charts/Charts.jsx'

const costData = [
  { category: 'Engine & Transmission', cost: 45000 },
  { category: 'Brake Systems', cost: 28000 },
  { category: 'Electrical & Battery', cost: 32000 },
  { category: 'Tires & Suspension', cost: 19000 },
  { category: 'Body & Paint', cost: 12000 },
  { category: 'General Service', cost: 35000 },
]

const columns = [
  { key: 'vehicle', label: 'Vehicle', width: '120px' },
  { key: 'type', label: 'Service Type' },
  { key: 'trigger', label: 'Trigger' },
  { key: 'dueDate', label: 'Due Date' },
  {
    key: 'dueIn',
    label: 'Due In (Days)',
    render: (val) => (
      <span style={{
        color: val < 0 ? '#e74c3c' : val <= 5 ? '#f39c12' : '#27ae60',
        fontWeight: 600,
        fontSize: '0.9rem'
      }}>
        {val < 0 ? `${Math.abs(val)} days overdue` : `${val} days`}
      </span>
    )
  },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'assignedTo', label: 'Assigned To' },
]

function MaintenanceAlertsPage() {
  const [alertsData, setAlertsData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    maintenanceApi.getAlerts()
      .then(res => setAlertsData(res.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const overdue = alertsData?.filter(a => a.status === 'overdue').length || 0
  const pending = alertsData?.filter(a => a.status === 'pending').length || 0

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Maintenance Alerts</h1>
      <p className="page-subtitle">
        Predictive maintenance alerts based on mileage and hours run
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon orange"><Bell size={24} /></div>
          <div className="stat-content">
            <h3>{alertsData?.length || 0}</h3>
            <p>Total Alerts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={24} /></div>
          <div className="stat-content">
            <h3>{overdue}</h3>
            <p>Overdue</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Clock size={24} /></div>
          <div className="stat-content">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={24} /></div>
          <div className="stat-content">
            <h3>12</h3>
            <p>Completed This Month</p>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Service Alerts</h3>
          </div>
          {loading ? (
            <div className="loading-container"><div className="loading-spinner" /></div>
          ) : error ? (
            <div className="empty-state"><p>Error loading alerts</p></div>
          ) : (
            <DataTable columns={columns} data={alertsData} pageSize={6} />
          )}
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Maintenance Cost Breakdown (YTD)</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>USD</span>
          </div>
          <MaintenanceCostChart data={costData} />
        </div>
      </div>
    </div>
  )
}

export default MaintenanceAlertsPage
