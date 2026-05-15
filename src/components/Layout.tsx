import { Outlet, NavLink } from 'react-router-dom'
import { useState } from 'react'
import {
  LayoutDashboard, MessageSquare, BarChart3, User, Video,
  Shield, Moon, Sun, Menu, X, Activity, Bell, Search
} from 'lucide-react'

interface LayoutProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/symptom-checker', icon: MessageSquare, label: 'AI Symptom Checker' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
  { to: '/patient-profile', icon: User, label: 'Patient Profile' },
  { to: '/telemedicine', icon: Video, label: 'Telemedicine' },
  { to: '/admin', icon: Shield, label: 'Admin Panel' },
]

export default function Layout({ darkMode, setDarkMode }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="landing-shell app-shell" style={{ display: 'flex', minHeight: '100vh' }}>
      <div className="landing-orb landing-orb-a" />
      <div className="landing-orb landing-orb-b" />
      <div className="landing-grid" />

      {/* Sidebar */}
      <aside className="dashboard-sidebar lg:relative lg:left-0" style={{
        width: sidebarOpen ? '260px' : '0',
        minWidth: sidebarOpen ? '260px' : '260px',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'fixed',
        top: 0,
        left: sidebarOpen ? 0 : '-260px',
        height: '100vh',
        zIndex: 100,
        overflowY: 'auto',
      }}>
        {/* Logo */}
        <div className="dashboard-sidebar-header" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="dashboard-brand-icon" style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity size={20} color="white" />
          </div>
          <div>
            <div className="dashboard-brand-title">MediQo</div>
            <div className="dashboard-brand-subtitle">Healthcare Intelligence System</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="dashboard-sidebar-footer" style={{ padding: '1rem' }}>
          <div className="dashboard-status-card" style={{ borderRadius: '18px', padding: '1rem' }}>
            <div className="dashboard-status-title">AI System Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
              <span className="dashboard-status-copy">All systems operational</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99 }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="responsive-main dashboard-main-shell" style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: '260px' }}>
        {/* Topbar */}
        <header className="dashboard-topbar" style={{ padding: '0 1.5rem', height: '72px', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 50 }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.5rem' }}
            className="lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div className="dashboard-search" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 1rem', flex: 1, maxWidth: '430px' }}>
            <Search size={16} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Search patients, conditions..."
              style={{
                border: 'none', background: 'transparent', outline: 'none',
                color: 'var(--text-primary)', fontSize: '0.875rem', width: '100%'
              }}
            />
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button className="dashboard-icon-button" style={{ position: 'relative', border: 'none', cursor: 'pointer', padding: '0.65rem' }}>
              <Bell size={20} />
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#EF4444', border: '2px solid white'
              }} />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="dashboard-icon-button"
              style={{ border: 'none', padding: '0.65rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div className="dashboard-avatar" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              DR
            </div>
          </div>
        </header>

        <main className="dashboard-main" style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          <Outlet />
        </main>
      </div>
      <style>{`
        @media (max-width: 1024px) {
          .responsive-main { margin-left: 0 !important; }
        }
        @media (min-width: 1024px) {
          aside { position: relative !important; left: 0 !important; }
        }
      `}</style>
    </div>
  )
}
