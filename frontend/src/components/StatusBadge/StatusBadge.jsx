import React from 'react'
import './StatusBadge.css'

// Semantic palette kept small and consistent: teal = good/operational,
// amber = needs attention, red = critical, steel = neutral/informational.
const variants = {
  active: { bg: 'var(--cmed-primary-tint)', color: 'var(--cmed-primary)', label: 'Active' },
  inactive: { bg: 'var(--cmed-neutral-tint)', color: 'var(--cmed-neutral)', label: 'Inactive' },
  maintenance: { bg: 'var(--cmed-amber-tint)', color: 'var(--cmed-amber)', label: 'In Maintenance' },
  critical: { bg: 'var(--cmed-danger-tint)', color: 'var(--cmed-danger)', label: 'Critical' },
  charging: { bg: 'var(--cmed-steel-tint)', color: 'var(--cmed-steel)', label: 'Charging' },
  open: { bg: 'var(--cmed-steel-tint)', color: 'var(--cmed-steel)', label: 'Open' },
  resolved: { bg: 'var(--cmed-primary-tint)', color: 'var(--cmed-primary)', label: 'Resolved' },
  pending: { bg: 'var(--cmed-amber-tint)', color: 'var(--cmed-amber)', label: 'Pending' },
  overdue: { bg: 'var(--cmed-danger-tint)', color: 'var(--cmed-danger)', label: 'Overdue' },
  compliant: { bg: 'var(--cmed-primary-tint)', color: 'var(--cmed-primary)', label: 'Compliant' },
  noncompliant: { bg: 'var(--cmed-danger-tint)', color: 'var(--cmed-danger)', label: 'Non-Compliant' },
  inprogress: { bg: 'var(--cmed-amber-tint)', color: 'var(--cmed-amber)', label: 'In Progress' },
  // 'danger'/'warning'/'info' are passed directly by a few pages
  // (ticket priority, incident severity) as pseudo-statuses
  danger: { bg: 'var(--cmed-danger-tint)', color: 'var(--cmed-danger)', label: 'High' },
  warning: { bg: 'var(--cmed-amber-tint)', color: 'var(--cmed-amber)', label: 'Medium' },
  info: { bg: 'var(--cmed-steel-tint)', color: 'var(--cmed-steel)', label: 'Low' },
}

function StatusBadge({ status, customLabel }) {
  const style = variants[status] || variants.inactive
  const label = customLabel || style.label

  return (
    <span
      className="status-badge"
      style={{ background: style.bg, color: style.color }}
    >
      <span className="status-badge-dot" style={{ background: style.color }} />
      {label}
    </span>
  )
}

export default StatusBadge
