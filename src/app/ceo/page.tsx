'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Users, MessageSquare, Ban, Unlock, Send, 
  Search, Lock, LogOut, Clock, 
  AlertTriangle, X, Film, Upload, Plus, Trash2, Video, Headphones, HelpCircle
} from 'lucide-react';
import { Movie } from '@/types/movie';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { db } from '@/lib/firebase';
import { 
  collection, onSnapshot, doc, updateDoc, 
  setDoc, deleteDoc, query, orderBy, serverTimestamp 
} from 'firebase/firestore';

const CEO_CODE = '2010';
const CEO_AUTH_KEY = 'cdi-ceo-auth';
const ALL_USERS_KEY = 'cdi-all-users';
const BANNED_USERS_KEY = 'cdi-banned-users';
const MESSAGES_KEY_PREFIX = 'cdi-messages-';
const MOVIES_KEY = 'cdi-movies';
const PUBLISHED_TESTS_KEY = 'cdi-published-tests';
import { mockTests } from '@/data/mock-test-data';

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
  const [activeTab, setActiveTab] = useState<'students' | 'broadcast' | 'movies' | 'mock-tests'>('students');
  const [publishedTests, setPublishedTests] = useState<string[]>([]);
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [newMovie, setNewMovie] = useState<Partial<Movie>>({
    category: 'Film'
  });
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [messageText, setMessageText] = useState('');
  const [broadcastText, setBroadcastText] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem(CEO_AUTH_KEY);
    if (auth === 'true') setAuthenticated(true);
    
    // Real-time listener for users
    const q = query(collection(db, 'users'), orderBy('registeredAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersList: Student[] = [];
      snapshot.forEach((doc) => {
        usersList.push(doc.data() as Student);
      });
      setStudents(usersList);
      
      // Update banned emails list based on Firestore data
      const banned = usersList.filter(u => (u as any).status === 'banned').map(u => u.email);
      setBannedEmails(banned);
    });

    // Load movies
    const savedMovies = localStorage.getItem(MOVIES_KEY);
    if (savedMovies) setMovies(JSON.parse(savedMovies));

    // Real-time listener for published tests (Global config)
    const testUnsub = onSnapshot(doc(db, 'config', 'published-tests'), (doc) => {
      if (doc.exists()) {
        setPublishedTests(doc.data().ids || []);
      }
    });

    return () => {
      unsubscribe();
      testUnsub();
    };
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

  const toggleBan = async (email: string) => {
    const isBanned = bannedEmails.includes(email);
    try {
      await updateDoc(doc(db, 'users', email.toLowerCase()), {
        status: isBanned ? 'active' : 'banned'
      });
      toast.success(isBanned ? 'User unbanned' : 'User banned');
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !messageText.trim()) return;
    
    setSending(true);
    try {
      const notification = {
        id: `msg-${Date.now()}`,
        from: 'CEO',
        to: selectedStudent.email.toLowerCase(),
        text: messageText,
        timestamp: Date.now(),
        read: false,
        isGlobal: false
      };
      
      await setDoc(doc(db, 'notifications', notification.id), notification);
      
      toast.success('Message sent to student dashboard');
      setMessageText('');
      setSelectedStudent(null);
    } catch (err) {
      toast.error('Failed to send message');
    }
    setSending(false);
  };
  
  const sendBroadcast = async () => {
    if (!broadcastText.trim()) return;
    setSending(true);
    
    try {
      const broadcast = {
        id: `bc-${Date.now()}`,
        from: 'CEO',
        to: 'all',
        text: broadcastText,
        timestamp: Date.now(),
        read: false,
        isGlobal: true
      };
      
      await setDoc(doc(db, 'notifications', broadcast.id), broadcast);
      
      toast.success('Broadcast sent to all students!');
      setBroadcastText('');
    } catch (err) {
      toast.error('Failed to send broadcast');
    }
    setSending(false);
  };

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMovie.title || !newMovie.videoUrl) {
      toast.error('Please provide at least Title and Video URL');
      return;
    }

    const movie: Movie = {
      id: `movie-${Date.now()}`,
      title: newMovie.title || '',
      category: (newMovie.category as any) || 'Film',
      videoUrl: newMovie.videoUrl || '',
      subtitleUrl: newMovie.subtitleUrl || '',
      thumbnailUrl: newMovie.thumbnailUrl || '',
      uploadedAt: Date.now()
    };

    const updatedMovies = [movie, ...movies];
    setMovies(updatedMovies);
    localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
    
    toast.success('Movie added successfully!');
    setNewMovie({ category: 'Film' });
    setShowAddMovie(false);
  };

  const deleteMovie = (id: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      const updatedMovies = movies.filter(m => m.id !== id);
      setMovies(updatedMovies);
      localStorage.setItem(MOVIES_KEY, JSON.stringify(updatedMovies));
      toast.success('Movie deleted');
    }
  };

  const toggleTestPublication = async (id: string) => {
    const isPublished = publishedTests.includes(id);
    const newPublished = isPublished 
      ? publishedTests.filter(tid => tid !== id)
      : [...publishedTests, id];
    
    try {
      await setDoc(doc(db, 'config', 'published-tests'), { ids: newPublished });
      toast.success(isPublished ? 'Test unpublished' : 'Test published successfully!');
    } catch (err) {
      toast.error('Failed to update test status');
    }
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
              <button onClick={() => setActiveTab('movies')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'movies' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-tertiary hover:text-secondary'}`}>
                 English Movies
              </button>
              <button onClick={() => setActiveTab('mock-tests')} className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'mock-tests' ? 'bg-indigo-500/10 text-indigo-400 border-b-2 border-indigo-500' : 'text-tertiary hover:text-secondary'}`}>
                 Mock Tests
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
              ) : activeTab === 'broadcast' ? (
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
                         value={broadcastText}
                         onChange={e => setBroadcastText(e.target.value)}
                         className="w-full h-32 p-4 rounded-2xl bg-secondary border border-default outline-none text-sm resize-none focus:border-indigo-500/50"
                         style={{ color: 'var(--text-primary)' }}
                       />
                       <button 
                         onClick={sendBroadcast}
                         disabled={sending}
                         className="btn-primary w-full justify-center py-4 font-black uppercase tracking-widest"
                       >
                          {sending ? 'Sending...' : <><Send size={18} /> Send to All Students</>}
                       </button>
                    </div>
                 </div>
              ) : activeTab === 'movies' ? (
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-primary">English Movies Library</h3>
                      <button 
                        onClick={() => setShowAddMovie(true)}
                        className="btn-primary py-3 px-6 text-xs font-black uppercase tracking-widest"
                      >
                         <Plus size={16} /> Add New Movie
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {movies.map(movie => (
                        <div key={movie.id} className="glass-card p-4 flex flex-col gap-4">
                           <div className="aspect-video rounded-xl bg-surface-soft border border-default overflow-hidden relative">
                              {movie.thumbnailUrl ? (
                                <img src={movie.thumbnailUrl} alt={movie.title} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-tertiary">
                                   <Video size={32} />
                                </div>
                              )}
                              <div className="absolute top-2 right-2">
                                 <span className="text-[10px] font-black px-2 py-1 bg-indigo-500 text-white rounded-lg uppercase tracking-widest">
                                    {movie.category}
                                 </span>
                              </div>
                           </div>
                           <div className="flex-1">
                              <h4 className="font-bold text-primary truncate">{movie.title}</h4>
                              <p className="text-[10px] text-tertiary mt-1">Uploaded: {new Date(movie.uploadedAt).toLocaleDateString()}</p>
                           </div>
                           <div className="flex items-center gap-2">
                              <button 
                                onClick={() => deleteMovie(movie.id)}
                                className="flex-1 py-2 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-2"
                              >
                                 <Trash2 size={14} /> Delete
                              </button>
                           </div>
                        </div>
                      ))}
                      {movies.length === 0 && (
                        <div className="col-span-full py-20 text-center text-tertiary italic">
                           No movies uploaded yet. Click "Add New Movie" to start.
                        </div>
                      )}
                   </div>
                </div>
              ) : (
                <div className="space-y-6">
                   <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-primary">Mock Test Management</h3>
                      <p className="text-xs text-tertiary font-bold uppercase tracking-widest">Toggle visibility for students</p>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {mockTests.map(test => {
                        const isPublished = publishedTests.includes(test.id);
                        return (
                          <div key={test.id} className="glass-card p-6 flex items-center justify-between gap-4">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                   {test.type === 'full' ? <Clock size={24} /> : <Headphones size={24} />}
                                </div>
                                <div>
                                   <h4 className="font-bold text-primary">{test.title}</h4>
                                   <p className="text-[10px] text-tertiary uppercase font-black tracking-widest">{test.type} Test</p>
                                </div>
                             </div>
                             <button 
                               onClick={() => toggleTestPublication(test.id)}
                               className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border-2 
                                 ${isPublished 
                                   ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                   : 'bg-transparent border-default text-tertiary hover:border-indigo-500/50 hover:text-indigo-400'}`}
                             >
                                {isPublished ? 'Published' : 'Draft / Hide'}
                             </button>
                          </div>
                        );
                      })}
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

      {/* Add Movie Modal */}
      <AnimatePresence>
         {showAddMovie && (
            <>
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                 onClick={() => setShowAddMovie(false)}
                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
               />
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
                 className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
               >
                  <div className="glass-card w-full max-w-2xl p-8 pointer-events-auto shadow-2xl max-h-[90vh] overflow-y-auto">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <h3 className="text-2xl font-black text-primary">Add English Movie</h3>
                           <p className="text-sm text-tertiary mt-1">Upload movie content to the English Movies section</p>
                        </div>
                        <button onClick={() => setShowAddMovie(false)} className="p-2 rounded-xl hover:bg-surface-soft transition-colors">
                           <X size={24} className="text-tertiary" />
                        </button>
                     </div>

                     <form onSubmit={handleAddMovie} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="col-span-full space-y-2">
                           <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Movie Title</label>
                           <input 
                             type="text"
                             required
                             value={newMovie.title || ''}
                             onChange={e => setNewMovie({...newMovie, title: e.target.value})}
                             placeholder="e.g. Inception, Toy Story, etc."
                             className="w-full px-4 py-3 rounded-2xl bg-secondary border border-default outline-none text-sm focus:border-indigo-500/50"
                             style={{ color: 'var(--text-primary)' }}
                           />
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Category</label>
                           <select 
                             value={newMovie.category}
                             onChange={e => setNewMovie({...newMovie, category: e.target.value as any})}
                             className="w-full px-4 py-3 rounded-2xl bg-secondary border border-default outline-none text-sm focus:border-indigo-500/50 appearance-none"
                             style={{ color: 'var(--text-primary)' }}
                           >
                              <option value="Film">Film</option>
                              <option value="Cartoon">Cartoon</option>
                              <option value="Tv Series">Tv Series</option>
                              <option value="Anime">Anime</option>
                              <option value="Tv shows">Tv shows</option>
                           </select>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Thumbnail (Image)</label>
                           <div className="flex gap-2">
                             <input 
                               type="file"
                               accept="image/*"
                               onChange={e => {
                                 const file = e.target.files?.[0];
                                 if (file) setNewMovie({...newMovie, thumbnailUrl: `/movies/${file.name}`});
                               }}
                               className="hidden"
                               id="thumb-upload"
                             />
                             <label htmlFor="thumb-upload" className="flex-1 px-4 py-3 rounded-2xl bg-secondary border border-default text-tertiary text-xs cursor-pointer hover:border-indigo-500/50 transition-all flex items-center gap-2">
                               <Plus size={14} /> {newMovie.thumbnailUrl ? newMovie.thumbnailUrl.split('/').pop() : 'Select Poster Image'}
                             </label>
                           </div>
                        </div>

                        <div className="col-span-full space-y-2">
                           <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Video File (MP4)</label>
                              <span className="text-[9px] font-bold text-amber-500 uppercase tracking-tighter italic">* Select file from /public/movies/</span>
                           </div>
                           <div className="flex gap-2">
                             <input 
                               type="file"
                               accept="video/mp4"
                               onChange={e => {
                                 const file = e.target.files?.[0];
                                 if (file) setNewMovie({...newMovie, videoUrl: `/movies/${file.name}`});
                               }}
                               className="hidden"
                               id="video-upload"
                             />
                             <label htmlFor="video-upload" className="flex-1 px-4 py-3 rounded-2xl bg-secondary border border-default text-tertiary text-xs cursor-pointer hover:border-indigo-500/50 transition-all flex items-center gap-2">
                               <Upload size={14} /> {newMovie.videoUrl ? newMovie.videoUrl.split('/').pop() : 'Choose MP4 File'}
                             </label>
                           </div>
                        </div>

                        <div className="col-span-full space-y-2">
                           <div className="flex items-center justify-between">
                              <label className="text-[10px] font-black text-tertiary uppercase tracking-widest pl-1">Subtitle File (VTT/SRT)</label>
                              <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-tighter italic">* Supports multi-language</span>
                           </div>
                           <div className="flex gap-2">
                             <input 
                               type="file"
                               accept=".vtt,.srt"
                               onChange={e => {
                                 const file = e.target.files?.[0];
                                 if (file) setNewMovie({...newMovie, subtitleUrl: `/movies/${file.name}`});
                               }}
                               className="hidden"
                               id="sub-upload"
                             />
                             <label htmlFor="sub-upload" className="flex-1 px-4 py-3 rounded-2xl bg-secondary border border-default text-tertiary text-xs cursor-pointer hover:border-indigo-500/50 transition-all flex items-center gap-2">
                               <MessageSquare size={14} /> {newMovie.subtitleUrl ? newMovie.subtitleUrl.split('/').pop() : 'Select Subtitle File'}
                             </label>
                           </div>
                        </div>

                        <button 
                          type="submit" 
                          className="col-span-full btn-primary w-full justify-center py-4 font-black uppercase tracking-widest mt-4"
                        >
                           <Upload size={18} /> Upload & Publish Movie
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
