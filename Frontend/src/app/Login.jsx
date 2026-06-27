import React, { useState } from 'react';
import { authApi } from '../services/authApi';

export default function Login({ onLoginSuccess }) {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Added for registration verification
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Pre-flight check: ensure passwords match during signup
    if (isSignup && password !== confirmPassword) {
      setError('Credentials do not match. Please verify passwords.');
      return;
    }

    setLoading(true);

    try {
      if (isSignup) {
        // Fires against your updated async MongoDB FastAPI endpoint
        await authApi.signup(email, password);
        setIsSignup(false);
        setPassword('');
        setConfirmPassword('');
        setError('Profile initialized successfully! Authenticate below.');
      } else {
        await authApi.login(email, password);
        onLoginSuccess();
      }
    } catch (err) {
      setError(err.message || 'Authorization failed. Terminal rejected credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <div className="brand-logo">⚡</div>
          <h2>Productivity Rescue</h2>
        </div>
        
        <p className="login-subtitle">
          {isSignup ? 'Create your command center profile' : 'Deploy your autonomous agent platform'}
        </p>

        {error && (
          <div className={`login-alert ${error.includes('successfully') ? 'success' : 'error'}`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Security Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@company.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Access Credential</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
            />
          </div>

          {/* Dynamic Registration Input Fields */}
          {isSignup && (
            <div className="form-group">
              <label>Confirm Credential</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                required
              />
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Authorizing...' : isSignup ? 'Initialize Profile' : 'Authenticate Console'}
          </button>
        </form>

        <div className="login-toggle">
          <button type="button" onClick={() => { setIsSignup(!isSignup); setError(''); setPassword(''); setConfirmPassword(''); }}>
            {isSignup ? 'Already registered? Access console' : 'New terminal operator? Create account'}
          </button>
        </div>
      </div>
    </div>
  );
}