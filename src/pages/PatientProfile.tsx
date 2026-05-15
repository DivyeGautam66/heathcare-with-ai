import { motion } from 'framer-motion'
import { User, Heart, Pill, FileText, Calendar, AlertCircle, Activity, Download, Upload, Brain } from 'lucide-react'

const timeline = [
  { date: 'May 15, 2026', title: 'AI Triage Assessment', desc: 'High-risk assessment for chest pain. Referred to cardiology.', type: 'emergency', icon: AlertCircle },
  { date: 'Apr 28, 2026', title: 'Routine Blood Work', desc: 'CBC, metabolic panel. Results within normal limits.', type: 'low', icon: Activity },
  { date: 'Mar 10, 2026', title: 'Cardiology Follow-up', desc: 'Echo shows mild LVH. Continue current medications.', type: 'moderate', icon: Heart },
  { date: 'Feb 2, 2026', title: 'Emergency ER Visit', desc: 'Acute hypertensive episode. BP: 185/110. Treated and discharged.', type: 'high', icon: AlertCircle },
  { date: 'Jan 15, 2026', title: 'Annual Physical', desc: 'General wellness exam. Updated vaccinations.', type: 'low', icon: User },
]

const medications = [
  { name: 'Metoprolol', dose: '50mg', freq: 'Once daily', refill: 'May 28' },
  { name: 'Lisinopril', dose: '10mg', freq: 'Once daily', refill: 'Jun 5' },
  { name: 'Aspirin', dose: '81mg', freq: 'Once daily', refill: 'Jun 20' },
  { name: 'Atorvastatin', dose: '40mg', freq: 'Nightly', refill: 'May 31' },
]

const allergies = [
  { name: 'Penicillin', reaction: 'Anaphylaxis', severity: 'Severe' },
  { name: 'Sulfonamides', reaction: 'Rash', severity: 'Moderate' },
  { name: 'Codeine', reaction: 'Nausea/vomiting', severity: 'Mild' },
]

const reports = [
  { name: 'Chest X-Ray', date: 'May 10, 2026', type: 'Radiology' },
  { name: 'ECG Report', date: 'May 15, 2026', type: 'Cardiology' },
  { name: 'Blood Panel', date: 'Apr 28, 2026', type: 'Laboratory' },
  { name: 'Echo Report', date: 'Mar 10, 2026', type: 'Cardiology' },
]

export default function PatientProfile() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="metric-card"
        style={{ background: 'linear-gradient(135deg, #1E3A8A, #0F766E)', border: 'none', padding: '2rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.75rem', fontWeight: 800, color: 'white', border: '3px solid rgba(255,255,255,0.3)'
          }}>SM</div>
          <div>
            <h1 style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '1.75rem', color: 'white' }}>Sarah Mitchell</h1>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
              {['54 years · Female', 'MRN: PA-2847', 'Blood Type: A+', 'DOB: Mar 12, 1972'].map(item => (
                <span key={item} style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.75)' }}>{item}</span>
              ))}
            </div>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
            <button style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', borderRadius: '10px', padding: '0.6rem 1.25rem', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Upload size={16} /> Upload Report
            </button>
            <button style={{ background: 'white', border: 'none', borderRadius: '10px', padding: '0.6rem 1.25rem', color: '#1E3A8A', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <Download size={16} /> Export Records
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
          {[
            { label: 'Primary Condition', value: 'Hypertension' },
            { label: 'Current Risk', value: 'High' },
            { label: 'Last Visit', value: 'May 15, 2026' },
            { label: 'Primary Doctor', value: 'Dr. Patel' },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.85rem' }}>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.25rem' }}>{label}</div>
              <div style={{ fontWeight: 700, color: 'white', fontSize: '0.95rem' }}>{value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* AI Health Summary */}
      <motion.div className="metric-card" style={{ border: '1.5px solid rgba(37,99,235,0.2)', background: 'linear-gradient(135deg, rgba(37,99,235,0.04), rgba(20,184,166,0.04))' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '13px', background: 'linear-gradient(135deg, #2563EB, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Brain size={22} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>AI-Generated Health Summary</div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              Patient Sarah Mitchell, 54F, presents with a history of hypertension and recent acute chest pain. Current risk score is <strong>78/100 (High)</strong>. 
              Primary concerns include uncontrolled blood pressure (148/92 mmHg), elevated heart rate (112 bpm), and reduced oxygen saturation (94%). 
              AI flags <strong>72% probability of Acute Coronary Syndrome</strong>. Immediate cardiology consultation recommended. 
              Current medication regimen appears adequate but may require dose adjustment based on today's readings.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
              {['Cardiology Consult', 'ECG Needed', 'Medication Review', 'Follow-up in 48h'].map(tag => (
                <span key={tag} style={{ background: 'rgba(37,99,235,0.1)', color: '#2563EB', padding: '0.2rem 0.75rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600 }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Medications */}
        <motion.div className="metric-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <Pill size={18} color="#2563EB" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Current Medications</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {medications.map(({ name, dose, freq, refill }) => (
              <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: '12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Pill size={17} color="#2563EB" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{name} · {dose}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>{freq} · Refill: {refill}</div>
                </div>
                <span style={{ fontSize: '0.72rem', background: '#D1FAE5', color: '#059669', padding: '0.2rem 0.6rem', borderRadius: '100px', fontWeight: 600 }}>Active</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Allergies */}
        <motion.div className="metric-card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
            <AlertCircle size={18} color="#EF4444" />
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Allergies & Adverse Reactions</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {allergies.map(({ name, reaction, severity }) => (
              <div key={name} style={{
                padding: '0.85rem', borderRadius: '12px',
                background: severity === 'Severe' ? '#FEF2F2' : severity === 'Moderate' ? '#FFFBEB' : '#F0FDF4',
                border: `1.5px solid ${severity === 'Severe' ? '#FECACA' : severity === 'Moderate' ? '#FDE68A' : '#BBF7D0'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F172A' }}>{name}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: severity === 'Severe' ? '#DC2626' : severity === 'Moderate' ? '#D97706' : '#059669' }}>{severity}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#374151' }}>Reaction: {reaction}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Medical History Timeline */}
      <motion.div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Calendar size={18} color="#2563EB" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Medical History Timeline</span>
        </div>
        <div style={{ position: 'relative', paddingLeft: '1.5rem' }}>
          <div style={{ position: 'absolute', left: '0', top: 0, bottom: 0, width: '2px', background: 'var(--border)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {timeline.map(({ date, title, desc, type, icon: Icon }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{ position: 'relative' }}
              >
                <div style={{
                  position: 'absolute', left: '-1.5rem', top: '4px',
                  width: '20px', height: '20px', borderRadius: '50%', transform: 'translateX(-9px)',
                  background: type === 'emergency' ? '#FEE2E2' : type === 'high' ? '#FFEDD5' : type === 'moderate' ? '#FEF3C7' : '#D1FAE5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--surface)'
                }}>
                  <Icon size={10} color={type === 'emergency' ? '#EF4444' : type === 'high' ? '#F97316' : type === 'moderate' ? '#F59E0B' : '#10B981'} />
                </div>
                <div style={{ paddingLeft: '0.5rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{title}</span>
                    <span className={`badge badge-${type}`} style={{ fontSize: '0.65rem' }}>{type}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>{date}</div>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Uploaded Reports */}
      <motion.div className="metric-card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <FileText size={18} color="#2563EB" />
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Uploaded Reports</span>
          <button style={{ marginLeft: 'auto', background: 'none', border: '1px solid var(--border)', borderRadius: '8px', padding: '0.3rem 0.85rem', cursor: 'pointer', fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
            <Upload size={13} /> Upload New
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {reports.map(({ name, date, type }) => (
            <div key={name} style={{ padding: '1rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(37,99,235,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <FileText size={20} color="#2563EB" />
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{name}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{type} · {date}</div>
              <button style={{ marginTop: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#2563EB', fontSize: '0.78rem', fontWeight: 600, padding: 0, display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
                <Download size={13} /> Download
              </button>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
