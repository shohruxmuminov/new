'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Play, Square, ChevronLeft, ChevronRight, Eye, EyeOff, Clock, Bookmark } from 'lucide-react';
import { speakingPart1, speakingPart3 } from '@/data/speaking-data';
import { formatTime } from '@/lib/utils';

const allQuestions = [...speakingPart1, ...speakingPart3];

export default function SpeakingPracticePage() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [part, setPart] = useState<'all' | 1 | 3>('all');
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = part === 'all' ? allQuestions : allQuestions.filter(q => q.part === part);
  const q = filtered[current] || filtered[0];

  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      chunks.current = [];
      mediaRecorder.current.ondataavailable = (e) => chunks.current.push(e.data);
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
      };
      mediaRecorder.current.start();
      setIsRecording(true);
      setTimerActive(true);
      setTimer(0);
    } catch { alert('Microphone access denied.'); }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
    setTimerActive(false);
  };

  const navigate = (dir: number) => {
    setCurrent(prev => {
      const next = prev + dir;
      return next < 0 ? filtered.length - 1 : next >= filtered.length ? 0 : next;
    });
    setShowAnswer(false);
    setAudioUrl(null);
    setTimer(0);
    setTimerActive(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Practice Questions</h1>
            <div className="flex items-center gap-2">
              {(['all', 1, 3] as const).map(p => (
                <button key={String(p)} onClick={() => { setPart(p); setCurrent(0); }} className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                  style={{ background: part === p ? 'var(--gradient-primary)' : 'var(--bg-surface)', color: part === p ? 'white' : 'var(--text-secondary)', border: part === p ? 'none' : '1px solid var(--border-default)' }}>
                  {p === 'all' ? 'All' : `Part ${p}`}
                </button>
              ))}
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="glass-card p-8 mb-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold px-3 py-1 rounded-lg" style={{ background: q.part === 1 ? 'rgba(245,158,11,0.1)' : 'rgba(99,102,241,0.1)', color: q.part === 1 ? '#f59e0b' : '#6366f1' }}>
                  Part {q.part} · {q.topic}
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--text-tertiary)' }}>
                  {current + 1} / {filtered.length}
                </span>
              </div>
              <h2 className="text-xl font-bold mb-6 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                {q.question}
              </h2>

              {/* Timer */}
              <div className="flex items-center gap-3 mb-6">
                <Clock size={16} style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-lg font-mono font-bold" style={{ color: timer > 120 ? '#ef4444' : 'var(--text-primary)' }}>
                  {formatTime(timer)}
                </span>
                {!isRecording && (
                  <button onClick={() => { setTimerActive(!timerActive); if (!timerActive) setTimer(0); }} className="text-xs font-medium px-3 py-1 rounded-lg"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}>
                    {timerActive ? 'Pause' : 'Start Timer'}
                  </button>
                )}
              </div>

              {/* Recording Controls */}
              <div className="flex items-center gap-3 mb-6">
                {!isRecording ? (
                  <button onClick={startRecording} className="btn-primary">
                    <Mic size={16} /> Record Answer
                  </button>
                ) : (
                  <button onClick={stopRecording} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-red-500 transition-all hover:bg-red-600">
                    <Square size={16} /> Stop Recording
                  </button>
                )}
                {isRecording && <span className="flex items-center gap-2 text-sm text-red-500 font-medium"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Recording...</span>}
              </div>

              {/* Playback */}
              {audioUrl && (
                <div className="mb-6 p-4 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                  <p className="text-xs font-medium mb-2" style={{ color: 'var(--text-tertiary)' }}>Your Recording:</p>
                  <audio controls src={audioUrl} className="w-full" style={{ height: '36px' }} />
                </div>
              )}

              {/* Sample Answer */}
              <button onClick={() => setShowAnswer(!showAnswer)} className="flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: '#6366f1' }}>
                {showAnswer ? <EyeOff size={14} /> : <Eye size={14} />}
                {showAnswer ? 'Hide' : 'Show'} Sample Answer
              </button>
              <AnimatePresence>
                {showAnswer && q.sampleAnswer && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-4 p-4 rounded-xl text-sm leading-relaxed" style={{ background: 'var(--gradient-card)', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }}>
                      {q.sampleAnswer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="btn-secondary flex items-center gap-2" style={{ padding: '10px 20px' }}>
              <ChevronLeft size={16} /> Previous
            </button>
            <button onClick={() => navigate(1)} className="btn-primary flex items-center gap-2">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
