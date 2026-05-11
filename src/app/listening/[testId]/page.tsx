'use client';

import { useState, useEffect, useRef, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ArrowLeft, Send, RotateCcw, Headphones, ChevronRight, Maximize, Minimize, Play } from 'lucide-react';
import { listeningTests } from '@/data/listening-data';
import { formatTime, calculateScore, getBandScore } from '@/lib/utils';
import Link from 'next/link';
import { useFullscreen } from '@/hooks/useFullscreen';
import { highlighterScript } from '@/lib/highlighter-script';

export default function ListeningTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const test = listeningTests.find(t => t.id === testId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [timer, setTimer] = useState(test ? test.duration * 60 : 0);
  const [timerActive, setTimerActive] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (hasStarted && timerActive && timer > 0) {
      timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false); setSubmitted(true);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hasStarted, timerActive, timer]);

  const handleStart = () => {
    setHasStarted(true);
    setTimerActive(true);
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log('Audio autoplay blocked', e));
    }
  };

  const { enter: enterFS, exit: exitFS } = useFullscreen();
  const [isFS, setIsFS] = useState(false);

  useEffect(() => {
    const handler = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  if (!test) return <div className="min-h-screen pt-24 flex items-center justify-center"><p style={{ color: 'var(--text-secondary)' }}>Test not found.</p></div>;

  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full glass-card p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-6">
            <Headphones size={32} className="text-indigo-400" />
          </div>
          <h1 className="text-2xl font-black text-primary mb-2">{test.title}</h1>
          <p className="text-secondary text-sm mb-8">
            This test takes {test.duration} minutes. Make sure your audio is ready. The audio will start playing automatically when you begin.
          </p>
          <button onClick={handleStart} className="btn-primary w-full justify-center py-4 text-base">
            <Play size={18} /> Start Test
          </button>
          <Link href="/listening" className="inline-block mt-6 text-sm text-tertiary hover:text-secondary">
            ← Back
          </Link>
        </motion.div>
      </div>
    );
  }

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleIframeLoad = () => {
    try {
      if (iframeRef.current && iframeRef.current.contentDocument) {
        const script = iframeRef.current.contentDocument.createElement('script');
        script.textContent = highlighterScript;
        iframeRef.current.contentDocument.body.appendChild(script);
      }
    } catch (error) {
      console.warn('Iframe script injection blocked (CORS or permissions)', error);
    }
  };

  if (test.htmlUrl) {
    return (
      <div className="h-screen flex flex-col bg-surface overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-surface z-50" style={{ borderColor: 'var(--border-default)' }}>
          <Link href="/listening" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Listening
          </Link>
          <button onClick={isFS ? exitFS : enterFS}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-default text-xs font-bold text-secondary hover:text-primary transition-all">
            {isFS ? <><Minimize size={14}/> Exit Fullscreen</> : <><Maximize size={14}/> Fullscreen</>}
          </button>
        </header>
        {test.audioUrl && (
          <div className="px-6 py-2 border-b border-default bg-secondary flex justify-center">
            <audio ref={audioRef} src={test.audioUrl} controls className="h-10 w-full max-w-md" />
          </div>
        )}
        <div className="flex-1 w-full bg-white">
          <iframe 
            ref={iframeRef}
            src={test.htmlUrl} 
            className="w-full h-full border-none" 
            title={test.title} 
            onLoad={handleIframeLoad}
          />
        </div>
      </div>
    );
  }

  const allQuestions = test.sections.flatMap(s => s.questions);
  const score = allQuestions.reduce((acc, q) => {
    const userAns = (answers[q.id] || '').toLowerCase().trim();
    return acc + (userAns === q.answer.toLowerCase().trim() ? 1 : 0);
  }, 0);
  const percentage = calculateScore(score, allQuestions.length);
  const band = getBandScore(percentage);
  const section = test.sections[currentSection];

  return (
    <div className="min-h-screen pt-20 pb-16">
      {/* Sticky Header */}
      <div className="sticky top-16 z-30 glass-strong py-3 px-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/listening" className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back
          </Link>
          <h2 className="text-sm font-bold hidden md:block" style={{ color: 'var(--text-primary)' }}>{test.title}</h2>
          
          {test.audioUrl && (
             <audio ref={audioRef} src={test.audioUrl} controls className="h-8 max-w-[200px] hidden sm:block" />
          )}

          <div className="flex items-center gap-3">
            <Clock size={16} style={{ color: timer < 60 ? '#ef4444' : 'var(--text-tertiary)' }} />
            <span className="font-mono font-bold text-sm" style={{ color: timer < 60 ? '#ef4444' : 'var(--text-primary)' }}>{formatTime(timer)}</span>
            {!submitted && (
              <button onClick={() => { setSubmitted(true); setTimerActive(false); }} className="btn-primary" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                <Send size={14} /> Submit
              </button>
            )}
          </div>
        </div>
        {/* Mobile audio player if needed */}
        {test.audioUrl && (
          <div className="sm:hidden mt-2 flex justify-center">
             <audio ref={audioRef} src={test.audioUrl} controls className="h-8 w-full" />
          </div>
        )}
      </div>

      {/* Results */}
      <AnimatePresence>
        {submitted && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl mx-auto px-4 mt-4">
            <div className="glass-card p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-3xl font-extrabold gradient-text">{score}/{allQuestions.length}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold" style={{ color: '#10b981' }}>{percentage}%</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold" style={{ color: '#f59e0b' }}>{band}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Est. Band</p>
                </div>
              </div>
              <button onClick={() => { setSubmitted(false); setAnswers({}); setTimer(test.duration * 60); setTimerActive(true); setCurrentSection(0); }}
                className="btn-secondary flex items-center gap-2" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                <RotateCcw size={14} /> Retry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 mt-6">
        {/* Section Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {test.sections.map((s, i) => (
            <button key={i} onClick={() => setCurrentSection(i)}
              className="px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all"
              style={{
                background: currentSection === i ? 'var(--gradient-primary)' : 'var(--bg-surface)',
                color: currentSection === i ? 'white' : 'var(--text-secondary)',
                border: currentSection === i ? 'none' : '1px solid var(--border-default)',
              }}>
              Section {i + 1}
            </button>
          ))}
        </div>

        {/* Section Header */}
        <div className="glass-card p-5 mb-6">
          <div className="flex items-center gap-3">
            <Headphones size={20} className="text-indigo-500" />
            <div>
              <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{section.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{section.description}</p>
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {section.questions.map((q, i) => {
            const userAns = (answers[q.id] || '').toLowerCase().trim();
            const isCorrect = userAns === q.answer.toLowerCase().trim();
            return (
              <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="glass-card p-5" style={submitted ? { borderColor: isCorrect ? '#10b981' : userAns ? '#ef4444' : 'var(--border-default)' } : {}}>
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold"
                    style={{ background: 'var(--gradient-card)', color: '#6366f1' }}>
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>
                      {q.type === 'fill' && <span className="text-xs font-semibold px-2 py-0.5 rounded mr-2" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b' }}>Fill</span>}
                      {q.type === 'mcq' && <span className="text-xs font-semibold px-2 py-0.5 rounded mr-2" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981' }}>MCQ</span>}
                      {q.question}
                    </p>
                    {q.type === 'mcq' && q.options && (
                      <div className="space-y-2">
                        {q.options.map(opt => (
                          <label key={opt} className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all text-sm"
                            style={{
                              background: submitted && opt === q.answer ? 'rgba(16,185,129,0.1)' : answers[q.id] === opt ? 'var(--gradient-card)' : 'var(--bg-secondary)',
                              border: submitted && opt === q.answer ? '1px solid #10b981' : '1px solid transparent',
                              color: 'var(--text-secondary)',
                            }}>
                            <input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} disabled={submitted}
                              onChange={() => setAnswers(p => ({ ...p, [q.id]: opt }))} className="accent-indigo-500" />
                            {opt}
                            {submitted && opt === q.answer && <CheckCircle size={14} className="ml-auto text-green-500" />}
                          </label>
                        ))}
                      </div>
                    )}
                    {q.type === 'fill' && (
                      <input type="text" placeholder="Type your answer..." value={answers[q.id] || ''} disabled={submitted}
                        onChange={(e) => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border-default)' }} />
                    )}
                    {submitted && (
                      <div className="mt-3 flex items-center gap-2">
                        {isCorrect ? <CheckCircle size={14} className="text-green-500" /> : <XCircle size={14} className="text-red-500" />}
                        {!isCorrect && <p className="text-xs font-medium" style={{ color: '#10b981' }}>Correct: {q.answer}</p>}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section Nav */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setCurrentSection(p => Math.max(0, p - 1))} disabled={currentSection === 0}
            className="btn-secondary" style={{ padding: '10px 20px', opacity: currentSection === 0 ? 0.5 : 1 }}>
            Previous Section
          </button>
          {currentSection < test.sections.length - 1 ? (
            <button onClick={() => setCurrentSection(p => p + 1)} className="btn-primary">
              Next Section <ChevronRight size={16} />
            </button>
          ) : !submitted ? (
            <button onClick={() => { setSubmitted(true); setTimerActive(false); }} className="btn-primary">
              <Send size={16} /> Submit All
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
