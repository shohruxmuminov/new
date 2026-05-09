'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bookmark, Mic, BookOpen, Headphones, PenTool, Trash2 } from 'lucide-react';
import Link from 'next/link';

const moduleIcons: Record<string, typeof Mic> = { speaking: Mic, reading: BookOpen, listening: Headphones, writing: PenTool };
const moduleColors: Record<string, string> = { speaking: '#f59e0b', reading: '#10b981', listening: '#6366f1', writing: '#ec4899' };

const demoBookmarks = [
  { id: '1', module: 'speaking' as const, title: 'Part 1 — Work & Studies', path: '/speaking/practice' },
  { id: '2', module: 'reading' as const, title: 'The Rise of Urban Farming', path: '/reading/rt-1' },
  { id: '3', module: 'writing' as const, title: 'Technology in Education', path: '/writing/practice/wt-2' },
  { id: '4', module: 'listening' as const, title: 'Practice Test 1', path: '/listening/lt-1' },
];

export default function BookmarksPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Bookmark size={24} className="text-yellow-500" />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Bookmarks</h1>
          </div>

          <div className="space-y-3">
            {demoBookmarks.map((bm, i) => {
              const Icon = moduleIcons[bm.module] || BookOpen;
              const color = moduleColors[bm.module] || '#6366f1';
              return (
                <motion.div key={bm.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link href={bm.path} className="block glass-card p-4 group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${color}15`, color }}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{bm.title}</p>
                        <p className="text-xs capitalize" style={{ color: 'var(--text-tertiary)' }}>{bm.module}</p>
                      </div>
                      <Bookmark size={16} className="fill-yellow-400 text-yellow-400" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
