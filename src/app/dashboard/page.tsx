'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, BookOpen, Headphones, PenTool, ArrowRight, Flame, 
  Target, Calendar, TrendingUp, Star, Award, Clock, 
  ArrowUpRight, Users, GraduationCap, Zap, Bell, X, Mail,
  Play as PlayIcon, Volume2, Info, Send, Phone, Shield
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { 
  collection, query, where, onSnapshot, 
  doc, updateDoc, orderBy 
} from 'firebase/firestore';

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
      
      if (!db) {
        console.warn("Firebase Firestore is not initialized.");
        return;
      }

      // Real-time listener for personal messages and global broadcasts
      const q = query(
        collection(db, 'notifications'), 
        orderBy('timestamp', 'desc')
      );
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allNotifications: any[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          // Filter client-side for simplicity, or use multiple queries
          if (data.to === userData.email.toLowerCase() || data.to === 'all') {
            allNotifications.push({ ...data, id: doc.id });
          }
        });
        setMessages(allNotifications);
      });

      return () => unsubscribe();
    }
  }, []);

  const markAsRead = async (id: string) => {
    try {
      await updateDoc(doc(db, 'notifications', id), { read: true });
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 pt-24 px-4">
      {/* Developer Card - Top Banner */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
        className="w-full p-6 lg:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center gap-6 md:gap-10" 
        style={{ background: '#fed7aa' }}>
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-black overflow-hidden shrink-0 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
             <img src="/avatarceo/Shohrux%203x4.jpg" alt="Shohrux Muminov" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display='none'; e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden'); }} />
             <Users size={48} className="text-black fallback-icon hidden" />
          </div>
          
          <div className="flex-1 text-center md:text-left">
             <h5 className="text-sm font-black text-orange-600 uppercase tracking-[3px] mb-2">Owner & CEO</h5>
             <h3 className="text-3xl lg:text-5xl font-black tracking-tighter text-black uppercase leading-none mb-4">Shohrux Muminov</h3>
             <p className="text-base font-bold text-black/80 leading-tight max-w-xl">
                IELTS Pro asoschisi va platforma yaratuvchisi.
             </p>
          </div>

          <div className="flex flex-col w-full md:w-auto gap-4 shrink-0 mt-4 md:mt-0">
             <a href="https://t.me/M_Shoh_Rukh" target="_blank" rel="noopener noreferrer" className="btn-neo justify-center bg-[#0ea5e9] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm py-3 px-8">
                <Send size={18} /> Telegram kanali
             </a>
             <a href="tel:+998777145526" className="btn-neo justify-center bg-white text-black border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm py-3 px-8">
                <Phone size={18} /> +998 77 714 55 26
             </a>
          </div>
      </motion.div>

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
      {/* Staff Access Section - At the very bottom */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-20 pt-10 border-t-4 border-black flex flex-col items-center gap-6">
         <h4 className="text-xl font-black uppercase tracking-tighter">Staff Access</h4>
         <div className="flex gap-4">
            <Link href="/ceo" className="btn-neo bg-black text-white text-xs px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(139,92,246,1)]">
               <Shield size={16} /> CEO Panel
            </Link>
            <Link href="/teacher" className="btn-neo bg-white text-black text-xs px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <Shield size={16} /> Teacher Panel
            </Link>
         </div>
         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Restricted area. Authorized personnel only.</p>
      </motion.div>
      
      {/* Messages Modal */}
      <AnimatePresence>
        {showMessages && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowMessages(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9, x: 20 }}
              className="fixed inset-y-0 right-0 w-full max-w-md bg-white border-l-4 border-black z-[201] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b-4 border-black flex items-center justify-between bg-indigo-500 text-white">
                <div className="flex items-center gap-3">
                  <Bell size={24} />
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Notifications</h3>
                </div>
                <button onClick={() => setShowMessages(false)} className="p-2 hover:bg-black/10 transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.length === 0 ? (
                  <div className="text-center py-20">
                    <Mail size={48} className="mx-auto text-gray-200 mb-4" />
                    <p className="text-gray-400 font-bold uppercase">No messages yet</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all ${msg.read ? 'bg-white' : 'bg-indigo-50 shadow-[6px_6px_0px_0px_rgba(99,102,241,1)]'}`}
                      onClick={() => markAsRead(msg.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black ${msg.isGlobal ? 'bg-yellow-300 text-black' : 'bg-black text-white'}`}>
                          {msg.isGlobal ? 'Global Update' : 'Direct Message'}
                        </span>
                        <span className="text-[10px] font-bold text-gray-400">
                          {new Date(msg.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <h4 className="font-black text-lg uppercase tracking-tighter mb-2">From: {msg.from}</h4>
                      <p className="text-sm font-bold leading-tight text-gray-700 whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>
              
              <div className="p-6 bg-gray-50 border-t-4 border-black">
                <button 
                  onClick={() => setShowMessages(false)}
                  className="btn-neo w-full justify-center bg-black text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Close Panel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
