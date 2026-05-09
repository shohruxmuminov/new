'use client';

import { useState, useEffect, useRef, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Save, Eye, EyeOff, BookOpen, FileText, ArrowLeft, Tag } from 'lucide-react';
import { writingTasks } from '@/data/writing-data';
import { formatTime, countWords } from '@/lib/utils';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function WritingPracticePage({ params }: { params: Promise<{ taskId: string }> }) {
  const { taskId } = use(params);
  const task = writingTasks.find(t => t.id === taskId);
  const [text, setText] = useState('');
  const [timer, setTimer] = useState(task ? task.duration * 60 : 0);
  const [timerActive, setTimerActive] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [showVocab, setShowVocab] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load draft
  useEffect(() => {
    if (!task) return;
    const saved = localStorage.getItem(`cdi-draft-${task.id}`);
    if (saved) setText(saved);
  }, [task]);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timerRef.current) clearInterval(timerRef.current);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timer]);

  if (!task) return <div className="min-h-screen pt-24 flex items-center justify-center"><p style={{ color: 'var(--text-secondary)' }}>Task not found.</p></div>;

  const words = countWords(text);
  const saveDraft = () => {
    localStorage.setItem(`cdi-draft-${task.id}`, text);
    toast.success('Draft saved!');
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Header */}
      <div className="sticky top-16 z-30 glass-strong py-3 px-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap gap-2">
          <Link href="/writing" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="word-count-badge">
              {words} / {task.minWords}+ words
              {words >= task.minWords && <span className="text-green-500 ml-1">✓</span>}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} style={{ color: timer < 60 ? '#ef4444' : 'var(--text-tertiary)' }} />
              <span className="font-mono font-bold text-sm" style={{ color: timer < 60 ? '#ef4444' : 'var(--text-primary)' }}>{formatTime(timer)}</span>
              <button onClick={() => { setTimerActive(!timerActive); if (!timerActive && timer === 0) setTimer(task.duration * 60); }}
                className="text-xs font-medium px-2 py-1 rounded-lg" style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                {timerActive ? 'Pause' : 'Start'}
              </button>
            </div>
            <button onClick={saveDraft} className="btn-primary" style={{ padding: '6px 14px', fontSize: '0.8rem' }}>
              <Save size={14} /> Save
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Writing Area */}
          <div className="lg:col-span-2">
            {/* Prompt */}
            <div className="glass-card p-5 mb-5">
              <span className="text-xs font-semibold px-2 py-1 rounded-lg mb-3 inline-block"
                style={{ background: task.type === 'Task 1' ? 'rgba(99,102,241,0.1)' : 'rgba(236,72,153,0.1)', color: task.type === 'Task 1' ? '#6366f1' : '#ec4899' }}>
                {task.type === 'Task 1' ? 'Task 1' : 'Task 2'}
              </span>
              <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{task.title}</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{task.prompt}</p>
            </div>

            {/* Editor */}
            <div className="glass-card overflow-hidden">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Start writing your essay here..."
                className="w-full min-h-[400px] p-6 text-sm leading-relaxed resize-y outline-none"
                style={{ background: 'transparent', color: 'var(--text-primary)', fontFamily: "'Inter', sans-serif" }}
              />
              <div className="px-6 py-3 flex items-center justify-between text-xs" style={{ borderTop: '1px solid var(--border-default)', color: 'var(--text-tertiary)' }}>
                <span>{words} words</span>
                <span>{text.length} characters</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Tools */}
            <div className="glass-card p-4 space-y-2">
              <button onClick={() => { setShowSample(!showSample); setShowTemplate(false); setShowVocab(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                style={{ background: showSample ? 'var(--gradient-card)' : 'var(--bg-secondary)', color: showSample ? '#6366f1' : 'var(--text-secondary)' }}>
                <Eye size={16} /> Sample Essay
              </button>
              <button onClick={() => { setShowTemplate(!showTemplate); setShowSample(false); setShowVocab(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                style={{ background: showTemplate ? 'var(--gradient-card)' : 'var(--bg-secondary)', color: showTemplate ? '#6366f1' : 'var(--text-secondary)' }}>
                <FileText size={16} /> Template
              </button>
              <button onClick={() => { setShowVocab(!showVocab); setShowSample(false); setShowTemplate(false); }}
                className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
                style={{ background: showVocab ? 'var(--gradient-card)' : 'var(--bg-secondary)', color: showVocab ? '#6366f1' : 'var(--text-secondary)' }}>
                <Tag size={16} /> Vocabulary
              </button>
            </div>

            {/* Panels */}
            <AnimatePresence mode="wait">
              {showSample && (
                <motion.div key="sample" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="glass-card p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <BookOpen size={14} /> Sample Essay
                  </h4>
                  <div className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
                    {task.sampleEssay}
                  </div>
                </motion.div>
              )}

              {showTemplate && (
                <motion.div key="template" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="glass-card p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <FileText size={14} /> Template
                  </h4>
                  <pre className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)', fontFamily: "'Inter', sans-serif" }}>
                    {task.template}
                  </pre>
                </motion.div>
              )}

              {showVocab && (
                <motion.div key="vocab" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="glass-card p-5">
                  <h4 className="font-bold text-sm mb-3 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Tag size={14} /> Useful Vocabulary
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {task.vocabulary.map(v => (
                      <span key={v} className="px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all hover:scale-105"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}
                        onClick={() => { setText(t => t + (t.endsWith(' ') || !t ? '' : ' ') + v); toast.success(`Added "${v}"`); }}>
                        {v}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>Click a word to add it to your essay</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Word Target */}
            <div className="glass-card p-4">
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Word Target</p>
              <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <div className="h-full rounded-full transition-all" style={{
                  width: `${Math.min(100, (words / task.minWords) * 100)}%`,
                  background: words >= task.minWords ? '#10b981' : 'var(--gradient-primary)',
                }} />
              </div>
              <p className="text-xs mt-2" style={{ color: words >= task.minWords ? '#10b981' : 'var(--text-tertiary)' }}>
                {words >= task.minWords ? `✓ Target reached (${task.minWords}+ words)` : `${task.minWords - words} more words needed`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
