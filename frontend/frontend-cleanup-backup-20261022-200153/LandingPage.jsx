import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Truck,
  Wrench,
  Bus,
  Monitor,
  Ticket,
  Shield,
  ArrowRight,
} from 'lucide-react'
import './Landing.css'

const purposes = [
  {
    icon: Truck,
    title: 'Fleet Management',
    text: 'Monitor EV and combustion vehicle status, battery and fuel levels, mileage, and maintenance schedules in one register.',
  },
  {
    icon: Wrench,
    title: 'Predictive Maintenance',
    text: 'Service alerts triggered by mileage and hours-run thresholds, with overdue flags and a full service history log.',
  },
  {
    icon: Bus,
    title: 'Transport Operations',
    text: 'Live route status board with delay tracking, plus driver-reported mechanical and road-hazard incidents.',
  },
  {
    icon: Monitor,
    title: 'IT Asset Management',
    text: 'Searchable hardware inventory with serial numbers, warranty expiry alerts, and complete asset history.',
  },
  {
    icon: Ticket,
    title: 'Helpdesk & Support',
    text: 'ICT support ticket tracking with priorities, assignments, and SLA deadlines.',
  },
  {
    icon: Shield,
    title: 'Cybersecurity Compliance',
    text: 'Department-level matrix for data backups, training completion, and policy acknowledgment.',
  },
]

const stack = ['React 18 + Vite', 'Flask', 'PostgreSQL 15', 'Docker']

function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="landing">
      <div className="landing-panel">
        {/* Hazard-stripe asset rail */}
        <div className="landing-rail" aria-hidden="true" />

        <div className="landing-inner">
          <div className="landing-badge">
            <span className="landing-badge-dot" aria-hidden="true" />
            Demo Project — Read Only
          </div>

          <h1 className="landing-title">
            CMED Fleet &amp; Operations Dashboard
          </h1>

          <p className="landing-subtitle">
            This is a demonstration portfolio project — it is not connected to
            any live systems. All vehicles, routes, tickets, assets, and
            compliance records shown inside are sample data. It was built to
            demonstrate end-to-end delivery of an operational dashboard for
            fleet, transport, and ICT support environments in Zimbabwe.
          </p>

          <h2 className="landing-list-heading">Purpose of this demo</h2>
          <ul className="landing-list">
            {purposes.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.title}>
                  <span className="landing-list-icon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="landing-list-title">{item.title}</p>
                    <p className="landing-list-text">{item.text}</p>
                  </div>
                </li>
              )
            })}
          </ul>

          <div className="landing-stack" aria-label="Technology stack">
            {stack.map((tech) => (
              <span key={tech} className="landing-chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="landing-cta-row">
            <button
              className="landing-enter"
              onClick={() => navigate('/dashboard')}
            >
              Enter Dashboard
              <ArrowRight size={18} />
            </button>
            <span className="landing-cta-note">
              Sample data only — no login required
            </span>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LandingPage