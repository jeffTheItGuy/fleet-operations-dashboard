import React from 'react'
import { Filter, Battery, Zap, MapPin } from 'lucide-react'
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
    key: 'batteryLevel',
    label: 'Battery',
    render: (val) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Battery size={16} />
        <div style={{ width: '60px', height: '8px', background: '#e1e8ed', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${val}%`,
            height: '100%',
            background: val > 50 ? '#27ae60' : val > 20 ? '#f39c12' : '#e74c3c',
            borderRadius: '4px',
            transition: 'width 0.3s ease'
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
  {
    key: 'chargingStatus',
    label: 'Charging',
    render: (val) => val === 'No' ? (
      <span style={{ color: 'var(--cmed-text-light)', fontSize: '0.85rem' }}>—</span>
    ) : (
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3498db', fontSize: '0.85rem', fontWeight: 500 }}>
        <Zap size={14} /> {val}
      </span>
    )
  },
  { key: 'lastServiceDate', label: 'Last Service', render: (val) => val || '—' },
  { key: 'mileage', label: 'Mileage (km)', render: (val) => val?.toLocaleString?.() || '—' },
]

function EVFleetPage() {
  const { data: evFleetData, loading, error } = useFleetData('ev')

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Electric Vehicle Fleet</h1>
      <p className="page-subtitle">
        Monitor battery levels, charging status, and location of CMED EVs
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon green"><Zap size={24} /></div>
          <div className="stat-content">
            <h3>{evFleetData?.length || 0}</h3>
            <p>Total EVs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Battery size={24} /></div>
          <div className="stat-content">
            <h3>{evFleetData?.filter(v => v.status === 'active').length || 0}</h3>
            <p>Active & Charged</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Zap size={24} /></div>
          <div className="stat-content">
            <h3>{evFleetData?.filter(v => v.status === 'charging').length || 0}</h3>
            <p>Currently Charging</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><MapPin size={24} /></div>
          <div className="stat-content">
            <h3>{new Set(evFleetData?.map(v => v.location)).size || 0}</h3>
            <p>Depot Locations</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">EV Fleet Register</h3>
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
          <DataTable columns={columns} data={evFleetData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default EVFleetPage
