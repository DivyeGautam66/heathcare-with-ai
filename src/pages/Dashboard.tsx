import { motion } from 'framer-motion'
import { Heart, Activity, Thermometer, AlertTriangle, Brain, TrendingUp, Users, Clock, ArrowUpRight, ArrowDownRight, Home, Building2, Siren } from 'lucide-react'
import { RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const vitals = [
  { label: 'Heart Rate', value: '112', unit: 'bpm', status: 'high', icon: Heart, color: '#EF4444', normal: '60-100' },
  { label: 'Oxygen Level', value: '94', unit: '%', status: 'moderate', icon: Activity, color: '#F59E0B', normal: '95-100' },
  { label: 'Blood Pressure', value: '148/92', unit: 'mmHg', status: 'high', icon: TrendingUp, color: '#8B5CF6', normal: '120/80' },
  { label: 'Temperature', value: '38.9', unit: '°C', status: 'moderate', icon: Thermometer, color: '#F97316', normal: '36.5-37.5' },
]

const riskData = [{ name: 'Risk', value: 78, fill: '#EF4444' }]

const conditions = [
  { name: 'Acute Coronary Syndrome', confidence: 72, severity: 'emergency' },
  { name: 'Hypertensive Crisis', confidence: 58, severity: 'high' },
  { name: 'Pulmonary Embolism', confidence: 41, severity: 'high' },
  { name: 'Panic Attack', confidence: 28, severity: 'moderate' },
]

const severityData = [
  { name: 'Emergency', value: 72 },
  { name: 'High', value: 58 },
  { name: 'Moderate', value: 28 },
  { name: 'Low', value: 12 },
]

const patients = [
  { name: 'Sarah Mitchell', age: 54, risk: 'emergency', condition: 'Chest pain, dyspnea', wait: '0m', avatar: 'SM' },
  { name: 'James Rodriguez', age: 42, risk: 'high', condition: 'Hypertension, headache', wait: '5m', avatar: 'JR' },
  { name: 'Emma Chen', age: 31, risk: 'moderate', condition: 'Fever, fatigue', wait: '12m', avatar: 'EC' },
  { name: 'David Park', age: 67, risk: 'high', condition: 'Shortness of breath', wait: '8m', avatar: 'DP' },
  { name: 'Lisa Thompson', age: 29, risk: 'low', condition: 'Mild headache', wait: '25m', avatar: 'LT' },
]

const recommendations = [
  {
    type: 'Home Care', icon: Home, color: '#10B981', bg: '#D1FAE5', border: '#6EE7B7',
    severity: 'Low Risk', text: 'Continue rest, stay hydrated, and monitor symptoms. Take over-the-counter medication as directed. Return if symptoms worsen.', action: 'View Care Plan'
  },
  {
    type: 'Clinic Visit', icon: Building2, color: '#F59E0B', bg: '#FEF3C7', border: '#FDE68A',
    severity: 'Moderate Risk', text: 'Schedule an appointment with your primary care physician within 24-48 hours for evaluation and potential testing.', action: 'Book Appointment'
  },
  {
    type: 'Emergency Room', icon: Siren, color: '#EF4444', bg: '#FEE2E2', border: '#FCA5A5',
    severity: 'Emergency', text: 'Seek immediate emergency care. Your symptoms indicate a potentially life-threatening condition requiring urgent intervention.', action: 'Find ER Now'
  },
]

export default function Dashboard() {
  const riskScore = 78

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Page header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>Risk Assessment Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Patient: Sarah Mitchell · ID: PA-2847 · Updated just now</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>Export PDF</button>
          <button className="btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}>New Assessment</button>
        </div>
      </div>

      {/* Emergency Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="emergency-banner"
      >
        <div style={{
          width: '36px', height: '36px', borderRadius: '10px',
          background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <AlertTriangle size={20} color="#EF4444" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, color: '#DC2626', fontSize: '0.95rem' }}>⚠️ EMERGENCY CONDITION DETECTED</div>
          <div style={{ color: '#EF4444', fontSize: '0.85rem' }}>AI has flagged possible Acute Coronary Syndrome (72% confidence). Immediate medical attention required.</div>
        </div>
        <button className="btn-emergency" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', whiteSpace: 'nowrap' }}>
          Escalate Now
        </button>
      </motion.div>

      {/* Top row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Total Patients Today', value: '1,247', change: '+12.4%', up: true, icon: Users, color: '#2563EB' },
          { label: 'Emergency Cases', value: '38', change: '+3', up: true, icon: AlertTriangle, color: '#EF4444' },
          { label: 'Avg Response Time', value: '1.8s', change: '-0.3s', up: false, icon: Clock, color: '#10B981' },
          { label: 'AI Accuracy', value: '98.7%', change: '+0.2%', up: true, icon: Brain, color: '#8B5CF6' },
        ].map(({ label, value, change, up, icon: Icon, color }) => (
          <motion.div key={label} whileHover={{ y: -4 }} className="metric-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '11px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.78rem', fontWeight: 600, color: up ? '#10B981' : '#EF4444' }}>
                {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {change}
              </div>
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>{value}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{label}</div>
          </motion.div>
        ))}
      </div>

      {/* Middle row: Risk Score + Vitals + Conditions */}
      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr 1fr', gap: '1.5rem' }}>
        {/* Risk Score */}
        <motion.div whileHover={{ y: -4 }} className="metric-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem', alignSelf: 'flex-start' }}>Patient Risk Score</div>
          <div style={{ position: 'relative', width: '160px', height: '160px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="65%" outerRadius="90%" data={riskData} startAngle={225} endAngle={-45}>
                <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#F1F5F9' }} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: '#EF4444', fontFamily: 'Outfit' }}>{riskScore}</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 100</div>
            </div>
          </div>
          <span className="badge badge-emergency" style={{ marginTop: '0.5rem', fontSize: '0.8rem' }}>Emergency Risk</span>
          <div style={{ marginTop: '1rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {[
              { label: 'Low', color: '#10B981', pct: '0–30' },
              { label: 'Moderate', color: '#F59E0B', pct: '31–60' },
              { label: 'High', color: '#F97316', pct: '61–80' },
              { label: 'Emergency', color: '#EF4444', pct: '81–100' },
            ].map(({ label, color, pct }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: color }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{label}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{pct}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Vital Signs */}
        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>Vital Signs</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {vitals.map(({ label, value, unit, status, icon: Icon, color, normal }) => (
              <div key={label} style={{
                background: 'var(--bg)', borderRadius: '14px', padding: '1rem',
                border: `1.5px solid ${status === 'high' ? color + '40' : 'var(--border)'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <Icon size={18} color={color} />
                  <span className={`badge badge-${status}`} style={{ fontSize: '0.65rem' }}>{status}</span>
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color, fontFamily: 'Outfit' }}>{value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{unit}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Normal: {normal}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* AI Predictions */}
        <motion.div className="metric-card">
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>AI Prediction Panel</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Possible conditions by confidence</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
            {conditions.map(({ name, confidence, severity }) => (
              <div key={name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>{name}</span>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span className={`badge badge-${severity}`} style={{ fontSize: '0.65rem' }}>{severity}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 700, color: severity === 'emergency' ? '#EF4444' : severity === 'high' ? '#F97316' : '#F59E0B' }}>{confidence}%</span>
                  </div>
                </div>
                <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidence}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    style={{ height: '100%', borderRadius: '3px', background: severity === 'emergency' ? '#EF4444' : severity === 'high' ? '#F97316' : '#F59E0B' }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div style={{ height: '120px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={severityData} barSize={24}>
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="value" radius={[4,4,0,0]}>
                  {severityData.map((_, i) => (
                    <Cell key={i} fill={['#EF4444','#F97316','#F59E0B','#10B981'][i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Care Recommendations */}
      <div>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'Outfit' }}>Care Recommendations</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {recommendations.map(({ type, icon: Icon, color, bg, border, severity, text, action }) => (
            <motion.div
              key={type}
              whileHover={{ y: -6 }}
              style={{
                background: bg, borderRadius: '16px', padding: '1.5rem',
                border: `1.5px solid ${border}`, cursor: 'default'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  <Icon size={22} color={color} />
                </div>
                <span style={{ background: 'white', borderRadius: '100px', padding: '0.2rem 0.75rem', fontSize: '0.72rem', fontWeight: 700, color }}>
                  {severity}
                </span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{type}</div>
              <p style={{ fontSize: '0.84rem', color: '#374151', lineHeight: 1.6, marginBottom: '1.25rem' }}>{text}</p>
              <button
                style={{
                  width: '100%', padding: '0.65rem', borderRadius: '10px',
                  background: color, color: 'white', border: 'none',
                  fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'opacity 0.2s'
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.9')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                {action}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Patient Queue */}
      <motion.div className="metric-card">
        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Patient Queue</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {patients.map(({ name, age, risk, condition, wait, avatar }) => (
            <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.85rem', borderRadius: '12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                background: risk === 'emergency' ? '#FEE2E2' : risk === 'high' ? '#FFEDD5' : risk === 'moderate' ? '#FEF3C7' : '#D1FAE5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontSize: '0.75rem',
                color: risk === 'emergency' ? '#DC2626' : risk === 'high' ? '#EA580C' : risk === 'moderate' ? '#D97706' : '#059669'
              }}>
                {avatar}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{name} · {age}y</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{condition}</div>
              </div>
              <span className={`badge badge-${risk}`}>{risk}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.78rem', minWidth: '40px' }}>
                <Clock size={12} />
                {wait}
              </div>
              <button className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>View</button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
