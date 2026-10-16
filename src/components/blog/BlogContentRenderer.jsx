import React from 'react';
import { tokenizeInlineContent } from '../../utils/contentRenderer.js';

/**
 * BlogContentRenderer
 * Renders blog content with clickable hyperlinks, paragraph preservation, and XSS sanitization.
 * Works seamlessly across desktop, tablet, and mobile.
 */
export default function BlogContentRenderer({
  content = '',
  theme = 'dark',
  className = ''
}) {
  if (!content) return null;

  const linkClass = theme === 'light'
    ? 'text-[#0369a1] hover:text-[#075985] underline underline-offset-2 font-semibold transition-colors break-words cursor-pointer'
    : 'text-emerald-400 hover:text-emerald-300 underline underline-offset-4 decoration-emerald-500/60 hover:decoration-emerald-400 font-semibold transition-colors duration-150 break-words cursor-pointer';

  // Split into paragraphs by two or more newlines to preserve natural spacing
  const paragraphs = String(content)
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/);

  return (
    <div className={`blog-content-body space-y-6 ${className}`}>
      {paragraphs.map((para, pIdx) => {
        const trimmed = para.trim();
        if (!trimmed) return null;

        const tokens = tokenizeInlineContent(para);

        return (
          <p
            key={`p-${pIdx}`}
            className={
              theme === 'light'
                ? 'cms-body whitespace-pre-line text-[#334155] text-[14px] leading-[1.7]'
                : 'whitespace-pre-line text-[#F0F0F0] text-[18px] leading-[1.75] font-normal'
            }
          >
            {tokens.map((token, tIdx) => {
              if (token.type === 'link') {
                return (
                  <a
                    key={`l-${pIdx}-${tIdx}`}
                    href={token.href}
                    target={token.target}
                    rel={token.rel}
                    title={token.title}
                    className={linkClass}
                  >
                    {token.text}
                  </a>
                );
              }
              return token.value;
            })}
          </p>
        );
      })}
    </div>
  );
}
