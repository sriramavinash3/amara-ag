import { useEffect } from 'react';

export const MOTION_TOKENS = {
  duration: '1.2s',
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px',
  translateDistance: '60px',
  scaleOffset: '0.96',
};

export default function useScrollReveal(containerRef) {
  useEffect(() => {
    // Respect prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = containerRef?.current;
    if (!container) return;

    const revealElements = container.querySelectorAll('.animate-reveal, .animate-reveal-3d');

    if (prefersReducedMotion) {
      // Force all elements to reveal immediately without transition styles
      revealElements.forEach((el) => {
        el.classList.add('revealed');
        el.style.transition = 'none';
        el.style.transform = 'none';
        el.style.opacity = '1';
      });
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          } else {
            entry.target.classList.remove('revealed');
          }
        });
      },
      {
        threshold: MOTION_TOKENS.threshold,
        rootMargin: MOTION_TOKENS.rootMargin,
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, [containerRef]);
}
