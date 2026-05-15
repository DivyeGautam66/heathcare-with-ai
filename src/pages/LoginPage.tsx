import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Brain,
  Eye,
  EyeOff,
  HeartPulse,
  ShieldCheck,
} from 'lucide-react'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)

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
              <span className="section-copy-tag">Secure Access</span>
              <h1>Continue your healthcare journey with a calm, secure login experience.</h1>
              <p>
                Access your dashboard, health insights, and AI-powered care tools through the same
                refined interface as the main website.
              </p>
            </motion.div>

            <motion.div
              className="auth-visual-card glass-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            >
              <div className="auth-heart-visual" aria-hidden="true">
                <div className="auth-heart-core" />
                <div className="auth-heart-ring auth-heart-ring-a" />
                <div className="auth-heart-ring auth-heart-ring-b" />
                <div className="auth-heart-wave" />
              </div>
              <div className="auth-visual-stats">
                <div>
                  <strong>Private</strong>
                  <span>End-to-end protected sessions</span>
                </div>
                <div>
                  <strong>Fast</strong>
                  <span>Designed for clear, low-friction access</span>
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
                <ShieldCheck size={18} />
                Protected patient access
              </div>
              <div className="auth-feature-chip glass-card">
                <HeartPulse size={18} />
                Connected health records
              </div>
              <div className="auth-feature-chip glass-card">
                <Brain size={18} />
                AI-guided care support
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
              <span className="section-copy-tag">Login</span>
              <h2>Welcome back</h2>
              <p>Sign in to continue to your healthcare workspace.</p>
            </div>

            <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
              <label className="auth-field">
                <span>Email address</span>
                <input type="email" placeholder="name@email.com" />
              </label>

              <label className="auth-field">
                <span>Password</span>
                <div className="auth-password-wrap">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
                  <button
                    type="button"
                    className="auth-eye-button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </label>

              <div className="auth-row">
                <label className="auth-check">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="auth-inline-link">
                  Forgot password?
                </button>
              </div>

              <button type="submit" className="primary-button auth-submit">
                Login
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-footer-copy">
              Don&apos;t have an account yet?
              <button type="button" className="auth-inline-link">
                Request access
              </button>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
