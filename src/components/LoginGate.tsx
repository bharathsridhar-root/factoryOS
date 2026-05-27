import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Factory } from 'lucide-react';

const SESSION_KEY = 'factoryos_auth';

// Credentials are set via environment variables at build time.
// See .env.local — VITE_APP_USER and VITE_APP_PASS
const VALID_USER = import.meta.env.VITE_APP_USER ?? 'admin';
const VALID_PASS = import.meta.env.VITE_APP_PASS ?? 'factoryos2024';

function isAuthenticated() {
  return sessionStorage.getItem(SESSION_KEY) === 'true';
}

export function LoginGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(isAuthenticated);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear error when user starts typing
  useEffect(() => { setError(''); }, [username, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate a brief auth delay so it feels intentional
    setTimeout(() => {
      if (username.trim() === VALID_USER && password === VALID_PASS) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setAuthed(true);
      } else {
        setError('Invalid username or password.');
      }
      setLoading(false);
    }, 600);
  };

  if (authed) return <>{children}</>;

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #001F3F 0%, #003B73 40%, #005EB8 100%)',
      }}
    >
      {/* Ambient grid */}
      <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />

      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 4 + (i % 3) * 3,
            height: 4 + (i % 3) * 3,
            left: `${8 + (i * 15) % 85}%`,
            top: `${10 + (i * 11) % 80}%`,
            background: `rgba(0,163,224,${0.1 + (i % 4) * 0.05})`,
          }}
          animate={{ y: [-8, 8, -8], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-sm mx-4"
      >
        {/* Card */}
        <div
          className="rounded-3xl p-8"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4)',
          }}
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
              style={{ background: 'linear-gradient(135deg, #005EB8, #00A3E0)' }}
            >
              <Factory size={28} color="white" strokeWidth={1.6} />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">FactoryOS</h1>
            <p className="text-sm text-[rgba(255,255,255,0.5)] mt-1">Industrial Intelligence Platform</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-widest block mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                autoFocus
                placeholder="Enter username"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: `1px solid ${error ? 'rgba(214,69,69,0.6)' : 'rgba(255,255,255,0.15)'}`,
                  color: 'white',
                }}
                onFocus={e => (e.target.style.borderColor = 'rgba(0,163,224,0.7)')}
                onBlur={e => (e.target.style.borderColor = error ? 'rgba(214,69,69,0.6)' : 'rgba(255,255,255,0.15)')}
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-[rgba(255,255,255,0.6)] uppercase tracking-widest block mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
                  placeholder="Enter password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: `1px solid ${error ? 'rgba(214,69,69,0.6)' : 'rgba(255,255,255,0.15)'}`,
                    color: 'white',
                  }}
                  onFocus={e => (e.target.style.borderColor = 'rgba(0,163,224,0.7)')}
                  onBlur={e => (e.target.style.borderColor = error ? 'rgba(214,69,69,0.6)' : 'rgba(255,255,255,0.15)')}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[rgba(255,255,255,0.4)] hover:text-[rgba(255,255,255,0.8)] transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-[#FF6B6B] font-medium flex items-center gap-1.5"
                >
                  <span className="inline-block w-1 h-1 rounded-full bg-[#FF6B6B]" />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading || !username || !password}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl text-sm font-bold text-white transition-all mt-2"
              style={{
                background: loading || !username || !password
                  ? 'rgba(255,255,255,0.1)'
                  : 'linear-gradient(135deg, #005EB8, #00A3E0)',
                cursor: loading || !username || !password ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                    className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  Authenticating…
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-[10px] text-[rgba(255,255,255,0.25)] mt-6">
            FactoryOS · Restricted Access · {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
