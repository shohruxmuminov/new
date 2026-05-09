'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, BookMarked } from 'lucide-react';
import { cueCards } from '@/data/speaking-data';

export default function CueCardsPage() {
  const [flipped, setFlipped] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Cue Cards (Part 2)</h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>Click a card to reveal the sample answer</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cueCards.map((card, i) => (
            <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="glass-card overflow-hidden cursor-pointer" onClick={() => setFlipped(p => ({ ...p, [card.id]: !p[card.id] }))} style={{ minHeight: 280 }}>
                {!flipped[card.id] ? (
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <BookMarked size={16} className="text-indigo-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#6366f1' }}>Cue Card</span>
                    </div>
                    <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{card.topic}</h3>
                    <p className="text-sm mb-4 font-medium" style={{ color: 'var(--text-secondary)' }}>{card.prompt}</p>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>You should say:</p>
                    <ul className="space-y-1">
                      {card.bulletPoints.map((bp, j) => (
                        <li key={j} className="text-sm flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-indigo-500 mt-0.5">•</span> {bp}
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-tertiary)' }}>
                      <RotateCcw size={12} className="inline mr-1" /> Click to see sample answer
                    </p>
                  </div>
                ) : (
                  <div className="p-6" style={{ background: 'var(--gradient-card)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: '#6366f1' }}>Sample Answer</p>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{card.sampleAnswer}</p>
                    <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Follow-up Questions:</p>
                    <ul className="space-y-1">
                      {card.followUpQuestions.map((fq, j) => (
                        <li key={j} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {fq}</li>
                      ))}
                    </ul>
                    <p className="text-xs mt-4 text-center" style={{ color: 'var(--text-tertiary)' }}>
                      <RotateCcw size={12} className="inline mr-1" /> Click to see question
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
