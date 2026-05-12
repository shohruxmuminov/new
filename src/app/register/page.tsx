'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, Eye, EyeOff, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        const newUser = { 
          email, 
          name, 
          registeredAt: Date.now(),
          createdAt: serverTimestamp(),
          status: 'active'
        };
        
        // Save to LocalStorage for session persistence
        localStorage.setItem('cdi-user', JSON.stringify(newUser));
        
        // Save to Firebase Firestore (Global)
        await setDoc(doc(db, 'users', email.toLowerCase()), newUser);
        
        // Legacy support for LocalStorage CEO Panel (Syncing)
        const allUsers = JSON.parse(localStorage.getItem('cdi-all-users') || '[]');
        if (!allUsers.find((u: any) => u.email === email)) {
          allUsers.push(newUser);
          localStorage.setItem('cdi-all-users', JSON.stringify(allUsers));
        }

        window.location.href = '/dashboard';
      } catch (err) {
        console.error("Error registering user:", err);
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Right Side: Visual/Branding (Flipped for variety) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12 order-last" 
        style={{ background: 'var(--gradient-primary)' }}>
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', 
          backgroundSize: '40px 40px' 
        }} />
        
        <div className="relative z-10 max-w-lg text-white">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center gap-3 mb-8">
               <div className="w-12 h-12 rounded-xl bg-white text-indigo-600 flex items-center justify-center font-bold text-xl">CDI</div>
               <span className="text-2xl font-bold tracking-tight">Prep Platform</span>
            </div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Start Your Journey to <span className="text-pink-300">Success.</span>
            </h1>
            <p className="text-xl text-indigo-50 mb-10 leading-relaxed opacity-90">
              Join thousands of students who are already using CDI Prep to achieve their target band scores.
            </p>
            
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: 'Interactive Tests', desc: 'Real-time feedback and scoring' },
                { title: 'Smart Analytics', desc: 'Identify your weak points instantly' },
                { title: 'Expert Resources', desc: 'Templates and samples for every task' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-indigo-100 opacity-80">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Left Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12" style={{ background: 'var(--bg-surface)' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="w-full max-w-md">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Create Account</h2>
            <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Join CDI Prep and start practicing today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Full Name</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" style={{ color: 'var(--text-tertiary)' }}>
                  <User size={18} />
                </div>
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required
                  className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm outline-none transition-all border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Email Address</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" style={{ color: 'var(--text-tertiary)' }}>
                  <Mail size={18} />
                </div>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com" required
                  className="w-full pl-12 pr-4 py-3 rounded-2xl text-sm outline-none transition-all border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider pl-1" style={{ color: 'var(--text-tertiary)' }}>Password</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors group-focus-within:text-indigo-500" style={{ color: 'var(--text-tertiary)' }}>
                  <Lock size={18} />
                </div>
                <input type={showPass ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 characters" required
                  className="w-full pl-12 pr-12 py-3 rounded-2xl text-sm outline-none transition-all border focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', borderColor: 'var(--border-default)' }} />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 hover:text-indigo-500 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 px-1 py-2">
              <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <label htmlFor="terms" className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                I agree to the <Link href="#" className="text-indigo-500 font-bold">Terms of Service</Link> and <Link href="#" className="text-indigo-500 font-bold">Privacy Policy</Link>
              </label>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-4 rounded-2xl group">
               {loading ? 'Creating account...' : 'Get Started Now'}
               {!loading && <UserPlus size={18} className="ml-2 transition-transform group-hover:scale-110" />}
            </button>
          </form>

          <p className="text-center text-sm mt-8 font-medium" style={{ color: 'var(--text-secondary)' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-indigo-500 hover:text-indigo-400">Sign in here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
