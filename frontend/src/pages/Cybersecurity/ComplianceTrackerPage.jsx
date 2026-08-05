import React from 'react'
import { Shield, CheckCircle2, AlertTriangle, XCircle, Users, FileText, Lock, Database } from 'lucide-react'
import DataTable from '../../components/DataTable/DataTable.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const departmentData = [
  { id: 1, department: 'ICT', backupStatus: 'compliant', lastBackup: '2026-08-05 02:00', trainingStatus: 'compliant', lastTraining: '2026-07-20', staffCount: 8, policyAck: 100 },
  { id: 2, department: 'Finance', backupStatus: 'compliant', lastBackup: '2026-08-04 23:00', trainingStatus: 'compliant', lastTraining: '2026-07-18', staffCount: 12, policyAck: 100 },
  { id: 3, department: 'HR', backupStatus: 'compliant', lastBackup: '2026-08-05 01:00', trainingStatus: 'pending', lastTraining: '2026-06-15', staffCount: 6, policyAck: 83 },
  { id: 4, department: 'Operations', backupStatus: 'noncompliant', lastBackup: '2026-08-01 22:00', trainingStatus: 'compliant', lastTraining: '2026-07-22', staffCount: 24, policyAck: 92 },
  { id: 5, department: 'Transport', backupStatus: 'compliant', lastBackup: '2026-08-05 03:00', trainingStatus: 'pending', lastTraining: '2026-06-20', staffCount: 18, policyAck: 78 },
  { id: 6, department: 'Maintenance', backupStatus: 'compliant', lastBackup: '2026-08-04 21:00', trainingStatus: 'compliant', lastTraining: '2026-07-25', staffCount: 15, policyAck: 100 },
]

const columns = [
  { key: 'department', label: 'Department' },
  { key: 'staffCount', label: 'Staff', render: (val) => `${val} people` },
  {
    key: 'backupStatus',
    label: 'Data Backup',
    render: (val) => <StatusBadge status={val} customLabel={val === 'compliant' ? 'On Schedule' : 'Overdue'} />
  },
  { key: 'lastBackup', label: 'Last Backup' },
  {
    key: 'trainingStatus',
    label: 'Cybersecurity Training',
    render: (val) => <StatusBadge status={val} customLabel={val === 'compliant' ? 'Completed' : 'Pending'} />
  },
  { key: 'lastTraining', label: 'Last Training' },
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
  const compliantDepts = departmentData.filter(d => d.backupStatus === 'compliant' && d.trainingStatus === 'compliant').length
  const totalStaff = departmentData.reduce((sum, d) => sum + d.staffCount, 0)
  const avgPolicyAck = Math.round(departmentData.reduce((sum, d) => sum + d.policyAck, 0) / departmentData.length)

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
            <h3>{compliantDepts}/{departmentData.length}</h3>
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
          <button className="btn btn-outline btn-sm">Export Report</button>
        </div>
        <DataTable columns={columns} data={departmentData} pagination={false} />
      </div>
    </div>
  )
}

export default ComplianceTrackerPage
