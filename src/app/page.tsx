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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}>
          {/* Decorative orbs */}
          <div
            className="absolute w-96 h-96 rounded-full animate-float opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.4), transparent)', top: '10%', right: '10%' }}
          />
          <div
            className="absolute w-72 h-72 rounded-full animate-float-delayed opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.4), transparent)', bottom: '20%', left: '5%' }}
          />
          <div
            className="absolute w-48 h-48 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)',
              top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              animation: 'float 8s ease-in-out infinite',
            }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }} />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
              style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Zap size={14} className="text-yellow-400" />
              <span className="text-white/80 text-sm font-medium">Real IELTS Preparation Materials</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            Master Your{' '}
            <span className="relative inline-block">
              IELTS CDI
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 100 2 150 6C200 10 250 4 298 8" stroke="rgba(250,204,21,0.6)" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            <span className="text-white/70">With Confidence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Practice Speaking, Reading, Listening, and Writing with exam-style questions, 
            timed tests, and instant scoring. Your premium path to a high band score.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/dashboard"
              className="group flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300"
              style={{
                background: 'white',
                color: '#4f46e5',
                boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
              }}
            >
              <Play size={18} />
              Start Practice
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="#modules"
              className="flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300"
              style={{
                background: 'rgba(255,255,255,0.1)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Explore Modules
            </Link>
          </motion.div>

          {/* Floating badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-16 flex items-center justify-center gap-6 flex-wrap"
          >
            {['Speaking', 'Reading', 'Listening', 'Writing'].map((mod, i) => (
              <div
                key={mod}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/70"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <CheckCircle size={14} className="text-green-400" />
                {mod}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-white/40" />
        </motion.div>
      </section>

      {/* ===== MODULES ===== */}
      <Section id="modules">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3 gradient-text">Practice Modules</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Four Pillars of IELTS Mastery
          </h2>
          <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Comprehensive practice materials designed to help you excel in every section of the IELTS CDI exam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod, i) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={mod.href} className="block glass-card p-8 group cursor-pointer">
                <div className="flex items-start gap-5">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: mod.bg, color: mod.color }}
                  >
                    <mod.icon size={26} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {mod.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {mod.features.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 rounded-lg text-xs font-medium"
                          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ArrowRight
                    size={18}
                    className="mt-1 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: 'var(--text-tertiary)' }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== STATS ===== */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: 'var(--gradient-card)', color: '#6366f1' }}
                >
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <Section>
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3 gradient-text">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Three Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-[16.5%] right-[16.5%] h-0.5"
            style={{ background: 'var(--gradient-primary)', opacity: 0.2 }} />

          {[
            { num: '01', title: 'Choose Your Module', desc: 'Select from Speaking, Reading, Listening, or Writing based on your study plan.', icon: Zap },
            { num: '02', title: 'Practice & Test', desc: 'Complete timed practice tests with real exam-style questions and materials.', icon: Clock },
            { num: '03', title: 'Review & Improve', desc: 'Get instant scores, review explanations, and track your progress over time.', icon: TrendingUp },
          ].map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10"
                style={{ background: 'var(--gradient-primary)', color: 'white', boxShadow: 'var(--shadow-glow)' }}
              >
                <step.icon size={24} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container-narrow">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-wider mb-3 gradient-text">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Loved by Students Worldwide
            </h2>
          </div>

          {testimonials.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card p-6"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{t.name}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {t.country} · Band {t.score}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <Section>
        <div className="text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-wider mb-3 gradient-text">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card overflow-hidden"
              style={{ cursor: 'pointer' }}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5">
                <h3 className="text-sm font-semibold pr-4" style={{ color: 'var(--text-primary)' }}>
                  {faq.q}
                </h3>
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform duration-300"
                  style={{
                    color: 'var(--text-tertiary)',
                    transform: openFaq === i ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </div>
              <motion.div
                initial={false}
                animate={{ height: openFaq === i ? 'auto' : 0, opacity: openFaq === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {faq.a}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ===== CTA ===== */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'var(--gradient-hero)' }}>
          <div className="absolute w-96 h-96 rounded-full animate-float opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3), transparent)', top: '-10%', right: '-5%' }} />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Ace Your IELTS CDI?
          </h2>
          <p className="text-white/60 text-base mb-8">
            Join thousands of students already preparing with CDI Prep. Start your journey to a high band score today.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all duration-300"
            style={{ background: 'white', color: '#4f46e5', boxShadow: '0 8px 30px rgba(0,0,0,0.15)' }}
          >
            <Play size={18} />
            Get Started — It&apos;s Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
