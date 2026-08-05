import React from 'react'
import { Ticket, Send, AlertCircle } from 'lucide-react'

function NewTicketPage() {
  const [form, setForm] = React.useState({
    title: '',
    category: '',
    priority: 'medium',
    department: '',
    description: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Ticket submitted! (Demo mode - no backend connected)')
  }

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">New Support Ticket</h1>
      <p className="page-subtitle">
        Report an ICT issue to the helpdesk team
      </p>

      <div className="card" style={{ maxWidth: '800px' }}>
        <div className="card-header">
          <h3 className="card-title">
            <Ticket size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Ticket Details
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                className="form-input"
                placeholder="Brief description of the issue"
                value={form.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Category *</label>
              <select name="category" className="form-select" value={form.category} onChange={handleChange} required>
                <option value="">Select category...</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Security">Security</option>
                <option value="Account">Account / Access</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>
          </div>

          <div className="grid grid-2" style={{ marginBottom: '16px' }}>
            <div className="form-group">
              <label className="form-label">Priority *</label>
              <select name="priority" className="form-select" value={form.priority} onChange={handleChange}>
                <option value="low">Low — General inquiry</option>
                <option value="medium">Medium — Affects single user</option>
                <option value="high">High — Affects multiple users / department</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Department *</label>
              <select name="department" className="form-select" value={form.department} onChange={handleChange} required>
                <option value="">Select department...</option>
                <option value="ICT">ICT</option>
                <option value="Finance">Finance</option>
                <option value="HR">Human Resources</option>
                <option value="Operations">Operations</option>
                <option value="Transport">Transport</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label className="form-label">Description *</label>
            <textarea
              name="description"
              className="form-textarea"
              placeholder="Provide detailed information about the issue, including error messages, affected systems, and steps to reproduce..."
              value={form.description}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--cmed-text-light)', fontSize: '0.85rem' }}>
              <AlertCircle size={14} />
              SLA response: 4 hours (High), 8 hours (Medium), 24 hours (Low)
            </div>
            <button type="submit" className="btn btn-primary">
              <Send size={14} /> Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewTicketPage
