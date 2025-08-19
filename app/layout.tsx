import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import StructuredData from '@/components/structured-data'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Text Behind Image - AI-Powered Text Effects Tool | Create Stunning Designs',
    template: '%s | Text Behind Image'
  },
  description: 'Transform your images with AI-powered text behind image effects. Create stunning designs in seconds with our advanced tool. Free to use, professional results guaranteed. Perfect for social media, marketing, and creative projects.',
  keywords: [
    'text behind image',
    'text behind image tool',
    'AI text effects',
    'image text overlay',
    'text behind photo',
    'photo text effects',
    'social media design tool',
    'AI image editor',
    'text placement tool',
    'image design software',
    'text effects generator',
    'photo editing with text',
    'text behind image creator',
    'AI design tool',
    'image text integration',
    'text behind image app',
    'photo text placement',
    'text effects for images',
    'image text manipulation',
    'text behind image software',
    'text behind image online',
    'text behind image free',
    'text behind image generator',
    'text behind image editor',
    'text behind image maker',
    'text behind image website',
    'text behind image tool online',
    'text behind image effects',
    'text behind image design',
    'text behind image creator online'
  ],
  authors: [{ name: 'Text Behind Image Team' }],
  creator: 'Text Behind Image',
  publisher: 'Text Behind Image',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://text-behind-image.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://text-behind-image.io',
    siteName: 'Text Behind Image',
    title: 'Text Behind Image - AI-Powered Text Effects Tool | Create Stunning Designs',
    description: 'Transform your images with AI-powered text behind image effects. Create stunning designs in seconds with our advanced tool. Free to use, professional results guaranteed.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Text Behind Image - AI-Powered Text Effects Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Behind Image - AI-Powered Text Effects Tool',
    description: 'Transform your images with AI-powered text behind image effects. Create stunning designs in seconds.',
    images: ['/og-image.jpg'],
    creator: '@textbehindimage',
    site: '@textbehindimage',
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://api.producthunt.com" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//api.producthunt.com" />
        
        {/* Essential Favicon Setup */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for mobile browsers */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Additional SEO meta tags */}
        <meta name="author" content="Text Behind Image Team" />
        <meta name="copyright" content="Text Behind Image" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Mobile optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      </head>
      <body className={inter.className}>
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
