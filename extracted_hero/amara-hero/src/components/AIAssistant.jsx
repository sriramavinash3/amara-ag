import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Bot } from 'lucide-react'

const script = [
  { from: 'user', text: 'I have sharp pain down my left leg when I sit too long.' },
  { from: 'ai', text: 'That pattern is common with sciatica. I can walk you through what usually helps, and suggest the right specialist to see.' },
  { from: 'user', text: 'Do you take Blue Cross?' },
  { from: 'ai', text: "Yes — Amara Pain & Spine is in-network with Blue Cross Blue Shield. I can check your specific plan's coverage now." },
]

function useTypedScript(active) {
  const [visible, setVisible] = useState(0)
  useEffect(() => {
    if (!active) return
    setVisible(0)
    const id = setInterval(() => {
      setVisible((v) => (v < script.length ? v + 1 : v))
    }, 1500)
    return () => clearInterval(id)
  }, [active])
  return visible
}

export default function AIAssistant() {
  const [active, setActive] = useState(false)
  const visible = useTypedScript(active)

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="ai-assistant">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 md:items-center">
        <div>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            AI-Assisted Guidance
          </p>
          <h2 className="font-display text-4xl md:text-5xl" style={{ color: 'var(--color-text-dark)' }}>
            Answers before your first appointment.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: 'rgba(27,27,27,0.65)' }}>
            Our symptom and FAQ assistant helps you understand what might be
            going on, checks insurance coverage, and points you toward the
            right specialist — available any time, day or night.
          </p>

          <ul className="mt-6 space-y-2 text-sm" style={{ color: 'rgba(27,27,27,0.6)' }}>
            <li>· Symptom guidance &amp; educational recommendations</li>
            <li>· Insurance, clinic, and treatment FAQs</li>
            <li>· Appointment suggestions matched to your case</li>
          </ul>

          <button
            onClick={() => setActive(true)}
            className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white"
            style={{ background: 'var(--color-blue)' }}
          >
            <Sparkles size={16} />
            {active ? 'Replay demo' : 'See it in action'}
          </button>
        </div>

        <div
          className="rounded-2xl border p-5 shadow-xl"
          style={{ borderColor: 'rgba(10,93,155,0.12)', background: 'white' }}
        >
          <div className="mb-4 flex items-center gap-2 border-b pb-4" style={{ borderColor: 'rgba(10,93,155,0.08)' }}>
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
            >
              <Bot size={15} color="white" />
            </span>
            <div>
              <p className="text-sm font-semibold" style={{ color: 'var(--color-text-dark)' }}>Amara Assistant</p>
              <p className="text-[11px] text-emerald-600">Online</p>
            </div>
          </div>

          <div className="flex min-h-[260px] flex-col gap-3">
            <AnimatePresence>
              {script.slice(0, visible).map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${m.from === 'user' ? 'self-end text-white' : 'self-start'}`}
                  style={{
                    background: m.from === 'user' ? 'var(--color-blue)' : 'var(--color-mist)',
                    color: m.from === 'user' ? 'white' : 'var(--color-text-dark)',
                  }}
                >
                  {m.text}
                </motion.div>
              ))}
            </AnimatePresence>
            {!active && (
              <div className="flex flex-1 items-center justify-center text-sm text-mist-fallback" style={{ color: 'rgba(27,27,27,0.35)' }}>
                Click "See it in action" to preview a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
