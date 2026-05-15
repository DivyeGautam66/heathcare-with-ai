import { AlertTriangle } from 'lucide-react'
import { useState } from 'react'

export default function SOSButton() {
  const [clicked, setClicked] = useState(false)

  const handleSOS = () => {
    setClicked(true)
    alert('🚨 EMERGENCY SOS ACTIVATED\n\nEmergency services have been notified.\nNearest hospital: City General Hospital\nETA: ~8 minutes\n\nStay calm. Help is on the way.')
    setTimeout(() => setClicked(false), 3000)
  }

  return (
    <button
      className="sos-btn"
      onClick={handleSOS}
      title="Emergency SOS"
      style={{ transform: clicked ? 'scale(1.2)' : undefined }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
        <AlertTriangle size={18} />
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.05em' }}>SOS</span>
      </div>
    </button>
  )
}
