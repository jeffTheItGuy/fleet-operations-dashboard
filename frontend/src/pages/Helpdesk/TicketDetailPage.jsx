import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Ticket, MessageSquare, User, Clock, Calendar, ArrowLeft } from 'lucide-react'
import { helpdeskApi } from '../../services/api.js'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

function TicketDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    helpdeskApi.getTicketById(id)
      .then(res => setTicket(res.data))
      .catch(() => setTicket(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="page-content fade-in">
        <div className="loading-container"><div className="loading-spinner" /></div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="page-content fade-in">
        <h1 className="page-title">Ticket not found</h1>
        <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
          <ArrowLeft size={14} /> Back
        </button>
      </div>
    )
  }

  return (
    <div className="page-content fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
        <button className="btn btn-outline btn-sm" onClick={() => navigate(-1)}>
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
                <p style={{ fontWeight: 600 }}>{ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : '—'}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)', marginBottom: '4px' }}>SLA Deadline</p>
                <p style={{ fontWeight: 600, color: '#e74c3c' }}>{ticket.slaDeadline ? new Date(ticket.slaDeadline).toLocaleString() : '—'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Comments — Read Only */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Activity & Comments
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {ticket.comments?.length > 0 ? ticket.comments.map(comment => (
              <div key={comment.id} style={{ display: 'flex', gap: '12px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: comment.authorRole === 'ICT Support' ? 'var(--cmed-primary)' : '#e1e8ed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: comment.authorRole === 'ICT Support' ? 'white' : 'var(--cmed-text)',
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
                      {comment.authorRole}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--cmed-text-light)', marginLeft: 'auto' }}>
                      <Clock size={12} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {comment.time ? new Date(comment.time).toLocaleString() : '—'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--cmed-text)' }}>{comment.text}</p>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--cmed-text-light)', fontStyle: 'italic' }}>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetailPage
