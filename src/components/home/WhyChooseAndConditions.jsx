import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, HeartHandshake, FlaskConical, Users, ShieldCheck, Compass, ChevronRight } from 'lucide-react';

const pillars = [
  { icon: Award, title: 'Interventional Specialists', copy: 'Physician training in anesthesiology and interventional pain medicine.' },
  { icon: HeartHandshake, title: 'Focused Clinical Evaluation', copy: 'We review your diagnostic imaging and medical history to evaluate what is causing your pain.' },
  { icon: FlaskConical, title: 'Image-Guided Precision', copy: 'All procedures use fluoroscopy (real-time X-ray) or ultrasound guidance to verify target anatomy.' },
  { icon: Users, title: 'Transparent In-Office Billing', copy: 'As an independent practice, we charge transparent office fees with zero hospital facility charges.' },
  { icon: ShieldCheck, title: 'Targeted Non-Surgical Care', copy: 'We provide outpatient procedures including epidural injections, nerve blocks, and neuromodulation.' },
  { icon: Compass, title: 'Prompt Scheduling', copy: 'Offering same-week consultations, prior authorization coordination, and direct communication with referring physicians.' },
];

const conditionCards = [
  {
    image: '/images/conditions/back-pain.jpg',
    alt: 'Back pain and Leg pain anatomy with highlighted lumbar spine',
    title: 'Back pain and Leg pain',
    summary: 'Arthritis of the Lumbar Spine, Degenerative Disc Disease, Failed Back Surgery / Pain After Surgery..',
    conditions: ['Arthritis of the Lumbar Spine', 'Degenerative Disc Disease', 'Failed Back Surgery / Post-Surgical Pain'],
    linkTo: '/conditions/back-pain',
  },
  {
    image: '/images/conditions/neck-pain.jpg',
    alt: 'Neck pain and Arm pain cervical spine anatomy and muscle illustration',
    title: 'Neck pain and Arm pain',
    summary: 'Arthritis of the Cervical Spine, Cervical Spinal Stenosis, Herniated Discs, Neck Pain, Whiplash',
    conditions: ['Arthritis of the Cervical Spine', 'Cervical Spinal Stenosis', 'Herniated Discs', 'Whiplash Injuries'],
    linkTo: '/conditions/neck-pain',
  },
  {
    image: '/images/conditions/knee-pain.jpg',
    alt: 'Knee pain and Leg pain joint illustration',
    title: 'Knee pain and Leg pain',
    summary: 'Hip Pain, Piriformis Syndrome, Knee Osteoarthritis, Sports injuries',
    conditions: ['Hip & Joint Pain', 'Piriformis Syndrome', 'Knee Osteoarthritis', 'Sports & Overuse Injuries'],
    linkTo: '/conditions/knee-pain',
  },
  {
    image: '/images/conditions/shoulder-pain.jpg',
    alt: 'Shoulder pain and Abdomen pain joint illustration',
    title: 'Shoulder pain, Abdomen pain',
    summary: 'Frozen shoulder, Rotator cuff tear, Work related injuries, Abdominal Pain, Chronic Pelvic Pain, Pudendal Neuralgia',
    conditions: ['Frozen Shoulder & Rotator Cuff Tear', 'Work-Related Injuries', 'Abdominal & Pelvic Pain', 'Pudendal Neuralgia'],
    linkTo: '/conditions/shoulder-pain',
  },
  {
    image: '/images/conditions/neuropathic-pain.jpg',
    alt: 'Arm pain, Nerve pain and Pelvic pain neuropathy illustration',
    title: 'Arm pain, Nerve pain, Pelvic pain',
    summary: 'Cervical radiculopathy, Facial Pain, Ilioinguinal Nerve, Meralgia Paresthetica, Pelvic Pain…',
    conditions: ['Cervical Radiculopathy', 'Facial & Cranial Pain', 'Ilioinguinal Nerve & Meralgia Paresthetica', 'Neuropathic Pain Pathways'],
    linkTo: '/conditions/neuropathic-pain',
  },
];

function PillarCard({ p, index }) {
  const Icon = p.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border-l-2 pl-6 transition-all duration-200"
      style={{ borderColor: '#585454' }}
    >
      <div className="inline-block">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-950/70 text-emerald-300 shadow-sm border border-emerald-500/40">
          <Icon size={22} strokeWidth={2} />
        </div>
      </div>
      <h3 className="mt-4 font-heading text-[18px] font-bold text-[#FFFFFF]">{p.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#F0F0F0] font-normal">{p.copy}</p>
    </motion.div>
  );
}

function ConditionCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#585454] bg-[#454242] shadow-lg transition-all duration-300 hover:shadow-xl hover:border-emerald-500/50 hover:-translate-y-1"
    >
      {/* Prominent Condition Image */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#323030] border-b border-[#585454] flex items-center justify-center">
        <img
          src={card.image}
          alt={card.alt}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>

      <div className="p-6 flex flex-col flex-1 justify-between text-center">
        <div>
          <h3 className="font-heading text-lg font-bold text-[#FFFFFF] group-hover:text-emerald-300 transition-colors">
            {card.title}
          </h3>
          <p className="mt-2 text-xs md:text-sm text-[#F0F0F0] font-medium leading-relaxed">
            {card.summary}
          </p>
          <ul className="mt-4 mb-6 space-y-1.5 text-left bg-[#363434] p-3.5 rounded-xl border border-[#585454]">
            {card.conditions.map((c) => (
              <li key={c} className="flex items-center gap-2 text-xs font-semibold text-[#F0F0F0]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to={card.linkTo}
          className="inline-flex items-center justify-center gap-1.5 text-sm font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 hover:bg-emerald-600 hover:text-white py-2.5 px-4 rounded-full transition-all duration-300 group-hover:shadow-sm"
        >
          <span>Learn More</span>
          <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function WhyChooseAndConditions() {
  return (
    <>
      {/* ── Why Choose Amara ── */}
      <section className="bg-[#3A3838] py-12 md:py-16 m-0 border-t border-[#585454]" id="why-amara">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-10 max-w-2xl text-left">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
              Why Choose Amara
            </p>
            <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[46px] font-bold text-[#FFFFFF] leading-tight">
              Clinical Care at Amara Pain &amp; Spine
            </h2>
            <p className="text-sm md:text-base text-[#F0F0F0] font-normal leading-relaxed mt-3">
              Independent interventional care with transparent office visit billing and zero hospital facility charges.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 text-left">
            {pillars.map((p, i) => (
              <PillarCard key={p.title} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Conditions We Treat ── */}
      <section className="relative py-12 md:py-16 bg-[#363434] border-t border-[#585454] m-0" id="conditions">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="mb-10 max-w-2xl text-left">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-400 font-bold">
              Conditions We Treat
            </p>
            <h2 className="font-heading text-[32px] sm:text-[38px] md:text-[46px] font-bold text-[#FFFFFF] leading-tight">
              Conditions We Treat
            </h2>
            <p className="text-sm md:text-base text-[#F0F0F0] font-normal leading-relaxed max-w-xl mt-3">
              We evaluate chronic spine, nerve, and joint pain to recommend appropriate non-surgical treatment options.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {conditionCards.map((card, i) => (
              <ConditionCard key={card.title} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
