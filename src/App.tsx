import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import SymptomChecker from './pages/SymptomChecker'
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'
import PatientProfile from './pages/PatientProfile'
import Telemedicine from './pages/Telemedicine'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className={darkMode ? 'dark' : ''} style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Routes>
        <Route path="/" element={<LandingPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route element={<Layout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/patient-profile" element={<PatientProfile />} />
          <Route path="/telemedicine" element={<Telemedicine />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </div>
  )
}
