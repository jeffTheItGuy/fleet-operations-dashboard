import React from 'react'
import { Monitor, History, FileText, Tag, Calendar, User, MapPin, Wrench } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const assetDetail = {
  id: 'AST-IT-001',
  name: 'Dell Latitude 5520',
  type: 'Laptop',
  serial: 'SN-DL5520-8842',
  department: 'ICT',
  assignedTo: 'Graduate Trainee',
  purchaseDate: '2024-03-15',
  warranty: '2027-03-15',
  status: 'active',
  location: 'Head Office, Harare',
  specs: 'Intel i7-1165G7, 16GB RAM, 512GB SSD, Windows 11 Pro',
  supplier: 'Dell Zimbabwe',
  cost: 1850,
}

const historyLog = [
  { date: '2024-03-15', action: 'Asset purchased and registered', user: 'A. Moyo', type: 'procurement' },
  { date: '2024-03-18', action: 'Assigned to Graduate Trainee', user: 'ICT Manager', type: 'assignment' },
  { date: '2024-06-20', action: 'Windows 11 update installed', user: 'Graduate Trainee', type: 'maintenance' },
  { date: '2024-09-10', action: 'RAM upgraded to 16GB', user: 'ICT Team', type: 'upgrade' },
  { date: '2025-01-15', action: 'Annual health check - passed', user: 'ICT Team', type: 'maintenance' },
  { date: '2025-06-20', action: 'Antivirus renewal completed', user: 'Graduate Trainee', type: 'compliance' },
]

function AssetDetailPage() {
  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Asset Detail</h1>
      <p className="page-subtitle">
        Detailed view of asset {assetDetail.id} — {assetDetail.name}
      </p>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        {/* Asset Info Card */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Monitor size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Asset Information
            </h3>
            <StatusBadge status={assetDetail.status} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Asset ID</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.id}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Serial Number</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.serial}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Type</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.type}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Department</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.department}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Assigned To</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.assignedTo}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Location</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.location}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Purchase Date</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.purchaseDate}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Warranty Expiry</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.warranty}</p>
            </div>
            <div style={{ gridColumn: '1 / -1' }}>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Specifications</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.specs}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Supplier</p>
              <p style={{ fontWeight: 600 }}>{assetDetail.supplier}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Purchase Cost</p>
              <p style={{ fontWeight: 600 }}>${assetDetail.cost.toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* History Log */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <History size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Asset History
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {historyLog.map((log, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '12px',
                paddingBottom: idx < historyLog.length - 1 ? '16px' : 0,
                borderBottom: idx < historyLog.length - 1 ? '1px solid var(--cmed-border)' : 'none'
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: log.type === 'procurement' ? 'rgba(26, 82, 118, 0.1)' :
                    log.type === 'assignment' ? 'rgba(52, 152, 219, 0.1)' :
                    log.type === 'maintenance' ? 'rgba(243, 156, 18, 0.1)' :
                    log.type === 'upgrade' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(127, 140, 141, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {log.type === 'procurement' && <Tag size={16} color="var(--cmed-primary)" />}
                  {log.type === 'assignment' && <User size={16} color="#3498db" />}
                  {log.type === 'maintenance' && <Wrench size={16} color="#f39c12" />}
                  {log.type === 'upgrade' && <Monitor size={16} color="#27ae60" />}
                  {log.type === 'compliance' && <FileText size={16} color="#7f8c8d" />}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{log.action}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginTop: '2px' }}>
                    <Calendar size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                    {log.date} · by {log.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetDetailPage
