'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, MessageSquare, Ban, Unlock, Send, 
  Search, Lock, LogOut, Mail, Clock, Calendar, CheckCircle, 
  AlertTriangle, Filter, ChevronRight, X
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const CEO_CODE = '2010';
const CEO_AUTH_KEY = 'cdi-ceo-auth';
const ALL_USERS_KEY = 'cdi-all-users';
const BANNED_USERS_KEY = 'cdi-banned-users';
const MESSAGES_KEY_PREFIX = 'cdi-messages-';

interface Student {
  email: string;
  name: string;
  registeredAt: number;
  lastLogin?: number;
}

export default function CEOPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  
  const [students, setStudents] = useState<Student[]>([]);
  const [bannedEmails, setBannedEmails] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'broadcast'>('students');
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [messageText, setMessageText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem(CEO_AUTH_KEY);
    if (auth === 'true') setAuthenticated(true);
    
    // Load students
    const savedUsers = localStorage.getItem(ALL_USERS_KEY);
    if (savedUsers) setStudents(JSON.parse(savedUsers));
    
    // Load banned
    const savedBanned = localStorage.getItem(BANNED_USERS_KEY);
    if (savedBanned) setBannedEmails(JSON.parse(savedBanned));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === CEO_CODE) {
      sessionStorage.setItem(CEO_AUTH_KEY, 'true');
      setAuthenticated(true);
      toast.success('Welcome, CEO!');
    } else {
      setCodeError(true);
      setCode('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(CEO_AUTH_KEY);
    setAuthenticated(false);
  };

  const toggleBan = (email: string) => {
    let newBanned;
    if (bannedEmails.includes(email)) {
      newBanned = bannedEmails.filter(e => e !== email);
      toast.success('User unbanned');
    } else {
      newBanned = [...bannedEmails, email];
      toast.error('User banned');
    }
    setBannedEmails(newBanned);
    localStorage.setItem(BANNED_USERS_KEY, JSON.stringify(newBanned));
  };

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !messageText.trim()) return;
    
    setSending(true);
    setTimeout(() => {
      const key = `${MESSAGES_KEY_PREFIX}${selectedStudent.email}`;
      const savedMessages = JSON.parse(localStorage.getItem(key) || '[]');
      
      const newMessage = {
        id: `msg-${Date.now()}`,
        from: 'CEO',
        text: messageText,
        timestamp: Date.now(),
        read: false
      };
      
      localStorage.setItem(key, JSON.stringify([newMessage, ...savedMessages]));
      
      toast.success('Message sent to student dashboard');
      setMessageText('');
      setSelectedStudent(null);
      setSending(false);
    }, 800);
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
          <div className="glass-card p-10 text-center">
            <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-8">
              <Shield size={36} className="text-indigo-400" />
            </div>
            <h1 className="text-2xl font-black text-primary mb-2">CEO Admin Panel</h1>
            <p className="text-sm text-secondary mb-8">Restricted Access. Enter Code to Continue.</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" />
                <input
                  type="password"
                  value={code}
                  onChange={e => { setCode(e.target.value); setCodeError(false); }}
                  placeholder="CEO Access Code"
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl text-sm outline-none border-2 transition-all
                    ${codeError ? 'border-red-500 bg-red-500/5' : 'border-transparent focus:border-indigo-500/50 bg-secondary'}`}
                  style={{ color: 'var(--text-primary)' }}
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center py-4 text-sm font-black uppercase tracking-widest">
                <Shield size={16} /> Enter Panel
              </button>
            </form>
            <Link href="/" className="text-xs text-tertiary hover:text-secondary mt-6 inline-block font-bold">← Back to Site</Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Shield size={24} className="text-indigo-400" />
              </div>
              <h1 className="text-3xl font-black text-primary">CEO Master Control</h1>
            </div>
            <p className="text-secondary text-sm font-medium">Manage students, communication, and platform security</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="glass-card px-4 py-2 flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">System Online</span>
             </div>
             <button onClick={handleLogout} className="p-3 rounded-2xl bg-surface border border-default text-tertiary hover:text-red-500 transition-colors">
                <LogOut size={20} />
             </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
           {[
             { label: 'Total Students', value: students.length, icon: Users, color: 'text-indigo-400' },
             { label: 'Active Today', value: students.filter(s => s.lastLogin && Date.now() - s.lastLogin < 86400000).length, icon: Clock, color: 'text-emerald-400' },
             { label: 'Banned Accounts', value: bannedEmails.length, icon: Ban, color: 'text-red-400' },
           ].map(stat => (
             <div key={stat.label} className="glass-card p-6 flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-surface-soft flex items-center justify-center shrink-0">
                   <stat.icon size={24} className={stat.color} />
                </div>
                <div>
                   <p className="text-2xl font-black text-primary">{stat.value}</p>
                   <p className="text-xs font-bold text-tertiary uppercase tracking-widest">{stat.label}</p>
                </div>
             </div>
           ))}
        </div>

        {/* Main Content */}
        <div className="glass-card overflow-hidden">
           <div className="flex border-b border-default">
              <button onClick={() => setActiveTab('students')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'students' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-tertiary hover:text-secondary'}`}>
                 Student Directory
              </button>
              <button onClick={() => setActiveTab('broadcast')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'broadcast' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-tertiary hover:text-secondary'}`}>
                 System Broadcast
              </button>
           </div>

           <div className="p-6">
              {activeTab === 'students' ? (
                 <div className="space-y-6">
                    <div className="relative">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-tertiary" size={18} />
                       <input 
                         type="text" 
                         placeholder="Search students by name or email..." 
                         value={searchTerm}
                         onChange={e => setSearchTerm(e.target.value)}
                         className="w-full pl-12 pr-4 py-4 rounded-2xl bg-secondary border border-default outline-none text-sm focus:border-indigo-500/50 transition-all"
                         style={{ color: 'var(--text-primary)' }}
                       />
                    </div>

                    <div className="overflow-x-auto">
                       <table className="w-full text-left">
                          <thead>
                             <tr className="text-[10px] font-black text-tertiary uppercase tracking-widest border-b border-default">
                                <th className="pb-4 px-4">Student</th>
                                <th className="pb-4 px-4">Status</th>
                                <th className="pb-4 px-4">Registered</th>
                                <th className="pb-4 px-4">Last Activity</th>
                                <th className="pb-4 px-4 text-right">Actions</th>
                             </tr>
                          </thead>
                          <tbody className="divide-y divide-default">
                             {filteredStudents.map(student => {
                                const isBanned = bannedEmails.includes(student.email);
                                return (
                                   <tr key={student.email} className="group hover:bg-surface-soft transition-colors">
                                      <td className="py-4 px-4">
                                         <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-xs">
                                               {student.name.charAt(0)}
                                            </div>
                                            <div>
                                               <p className="text-sm font-bold text-primary">{student.name}</p>
                                               <p className="text-[10px] text-tertiary">{student.email}</p>
                                            </div>
                                         </div>
                                      </td>
                                      <td className="py-4 px-4">
                                         <span className={`text-[10px] font-black px-2 py-1 rounded-lg uppercase ${isBanned ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                            {isBanned ? 'Banned' : 'Active'}
                                         </span>
                                      </td>
                                      <td className="py-4 px-4">
                                         <p className="text-xs text-secondary">{new Date(student.registeredAt).toLocaleDateString()}</p>
                                      </td>
                                      <td className="py-4 px-4">
                                         <p className="text-xs text-secondary">{student.lastLogin ? new Date(student.lastLogin).toLocaleDateString() : 'Never'}</p>
                                      </td>
                                      <td className="py-4 px-4 text-right">
                                         <div className="flex items-center justify-end gap-2">
                                            <button 
                                              onClick={() => setSelectedStudent(student)}
                                              className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all" 
                                              title="Send Message"
                                            >
                                               <MessageSquare size={16} />
                                            </button>
                                            <button 
                                              onClick={() => toggleBan(student.email)}
                                              className={`p-2 rounded-xl transition-all ${isBanned ? 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white' : 'bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white'}`}
                                              title={isBanned ? 'Unban User' : 'Ban User'}
                                            >
                                               {isBanned ? <Unlock size={16} /> : <Ban size={16} />}
                                            </button>
                                         </div>
                                      </td>
                                   </tr>
                                );
                             })}
                             {filteredStudents.length === 0 && (
                               <tr>
                                  <td colSpan={5} className="py-10 text-center text-tertiary text-sm italic">No students found matching your search.</td>
                               </tr>
                             )}
                          </tbody>
                       </table>
                    </div>
                 </div>
              ) : (
                 <div className="p-10 text-center space-y-6">
                    <div className="w-16 h-16 rounded-3xl bg-amber-500/10 flex items-center justify-center mx-auto">
                       <AlertTriangle size={32} className="text-amber-500" />
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-primary mb-2">Broadcast System</h3>
                       <p className="text-secondary text-sm max-w-md mx-auto">Send a notification to ALL registered students. Use this for maintenance alerts, new feature announcements, or global updates.</p>
                    </div>
                    <div className="max-w-xl mx-auto space-y-4">
                       <textarea 
                         placeholder="Type broadcast message here..." 
                         className="w-full h-32 p-4 rounded-2xl bg-secondary border border-default outline-none text-sm resize-none focus:border-indigo-500/50"
                         style={{ color: 'var(--text-primary)' }}
                       />
                       <button className="btn-primary w-full justify-center py-4 font-black uppercase tracking-widest">
                          <Send size={18} /> Send to All Students
                       </button>
                    </div>
                 </div>
              )}
           </div>
        </div>
      </div>

      {/* Message Modal */}
      <AnimatePresence>
         {selectedStudent && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setSelectedStudent(null)}
                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
               >
                  <div className="glass-card w-full max-w-md p-8 pointer-events-auto shadow-2xl">
                     <div className="flex items-center justify-between mb-6">
                        <div>
                           <h3 className="text-xl font-black text-primary">Send Direct Email</h3>
                           <p className="text-xs text-tertiary mt-1">Messaging: <span className="text-indigo-400 font-bold">{selectedStudent.name}</span></p>
                        </div>
                        <button onClick={() => setSelectedStudent(null)} className="p-2 rounded-xl hover:bg-surface-soft transition-colors">
                           <X size={20} className="text-tertiary" />
                        </button>
                     </div>

                     <form onSubmit={sendMessage} className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Message Content</label>
                           <textarea 
                             autoFocus
                             required
                             value={messageText}
                             onChange={e => setMessageText(e.target.value)}
                             placeholder="Write your email from CEO here..."
                             className="w-full h-40 p-4 rounded-2xl bg-secondary border border-default outline-none text-sm resize-none focus:border-indigo-500/50"
                             style={{ color: 'var(--text-primary)' }}
                           />
                        </div>
                        <button 
                          type="submit" 
                          disabled={sending}
                          className="btn-primary w-full justify-center py-4 font-black uppercase tracking-widest"
                        >
                           {sending ? 'Sending...' : <><Send size={18} /> Send Message</>}
                        </button>
                     </form>
                  </div>
               </motion.div>
            </>
         )}
      </AnimatePresence>
    </div>
  );
}
