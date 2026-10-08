import { useEffect, useState } from 'react';
import { LogIn, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

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
        if (active && data.authenticated) navigate('/admin/blog', { replace: true });
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
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
    return <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">Loading secure CMS…</div>;
  }

  return (
    <main className="cms-login-root min-h-screen w-full bg-slate-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Card variant="white" padding="lg" className="border-slate-200 shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="h-11 w-11 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-cyan-700" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-cyan-700">Amara Pain & Spine</p>
              <h1 className="text-2xl font-black text-slate-900">CMS Login</h1>
            </div>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Secure access for authorized content administrators.
          </p>

          <form onSubmit={login} className="mt-7 space-y-5">
            <label className="block text-sm font-bold text-slate-800">
              Username
              <input
                name="username"
                type="text"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck="false"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                required
              />
            </label>
            <label className="block text-sm font-bold text-slate-800">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
                required
              />
            </label>

            {error && (
              <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                {error}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full" icon={LogIn} disabled={submitting}>
              {submitting ? 'Signing in…' : 'Sign in securely'}
            </Button>
          </form>
        </Card>
        <p className="mt-5 text-center text-xs text-slate-400">Authorized access only.</p>
      </div>
    </main>
  );
}
