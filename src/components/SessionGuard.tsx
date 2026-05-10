'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession, updateActivity } from '@/lib/session';

const PUBLIC_PATHS = ['/login', '/register', '/'];

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = getSession();
    const isPublic = PUBLIC_PATHS.some(p => pathname === p);
    const isAuthPath = ['/login', '/register'].includes(pathname);

    // Check ban status
    if (session) {
      const banned = localStorage.getItem('cdi-banned-users');
      if (banned && JSON.parse(banned).includes(session.email)) {
        localStorage.removeItem('cdi-user');
        localStorage.removeItem('cdi-last-active');
        router.replace('/login?error=banned');
        return;
      }
    }

    if (!session && !isPublic) {
      router.replace('/login');
      return;
    }

    if (session && isAuthPath) {
      router.replace('/dashboard');
      return;
    }

    if (session) {
      updateActivity();
    }
  }, [pathname, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const session = getSession();
      const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));
      if (!session && !isPublic) {
        router.replace('/login');
      }
    }, 60 * 1000); // check every minute
    return () => clearInterval(interval);
  }, [pathname, router]);

  return <>{children}</>;
}
