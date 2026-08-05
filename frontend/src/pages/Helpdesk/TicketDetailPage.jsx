import React from 'react'
import { Ticket, MessageSquare, User, Clock, Calendar, ArrowLeft, Send } from 'lucide-react'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const ticket = {
  id: 'HD-2042',
  title: 'Network outage in Bulawayo office',
  description: 'All computers in the Bulawayo office have lost internet connectivity since 08:30 AM. The local router shows a red status light. Staff cannot access email or the internal fleet management system.',
  category: 'Network',
  priority: 'high',
  requester: 'S. Sibanda',
  email: 's.sibanda@cmed.co.zw',
  department: 'Operations',
  assignedTo: 'Graduate Trainee',
  created: '2026-08-05 09:00',
  updated: '2026-08-05 09:45',
  status: 'open',
  sla: '4 hours',
  slaDeadline: '2026-08-05 13:00',
}

const comments = [
  { id: 1, author: 'S. Sibanda', role: 'Requester', time: '2026-08-05 09:00', text: 'Internet is completely down in Bulawayo. All 8 computers affected. Router light is red.' },
  { id: 2, author: 'Graduate Trainee', role: 'ICT Support', time: '2026-08-05 09:30', text: 'Acknowledged. Checking remote connection to the Bulawayo router. Will update shortly.' },
  { id: 3, author: 'ICT Manager', role: 'Supervisor', time: '2026-08-05 09:45', text: 'Please escalate to ZOL if the line is down. Also check if the UPS is functioning — we had a power dip this morning.' },
]

function TicketDetailPage() {
  const [newComment, setNewComment] = React.useState('')

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <button className="btn btn-outline btn-sm">
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Ticket {ticket.id}</h1>
        <StatusBadge status={ticket.status} />
      </div>
      <p className="page-subtitle">{ticket.title}</p>

      <div className="grid grid-2">
        {/* Ticket Details */}
        <div>
          <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-header">
              <h3 className="card-title">Description</h3>
            </div>
            <p style={{ lineHeight: 1.6, color: 'var(--cmed-text)' }}>{ticket.description}</p>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Details</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Category</p>
                <p style={{ fontWeight: 600 }}>{ticket.category}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Priority</p>
                <StatusBadge status={ticket.priority === 'high' ? 'danger' : ticket.priority === 'medium' ? 'warning' : 'info'} customLabel={ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)} />
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Requester</p>
                <p style={{ fontWeight: 600 }}>{ticket.requester}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Department</p>
                <p style={{ fontWeight: 600 }}>{ticket.department}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Assigned To</p>
                <p style={{ fontWeight: 600 }}>{ticket.assignedTo}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>SLA Target</p>
                <p style={{ fontWeight: 600, color: '#e74c3c' }}>{ticket.sla}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>Created</p>
                <p style={{ fontWeight: 600 }}>{ticket.created}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>SLA Deadline</p>
                <p style={{ fontWeight: 600, color: '#e74c3c' }}>{ticket.slaDeadline}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Activity & Comments
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '20px' }}>
            {comments.map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: comment.role === 'ICT Support' ? 'var(--cmed-primary)' : '#e1e8ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: comment.role === 'ICT Support' ? 'white' : 'var(--cmed-text)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  flexShrink: 0
                }}>
                  {comment.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{comment.author}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--cmed-text-light)', background: 'var(--cmed-bg)', padding: '2px 8px', borderRadius: '12px' }}>
                      {comment.role}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--cmed-text-light)', marginLeft: 'auto' }}>
                      <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {comment.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--cmed-text)' }}>{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--cmed-border)', paddingTop: '16px' }}>
            <div className="form-group">
              <label className="form-label">Add Comment / Update</label>
              <textarea
                className="form-textarea"
                placeholder="Type your update or resolution notes..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline btn-sm">Assign to Team</button>
              <button className="btn btn-secondary btn-sm">
                <Send size={14} /> Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
