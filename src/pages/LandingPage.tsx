import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Activity,
  ArrowRight,
  Brain,
  Check,
  ChevronRight,
  Cpu,
  FlaskConical,
  HeartPulse,
  Menu,
  MessageSquareHeart,
  Microscope,
  Play,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TestTube2,
  Video,
  Wind,
  X,
} from 'lucide-react'

type LandingPageProps = {
  darkMode?: boolean
  setDarkMode?: (value: boolean) => void
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

const aiCards = [
  {
    title: 'Mental Health Counseling',
    description: 'Private AI-guided care plans with therapist-ready summaries.',
    icon: MessageSquareHeart,
  },
  {
    title: 'Cholesterol Levels',
    description: 'Continuous biomarker scoring with personalized prevention insights.',
    icon: HeartPulse,
  },
  {
    title: 'Lung Function Test',
    description: 'Breathing analytics and remote respiratory risk detection in seconds.',
    icon: Wind,
  },
  {
    title: 'At-home Lab Tests',
    description: 'Connected diagnostics kits with intelligent follow-up and reminders.',
    icon: TestTube2,
  },
]

const planFeatures = [
  {
    name: 'Essential',
    monthly: '$29',
    yearly: '$19',
    description: 'For individuals beginning their AI-supported health journey.',
    features: ['AI symptom triage', '2 video consultations', 'Health timeline', 'Smart lab reminders'],
    highlight: false,
  },
  {
    name: 'Premium',
    monthly: '$79',
    yearly: '$59',
    description: 'Best for proactive care, prevention, and specialist coordination.',
    features: ['Unlimited AI check-ins', 'Priority doctor access', 'Advanced analytics', 'Family health dashboard'],
    highlight: true,
  },
  {
    name: 'Enterprise',
    monthly: '$149',
    yearly: '$119',
    description: 'For clinics and care networks delivering futuristic patient experiences.',
    features: ['Multi-user roles', 'Custom workflows', 'Population health insights', 'Dedicated success support'],
    highlight: false,
  },
]

const testimonials = [
  {
    name: 'Maya Chen',
    role: 'Wellness Member',
    quote: 'It feels like Apple designed healthcare for modern families. Every interaction is calm, clear, and incredibly smart.',
  },
  {
    name: 'Dr. Elias Noor',
    role: 'Clinical Advisor',
    quote: 'The pre-consultation AI summaries save time and improve the quality of every remote visit we run.',
  },
  {
    name: 'Nina Patel',
    role: 'Remote Patient',
    quote: 'Lab tracking, video care, and mental wellness all live in one elegant flow. It genuinely reduced my care anxiety.',
  },
]

const faqItems = [
  {
    question: 'How does the AI assist with care?',
    answer: 'It organizes health signals, surfaces possible risks, and helps clinicians make faster, better-informed decisions.',
  },
  {
    question: 'Can patients use this for remote diagnostics?',
    answer: 'Yes. The platform supports at-home tests, wearable input, and secure video follow-ups in one connected experience.',
  },
  {
    question: 'Is this suitable for clinics and enterprises?',
    answer: 'Yes. Premium and Enterprise plans support collaboration, analytics, and workflows for growing care teams.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.7, ease: 'easeOut' as const },
}

export default function LandingPage(_props: LandingPageProps) {
  const [yearly, setYearly] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <div className="landing-shell">
      <div className="landing-orb landing-orb-a" />
      <div className="landing-orb landing-orb-b" />
      <div className="landing-grid" />

      <header className="landing-header">
        <nav className="landing-nav">
          <Link to="/" className="brand-mark">
            <span className="brand-icon">
              <Activity size={18} />
            </span>
            <span className="brand-text">MediQo</span>
          </Link>

          <div className="nav-desktop">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div className="nav-actions">
            <Link to="/dashboard" className="ghost-button">
              Login
            </Link>
            <Link to="/symptom-checker" className="primary-button">
              Get Started
            </Link>
            <button
              type="button"
              className="mobile-menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              className="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="mobile-nav-link" onClick={() => setMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="section-frame hero-frame">
            <motion.div {...fadeUp} className="hero-copy">
              <div className="eyebrow-pill">
                <Sparkles size={14} />
                AI-powered healthcare operating system
              </div>
              <h1>
                Revolutionizing Global Healthcare with AI: Connect, Heal, Thrive
              </h1>
              <p>
                A futuristic care experience blending precision diagnostics, immersive doctor visits,
                and calm, beautifully designed patient journeys.
              </p>

              <div className="hero-actions">
                <Link to="/symptom-checker" className="primary-button hero-primary">
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <a href="#contact" className="secondary-button">
                  Contact Us
                </a>
              </div>

              <div className="hero-proof">
                <div className="avatar-stack">
                  <span />
                  <span />
                  <span />
                </div>
                <p>Trusted by 167K+ users and modern care teams across global wellness programs.</p>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.div
                className="glass-panel dashboard-panel"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="panel-header">
                  <span>AI Powered</span>
                  <span>Live</span>
                </div>
                <h3>Connected health dashboard</h3>
                <p>Clinical triage, remote biometrics, and personalized care suggestions in one calm interface.</p>
                <div className="tag-row">
                  <span>Mental Health</span>
                  <span>Lung Function</span>
                  <span>Cholesterol</span>
                  <span>At-home Lab</span>
                </div>
                <div className="mini-chart">
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </motion.div>

              <motion.div
                className="glass-card floating-card top-card"
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              >
                <div className="card-badge">
                  <Microscope size={14} />
                  Microscopic insight
                </div>
                <div className="visual-swirl" />
                <p>AI-enhanced scan quality with tissue pattern recognition.</p>
              </motion.div>

              <motion.div
                className="glass-card floating-card side-card"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              >
                <div className="stat-kicker">Predictive care score</div>
                <div className="stat-value">98.7%</div>
                <p>Model confidence across respiratory and cardio screening.</p>
              </motion.div>

              <motion.div
                className="glass-card floating-card bottom-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              >
                <div className="doctor-chip">
                  <div className="doctor-avatar" />
                  <div>
                    <strong>Dr. Aaliyah Brooks</strong>
                    <span>Now available for video consult</span>
                  </div>
                </div>
                <div className="call-actions">
                  <button type="button">
                    <Video size={14} />
                  </button>
                  <button type="button">
                    <Stethoscope size={14} />
                  </button>
                  <button type="button">
                    <Brain size={14} />
                  </button>
                </div>
              </motion.div>

              <div className="dna-helix" aria-hidden="true">
                {Array.from({ length: 9 }).map((_, index) => (
                  <span key={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="landing-section">
          <motion.div {...fadeUp} className="section-heading">
            <span>AI Powered Healthcare</span>
            <h2>Glassmorphism care modules designed to feel intelligent, light, and deeply human.</h2>
          </motion.div>

          <div className="feature-grid">
            {aiCards.map((card, index) => {
              const Icon = card.icon
              return (
                <motion.article
                  key={card.title}
                  className="feature-card glass-card"
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                  whileHover={{ y: -8, scale: 1.01 }}
                >
                  <div className="feature-icon">
                    <Icon size={22} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <a href="#pricing">
                    Explore module
                    <ChevronRight size={16} />
                  </a>
                </motion.article>
              )
            })}
          </div>
        </section>

        <section id="about" className="landing-section">
          <div className="immersive-grid">
            <motion.div {...fadeUp} className="section-copy">
              <span>Immersive Doctor Experience</span>
              <h2>Connect with your doctor in a next-generation consultation space.</h2>
              <p>
                Mixed-reality inspired care flows help patients feel guided before, during, and after
                every appointment. From pre-visit symptom capture to live analytics overlays, the
                experience stays warm instead of clinical.
              </p>
              <div className="benefit-list">
                <div>
                  <ShieldCheck size={18} />
                  HIPAA-minded communication flows
                </div>
                <div>
                  <Cpu size={18} />
                  AI-assisted note generation
                </div>
                <div>
                  <Video size={18} />
                  Seamless video consultation controls
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="experience-stage glass-panel">
              <div className="experience-orbit" />
              <div className="headset-figure">
                <div className="visor" />
                <div className="pulse-ring pulse-one" />
                <div className="pulse-ring pulse-two" />
              </div>

              <div className="glass-card consult-card">
                <div className="consult-header">
                  <span>Live Consultation</span>
                  <button type="button">
                    <Play size={14} />
                  </button>
                </div>
                <div className="consult-body">
                  <div className="doctor-avatar large" />
                  <div>
                    <strong>Dr. Emily Stone</strong>
                    <p>Respiratory Specialist</p>
                  </div>
                </div>
                <div className="wave-bars">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>

              <div className="glass-card profile-floating">
                <p>Remote vitals synced</p>
                <strong>SpO2 98%</strong>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="landing-section">
          <div className="molecular-grid">
            <motion.div {...fadeUp} className="molecule-stage glass-panel">
              <div className="molecule-core">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span key={index} style={{ transform: `rotate(${index * 30}deg) translateY(-118px)` }} />
                ))}
              </div>
            </motion.div>

            <motion.div {...fadeUp} className="section-copy">
              <span>Molecular Intelligence</span>
              <h2>Clean educational storytelling, powered by biology-inspired visuals and spatial depth.</h2>
              <p>
                Translate complex health concepts into calm visual systems. DNA-inspired motion,
                molecular clusters, and scientific microinteractions help users understand their health
                without overwhelming them.
              </p>
              <div className="science-blocks">
                <article className="glass-card science-card">
                  <FlaskConical size={18} />
                  <div>
                    <h3>Protein Mapping</h3>
                    <p>Explain metabolic and cellular health with accessible visual summaries.</p>
                  </div>
                </article>
                <article className="glass-card science-card">
                  <Brain size={18} />
                  <div>
                    <h3>Neural Insight</h3>
                    <p>Surface patterns, risks, and opportunities through beautifully layered AI models.</p>
                  </div>
                </article>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="pricing" className="landing-section">
          <motion.div {...fadeUp} className="section-heading">
            <span>Pricing</span>
            <h2>Choose the right care intelligence plan for your health journey.</h2>
          </motion.div>

          <motion.div {...fadeUp} className="billing-toggle">
            <button
              type="button"
              className={!yearly ? 'toggle-option active' : 'toggle-option'}
              onClick={() => setYearly(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              className={yearly ? 'toggle-option active' : 'toggle-option'}
              onClick={() => setYearly(true)}
            >
              Yearly
            </button>
          </motion.div>

          <div className="pricing-grid">
            {planFeatures.map((plan, index) => (
              <motion.article
                key={plan.name}
                className={plan.highlight ? 'pricing-card featured' : 'pricing-card glass-card'}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.08 }}
                whileHover={{ y: -8 }}
              >
                <div className="pricing-label">{plan.highlight ? 'Most Popular' : 'Plan'}</div>
                <h3>{plan.name}</h3>
                <div className="pricing-value">
                  {yearly ? plan.yearly : plan.monthly}
                  <span>/mo</span>
                </div>
                <p>{plan.description}</p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/dashboard" className={plan.highlight ? 'primary-button pricing-button' : 'secondary-button pricing-button'}>
                  Get Started
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="landing-section">
          <motion.div {...fadeUp} className="section-heading">
            <span>Testimonials</span>
            <h2>Patients and clinicians describe the experience as calm, premium, and surprisingly intuitive.</h2>
          </motion.div>

          <div className="testimonial-grid">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                className="testimonial-card glass-card"
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: index * 0.1 }}
              >
                <div className="testimonial-top">
                  <div className="testimonial-avatar" />
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.role}</p>
                  </div>
                </div>
                <blockquote>{item.quote}</blockquote>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="faq" className="landing-section">
          <div className="faq-layout">
            <motion.div {...fadeUp} className="section-copy">
              <span>FAQ</span>
              <h2>Built for trust, clarity, and modern healthcare delivery.</h2>
              <p>
                Every layer of the experience is designed to reduce friction while keeping the product
                feeling premium, calm, and ready for real-world healthcare workflows.
              </p>
            </motion.div>

            <motion.div {...fadeUp} className="faq-list">
              {faqItems.map((item, index) => (
                <button
                  key={item.question}
                  type="button"
                  className={openFaq === index ? 'faq-item open' : 'faq-item'}
                  onClick={() => setOpenFaq(index)}
                >
                  <div className="faq-question">
                    <span>{item.question}</span>
                    <ChevronRight size={16} />
                  </div>
                  <p>{item.answer}</p>
                </button>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <footer id="contact" className="landing-footer">
        <div className="section-frame footer-frame">
          <div>
            <Link to="/" className="brand-mark">
              <span className="brand-icon">
                <Activity size={18} />
              </span>
              <span className="brand-text">MediQo</span>
            </Link>
            <p className="footer-copy">
              Elegant AI healthcare for connected clinics, modern families, and calmer care journeys.
            </p>
          </div>

          <div className="footer-links">
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <form className="newsletter-card glass-card">
            <label htmlFor="newsletter">Newsletter</label>
            <div className="newsletter-row">
              <input id="newsletter" type="email" placeholder="Enter your email" />
              <button type="button" className="primary-button">
                Join
              </button>
            </div>
            <div className="social-row">
              <a href="https://dribbble.com" target="_blank" rel="noreferrer">
                Dribbble
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer">
                X
              </a>
            </div>
          </form>
        </div>
      </footer>
    </div>
  )
}
