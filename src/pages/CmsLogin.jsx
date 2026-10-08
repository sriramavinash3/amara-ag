import React, { useEffect, useState } from 'react';
import { LogIn, ShieldCheck, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import CmsButton from '../components/cms/CmsButton';
import CmsCard from '../components/cms/CmsCard';
import CmsInput from '../components/cms/CmsInput';

async function requestJson(url, options) {
  const response = await fetch(url, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    ...options
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed.');
  return data;
}

export default function CmsLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    requestJson('/api/admin/login')
      .then((data) => {
        if (active && data.authenticated) {
          navigate('/admin/blog', { replace: true });
        }
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [navigate]);

  const login = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await requestJson('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ username: username.trim(), password })
      });
      navigate('/admin/blog', { replace: true });
    } catch (err) {
      setError(err.message);
      setPassword('');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="cms-login-viewport" style={{ backgroundColor: '#f5f7fa', color: '#0f172a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <svg className="animate-spin h-5 w-5" style={{ color: '#075985' }} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#334155' }}>Loading secure CMS…</span>
        </div>
      </div>
    );
  }

  return (
    <main className="cms-login-viewport">
      <div style={{ width: '100%', maxWidth: '440px', padding: '0 8px' }}>
        <CmsCard variant="login" padding="none">
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
            <div
              style={{
                height: '46px',
                width: '46px',
                borderRadius: '12px',
                backgroundColor: '#e0f2fe',
                border: '1px solid #bae6fd',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck style={{ height: '26px', width: '26px', color: '#0369a1' }} />
            </div>
            <div>
              <p style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0369a1', margin: 0 }}>
                Amara Pain & Spine
              </p>
              <h1 className="cms-heading cms-heading-xl" style={{ marginTop: '2px' }}>
                CMS Login
              </h1>
            </div>
          </div>

          <p className="cms-body-sm" style={{ marginBottom: '24px' }}>
            Secure access for authorized content administrators.
          </p>

          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <CmsInput
              label="Username"
              id="cms-username"
              name="username"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin username"
              required
            />

            <CmsInput
              label="Password"
              id="cms-password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            {error && (
              <div role="alert" className="cms-alert cms-alert-error">
                <AlertCircle style={{ height: '18px', width: '18px', flexShrink: 0, marginTop: '2px' }} />
                <span>{error}</span>
              </div>
            )}

            <CmsButton
              type="submit"
              variant="primary"
              size="lg"
              icon={LogIn}
              loading={submitting}
              disabled={submitting}
              style={{ width: '100%', marginTop: '6px' }}
            >
              {submitting ? 'Signing in…' : 'Sign in securely'}
            </CmsButton>
          </form>
        </CmsCard>

        <p className="cms-muted" style={{ textAlign: 'center', marginTop: '20px' }}>
          Authorized access only.
        </p>
      </div>
    </main>
  );
}
