import React from 'react'
import { Ticket, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTickets } from '../../hooks/useTickets.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const columns = [
  { key: 'id', label: 'Ticket ID', width: '110px' },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  {
    key: 'priority',
    label: 'Priority',
    render: (val) => (
      <StatusBadge
        status={val === 'high' ? 'danger' : val === 'medium' ? 'warning' : 'info'}
        customLabel={val.charAt(0).toUpperCase() + val.slice(1)}
      />
    )
  },
  { key: 'requester', label: 'Requester' },
  { key: 'assignedTo', label: 'Assigned To' },
  { key: 'createdAt', label: 'Created', render: (val) => val ? new Date(val).toLocaleString() : '—' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'sla', label: 'SLA', render: (val) => <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{val}</span> },
]

function TicketListPage() {
  const { tickets: ticketData, loading, error } = useTickets()
  const openTickets = ticketData?.filter(t => t.status === 'open').length || 0
  const inProgress = ticketData?.filter(t => t.status === 'inprogress').length || 0
  const resolved = ticketData?.filter(t => t.status === 'resolved').length || 0

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Helpdesk Tickets</h1>
      <p className="page-subtitle">
        Track and manage ICT support requests across CMED
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon red"><Ticket size={24} /></div>
          <div className="stat-content">
            <h3>{openTickets}</h3>
            <p>Open Tickets</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Clock size={24} /></div>
          <div className="stat-content">
            <h3>{inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle2 size={24} /></div>
          <div className="stat-content">
            <h3>{resolved}</h3>
            <p>Resolved (Week)</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><AlertCircle size={24} /></div>
          <div className="stat-content">
            <h3>—</h3>
            <p>Avg. Resolution Time</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">All Tickets</h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="btn btn-outline btn-sm">
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : error ? (
          <div className="empty-state"><p>Error loading tickets</p></div>
        ) : (
          <DataTable columns={columns} data={ticketData} pageSize={8} />
        )}
      </div>
    </div>
  )
}

export default TicketListPage
