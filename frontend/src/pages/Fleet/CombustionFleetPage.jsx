import React from 'react'
import { Filter, Fuel, Gauge, AlertTriangle } from 'lucide-react'
import { useFleetData } from '../../hooks/useFleetData.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

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
  { key: 'nextServiceDate', label: 'Next Service', render: (val) => val || '—' },
  { key: 'mileage', label: 'Mileage (km)', render: (val) => val?.toLocaleString?.() || '—' },
  { key: 'hoursRun', label: 'Hours Run', render: (val) => `${val?.toLocaleString?.() || 0}h` },
]

function CombustionFleetPage() {
  const { data: combustionData, loading, error } = useFleetData('combustion')
  const overdueCount = combustionData?.filter(v => v.status === 'critical' || v.status === 'maintenance').length || 0

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
            <h3>{combustionData?.length || 0}</h3>
            <p>Total Combustion</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><Fuel size={24} /></div>
          <div className="stat-content">
            <h3>{combustionData?.filter(v => v.status === 'active').length || 0}</h3>
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
            <h3>{combustionData?.filter(v => v.status === 'critical').length || 0}</h3>
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
          </div>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : error ? (
          <div className="empty-state"><p>Error loading fleet data</p></div>
        ) : (
          <DataTable columns={columns} data={combustionData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default CombustionFleetPage
