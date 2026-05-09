'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Plus, Trash2, Eye, EyeOff, Lock, BookOpen, Headphones, PenTool, LayoutGrid, LogOut, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const TEACHER_CODE = '1994';
const STORAGE_KEY = 'cdi-mock-tests';
const TEACHER_AUTH_KEY = 'cdi-teacher-auth';

interface MockTest {
  id: string;
  title: string;
  type: 'reading' | 'listening' | 'writing' | 'full';
  htmlUrl: string;
  isPublished: boolean;
  createdAt: number;
}

export default function TeacherPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [tests, setTests] = useState<MockTest[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<MockTest['type']>('reading');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const auth = sessionStorage.getItem(TEACHER_AUTH_KEY);
    if (auth === 'true') setAuthenticated(true);
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setTests(JSON.parse(saved));
  }, []);

  const save = (updated: MockTest[]) => {
    setTests(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
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

  const addTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    const test: MockTest = {
      id: `mock-${Date.now()}`,
      title: newTitle,
      type: newType,
      htmlUrl: newUrl,
      isPublished: false,
      createdAt: Date.now(),
    };
    save([...tests, test]);
    setNewTitle(''); setNewUrl(''); setNewType('reading'); setShowForm(false);
    toast.success('Mock test added!');
  };

  const togglePublish = (id: string) => {
    const updated = tests.map(t => t.id === id ? { ...t, isPublished: !t.isPublished } : t);
    save(updated);
    const test = updated.find(t => t.id === id);
    toast.success(test?.isPublished ? 'Published! Students can now access this test.' : 'Unpublished.');
  };

  const deleteTest = (id: string) => {
    save(tests.filter(t => t.id !== id));
    toast.success('Test deleted.');
  };

  const typeIcon = (type: string) => {
    if (type === 'reading') return <BookOpen size={16} className="text-indigo-400" />;
    if (type === 'listening') return <Headphones size={16} className="text-emerald-400" />;
    if (type === 'writing') return <PenTool size={16} className="text-amber-400" />;
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
            <p className="text-sm text-secondary mb-8">Enter your access code to continue</p>

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
            <p className="text-sm text-secondary">Manage mock tests and student access</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setShowForm(true)} className="btn-primary py-2.5 px-5 text-sm">
              <Plus size={16} /> Add Mock Test
            </button>
            <button onClick={handleLogout} className="btn-secondary py-2.5 px-4 text-sm">
              <LogOut size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Tests', value: tests.length, color: 'text-indigo-400' },
            { label: 'Published', value: tests.filter(t => t.isPublished).length, color: 'text-emerald-400' },
            { label: 'Drafts', value: tests.filter(t => !t.isPublished).length, color: 'text-amber-400' },
          ].map(stat => (
            <div key={stat.label} className="glass-card p-5 text-center">
              <p className={`text-3xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-tertiary uppercase tracking-widest mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Add Form Modal */}
        <AnimatePresence>
          {showForm && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" />
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="glass-card p-8 w-full max-w-md">
                  <h3 className="text-lg font-black text-primary mb-6">Add New Mock Test</h3>
                  <form onSubmit={addTest} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-tertiary mb-2 block">Title</label>
                      <input value={newTitle} onChange={e => setNewTitle(e.target.value)}
                        placeholder="e.g. Mock Test 1 - Full" required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-default bg-secondary text-primary focus:border-indigo-500/50" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-tertiary mb-2 block">Type</label>
                      <select value={newType} onChange={e => setNewType(e.target.value as MockTest['type'])}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-default bg-secondary text-primary">
                        <option value="reading">Reading</option>
                        <option value="listening">Listening</option>
                        <option value="writing">Writing</option>
                        <option value="full">Full Test</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-tertiary mb-2 block">HTML File URL</label>
                      <input value={newUrl} onChange={e => setNewUrl(e.target.value)}
                        placeholder="/mock-tests/filename.html" required
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none border border-default bg-secondary text-primary focus:border-indigo-500/50" />
                      <p className="text-xs text-tertiary mt-1">Put the HTML file in /public/mock-tests/ folder</p>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={() => setShowForm(false)} className="btn-secondary flex-1 justify-center py-3">Cancel</button>
                      <button type="submit" className="btn-primary flex-1 justify-center py-3">Add Test</button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Tests List */}
        <div className="space-y-3">
          {tests.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <LayoutGrid size={40} className="text-tertiary mx-auto mb-4" />
              <p className="text-secondary font-medium">No mock tests yet</p>
              <p className="text-xs text-tertiary mt-1">Click "Add Mock Test" to create your first one</p>
            </div>
          ) : (
            tests.map((test, i) => (
              <motion.div key={test.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card p-5 flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-surface-soft flex items-center justify-center shrink-0">
                  {typeIcon(test.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-primary truncate">{test.title}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-tertiary capitalize">{test.type}</span>
                    <span className="text-xs text-tertiary">·</span>
                    <span className="text-xs text-tertiary">{new Date(test.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-xl ${
                    test.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {test.isPublished ? <CheckCircle size={12} /> : <XCircle size={12} />}
                    {test.isPublished ? 'Published' : 'Draft'}
                  </span>
                  <button onClick={() => togglePublish(test.id)}
                    className="p-2 rounded-xl border border-default text-secondary hover:text-primary transition-all"
                    title={test.isPublished ? 'Unpublish' : 'Publish'}>
                    {test.isPublished ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button onClick={() => deleteTest(test.id)}
                    className="p-2 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
