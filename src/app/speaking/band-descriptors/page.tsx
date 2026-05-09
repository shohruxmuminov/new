'use client';

import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { bandDescriptors } from '@/data/speaking-data';

const colors = ['#10b981', '#22c55e', '#eab308', '#f59e0b', '#ef4444'];

export default function BandDescriptorsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-8">
            <Award size={24} className="text-yellow-500" />
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Band Descriptors</h1>
          </div>
        </motion.div>

        <div className="space-y-5">
          {bandDescriptors.map((bd, i) => (
            <motion.div key={bd.band} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg" style={{ background: colors[i] }}>
                  {bd.band}
                </div>
                <div>
                  <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>Band {bd.band}</h3>
                  <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{bd.title}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Fluency & Coherence', value: bd.fluency },
                  { label: 'Lexical Resource', value: bd.vocabulary },
                  { label: 'Grammar', value: bd.grammar },
                  { label: 'Pronunciation', value: bd.pronunciation },
                ].map(c => (
                  <div key={c.label} className="p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: colors[i] }}>{c.label}</p>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{c.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
