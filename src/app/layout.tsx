import type { Metadata } from 'next';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'CDI Prep — Premium IELTS CDI Exam Preparation',
  description: 'Master your IELTS CDI exam with our premium preparation platform. Practice Speaking, Reading, Listening, and Writing with real exam-style questions.',
  keywords: ['IELTS', 'CDI', 'exam preparation', 'speaking', 'reading', 'listening', 'writing', 'English test'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-surface)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)',
                borderRadius: '12px',
                fontSize: '0.875rem',
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
