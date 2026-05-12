'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, BarChart3 } from 'lucide-react';
import { readingTests } from '@/data/reading-data';

const difficultyColor: Record<string, string> = { Easy: '#10b981', Medium: '#f59e0b', Hard: '#ef4444' };

export default function ReadingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', color: '#10b981' }}>
              <BookOpen size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Reading Practice</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>IELTS CDI-style reading passages with instant scoring</p>
            </div>
          </div>
        </motion.div>

        {readingTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {readingTests.map((test, i) => (
              <motion.div key={test.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={`/reading/${test.id}`} className="block glass-card p-6 group h-full">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-lg" style={{ background: `${difficultyColor[test.difficulty]}15`, color: difficultyColor[test.difficulty] }}>
                      {test.difficulty}
                    </span>
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <Clock size={12} /> {test.duration} min
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{test.title}</h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {(test.passages[0]?.content || '').substring(0, 120)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                      <BarChart3 size={12} /> {test.questions.length} questions
                    </span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-card">
             <BookOpen size={48} className="mx-auto mb-4 opacity-20" />
             <h3 className="text-xl font-bold mb-2">No Reading Tests Available</h3>
             <p className="text-sm opacity-60">Tests will be uploaded by the administrator soon.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
