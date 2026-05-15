import { motion } from 'framer-motion'
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'

const dailyData = [
  { day: 'Mon', assessments: 890, emergency: 32, resolved: 820 },
  { day: 'Tue', assessments: 1020, emergency: 41, resolved: 960 },
  { day: 'Wed', assessments: 1247, emergency: 38, resolved: 1180 },
  { day: 'Thu', assessments: 980, emergency: 29, resolved: 940 },
  { day: 'Fri', assessments: 1340, emergency: 55, resolved: 1250 },
  { day: 'Sat', assessments: 760, emergency: 22, resolved: 730 },
  { day: 'Sun', assessments: 640, emergency: 18, resolved: 612 },
]

const riskDist = [
  { name: 'Low Risk', value: 42, color: '#10B981' },
  { name: 'Moderate', value: 31, color: '#F59E0B' },
  { name: 'High Risk', value: 18, color: '#F97316' },
  { name: 'Emergency', value: 9, color: '#EF4444' },
]

const accuracyData = [
  { month: 'Jan', accuracy: 94.2, f1: 91.5 },
  { month: 'Feb', accuracy: 95.1, f1: 92.8 },
  { month: 'Mar', accuracy: 96.3, f1: 93.9 },
  { month: 'Apr', accuracy: 97.0, f1: 95.2 },
  { month: 'May', accuracy: 98.7, f1: 96.8 },
]

const hourlyData = [
  { hour: '12am', value: 12 }, { hour: '3am', value: 5 }, { hour: '6am', value: 18 },
  { hour: '9am', value: 89 }, { hour: '12pm', value: 142 }, { hour: '3pm', value: 118 },
  { hour: '6pm', value: 156 }, { hour: '9pm', value: 94 }, { hour: '11pm', value: 45 },
]

// Heatmap data
const heatmapDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const heatmapHours = Array.from({ length: 24 }, (_, i) => `${i}h`)
const heatmapData = heatmapDays.map(day => ({
  day,
  hours: heatmapHours.map(hour => ({
    hour,
    value: Math.floor(Math.random() * 100)
  }))
}))

function getHeatColor(val: number) {
  if (val < 20) return '#DBEAFE'
  if (val < 40) return '#93C5FD'
  if (val < 60) return '#3B82F6'
  if (val < 80) return '#1D4ED8'
  return '#1E3A8A'
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.75rem 1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{label}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ fontSize: '0.82rem', color: p.color }}>{p.name}: {p.value}</div>
        ))}
      </div>
    )
  }
  return null
}

export default function Analytics() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>Healthcare Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Real-time insights from AI triage system · Last 7 days</p>
      </div>

      {/* KPI row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Total Assessments', value: '8,877', sub: 'This week', color: '#2563EB' },
          { label: 'Emergency Rate', value: '3.1%', sub: '235 cases', color: '#EF4444' },
          { label: 'Avg Accuracy', value: '98.7%', sub: '+0.5% MoM', color: '#10B981' },
          { label: 'Avg Triage Time', value: '1.8s', sub: 'AI response', color: '#8B5CF6' },
          { label: 'Patient Satisfaction', value: '4.8/5', sub: 'Based on 2.1k', color: '#F59E0B' },
        ].map(({ label, value, sub, color }) => (
          <motion.div key={label} whileHover={{ y: -4 }} className="metric-card">
            <div style={{ fontSize: '1.65rem', fontWeight: 900, color, fontFamily: 'Outfit' }}>{value}</div>
            <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>{label}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Daily Assessments Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Daily Patient Assessments</div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dailyData}>
              <defs>
                <linearGradient id="assessGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="emergGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="assessments" stroke="#2563EB" strokeWidth={2.5} fill="url(#assessGrad)" name="Assessments" />
              <Area type="monotone" dataKey="resolved" stroke="#10B981" strokeWidth={2} fill="none" strokeDasharray="4 2" name="Resolved" />
              <Area type="monotone" dataKey="emergency" stroke="#EF4444" strokeWidth={2} fill="url(#emergGrad)" name="Emergency" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Risk Distribution Donut */}
        <motion.div className="metric-card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Risk Distribution</div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={riskDist} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {riskDist.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: '10px', border: 'none' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {riskDist.map(({ name, value, color }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{name}</span>
                </div>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)' }}>{value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* AI Accuracy + Hourly Volume */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>AI Accuracy Metrics</div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={accuracyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis domain={[88, 100]} tick={{ fontSize: 12, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="accuracy" stroke="#2563EB" strokeWidth={2.5} dot={{ fill: '#2563EB', r: 4 }} name="Accuracy %" />
              <Line type="monotone" dataKey="f1" stroke="#14B8A6" strokeWidth={2} dot={{ fill: '#14B8A6', r: 4 }} name="F1 Score" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Hourly Patient Volume</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={hourlyData} barSize={20}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="hour" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#2563EB" radius={[4,4,0,0]} name="Patients">
                {hourlyData.map((_, i) => (
                  <Cell key={i} fill={`hsl(${217 + i * 3}, ${70 + i}%, ${50 + i}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Heatmap */}
      <motion.div className="metric-card">
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Emergency Detection Heatmap</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Patient volume by day and hour (darker = higher)</div>
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: '600px' }}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
              <div style={{ width: '36px' }} />
              {heatmapHours.map(h => (
                <div key={h} style={{ width: '20px', fontSize: '0.6rem', color: 'var(--text-muted)', textAlign: 'center', flexShrink: 0 }}>{h}</div>
              ))}
            </div>
            {heatmapData.map(({ day, hours }) => (
              <div key={day} style={{ display: 'flex', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
                <div style={{ width: '36px', fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>{day}</div>
                {hours.map(({ hour, value }) => (
                  <div
                    key={hour}
                    className="heatmap-cell"
                    title={`${day} ${hour}: ${value} patients`}
                    style={{ width: '20px', height: '20px', background: getHeatColor(value), flexShrink: 0 }}
                  />
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Low</span>
              {['#DBEAFE','#93C5FD','#3B82F6','#1D4ED8','#1E3A8A'].map(c => (
                <div key={c} style={{ width: '20px', height: '12px', background: c, borderRadius: '3px' }} />
              ))}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>High</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
