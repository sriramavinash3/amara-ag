import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Loader2, CheckCircle2 } from 'lucide-react';

const faqs = [
  { q: 'Do you accept Medicare and Medicaid?', a: 'Yes, we accept both Medicare and Medicaid alongside most major private commercial insurers.' },
  { q: 'What if my plan requires a referral?', a: 'Our front-office team can coordinate directly with your primary care provider to secure any necessary documentation.' },
  { q: 'How quickly can coverage be confirmed?', a: 'Most commercial benefits and prior authorizations are confirmed within one business day.' },
];

export default function InsuranceVerification() {
  const [status, setStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => setStatus('done'), 1400);
  };

  return (
    <section className="bg-ink-2 px-6 py-28 md:px-16" id="insurance">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 text-left">
        <div className="relative z-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--color-teal)' }}>
            Insurance Verification
          </p>
          <h2 className="font-display text-4xl text-mist md:text-5xl font-bold leading-tight">
            Know your coverage before you walk in.
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-sm">
            <input
              required
              type="text"
              placeholder="Full name"
              className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-mist placeholder:text-mist/35 focus:outline-none focus:ring-1 focus:ring-cyan-500 border-white/10"
            />
            <input
              required
              type="text"
              placeholder="Insurance provider"
              className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-mist placeholder:text-mist/35 focus:outline-none focus:ring-1 focus:ring-cyan-500 border-white/10"
            />
            <input
              required
              type="text"
              placeholder="Member ID"
              className="w-full rounded-lg border bg-transparent px-4 py-3 text-sm text-mist placeholder:text-mist/35 focus:outline-none focus:ring-1 focus:ring-cyan-500 border-white/10"
            />

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white cursor-pointer border-none shadow-md transition-all hover:brightness-110"
              style={{ background: 'var(--color-blue)' }}
            >
              {status === 'loading' && <Loader2 size={16} className="animate-spin" />}
              {status === 'done' ? (
                <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} /> Verification request sent</span>
              ) : status === 'loading' ? 'Verifying plan…' : (
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} /> Pre-Verify My Insurance</span>
              )}
            </button>
          </form>
        </div>

        <div className="relative z-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-mist/40 font-semibold">Common billing questions</p>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b" style={{ borderColor: 'rgba(245,247,250,0.1)' }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-4 text-left text-sm font-semibold text-mist bg-transparent border-none cursor-pointer flex justify-between items-center"
                >
                  <span>{f.q}</span>
                  <span className="text-mist/30">{openFaq === i ? '−' : '+'}</span>
                </button>
                <motion.p
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden text-sm text-mist/55"
                >
                  <span className="block pb-4 leading-relaxed font-light">{f.a}</span>
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
