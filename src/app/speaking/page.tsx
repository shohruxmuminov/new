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

        {/* Main Action */}
        <div className="flex flex-col items-center justify-center py-12">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-10 text-center max-w-2xl w-full"
          >
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.1))', color: '#10b981' }}>
              <Play size={40} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Full Mock Test</h2>
            <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
              Practice the complete IELTS Speaking test experience.
              Includes Part 1, 2, and 3 with realistic timers.
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-10 text-sm">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-emerald-500 mb-1">Part 1</div>
                <div style={{ color: 'var(--text-tertiary)' }}>General<br/>Questions</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-emerald-500 mb-1">Part 2</div>
                <div style={{ color: 'var(--text-tertiary)' }}>Cue Card<br/>(2 mins)</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="font-bold text-emerald-500 mb-1">Part 3</div>
                <div style={{ color: 'var(--text-tertiary)' }}>Discussion<br/>(5 mins)</div>
              </div>
            </div>

            <Link href="/speaking/mock-test" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all hover:scale-105 active:scale-95" style={{ background: '#10b981', color: 'white' }}>
              Start Mock Test <ArrowRight size={20} />
            </Link>
          </motion.div>
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
