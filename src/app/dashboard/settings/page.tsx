'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Moon, Sun, Bell, Trash2, LogOut } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

export default function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('cdi-user');
    if (stored) {
      const u = JSON.parse(stored);
      setName(u.name || '');
      setEmail(u.email || '');
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('cdi-user', JSON.stringify({ name, email }));
    alert('Settings saved!');
  };

  const handleLogout = () => {
    localStorage.removeItem('cdi-user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Settings size={24} className="text-indigo-500" />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Settings</h1>
          </div>

          {/* Profile */}
          <div className="glass-card p-6 mb-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              <User size={16} /> Profile
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }} />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block" style={{ color: 'var(--text-secondary)' }}>Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }} />
              </div>
              <button onClick={handleSave} className="btn-primary" style={{ padding: '10px 24px' }}>Save Changes</button>
            </div>
          </div>

          {/* Appearance */}
          <div className="glass-card p-6 mb-5">
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
              {theme === 'light' ? <Sun size={16} /> : <Moon size={16} />} Appearance
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Dark Mode</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Toggle between light and dark theme</p>
              </div>
              <button onClick={toggleTheme}
                className="w-14 h-7 rounded-full relative transition-all"
                style={{ background: theme === 'dark' ? 'var(--gradient-primary)' : 'var(--bg-secondary)', border: '1px solid var(--border-default)' }}>
                <div className="w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all"
                  style={{ left: theme === 'dark' ? '30px' : '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="glass-card p-6" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
            <h3 className="font-bold text-sm mb-4 flex items-center gap-2 text-red-500">
              <Trash2 size={16} /> Danger Zone
            </h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Sign Out</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Sign out of your account</p>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-red-500 transition-all"
                style={{ background: 'rgba(239,68,68,0.1)' }}>
                <LogOut size={14} /> Sign Out
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
