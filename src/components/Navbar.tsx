'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Search, BookOpen, Mic, Headphones, PenTool, 
  LayoutDashboard, LogIn, ChevronDown, LayoutGrid, Shield
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/speaking', label: 'Speaking', icon: Mic, color: '#f59e0b' },
  { href: '/reading', label: 'Reading', icon: BookOpen, color: '#10b981' },
  { href: '/listening', label: 'Listening', icon: Headphones, color: '#6366f1' },
  { href: '/writing', label: 'Writing', icon: PenTool, color: '#ec4899' },
  { href: '/mock-tests', label: 'Mock Tests', icon: LayoutGrid, color: '#8b5cf6' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('cdi-user');
    if (stored) setUser(JSON.parse(stored));
    
    const checkSession = () => {
      const current = localStorage.getItem('cdi-user');
      setUser(current ? JSON.parse(current) : null);
    };
    
    window.addEventListener('storage', checkSession);
    return () => window.removeEventListener('storage', checkSession);
  }, [pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === 'Escape') setSearchOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-strong shadow-lg'
            : 'bg-transparent'
        }`}
        style={{ borderBottom: scrolled ? '1px solid var(--border-default)' : 'none' }}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'var(--gradient-primary)' }}>
              CDI
            </div>
            <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
              CDI <span className="gradient-text">Prep</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: isActive ? '#6366f1' : 'var(--text-secondary)',
                    background: isActive ? 'var(--gradient-card)' : 'transparent',
                  }}
                >
                  <span className="flex items-center gap-2">
                    <link.icon size={16} />
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full"
                      style={{ background: 'var(--gradient-primary)' }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="btn-ghost flex items-center gap-2 text-sm"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <Search size={16} />
              <span className="hidden lg:inline">Search</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 rounded text-xs border" 
                style={{ borderColor: 'var(--border-default)', color: 'var(--text-tertiary)', fontSize: '10px' }}>
                ⌘K
              </kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-200 hover:scale-110"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <Link
              href="/ceo"
              className="btn-ghost flex items-center gap-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Shield size={16} />
              CEO
            </Link>

            <Link
              href="/teacher"
              className="btn-ghost flex items-center gap-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <Shield size={16} />
              Teacher
            </Link>

            <Link
              href="/dashboard"
              className="btn-ghost flex items-center gap-2 text-sm"
              style={{ color: 'var(--text-secondary)' }}
            >
              <LayoutDashboard size={16} />
              {user ? user.name.split(' ')[0] : 'Dashboard'}
            </Link>

            {!user && (
              <Link
                href="/login"
                className="btn-primary text-sm"
                style={{ padding: '8px 20px', fontSize: '0.85rem' }}
              >
                <LogIn size={16} />
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 rounded-xl" style={{ color: 'var(--text-secondary)' }}>
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-16 inset-x-0 z-40 glass-strong p-4 md:hidden"
            style={{ borderBottom: '1px solid var(--border-default)' }}
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
                    style={{
                      color: isActive ? '#6366f1' : 'var(--text-secondary)',
                      background: isActive ? 'var(--gradient-card)' : 'transparent',
                    }}
                  >
                    <link.icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <hr style={{ borderColor: 'var(--border-default)', margin: '8px 0' }} />
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                <LayoutDashboard size={18} />
                {user ? user.name : 'Dashboard'}
              </Link>
              {!user && (
                <Link
                  href="/login"
                  className="btn-primary text-sm justify-center mt-2"
                >
                  <LogIn size={16} />
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh]"
            style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg mx-4 rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 p-4" style={{ borderBottom: '1px solid var(--border-default)' }}>
                <Search size={20} style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  placeholder="Search for tests, topics, modules..."
                  autoFocus
                  className="flex-1 bg-transparent border-none outline-none text-sm"
                  style={{ color: 'var(--text-primary)' }}
                />
                <kbd className="px-2 py-0.5 rounded text-xs" 
                  style={{ background: 'var(--bg-secondary)', color: 'var(--text-tertiary)', fontSize: '10px' }}>
                  ESC
                </kbd>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium px-3 py-2" style={{ color: 'var(--text-tertiary)' }}>MODULES</p>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:scale-[1.01]"
                    style={{ color: 'var(--text-secondary)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gradient-card)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <link.icon size={16} style={{ color: link.color }} />
                    <span className="text-sm font-medium">{link.label} Practice</span>
                  </Link>
                ))}
                <Link
                  href="/dashboard"
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--gradient-card)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <LayoutDashboard size={16} style={{ color: '#6366f1' }} />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
