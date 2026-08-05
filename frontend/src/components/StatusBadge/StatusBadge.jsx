import React from 'react'
import './StatusBadge.css'

const variants = {
  active: { bg: 'rgba(39, 174, 96, 0.12)', color: '#27ae60', label: 'Active' },
  inactive: { bg: 'rgba(127, 140, 141, 0.12)', color: '#7f8c8d', label: 'Inactive' },
  maintenance: { bg: 'rgba(243, 156, 18, 0.12)', color: '#f39c12', label: 'In Maintenance' },
  critical: { bg: 'rgba(231, 76, 60, 0.12)', color: '#e74c3c', label: 'Critical' },
  charging: { bg: 'rgba(52, 152, 219, 0.12)', color: '#3498db', label: 'Charging' },
  open: { bg: 'rgba(52, 152, 219, 0.12)', color: '#3498db', label: 'Open' },
  resolved: { bg: 'rgba(39, 174, 96, 0.12)', color: '#27ae60', label: 'Resolved' },
  pending: { bg: 'rgba(243, 156, 18, 0.12)', color: '#f39c12', label: 'Pending' },
  overdue: { bg: 'rgba(231, 76, 60, 0.12)', color: '#e74c3c', label: 'Overdue' },
  compliant: { bg: 'rgba(39, 174, 96, 0.12)', color: '#27ae60', label: 'Compliant' },
  noncompliant: { bg: 'rgba(231, 76, 60, 0.12)', color: '#e74c3c', label: 'Non-Compliant' },
  inprogress: { bg: 'rgba(243, 156, 18, 0.12)', color: '#f39c12', label: 'In Progress' },
}

function StatusBadge({ status, customLabel }) {
  const style = variants[status] || variants.inactive
  const label = customLabel || style.label

  return (
    <span
      className="status-badge"
      style={{ background: style.bg, color: style.color }}
    >
      {label}
    </span>
  )
}

export default StatusBadge
