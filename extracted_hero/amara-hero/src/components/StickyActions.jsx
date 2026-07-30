import { motion } from 'framer-motion'
import { PhoneCall, CalendarCheck2, MessageCircle } from 'lucide-react'

export default function StickyActions() {
  return (
    <>
      {/* Mobile sticky bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t p-3 backdrop-blur-lg md:hidden"
        style={{ background: 'rgba(6,13,23,0.9)', borderColor: 'rgba(245,247,250,0.1)' }}
      >
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold"
          style={{ background: 'var(--color-coral)', color: '#0b0b0b' }}
        >
          <CalendarCheck2 size={16} /> Book
        </button>
        <button
          className="flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold text-mist"
          style={{ borderColor: 'rgba(245,247,250,0.25)' }}
        >
          <PhoneCall size={16} /> Call
        </button>
      </div>

      {/* Desktop floating WhatsApp/chat button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring', stiffness: 200, damping: 16 }}
        className="fixed bottom-7 right-7 z-50 hidden h-14 w-14 items-center justify-center rounded-full shadow-lg md:flex"
        style={{ background: 'var(--color-teal)' }}
        aria-label="Chat with us"
      >
        <MessageCircle size={22} color="white" />
      </motion.button>
    </>
  )
}
