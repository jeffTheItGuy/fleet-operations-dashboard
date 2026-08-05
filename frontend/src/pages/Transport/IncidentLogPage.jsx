import React from 'react'
import { AlertTriangle, Plus, FileText, User, Clock, MapPin } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const incidentData = [
  { id: 'INC-2026-042', vehicle: 'ZUP-105', driver: 'S. Mangwiro', type: 'Mechanical', severity: 'medium', description: 'Air conditioning unit failure on Route 3', location: 'Samora Machel Ave', reportedAt: '2026-08-05 08:15', status: 'open', assignedTo: 'T. Moyo' },
  { id: 'INC-2026-041', vehicle: 'EV-004', driver: 'P. Chiweshe', type: 'Electrical', severity: 'high', description: 'Charging port damaged at Victoria Falls depot', location: 'Victoria Falls Depot', reportedAt: '2026-08-04 16:30', status: 'inprogress', assignedTo: 'P. Chiweshe' },
  { id: 'INC-2026-040', vehicle: 'HAU-015', driver: 'K. Dube', type: 'Road Hazard', severity: 'low', description: 'Pothole damage to tire on A5 highway', location: 'A5 Highway, km 45', reportedAt: '2026-08-04 11:20', status: 'resolved', assignedTo: 'T. Moyo' },
  { id: 'INC-2026-039', vehicle: 'ZUP-104', driver: 'J. Mupfumi', type: 'Mechanical', severity: 'medium', description: 'Brake squeaking reported by passengers', location: 'Mbare Terminus', reportedAt: '2026-08-03 07:45', status: 'resolved', assignedTo: 'J. Ncube' },
  { id: 'INC-2026-038', vehicle: 'REC-033', driver: 'M. Tshuma', type: 'Mechanical', severity: 'high', description: 'Engine overheating during recovery operation', location: 'Bulawayo Road', reportedAt: '2026-08-02 14:00', status: 'inprogress', assignedTo: 'J. Ncube' },
  { id: 'INC-2026-037', vehicle: 'ZUP-203', driver: 'T. Chikwava', type: 'Passenger', severity: 'low', description: 'Seat damage in rear row', location: 'Chitungwiza Depot', reportedAt: '2026-08-01 17:00', status: 'resolved', assignedTo: 'T. Moyo' },
]

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
  { key: 'reportedAt', label: 'Reported At' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'assignedTo', label: 'Assigned To' },
]

function IncidentLogPage() {
  const openIncidents = incidentData.filter(i => i.status === 'open' || i.status === 'inprogress').length

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
            <h3>{incidentData.length}</h3>
            <p>Total This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><User size={24} /></div>
          <div className="stat-content">
            <h3>3</h3>
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
          <button className="btn btn-primary btn-sm">
            <Plus size={14} /> New Incident
          </button>
        </div>
        <DataTable columns={columns} data={incidentData} pageSize={6} />
      </div>
    </div>
  )
}

export default IncidentLogPage
