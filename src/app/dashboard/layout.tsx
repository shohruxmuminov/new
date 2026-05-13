'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Headphones, PenTool, Mic,
  History, Bookmark, Settings, LogOut, Search,
  Bell, User, HelpCircle, Timer, BarChart2, Home,
  ChevronRight, X, Play, Square, RotateCcw, Sparkles
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [showFocusMode, setShowFocusMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('cdi-user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert('Focus session complete!');
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: BookOpen, label: 'Reading', href: '/reading' },
    { icon: Headphones, label: 'Listening', href: '/listening' },
    { icon: PenTool, label: 'Writing', href: '/writing' },
    { icon: Mic, label: 'Speaking', href: '/speaking' },
    { icon: Sparkles, label: 'Chat AI', href: '/dashboard/chat' },
    { icon: BarChart2, label: 'Analytics', href: '/dashboard/history' },
    { icon: Bookmark, label: 'Bookmarks', href: '/dashboard/bookmarks' },
    { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
  ];

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const rs = s % 60;
    return `${m}:${rs < 10 ? '0' : ''}${rs}`;
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      {/* Slim Sidebar */}
      <aside className="w-20 lg:w-24 flex flex-col items-center py-8 border-r shrink-0 z-50" 
        style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-default)' }}>
        
        <Link href="/" className="mb-10">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-500/20">
            C
          </div>
        </Link>

        <div className="flex-1 flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.label} href={item.href} title={item.label}>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all relative group`}
                  style={{ 
                    background: isActive ? 'var(--gradient-primary)' : 'transparent',
                    color: isActive ? 'white' : 'var(--text-tertiary)'
                  }}
                >
                  <item.icon size={22} />
                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Profile / Bottom actions */}
        <div className="mt-auto flex flex-col gap-4 items-center">
           <button onClick={() => setShowFocusMode(true)} className="w-12 h-12 rounded-2xl flex items-center justify-center transition-all hover:bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
              <Timer size={22} />
           </button>
           <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold border border-white/5 cursor-pointer hover:border-white/20 transition-all">
              {user?.name?.[0].toUpperCase() || 'U'}
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header (Cleaner) */}
        <header className="h-16 flex items-center justify-between px-8 border-b shrink-0 z-40 bg-surface" style={{ borderColor: 'var(--border-default)' }}>
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-tertiary" />
                <input type="text" placeholder="Global search..." 
                  className="w-full pl-10 pr-4 py-2 rounded-xl text-sm outline-none bg-secondary border border-transparent focus:border-indigo-500/20 text-primary transition-all" />
             </div>
          </div>

          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Server Live</span>
             </div>
             <button className="relative text-secondary hover:text-primary transition-colors">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full border-2 border-surface" />
             </button>
             <button onClick={() => { localStorage.removeItem('cdi-user'); window.location.href = '/'; }} className="text-xs font-bold text-red-500 hover:text-red-400">
                Sign Out
             </button>
          </div>
        </header>

        {/* Viewport */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
           {children}
        </main>

        {/* Focus Mode Overlay */}
        <AnimatePresence>
          {showFocusMode && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-xl">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="w-full max-w-md glass-card p-10 text-center relative">
                <button onClick={() => setShowFocusMode(false)} className="absolute top-6 right-6 text-tertiary hover:text-primary">
                  <X size={24} />
                </button>
                
                <h2 className="text-3xl font-black mb-2 gradient-text">Focus Mode</h2>
                <p className="text-sm text-secondary mb-10">Minimize distractions and master your IELTS goals.</p>

                <div className="text-7xl font-black mb-10 tracking-tighter tabular-nums" style={{ color: 'var(--text-primary)' }}>
                   {formatTime(timeLeft)}
                </div>

                <div className="flex items-center justify-center gap-4">
                   {!isActive ? (
                     <button onClick={() => setIsActive(true)} className="btn-primary px-8 py-4 text-lg">
                       <Play size={20} /> Start Session
                     </button>
                   ) : (
                     <button onClick={() => setIsActive(false)} className="btn-secondary px-8 py-4 text-lg bg-red-500/10 border-red-500/20 text-red-500">
                       <Square size={20} /> Pause
                     </button>
                   )}
                   <button onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="p-4 rounded-2xl bg-secondary border border-default hover:border-hover transition-all">
                      <RotateCcw size={24} />
                   </button>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4">
                   <button onClick={() => setTimeLeft(15 * 60)} className="text-xs font-bold py-2 rounded-lg bg-surface border border-default">Short (15m)</button>
                   <button onClick={() => setTimeLeft(45 * 60)} className="text-xs font-bold py-2 rounded-lg bg-surface border border-default">Deep (45m)</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
