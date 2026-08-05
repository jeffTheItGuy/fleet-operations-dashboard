import React, { useState, useEffect } from 'react'
import { FileText, Calendar, User, CheckCircle2 } from 'lucide-react'
import { maintenanceApi } from '../../services/api.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const columns = [
  { key: 'id', label: 'Service ID', width: '130px' },
  { key: 'vehicleId', label: 'Vehicle', width: '100px' },
  { key: 'serviceType', label: 'Service Type' },
  { key: 'serviceDate', label: 'Date' },
  { key: 'mechanic', label: 'Mechanic' },
  { key: 'cost', label: 'Cost (USD)', render: (val) => `$${(val || 0).toLocaleString()}` },
  { key: 'partsUsed', label: 'Parts Used', render: (val) => val || '—' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'nextDueDate', label: 'Next Due', render: (val) => val || '—' },
]

function ServiceLogPage() {
  const [serviceLogData, setServiceLogData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    maintenanceApi.getServiceLog()
      .then(res => setServiceLogData(res.data))
      .finally(() => setLoading(false))
  }, [])

  const totalCost = serviceLogData?.reduce((sum, s) => sum + (s.cost || 0), 0) || 0

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Service Log</h1>
      <p className="page-subtitle">
        Complete history of maintenance and repair activities
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon blue"><FileText size={24} /></div>
          <div className="stat-content">
            <h3>{serviceLogData?.length || 0}</h3>
            <p>Services This Month</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={24} /></div>
          <div className="stat-content">
            <h3>100%</h3>
            <p>Completion Rate</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Calendar size={24} /></div>
          <div className="stat-content">
            <h3>${totalCost.toLocaleString()}</h3>
            <p>Total Cost (Month)</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><User size={24} /></div>
          <div className="stat-content">
            <h3>3</h3>
            <p>Active Mechanics</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Service History</h3>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <DataTable columns={columns} data={serviceLogData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default ServiceLogPage
