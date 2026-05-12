'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, ChevronRight, Clock, Play, Square, Download, CheckCircle2, RotateCcw, Volume2 } from 'lucide-react';
import { mockTests, cueCards } from '@/data/speaking-data';
import { formatTime } from '@/lib/utils';

interface Recording {
  part: number;
  question: string;
  url: string;
  duration: number;
  blob: Blob;
}

export default function MockTestPage() {
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [testState, setTestState] = useState<'idle' | 'intro' | 'active' | 'finished'>('idle');
  const [currentPart, setCurrentPart] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTime = useRef<number>(0);

  const test = mockTests.find(t => t.id === selectedTest);

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
        const duration = Math.round((Date.now() - startTime.current) / 1000);
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        const part = test!.parts[currentPart];
        const questionText = part.part === 2 ? 'Cue Card Response' : (part as any).questions[currentQ];
        
        setRecordings(prev => [...prev, {
          part: part.part,
          question: questionText,
          url,
          duration,
          blob
        }]);
        
        stream.getTracks().forEach(t => t.stop());
      };
      
      startTime.current = Date.now();
      mediaRecorder.current.start();
      setIsRecording(true);
      setTimerActive(true);
      setTimer(0);
    } catch {
      alert('Microphone access denied. Please enable your microphone to take the speaking test.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop();
      setIsRecording(false);
      setTimerActive(false);
    }
  };

  const handleNext = () => {
    stopRecording();
    const part = test!.parts[currentPart];
    
    if (part.part !== 2 && 'questions' in part && currentQ < (part.questions as string[]).length - 1) {
      setCurrentQ(q => q + 1);
    } else if (currentPart < test!.parts.length - 1) {
      setCurrentPart(p => p + 1);
      setCurrentQ(0);
    } else {
      setTestState('finished');
    }
  };

  // Auto-start recording when question changes in active state
  useEffect(() => {
    if (testState === 'active' && !isRecording) {
      // Delay slightly to let user breathe
      const timeout = setTimeout(() => {
        startRecording();
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [currentQ, currentPart, testState]);

  const downloadRecording = (rec: Recording) => {
    const a = document.createElement('a');
    a.href = rec.url;
    a.download = `IELTS_Speaking_Part${rec.part}_Q${recordings.indexOf(rec) + 1}.webm`;
    a.click();
  };

  if (testState === 'idle' || !test) {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#F0FDF4]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-3xl font-extrabold mb-2 text-[#166534]">Mock Speaking Tests</h1>
            <p className="text-[#15803d] mb-8">Select a test to begin your simulation</p>
            
            <div className="grid gap-4">
              {mockTests.map(t => (
                <motion.div 
                  key={t.id} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedTest(t.id); setTestState('intro'); }} 
                  className="bg-white p-6 rounded-3xl shadow-sm border border-emerald-100 cursor-pointer group flex items-center justify-between transition-all hover:shadow-md hover:border-emerald-200"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-50 text-orange-500">
                      <Mic size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">{t.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1 text-sm text-slate-500"><Clock size={14} /> {t.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="text-sm text-slate-500">3 Parts</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    <ChevronRight size={20} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  if (testState === 'intro') {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#F0FDF4] flex items-center justify-center">
        <div className="max-w-xl w-full mx-auto px-4">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-10 rounded-[40px] shadow-xl text-center border border-emerald-100">
            <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Play size={40} fill="currentColor" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">{test.title}</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              In this mock test, you will go through all 3 parts of the IELTS Speaking exam. 
              Your answers will be recorded automatically. Make sure you are in a quiet place.
            </p>
            
            <div className="space-y-3 mb-10">
              {['Part 1: Introduction & Interview', 'Part 2: Individual Long Turn (Cue Card)', 'Part 3: Two-way Discussion'].map((p, i) => (
                <div key={i} className="flex items-center gap-3 px-6 py-4 bg-slate-50 rounded-2xl text-slate-700 font-bold text-left">
                  <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">{i+1}</div>
                  {p}
                </div>
              ))}
            </div>

            <button 
              onClick={() => setTestState('active')} 
              className="w-full py-5 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-black text-xl shadow-lg shadow-orange-200 transition-all transform hover:-translate-y-1"
            >
              Start Mock
            </button>
            <button onClick={() => setTestState('idle')} className="mt-4 text-slate-400 font-bold hover:text-slate-600">Cancel</button>
          </motion.div>
        </div>
      </div>
    );
  }

  if (testState === 'finished') {
    return (
      <div className="min-h-screen pt-24 pb-16 bg-[#22C55E]">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            {/* Success Banner */}
            <div className="bg-white rounded-[32px] p-8 mb-6 shadow-xl border border-white/20">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-[#DCFCE7] text-[#16A34A] rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} />
                </div>
                <div>
                  <h1 className="text-4xl font-black text-slate-900">IELTS Speaking finished!</h1>
                  <p className="text-slate-500 font-bold mt-1">
                    {recordings.length} answers recorded • Total: {formatTime(recordings.reduce((a, b) => a + b.duration, 0))}
                  </p>
                </div>
                <div className="ml-auto flex gap-3">
                   <button onClick={() => { setTestState('idle'); setRecordings([]); }} className="p-4 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl transition-all" title="Restart">
                    <RotateCcw size={24} />
                   </button>
                </div>
              </div>
            </div>

            {/* Recordings List */}
            <div className="space-y-4">
              {recordings.map((rec, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/95 backdrop-blur-sm rounded-[24px] p-6 flex items-center justify-between group hover:bg-white transition-all shadow-lg"
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="px-4 py-2 bg-slate-100 rounded-xl text-slate-500 font-black text-sm whitespace-nowrap">
                      Part {rec.part}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800 text-lg line-clamp-1">{rec.question}</h3>
                      <p className="text-sm text-slate-400 font-medium">{rec.duration}s</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <audio src={rec.url} id={`audio-${i}`} hidden />
                    <button 
                      onClick={() => {
                        const audio = document.getElementById(`audio-${i}`) as HTMLAudioElement;
                        audio.play();
                      }}
                      className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all"
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                    <button 
                      onClick={() => downloadRecording(rec)}
                      className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button onClick={() => setTestState('idle')} className="px-10 py-5 bg-white text-[#22C55E] rounded-[24px] font-black text-xl shadow-xl hover:scale-105 transition-all">
                Back to Dashboard
              </button>
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
    <div className="min-h-screen pt-24 pb-16 bg-[#F0FDF4]">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
             <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-orange-500">
                  <Mic size={24} />
                </div>
                <div>
                   <h2 className="text-2xl font-black text-slate-900">{test.title}</h2>
                   <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-orange-500">Part {part.part}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span className="text-sm font-medium text-slate-400">{part.duration}</span>
                   </div>
                </div>
             </div>
             <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-2xl shadow-sm border border-emerald-50">
                <Clock size={18} className="text-slate-400" />
                <span className="font-mono text-xl font-black text-slate-700">{formatTime(timer)}</span>
             </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-xl border border-emerald-50 relative overflow-hidden">
            {/* Status Indicator */}
            <div className="absolute top-8 right-8 flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-full">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider">Speak Now</span>
            </div>

            {part.part === 2 && cueCard ? (
              <div className="py-6">
                <span className="px-4 py-2 bg-orange-100 text-orange-600 rounded-xl text-xs font-black uppercase mb-4 inline-block">Topic Card</span>
                <h3 className="text-3xl font-black text-slate-900 mb-6">{cueCard.topic}</h3>
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
                   <p className="font-bold text-slate-700 mb-4">{cueCard.prompt}</p>
                   <ul className="space-y-3">
                    {cueCard.bulletPoints.map((bp, j) => (
                      <li key={j} className="flex items-start gap-3 text-slate-600 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2" />
                        {bp}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-8 text-slate-400 text-sm italic font-medium">You have 1 minute to prepare and 1-2 minutes to speak.</p>
              </div>
            ) : (
              <div className="py-12 text-center">
                <p className="text-slate-400 font-black text-sm uppercase tracking-[0.2em] mb-6">Question {currentQ + 1} of {questions.length}</p>
                <h3 className="text-4xl font-black text-slate-900 leading-tight max-w-2xl mx-auto">{questions[currentQ]}</h3>
                
                <div className="mt-12 flex justify-center">
                   <div className="w-24 h-24 rounded-full bg-red-50 flex items-center justify-center border-4 border-red-100">
                      <div className="w-16 h-16 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-200" />
                   </div>
                </div>
              </div>
            )}

            {/* Bottom Controls */}
            <div className="mt-10 pt-10 border-t border-slate-50 flex items-center justify-between">
               <button onClick={stopRecording} className="flex items-center gap-3 px-8 py-4 bg-red-100 text-red-600 rounded-2xl font-black hover:bg-red-200 transition-all">
                  <Square size={20} fill="currentColor" /> Stop
               </button>
               
               <div className="flex items-center gap-4">
                  <button className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-slate-100 transition-all">
                     <Volume2 size={24} />
                  </button>
                  <button 
                    onClick={handleNext} 
                    className="flex items-center gap-3 px-10 py-4 bg-orange-500 text-white rounded-2xl font-black text-lg shadow-lg shadow-orange-100 hover:bg-orange-600 hover:-translate-y-1 transition-all"
                  >
                    {currentPart === test.parts.length - 1 && (part.part === 2 || currentQ === questions.length - 1) ? 'Finish Test' : 'Next Question'} 
                    <ChevronRight size={20} />
                  </button>
               </div>
            </div>
          </div>

          <button onClick={() => { setTestState('idle'); setRecordings([]); }} className="mt-8 mx-auto flex items-center gap-2 text-slate-400 font-bold hover:text-slate-600 transition-all">
            <RotateCcw size={16} /> Exit and Reset Test
          </button>
        </motion.div>
      </div>
    </div>
  );
}
