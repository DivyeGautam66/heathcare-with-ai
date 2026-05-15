import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Brain,
  ClipboardList,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'

export default function GetStartedPage() {
  return (
    <div className="landing-shell auth-shell">
      <div className="landing-orb landing-orb-a" />
      <div className="landing-orb landing-orb-b" />
      <div className="landing-grid" />

      <header className="landing-header auth-header">
        <nav className="landing-nav auth-nav">
          <Link to="/" className="brand-mark">
            <span className="brand-icon">
              <Activity size={18} />
            </span>
            <span className="brand-text">MediQo</span>
          </Link>

          <div className="auth-nav-actions">
            <Link to="/" className="ghost-button">
              Back Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="auth-main">
        <section className="auth-panel glass-panel">
          <div className="auth-panel-lines" aria-hidden="true" />

          <div className="auth-visual">
            <motion.div
              className="auth-visual-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <span className="section-copy-tag">Get Started</span>
              <h1>Begin with a guided healthcare setup designed to feel calm and premium.</h1>
              <p>
                Start your journey with a thoughtful onboarding flow that helps us understand your
                needs, organize your health goals, and prepare a smarter AI-assisted experience.
              </p>
            </motion.div>

            <motion.div
              className="auth-visual-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="auth-heart-visual auth-start-visual" aria-hidden="true">
                <div className="start-visual-badge start-visual-badge-a">
                  <HeartPulse size={18} />
                </div>
                <div className="start-visual-badge start-visual-badge-b">
                  <Brain size={18} />
                </div>
                <div className="start-visual-panel">
                  <div className="start-visual-line start-visual-line-a" />
                  <div className="start-visual-line start-visual-line-b" />
                  <div className="start-visual-line start-visual-line-c" />
                </div>
              </div>
              <div className="auth-visual-stats">
                <div>
                  <strong>Step-by-step</strong>
                  <span>A clearer path into your health dashboard and AI tools.</span>
                </div>
                <div>
                  <strong>Personalized</strong>
                  <span>Built to adapt around symptoms, care goals, and medical context.</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="auth-feature-row"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            >
              <div className="auth-feature-chip glass-card">
                <ClipboardList size={18} />
                Guided intake flow
              </div>
              <div className="auth-feature-chip glass-card">
                <ShieldCheck size={18} />
                Secure health setup
              </div>
              <div className="auth-feature-chip glass-card">
                <Sparkles size={18} />
                Clean onboarding experience
              </div>
            </motion.div>
          </div>

          <motion.div
            className="auth-form-card glass-card"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <div className="auth-form-top">
              <span className="section-copy-tag">Onboarding</span>
              <h2>Set up your care profile</h2>
              <p>Tell us a few essentials so we can shape the right experience for you.</p>
            </div>

            <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
              <label className="auth-field">
                <span>Full name</span>
                <input type="text" placeholder="Enter your full name" />
              </label>

              <label className="auth-field">
                <span>Email address</span>
                <input type="email" placeholder="name@email.com" />
              </label>

              <label className="auth-field">
                <span>Primary goal</span>
                <select className="auth-select">
                  <option>Choose your goal</option>
                  <option>Symptom analysis</option>
                  <option>Remote health tracking</option>
                  <option>Preventive care planning</option>
                  <option>General wellness support</option>
                </select>
              </label>

              <div className="start-steps glass-card">
                <div className="start-step">
                  <span>1</span>
                  Share your profile details
                </div>
                <div className="start-step">
                  <span>2</span>
                  Configure your care preferences
                </div>
                <div className="start-step">
                  <span>3</span>
                  Continue into the AI assistant
                </div>
              </div>

              <Link to="/symptom-checker" className="primary-button auth-submit">
                Continue Setup
                <ArrowRight size={16} />
              </Link>
            </form>

            <div className="auth-footer-copy">
              Already have an account?
              <Link to="/login" className="auth-link-inline">
                Login instead
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
