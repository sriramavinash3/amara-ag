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

    let revealObserver;

    const observeElements = () => {
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

      if (!revealObserver) {
        revealObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
              }
            });
          },
          {
            threshold: MOTION_TOKENS.threshold,
            rootMargin: MOTION_TOKENS.rootMargin,
          }
        );
      }

      revealElements.forEach((el) => {
        // Reveal immediately if already intersecting or observe
        revealObserver.observe(el);
      });
    };

    observeElements();

    // Observe container mutations so dynamically added cards/elements get revealed
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(container, { childList: true, subtree: true });

    return () => {
      if (revealObserver) {
        revealObserver.disconnect();
      }
      mutationObserver.disconnect();
    };
  }, [containerRef]);
}
