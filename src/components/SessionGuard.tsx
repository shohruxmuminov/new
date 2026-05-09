'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getSession, updateActivity } from '@/lib/session';

const PUBLIC_PATHS = ['/login', '/register'];

export default function SessionGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const session = getSession();
    const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));

    if (!session && !isPublic) {
      router.replace('/login');
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
