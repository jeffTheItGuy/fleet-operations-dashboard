import React from 'react'
import { Plus, Filter, Fuel, Gauge, AlertTriangle } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const combustionData = [
  { id: 'COM-001', type: 'Urban Bus', model: 'Hino RK8', regNumber: 'ZUP-104', location: 'Harare Depot', fuelLevel: 78, status: 'active', nextService: '2026-08-20', mileage: 45200, hoursRun: 3840 },
  { id: 'COM-002', type: 'Urban Bus', model: 'Hino RK8', regNumber: 'ZUP-105', location: 'Harare Depot', fuelLevel: 34, status: 'active', nextService: '2026-08-15', mileage: 38900, hoursRun: 3210 },
  { id: 'COM-003', type: 'Recovery Truck', model: 'Isuzu FVR', regNumber: 'REC-033', location: 'Bulawayo', fuelLevel: 12, status: 'maintenance', nextService: '2026-08-05', mileage: 67800, hoursRun: 5620 },
  { id: 'COM-004', type: 'Haulage Truck', model: 'Mercedes Actros', regNumber: 'HAU-015', location: 'Harare Depot', fuelLevel: 89, status: 'active', nextService: '2026-09-01', mileage: 123400, hoursRun: 8900 },
  { id: 'COM-005', type: 'Urban Bus', model: 'Hino RK8', regNumber: 'ZUP-106', location: 'Chitungwiza', fuelLevel: 56, status: 'active', nextService: '2026-08-18', mileage: 32100, hoursRun: 2780 },
  { id: 'COM-006', type: 'Recovery Truck', model: 'Isuzu FVR', regNumber: 'REC-034', location: 'Mutare', fuelLevel: 67, status: 'active', nextService: '2026-08-25', mileage: 54200, hoursRun: 4450 },
  { id: 'COM-007', type: 'Urban Bus', model: 'Hino RK8', regNumber: 'ZUP-107', location: 'Harare Depot', fuelLevel: 23, status: 'critical', nextService: '2026-08-08', mileage: 47800, hoursRun: 4100 },
  { id: 'COM-008', type: 'Haulage Truck', model: 'Mercedes Actros', regNumber: 'HAU-016', location: 'Bulawayo', fuelLevel: 91, status: 'active', nextService: '2026-09-10', mileage: 98700, hoursRun: 7200 },
  { id: 'COM-009', type: 'Urban Bus', model: 'Hino RK8', regNumber: 'ZUP-108', location: 'Victoria Falls', fuelLevel: 45, status: 'active', nextService: '2026-08-12', mileage: 29500, hoursRun: 2450 },
  { id: 'COM-010', type: 'Recovery Truck', model: 'Isuzu FVR', regNumber: 'REC-035', location: 'Harare Depot', fuelLevel: 8, status: 'critical', nextService: '2026-08-03', mileage: 71200, hoursRun: 5890 },
]

const columns = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'regNumber', label: 'Reg. Number', width: '120px' },
  { key: 'type', label: 'Type' },
  { key: 'model', label: 'Model' },
  { key: 'location', label: 'Location' },
  {
    key: 'fuelLevel',
    label: 'Fuel Level',
    render: (val) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Fuel size={16} />
        <div style={{ width: '60px', height: '8px', background: '#e1e8ed', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${val}%`,
            height: '100%',
            background: val > 50 ? '#27ae60' : val > 20 ? '#f39c12' : '#e74c3c',
            borderRadius: '4px'
          }} />
        </div>
        <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{val}%</span>
      </div>
    )
  },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'nextService', label: 'Next Service' },
  { key: 'mileage', label: 'Mileage (km)', render: (val) => val.toLocaleString() },
  { key: 'hoursRun', label: 'Hours Run', render: (val) => `${val.toLocaleString()}h` },
]

function CombustionFleetPage() {
  const overdueCount = combustionData.filter(v => v.status === 'critical' || v.status === 'maintenance').length

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Combustion Fleet</h1>
      <p className="page-subtitle">
        Monitor fuel levels, maintenance schedules, and operational status
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><Gauge size={24} /></div>
          <div className="stat-content">
            <h3>143</h3>
            <p>Total Combustion</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Fuel size={24} /></div>
          <div className="stat-content">
            <h3>128</h3>
            <p>Operational</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertTriangle size={24} /></div>
          <div className="stat-content">
            <h3>{overdueCount}</h3>
            <p>Service Due / Critical</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><Gauge size={24} /></div>
          <div className="stat-content">
            <h3>2</h3>
            <p>Out of Service</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Combustion Fleet Register</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm">
              <Filter size={14} /> Filter
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={14} /> Add Vehicle
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={combustionData} pageSize={8} />
      </div>
    </div>
  )
}

export default CombustionFleetPage
