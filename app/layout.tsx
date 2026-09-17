import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://booklet-ilead2026.vercel.app'),
  title: 'iLEAD 2026: THE MAGIC AWAKENS | iSupport Club VNU-IS',
  description:
    'Official Booklet for iLEAD 2026 - Leadership Awakening Competition organized by iSupport Club under VNU International School Youth Union.',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'iLEAD 2026: THE MAGIC AWAKENS',
    description: 'Awaken your hidden leadership potential with iSupport Club at Hogwarts!',
    url: 'https://booklet-ilead2026.vercel.app',
    siteName: 'iSupport Club VNU-IS',
    images: [
      {
        url: '/assets/img/hero-img.webp',
        width: 1200,
        height: 630,
        alt: 'Hogwarts Castle iLEAD 2026',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'iLEAD 2026: THE MAGIC AWAKENS',
    description: 'Discover your house and lead the magical journey at VNU-IS.',
    images: ['/assets/img/hero-img.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
