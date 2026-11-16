import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import { fontDisplay, fontBody, fontSerif, fontMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://shivajirathod.dev'),
  title: {
    default: 'Shivaji Rathod — Cybersecurity Researcher',
    template: '%s | Shivaji Rathod',
  },
  description:
    'Cybersecurity researcher and aspiring cloud security engineer based in Pune, India. Vulnerability research, cloud security, and security engineering.',
  keywords: ['cybersecurity', 'security research', 'cloud security', 'penetration testing', 'vulnerability research', 'Pune', 'India'],
  authors: [{ name: 'Shivaji Rathod', url: 'https://shivajirathod.dev' }],
  creator: 'Shivaji Rathod',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://shivajirathod.dev',
    siteName: 'Shivaji Rathod',
    title: 'Shivaji Rathod — Cybersecurity Researcher',
    description: 'Cybersecurity researcher and aspiring cloud security engineer based in Pune, India.',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shivazzz',
    title: 'Shivaji Rathod — Cybersecurity Researcher',
    description: 'Cybersecurity researcher and aspiring cloud security engineer based in Pune, India.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://shivajirathod.dev',
    types: {
      'application/rss+xml': 'https://shivajirathod.dev/rss.xml',
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
    { media: '(prefers-color-scheme: light)', color: '#f5f1e8' },
  ],
};

const fontVariables = [
  fontDisplay.variable,
  fontBody.variable,
  fontSerif.variable,
  fontMono.variable,
].join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={fontVariables}
    >
      <head>
        <link rel="preload" as="image" href="/turntable/frame-00.b4783ed3.webp" fetchPriority="high" />
      </head>
      <body className="bg-bg text-fg font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
