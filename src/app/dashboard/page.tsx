import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, BookOpen, Headphones, PenTool, ArrowRight, Flame, 
  Target, Calendar, TrendingUp, Star, Award, Clock, 
  ArrowUpRight, Users, GraduationCap, Zap, Bell, X, Mail,
  Play as PlayIcon, Volume2, Info
} from 'lucide-react';

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

  return (
    <div className="max-w-7xl mx-auto space-y-10 pb-20 pt-24 px-4">
      {/* Hero Welcome Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="relative rounded-[32px] p-8 lg:p-12 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-white/5"
        style={{ background: 'linear-gradient(225deg, #4f46e5 0%, #7c3aed 100%)' }}>
        
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle at 100% 0%, white, transparent 70%)' 
        }} />

        <div className="relative z-10 max-w-xl">
           <div className="flex items-center gap-4 mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10">
                 <Zap size={14} className="text-yellow-300" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">New mock tests available</span>
              </div>
              
              <button 
                onClick={() => setShowMessages(true)}
                className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all border border-white/10"
              >
                 <Bell size={18} className="text-white" />
                 {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center text-white ring-2 ring-indigo-600">
                       {unreadCount}
                    </span>
                 )}
              </button>
           </div>
           <h1 className="text-4xl lg:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to learn, {user?.name?.split(' ')[0] || 'Scholar'}?
           </h1>
           <p className="text-lg text-indigo-100 font-medium opacity-90 leading-relaxed">
              Track your progress, join live sessions, and master the IELTS with our premium CDI simulator.
           </p>
        </div>

        <div className="relative z-10 flex flex-wrap gap-4">
           {/* Metric sections removed as per request to keep it authentic */}
        </div>
      </motion.div>

      {/* Message Modal */}
      <AnimatePresence>
         {showMessages && (
            <>
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMessages(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]" />
               <motion.div initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }} className="fixed top-0 right-0 h-full w-full max-w-md bg-surface z-[101] shadow-2xl border-l border-default">
                  <div className="p-6 flex items-center justify-between border-b border-default">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                           <Bell size={20} className="text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-black text-primary">Notifications</h3>
                     </div>
                     <button onClick={() => setShowMessages(false)} className="p-2 rounded-xl hover:bg-surface-soft transition-colors">
                        <X size={20} className="text-tertiary" />
                     </button>
                  </div>

                  <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-80px)]">
                     {messages.length === 0 ? (
                        <div className="text-center py-20">
                           <Mail size={40} className="text-tertiary mx-auto mb-4 opacity-20" />
                           <p className="text-secondary font-bold">No messages yet</p>
                           <p className="text-xs text-tertiary mt-1">Updates from CEO and Teachers will appear here.</p>
                        </div>
                     ) : (
                        messages.map(msg => (
                           <div key={msg.id} 
                             className={`p-5 rounded-2xl border transition-all ${msg.read ? 'bg-surface border-default' : 'bg-indigo-500/5 border-indigo-500/20'}`}
                             onClick={() => markAsRead(msg.id)}
                           >
                              <div className="flex items-center justify-between mb-3">
                                 <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${msg.from === 'CEO' ? 'bg-amber-500/10 text-amber-500' : 'bg-pink-500/10 text-pink-500'}`}>
                                    Email from {msg.from}
                                 </span>
                                 <span className="text-[10px] text-tertiary">{new Date(msg.timestamp).toLocaleDateString()}</span>
                              </div>
                              <p className="text-sm text-secondary leading-relaxed">{msg.text}</p>
                           </div>
                        ))
                     )}
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
           
           {/* Video Ad Section */}
           <div className="glass-card overflow-hidden border-none shadow-xl">
              <div className="aspect-video relative group">
                 <video 
                   ref={videoRef}
                   src="/dashboard video/ad.mp4" 
                   className="w-full h-full object-cover"
                   loop
                   muted
                   playsInline
                   poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-6">
                    <h4 className="text-white font-black text-xl mb-1">Academy Showcase</h4>
                    <p className="text-white/80 text-xs font-medium">Explore our facilities and teaching methods.</p>
                 </div>
                 <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <div className="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
                       <PlayIcon size={10} fill="white" /> Featured Video
                    </div>
                 </div>
                 <button 
                   onClick={() => {
                     if (videoRef.current) {
                        if (videoRef.current.paused) videoRef.current.play();
                        else videoRef.current.pause();
                     }
                   }}
                   className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                 >
                    <div className="w-16 h-16 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform">
                       <PlayIcon size={24} fill="white" />
                    </div>
                 </button>
              </div>
           </div>

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
