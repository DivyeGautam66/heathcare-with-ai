import { motion } from 'framer-motion'
import { Video, Star, Clock, Calendar, CheckCircle, Wifi } from 'lucide-react'

const doctors = [
  { name: 'Dr. Priya Patel', specialty: 'Cardiologist', rating: 4.9, reviews: 312, available: true, fee: '$85', avatar: 'PP', color: '#2563EB', next: 'Available now' },
  { name: 'Dr. James Walker', specialty: 'General Medicine', rating: 4.8, reviews: 528, available: true, fee: '$55', avatar: 'JW', color: '#14B8A6', next: 'In 15 mins' },
  { name: 'Dr. Aisha Rahman', specialty: 'Emergency Medicine', rating: 4.9, reviews: 219, available: false, fee: '$95', avatar: 'AR', color: '#8B5CF6', next: 'In 2 hours' },
  { name: 'Dr. Michael Chen', specialty: 'Pulmonologist', rating: 4.7, reviews: 187, available: true, fee: '$80', avatar: 'MC', color: '#F59E0B', next: 'In 30 mins' },
  { name: 'Dr. Sarah Johnson', specialty: 'Neurologist', rating: 4.8, reviews: 274, available: false, fee: '$90', avatar: 'SJ', color: '#EF4444', next: 'Tomorrow 9am' },
  { name: 'Dr. Carlos Rivera', specialty: 'Psychiatry', rating: 4.6, reviews: 341, available: true, fee: '$75', avatar: 'CR', color: '#10B981', next: 'In 45 mins' },
]

const appointments = [
  { doctor: 'Dr. Priya Patel', type: 'Cardiology Follow-up', date: 'Today, 2:30 PM', status: 'upcoming' },
  { doctor: 'Dr. James Walker', type: 'General Consultation', date: 'May 18, 10:00 AM', status: 'scheduled' },
  { doctor: 'Dr. Michael Chen', type: 'Pulmonology Review', date: 'May 22, 3:00 PM', status: 'scheduled' },
]

export default function Telemedicine() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>Telemedicine</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.2rem' }}>Connect with certified physicians instantly</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#D1FAE5', borderRadius: '100px', padding: '0.35rem 0.9rem' }}>
            <Wifi size={14} color="#059669" />
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#059669' }}>4 Doctors Online</span>
          </div>
        </div>
      </div>

      {/* Live Consultation Preview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          borderRadius: '20px', overflow: 'hidden', position: 'relative',
          background: 'linear-gradient(135deg, #0F172A, #1E293B)',
          height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        {/* Simulated video call UI */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center', color: 'white' }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%', margin: '0 auto 1rem',
              background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 800, animation: 'animate-glow 2s infinite'
            }}>PP</div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>Dr. Priya Patel</div>
            <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Cardiologist · Connecting...</div>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              {[
                { label: 'Camera', active: true },
                { label: 'Mic', active: true },
                { label: 'Share Screen', active: false },
              ].map(({ label, active }) => (
                <div key={label} style={{
                  background: active ? 'rgba(255,255,255,0.15)' : 'rgba(239,68,68,0.7)',
                  borderRadius: '100px', padding: '0.4rem 1rem', fontSize: '0.78rem', fontWeight: 600, color: 'white'
                }}>{label}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Patient preview (corner) */}
        <div style={{
          position: 'absolute', bottom: '1rem', right: '1rem',
          width: '120px', height: '90px', borderRadius: '12px',
          background: 'linear-gradient(135deg, #1E293B, #334155)',
          border: '2px solid rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.4rem', fontWeight: 700, fontSize: '0.7rem', color: 'white' }}>SM</div>
            <div style={{ fontSize: '0.65rem' }}>You</div>
          </div>
        </div>

        {/* Recording indicator */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(239,68,68,0.8)', borderRadius: '100px', padding: '0.3rem 0.75rem' }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'white', animation: 'blink 1s infinite' }} />
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'white' }}>LIVE</span>
        </div>

        <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.4)', borderRadius: '8px', padding: '0.3rem 0.65rem' }}>
          <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.7)', fontFamily: 'monospace' }}>00:04:23</span>
        </div>

        <button style={{
          position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)',
          background: '#EF4444', border: 'none', borderRadius: '100px',
          padding: '0.65rem 2rem', color: 'white', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem'
        }}>
          Join Consultation
        </button>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div className="metric-card">
        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>Upcoming Appointments</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {appointments.map(({ doctor, type, date, status }) => (
            <div key={doctor} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem', borderRadius: '12px', background: 'var(--bg)', border: '1px solid var(--border)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.75rem', flexShrink: 0 }}>
                {doctor.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--text-primary)' }}>{doctor}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{type}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <Calendar size={14} />
                {date}
              </div>
              <span style={{
                background: status === 'upcoming' ? '#D1FAE5' : '#DBEAFE',
                color: status === 'upcoming' ? '#059669' : '#1D4ED8',
                padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700
              }}>
                {status === 'upcoming' ? 'Today' : 'Scheduled'}
              </span>
              <button className="btn-primary" style={{ padding: '0.4rem 0.9rem', fontSize: '0.78rem' }}>Join</button>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Available Doctors */}
      <div>
        <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1rem', fontFamily: 'Outfit' }}>Available Physicians</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {doctors.map(({ name, specialty, rating, reviews, available, fee, avatar, color, next }) => (
            <motion.div
              key={name}
              whileHover={{ y: -6 }}
              className="metric-card"
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {available && (
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem', background: '#D1FAE5', borderRadius: '100px', padding: '0.2rem 0.6rem' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#059669' }}>Online</span>
                </div>
              )}
              <div style={{ display: 'flex', gap: '0.85rem', marginBottom: '1rem' }}>
                <div style={{ width: '54px', height: '54px', borderRadius: '50%', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1rem', color, border: `2px solid ${color}30` }}>
                  {avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{specialty}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.25rem' }}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-primary)' }}>{rating}</span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Consultation Fee</div>
                  <div style={{ fontWeight: 700, color, fontSize: '1.1rem' }}>{fee}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Next Available</div>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: available ? '#059669' : 'var(--text-secondary)' }}>{next}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  disabled={!available}
                  style={{
                    flex: 1, padding: '0.6rem', borderRadius: '10px', border: 'none', cursor: available ? 'pointer' : 'not-allowed',
                    background: available ? `linear-gradient(135deg, ${color}, ${color}CC)` : 'var(--border)',
                    color: 'white', fontWeight: 700, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', transition: 'opacity 0.2s'
                  }}
                >
                  <Video size={15} />
                  {available ? 'Consult Now' : 'Unavailable'}
                </button>
                <button style={{ padding: '0.6rem 0.85rem', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--bg)', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}>
                  <Calendar size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
