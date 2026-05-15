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
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: sidebarOpen ? '260px' : '0',
        minWidth: sidebarOpen ? '260px' : '260px',
        background: 'var(--surface)',
        borderRight: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        position: 'fixed',
        top: 0,
        left: sidebarOpen ? 0 : '-260px',
        height: '100vh',
        zIndex: 100,
        overflowY: 'auto',
      }}
      className="lg:relative lg:left-0">
        {/* Logo */}
        <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Activity size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', fontFamily: 'Outfit' }}>MediAI</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>Healthcare Triage System</div>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '1rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
        <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(20,184,166,0.1))',
            borderRadius: '12px', padding: '1rem'
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2563EB', marginBottom: '0.25rem' }}>AI System Status</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All systems operational</span>
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, marginLeft: '260px' }}
           className="responsive-main">
        {/* Topbar */}
        <header style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => setSidebarOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.5rem' }}
            className="lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: 'var(--bg)', borderRadius: '10px', padding: '0.5rem 1rem',
            border: '1px solid var(--border)', flex: 1, maxWidth: '400px'
          }}>
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
            <button style={{
              position: 'relative', background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-secondary)', padding: '0.5rem'
            }}>
              <Bell size={20} />
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '8px', height: '8px', borderRadius: '50%',
                background: '#EF4444', border: '2px solid var(--surface)'
              }} />
            </button>

            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '10px', padding: '0.5rem', cursor: 'pointer',
                color: 'var(--text-secondary)', display: 'flex', alignItems: 'center'
              }}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <div style={{
              width: '36px', height: '36px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer'
            }}>
              DR
            </div>
          </div>
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
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
