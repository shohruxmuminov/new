'use client';

import { motion } from 'framer-motion';
import { FileText, ArrowLeft } from 'lucide-react';
import { writingTasks } from '@/data/writing-data';
import Link from 'next/link';

export default function TemplatesPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link href="/writing" className="flex items-center gap-2 text-sm font-medium mb-6" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back to Writing
          </Link>
          <div className="flex items-center gap-3 mb-8">
            <FileText size={24} className="text-purple-500" />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Writing Templates</h1>
          </div>
        </motion.div>

        <div className="space-y-5">
          {writingTasks.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold px-2 py-1 rounded-lg"
                  style={{ background: t.type === 'Task 1' ? 'rgba(99,102,241,0.1)' : 'rgba(236,72,153,0.1)', color: t.type === 'Task 1' ? '#6366f1' : '#ec4899' }}>
                  {t.type === 'Task 1' ? 'Task 1' : 'Task 2'}
                </span>
                <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{t.title}</h3>
              </div>
              <pre className="text-sm leading-relaxed whitespace-pre-wrap p-4 rounded-xl" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                {t.template}
              </pre>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
