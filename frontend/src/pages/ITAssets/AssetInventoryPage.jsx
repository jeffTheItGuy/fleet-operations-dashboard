import React from 'react'
import { Monitor, Filter, Laptop, Server, Wifi, Printer } from 'lucide-react'
import { useAssets } from '../../hooks/useAssets.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

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
  const { assets: assetData, loading, error } = useAssets()
  const totalAssets = assetData?.length || 0
  const activeAssets = assetData?.filter(a => a.status === 'active').length || 0
  const expiringWarranty = assetData?.filter(a => {
    if (!a.warranty) return false
    const warranty = new Date(a.warranty)
    const now = new Date()
    const diff = (warranty - now) / (1000 * 60 * 60 * 24)
    return diff < 90 && diff > 0
  }).length || 0

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
          <div className="stat-icon green"><Monitor size={24} /></div>
          <div className="stat-content">
            <h3>{activeAssets}</h3>
            <p>Active</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Monitor size={24} /></div>
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
          </div>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : error ? (
          <div className="empty-state"><p>Error loading assets</p></div>
        ) : (
          <DataTable columns={columns} data={assetData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default AssetInventoryPage
