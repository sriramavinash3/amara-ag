import { describe, it } from 'node:test';
import assert from 'node:assert';
import { readFileSync } from 'node:fs';
import { sanitizeUrl, tokenizeInlineContent } from '../src/utils/contentRenderer.js';

describe('Blog CRM Enhancements & Footer Text Correction Suite', () => {
  // ==========================================
  // TASK 3: FOOTER COPYRIGHT LINE
  // ==========================================
  describe('Task 3: Footer Copyright Line Verification', () => {
    it('verifies footer copyright text does NOT contain "Management" and matches requested text', () => {
      const footerFile = readFileSync('src/components/layout/Footer.jsx', 'utf8');
      
      // Must contain exact line without Management
      assert.ok(
        footerFile.includes('&copy; {currentYear} Amara Pain &amp; Spine. All rights reserved.'),
        'Footer must contain "&copy; {currentYear} Amara Pain &amp; Spine. All rights reserved."'
      );
      
      // Must NOT contain Management in copyright line
      const copyrightLineMatch = footerFile.match(/<p>&copy;[^<]+<\/p>/);
      assert.ok(copyrightLineMatch, 'Copyright line <p> element must exist');
      assert.strictEqual(
        copyrightLineMatch[0].includes('Management'),
        false,
        'Copyright line must completely remove "Management"'
      );
    });
  });

  // ==========================================
  // TASK 1: HYPERLINK SUPPORT & XSS SANITIZATION
  // ==========================================
  describe('Task 1: Content Body Hyperlink Support & XSS Sanitization', () => {
    it('sanitizes unsafe protocols (javascript:, data:, vbscript:, file:)', () => {
      assert.strictEqual(sanitizeUrl('javascript:alert(1)'), null);
      assert.strictEqual(sanitizeUrl('JAVASCRIPT:alert(document.cookie)'), null);
      assert.strictEqual(sanitizeUrl('data:text/html,<script>alert(1)</script>'), null);
      assert.strictEqual(sanitizeUrl('vbscript:msgbox("hi")'), null);
      assert.strictEqual(sanitizeUrl('file:///etc/passwd'), null);
      assert.strictEqual(sanitizeUrl('javascript\u0000:alert(1)'), null);
    });

    it('allows valid safe URLs (https, http, relative paths, mailto, tel)', () => {
      assert.strictEqual(sanitizeUrl('https://www.amarapain.com/treatments'), 'https://www.amarapain.com/treatments');
      assert.strictEqual(sanitizeUrl('http://example.com/research'), 'http://example.com/research');
      assert.strictEqual(sanitizeUrl('/treatments/radiofrequency-ablation'), '/treatments/radiofrequency-ablation');
      assert.strictEqual(sanitizeUrl('#faq-section'), '#faq-section');
      assert.strictEqual(sanitizeUrl('mailto:contact@amarapain.com'), 'mailto:contact@amarapain.com');
      assert.strictEqual(sanitizeUrl('tel:+17045039338'), 'tel:+17045039338');
    });

    it('parses Markdown links [text](url) into clickable nodes with target="_blank" for external links', () => {
      const text = 'Learn about our [spine treatments](https://www.amarapain.com/treatments) today.';
      const tokens = tokenizeInlineContent(text);

      assert.strictEqual(tokens.length, 3);
      assert.strictEqual(tokens[0].value, 'Learn about our ');
      
      const link = tokens[1];
      assert.strictEqual(link.type, 'link');
      assert.strictEqual(link.href, 'https://www.amarapain.com/treatments');
      assert.strictEqual(link.target, '_blank');
      assert.strictEqual(link.rel, 'noopener noreferrer');
      assert.strictEqual(link.text, 'spine treatments');

      assert.strictEqual(tokens[2].value, ' today.');
    });

    it('parses HTML links <a href="...">text</a> and preserves attributes', () => {
      const text = 'Visit <a href="https://example.com/info" target="_blank" title="More Info">Example Clinic</a> for details.';
      const tokens = tokenizeInlineContent(text);

      assert.strictEqual(tokens.length, 3);
      assert.strictEqual(tokens[0].value, 'Visit ');

      const link = tokens[1];
      assert.strictEqual(link.type, 'link');
      assert.strictEqual(link.href, 'https://example.com/info');
      assert.strictEqual(link.target, '_blank');
      assert.strictEqual(link.title, 'More Info');
      assert.strictEqual(link.text, 'Example Clinic');

      assert.strictEqual(tokens[2].value, ' for details.');
    });

    it('disarms malicious links into plain text without an active anchor tag', () => {
      const maliciousMd = 'Check this [evil payload](javascript:alert(1)) immediately.';
      const tokensMd = tokenizeInlineContent(maliciousMd);

      // The malicious link must NOT be a link token
      assert.strictEqual(tokensMd.length, 3);
      assert.strictEqual(tokensMd[1].type, 'text');
      assert.strictEqual(tokensMd[1].value, 'evil payload');

      const maliciousHtml = 'Check <a href="javascript:alert(document.cookie)">xss attack</a> here.';
      const tokensHtml = tokenizeInlineContent(maliciousHtml);
      assert.strictEqual(tokensHtml[1].type, 'text');
      assert.strictEqual(tokensHtml[1].value, 'xss attack');
    });

    it('preserves existing plain-text articles with newlines without breaking', () => {
      const plainText = 'Paragraph 1 line 1\nParagraph 1 line 2\n\nParagraph 2 content.';
      const tokens = tokenizeInlineContent(plainText);
      assert.strictEqual(tokens.length, 1);
      assert.strictEqual(tokens[0].type, 'text');
      assert.strictEqual(tokens[0].value, plainText);
    });
  });

  // ==========================================
  // TASK 2: IMAGE UPLOAD & STORAGE
  // ==========================================
  describe('Task 2: Blog Image Upload & Media Handling', () => {
    it('verifies upload endpoint rejects unauthenticated requests', async () => {
      const { onRequestPost } = await import('../functions/api/admin/upload.js');
      const req = new Request('https://www.amarapain.com/api/admin/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: 'fake' })
      });
      const res = await onRequestPost({ request: req, env: {} });
      assert.strictEqual(res.status, 401);
      const json = await res.json();
      assert.strictEqual(json.ok, false);
      assert.strictEqual(json.error, 'Unauthorized.');
    });

    it('verifies upload endpoint validates allowed MIME types and file sizes', async () => {
      const { onRequestPost } = await import('../functions/api/admin/upload.js');
      const { createSession } = await import('../functions/lib/auth.js');
      
      const testEnv = {
        ADMIN_SESSION_SECRET: 'test-secret-key-that-is-at-least-32-bytes-long!',
        BLOG_DB: {
          prepare: () => ({
            bind: () => ({ run: async () => ({ meta: { changes: 1 } }) }),
            run: async () => ({ meta: { changes: 1 } })
          })
        }
      };

      const session = await createSession(testEnv);
      const authHeaders = {
        'Content-Type': 'application/json',
        Cookie: `amara_admin_session=${encodeURIComponent(session.value)}`
      };

      // 1. Invalid mime type
      const badMimeReq = new Request('https://www.amarapain.com/api/admin/upload', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          data: 'c29tZWRhdGE=',
          mimeType: 'application/pdf',
          filename: 'report.pdf'
        })
      });
      const badMimeRes = await onRequestPost({ request: badMimeReq, env: testEnv });
      assert.strictEqual(badMimeRes.status, 400);
      const badMimeJson = await badMimeRes.json();
      assert.ok(badMimeJson.error.includes('Unsupported image format'));

      // 2. Valid image upload
      const validReq = new Request('https://www.amarapain.com/api/admin/upload', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify({
          data: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
          mimeType: 'image/png',
          filename: 'pixel.png'
        })
      });
      const validRes = await onRequestPost({ request: validReq, env: testEnv });
      assert.strictEqual(validRes.status, 200);
      const validJson = await validRes.json();
      assert.strictEqual(validJson.ok, true);
      assert.ok(validJson.url.startsWith('/api/media/'));
      assert.strictEqual(validJson.mimeType, 'image/png');
    });

    it('verifies media retrieval endpoint serves binary data with cache headers', async () => {
      const { onRequestGet } = await import('../functions/api/media/[id].js');
      const testBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      
      const testEnv = {
        BLOG_DB: {
          prepare: () => ({
            bind: () => ({
              first: async () => ({
                mime_type: 'image/png',
                data: testBase64
              })
            })
          })
        }
      };

      const res = await onRequestGet({ env: testEnv, params: { id: 'test-media-123' } });
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.headers.get('Content-Type'), 'image/png');
      assert.ok(res.headers.get('Cache-Control').includes('immutable'));
      
      const buffer = await res.arrayBuffer();
      assert.ok(buffer.byteLength > 0);
    });

    it('verifies 0003_blog_media.sql migration exists and contains table schema', () => {
      const migration = readFileSync('migrations/0003_blog_media.sql', 'utf8');
      assert.ok(migration.includes('CREATE TABLE IF NOT EXISTS blog_media'));
      assert.ok(migration.includes('id TEXT PRIMARY KEY'));
      assert.ok(migration.includes('mime_type TEXT NOT NULL'));
      assert.ok(migration.includes('data TEXT NOT NULL'));
    });
  });
});
