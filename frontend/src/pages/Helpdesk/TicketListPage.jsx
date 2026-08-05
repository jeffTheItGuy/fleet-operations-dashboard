import React from 'react'
import { Ticket, Plus, Filter, Clock, CheckCircle2, AlertCircle } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const ticketData = [
  { id: 'HD-2042', title: 'Network outage in Bulawayo office', category: 'Network', priority: 'high', requester: 'S. Sibanda', assignedTo: 'Graduate Trainee', created: '2026-08-05 09:00', status: 'open', sla: '4h' },
  { id: 'HD-2041', title: 'Printer not responding - HR department', category: 'Hardware', priority: 'medium', requester: 'A. Moyo', assignedTo: 'ICT Team', created: '2026-08-04 14:30', status: 'inprogress', sla: '8h' },
  { id: 'HD-2040', title: 'Email access issue for new employee', category: 'Software', priority: 'low', requester: 'HR Manager', assignedTo: 'Graduate Trainee', created: '2026-08-04 10:15', status: 'resolved', sla: '24h' },
  { id: 'HD-2039', title: 'Server backup failure - Head Office', category: 'Infrastructure', priority: 'high', requester: 'ICT Manager', assignedTo: 'ICT Team', created: '2026-08-03 16:00', status: 'inprogress', sla: '2h' },
  { id: 'HD-2038', title: 'Laptop screen flickering', category: 'Hardware', priority: 'medium', requester: 'T. Chikwava', assignedTo: 'Graduate Trainee', created: '2026-08-03 11:20', status: 'open', sla: '8h' },
  { id: 'HD-2037', title: 'VPN connection slow from Victoria Falls', category: 'Network', priority: 'medium', requester: 'K. Ndhlovu', assignedTo: 'ICT Team', created: '2026-08-02 08:45', status: 'resolved', sla: '8h' },
  { id: 'HD-2036', title: 'Antivirus update failing on 3 machines', category: 'Security', priority: 'high', requester: 'ICT Manager', assignedTo: 'Graduate Trainee', created: '2026-08-01 15:30', status: 'resolved', sla: '4h' },
  { id: 'HD-2035', title: 'Password reset request - Finance dept', category: 'Account', priority: 'low', requester: 'Finance Clerk', assignedTo: 'Graduate Trainee', created: '2026-08-01 09:00', status: 'resolved', sla: '24h' },
]

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
  { key: 'created', label: 'Created' },
  {
    key: 'status',
    label: 'Status',
    render: (val) => <StatusBadge status={val} />
  },
  { key: 'sla', label: 'SLA', render: (val) => <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{val}</span> },
]

function TicketListPage() {
  const openTickets = ticketData.filter(t => t.status === 'open').length
  const inProgress = ticketData.filter(t => t.status === 'inprogress').length
  const resolved = ticketData.filter(t => t.status === 'resolved').length
  const avgResolution = '3.2h'

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
            <h3>{avgResolution}</h3>
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
            <button className="btn btn-primary btn-sm">
              <Plus size={14} /> New Ticket
            </button>
          </div>
        </div>
        <DataTable columns={columns} data={ticketData} pageSize={8} />
      </div>
    </div>
  )
}

export default TicketListPage
