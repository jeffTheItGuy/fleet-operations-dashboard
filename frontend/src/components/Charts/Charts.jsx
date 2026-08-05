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

const COLORS = ['#1a5276', '#27ae60', '#f39c12', '#e74c3c', '#3498db', '#9b59b6']

export function CostComparisonChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
        <XAxis dataKey="route" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}
        />
        <Legend wrapperStyle={{ fontSize: '0.85rem' }} />
        <Bar dataKey="fuelCost" name="Fuel Cost (USD)" fill="#e74c3c" radius={[4, 4, 0, 0]} />
        <Bar dataKey="electricCost" name="Electric Cost (USD)" fill="#27ae60" radius={[4, 4, 0, 0]} />
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
            <stop offset="5%" stopColor="#1a5276" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#1a5276" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}
        />
        <Area
          type="monotone"
          dataKey="active"
          name="Active Vehicles"
          stroke="#1a5276"
          fillOpacity={1}
          fill="url(#colorActive)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function VehicleTypeChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          paddingAngle={4}
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function TicketTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
        <XAxis dataKey="week" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}
        />
        <Legend wrapperStyle={{ fontSize: '0.85rem' }} />
        <Line type="monotone" dataKey="opened" name="Opened" stroke="#e74c3c" strokeWidth={2} dot={{ r: 3 }} />
        <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#27ae60" strokeWidth={2} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function MaintenanceCostChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e1e8ed" />
        <XAxis type="number" tick={{ fontSize: 12 }} />
        <YAxis dataKey="category" type="category" tick={{ fontSize: 12 }} width={100} />
        <Tooltip
          contentStyle={{
            background: 'white',
            border: '1px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '0.85rem'
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, 'Cost']}
        />
        <Bar dataKey="cost" fill="#1a5276" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
