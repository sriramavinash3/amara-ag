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
    text: "Amara is very knowledgeable and informative! From the new patient standpoint to now a regular patient, he's been nothing short of amazing. He takes the time to LISTEN to his patients." 
  },
  { 
    name: 'Patricia Robinson', 
    rating: 5, 
    text: "Amara has made my experience with him a very pleasant one. He listens to me and understands what I’m going through. His staff is very professional and supportive." 
  },
  { 
    name: 'Joseph Tillman', 
    rating: 5, 
    text: "Amara is a good doctor who listens to all your concerns and understands them to the fullest. He's very professional and takes care of all his clients with his procedures." 
  },
  { 
    name: 'Telphine Williams', 
    rating: 5, 
    text: "The doctor is very informative and listens to the patients concerns. The staff is very professional and friendly at the same time. I would definitely refer Amara to anyone." 
  }
];

export default function Testimonials() {
  const [activeTab, setActiveTab] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [modalVideoId, setModalVideoId] = useState(null);

  return (
    <section className="bg-[#3A3838] py-12 md:py-16 m-0 border-t border-[#585454]" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="mb-8 max-w-xl text-left">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
            Real patients, real relief.
          </p>
          <h2 className="font-display text-[32px] sm:text-[38px] md:text-[46px] font-bold text-[#FFFFFF] leading-tight">
            Patient Reviews &amp; Experiences
          </h2>
        </div>

        {/* Video Stories Grid — Constrained to max-w-5xl (~20% display reduction) with balanced whitespace */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {videoStories.map((s, i) => (
              <motion.button
                key={s.name}
                onClick={() => {
                  setActiveTab(i);
                  setModalVideoId(s.embedId);
                }}
                initial={{ 
                  opacity: 0, 
                  x: i === 0 ? -40 : i === 2 ? 40 : 0, 
                  y: 20,
                  scale: 0.95 
                }}
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 85, 
                  damping: 11, 
                  mass: 0.9,
                  delay: i * 0.12 
                }}
                whileHover={{ scale: 1.02 }}
                className="group relative aspect-[16/11] overflow-hidden rounded-2xl text-left cursor-pointer border border-[#585454] shadow-md bg-[#454242] w-full"
              >
                <img
                  src={`https://img.youtube.com/vi/${s.embedId}/hqdefault.jpg`}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#323030]/95 via-[#323030]/40 to-transparent" />
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(255,255,255,0.05), transparent 70%)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600/90 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 shadow-md">
                    <Play size={18} className="fill-current" />
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 z-20">
                  <p className="font-heading text-base sm:text-lg text-[#FFFFFF] font-extrabold leading-tight">{s.name}</p>
                  <p className="text-xs text-[#D1D5DB] font-semibold mt-0.5">{s.condition}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Selected Quote Indicator */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
            className="mx-auto mt-9 max-w-2xl text-center font-heading text-lg sm:text-xl italic font-medium text-[#FFFFFF]"
          >
            <Quote size={20} className="mx-auto mb-2.5 text-emerald-400 opacity-80" />
            "{videoStories[activeTab].quote}"
          </motion.blockquote>
        </AnimatePresence>

        {/* Written reviews carousel */}
        <div className="mt-12 flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] font-bold text-left text-emerald-400">
            Google Reviews · 4.9 Star average
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setReviewIndex((i) => (i - 1 + writtenReviews.length) % writtenReviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer hover:bg-[#514E4E] text-emerald-300 border-[#585454] bg-[#454242]"
              aria-label="Previous review"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => setReviewIndex((i) => (i + 1) % writtenReviews.length)}
              className="flex h-9 w-9 items-center justify-center rounded-full border cursor-pointer hover:bg-[#514E4E] text-emerald-300 border-[#585454] bg-[#454242]"
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
                className="rounded-2xl border border-[#585454] bg-[#454242] p-6 shadow-lg hover:border-emerald-500/50 transition-all duration-300 shrink-0"
                style={{ width: `${100 / writtenReviews.length}%` }}
              >
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={15} fill="#eab308" color="#eab308" />
                  ))}
                </div>
                <p className="text-sm font-normal leading-relaxed text-[#F0F0F0]">"{r.text}"</p>
                <p className="mt-3 text-xs font-bold text-[#FFFFFF]">{r.name}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Video Modal Overlay — ~20% reduced display size from max-w-3xl to max-w-2xl */}
      <AnimatePresence>
        {modalVideoId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#3A3838]/85 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative w-full max-w-2xl aspect-video bg-[#323030] border border-[#585454] rounded-2xl overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setModalVideoId(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-[#323030]/80 hover:bg-[#323030] text-[#FFFFFF] rounded-full transition-colors cursor-pointer border border-[#585454]"
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
