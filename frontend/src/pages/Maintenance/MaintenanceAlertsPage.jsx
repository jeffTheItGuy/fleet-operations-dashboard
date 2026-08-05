import React from 'react'
import { Bell, Wrench, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'
import { MaintenanceCostChart } from '../../components/Charts/Charts.jsx'

const alertsData = [
  { id: 1, vehicle: 'ZUP-104', type: 'Oil Change', dueDate: '2026-08-20', dueIn: 15, trigger: 'Mileage: 45,200 km', status: 'pending', assignedTo: 'T. Moyo' },
  { id: 2, vehicle: 'REC-033', type: 'Brake Pad Replacement', dueDate: '2026-08-05', dueIn: 0, trigger: 'Hours Run: 5,620h', status: 'overdue', assignedTo: 'J. Ncube' },
  { id: 3, vehicle: 'ZUP-107', type: 'Transmission Service', dueDate: '2026-08-08', dueIn: 3, trigger: 'Mileage: 47,800 km', status: 'pending', assignedTo: 'Unassigned' },
  { id: 4, vehicle: 'HAU-015', type: 'Tire Rotation', dueDate: '2026-09-01', dueIn: 27, trigger: 'Mileage: 123,400 km', status: 'pending', assignedTo: 'T. Moyo' },
  { id: 5, vehicle: 'REC-035', type: 'Engine Overhaul', dueDate: '2026-08-03', dueIn: -2, trigger: 'Hours Run: 5,890h', status: 'overdue', assignedTo: 'J. Ncube' },
  { id: 6, vehicle: 'ZUP-105', type: 'Coolant Flush', dueDate: '2026-08-15', dueIn: 10, trigger: 'Mileage: 38,900 km', status: 'pending', assignedTo: 'Unassigned' },
  { id: 7, vehicle: 'EV-004', type: 'Battery Health Check', dueDate: '2026-08-10', dueIn: 5, trigger: 'Battery: 78% health', status: 'pending', assignedTo: 'P. Chiweshe' },
  { id: 8, vehicle: 'ZUP-106', type: 'Air Filter Replacement', dueDate: '2026-08-18', dueIn: 13, trigger: 'Mileage: 32,100 km', status: 'pending', assignedTo: 'T. Moyo' },
]

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
  const overdue = alertsData.filter(a => a.status === 'overdue').length
  const pending = alertsData.filter(a => a.status === 'pending').length

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
            <h3>{alertsData.length}</h3>
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
            <button className="btn btn-primary btn-sm">
              <Wrench size={14} /> Schedule Service
            </button>
          </div>
          <DataTable columns={columns} data={alertsData} pageSize={6} />
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
