'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { setSession } from '@/lib/session';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Check if banned
    const banned = localStorage.getItem('cdi-banned-users');
    if (banned && JSON.parse(banned).includes(email)) {
      setError('Your account has been banned. Please contact the CEO.');
      return;
    }

    setLoading(true);
    // Demo mode simulation
    setTimeout(() => {
      const user = { email, name: email.split('@')[0] };
      setSession(user);

      // Ensure user is in global list
      const allUsers = JSON.parse(localStorage.getItem('cdi-all-users') || '[]');
      const existing = allUsers.find((u: any) => u.email === email);
      if (!existing) {
        allUsers.push({ ...user, registeredAt: Date.now(), lastLogin: Date.now() });
      } else {
        existing.lastLogin = Date.now();
      }
      localStorage.setItem('cdi-all-users', JSON.stringify(allUsers));

      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Left Side: Visual/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12" 
        style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-20" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, var(--text-tertiary) 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} />
        
        <div className="relative z-10 max-w-lg text-white">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center font-bold text-2xl mb-8 border border-white/20">
              CDI
            </div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Master the <span className="text-indigo-300">IELTS</span> with Confidence.
            </h1>
            <p className="text-xl text-indigo-100 mb-10 leading-relaxed opacity-90">
              Your comprehensive platform for CDI preparation. Track your progress, take mock tests, and get ready for success.
            </p>
            
            <div className="space-y-4">
              {[
                'Full simulation of CDI interface',
                'Advanced performance analytics',
                'Curated question banks for all modules'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-400" />
                  <span className="font-medium">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12" style={{ background: 'var(--bg-surface)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sign In</h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Enter your credentials to access your dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" style={{ color: 'var(--text-tertiary)' }}>
                  <Mail size={18} />
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@company.com" required
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl text-sm outline-none transition-all border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Password</label>
                <Link href="#" className="text-xs font-semibold text-indigo-500 hover:text-indigo-400">Forgot password?</Link>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" style={{ color: 'var(--text-tertiary)' }}>
                  <Lock size={18} />
                </div>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required
                  className="w-full pl-12 pr-12 py-3.5 rounded-2xl text-sm outline-none transition-all border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-indigo-500 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4 rounded-2xl group relative overflow-hidden">
              <div className="relative z-10 flex items-center gap-2">
                {loading ? 'Signing in...' : 'Sign in to Dashboard'}
                {!loading && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </div>
            </button>
          </form>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Or continue with</span>
            <div className="flex-1 h-px" style={{ background: 'var(--border-default)' }} />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-medium text-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl border font-medium text-sm hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--border-default)', color: 'var(--text-primary)', background: 'var(--bg-surface)' }}>
              <ShieldCheck size={20} className="text-blue-600" />
              SSO
            </button>
          </div>

          <p className="text-center text-sm mt-10 font-medium" style={{ color: 'var(--text-secondary)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-bold text-indigo-500 hover:text-indigo-400">Join now for free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
