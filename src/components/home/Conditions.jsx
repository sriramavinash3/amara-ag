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
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      initial={{ opacity: 0, y: 25, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      className="group relative flex flex-col items-start overflow-hidden rounded-2xl border border-stone-200/80 bg-white p-6 text-left shadow-premium transition-all duration-300 hover:shadow-premium-hover hover:border-emerald-600/20"
    >
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(120px 120px at var(--mx,50%) var(--my,0%), rgba(16,185,129,0.06), transparent 70%)',
          transition: 'opacity 0.3s',
        }}
      />
      
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl shrink-0 bg-emerald-50 text-emerald-650 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-inner"
      >
        <Icon size={20} className="stroke-[2.2]" />
      </div>

      <h3 className="font-heading text-lg text-stone-900 font-bold mb-2 group-hover:text-emerald-700 transition-colors">{c.title}</h3>

      <motion.p
        className="text-sm leading-relaxed text-stone-600"
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
            className="overflow-hidden mt-3 pt-3 border-t border-stone-150 w-full space-y-3"
          >
            <div className="text-xs text-stone-500">
              <strong className="text-emerald-800 font-bold block mb-1">Common Symptoms:</strong>
              <ul className="list-disc list-inside space-y-1">
                {c.symptoms?.slice(0, 3).map((sym, idx) => (
                  <li key={idx} className="truncate">{sym}</li>
                ))}
              </ul>
            </div>
            
            <Link 
              to={`/conditions/${c.id}`} 
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 pt-1 cursor-pointer"
            >
              <span>Explore Relief Guide</span>
              <ChevronRight size={14} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer border-none bg-transparent text-emerald-600 hover:text-emerald-700"
      >
        <Plus size={13} className={`transition-transform duration-300 ${open ? 'rotate-45 text-emerald-700' : ''}`} />
        {open ? 'Collapse Info' : 'Quick Preview'}
      </button>
    </motion.div>
  );
}

export default function Conditions() {
  const condList = Object.values(conditions);

  return (
    <section className="relative px-6 py-20 md:px-16" id="conditions">
      <div className="relative z-10 mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-2xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Conditions We Treat
          </p>
          <h2 className="font-heading text-4xl text-stone-900 md:text-5xl font-bold leading-tight">
            Comprehensive Treatment for Complex Spine &amp; Joint Pain
          </h2>
          <p className="text-sm md:text-base text-stone-500 font-medium leading-relaxed max-w-xl mt-3">
            Whether your pain is chronic, post-surgical, or caused by joint wear, we prioritize pinpointing the biological source of your pain.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {condList.map((c, i) => (
            <ConditionCard key={c.id} c={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
