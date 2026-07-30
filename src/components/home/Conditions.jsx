import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, PersonStanding, Zap, Bone, Footprints,
  Dumbbell, Waves, ShieldAlert, HeartPulse, Stethoscope, Plus, ChevronRight
} from 'lucide-react';
import { conditions } from '../../utils/medicalData';

const iconMap = {
  'back-pain': Activity,
  'neck-pain': PersonStanding,
  'sciatica': Zap,
  'joint-pain': Bone,
  'knee-pain': Footprints,
  'shoulder-pain': Dumbbell,
  'neuropathic-pain': Waves,
  'sports-injuries': HeartPulse,
  'arthritis': ShieldAlert,
  'post-surgical-pain': Stethoscope
};

function ConditionCard({ c, index }) {
  const [open, setOpen] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const Icon = iconMap[c.id] || Activity;

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 10 });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 45, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.65, delay: (index % 5) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        background: 'linear-gradient(155deg, rgba(245,247,250,0.09), rgba(245,247,250,0.03))',
        borderColor: 'rgba(245,247,250,0.12)',
      }}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl border p-6 text-left backdrop-blur-xl transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(27,170,156,0.18)]"
    >
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(120px 120px at var(--mx,50%) var(--my,0%), rgba(79,164,224,0.18), transparent 70%)',
          transition: 'opacity 0.3s',
        }}
      />
      
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl shrink-0"
        style={{ background: 'linear-gradient(135deg, var(--color-blue), var(--color-teal))' }}
      >
        <Icon size={20} color="white" strokeWidth={2} />
      </div>

      <h3 className="font-display text-lg text-mist font-semibold mb-2">{c.title}</h3>

      <motion.p
        className="text-sm leading-relaxed text-mist/65"
      >
        {c.shortDesc}
      </motion.p>

      {/* Expanded Actions */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-3 pt-3 border-t border-white/5 w-full space-y-3"
          >
            <div className="text-xs text-mist/50">
              <strong className="text-teal font-semibold block mb-1">Common Symptoms:</strong>
              <ul className="list-disc list-inside space-y-1">
                {c.symptoms?.slice(0, 3).map((sym, idx) => (
                  <li key={idx} className="truncate">{sym}</li>
                ))}
              </ul>
            </div>
            
            <Link 
              to={`/conditions/${c.id}`} 
              className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 pt-1 cursor-pointer"
            >
              <span>Explore Relief Guide</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wide cursor-pointer border-none bg-transparent"
        style={{ color: 'var(--color-teal)' }}
      >
        <Plus size={13} className={`transition-transform duration-300 ${open ? 'rotate-45' : ''}`} />
        {open ? 'Collapse Info' : 'Quick Preview'}
      </button>
    </motion.div>
  );
}

export default function Conditions() {
  const condList = Object.values(conditions);

  return (
    <section className="relative px-6 py-32 md:px-16" id="conditions">
      <div className="relative z-10 mx-auto max-w-[1400px] md:pr-[30%]">
        <div className="mb-14 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue-light)' }}>
            Conditions We Treat
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl font-bold leading-tight">
            Whatever the source of your pain, we've likely already treated it.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {condList.map((c, i) => (
            <ConditionCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
