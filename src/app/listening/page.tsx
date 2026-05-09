'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Headphones, Clock, ArrowRight, BarChart3, Play } from 'lucide-react';
import { listeningTests } from '@/data/listening-data';

export default function ListeningPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(99,102,241,0.05))', color: '#6366f1' }}>
              <Headphones size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Listening Practice</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>IELTS-style listening tests with auto scoring</p>
            </div>
          </div>
        </motion.div>

        {listeningTests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {listeningTests.map((test, i) => (
              <motion.div key={test.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link href={`/listening/${test.id}`} className="block glass-card p-6 group h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)', color: 'white' }}>
                      <Play size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{test.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}><Clock size={12} /> {test.duration} min</span>
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-tertiary)' }}><BarChart3 size={12} /> {test.sections.reduce((a, s) => a + s.questions.length, 0)} questions</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {test.sections.map((s, j) => (
                      <div key={j} className="flex items-center justify-between text-xs px-3 py-2 rounded-lg" style={{ background: 'var(--bg-secondary)' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{s.title}</span>
                        <span style={{ color: 'var(--text-tertiary)' }}>{s.questions.length} Q</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-4">
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 glass-card">
             <Headphones size={48} className="mx-auto mb-4 opacity-20" />
             <h3 className="text-xl font-bold mb-2">No Listening Tests Available</h3>
             <p className="text-sm opacity-60">Audio tests will be uploaded soon.</p>
          </motion.div>
        )}

        {/* Note */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8 glass-card p-5">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <Headphones size={14} className="inline mr-2 text-indigo-500" />
            <strong>Note:</strong> Audio files can be added to <code className="text-xs px-1 py-0.5 rounded" style={{ background: 'var(--bg-secondary)' }}>/public/audio/</code>. The question interface is fully functional for practice.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
