'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Trash2, Eye, EyeOff, Lock, BookOpen, Headphones, PenTool, LayoutGrid, LogOut, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { readingTests } from '@/data/reading-data';
import { listeningTests } from '@/data/listening-data';
import { writingTasks } from '@/data/writing-data';
import { mockTests } from '@/data/mock-test-data';

const TEACHER_CODE = '1994';
const TEACHER_AUTH_KEY = 'cdi-teacher-auth';
const PUBLISHED_TESTS_KEY = 'cdi-published-tests';

export default function TeacherPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [publishedIds, setPublishedIds] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'listening' | 'writing' | 'mock'>('all');

  useEffect(() => {
    const auth = sessionStorage.getItem(TEACHER_AUTH_KEY);
    if (auth === 'true') setAuthenticated(true);
    
    const saved = localStorage.getItem(PUBLISHED_TESTS_KEY);
    if (saved) setPublishedIds(JSON.parse(saved));
  }, []);

  const save = (updated: string[]) => {
    setPublishedIds(updated);
    localStorage.setItem(PUBLISHED_TESTS_KEY, JSON.stringify(updated));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === TEACHER_CODE) {
      sessionStorage.setItem(TEACHER_AUTH_KEY, 'true');
      setAuthenticated(true);
      setCodeError(false);
      toast.success('Welcome, Teacher!');
    } else {
      setCodeError(true);
      setCode('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(TEACHER_AUTH_KEY);
    setAuthenticated(false);
  };

  const togglePublish = (id: string) => {
    const isPublished = publishedIds.includes(id);
    let updated;
    if (isPublished) {
      updated = publishedIds.filter(pid => pid !== id);
      toast.success('Access revoked.');
    } else {
      updated = [...publishedIds, id];
      toast.success('Access granted! Students can now see this test.');
    }
    save(updated);
  };

  const allAvailableTests = [
    ...mockTests.map(t => ({ ...t, category: 'mock' as const })),
    ...listeningTests.map(t => ({ ...t, category: 'listening' as const })),
    ...readingTests.map(t => ({ ...t, category: 'reading' as const })),
    ...writingTasks.map(t => ({ ...t, category: 'writing' as const })),
  ];

  const filteredTests = activeTab === 'all' 
    ? allAvailableTests 
    : allAvailableTests.filter(t => t.category === activeTab);

  const typeIcon = (category: string) => {
    if (category === 'reading') return <BookOpen size={16} className="text-indigo-400" />;
    if (category === 'listening') return <Headphones size={16} className="text-emerald-400" />;
    if (category === 'writing') return <PenTool size={16} className="text-amber-400" />;
    return <LayoutGrid size={16} className="text-purple-400" />;
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md">
          <div className="glass-card p-10 text-center">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8">
              <Shield size={36} className="text-indigo-400" />
            </div>
            <h1 className="text-2xl font-black text-primary mb-2">Teacher Panel</h1>
            <p className="text-sm text-secondary mb-8">Enter your access code to manage tests</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
                <input
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setCodeError(false); }}
                  placeholder="Access code"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl text-sm outline-none border-2 transition-all
                    ${codeError ? 'border-red-500 bg-red-500/5' : 'border-transparent focus:border-indigo-500/50 bg-secondary'}`}
                  style={{ color: 'var(--text-primary)' }}
                />
                {codeError && (
                  <p className="text-red-400 text-xs mt-2 text-left">Incorrect code. Please try again.</p>
                )}
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4 text-sm">
                <Shield size={16} /> Access Panel
              </button>
            </form>

            <Link href="/" className="text-xs text-tertiary hover:text-secondary mt-6 inline-block">
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 mt-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Shield size={20} className="text-indigo-400" />
              </div>
              <h1 className="text-2xl font-black text-primary">Teacher Panel</h1>
            </div>
            <p className="text-sm text-secondary">Toggle student access to IELTS materials</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary py-2.5 px-4 text-sm">
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {(['all', 'mock', 'listening', 'reading', 'writing'] as const).map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold capitalize transition-all border ${
                activeTab === tab ? 'bg-indigo-500 text-white border-indigo-500 shadow-lg shadow-indigo-500/20' : 'bg-surface text-tertiary border-default hover:border-indigo-500/30'
              }`}>
              {tab === 'mock' ? 'Mock Tests' : tab}
            </button>
          ))}
        </div>

        {/* Tests List */}
        <div className="space-y-3">
          {filteredTests.map((test, i) => {
            const isPublished = publishedIds.includes(test.id);
            return (
              <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-surface-soft flex items-center justify-center shrink-0">
                  {typeIcon(test.category)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary truncate">{test.title}</p>
                  <p className="text-[10px] text-tertiary uppercase tracking-widest mt-0.5">{test.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl ${
                    isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {isPublished ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {isPublished ? 'Accessible' : 'Locked'}
                  </span>
                  <button onClick={() => togglePublish(test.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs transition-all ${
                      isPublished ? 'border-amber-500/20 text-amber-400 hover:bg-amber-500/5' : 'border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/5'
                    }`}>
                    {isPublished ? <><EyeOff size={14} /> Revoke Access</> : <><Eye size={14} /> Grant Access</>}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
