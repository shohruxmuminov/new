'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import { ArrowLeft, Maximize, Minimize } from 'lucide-react';
import Link from 'next/link';
import { useFullscreen } from '@/hooks/useFullscreen';

interface MockTest {
  id: string;
  title: string;
  type: string;
  htmlUrl: string;
  isPublished: boolean;
}

const STORAGE_KEY = 'cdi-mock-tests';

export default function MockTestViewPage({ params }: { params: Promise<{ testId: string }> }) {
  const { testId } = use(params);
  const [test, setTest] = useState<MockTest | null>(null);
  const { enter: enterFS, exit: exitFS } = useFullscreen();
  const [isFS, setIsFS] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const all: MockTest[] = JSON.parse(saved);
      const found = all.find(t => t.id === testId && t.isPublished);
      setTest(found || null);
    }
    const handler = () => setIsFS(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, [testId]);

  if (!test) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary text-lg font-bold mb-2">Test not available</p>
          <p className="text-tertiary text-sm mb-6">This test hasn't been published or doesn't exist.</p>
          <Link href="/mock-tests" className="btn-primary py-2 px-6 text-sm">← Back to Mock Tests</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-surface overflow-hidden">
      <header className="h-16 flex items-center justify-between px-6 border-b shrink-0 bg-surface z-50"
        style={{ borderColor: 'var(--border-default)' }}>
        <Link href="/mock-tests" className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors">
          <ArrowLeft size={16} /> Mock Tests
        </Link>
        <span className="font-bold text-primary hidden md:block">{test.title}</span>
        <button onClick={isFS ? exitFS : enterFS}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-default text-xs font-bold text-secondary hover:text-primary transition-all">
          {isFS ? <><Minimize size={14} /> Exit Fullscreen</> : <><Maximize size={14} /> Fullscreen</>}
        </button>
      </header>
      <div className="flex-1 w-full bg-white">
        <iframe src={test.htmlUrl} className="w-full h-full border-none" title={test.title} />
      </div>
    </div>
  );
}
