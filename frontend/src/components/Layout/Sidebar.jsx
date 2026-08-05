import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Truck,
  Wrench,
  MapPin,
  Monitor,
  Ticket,
  Shield,
  ChevronRight,
  Bus,
  Fuel,
  Zap
} from 'lucide-react'
import './Layout.css'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  {
    label: 'Fleet',
    icon: Truck,
    children: [
      { path: '/fleet/ev', label: 'EV Fleet', icon: Zap },
      { path: '/fleet/combustion', label: 'Combustion Fleet', icon: Fuel },
    ]
  },
  {
    label: 'Maintenance',
    icon: Wrench,
    children: [
      { path: '/maintenance/alerts', label: 'Service Alerts', icon: Wrench },
      { path: '/maintenance/log', label: 'Service Log', icon: ChevronRight },
    ]
  },
  {
    label: 'Transport',
    icon: MapPin,
    children: [
      { path: '/transport/routes', label: 'Route Status', icon: Bus },
      { path: '/transport/incidents', label: 'Incident Log', icon: ChevronRight },
    ]
  },
  {
    label: 'IT Assets',
    icon: Monitor,
    children: [
      { path: '/assets/inventory', label: 'Asset Inventory', icon: Monitor },
      { path: '/assets/detail', label: 'Asset Detail', icon: ChevronRight },
    ]
  },
  {
    label: 'Helpdesk',
    icon: Ticket,
    children: [
      { path: '/helpdesk/tickets', label: 'All Tickets', icon: Ticket },
    ]
  },
  { path: '/compliance', label: 'Compliance', icon: Shield },
]

function Sidebar({ className = '', onClose = () => {} }) {
  const location = useLocation()
  const [expanded, setExpanded] = React.useState({})

  const toggleExpand = (label) => {
    setExpanded(prev => ({ ...prev, [label]: !prev[label] }))
  }

  return (
    <>
      {/* Backdrop: visible only while the mobile menu is open (driven
          by the same className), closes the menu on click/tap outside */}
      <button
        type="button"
        className={`sidebar-overlay ${className}`}
        aria-hidden={className ? 'false' : 'true'}
        tabIndex={className ? 0 : -1}
        onClick={onClose}
      />

      <aside id="cmed-sidebar-nav" className={`sidebar ${className}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">
            <Truck size={24} />
          </div>
          <div className="brand-text">
            <h1>CMED</h1>
            <span>Operations Hub</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const Icon = item.icon
            const hasChildren = item.children && item.children.length > 0
            const isExpanded = expanded[item.label]

            const isActive = hasChildren
              ? item.children.some(c => location.pathname === c.path)
              : location.pathname === item.path

            if (hasChildren) {
              return (
                <div key={item.label} className="nav-group">
                  <button
                    className={`nav-group-toggle ${isActive ? 'active' : ''}`}
                    onClick={() => toggleExpand(item.label)}
                    aria-expanded={isExpanded ? 'true' : 'false'}
                  >
                    <Icon size={18} />
                    <span>{item.label}</span>
                    <ChevronRight
                      size={14}
                      className={`toggle-icon ${isExpanded ? 'rotated' : ''}`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="nav-group-children">
                      {item.children.map((child) => {
                        const ChildIcon = child.icon
                        return (
                          <NavLink
                            key={child.path}
                            to={child.path}
                            onClick={onClose}
                            className={({ isActive }) =>
                              `nav-link child ${isActive ? 'active' : ''}`
                            }
                          >
                            <ChildIcon size={16} />
                            <span>{child.label}</span>
                          </NavLink>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            }

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'active' : ''}`
                }
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">GT</div>
            <div className="user-details">
              <span className="user-name">Graduate Trainee</span>
              <span className="user-role">ICT Department</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar