'use client';

import { useState, useEffect, useRef, use } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Maximize, Minimize, Clock, ChevronRight, Play, Headphones, BookOpen, PenTool, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useFullscreen } from '@/hooks/useFullscreen';
import { formatTime } from '@/lib/utils';
import { mockTests } from '@/data/mock-test-data';

const PUBLISHED_TESTS_KEY = 'cdi-published-tests';

const FULL_TEST_SECTIONS = [
  { id: 'listening', title: 'Listening', duration: 30 * 60, icon: Headphones, path: '/test materials/mock test/mock listening/' },
  { id: 'reading', title: 'Reading', duration: 60 * 60, icon: BookOpen, path: '/test materials/mock test/mock reading/' },
  { id: 'writing', title: 'Writing', duration: 60 * 60, icon: PenTool, path: '/test materials/mock test/mock writing/' }
];

export default function MockTestViewPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const [test, setTest] = useState<any>(null);
  const { enter: enterFS, exit: exitFS } = useFullscreen();
  const [isFS, setIsFS] = useState(false);

  // Full test state
  const [hasStarted, setHasStarted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(PUBLISHED_TESTS_KEY);
    const publishedIds = saved ? JSON.parse(saved) : [];
    
    const found = mockTests.find(t => t.id === testId);
    if (found && publishedIds.includes(found.id)) {
      setTest(found);
    }
    
    const handler = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [testId]);

  useEffect(() => {
    if (hasStarted && timerActive && timer > 0) {
      timerRef.current = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0 && timerActive) {
      handleNextSection();
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [hasStarted, timerActive, timer]);

  const startTest = () => {
    setHasStarted(true);
    if (test?.type === 'full') {
      setCurrentSectionIndex(0);
      setTimer(FULL_TEST_SECTIONS[0].duration);
      setTimerActive(true);
      // Wait for iframe to load before playing audio
      setTimeout(() => {
        if (audioRef.current) audioRef.current.play().catch(e => console.log('Autoplay blocked:', e));
      }, 1000);
    }
  };

  const handleNextSection = () => {
    if (currentSectionIndex < FULL_TEST_SECTIONS.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      setCurrentSectionIndex(nextIndex);
      setTimer(FULL_TEST_SECTIONS[nextIndex].duration);
    } else {
      setTimerActive(false);
      setIsFinished(true);
    }
  };

  if (!test) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center bg-surface">
        <div className="text-center">
          <p className="text-secondary text-lg font-bold mb-2">Test not available</p>
          <p className="text-tertiary text-sm mb-6">This test hasn't been published or doesn't exist.</p>
          <a href="/mock-tests" className="btn-primary py-2 px-6 text-sm">← Back to Mock Tests</a>
        </div>
      </div>
    );
  }

  // FULL MOCK TEST - START SCREEN
  if (!hasStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full glass-card p-10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 flex items-center justify-center mb-6">
              <Headphones size={32} className="text-indigo-400" />
            </div>
            <h1 className="text-3xl font-black text-primary mb-2">{test.title}</h1>
            <p className="text-secondary text-sm">
              This is a full mock test simulation. It consists of 3 parts and will take exactly 2 hours and 30 minutes.
            </p>
          </div>
          
          <div className="space-y-3 mb-8">
            {FULL_TEST_SECTIONS.map((sec, i) => (
              <div key={sec.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary border border-default">
                <div className="flex items-center gap-3">
                  <sec.icon size={18} className="text-indigo-400" />
                  <span className="font-bold text-primary">{i + 1}. {sec.title}</span>
                </div>
                <span className="text-sm font-mono text-secondary">{formatTime(sec.duration)}</span>
              </div>
            ))}
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl mb-8 flex gap-3">
            <Clock className="text-amber-500 shrink-0 mt-0.5" size={18} />
            <p className="text-xs text-amber-500/90 leading-relaxed font-medium">
              Once you start, the sections will transition automatically when the timer runs out. 
              The audio will play automatically during the Listening section.
            </p>
          </div>

          <button onClick={startTest} className="btn-primary w-full justify-center py-4 text-base">
            <Play size={18} /> Start Full Mock Test
          </button>
          
          <div className="text-center mt-6">
            <a href="/mock-tests" className="inline-block text-sm text-tertiary hover:text-secondary">
              ← Cancel and go back
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // FULL MOCK TEST - FINISH SCREEN
  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full glass-card p-10 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-500/10 flex items-center justify-center mb-6">
            <CheckCircle size={40} className="text-emerald-500" />
          </div>
          <h1 className="text-3xl font-black text-primary mb-2">Test Completed!</h1>
          <p className="text-secondary text-sm mb-8">
            Congratulations! You have successfully completed the full mock test. Your answers have been recorded.
          </p>
          <a href="/mock-tests" className="btn-primary w-full justify-center py-4 text-base">
            Return to Dashboard
          </a>
        </motion.div>
      </div>
    );
  }

  // FULL MOCK TEST - ACTIVE SECTION VIEWER
  const currentSection = FULL_TEST_SECTIONS[currentSectionIndex];
  
  // Logic for single-file full mock tests (like Series 2)
  const isSingleFileTest = test.id === 'mock-2' || test.htmlUrl.includes('/full mock/');
  
  const filename = test.htmlUrl.split('/').pop() || '1.html';
  const iframeUrl = encodeURI(isSingleFileTest ? test.htmlUrl : `${currentSection.path}${filename}`);
  
  // Hide React audio player for single-file tests as they have integrated players
  const audioUrl = (!isSingleFileTest && currentSection.id === 'listening') 
    ? `${currentSection.path}${filename.replace('.html', '.mp3')}` 
    : null;

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <header className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-surface z-50"
        style={{ borderColor: 'var(--border-default)' }}>
        
        <div className="flex items-center gap-3">
          <a href="/mock-tests" className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-secondary border border-default text-xs font-bold uppercase tracking-widest text-secondary hover:text-primary transition-all">
            <ArrowLeft size={14} /> Exit
          </a>
          <div className="w-px h-6 bg-default mx-1 hidden md:block"></div>
          <div className="flex items-center gap-2">
            <currentSection.icon size={18} className="text-indigo-400" />
            <span className="font-bold text-primary uppercase tracking-widest text-xs sm:text-sm">{currentSection.title}</span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-indigo-500/10 text-indigo-500 hidden lg:inline">
            Part {currentSectionIndex + 1} of 3
          </span>
        </div>

        {audioUrl && (
          <div className="hidden md:flex items-center bg-secondary rounded-xl px-4 py-1.5 border border-default">
            <audio ref={audioRef} src={audioUrl} controls className="h-8 w-64" />
          </div>
        )}

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 bg-secondary px-3 py-1.5 rounded-lg border border-default">
            <Clock size={14} className={timer < 300 ? "text-red-500" : "text-indigo-400"} />
            <span className={`font-mono text-sm font-bold ${timer < 300 ? "text-red-500 animate-pulse" : "text-primary"}`}>
              {formatTime(timer)}
            </span>
          </div>
          
          <button onClick={handleNextSection}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-indigo-500 text-white text-[10px] sm:text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
            <span className="hidden xs:inline">{currentSectionIndex < 2 ? 'Next Section' : 'Finish Test'}</span>
            <span className="xs:hidden">{currentSectionIndex < 2 ? 'Next' : 'Finish'}</span>
            <ChevronRight size={14} />
          </button>
          
          <button onClick={isFS ? exitFS : enterFS}
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl border border-default text-secondary hover:text-primary transition-all">
            {isFS ? <Minimize size={16} /> : <Maximize size={16} />}
          </button>
        </div>
      </header>

      {/* Mobile Audio Player */}
      {audioUrl && (
        <div className="md:hidden w-full px-4 py-2 bg-secondary border-b border-default flex justify-center">
          <audio ref={audioRef} src={audioUrl} controls className="h-8 w-full max-w-sm" />
        </div>
      )}

      <div className="flex-1 w-full bg-white relative">
        <iframe src={iframeUrl} className="w-full h-full border-none absolute inset-0" title={`${test.title} - ${currentSection.title}`} />
      </div>
    </div>
  );
}
