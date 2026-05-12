'use client';
// Build trigger: 2026-05-12

import { useState, useEffect, useRef, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, CheckCircle, XCircle, ArrowLeft, 
  RotateCcw, ChevronLeft, ChevronRight, LayoutGrid,
  FileText, HelpCircle, X, Maximize, Minimize
} from 'lucide-react';
import { readingTests } from '@/data/reading-data';
import { formatTime, getReadingBandScore } from '@/lib/utils';
import Link from 'next/link';
import { useFullscreen } from '@/hooks/useFullscreen';
import { highlighterScript } from '@/lib/highlighter-script';

export default function ReadingTestPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const test = readingTests.find(t => t.id === testId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timer, setTimer] = useState(test ? test.duration * 60 : 0);
  const [timerActive, setTimerActive] = useState(true);
  const [currentPassage, setCurrentPassage] = useState(1);
  const [showNavGrid, setShowNavGrid] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (timerActive && timer > 0) {
      timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      setTimerActive(false); setSubmitted(true);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive, timer]);

  const { enter: enterFS, exit: exitFS } = useFullscreen();
  const [isFS, setIsFS] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const passageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  if (!test) return <div className="min-h-screen pt-24 flex items-center justify-center bg-surface"><p className="text-secondary">Test not found.</p></div>;

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

  useEffect(() => {
    if (passageRef.current) {
      const script = document.createElement('script');
      script.textContent = highlighterScript;
      passageRef.current.appendChild(script);
    }
  }, [test]);

  if (test.htmlUrl) {
    return (
      <div className="h-screen flex flex-col bg-surface overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-surface z-50" style={{ borderColor: 'var(--border-default)' }}>
          <Link href="/reading" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Reading
          </Link>
          <button onClick={isFS ? exitFS : enterFS}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-default text-xs font-bold text-secondary hover:text-primary transition-all">
            {isFS ? <><Minimize size={14}/> Exit Fullscreen</> : <><Maximize size={14}/> Fullscreen</>}
          </button>
        </header>
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

  const score = test.questions.reduce((acc, q) => {
    const userAns = (answers[q.id] || '').toLowerCase().trim();
    return acc + (userAns === q.answer.toLowerCase().trim() ? 1 : 0);
  }, 0);

  const band = getReadingBandScore(score);

  const totalQuestions = test.questions.length;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      {/* Top Navigation Bar (Wisdom Style) */}
      <header className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-surface z-50" style={{ borderColor: 'var(--border-default)' }}>
        <div className="flex items-center gap-6">
          <Link href="/reading" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            <ArrowLeft size={16} /> Exit Test
          </Link>
          <div className="h-8 w-px bg-white/10 hidden sm:block" />
          <h2 className="text-sm font-black tracking-tight hidden md:block text-primary">{test.title}</h2>
        </div>

        <div className="flex items-center gap-8">
           <div className="flex items-center gap-3">
              <Clock size={18} className={timer < 300 ? 'text-red-500' : 'text-tertiary'} />
              <span className={`font-mono text-xl font-black tabular-nums ${timer < 300 ? 'text-red-500' : 'text-primary'}`}>
                {formatTime(timer)}
              </span>
           </div>
           <div className="h-8 w-px bg-white/10 hidden sm:block" />
           <div className="hidden lg:flex items-center gap-4">
              <div className="text-right">
                 <p className="text-[10px] font-bold text-tertiary uppercase">Answered</p>
                 <p className="text-sm font-black text-primary">{answeredCount} / {totalQuestions}</p>
              </div>
              {!submitted && (
                <button onClick={() => setSubmitted(true)} className="btn-primary py-2 px-6 text-xs">
                  Review & Submit
                </button>
              )}
           </div>
        </div>
      </header>

      {/* Main Split Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Passage Content (Wisdom Style) */}
        <div className="w-1/2 flex flex-col border-r overflow-hidden bg-surface" style={{ borderColor: 'var(--border-default)' }}>
           <div ref={passageRef} className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <div className="max-w-2xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-500 text-[10px] font-bold uppercase tracking-widest mb-6">
                    Reading Passage {currentPassage}
                 </div>
                 <h1 className="text-3xl font-black text-primary mb-8 leading-tight">{test.title}</h1>
                 <div className="text-base leading-relaxed text-secondary space-y-6">
                    {(test.passages[currentPassage - 1]?.content || '').split('\n\n').map((p, i) => (
                      <p key={i}>
                        {p}
                      </p>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Right: Questions Area */}
        <div className="w-1/2 flex flex-col overflow-hidden bg-secondary/30">
           <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
              <div className="max-w-2xl mx-auto space-y-8">
                 {/* Results Banner */}
                 {submitted && (
                   <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8 bg-indigo-600/10 border-indigo-500/20 mb-10">
                      <div className="flex items-center justify-between mb-6">
                         <div>
                            <h3 className="text-xl font-bold text-primary">Test Complete</h3>
                            <p className="text-sm text-tertiary">Performance Summary</p>
                         </div>
                         <div className="flex gap-4">
                            <div className="text-center">
                               <p className="text-3xl font-black text-indigo-500">{score}</p>
                               <p className="text-[10px] font-bold text-tertiary uppercase">Correct</p>
                            </div>
                            <div className="text-center">
                               <p className="text-3xl font-black text-emerald-500">{band}</p>
                               <p className="text-[10px] font-bold text-tertiary uppercase">Band</p>
                            </div>
                         </div>
                      </div>
                      <button onClick={() => { setSubmitted(false); setAnswers({}); setTimer(test.duration * 60); setTimerActive(true); }}
                        className="w-full btn-secondary justify-center py-3">
                        <RotateCcw size={16} /> Retake Test
                      </button>
                   </motion.div>
                 )}

                 <div className="flex items-center gap-3 mb-6">
                    <HelpCircle size={20} className="text-indigo-500" />
                    <h3 className="text-lg font-bold text-primary">Questions 1 - {totalQuestions}</h3>
                 </div>

                 <div className="space-y-6">
                    {test.questions.map((q, i) => {
                      const userAns = (answers[q.id] || '').toLowerCase().trim();
                      const isCorrect = userAns === q.answer.toLowerCase().trim();
                      return (
                        <div key={q.id} id={`q-${i+1}`} className={`glass-card p-6 border-none transition-all ${answers[q.id] ? 'bg-indigo-500/5' : ''}`}
                          style={submitted ? { background: isCorrect ? 'rgba(16,185,129,0.05)' : userAns ? 'rgba(239,68,68,0.05)' : '' } : {}}>
                          
                          <div className="flex items-start gap-4">
                             <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-black text-sm transition-all ${answers[q.id] ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-surface-soft text-tertiary'}`}>
                                {i + 1}
                             </div>
                             
                             <div className="flex-1 space-y-4">
                                <p className="text-sm font-bold text-primary leading-relaxed">{q.question}</p>

                                {q.type === 'mcq' && q.options && (
                                  <div className="grid grid-cols-1 gap-2">
                                     {q.options.map(opt => (
                                       <button key={opt} disabled={submitted}
                                         onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                                         className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-medium transition-all text-left border ${answers[q.id] === opt ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-surface/50 border-transparent hover:border-hover text-secondary'}`}
                                         style={submitted && opt === q.answer ? { background: 'rgba(16,185,129,0.1)', borderColor: '#10b981', color: '#10b981' } : {}}
                                       >
                                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[q.id] === opt ? 'border-indigo-500 bg-indigo-500' : 'border-tertiary/30'}`}>
                                             {answers[q.id] === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                                          </div>
                                          {opt}
                                       </button>
                                     ))}
                                  </div>
                                )}

                                {q.type === 'tfng' && (
                                  <div className="flex flex-wrap gap-2">
                                     {['True', 'False', 'Not Given'].map(opt => (
                                       <button key={opt} disabled={submitted}
                                         onClick={() => setAnswers(p => ({ ...p, [q.id]: opt }))}
                                         className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${answers[q.id] === opt ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'bg-surface/50 border-default text-tertiary hover:border-hover'}`}
                                         style={submitted && opt === q.answer ? { background: '#10b981', borderColor: '#10b981', color: 'white' } : {}}
                                       >
                                          {opt}
                                       </button>
                                     ))}
                                  </div>
                                )}

                                {q.type === 'fill' && (
                                  <div className="relative group">
                                     <input type="text" value={answers[q.id] || ''} disabled={submitted}
                                       onChange={(e) => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                                       placeholder="Type your answer..."
                                       className={`w-full px-6 py-4 rounded-2xl text-sm font-bold bg-surface/50 border-2 border-transparent outline-none transition-all ${answers[q.id] ? 'border-indigo-500/20 bg-indigo-500/5 text-indigo-500' : 'focus:border-indigo-500/20 focus:bg-indigo-500/5'}`} />
                                  </div>
                                )}

                                {submitted && (
                                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-4 rounded-2xl bg-surface-soft/50 space-y-2">
                                     <div className="flex items-center gap-2">
                                        {isCorrect ? <CheckCircle size={14} className="text-emerald-500" /> : <XCircle size={14} className="text-red-500" />}
                                        <p className="text-xs font-bold text-primary">{isCorrect ? 'Correct Answer' : `Correct Answer: ${q.answer}`}</p>
                                     </div>
                                     <p className="text-xs text-tertiary leading-relaxed italic">{q.explanation}</p>
                                  </motion.div>
                                )}
                             </div>
                          </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Bottom Bar: Question Grid & Passage Tabs (Wisdom Style) */}
      <footer className="h-16 flex items-center justify-between px-6 border-t shrink-0 bg-surface z-50" style={{ borderColor: 'var(--border-default)' }}>
         {/* Passage Tabs */}
         <div className="flex h-full">
            {[1, 2, 3].map(num => (
              <button key={num} onClick={() => setCurrentPassage(num)}
                className={`px-8 h-full flex items-center gap-2 text-[10px] font-black uppercase tracking-[2px] transition-all border-r border-default ${currentPassage === num ? 'bg-indigo-500 text-white' : 'text-tertiary hover:bg-white/5'}`}>
                <FileText size={14} /> Passage {num}
              </button>
            ))}
         </div>

         {/* Question Navigation Grid */}
         <div className="flex items-center gap-4">
            <button onClick={() => setShowNavGrid(!showNavGrid)} 
              className="flex items-center gap-2 px-4 h-10 rounded-xl bg-secondary border border-default text-xs font-bold text-secondary hover:text-primary transition-all">
               <LayoutGrid size={16} /> Question Palette
            </button>
            <div className="h-8 w-px bg-white/10" />
            <div className="flex items-center gap-2">
               <button className="p-2 rounded-xl border border-default text-tertiary hover:text-primary transition-all">
                  <ChevronLeft size={18} />
               </button>
               <button className="p-2 rounded-xl border border-default text-tertiary hover:text-primary transition-all">
                  <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </footer>

      {/* Nav Grid Overlay (Wisdom Style) */}
      <AnimatePresence>
        {showNavGrid && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowNavGrid(false)} className="fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm" />
            <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 25 }}
              className="fixed bottom-0 left-0 right-0 z-[70] p-10 bg-surface border-t border-default rounded-t-[40px] max-h-[80vh] overflow-y-auto custom-scrollbar">
               <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-xl font-black text-primary">Question Palette</h3>
                     <button onClick={() => setShowNavGrid(false)} className="p-2 rounded-xl bg-secondary"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
                     {Array.from({ length: totalQuestions }).map((_, i) => (
                       <a key={i} href={`#q-${i+1}`} onClick={() => setShowNavGrid(false)}
                         className={`aspect-square rounded-2xl flex items-center justify-center font-black text-sm transition-all border-2 ${answers[test.questions[i].id] ? 'bg-indigo-500 border-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'border-default text-tertiary hover:border-hover'}`}>
                         {i + 1}
                       </a>
                     ))}
                  </div>

                  <div className="mt-10 flex flex-wrap gap-6 border-t border-default pt-8">
                     <div className="flex items-center gap-2 text-xs font-bold text-tertiary uppercase">
                        <div className="w-4 h-4 rounded-lg bg-indigo-500" /> Answered
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold text-tertiary uppercase">
                        <div className="w-4 h-4 rounded-lg border-2 border-default" /> Unanswered
                     </div>
                     <div className="flex items-center gap-2 text-xs font-bold text-tertiary uppercase">
                        <div className="w-4 h-4 rounded-lg bg-emerald-500" /> Current
                     </div>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
