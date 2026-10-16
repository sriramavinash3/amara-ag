/**
 * Validates and sanitizes a URL to prevent XSS vulnerabilities.
 * Blocks dangerous schemes such as javascript:, data:, vbscript:, and file:.
 */
export function sanitizeUrl(rawUrl) {
  if (typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  // Disallow unsafe control characters
  for (let i = 0; i < trimmed.length; i++) {
    const code = trimmed.charCodeAt(i);
    if ((code >= 0 && code <= 31) || (code >= 127 && code <= 159)) return null;
  }
  // Disallow unsafe schemes
  if (/^(javascript|data|vbscript|file):/i.test(trimmed)) return null;

  // Allow root-relative paths starting with / or anchor hashes #
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) {
    return trimmed;
  }

  // Allow valid HTTP/HTTPS/mailto/tel URLs
  try {
    const parsed = new URL(trimmed, 'https://www.amarapain.com');
    if (['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Parses HTML attributes string like href="..." target="..." into a key-value map.
 */
export function parseHtmlAttributes(attrString) {
  const attrs = {};
  if (!attrString) return attrs;

  const attrRegex = /([a-zA-Z0-9_-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = attrRegex.exec(attrString)) !== null) {
    const key = match[1].toLowerCase();
    // Do NOT allow event handlers like onclick, onerror, onload, etc.
    if (key.startsWith('on')) continue;
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs[key] = value;
  }
  return attrs;
}

/**
 * Tokenizes paragraph text into structured items:
 * - { type: 'text', value: string }
 * - { type: 'link', text: string, href: string, isExternal: boolean, target?: string, rel?: string, title?: string }
 */
export function tokenizeInlineContent(text) {
  if (!text) return [];

  // Group 1: HTML tag attributes, Group 2: HTML link text
  // Group 3: Markdown link text, Group 4: Markdown URL, Group 5: Markdown title
  // Group 6: Bare URL
  const combinedRegex = /<a\s+([^>]*?)>([\s\S]*?)<\/a>|\[([^\]]+)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)|(https?:\/\/[^\s<)]+)/gi;

  const tokens = [];
  let lastIndex = 0;
  let match;

  while ((match = combinedRegex.exec(text)) !== null) {
    const matchIndex = match.index;

    // Push preceding text if any
    if (matchIndex > lastIndex) {
      tokens.push({
        type: 'text',
        value: text.slice(lastIndex, matchIndex)
      });
    }

    if (match[1] !== undefined) {
      // HTML <a ...>...</a>
      const rawAttrs = match[1];
      const linkText = match[2].replace(/<[^>]*>/g, '');
      const parsedAttrs = parseHtmlAttributes(rawAttrs);
      const safeHref = sanitizeUrl(parsedAttrs.href);

      if (safeHref) {
        const isExternal = /^https?:\/\//i.test(safeHref);
        tokens.push({
          type: 'link',
          text: linkText,
          href: safeHref,
          isExternal,
          target: parsedAttrs.target || (isExternal ? '_blank' : undefined),
          rel: parsedAttrs.target === '_blank' || isExternal ? 'noopener noreferrer' : (parsedAttrs.rel || undefined),
          title: parsedAttrs.title
        });
      } else {
        tokens.push({
          type: 'text',
          value: linkText
        });
      }
    } else if (match[3] !== undefined) {
      // Markdown [text](url "title")
      const linkText = match[3];
      const rawHref = match[4];
      const linkTitle = match[5];
      const safeHref = sanitizeUrl(rawHref);

      if (safeHref) {
        const isExternal = /^https?:\/\//i.test(safeHref);
        tokens.push({
          type: 'link',
          text: linkText,
          href: safeHref,
          isExternal,
          target: isExternal ? '_blank' : undefined,
          rel: isExternal ? 'noopener noreferrer' : undefined,
          title: linkTitle
        });
      } else {
        tokens.push({
          type: 'text',
          value: linkText
        });
      }
    } else if (match[6] !== undefined) {
      // Bare URL
      const rawUrl = match[6];
      const safeHref = sanitizeUrl(rawUrl);

      if (safeHref) {
        tokens.push({
          type: 'link',
          text: rawUrl,
          href: safeHref,
          isExternal: true,
          target: '_blank',
          rel: 'noopener noreferrer'
        });
      } else {
        tokens.push({
          type: 'text',
          value: rawUrl
        });
      }
    }

    lastIndex = combinedRegex.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    tokens.push({
      type: 'text',
      value: text.slice(lastIndex)
    });
  }

  return tokens;
}
