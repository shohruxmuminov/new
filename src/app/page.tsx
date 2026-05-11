'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import {
  Mic, BookOpen, Headphones, PenTool, ArrowRight, Play,
  Users, Award, Globe, TrendingUp, ChevronDown, Star,
  CheckCircle, Zap, Shield, Clock
} from 'lucide-react';

// ===== ANIMATED COUNTER =====
function Counter({ end, suffix = '', duration = 2 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

// ===== SECTION WRAPPER =====
function Section({ children, className = '', id }: { children: React.ReactNode; className?: string; id?: string }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`section-padding ${className}`}
    >
      <div className="container-narrow">{children}</div>
    </motion.section>
  );
}

// ===== MODULES DATA =====
const modules = [
  {
    icon: Mic,
    title: 'Speaking',
    desc: 'Practice with real exam questions, timed sessions, cue cards, and audio recording.',
    href: '/speaking',
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(245,158,11,0.02))',
    features: ['Practice Questions', 'Mock Tests', 'Cue Cards', 'Audio Recording'],
  },
  {
    icon: BookOpen,
    title: 'Reading',
    desc: 'IELTS CDI-style passages with multiple question types and instant scoring.',
    href: '/reading',
    color: '#10b981',
    bg: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(16,185,129,0.02))',
    features: ['Timed Tests', 'Multiple Choice', 'True/False/NG', 'Explanations'],
  },
  {
    icon: Headphones,
    title: 'Listening',
    desc: 'Audio-based practice with fill-in-the-blank, MCQs, and auto-scoring.',
    href: '/listening',
    color: '#6366f1',
    bg: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(99,102,241,0.02))',
    features: ['Audio Player', 'Fill-in-Blanks', 'MCQ Tasks', 'Auto Scoring'],
  },
  {
    icon: PenTool,
    title: 'Writing',
    desc: 'Essay practice with word counter, templates, sample essays, and draft saving.',
    href: '/writing',
    color: '#ec4899',
    bg: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(236,72,153,0.02))',
    features: ['Task 1 & 2', 'Templates', 'Sample Essays', 'Word Counter'],
  },
];

const stats = [
  { icon: Award, value: 100, suffix: '%', label: 'Real Materials' },
  { icon: Globe, value: 1, suffix: '', label: 'Global Standard' },
  { icon: TrendingUp, value: 0, suffix: '', label: 'Practice Daily' },
];


const testimonials: any[] = [];


const faqs = [
  {
    q: 'What is IELTS CDI and how is it different from regular IELTS?',
    a: 'IELTS CDI (Computer-Delivered IELTS) is the computer-based version of the IELTS test. The test content and scoring are the same, but the format uses a computer instead of paper. Our platform focuses specifically on CDI-style preparation.',
  },
  {
    q: 'Is CDI Prep free to use?',
    a: 'CDI Prep offers a generous free tier with access to practice questions across all modules. Premium features include additional mock tests, detailed analytics, and advanced practice materials.',
  },
  {
    q: 'How are my practice tests scored?',
    a: 'Reading and Listening tests are auto-scored instantly after submission. You receive your raw score, estimated band score, and detailed explanations for each answer.',
  },
  {
    q: 'Can I save my progress?',
    a: 'Yes! Create a free account to save your progress, bookmark favorite tasks, view test history, and save writing drafts. Your data syncs across devices.',
  },
  {
    q: 'What devices can I use CDI Prep on?',
    a: 'CDI Prep is fully responsive and works beautifully on desktops, tablets, and mobile phones. We recommend using a desktop for the best experience during timed tests.',
  },
];

// ===== LANDING PAGE =====
export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950">
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-1 border-2 border-black bg-yellow-300 font-black text-xs uppercase tracking-widest mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              #1 IELTS SIMULATOR IN UZBEKISTAN
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl sm:text-7xl md:text-9xl font-black leading-[0.85] mb-8 tracking-tighter uppercase italic"
          >
            BECOME <span className="text-purple-600">IELTS</span><br />
            <span className="text-black dark:text-white">PRO WITH I2</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-xl md:text-2xl font-bold max-w-3xl mx-auto mb-12 uppercase leading-tight"
          >
            The ultimate Computer-Delivered IELTS experience. Real tests, instant scoring, and expert materials.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/dashboard" className="btn-neo bg-purple-600 text-white text-xl px-10 py-5 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1">
              START PRACTICE NOW
            </Link>
            <Link href="#modules" className="btn-neo bg-white text-black text-xl px-10 py-5 border-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              EXPLORE MODULES
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== MODULES ===== */}
      <section id="modules" className="py-32 bg-gray-50 dark:bg-slate-900 border-y-8 border-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-6">
              FOUR PILLARS OF<br /><span className="text-purple-600">IELTS MASTERY</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {modules.map((mod, i) => (
              <motion.div key={mod.title} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <Link href={mod.href} className="neo-card p-10 block group bg-white hover:bg-purple-50">
                  <div className="flex items-start gap-8">
                    <div className="w-20 h-20 border-4 border-black flex items-center justify-center shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                      style={{ background: mod.color }}>
                      <mod.icon size={40} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 group-hover:text-purple-600 transition-colors">
                        {mod.title}
                      </h3>
                      <p className="text-lg font-bold text-gray-600 mb-6 uppercase leading-snug">
                        {mod.desc}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {mod.features.map(f => (
                          <span key={f} className="px-3 py-1 border-2 border-black font-black text-xs uppercase bg-gray-100">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-40 bg-purple-600 text-white text-center border-b-8 border-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
            READY TO ACE<br />YOUR EXAM?
          </h2>
          <p className="text-2xl font-bold mb-12 uppercase italic">
            Join 10,000+ students already using IELTSPRO2 to achieve Band 8.0+
          </p>
          <Link href="/dashboard" className="btn-neo bg-black text-white text-2xl px-12 py-6 border-4 shadow-[10px_10px_0px_0px_rgba(255,255,255,1)]">
            GET STARTED — IT&apos;S FREE
          </Link>
        </div>
      </section>
    </>
  );
}
