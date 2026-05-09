'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { History, Trash2, Mic, BookOpen, Headphones, PenTool } from 'lucide-react';

interface HistoryItem { module: string; test: string; score: string; band: string; date: string; time: string; }

const moduleIcons: Record<string, typeof Mic> = { Speaking: Mic, Reading: BookOpen, Listening: Headphones, Writing: PenTool };
const moduleColors: Record<string, string> = { Speaking: '#f59e0b', Reading: '#10b981', Listening: '#6366f1', Writing: '#ec4899' };

const demoHistory: HistoryItem[] = [
  { module: 'Reading', test: 'The Rise of Urban Farming', score: '6/7', band: '7.5', date: '2025-05-08', time: '18 min' },
  { module: 'Listening', test: 'Practice Test 1', score: '16/20', band: '7.0', date: '2025-05-07', time: '28 min' },
  { module: 'Reading', test: 'The Psychology of Color', score: '5/7', band: '6.5', date: '2025-05-06', time: '22 min' },
  { module: 'Listening', test: 'Practice Test 2', score: '18/20', band: '8.0', date: '2025-05-05', time: '30 min' },
  { module: 'Speaking', test: 'Part 1 Practice', score: '—', band: '—', date: '2025-05-04', time: '12 min' },
  { module: 'Writing', test: 'Technology in Education', score: '—', band: '—', date: '2025-05-03', time: '42 min' },
];

export default function HistoryPage() {
  const [filter, setFilter] = useState('All');
  const filtered = filter === 'All' ? demoHistory : demoHistory.filter(h => h.module === filter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <History size={24} className="text-indigo-500" />
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Test History</h1>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {['All', 'Speaking', 'Reading', 'Listening', 'Writing'].map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  background: filter === f ? 'var(--gradient-primary)' : 'var(--bg-surface)',
                  color: filter === f ? 'white' : 'var(--text-secondary)',
                  border: filter === f ? 'none' : '1px solid var(--border-default)',
                }}>
                {f}
              </button>
            ))}
          </div>

          {/* History List */}
          <div className="space-y-3">
            {filtered.map((item, i) => {
              const Icon = moduleIcons[item.module] || BookOpen;
              const color = moduleColors[item.module] || '#6366f1';
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass-card p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, color }}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>{item.test}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{item.module} · {item.date} · {item.time}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold" style={{ color }}>{item.score}</p>
                    {item.band !== '—' && <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Band {item.band}</p>}
                  </div>
                </motion.div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>No test history found.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
