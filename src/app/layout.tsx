
import type { Metadata } from 'next';
import './globals.css';
import QueryProvider from '@/components/query-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
export const metadata: Metadata = {
  title: {
    template: "%s | AdTraffic AI - AdSense-Safe Social Traffic",
    default: "AdTraffic AI - AdSense-Safe Social Traffic",
  },
  description: 'Get high-quality, AdSense-safe social traffic instantly from Pinterest, Facebook, and Instagram.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} font-body`} suppressHydrationWarning>

      <body >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
