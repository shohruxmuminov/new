'use client';

import Link from 'next/link';
import { BookOpen, Mic, Headphones, PenTool, Globe, MessageCircle, Video, Mail, Heart } from 'lucide-react';

const modules = [
  { href: '/speaking', label: 'Speaking', icon: Mic },
  { href: '/reading', label: 'Reading', icon: BookOpen },
  { href: '/listening', label: 'Listening', icon: Headphones },
  { href: '/writing', label: 'Writing', icon: PenTool },
];

const quickLinks = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/dashboard/history', label: 'Test History' },
  { href: '/dashboard/bookmarks', label: 'Bookmarks' },
  { href: '/login', label: 'Sign In' },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-default)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                style={{ background: 'var(--gradient-primary)' }}
              >
                CDI
              </div>
              <span className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                CDI <span className="gradient-text">Prep</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              Your premium IELTS CDI preparation platform. Practice smarter, score higher, achieve your dreams.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: MessageCircle, href: '#' },
                { icon: Video, href: '#' },
                { icon: Globe, href: '#' },
                { icon: Mail, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Modules */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
              Practice Modules
            </h4>
            <ul className="space-y-2.5">
              {modules.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="flex items-center gap-2 text-sm transition-colors hover:text-[#6366f1]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <m.icon size={14} />
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm transition-colors hover:text-[#6366f1]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold text-sm mb-4" style={{ color: 'var(--text-primary)' }}>
              Stay Updated
            </h4>
            <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
              Get the latest practice materials and tips delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 rounded-xl text-sm border-none outline-none"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              />
              <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--border-default)' }}
        >
          <p className="text-xs flex items-center gap-1" style={{ color: 'var(--text-tertiary)' }}>
            © {new Date().getFullYear()} CDI Prep. Made with <Heart size={12} className="text-red-500" /> for IELTS students.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs transition-colors hover:text-[#6366f1]" style={{ color: 'var(--text-tertiary)' }}>
              Privacy
            </a>
            <a href="#" className="text-xs transition-colors hover:text-[#6366f1]" style={{ color: 'var(--text-tertiary)' }}>
              Terms
            </a>
            <a href="#" className="text-xs transition-colors hover:text-[#6366f1]" style={{ color: 'var(--text-tertiary)' }}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
