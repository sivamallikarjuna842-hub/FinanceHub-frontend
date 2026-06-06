import { useState, FormEvent } from 'react';
import { register, setAuth } from '../../utils/auth';

interface RegisterPageProps {
  onSuccess: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onSuccess, onSwitchToLogin }: RegisterPageProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('First and last name are required');
      return;
    }
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await register({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        password,
      });
      setAuth(res.token, res.user);
      onSuccess();
    } catch (err: any) {
      console.error('Registration error:', err);
      const serverMsg = err?.response?.data?.message;
      const serverDetails = err?.response?.data?.errors;
      const msg = serverMsg
        ? serverMsg + (serverDetails ? ` (${serverDetails.map((e: any) => e.message).join(', ')})` : '')
        : err?.message === 'Network Error'
          ? 'Cannot connect to server. Make sure the backend is running on port 5000.'
          : 'Registration failed. Please try again.';
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
          <p className="mt-2 text-slate-400">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="John"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-300">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                placeholder="Doe"
              />
            </div>
          </div>

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

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-300">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-600 bg-slate-800/50 px-4 py-2.5 text-white placeholder-slate-500 outline-none transition-all focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              placeholder="Repeat your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 font-semibold text-white shadow-lg shadow-purple-500/30 transition-all hover:shadow-purple-500/50 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <button
            onClick={onSwitchToLogin}
            className="font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}