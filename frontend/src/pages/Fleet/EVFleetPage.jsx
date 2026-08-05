import React from 'react'
import { Plus, Filter, Battery, Zap, MapPin, Clock } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const evFleetData = [
  { id: 'EV-001', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-201', location: 'Harare Depot', battery: 92, status: 'active', charging: 'No', lastService: '2026-06-15', mileage: 34200 },
  { id: 'EV-002', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-202', location: 'Harare Depot', battery: 45, status: 'charging', charging: 'Station #1', lastService: '2026-05-20', mileage: 28900 },
  { id: 'EV-003', type: 'Electric Mini-Bus', model: 'BYD T3', regNumber: 'ZUP-203', location: 'Chitungwiza', battery: 78, status: 'active', charging: 'No', lastService: '2026-07-01', mileage: 15600 },
  { id: 'EV-004', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-204', location: 'Victoria Falls', battery: 23, status: 'maintenance', charging: 'No', lastService: '2026-04-10', mileage: 41200 },
  { id: 'EV-005', type: 'Electric Recovery', model: 'JAC N55 EV', regNumber: 'REC-101', location: 'Harare Depot', battery: 88, status: 'active', charging: 'No', lastService: '2026-06-28', mileage: 18900 },
  { id: 'EV-006', type: 'Electric Luxury Coach', model: 'BYD C8', regNumber: 'ZUP-205', location: 'Harare Depot', battery: 65, status: 'active', charging: 'No', lastService: '2026-05-15', mileage: 22100 },
  { id: 'EV-007', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-206', location: 'Bulawayo', battery: 12, status: 'critical', charging: 'No', lastService: '2026-03-20', mileage: 45600 },
  { id: 'EV-008', type: 'Electric Mini-Bus', model: 'BYD T3', regNumber: 'ZUP-207', location: 'Harare Depot', battery: 95, status: 'active', charging: 'No', lastService: '2026-07-10', mileage: 12300 },
  { id: 'EV-009', type: 'Electric Recovery', model: 'JAC N55 EV', regNumber: 'REC-102', location: 'Mutare', battery: 56, status: 'active', charging: 'No', lastService: '2026-06-01', mileage: 26700 },
  { id: 'EV-010', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-208', location: 'Harare Depot', battery: 34, status: 'charging', charging: 'Station #2', lastService: '2026-05-05', mileage: 31500 },
  { id: 'EV-011', type: 'Electric Mini-Bus', model: 'BYD T3', regNumber: 'ZUP-209', location: 'Chitungwiza', battery: 81, status: 'active', charging: 'No', lastService: '2026-07-05', mileage: 19800 },
  { id: 'EV-012', type: 'Electric Bus', model: 'BYD K8', regNumber: 'ZUP-210', location: 'Victoria Falls', battery: 67, status: 'active', charging: 'No', lastService: '2026-06-20', mileage: 27400 },
]

const columns = [
  { key: 'id', label: 'ID', width: '80px' },
  { key: 'regNumber', label: 'Reg. Number', width: '120px' },
  { key: 'type', label: 'Type' },
  { key: 'model', label: 'Model' },
  { key: 'location', label: 'Location' },
  {
    key: 'battery',
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
    key: 'charging',
    label: 'Charging',
    render: (val) => val === 'No' ? (
      <span style={{ color: 'var(--cmed-text-light)', fontSize: '0.85rem' }}>—</span>
    ) : (
      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#3498db', fontSize: '0.85rem', fontWeight: 500 }}>
        <Zap size={14} /> {val}
      </span>
    )
  },
  { key: 'lastService', label: 'Last Service' },
  { key: 'mileage', label: 'Mileage (km)', render: (val) => val.toLocaleString() },
]

function EVFleetPage() {
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
            <h3>44</h3>
            <p>Total EVs</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Battery size={24} /></div>
          <div className="stat-content">
            <h3>38</h3>
            <p>Active & Charged</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Zap size={24} /></div>
          <div className="stat-content">
            <h3>6</h3>
            <p>Currently Charging</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><MapPin size={24} /></div>
          <div className="stat-content">
            <h3>2</h3>
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
            <button className="btn btn-primary btn-sm">
              <Plus size={14} /> Add Vehicle
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={evFleetData} pageSize={8} />
      </div>
    </div>
  )
}

export default EVFleetPage
