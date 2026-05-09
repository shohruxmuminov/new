'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PenTool, Clock, ArrowRight, FileText } from 'lucide-react';
import { writingTasks } from '@/data/writing-data';

export default function WritingPage() {
  const task1 = writingTasks.filter(t => t.type === 'Task 1');
  const task2 = writingTasks.filter(t => t.type === 'Task 2');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.15), rgba(236,72,153,0.05))', color: '#ec4899' }}>
              <PenTool size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Writing Practice</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Essay practice with word counter, templates, and sample essays</p>
            </div>
          </div>
        </motion.div>

        {/* Templates Link */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <Link href="/writing/templates" className="block glass-card p-5 group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText size={20} className="text-purple-500" />
                <div>
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Writing Templates</h3>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Pre-built essay structures for every question type</p>
                </div>
              </div>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
            </div>
          </Link>
        </motion.div>

        {/* Task 1 */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>Task 1</span>
          Academic Writing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {task1.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <Link href={`/writing/practice/${t.id}`} className="block glass-card p-5 group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                    <Clock size={10} className="inline mr-1" />{t.duration} min
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Min {t.minWords} words</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.prompt.substring(0, 100)}...</p>
                <div className="flex justify-end mt-3">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Task 2 */}
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(236,72,153,0.1)', color: '#ec4899' }}>Task 2</span>
          Essay Writing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {task2.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
              <Link href={`/writing/practice/${t.id}`} className="block glass-card p-5 group h-full">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>
                    <Clock size={10} className="inline mr-1" />{t.duration} min
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Min {t.minWords} words</span>
                </div>
                <h3 className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.title}</h3>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t.prompt.substring(0, 100)}...</p>
                <div className="flex justify-end mt-3">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
