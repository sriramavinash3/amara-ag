import { useEffect } from 'react';

const DEFAULT_TITLE = "Amara Pain | Advanced Interventional Pain Specialists";
const DEFAULT_DESC = "Charlotte's leading interventional specialists delivering advanced, evidence-based pain relief built around your body, your diagnostics, and your life outside of the clinic.";
const DEFAULT_IMAGE = "https://www.amarapain.com/images/og-image.png";
const DOMAIN = "https://www.amarapain.com";

export default function useSEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  url = DOMAIN,
  image = DEFAULT_IMAGE,
  type = 'website'
} = {}) {
  useEffect(() => {
    // 1. Document Title
    document.title = title;

    // Helper to safely set or create meta tags
    const setMeta = (attr, key, content) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Description
    setMeta('name', 'description', description);

    // 3. Canonical Link
    const fullUrl = url.startsWith('http') ? url : `${DOMAIN}${url.startsWith('/') ? url : `/${url}`}`;
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // 4. Open Graph Tags
    const fullImage = image.startsWith('http') ? image : `${DOMAIN}${image.startsWith('/') ? image : `/${image}`}`;
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', fullUrl);
    setMeta('property', 'og:image', fullImage);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:site_name', 'Amara Pain');

    // 5. Twitter Card Tags
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', fullImage);
  }, [title, description, url, image, type]);
}
