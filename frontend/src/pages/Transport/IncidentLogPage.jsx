import React, { useState, useEffect } from 'react'
import { AlertTriangle, FileText, User, Clock, MapPin } from 'lucide-react'
import { transportApi } from '../../services/api.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const columns = [
  { key: 'id', label: 'Incident ID', width: '130px' },
  { key: 'vehicle', label: 'Vehicle', width: '100px' },
  { key: 'driver', label: 'Driver' },
  { key: 'type', label: 'Type' },
  {
    key: 'severity',
    label: 'Severity',
    render: (val) => (
      <StatusBadge
        status={val === 'high' ? 'danger' : val === 'medium' ? 'warning' : 'info'}
        customLabel={val.charAt(0).toUpperCase() + val.slice(1)}
      />
    )
  },
  { key: 'description', label: 'Description' },
  { key: 'location', label: 'Location' },
  { key: 'reportedAt', label: 'Reported At', render: (val) => val ? new Date(val).toLocaleString() : '—' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'assignedTo', label: 'Assigned To' },
]

function IncidentLogPage() {
  const [incidentData, setIncidentData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    transportApi.getIncidents()
      .then(res => setIncidentData(res.data))
      .finally(() => setLoading(false))
  }, [])

  const openIncidents = incidentData?.filter(i => i.status === 'open' || i.status === 'inprogress').length || 0

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Incident Log</h1>
      <p className="page-subtitle">
        Driver-reported mechanical issues and road hazards
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon red"><AlertTriangle size={24} /></div>
          <div className="stat-content">
            <h3>{openIncidents}</h3>
            <p>Open / In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><FileText size={24} /></div>
          <div className="stat-content">
            <h3>{incidentData?.length || 0}</h3>
            <p>Total This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><User size={24} /></div>
          <div className="stat-content">
            <h3>{new Set(incidentData?.map(i => i.driver)).size || 0}</h3>
            <p>Active Drivers Reporting</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Clock size={24} /></div>
          <div className="stat-content">
            <h3>4.2h</h3>
            <p>Avg. Resolution Time</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Incident Reports</h3>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <DataTable columns={columns} data={incidentData} pageSize={6} />
        )}
      </div>
    </div>
  )
}

export default IncidentLogPage
