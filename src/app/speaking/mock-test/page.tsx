'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, ChevronRight, Clock, Play, Square } from 'lucide-react';
import { mockTests, cueCards } from '@/data/speaking-data';
import { formatTime } from '@/lib/utils';

export default function MockTestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const test = mockTests.find(t => t.id === selectedTest);

  useEffect(() => {
    if (timerActive) { timerRef.current = setInterval(() => setTimer(t => t + 1), 1000); }
    else if (timerRef.current) clearInterval(timerRef.current);
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
    } catch { alert('Microphone access denied'); }
  };

  const stopRecording = () => { mediaRecorder.current?.stop(); setIsRecording(false); setTimerActive(false); };

  if (!selectedTest || !test) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Mock Speaking Tests</h1>
            <div className="space-y-4">
              {mockTests.map(t => (
                <div key={t.id} onClick={() => { setSelectedTest(t.id); setCurrentPart(0); setCurrentQ(0); }} className="glass-card p-6 cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', color: '#10b981' }}>
                        <Play size={22} />
                      </div>
                      <div>
                        <h3 className="font-bold" style={{ color: 'var(--text-primary)' }}>{t.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>{t.duration} · 3 Parts</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" style={{ color: 'var(--text-tertiary)' }} />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const part = test.parts[currentPart];
  const cueCard = part.part === 2 && 'cueCard' in part ? cueCards.find(c => c.id === part.cueCard) : null;
  const questions = 'questions' in part ? part.questions : [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {test.parts.map((_, i) => (
              <div key={i} className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: i <= currentPart ? '100%' : '0%', background: 'var(--gradient-primary)' }} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{test.title}</h2>
              <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>Part {part.part} · {part.duration}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} style={{ color: 'var(--text-tertiary)' }} />
              <span className="font-mono font-bold" style={{ color: 'var(--text-primary)' }}>{formatTime(timer)}</span>
            </div>
          </div>

          <div className="glass-card p-8 mb-6">
            {part.part === 2 && cueCard ? (
              <div>
                <h3 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>{cueCard.topic}</h3>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{cueCard.prompt}</p>
                <ul className="space-y-1 mb-4">
                  {cueCard.bulletPoints.map((bp, j) => (
                    <li key={j} className="text-sm" style={{ color: 'var(--text-secondary)' }}>• {bp}</li>
                  ))}
                </ul>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>You have 1 minute to prepare and 1-2 minutes to speak.</p>
              </div>
            ) : (
              <div>
                <p className="text-xs font-medium mb-3" style={{ color: 'var(--text-tertiary)' }}>Question {currentQ + 1} of {questions.length}</p>
                <h3 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{questions[currentQ]}</h3>
              </div>
            )}

            {/* Recording */}
            <div className="flex items-center gap-3 mt-6">
              {!isRecording ? (
                <button onClick={startRecording} className="btn-primary"><Mic size={16} /> Record</button>
              ) : (
                <button onClick={stopRecording} className="flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-white bg-red-500"><Square size={16} /> Stop</button>
              )}
              {isRecording && <span className="text-sm text-red-500 font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />Recording</span>}
            </div>
            {audioUrl && (
              <div className="mt-4 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
                <audio controls src={audioUrl} className="w-full" style={{ height: 36 }} />
              </div>
            )}
          </div>

          {/* Nav */}
          <div className="flex items-center justify-between">
            <button onClick={() => { setSelectedTest(null); setTimerActive(false); setTimer(0); }} className="btn-secondary" style={{ padding: '10px 20px' }}>Exit Test</button>
            <button onClick={() => {
              if (part.part !== 2 && currentQ < questions.length - 1) { setCurrentQ(q => q + 1); }
              else if (currentPart < test.parts.length - 1) { setCurrentPart(p => p + 1); setCurrentQ(0); }
              else { setSelectedTest(null); setTimerActive(false); }
              setAudioUrl(null);
            }} className="btn-primary">
              {currentPart === test.parts.length - 1 && (part.part === 2 || currentQ === questions.length - 1) ? 'Finish' : 'Next'} <ChevronRight size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
