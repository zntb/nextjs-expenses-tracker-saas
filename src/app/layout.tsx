import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { PostHogProvider } from '@/components/vendor/ph-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Expenses Tracker - Track Your Finances with Ease',
    template: '%s | Expenses Tracker',
  },
  description:
    'Easily track and manage your expenses with our powerful expense tracker app. Get lifetime access for $99 and take control of your finances today.',
  keywords: [
    'expenses tracker',
    'expense management',
    'budget tracking',
    'personal finance',
    'financial management',
  ],
  authors: [{ name: 'Expenses Tracker Team' }],
  creator: 'Expenses Tracker',
  publisher: 'Expenses Tracker',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nextjs-expenses-tracker-saas.vercel.app',
    title: 'Expenses Tracker - Track Your Finances with Ease',
    description:
      'Easily track and manage your expenses with our powerful expense tracker app.',
    images: [
      {
        url: 'https://bytegrad.com/course-assets/youtube/expensestracker/preview.png',
        width: 1200,
        height: 630,
        alt: 'Expenses Tracker App Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Expenses Tracker - Track Your Finances with Ease',
    description:
      'Easily track and manage your expenses with our powerful expense tracker app.',
    images: [
      'https://bytegrad.com/course-assets/youtube/expensestracker/preview.png',
    ],
    creator: '@ExpensesTracker',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://nextjs-expenses-tracker-saas.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200`}
      >
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
