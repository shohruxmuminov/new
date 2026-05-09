'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mic, MessageSquare, BookMarked, Award, Clock, ArrowRight, Play } from 'lucide-react';

const sections = [
  { icon: MessageSquare, title: 'Practice Questions', desc: 'Part 1 & Part 3 questions with sample answers', href: '/speaking/practice', color: '#f59e0b', count: '12 questions' },
  { icon: Play, title: 'Mock Speaking Tests', desc: 'Full test simulations with all 3 parts', href: '/speaking/mock-test', color: '#10b981', count: '2 tests' },
  { icon: BookMarked, title: 'Cue Cards (Part 2)', desc: 'Topic cards with preparation notes and sample answers', href: '/speaking/cue-cards', color: '#6366f1', count: '5 cards' },
  { icon: Award, title: 'Band Descriptors', desc: 'Understand how IELTS speaking is scored (Band 5-9)', href: '/speaking/band-descriptors', color: '#ec4899', count: '5 bands' },
];

export default function SpeakingPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))', color: '#f59e0b' }}>
              <Mic size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>Speaking Practice</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Master your IELTS speaking skills</p>
            </div>
          </div>
        </motion.div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link href={s.href} className="block glass-card p-6 group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110" style={{ background: `linear-gradient(135deg, ${s.color}20, ${s.color}08)`, color: s.color }}>
                    <s.icon size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>{s.title}</h3>
                    <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{s.desc}</p>
                    <span className="text-xs font-medium px-3 py-1 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)' }}>{s.count}</span>
                  </div>
                  <ArrowRight size={16} className="mt-1 transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tips */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-10 glass-card p-6">
          <h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <Clock size={18} className="text-yellow-500" /> Quick Tips
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>• Speak naturally — don&apos;t memorize answers word for word</li>
            <li>• Use the 1-minute preparation time wisely for Part 2</li>
            <li>• Extend your answers with reasons and examples</li>
            <li>• Practice recording yourself to identify areas for improvement</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
