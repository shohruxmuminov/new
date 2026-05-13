'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Timer, ArrowRight, Play, Pause, RotateCcw, CheckCircle2, ChevronRight, Info, Download, Volume2 } from 'lucide-react';
import { speakingPart1, cueCards, CueCard, SpeakingTask } from '@/data/speaking-data';

type Part = 1 | 2 | 3;

interface Recording {
  part: Part;
  question: string;
  url: string;
  blob: Blob;
}

interface SimulatorState {
  part: Part;
  questionIndex: number;
  isThinkTime: boolean;
  timeLeft: number;
  isFinished: boolean;
  part1Questions: SpeakingTask[];
  selectedCueCard: CueCard | null;
  part3Questions: string[];
}

export default function SpeakingSimulator() {
  const [state, setState] = useState<SimulatorState>({
    part: 1,
    questionIndex: 0,
    isThinkTime: false,
    timeLeft: 30,
    isFinished: false,
    part1Questions: [],
    selectedCueCard: null,
    part3Questions: [],
  });

  const [isActive, setIsActive] = useState(false);
  const [recordings, setRecordings] = useState<Recording[]>([]);
  
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const chunks = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize test data
  const initTest = useCallback(() => {
    const shuffledP1 = [...speakingPart1].sort(() => 0.5 - Math.random());
    const selectedP1 = shuffledP1.slice(0, 5);
    const randomCC = cueCards[Math.floor(Math.random() * cueCards.length)];
    const p3 = randomCC.followUpQuestions.slice(0, 6);

    setState({
      part: 1,
      questionIndex: 0,
      isThinkTime: false,
      timeLeft: 30,
      isFinished: false,
      part1Questions: selectedP1,
      selectedCueCard: randomCC,
      part3Questions: p3,
    });
    setRecordings([]);
    setIsActive(true);
  }, []);

  const startRecording = async () => {
    try {
      if (!streamRef.current) {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      
      mediaRecorder.current = new MediaRecorder(streamRef.current);
      chunks.current = [];
      
      mediaRecorder.current.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.current.push(e.data);
      };
      
      mediaRecorder.current.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        let questionText = "";
        if (state.part === 1) questionText = state.part1Questions[state.questionIndex]?.question;
        else if (state.part === 2) questionText = state.selectedCueCard?.topic || "Cue Card";
        else questionText = state.part3Questions[state.questionIndex];

        setRecordings(prev => [...prev, {
          part: state.part,
          question: questionText,
          url,
          blob
        }]);
      };

      mediaRecorder.current.start();
    } catch (err) {
      console.error("Microphone access denied:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.stop();
    }
  };

  useEffect(() => {
    initTest();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [initTest]);

  // Handle auto-recording when question changes
  useEffect(() => {
    if (isActive && !state.isFinished && !state.isThinkTime) {
      startRecording();
    }
    return () => stopRecording();
  }, [state.part, state.questionIndex, state.isThinkTime, state.isFinished, isActive]);

  const handleNext = useCallback(() => {
    stopRecording();
    
    setState(prev => {
      if (prev.part === 1) {
        if (prev.questionIndex < prev.part1Questions.length - 1) {
          return { ...prev, questionIndex: prev.questionIndex + 1, timeLeft: 30 };
        } else {
          return { ...prev, part: 2, isThinkTime: true, timeLeft: 60 };
        }
      } else if (prev.part === 2) {
        if (prev.isThinkTime) {
          return { ...prev, isThinkTime: false, timeLeft: 120 };
        } else {
          return { ...prev, part: 3, questionIndex: 0, timeLeft: 45 };
        }
      } else if (prev.part === 3) {
        if (prev.questionIndex < prev.part3Questions.length - 1) {
          return { ...prev, questionIndex: prev.questionIndex + 1, timeLeft: 45 };
        } else {
          return { ...prev, isFinished: true };
        }
      }
      return prev;
    });
  }, [state.part, state.questionIndex, state.isThinkTime, state.part1Questions, state.part3Questions]);

  useEffect(() => {
    let interval: any = null;
    if (isActive && !state.isFinished) {
      interval = setInterval(() => {
        setState(prev => {
          if (prev.timeLeft > 0) {
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          } else {
            handleNext();
            return prev;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, state.isFinished, handleNext]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const downloadAll = () => {
    recordings.forEach((rec, i) => {
      const a = document.createElement('a');
      a.href = rec.url;
      a.download = `Part${rec.part}_Q${i+1}.webm`;
      a.click();
    });
  };

  if (state.isFinished) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card p-10 max-w-2xl w-full">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2 text-center">Test Completed!</h2>
          <p className="text-gray-400 mb-8 text-center">Review and download your recorded answers below.</p>
          
          <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {recordings.map((rec, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-colors">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-500">Part {rec.part}</span>
                  </div>
                  <p className="text-sm font-medium truncate text-gray-300">{rec.question}</p>
                </div>
                <div className="flex items-center gap-2">
                  <audio src={rec.url} id={`audio-${i}`} hidden />
                  <button 
                    onClick={() => (document.getElementById(`audio-${i}`) as HTMLAudioElement).play()}
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                  >
                    <Volume2 size={18} />
                  </button>
                  <a href={rec.url} download={`Part${rec.part}_Q${i+1}.webm`} className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all">
                    <Download size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={downloadAll} className="py-4 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <Download size={20} /> Download All
            </button>
            <button onClick={() => initTest()} className="py-4 rounded-xl font-bold border border-white/10 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <RotateCcw size={20} /> Restart Test
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const currentContent = () => {
    if (state.part === 1) {
      return (
        <div className="space-y-6">
          <div className="text-emerald-500 font-bold tracking-wider text-sm uppercase">Part 1: General Questions</div>
          <h2 className="text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {state.part1Questions[state.questionIndex]?.question}
          </h2>
          <p className="text-gray-400">Speak naturally for about 30 seconds.</p>
        </div>
      );
    } else if (state.part === 2) {
      return (
        <div className="space-y-6">
          <div className="text-emerald-500 font-bold tracking-wider text-sm uppercase">
            Part 2: Cue Card {state.isThinkTime ? "(Preparation)" : "(Speaking)"}
          </div>
          <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5">
            <h2 className="text-2xl font-bold mb-4">{state.selectedCueCard?.prompt}</h2>
            <ul className="space-y-3 text-lg">
              {state.selectedCueCard?.bulletPoints.map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <ChevronRight size={20} className="text-emerald-500 mt-1 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          {state.isThinkTime && (
            <div className="flex items-center gap-2 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
              <Info size={18} />
              <span>You have 1 minute to prepare your answer. You can take notes.</span>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="text-emerald-500 font-bold tracking-wider text-sm uppercase">Part 3: Discussion</div>
          <h2 className="text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {state.part3Questions[state.questionIndex]}
          </h2>
          <p className="text-gray-400">Extend your answer with reasons and examples. (45 seconds)</p>
        </div>
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${state.part >= 1 ? 'bg-emerald-500' : 'bg-gray-700'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">P1</span>
          </div>
          <div className="w-12 h-px bg-gray-800" />
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${state.part >= 2 ? 'bg-emerald-500' : 'bg-gray-700'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">P2</span>
          </div>
          <div className="w-12 h-px bg-gray-800" />
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${state.part >= 3 ? 'bg-emerald-500' : 'bg-gray-700'}`} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">P3</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-mono text-xl font-bold">
            <Timer size={20} />
            {formatTime(state.timeLeft)}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${state.part}-${state.questionIndex}-${state.isThinkTime}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="min-h-[400px] flex flex-col justify-between"
        >
          <div>{currentContent()}</div>

          <div className="mt-12 flex items-center justify-between pt-8 border-t border-white/5">
            <div className="flex items-center gap-3">
              {!state.isThinkTime && !state.isFinished && (
                <div className="flex items-center gap-2 text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full text-sm font-bold">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Recording...
                </div>
              )}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-white text-black hover:bg-gray-200 transition-all group"
            >
              {state.isThinkTime ? "Start Speaking" : "Next Question"}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
