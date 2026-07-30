import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll window back to top on page transition
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
