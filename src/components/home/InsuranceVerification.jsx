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
    <section className="bg-stone-50 px-6 py-20 md:px-16 border-y border-stone-200/60" id="insurance">
      <div className="mx-auto grid max-w-[1400px] gap-14 md:grid-cols-2 text-left">
        <div className="relative z-10">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-emerald-800 font-bold">
            Insurance Verification
          </p>
          <h2 className="font-heading text-4xl text-stone-900 md:text-5xl font-bold leading-tight">
            Know Your Coverage Before You Walk In
          </h2>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-sm">
            <div>
              <label htmlFor="ins-name" className="sr-only">Full Name</label>
              <input
                id="ins-name"
                required
                type="text"
                placeholder="Full name"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 border-stone-300 transition-all shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="ins-provider" className="sr-only">Insurance Provider</label>
              <input
                id="ins-provider"
                required
                type="text"
                placeholder="Insurance provider"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 border-stone-300 transition-all shadow-sm"
              />
            </div>
            <div>
              <label htmlFor="ins-member-id" className="sr-only">Member ID</label>
              <input
                id="ins-member-id"
                required
                type="text"
                placeholder="Member ID"
                className="w-full rounded-xl border bg-white px-4 py-3 text-sm text-stone-850 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-emerald-600 border-stone-300 transition-all shadow-sm"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white cursor-pointer border-none shadow-md transition-all hover:bg-emerald-700 bg-emerald-600"
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
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-stone-500 font-bold">Common billing questions</p>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="border-b border-stone-200">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full py-4 text-left text-sm font-bold text-stone-800 hover:text-emerald-750 bg-transparent border-none cursor-pointer flex justify-between items-center transition-colors"
                >
                  <span>{f.q}</span>
                  <span className="text-stone-400 font-semibold">{openFaq === i ? '−' : '+'}</span>
                </button>
                <motion.p
                  initial={false}
                  animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                  className="overflow-hidden text-sm text-stone-600"
                >
                  <span className="block pb-4 leading-relaxed font-normal">{f.a}</span>
                </motion.p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
