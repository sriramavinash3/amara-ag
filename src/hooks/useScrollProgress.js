import { useEffect } from 'react';

/**
 * A highly performant scroll progress tracker that sets the vertical scroll offset
 * as a CSS custom property `--scroll-y` (with px unit) on the document root,
 * body, and container element.
 * Respects accessibility prefers-reduced-motion checks.
 */
export default function useScrollProgress(containerRef) {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--scroll-y', '0px');
      document.body.style.setProperty('--scroll-y', '0px');
      if (containerRef?.current) {
        containerRef.current.style.setProperty('--scroll-y', '0px');
      }
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Robust multi-browser scroll calculation
          const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          
          document.documentElement.style.setProperty('--scroll-y', `${scrolled}px`);
          document.body.style.setProperty('--scroll-y', `${scrolled}px`);
          if (containerRef?.current) {
            containerRef.current.style.setProperty('--scroll-y', `${scrolled}px`);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Trigger initial calculation
    const initialScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    document.documentElement.style.setProperty('--scroll-y', `${initialScroll}px`);
    document.body.style.setProperty('--scroll-y', `${initialScroll}px`);
    if (containerRef?.current) {
      containerRef.current.style.setProperty('--scroll-y', `${initialScroll}px`);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);
}
