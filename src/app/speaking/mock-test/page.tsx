'use client';

import { motion } from 'framer-motion';
import { Mic, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import SpeakingSimulator from '@/components/speaking/SpeakingSimulator';

export default function MockTestPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#0a0a0c]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-12 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Link 
              href="/speaking" 
              className="w-10 h-10 rounded-xl flex items-center justify-center glass-card hover:scale-110 transition-transform"
              style={{ color: 'var(--text-secondary)' }}
            >
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Speaking Mock Test</h1>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Full simulation with Part 1, 2, and 3</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-bold text-sm">
            <Mic size={16} />
            Live Simulator
          </div>
        </motion.div>

        {/* Simulator Container */}
        <div className="glass-card p-8 md:p-12 min-h-[600px] flex flex-col">
          <SpeakingSimulator />
        </div>

        {/* Footer info */}
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm" 
          style={{ color: 'var(--text-tertiary)' }}
        >
          Stay in a quiet environment and speak clearly. The simulator will automatically progress.
        </motion.p>
      </div>
    </div>
  );
}
