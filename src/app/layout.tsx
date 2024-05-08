import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './main.css';
import { getServerSession } from 'next-auth';

import { Login } from '@/components/Login';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wiki Series',
  description:
    'Wiki Series allows you to search for your favorite series and characters.',
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" className="h-screen">
      <body className={inter.className} style={{ height: '100vh' }}>
        {session ? children : <Login />}
        <Analytics />
        {modal}
      </body>
    </html>
  );
}
