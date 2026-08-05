import React from 'react'
import {
  Truck,
  Wrench,
  Ticket,
  Zap,
  Fuel,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react'
import {
  CostComparisonChart,
  FleetUtilizationChart,
  VehicleTypeChart,
  TicketTrendChart
} from '../../components/Charts/Charts.jsx'
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx'

const stats = [
  {
    icon: Truck,
    iconClass: 'blue',
    label: 'Total Fleet',
    value: 187,
    trend: '+4 this month',
    trendClass: 'up'
  },
  {
    icon: Zap,
    iconClass: 'green',
    label: 'EV Vehicles',
    value: 44,
    trend: '+12 this quarter',
    trendClass: 'up'
  },
  {
    icon: Wrench,
    iconClass: 'orange',
    label: 'Pending Services',
    value: 23,
    trend: '3 overdue',
    trendClass: 'down'
  },
  {
    icon: Ticket,
    iconClass: 'red',
    label: 'Open Tickets',
    value: 18,
    trend: '-5 this week',
    trendClass: 'up'
  }
]

const costData = [
  { route: 'Harare-CBD', fuelCost: 450, electricCost: 180 },
  { route: 'Harare-Chitungwiza', fuelCost: 380, electricCost: 150 },
  { route: 'Harare-Borrowdale', fuelCost: 520, electricCost: 210 },
  { route: 'Harare-Mbare', fuelCost: 290, electricCost: 115 },
  { route: 'Harare-Highfield', fuelCost: 340, electricCost: 135 },
  { route: 'Harare-Kuwadzana', fuelCost: 410, electricCost: 165 },
]

const utilizationData = [
  { month: 'Jan', active: 142 },
  { month: 'Feb', active: 148 },
  { month: 'Mar', active: 155 },
  { month: 'Apr', active: 160 },
  { month: 'May', active: 168 },
  { month: 'Jun', active: 175 },
  { month: 'Jul', active: 183 },
]

const vehicleTypeData = [
  { name: 'EV Buses', value: 18 },
  { name: 'EV Mini-Buses', value: 14 },
  { name: 'EV Recovery', value: 8 },
  { name: 'EV Luxury', value: 4 },
  { name: 'Combustion Buses', value: 67 },
  { name: 'Combustion Recovery', value: 45 },
  { name: 'Combustion Haulage', value: 31 },
]

const ticketTrendData = [
  { week: 'W1', opened: 12, resolved: 10 },
  { week: 'W2', opened: 15, resolved: 14 },
  { week: 'W3', opened: 9, resolved: 11 },
  { week: 'W4', opened: 18, resolved: 13 },
  { week: 'W5', opened: 14, resolved: 16 },
  { week: 'W6', opened: 11, resolved: 12 },
]

const recentAlerts = [
  { id: 1, vehicle: 'ZUP-104', type: 'Service Due', message: 'Oil change due at 45,200 km', severity: 'warning', time: '2h ago' },
  { id: 2, vehicle: 'EV-018', type: 'Charging', message: 'Charging station #3 offline - Victoria Falls', severity: 'danger', time: '5h ago' },
  { id: 3, vehicle: 'REC-033', type: 'Maintenance', message: 'Brake pad replacement required', severity: 'warning', time: '8h ago' },
  { id: 4, vehicle: 'ZUP-089', type: 'Compliance', message: 'Annual inspection expires in 7 days', severity: 'info', time: '1d ago' },
  { id: 5, vehicle: 'EV-007', type: 'Battery', message: 'Battery health at 78% - monitor closely', severity: 'warning', time: '1d ago' },
]

function Dashboard() {
  return (
    <div className="page-content fade-in">
      <h1 className="page-title">Operations Dashboard</h1>
      <p className="page-subtitle">
        Overview of CMED fleet, maintenance, and IT operations
      </p>

      {/* Stats Row */}
      <div className="grid grid-4" style={{ marginBottom: '24px' }}>
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="stat-card">
              <div className={`stat-icon ${stat.iconClass}`}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
                <span className={`stat-trend ${stat.trendClass}`}>
                  {stat.trendClass === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                  {' '}{stat.trend}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fuel vs. Electric Cost Comparison</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Monthly average (USD)</span>
          </div>
          <CostComparisonChart data={costData} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fleet Utilization Trend</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Active vehicles per month</span>
          </div>
          <FleetUtilizationChart data={utilizationData} />
        </div>
      </div>

      {/* Second Charts Row */}
      <div className="grid grid-2" style={{ marginBottom: '24px' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Fleet Composition</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>By vehicle type</span>
          </div>
          <VehicleTypeChart data={vehicleTypeData} />
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Helpdesk Ticket Trend</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--cmed-text-light)' }}>Last 6 weeks</span>
          </div>
          <TicketTrendChart data={ticketTrendData} />
        </div>
      </div>

      {/* Alerts Table */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">
            <AlertTriangle size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Recent Alerts
          </h3>
          <button className="btn btn-outline btn-sm">View All</button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Type</th>
                <th>Message</th>
                <th>Severity</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {recentAlerts.map(alert => (
                <tr key={alert.id}>
                  <td><strong>{alert.vehicle}</strong></td>
                  <td>{alert.type}</td>
                  <td>{alert.message}</td>
                  <td>
                    <StatusBadge status={alert.severity} />
                  </td>
                  <td style={{ color: 'var(--cmed-text-light)', fontSize: '0.85rem' }}>{alert.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
