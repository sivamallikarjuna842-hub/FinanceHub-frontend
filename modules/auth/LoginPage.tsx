import { useState, FormEvent } from 'react';
import { login, setAuth } from '../../utils/auth';

interface LoginPageProps {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onSuccess, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email: email.trim(), password });
      setAuth(res.token, res.user);
      onSuccess();
    } catch (err: any) {
      console.error('Login error:', err);
      const serverMsg = err?.response?.data?.message;
      const serverDetails = err?.response?.data?.errors;
      const msg = serverMsg
        ? serverMsg + (serverDetails ? ` (${serverDetails.map((e: any) => e.message).join(', ')})` : '')
        : err?.message === 'Network Error'
          ? 'Cannot connect to server. Make sure the backend is running on port 5000.'
          : 'Login failed. Please try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/30">
            <svg className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">FinanceHub</h1>
          <p className="mt-2 text-slate-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="At least 6 characters"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Don't have an account?{' '}
          <button
            onClick={onSwitchToRegister}
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}