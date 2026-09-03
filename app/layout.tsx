import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import LanguageSwitcher from './components/LanguageSwitcher';
import SiteFooter from './components/SiteFooter';
import SiteHeader from './components/SiteHeader';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dr. Joseph Helping Children Community | Cambodia',
  description:
    'Helping children and communities in Cambodia through education, food, care, and meaningful opportunities for a better future.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteHeader />
        {children}
        <SiteFooter />
        <LanguageSwitcher />
      </body>
    </html>
  );
}
