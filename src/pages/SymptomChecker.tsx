import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Mic, MicOff, AlertTriangle, Bot, User, X, Plus, Clock } from 'lucide-react'

interface Message {
  id: number
  role: 'user' | 'ai'
  text: string
  time: string
  isEmergency?: boolean
}

const initialMessages: Message[] = [
  {
    id: 1,
    role: 'ai',
    text: "Hello! I'm MediAI, your AI health assistant. I can help analyze your symptoms and provide guidance. How are you feeling today? Please describe your symptoms in as much detail as possible.",
    time: '9:00 AM',
  }
]

const suggestions = [
  'Chest pain', 'Shortness of breath', 'Headache', 'Fever',
  'Nausea', 'Back pain', 'Dizziness', 'Fatigue'
]

const aiResponses: Record<string, { text: string; isEmergency?: boolean }> = {
  default: {
    text: "Thank you for sharing that. Can you tell me:\n1. How long have you been experiencing this?\n2. Is the pain constant or does it come and go?\n3. On a scale of 1-10, how would you rate the severity?\n4. Do you have any other accompanying symptoms?"
  },
  chest: {
    text: "⚠️ Chest pain can be a serious symptom. I'm flagging this for urgent review.\n\nPlease answer these questions immediately:\n• Is the pain spreading to your arm, jaw, or back?\n• Are you experiencing shortness of breath or sweating?\n• Do you feel lightheaded or nauseous?\n\nIf symptoms are severe, please call emergency services (911) immediately.",
    isEmergency: true
  },
  fever: {
    text: "I see. Fever can indicate various conditions. Let me ask:\n• What is your current temperature?\n• How long have you had the fever?\n• Do you have any other symptoms like chills, body aches, or sore throat?\n• Have you traveled recently or been in contact with anyone ill?"
  },
  headache: {
    text: "Understood. Headaches can range from tension headaches to more serious conditions. Can you describe:\n• Where exactly is the pain located?\n• Is this the worst headache of your life? (Important indicator)\n• Are you experiencing any visual changes, neck stiffness, or sensitivity to light?\n• Have you taken any medications?"
  },
}

function getAIResponse(input: string): { text: string; isEmergency?: boolean } {
  const lower = input.toLowerCase()
  if (lower.includes('chest') || lower.includes('heart') || lower.includes('cardiac')) return aiResponses.chest
  if (lower.includes('fever') || lower.includes('temperature')) return aiResponses.fever
  if (lower.includes('headache') || lower.includes('head pain') || lower.includes('migraine')) return aiResponses.headache
  return aiResponses.default
}

export default function SymptomChecker() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = {
      id: Date.now(),
      role: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setIsTyping(true)

    setTimeout(() => {
      const response = getAIResponse(text)
      const aiMsg: Message = {
        id: Date.now() + 1,
        role: 'ai',
        text: response.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isEmergency: response.isEmergency,
      }
      setIsTyping(false)
      setMessages(prev => [...prev, aiMsg])
    }, 1800)
  }

  const toggleVoice = () => {
    setIsListening(!isListening)
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInput('I have chest pain and shortness of breath')
      }, 3000)
    }
  }

  const hasEmergency = messages.some(m => m.isEmergency)

  return (
    <div style={{ display: 'flex', gap: '1.5rem', height: 'calc(100vh - 128px)', maxHeight: '800px' }}>
      {/* Chat History Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '280px', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            style={{
              background: 'var(--surface)', borderRadius: '20px',
              border: '1px solid var(--border)', overflow: 'hidden',
              flexShrink: 0
            }}
          >
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Chat History</span>
              <button onClick={() => setShowHistory(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={16} /></button>
            </div>
            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', height: 'calc(100% - 60px)' }}>
              {[
                { label: 'Chest Pain Assessment', time: '2h ago', badge: 'emergency' },
                { label: 'Fever & Body Aches', time: 'Yesterday', badge: 'moderate' },
                { label: 'Routine Checkup', time: '3 days ago', badge: 'low' },
                { label: 'Headache Analysis', time: '1 week ago', badge: 'moderate' },
              ].map((h, i) => (
                <div key={i} style={{
                  padding: '0.85rem', borderRadius: '12px', cursor: 'pointer',
                  border: '1px solid var(--border)', transition: 'background 0.2s'
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{h.label}</span>
                    <span className={`badge badge-${h.badge}`} style={{ fontSize: '0.65rem' }}>{h.badge}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--text-muted)' }}>
                    <Clock size={11} />
                    <span style={{ fontSize: '0.72rem' }}>{h.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--surface)', borderRadius: '20px', border: '1px solid var(--border)', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => setShowHistory(!showHistory)}
            style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
          >
            <Clock size={16} />
          </button>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #2563EB, #14B8A6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
          }}>
            <Bot size={22} color="white" />
            <div style={{ position: 'absolute', bottom: 1, right: 1, width: '10px', height: '10px', borderRadius: '50%', background: '#10B981', border: '2px solid var(--surface)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>MediAI Assistant</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 500 }}>● Online · AI-powered triage</div>
          </div>
          {hasEmergency && (
            <div className="emergency-banner" style={{ marginLeft: 'auto', padding: '0.5rem 1rem' }}>
              <AlertTriangle size={16} color="#EF4444" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626' }}>Emergency detected</span>
            </div>
          )}
          <button
            onClick={() => { setMessages(initialMessages); }}
            style={{ marginLeft: hasEmergency ? '0.5rem' : 'auto', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '10px', padding: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center' }}
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', gap: '0.75rem', flexDirection: msg.role === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end' }}
              >
                {/* Avatar */}
                <div style={{
                  width: '34px', height: '34px', borderRadius: '50%', flexShrink: 0,
                  background: msg.role === 'ai' ? 'linear-gradient(135deg, #2563EB, #14B8A6)' : 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {msg.role === 'ai' ? <Bot size={16} color="white" /> : <User size={16} color="white" />}
                </div>

                <div style={{ maxWidth: '70%', display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  {msg.isEmergency && (
                    <div className="emergency-banner" style={{ marginBottom: '0.5rem' }}>
                      <AlertTriangle size={16} color="#EF4444" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#DC2626' }}>⚠️ EMERGENCY — Call 911 immediately if symptoms are severe</span>
                    </div>
                  )}
                  <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}
                    style={{ padding: '0.85rem 1.1rem', fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                    {msg.text}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{msg.time}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #2563EB, #14B8A6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={16} color="white" />
              </div>
              <div className="chat-bubble-ai" style={{ padding: '0.75rem 1.1rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestions */}
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {suggestions.map(s => (
            <button
              key={s}
              onClick={() => sendMessage(s)}
              style={{
                background: 'var(--bg)', border: '1px solid var(--border)',
                borderRadius: '100px', padding: '0.3rem 0.85rem',
                fontSize: '0.78rem', cursor: 'pointer', color: 'var(--text-secondary)',
                fontWeight: 500, transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#2563EB'; e.currentTarget.style.color = '#2563EB' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', gap: '0.5rem', background: 'var(--bg)', borderRadius: '14px', padding: '0.65rem 1rem', border: '2px solid var(--border)', transition: 'border-color 0.2s', alignItems: 'center' }}
            onFocus={() => { }} >
            {isListening && (
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '20px' }}>
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="waveform-bar" style={{ width: '3px', height: '8px' }} />
                ))}
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder={isListening ? 'Listening...' : 'Describe your symptoms...'}
              style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', color: 'var(--text-primary)' }}
            />
          </div>
          <button
            onClick={toggleVoice}
            style={{
              width: '44px', height: '44px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: isListening ? '#EF4444' : 'var(--bg)',
              border: `2px solid ${isListening ? '#EF4444' : 'var(--border)'}`,
              color: isListening ? 'white' : 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            {isListening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
          <motion.button
            onClick={() => sendMessage(input)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={!input.trim() && !isTyping}
            style={{
              width: '44px', height: '44px', borderRadius: '12px', border: 'none', cursor: 'pointer',
              background: input.trim() ? 'linear-gradient(135deg, #2563EB, #1D4ED8)' : 'var(--border)',
              color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s'
            }}
          >
            <Send size={17} />
          </motion.button>
        </div>
      </div>
    </div>
  )
}
