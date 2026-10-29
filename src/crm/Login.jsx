import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { REPO, setToken, verifyToken } from '../lib/github';

// The "password" is a GitHub fine-grained token that can only edit this one repo.
// It is remembered on this device until "Log out".
export default function Login({ onSuccess }) {
  const [token, setTokenValue] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async e => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await verifyToken(token.trim());
      setToken(token.trim());
      onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <form onSubmit={submit} className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl">
        <img src="/logo.png" alt="Heecart" className="mx-auto h-12" />
        <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold">
          <Lock size={16} className="text-gold-600" /> Store manager login
        </div>
        <div className="mt-5 space-y-3">
          <div>
            <label className="label" htmlFor="token">Access key</label>
            <input
              id="token"
              type="password"
              autoComplete="current-password"
              className="input font-mono"
              placeholder="github_pat_…"
              value={token}
              onChange={e => setTokenValue(e.target.value)}
              required
              autoFocus
            />
            <p className="mt-1.5 text-[11px] text-ink/50">Your GitHub token for {REPO}. You only need to enter it once on this device.</p>
          </div>
          {error && <p className="text-xs font-semibold text-red-600">{error}</p>}
          <button className="btn-dark w-full" disabled={busy || !token.trim()}>{busy ? 'Checking…' : 'Sign in'}</button>
        </div>
      </form>
    </div>
  );
}
