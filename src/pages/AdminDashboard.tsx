import { motion } from 'framer-motion'
import { AlertTriangle, Users, Clock, CheckCircle, Bell, TrendingUp, Cpu, RefreshCw } from 'lucide-react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts'

const queueData = [
  { id: 'PA-2847', name: 'Sarah Mitchell', age: 54, risk: 'emergency', condition: 'Chest pain, dyspnea', wait: '0m', dept: 'Cardiology' },
  { id: 'PA-3291', name: 'James Rodriguez', age: 42, risk: 'high', condition: 'Hypertensive crisis', wait: '3m', dept: 'Internal Med' },
  { id: 'PA-1183', name: 'David Park', age: 67, risk: 'high', condition: 'SOB, cough', wait: '7m', dept: 'Pulmonology' },
  { id: 'PA-4402', name: 'Emma Chen', age: 31, risk: 'moderate', condition: 'Fever, body aches', wait: '14m', dept: 'General' },
  { id: 'PA-5517', name: 'Robert Kim', age: 48, risk: 'moderate', condition: 'Abdominal pain', wait: '18m', dept: 'GI' },
  { id: 'PA-6634', name: 'Lisa Thompson', age: 29, risk: 'low', condition: 'Mild headache', wait: '32m', dept: 'General' },
  { id: 'PA-7720', name: 'Maria Garcia', age: 62, risk: 'high', condition: 'Chest tightness', wait: '9m', dept: 'Cardiology' },
]

const deptLoad = [
  { dept: 'Cardiology', patients: 28, capacity: 30, color: '#EF4444' },
  { dept: 'General', patients: 45, capacity: 60, color: '#2563EB' },
  { dept: 'Pulmonology', patients: 17, capacity: 25, color: '#14B8A6' },
  { dept: 'Internal Med', patients: 31, capacity: 35, color: '#F97316' },
  { dept: 'GI', patients: 12, capacity: 20, color: '#8B5CF6' },
  { dept: 'Neurology', patients: 9, capacity: 15, color: '#10B981' },
]

const alertsData = [
  { type: 'emergency', msg: 'Patient PA-2847 requires immediate cardiology intervention', time: '0m ago' },
  { type: 'high', msg: 'ICU bed capacity at 92% — consider overflow protocol', time: '3m ago' },
  { type: 'moderate', msg: 'AI model updated to v3.2.1 — accuracy improved to 98.7%', time: '12m ago' },
  { type: 'low', msg: 'Scheduled maintenance window: Tonight 2:00-3:00 AM', time: '1h ago' },
]

const realTimeData = Array.from({ length: 20 }, (_, i) => ({
  t: i,
  load: 60 + Math.sin(i * 0.5) * 20 + Math.random() * 10,
  ai: 95 + Math.sin(i * 0.3) * 3,
}))

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.6rem 0.9rem' }}>
        {payload.map((p: any) => (
          <div key={p.name} style={{ fontSize: '0.8rem', color: p.color }}>{p.name}: {p.value?.toFixed(1)}</div>
        ))}
      </div>
    )
  }
  return null
}

export default function AdminDashboard() {
  const emergency = queueData.filter(p => p.risk === 'emergency').length
  const high = queueData.filter(p => p.risk === 'high').length
  const total = queueData.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>Admin Dashboard</h1>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginTop: '0.25rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>City General Hospital</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
              <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>Live Monitoring</span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.55rem 1rem', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: 500 }}>
            <RefreshCw size={15} /> Refresh
          </button>
          <button className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}>Generate Report</button>
        </div>
      </div>

      {/* System Alerts */}
      <motion.div className="metric-card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Bell size={16} color="#F59E0B" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>System Alerts</span>
          <span style={{ background: '#FEE2E2', color: '#DC2626', borderRadius: '100px', padding: '0.1rem 0.5rem', fontSize: '0.7rem', fontWeight: 700, marginLeft: 'auto' }}>{emergency} Critical</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {alertsData.map(({ type, msg, time }, i) => (
            <div key={i} style={{
              display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.65rem 0.85rem',
              borderRadius: '10px', background: 'var(--bg)',
              borderLeft: `3px solid ${type === 'emergency' ? '#EF4444' : type === 'high' ? '#F97316' : type === 'moderate' ? '#F59E0B' : '#10B981'}`
            }}>
              <div style={{ flex: 1, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{msg}</div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{time}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Total Queue', value: total, icon: Users, color: '#2563EB' },
          { label: 'Emergency', value: emergency, icon: AlertTriangle, color: '#EF4444' },
          { label: 'High Priority', value: high, icon: TrendingUp, color: '#F97316' },
          { label: 'Avg Wait', value: '11m', icon: Clock, color: '#8B5CF6' },
          { label: 'AI Uptime', value: '99.9%', icon: Cpu, color: '#10B981' },
          { label: 'Resolved Today', value: '1,209', icon: CheckCircle, color: '#14B8A6' },
        ].map(({ label, value, icon: Icon, color }) => (
          <motion.div key={label} whileHover={{ y: -4 }} className="metric-card" style={{ textAlign: 'center' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem' }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color, fontFamily: 'Outfit' }}>{value}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.15rem', fontWeight: 500 }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Patient Queue */}
      <motion.div className="metric-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Emergency Patient Queue</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Sorted by priority · AI-ranked</span>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '640px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Patient ID', 'Name', 'Age', 'Risk', 'Condition', 'Wait', 'Department', 'Action'].map(h => (
                  <th key={h} style={{ padding: '0.6rem 0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queueData.map(({ id, name, age, risk, condition, wait, dept }) => (
                <tr key={id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{id}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>{name}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{age}y</td>
                  <td style={{ padding: '0.75rem' }}><span className={`badge badge-${risk}`}>{risk}</span></td>
                  <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-secondary)', maxWidth: '180px' }}>{condition}</td>
                  <td style={{ padding: '0.75rem', fontSize: '0.82rem', fontWeight: 600, color: risk === 'emergency' ? '#EF4444' : 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} />{wait}</div>
                  </td>
                  <td style={{ padding: '0.75rem', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>{dept}</td>
                  <td style={{ padding: '0.75rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn-primary" style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}>Assign</button>
                      {risk === 'emergency' && (
                        <button className="btn-emergency" style={{ padding: '0.3rem 0.65rem', fontSize: '0.72rem', animation: 'none', boxShadow: 'none' }}>🚨</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Department Load + Real-time monitoring */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Department Capacity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {deptLoad.map(({ dept, patients, capacity, color }) => {
              const pct = Math.round(patients / capacity * 100)
              return (
                <div key={dept}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{dept}</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{patients}/{capacity}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: pct > 85 ? '#EF4444' : pct > 65 ? '#F59E0B' : '#10B981' }}>{pct}%</span>
                    </div>
                  </div>
                  <div style={{ height: '8px', borderRadius: '4px', background: 'var(--border)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      style={{ height: '100%', borderRadius: '4px', background: pct > 85 ? '#EF4444' : pct > 65 ? '#F59E0B' : color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Real-Time System Monitoring</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={realTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="t" hide />
              <YAxis domain={[40, 110]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="load" stroke="#2563EB" strokeWidth={2} dot={false} name="System Load %" />
              <Line type="monotone" dataKey="ai" stroke="#10B981" strokeWidth={2} dot={false} name="AI Accuracy %" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '3px', background: '#2563EB', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>System Load</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ width: '12px', height: '3px', background: '#10B981', borderRadius: '2px' }} />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>AI Accuracy</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
