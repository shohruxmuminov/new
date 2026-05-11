'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, BookOpen, Headphones, PenTool, ArrowRight, Flame, 
  Target, Calendar, TrendingUp, Star, Award, Clock, 
  ArrowUpRight, Users, GraduationCap, Zap, Bell, X, Mail,
  Play as PlayIcon, Volume2, Info
} from 'lucide-react';

const modules = [
  { id: 'reading', icon: BookOpen, title: 'Reading', desc: '40 Questions · 60m', href: '/reading', color: '#10b981', progress: 42, band: '7.5' },
  { id: 'listening', icon: Headphones, title: 'Listening', desc: '40 Questions · 30m', href: '/listening', color: '#6366f1', progress: 88, band: '8.0' },
  { id: 'writing', icon: PenTool, title: 'Writing', desc: '2 Tasks · 60m', href: '/writing', color: '#ec4899', progress: 30, band: '6.5' },
  { id: 'speaking', icon: Mic, title: 'Speaking', desc: '3 Parts · 15m', href: '/speaking', color: '#f59e0b', progress: 65, band: '7.0' },
];

export default function DashboardPage() {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('cdi-user');
    if (stored) {
      const userData = JSON.parse(stored);
      setUser(userData);
      
      // Load messages
      const msgs = localStorage.getItem(`cdi-messages-${userData.email}`);
      if (msgs) setMessages(JSON.parse(msgs));
    }
  }, []);

  const markAsRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    if (user) {
      localStorage.setItem(`cdi-messages-${user.email}`, JSON.stringify(updated));
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  retur    <div className="max-w-7xl mx-auto space-y-10 pb-20 pt-24 px-4">
      {/* Hero Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        style={{ background: '#8b5cf6' }}>
        
        <div className="relative z-10 max-w-xl text-white">
           <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black border-2 border-black">
                 <Zap size={14} className="text-yellow-300" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-white">New mock tests available</span>
              </div>
              
              <button 
                onClick={() => setShowMessages(true)}
                className="relative p-2 bg-white border-2 border-black hover:translate-x-0.5 hover:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                 <Bell size={18} className="text-black" />
                 {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full text-[10px] font-bold flex items-center justify-center text-white">
                       {unreadCount}
                    </span>
                 )}
              </button>
           </div>
           <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter uppercase leading-none">
              Ready to learn,<br />{user?.name?.split(' ')[0] || 'Scholar'}?
           </h1>
           <p className="text-lg font-bold opacity-90 leading-tight uppercase">
              Track your progress and master the IELTS with IELTSPRO2.
           </p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Video Ad Section */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Video 1 */}
              <div className="neo-card overflow-hidden">
                 <div className="aspect-video relative group">
                    <video 
                      src="/dashboard video/video-1.mp4" 
                      className="w-full h-full object-cover"
                      loop muted autoPlay playsInline
                    />
                    <div className="absolute top-4 right-4 z-10">
                       <div className="px-3 py-1 bg-black border-2 border-white text-[10px] font-black text-white uppercase tracking-widest">
                          Elite Prep
                       </div>
                    </div>
                 </div>
              </div>

              {/* Video 2 */}
              <div className="neo-card overflow-hidden">
                 <div className="aspect-video relative group">
                    <video 
                      src="/dashboard video/video-2.mp4" 
                      className="w-full h-full object-cover"
                      loop muted autoPlay playsInline
                    />
                    <div className="absolute top-4 right-4 z-10">
                       <div className="px-3 py-1 bg-black border-2 border-white text-[10px] font-black text-white uppercase tracking-widest">
                          Success
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex items-center justify-between">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Practice Modules</h2>
              <Link href="#" className="text-sm font-black uppercase border-b-4 border-black hover:text-purple-600 transition-colors">
                 See All →
              </Link>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {modules.map((mod, i) => (
                <Link key={mod.id} href={mod.href}>
                  <div className="neo-card p-6 flex items-center gap-6 group hover:bg-gray-50">
                     <div className="w-16 h-16 border-4 border-black flex items-center justify-center shrink-0" 
                       style={{ background: mod.color }}>
                        <mod.icon size={28} className="text-white" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                           <h3 className="text-xl font-black uppercase tracking-tighter">{mod.title}</h3>
                           <span className="text-sm font-black px-2 py-0.5 bg-black text-white">{mod.band}</span>
                        </div>
                        <div className="w-full h-4 border-2 border-black bg-white overflow-hidden mt-2">
                           <div className="h-full transition-all duration-500" style={{ width: `${mod.progress}%`, background: mod.color }} />
                        </div>
                     </div>
                  </div>
                </Link>
              ))}
           </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
           <h2 className="text-3xl font-black uppercase tracking-tighter">Your Schedule</h2>
           
           <div className="neo-card p-6 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                 <Calendar size={20} className="text-black" />
                 <span className="text-lg font-black uppercase">Daily Goals</span>
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
                      <div className={`w-6 h-6 border-2 border-black flex items-center justify-center transition-all ${t.done ? 'bg-black text-white' : 'bg-white'}`}>
                         {t.done && <Star size={12} fill="currentColor" />}
                      </div>
                      <span className={`text-sm font-bold uppercase ${t.done ? 'text-gray-400 line-through' : 'text-black'}`}>{t.task}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Community Card */}
           <div className="p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ background: '#0ea5e9' }}>
              <div className="relative z-10">
                 <h4 className="text-2xl font-black text-white uppercase mb-2">Live Workshop</h4>
                 <p className="text-sm text-white font-bold mb-6 uppercase leading-tight">
                    Join Mr. Jurabek for Writing Task 2. Starts in 45 min.
                 </p>
                 <button className="btn-neo w-full justify-center bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Join Live Stream
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
