import React from 'react'
import { Monitor, Plus, Search, Filter, Laptop, Server, Wifi, Printer } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const assetData = [
  { id: 'AST-IT-001', name: 'Dell Latitude 5520', type: 'Laptop', serial: 'SN-DL5520-8842', department: 'ICT', assignedTo: 'Graduate Trainee', purchaseDate: '2024-03-15', warranty: '2027-03-15', status: 'active', location: 'Head Office, Harare' },
  { id: 'AST-IT-002', name: 'HP ProDesk 400 G7', type: 'Desktop', serial: 'SN-HP400G7-1123', department: 'Finance', assignedTo: 'A. Moyo', purchaseDate: '2023-08-20', warranty: '2026-08-20', status: 'active', location: 'Head Office, Harare' },
  { id: 'AST-IT-003', name: 'Cisco Catalyst 2960', type: 'Network Switch', serial: 'SN-CC2960-4451', department: 'ICT', assignedTo: 'Infrastructure', purchaseDate: '2022-11-10', warranty: '2025-11-10', status: 'active', location: 'Head Office, Harare' },
  { id: 'AST-IT-004', name: 'Dell PowerEdge T340', type: 'Server', serial: 'SN-DPT340-9981', department: 'ICT', assignedTo: 'Server Room', purchaseDate: '2023-01-05', warranty: '2026-01-05', status: 'active', location: 'Head Office, Harare' },
  { id: 'AST-IT-005', name: 'HP LaserJet Pro M404', type: 'Printer', serial: 'SN-HPLJM404-2234', department: 'HR', assignedTo: 'Shared', purchaseDate: '2024-06-12', warranty: '2027-06-12', status: 'active', location: 'Head Office, Harare' },
  { id: 'AST-IT-006', name: 'Lenovo ThinkPad T14', type: 'Laptop', serial: 'SN-LTPT14-5567', department: 'Operations', assignedTo: 'S. Mangwiro', purchaseDate: '2024-01-18', warranty: '2027-01-18', status: 'maintenance', location: 'Bulawayo Office' },
  { id: 'AST-IT-007', name: 'Ubiquiti UniFi AP', type: 'Access Point', serial: 'SN-UUAP-7789', department: 'ICT', assignedTo: 'Infrastructure', purchaseDate: '2023-09-30', warranty: '2026-09-30', status: 'active', location: 'Victoria Falls Depot' },
  { id: 'AST-IT-008', name: 'Dell Latitude 5520', type: 'Laptop', serial: 'SN-DL5520-8843', department: 'Transport', assignedTo: 'J. Mupfumi', purchaseDate: '2024-03-15', warranty: '2027-03-15', status: 'active', location: 'Harare Depot' },
  { id: 'AST-IT-009', name: 'HP ProDesk 400 G7', type: 'Desktop', serial: 'SN-HP400G7-1124', department: 'Maintenance', assignedTo: 'T. Moyo', purchaseDate: '2023-08-20', warranty: '2026-08-20', status: 'inactive', location: 'Head Office, Harare' },
  { id: 'AST-IT-010', name: 'Cisco ISR 4331', type: 'Router', serial: 'SN-CISR4331-3344', department: 'ICT', assignedTo: 'Infrastructure', purchaseDate: '2022-05-22', warranty: '2025-05-22', status: 'active', location: 'Head Office, Harare' },
]

const typeIcons = {
  'Laptop': Laptop,
  'Desktop': Monitor,
  'Server': Server,
  'Network Switch': Wifi,
  'Access Point': Wifi,
  'Router': Wifi,
  'Printer': Printer,
}

const columns = [
  {
    key: 'type',
    label: 'Type',
    width: '50px',
    render: (val) => {
      const Icon = typeIcons[val] || Monitor
      return <Icon size={18} style={{ color: 'var(--cmed-primary)' }} />
    }
  },
  { key: 'id', label: 'Asset ID', width: '120px' },
  { key: 'name', label: 'Name' },
  { key: 'serial', label: 'Serial Number' },
  { key: 'department', label: 'Department' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'purchaseDate', label: 'Purchased' },
  { key: 'warranty', label: 'Warranty Expiry' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'location', label: 'Location' },
]

function AssetInventoryPage() {
  const totalAssets = assetData.length
  const activeAssets = assetData.filter(a => a.status === 'active').length
  const expiringWarranty = assetData.filter(a => {
    const warranty = new Date(a.warranty)
    const now = new Date()
    const diff = (warranty - now) / (1000 * 60 * 60 * 24)
    return diff < 90 && diff > 0
  }).length

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">IT Asset Inventory</h1>
      <p className="page-subtitle">
        Searchable database of all CMED ICT hardware and equipment
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><Monitor size={24} /></div>
          <div className="stat-content">
            <h3>{totalAssets}</h3>
            <p>Total Assets</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={24} /></div>
          <div className="stat-content">
            <h3>{activeAssets}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><AlertTriangle size={24} /></div>
          <div className="stat-content">
            <h3>{expiringWarranty}</h3>
            <p>Warranty Expiring Soon</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><Monitor size={24} /></div>
          <div className="stat-content">
            <h3>{totalAssets - activeAssets}</h3>
            <p>Inactive / Maintenance</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Asset Register</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm">
              <Filter size={14} /> Filter
            </button>
            <button className="btn btn-primary btn-sm">
              <Plus size={14} /> Add Asset
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={assetData} pageSize={8} />
      </div>
    </div>
  )
}

export default AssetInventoryPage
