import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ChevronLeft, ChevronRight, Quote, X } from 'lucide-react';

const videoStories = [
  { name: 'Sacroiliac Relief Story', condition: 'SI Joint Dysfunction', embedId: 'nMBF_8eDTFo', quote: 'I was unable to sit or stand for more than 10 minutes. The injection gave me immediate and lasting relief.' },
  { name: 'Lower Back & Sciatica', condition: 'Sciatica Nerve Pain', embedId: 'TKW6w1Y_IYQ', quote: 'The pain down my leg is gone. I can finally return to daily walking and gardening.' },
  { name: 'Targeted Muscle Release', condition: 'Myofascial Trigger Points', embedId: '4_vkimyqdR8', quote: 'Trigger point treatments resolved my muscle knots. I feel lighter, and my flexibility is back.' },
];

const writtenReviews = [
  { 
    name: 'Faithful Watson', 
    rating: 5, 
    text: "Dr. Amara is very knowledgeable and informative! From the new patient standpoint to now a regular patient, he's been nothing short of amazing. He takes the time to LISTEN to his patients." 
  },
  { 
    name: 'Patricia Robinson', 
    rating: 5, 
    text: "Dr. Amara has made my experience with him a very pleasant one. He listens to me and understands what I’m going through. His staff is very professional and supportive." 
  },
  { 
    name: 'Joseph Tillman', 
    rating: 5, 
    text: "Dr. Amara is a good doctor who listens to all your concerns and understands them to the fullest. He's very professional and takes care of all his clients with his procedures." 
  },
  { 
    name: 'Telphine Williams', 
    rating: 5, 
    text: "The doctor is very informative and listens to the patients concerns. The staff is very professional and friendly at the same time. I would definitely refer Dr. Amara to anyone." 
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [modalVideoId, setModalVideoId] = useState(null);

  return (
    <section className="bg-mist px-6 py-28 md:px-16" id="testimonials">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-14 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-blue)' }}>
            Patient Success Stories
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-text-dark leading-tight">
            Real patients, real relief.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {videoStories.map((s, i) => (
            <motion.button
              key={s.name}
              onClick={() => {
                setActiveTab(i);
                setModalVideoId(s.embedId);
              }}
              initial={{ 
                opacity: 0, 
                x: i === 0 ? -120 : i === 2 ? 120 : 0, 
                y: i === 1 ? 70 : 40,
                rotate: i === 0 ? -4 : i === 2 ? 4 : 0,
                scale: 0.88 
              }}
              whileInView={{ opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ 
                type: 'spring', 
                stiffness: 85, 
                damping: 10.5, 
                mass: 0.9,
                delay: i * 0.15 
              }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl text-left cursor-pointer border-none shadow-md"
              style={{ background: 'linear-gradient(155deg, var(--color-blue), var(--color-ink-2))' }}
            >
              <img
                src={`https://img.youtube.com/vi/${s.embedId}/hqdefault.jpg`}
                alt={s.name}
                className="absolute inset-0 w-full h-full object-cover opacity-45 group-hover:opacity-65 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.08), transparent 70%)' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-inner">
                  <Play size={20} color="white" fill="white" />
                </span>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="font-display text-lg text-white font-bold">{s.name}</p>
                <p className="text-xs text-white/70">{s.condition}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Selected Quote Indicator */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-10 max-w-2xl text-center font-display text-2xl italic font-medium"
            style={{ color: 'var(--color-text-dark)' }}
          >
            <Quote size={22} className="mx-auto mb-3 opacity-30" />
            "{videoStories[activeTab].quote}"
          </motion.blockquote>
        </AnimatePresence>

        {/* Written reviews carousel */}
        <div className="mt-20 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] font-bold text-left" style={{ color: 'var(--color-blue)' }}>
            Google Reviews · 4.9 Star average
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setReviewIndex((i) => (i - 1 + writtenReviews.length) % writtenReviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer hover:bg-black/5"
              style={{ borderColor: 'rgba(10,93,155,0.25)' }}
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setReviewIndex((i) => (i + 1) % writtenReviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer hover:bg-black/5"
              style={{ borderColor: 'rgba(10,93,155,0.25)' }}
              aria-label="Next review"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Written Review Cards viewport */}
        <div className="mt-6 overflow-hidden w-full text-left">
          <motion.div
            className="flex gap-5"
            animate={{ x: `-${reviewIndex * (100 / writtenReviews.length)}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: `${writtenReviews.length * 100}%` }}
          >
            {writtenReviews.map((r) => (
              <div
                key={r.name}
                className="rounded-xl border bg-white/60 p-5 backdrop-blur shadow-sm shrink-0"
                style={{ width: `${100 / writtenReviews.length}%`, borderColor: 'rgba(10,93,155,0.1)' }}
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={13} fill="var(--color-coral)" color="var(--color-coral)" />
                  ))}
                </div>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'rgba(27,27,27,0.75)' }}>"{r.text}"</p>
                <p className="mt-3 text-xs font-semibold" style={{ color: 'var(--color-text-dark)' }}>{r.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal Overlay */}
      <AnimatePresence>
        {modalVideoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setModalVideoId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/40 hover:bg-black/80 text-white rounded-full transition-colors cursor-pointer border-none"
              >
                <X size={20} />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1`}
                title="Patient Recovery Story"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
