import React, { useState, useEffect } from 'react'
import { Shield, CheckCircle2, AlertTriangle, XCircle, Users, FileText, Lock, Database } from 'lucide-react'
import { complianceApi } from '../../services/api.js'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const columns = [
  { key: 'department', label: 'Department' },
  { key: 'staffCount', label: 'Staff', render: (val) => `${val} people` },
  {
    key: 'backupStatus',
    label: 'Data Backup',
    render: (val) => <StatusBadge status={val} customLabel={val === 'compliant' ? 'On Schedule' : 'Overdue'} />
  },
  { key: 'lastBackup', label: 'Last Backup', render: (val) => val ? new Date(val).toLocaleString() : '—' },
  {
    key: 'trainingStatus',
    label: 'Cybersecurity Training',
    render: (val) => <StatusBadge status={val} customLabel={val === 'compliant' ? 'Completed' : 'Pending'} />
  },
  { key: 'lastTraining', label: 'Last Training', render: (val) => val ? new Date(val).toLocaleString() : '—' },
  {
    key: 'policyAck',
    label: 'Policy Acknowledgment',
    render: (val) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '60px', height: '8px', background: '#e1e8ed', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            width: `${val}%`,
            height: '100%',
            background: val === 100 ? '#27ae60' : val >= 80 ? '#f39c12' : '#e74c3c',
            borderRadius: '4px'
          }} />
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{val}%</span>
      </div>
    )
  },
]

function ComplianceTrackerPage() {
  const [departmentData, setDepartmentData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    complianceApi.getDepartments()
      .then(res => setDepartmentData(res.data))
      .finally(() => setLoading(false))
  }, [])

  const compliantDepts = departmentData?.filter(d => d.backupStatus === 'compliant' && d.trainingStatus === 'compliant').length || 0
  const totalStaff = departmentData?.reduce((sum, d) => sum + (d.staffCount || 0), 0) || 0
  const avgPolicyAck = departmentData?.length ? Math.round(departmentData.reduce((sum, d) => sum + (d.policyAck || 0), 0) / departmentData.length) : 0

  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Cybersecurity Compliance Tracker</h1>
      <p className="page-subtitle">
        Monitor data backup, training completion, and policy acknowledgment across departments
      </p>

      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-icon green"><Shield size={24} /></div>
          <div className="stat-content">
            <h3>{compliantDepts}/{departmentData?.length || 0}</h3>
            <p>Fully Compliant Depts</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Users size={24} /></div>
          <div className="stat-content">
            <h3>{totalStaff}</h3>
            <p>Total Staff Covered</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><FileText size={24} /></div>
          <div className="stat-content">
            <h3>{avgPolicyAck}%</h3>
            <p>Avg. Policy Acknowledgment</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon blue"><Database size={24} /></div>
          <div className="stat-content">
            <h3>100%</h3>
            <p>Backup Coverage</p>
          </div>
        </div>
      </div>

      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Lock size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Compliance Overview
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(39, 174, 96, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #27ae60' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <CheckCircle2 size={20} color="#27ae60" />
                <div>
                  <p style={{ fontWeight: 600 }}>Data Backup Compliance</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>All departments backing up on schedule</p>
                </div>
              </div>
              <span style={{ fontWeight: 700, color: '#27ae60' }}>100%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(243, 156, 18, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #f39c12' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={20} color="#f39c12" />
                <div>
                  <p style={{ fontWeight: 600 }}>Cybersecurity Training</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>2 departments have pending training renewals</p>
                </div>
              </div>
              <span style={{ fontWeight: 700, color: '#f39c12' }}>67%</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(52, 152, 219, 0.08)', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #3498db' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={20} color="#3498db" />
                <div>
                  <p style={{ fontWeight: 600 }}>Policy Acknowledgment</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Average acknowledgment rate across all staff</p>
                </div>
              </div>
              <span style={{ fontWeight: 700, color: '#3498db' }}>{avgPolicyAck}%</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <AlertTriangle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Action Items
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--cmed-bg)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <XCircle size={18} color="#e74c3c" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Operations backup is 4 days old</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Last successful backup: 2026-08-01. Investigate backup failure.</p>
              </div>
            </div>
            <div style={{ padding: '12px', background: 'var(--cmed-bg)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertTriangle size={18} color="#f39c12" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>HR & Transport need training renewal</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Last training completed in June 2026. Schedule refresher sessions.</p>
              </div>
            </div>
            <div style={{ padding: '12px', background: 'var(--cmed-bg)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <AlertTriangle size={18} color="#f39c12" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>Transport policy acknowledgment at 78%</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>4 staff members have not acknowledged the updated cybersecurity policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Department Compliance Matrix</h3>
        </div>
        {loading ? (
          <div className="loading-container"><div className="loading-spinner" /></div>
        ) : (
          <DataTable columns={columns} data={departmentData} pagination={false} />
        )}
      </div>
    </div>
  )
}

export default ComplianceTrackerPage
