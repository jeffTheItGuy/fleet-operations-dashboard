import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts'

// New palette: teal (primary/good), amber (attention), steel (neutral),
// red (critical), plus two supporting tones for chart series that need
// more than four categories.
const COLORS = ['#0e6e5d', '#d98e2b', '#4c7a96', '#c4453c', '#7a9e93', '#8a6a3f']

const tooltipStyle = {
  background: '#14232e',
  border: 'none',
  borderRadius: '6px',
  fontSize: '0.8rem',
  fontFamily: "'IBM Plex Mono', monospace",
  color: '#f2f1ec',
  padding: '10px 12px',
}

const tooltipLabelStyle = { color: '#f2f1ec', fontWeight: 600, marginBottom: '4px' }
const axisTick = { fontSize: 12, fontFamily: "'IBM Plex Sans', sans-serif", fill: '#6b7770' }

export function CostComparisonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe0d8" vertical={false} />
        <XAxis dataKey="route" tick={axisTick} axisLine={{ stroke: '#dfe0d8' }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} cursor={{ fill: 'rgba(20,35,46,0.04)' }} />
        <Legend wrapperStyle={{ fontSize: '0.82rem', fontFamily: "'IBM Plex Sans', sans-serif" }} />
        <Bar dataKey="fuelCost" name="Fuel Cost (USD)" fill="#c4453c" radius={[3, 3, 0, 0]} maxBarSize={32} />
        <Bar dataKey="electricCost" name="Electric Cost (USD)" fill="#0e6e5d" radius={[3, 3, 0, 0]} maxBarSize={32} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function FleetUtilizationChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <defs>
          <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0e6e5d" stopOpacity={0.28} />
            <stop offset="95%" stopColor="#0e6e5d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe0d8" vertical={false} />
        <XAxis dataKey="month" tick={axisTick} axisLine={{ stroke: '#dfe0d8' }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} />
        <Area
          type="monotone"
          dataKey="active"
          name="Active Vehicles"
          stroke="#0e6e5d"
          fillOpacity={1}
          fill="url(#colorActive)"
          strokeWidth={2}
          dot={{ r: 3, fill: '#0e6e5d', strokeWidth: 0 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function VehicleTypeChart({ data }) {
  const total = data.reduce((sum, d) => sum + (d.value || 0), 0)

  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={64}
          outerRadius={92}
          paddingAngle={3}
          dataKey="value"
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
          ))}
        </Pie>
        {/* Center readout — total fleet count, styled like a gauge */}
        <text x="50%" y="47%" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '1.6rem', fontWeight: 600, fill: '#14232e' }}>
          {total}
        </text>
        <text x="50%" y="58%" textAnchor="middle" dominantBaseline="middle" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: '0.72rem', fill: '#6b7770', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Total Fleet
        </text>
        <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} />
        <Legend
          layout="vertical"
          verticalAlign="middle"
          align="right"
          wrapperStyle={{ fontSize: '0.78rem', fontFamily: "'IBM Plex Sans', sans-serif" }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function TicketTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe0d8" vertical={false} />
        <XAxis dataKey="week" tick={axisTick} axisLine={{ stroke: '#dfe0d8' }} tickLine={false} />
        <YAxis tick={axisTick} axisLine={false} tickLine={false} />
        <Tooltip contentStyle={tooltipStyle} labelStyle={tooltipLabelStyle} />
        <Legend wrapperStyle={{ fontSize: '0.82rem', fontFamily: "'IBM Plex Sans', sans-serif" }} />
        <Line type="monotone" dataKey="opened" name="Opened" stroke="#c4453c" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
        <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#0e6e5d" strokeWidth={2} dot={{ r: 3, strokeWidth: 0 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function MaintenanceCostChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#dfe0d8" horizontal={false} />
        <XAxis type="number" tick={axisTick} axisLine={false} tickLine={false} />
        <YAxis dataKey="category" type="category" tick={axisTick} width={100} axisLine={false} tickLine={false} />
        <Tooltip
          contentStyle={tooltipStyle}
          labelStyle={tooltipLabelStyle}
          formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
        />
        <Bar dataKey="cost" fill="#0e6e5d" radius={[0, 3, 3, 0]} maxBarSize={20} />
      </BarChart>
    </ResponsiveContainer>
  )
}
