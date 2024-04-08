import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './main.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Wiki Series',
  description:
    'Wiki Series allows you to search for your favorite series and characters.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className={inter.className} style={{ height: '100vh' }}>
        {children}
      </body>
    </html>
  );
}
