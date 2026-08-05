import React from 'react'
import { Bell, Search, Menu, X } from 'lucide-react'
import './Layout.css'

function Header({ onMenuToggle, isMobileMenuOpen }) {
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [notifications] = React.useState([
    { id: 1, text: 'Bus ZUP-104 due for service in 3 days', type: 'warning', time: '2h ago' },
    { id: 2, text: 'New helpdesk ticket #HD-2042 assigned', type: 'info', time: '4h ago' },
    { id: 3, text: 'EV charging station #3 offline', type: 'danger', time: '5h ago' },
  ])
  const [notifOpen, setNotifOpen] = React.useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={onMenuToggle}
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen ? 'true' : 'false'}
          aria-controls="cmed-sidebar-nav"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`search-bar ${searchOpen ? 'open' : ''}`}>
          <Search size={18} />
          <input type="text" placeholder="Search fleet, assets, tickets..." />
        </div>
      </div>

      <div className="header-right">
        <div className="notification-wrapper">
          <button
            className="icon-btn"
            onClick={() => setNotifOpen(!notifOpen)}
            aria-label="Notifications"
            aria-expanded={notifOpen ? 'true' : 'false'}
          >
            <Bell size={20} />
            <span className="notification-badge">{notifications.length}</span>
          </button>
          {notifOpen && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>Notifications</h4>
                <span>{notifications.length} new</span>
              </div>
              {notifications.map(n => (
                <div key={n.id} className={`notification-item ${n.type}`}>
                  <p>{n.text}</p>
                  <span className="notification-time">{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="header-date">
          {new Date().toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
      </div>
    </header>
  )
}

export default Header
