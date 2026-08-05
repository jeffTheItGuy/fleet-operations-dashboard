import React from 'react'
import { FileText, Calendar, User, CheckCircle2 } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const serviceLogData = [
  { id: 'SRV-2026-089', vehicle: 'ZUP-104', type: 'Oil Change', date: '2026-07-15', mechanic: 'T. Moyo', cost: 180, parts: 'Engine Oil, Filter', status: 'completed', nextDue: '2026-10-15' },
  { id: 'SRV-2026-088', vehicle: 'ZUP-202', type: 'Battery Check', date: '2026-07-12', mechanic: 'P. Chiweshe', cost: 0, parts: 'N/A', status: 'completed', nextDue: '2026-10-12' },
  { id: 'SRV-2026-087', vehicle: 'REC-032', type: 'Brake Replacement', date: '2026-07-08', mechanic: 'J. Ncube', cost: 420, parts: 'Brake Pads, Discs', status: 'completed', nextDue: '2027-01-08' },
  { id: 'SRV-2026-086', vehicle: 'HAU-014', type: 'Tire Replacement', date: '2026-07-05', mechanic: 'T. Moyo', cost: 1200, parts: '6x Truck Tires', status: 'completed', nextDue: '2027-01-05' },
  { id: 'SRV-2026-085', vehicle: 'ZUP-103', type: 'Transmission Service', date: '2026-07-01', mechanic: 'J. Ncube', cost: 850, parts: 'Transmission Fluid', status: 'completed', nextDue: '2027-01-01' },
  { id: 'SRV-2026-084', vehicle: 'EV-003', type: 'Software Update', date: '2026-06-28', mechanic: 'P. Chiweshe', cost: 0, parts: 'N/A', status: 'completed', nextDue: '2026-09-28' },
  { id: 'SRV-2026-083', vehicle: 'ZUP-101', type: 'Coolant Flush', date: '2026-06-25', mechanic: 'T. Moyo', cost: 150, parts: 'Coolant', status: 'completed', nextDue: '2026-12-25' },
  { id: 'SRV-2026-082', vehicle: 'REC-031', type: 'Engine Tune-Up', date: '2026-06-20', mechanic: 'J. Ncube', cost: 320, parts: 'Spark Plugs, Filters', status: 'completed', nextDue: '2026-12-20' },
]

const columns = [
  { key: 'id', label: 'Service ID', width: '130px' },
  { key: 'vehicle', label: 'Vehicle', width: '100px' },
  { key: 'type', label: 'Service Type' },
  { key: 'date', label: 'Date' },
  { key: 'mechanic', label: 'Mechanic' },
  { key: 'cost', label: 'Cost (USD)', render: (val) => `$${val.toLocaleString()}` },
  { key: 'parts', label: 'Parts Used' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'nextDue', label: 'Next Due' },
]

function ServiceLogPage() {
  const totalCost = serviceLogData.reduce((sum, s) => sum + s.cost, 0)

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
            <h3>{serviceLogData.length}</h3>
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
          <button className="btn btn-outline btn-sm">Export to CSV</button>
        </div>
        <DataTable columns={columns} data={serviceLogData} pageSize={8} />
      </div>
    </div>
  )
}

export default ServiceLogPage
