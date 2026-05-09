'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mic, BookOpen, Headphones, PenTool, ArrowRight, Flame, 
  Target, Calendar, TrendingUp, Star, Award, Clock, 
  ArrowUpRight, Users, GraduationCap, Zap
} from 'lucide-react';

const modules = [
  { id: 'reading', icon: BookOpen, title: 'Reading', desc: '40 Questions · 60m', href: '/reading', color: '#10b981', progress: 42, band: '7.5' },
  { id: 'listening', icon: Headphones, title: 'Listening', desc: '40 Questions · 30m', href: '/listening', color: '#6366f1', progress: 88, band: '8.0' },
  { id: 'writing', icon: PenTool, title: 'Writing', desc: '2 Tasks · 60m', href: '/writing', color: '#ec4899', progress: 30, band: '6.5' },
  { id: 'speaking', icon: Mic, title: 'Speaking', desc: '3 Parts · 15m', href: '/speaking', color: '#f59e0b', progress: 65, band: '7.0' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cdi-user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20">
      {/* Hero Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[32px] p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-white/5"
        style={{ background: 'linear-gradient(225deg, #4f46e5 0%, #7c3aed 100%)' }}>
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle at 100% 0%, white, transparent 70%)' 
        }} />

        <div className="relative z-10 max-w-xl">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-6">
              <Zap size={14} className="text-yellow-300" />
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">New mock tests available</span>
           </div>
           <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to learn, {user?.name?.split(' ')[0] || 'Scholar'}?
           </h1>
           <p className="text-lg text-indigo-100 font-medium opacity-90 leading-relaxed">
              Track your progress, join live sessions, and master the IELTS with our premium CDI simulator.
           </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4">
           <div className="glass-card bg-white/5 border-white/10 p-5 min-w-[140px]">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Students</p>
              <div className="flex items-center gap-2">
                 <Users size={18} className="text-white" />
                 <span className="text-2xl font-black text-white">824+</span>
              </div>
           </div>
           <div className="glass-card bg-white/5 border-white/10 p-5 min-w-[140px]">
              <p className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mb-1">Target Band</p>
              <div className="flex items-center gap-2">
                 <Target size={18} className="text-white" />
                 <span className="text-2xl font-black text-white">8.5</span>
              </div>
           </div>
        </div>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Estimated Band', value: '7.5', trend: '+0.5', icon: GraduationCap, color: '#6366f1' },
           { label: 'Completed Tests', value: '14', trend: '+3', icon: Award, color: '#10b981' },
           { label: 'Study Streak', value: '5 Days', trend: '🔥', icon: Flame, color: '#f59e0b' },
           { label: 'Practice Time', value: '12.4h', trend: '+2.1h', icon: Clock, color: '#ec4899' },
         ].map((stat, i) => (
           <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}
             className="glass-card p-6 border-none">
              <div className="flex items-center justify-between mb-4">
                 <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15`, color: stat.color }}>
                    <stat.icon size={20} />
                 </div>
                 <span className="text-[10px] font-bold px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/10">
                    {stat.trend}
                 </span>
              </div>
              <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-2xl font-black text-primary">{stat.value}</h4>
           </motion.div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Modules */}
        <div className="lg:col-span-2 space-y-8">
           <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-primary tracking-tight">Practice Modules</h2>
              <Link href="#" className="text-sm font-bold text-indigo-500 hover:text-indigo-400 flex items-center gap-1 group">
                 See All <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {modules.map((mod, i) => (
                <Link key={mod.id} href={mod.href}>
                  <motion.div whileHover={{ y: -5 }} className="glass-card p-6 flex items-center gap-6 group">
                     <div className="w-16 h-16 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-black/20" 
                       style={{ background: `linear-gradient(135deg, ${mod.color}20, ${mod.color}10)`, color: mod.color }}>
                        <mod.icon size={28} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h3 className="text-lg font-bold text-primary group-hover:text-indigo-500 transition-colors">{mod.title}</h3>
                           <span className="text-xs font-black" style={{ color: mod.color }}>{mod.band}</span>
                        </div>
                        <p className="text-xs text-tertiary mb-4">{mod.desc}</p>
                        <div className="w-full h-1.5 rounded-full bg-surface-soft overflow-hidden">
                           <div className="h-full rounded-full transition-all duration-500" style={{ width: `${mod.progress}%`, background: mod.color }} />
                        </div>
                     </div>
                  </motion.div>
                </Link>
              ))}
           </div>

           {/* Performance Insights */}
           <div className="glass-card p-8 border-none" style={{ background: 'var(--bg-secondary)' }}>
              <div className="flex items-center justify-between mb-8">
                 <div>
                    <h3 className="text-lg font-bold text-primary">Performance Insights</h3>
                    <p className="text-xs text-tertiary mt-1">Based on your last 10 practice sessions</p>
                 </div>
                 <button className="text-xs font-bold px-4 py-2 rounded-xl bg-surface border border-default">Detailed Report</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Vocabulary Range', val: 78, color: '#6366f1' },
                   { label: 'Grammar Accuracy', val: 62, color: '#ec4899' },
                   { label: 'Test Endurance', val: 92, color: '#10b981' },
                 ].map(item => (
                   <div key={item.label} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-secondary">
                         <span>{item.label}</span>
                         <span>{item.val}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-soft overflow-hidden">
                         <div className="h-full rounded-full" style={{ width: `${item.val}%`, background: item.color }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           <h2 className="text-2xl font-black text-primary tracking-tight">Your Schedule</h2>
           
           <div className="glass-card p-6 space-y-6 border-none">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-indigo-500" />
                    <span className="text-sm font-bold text-primary">Daily Goals</span>
                 </div>
                 <span className="text-[10px] font-bold text-tertiary uppercase">3/5 Done</span>
              </div>

              <div className="space-y-4">
                 {[
                   { task: 'Complete Reading Passage 1', done: true },
                   { task: 'Watch Speaking Part 2 Tips', done: true },
                   { task: 'Practice Listening Section 4', done: true },
                   { task: 'Draft Task 1 Response', done: false },
                   { task: 'Review Vocabulary List', done: false },
                 ].map((t, i) => (
                   <div key={i} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${t.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-default bg-surface'}`}>
                         {t.done && <Star size={10} fill="currentColor" />}
                      </div>
                      <span className={`text-sm font-medium ${t.done ? 'text-tertiary line-through' : 'text-secondary'}`}>{t.task}</span>
                   </div>
                 ))}
              </div>

              <button className="w-full py-3 rounded-xl bg-surface border border-indigo-500/20 text-indigo-500 text-xs font-bold hover:bg-indigo-500/10 transition-all">
                 + Add New Goal
              </button>
           </div>

           {/* Community Card */}
           <div className="rounded-3xl p-6 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)' }}>
              <div className="absolute top-0 right-0 p-4 opacity-20">
                 <Users size={80} className="text-white" />
              </div>
              <div className="relative z-10">
                 <h4 className="text-xl font-black text-white mb-2">Live Workshop</h4>
                 <p className="text-xs text-orange-50 font-medium mb-6 opacity-90 leading-relaxed">
                    Join Mr. Jurabek for a deep dive into Writing Task 2. Starts in 45 minutes.
                 </p>
                 <button className="w-full py-3 rounded-xl bg-white text-orange-600 text-xs font-black shadow-lg shadow-black/10 hover:scale-[1.02] transition-all">
                    Join Live Stream
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
