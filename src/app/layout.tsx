
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from '@/components/query-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', 
});
export const metadata: Metadata = {
  title: 'AdTraffic AI - AdSense-Safe Social Traffic',
  description: 'Get high-quality, AdSense-safe social traffic instantly from Pinterest, Facebook, and Instagram.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} font-body}`}>
      {/* <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head> */}
      <body className="font-body antialiased selection:bg-accent/30">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
