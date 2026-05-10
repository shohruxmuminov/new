'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, BookOpen, Headphones, PenTool, Lock, Play } from 'lucide-react';
import Link from 'next/link';
import { mockTests } from '@/data/mock-test-data';

const PUBLISHED_TESTS_KEY = 'cdi-published-tests';

export default function MockTestsPage() {
  const [publishedIds, setPublishedIds] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(PUBLISHED_TESTS_KEY);
    if (saved) setPublishedIds(JSON.parse(saved));
  }, []);

  const availableTests = mockTests.filter(t => publishedIds.includes(t.id));

  const typeIcon = (type: string) => {
    if (type === 'reading') return <BookOpen size={20} className="text-indigo-400" />;
    if (type === 'listening') return <Headphones size={20} className="text-emerald-400" />;
    if (type === 'writing') return <PenTool size={20} className="text-amber-400" />;
    return <LayoutGrid size={20} className="text-purple-400" />;
  };

  const typeColor = (type: string) => {
    if (type === 'reading') return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
    if (type === 'listening') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (type === 'writing') return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
    return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 mt-8">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl font-black text-primary mb-2">Mock Tests</h1>
          <p className="text-secondary">Full simulation tests released by your teacher</p>
        </motion.div>

        {availableTests.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass-card p-16 text-center">
            <div className="w-20 h-20 rounded-3xl bg-surface-soft flex items-center justify-center mx-auto mb-6">
              <Lock size={32} className="text-tertiary" />
            </div>
            <h2 className="text-xl font-bold text-primary mb-2">No Mock Tests Available</h2>
            <p className="text-secondary text-sm max-w-sm mx-auto">
              Your teacher hasn't published any mock tests yet. Check back later or ask your teacher to grant access.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availableTests.map((test, i) => (
              <motion.div key={test.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}>
                <Link href={`/mock-tests/${test.id}`}
                  className="glass-card p-6 flex items-start gap-4 hover:border-indigo-500/30 transition-all group block">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${typeColor(test.type)}`}>
                    {typeIcon(test.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-primary group-hover:text-indigo-400 transition-colors">{test.title}</p>
                    <p className="text-xs text-tertiary capitalize mt-1">{test.type} test</p>
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center shrink-0 group-hover:bg-indigo-500 transition-all">
                    <Play size={16} className="text-indigo-400 group-hover:text-white transition-colors" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
