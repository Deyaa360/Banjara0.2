import type { Metadata, Viewport } from 'next';
import { Inter, Cormorant_Garamond, Playfair_Display } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-serif',
});

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'Banjara - Heritage Indian Cuisine',
  description: 'Experience the rich heritage of Indian cuisine in an elegant setting. Authentic flavors, modern presentation, and warm hospitality.',
  keywords: ['Indian restaurant', 'heritage cuisine', 'fine dining', 'authentic Indian food', 'traditional recipes'],
  authors: [{ name: 'Banjara Restaurant' }],
  creator: 'Banjara Restaurant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://banjara.com',
    title: 'Banjara - Heritage Indian Cuisine',
    description: 'Experience the rich heritage of Indian cuisine in an elegant setting.',
    siteName: 'Banjara Restaurant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Banjara - Heritage Indian Cuisine',
    description: 'Experience the rich heritage of Indian cuisine in an elegant setting.',
    creator: '@banjara',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}