import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity, Brain, Shield, Mic, Globe, Watch, Heart,
  ChevronRight, Play, Users, Zap, Clock, ArrowRight,
  CheckCircle, MessageSquare, BarChart3, Video, Moon, Sun
} from 'lucide-react'

interface LandingProps {
  darkMode: boolean
  setDarkMode: (v: boolean) => void
}

const stats = [
  { value: '2.4M+', label: 'Patients Assisted', icon: Users },
  { value: '98.7%', label: 'Emergency Detection Rate', icon: Shield },
  { value: '<2s', label: 'Average Response Time', icon: Clock },
  { value: '156', label: 'Hospital Partners', icon: Heart },
]

const features = [
  { icon: Brain, title: 'NLP Symptom Analysis', desc: 'Advanced natural language processing understands complex symptom descriptions with clinical accuracy.', color: '#2563EB' },
  { icon: Shield, title: 'AI Risk Prediction', desc: 'Machine learning models trained on millions of cases predict health risks before they become critical.', color: '#14B8A6' },
  { icon: Zap, title: 'Emergency Detection', desc: 'Real-time monitoring flags emergency conditions instantly, triggering immediate response protocols.', color: '#EF4444' },
  { icon: Video, title: 'Telemedicine Integration', desc: 'Connect patients with certified physicians within minutes through secure video consultations.', color: '#8B5CF6' },
  { icon: Mic, title: 'Voice Assistant', desc: 'Hands-free symptom reporting with AI-powered voice recognition for accessibility.', color: '#F59E0B' },
  { icon: Globe, title: 'Multilingual Support', desc: 'Healthcare guidance in 40+ languages ensuring no patient is left behind.', color: '#10B981' },
  { icon: Watch, title: 'Wearable Integration', desc: 'Real-time data from smartwatches and medical devices for continuous health monitoring.', color: '#EC4899' },
  { icon: Heart, title: 'Mental Health Assessment', desc: 'Comprehensive mental wellness screening with evidence-based assessment tools.', color: '#6366F1' },
]

const HeartbeatLine = () => (
  <svg viewBox="0 0 1440 120" style={{ width: '100%', opacity: 0.12 }} fill="none">
    <path
      d="M0,60 L200,60 L240,10 L280,110 L320,10 L360,110 L400,60 L700,60 L740,10 L780,110 L820,10 L860,110 L900,60 L1200,60 L1240,10 L1280,110 L1320,10 L1360,110 L1440,60"
      stroke="#2563EB"
      strokeWidth="3"
      className="heartbeat-svg"
      style={{ strokeDasharray: '2000', strokeDashoffset: '2000', animation: 'dash 4s linear infinite' }}
    />
  </svg>
)

export default function LandingPage({ darkMode, setDarkMode }: LandingProps) {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(248,250,252,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 5%',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }} className={darkMode ? 'dark' : ''}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '11px',
            background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Activity size={21} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--text-primary)', fontFamily: 'Outfit' }}>
            Medi<span style={{ color: '#2563EB' }}>AI</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: '2rem', marginLeft: '3rem', display: 'none' }} className="nav-links">
          {['Features', 'Solutions', 'Pricing', 'About'].map(item => (
            <a key={item} href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}>{item}</a>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: '10px', padding: '0.5rem', cursor: 'pointer',
              color: 'var(--text-secondary)', display: 'flex', alignItems: 'center'
            }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <button className="btn-secondary" style={{ padding: '0.55rem 1.25rem' }}>Sign In</button>
          </Link>
          <Link to="/symptom-checker" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ padding: '0.55rem 1.25rem' }}>Get Started</button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '5rem 5%',
      }}>
        {/* BG decorations */}
        <div style={{
          position: 'absolute', top: '-200px', right: '-200px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-100px', left: '-100px',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20,184,166,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
          <HeartbeatLine />
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
              borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem'
            }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981', animation: 'blink 2s infinite' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB' }}>AI-Powered Healthcare Platform</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              fontFamily: 'Outfit',
              marginBottom: '1.25rem',
            }}>
              AI-Powered{' '}
              <span className="gradient-text">Healthcare</span>{' '}
              Triage Assistant
            </h1>

            <p style={{
              fontSize: '1.1rem',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '2rem',
              maxWidth: '520px',
            }}>
              Intelligent symptom analysis, emergency detection, and healthcare guidance powered by AI. Trusted by 2,400+ hospitals worldwide.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
              <Link to="/symptom-checker" style={{ textDecoration: 'none' }}>
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
                >
                  <Activity size={18} />
                  Start Health Assessment
                </motion.button>
              </Link>
              <motion.button
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ fontSize: '1rem', padding: '0.85rem 2rem' }}
                onClick={() => alert('Demo video coming soon!')}
              >
                <Play size={18} />
                Watch Demo
              </motion.button>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              {['HIPAA Compliant', 'FDA Cleared AI', '24/7 Monitoring'].map(badge => (
                <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle size={15} color="#10B981" />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{badge}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — AI Healthcare Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              {/* Main card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  background: 'var(--surface)',
                  borderRadius: '24px',
                  padding: '2rem',
                  boxShadow: '0 20px 60px rgba(37,99,235,0.15)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '14px',
                    background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <Brain size={24} color="white" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>AI Analysis Complete</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Patient #PA-2847 · Just now</div>
                  </div>
                  <div style={{ marginLeft: 'auto' }}>
                    <span className="badge badge-high">High Risk</span>
                  </div>
                </div>

                {/* Vitals */}
                {[
                  { label: 'Heart Rate', value: '112 bpm', color: '#EF4444', bar: 78 },
                  { label: 'SpO₂', value: '94%', color: '#F59E0B', bar: 94 },
                  { label: 'Blood Pressure', value: '148/92', color: '#8B5CF6', bar: 65 },
                  { label: 'Temperature', value: '38.9°C', color: '#14B8A6', bar: 72 },
                ].map(({ label, value, color, bar }) => (
                  <div key={label} style={{ marginBottom: '0.85rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color }}>{value}</span>
                    </div>
                    <div style={{ height: '6px', borderRadius: '3px', background: 'var(--border)', overflow: 'hidden' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${bar}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={{ height: '100%', borderRadius: '3px', background: color }}
                      />
                    </div>
                  </div>
                ))}

                <div className="emergency-banner" style={{ marginTop: '1rem' }}>
                  <Shield size={18} color="#EF4444" />
                  <div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626' }}>Emergency Detected</div>
                    <div style={{ fontSize: '0.75rem', color: '#EF4444' }}>Possible cardiac event — immediate care required</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{
                  position: 'absolute', top: '-20px', right: '-30px',
                  background: 'var(--surface)', borderRadius: '14px',
                  padding: '0.75rem 1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity size={16} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>AI Accuracy</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#10B981' }}>98.7%</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                style={{
                  position: 'absolute', bottom: '-20px', left: '-30px',
                  background: 'var(--surface)', borderRadius: '14px',
                  padding: '0.75rem 1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  border: '1px solid var(--border)',
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
              >
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(37,99,235,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Users size={16} color="#2563EB" />
                </div>
                <div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Today's Patients</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563EB' }}>1,247</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 5%', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {stats.map(({ value, label, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center' }}
              >
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px',
                  background: 'linear-gradient(135deg, rgba(37,99,235,0.1), rgba(20,184,166,0.1))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1rem'
                }}>
                  <Icon size={24} color="#2563EB" />
                </div>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-primary)', fontFamily: 'Outfit', lineHeight: 1 }}>{value}</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.4rem', fontWeight: 500 }}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '6rem 5%' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(37,99,235,0.08)', border: '1px solid rgba(37,99,235,0.2)',
              borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1rem'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#2563EB' }}>Platform Features</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Outfit' }}>
              Everything you need for <span className="gradient-text">smart healthcare</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginTop: '0.75rem', maxWidth: '600px', margin: '0.75rem auto 0' }}>
              Our AI platform integrates seamlessly with existing healthcare infrastructure to deliver intelligent triage at scale.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="glass-card"
                style={{ borderRadius: '20px', padding: '1.75rem', cursor: 'default' }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  background: `${color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <Icon size={24} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontFamily: 'Outfit' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '5rem 5%', background: 'var(--surface)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(135deg, #1E3A8A, #0F766E)',
              borderRadius: '28px',
              padding: '4rem 3rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-60px', right: '-60px',
              width: '200px', height: '200px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.06)'
            }} />
            <div style={{
              position: 'absolute', bottom: '-40px', left: '-40px',
              width: '150px', height: '150px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.04)'
            }} />
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 900, color: 'white', fontFamily: 'Outfit', marginBottom: '1rem' }}>
              Ready to transform healthcare triage?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
              Join thousands of healthcare providers using MediAI to deliver faster, smarter, and more accurate patient care.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/symptom-checker" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'white', color: '#1E3A8A',
                    padding: '0.9rem 2.25rem', borderRadius: '12px',
                    fontWeight: 700, border: 'none', cursor: 'pointer',
                    fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <Activity size={18} />
                  Start Free Trial
                  <ArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/dashboard" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    background: 'rgba(255,255,255,0.15)', color: 'white',
                    padding: '0.9rem 2.25rem', borderRadius: '12px',
                    fontWeight: 700, border: '2px solid rgba(255,255,255,0.3)', cursor: 'pointer',
                    fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  <BarChart3 size={18} />
                  View Dashboard
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0F172A', color: 'rgba(255,255,255,0.7)', padding: '3rem 5% 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Activity size={20} color="white" />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white', fontFamily: 'Outfit' }}>MediAI</span>
              </div>
              <p style={{ fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '220px' }}>
                AI-powered healthcare triage system trusted by hospitals worldwide.
              </p>
            </div>
            {[
              { heading: 'Product', links: ['AI Symptom Checker', 'Risk Assessment', 'Telemedicine', 'Analytics'] },
              { heading: 'Company', links: ['About Us', 'Careers', 'Blog', 'Contact'] },
              { heading: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Cookie Policy'] },
            ].map(({ heading, links }) => (
              <div key={heading}>
                <h4 style={{ fontWeight: 700, color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }}>{heading}</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {links.map(l => (
                    <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', transition: 'color 0.2s' }}
                       onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                       onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >{l}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
              ⚠️ This system is not a replacement for professional medical diagnosis. Always consult a qualified healthcare provider.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>© 2026 MediAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
