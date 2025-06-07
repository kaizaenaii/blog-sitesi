import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Font performance optimization
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Blog Sitemi - Kişisel Blog ve Deneyimler',
    template: '%s | Blog Sitemi'
  },
  description: 'Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında yazılar. Güncel içerikler ve düşüncelerim.',
  keywords: ['blog', 'teknoloji', 'kişisel gelişim', 'yazılım', 'deneyimler', 'türkçe blog'],
  authors: [{ name: 'Blog Sitemi', url: 'https://blog-sitemi.com' }],
  creator: 'Blog Sitemi',
  publisher: 'Blog Sitemi',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://blog-sitemi.com'),
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://blog-sitemi.com',
    siteName: 'Blog Sitemi',
    title: 'Blog Sitemi - Kişisel Blog ve Deneyimler',
    description: 'Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında yazılar.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Sitemi',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Sitemi - Kişisel Blog ve Deneyimler',
    description: 'Teknoloji, kişisel gelişim ve yaşam deneyimleri hakkında yazılar.',
    images: ['/og-image.jpg'],
    creator: '@blogsitemi',
    site: '@blogsitemi',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    other: {
      'msvalidate.01': 'your-bing-verification-code',
    },
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={inter.variable}>
      <head>
        {/* Essential meta tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        
        {/* Theme and app configuration */}
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light dark" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Blog Sitemi" />
        <meta name="application-name" content="Blog Sitemi" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no, date=no, email=no, address=no" />
        
        {/* Favicons and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2563eb" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/og-image.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="" />
        
        {/* Security headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Performance hints */}
        <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
      </head>
      
      <body className={`${inter.className} antialiased`}>
        {/* Skip to main content for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
        >
          Ana içeriğe geç
        </a>
        
        <div id="main-content">
          {children}
        </div>
        
        {/* Web Vitals & Performance Monitoring */}
        <Script
          id="web-vitals"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Web Vitals tracking function
              function sendToAnalytics(metric) {
                console.log('📊 Web Vital:', metric);
                
                // Google Analytics 4 event tracking
                if (typeof gtag !== 'undefined') {
                  gtag('event', metric.name, {
                    event_category: 'Web Vitals',
                    event_label: metric.id,
                    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
                    non_interaction: true,
                  });
                }
                
                // Custom analytics endpoint (opsiyonel)
                // fetch('/api/analytics', {
                //   method: 'POST',
                //   headers: { 'Content-Type': 'application/json' },
                //   body: JSON.stringify(metric)
                // }).catch(console.error);
              }
              
              // Performance observer for Web Vitals
              if ('PerformanceObserver' in window) {
                try {
                  // Largest Contentful Paint (LCP)
                  const lcpObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      sendToAnalytics({
                        name: 'LCP',
                        value: entry.startTime,
                        id: 'lcp-' + Date.now(),
                        rating: entry.startTime > 2500 ? 'poor' : entry.startTime > 1200 ? 'needs-improvement' : 'good'
                      });
                    });
                  });
                  lcpObserver.observe({entryTypes: ['largest-contentful-paint']});
                  
                  // First Input Delay (FID)
                  const fidObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      sendToAnalytics({
                        name: 'FID',
                        value: entry.processingStart - entry.startTime,
                        id: 'fid-' + Date.now(),
                        rating: (entry.processingStart - entry.startTime) > 100 ? 'poor' : (entry.processingStart - entry.startTime) > 25 ? 'needs-improvement' : 'good'
                      });
                    });
                  });
                  fidObserver.observe({entryTypes: ['first-input']});
                  
                  // Cumulative Layout Shift (CLS)
                  let clsValue = 0;
                  const clsObserver = new PerformanceObserver((list) => {
                    list.getEntries().forEach((entry) => {
                      if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                      }
                    });
                  });
                  clsObserver.observe({entryTypes: ['layout-shift']});
                  
                  // Send CLS on page unload
                  window.addEventListener('beforeunload', () => {
                    sendToAnalytics({
                      name: 'CLS',
                      value: clsValue,
                      id: 'cls-' + Date.now(),
                      rating: clsValue > 0.25 ? 'poor' : clsValue > 0.1 ? 'needs-improvement' : 'good'
                    });
                  });
                  
                } catch (e) {
                  console.warn('Performance observer error:', e);
                }
              }
              
              // Page load performance
              window.addEventListener('load', () => {
                setTimeout(() => {
                  const navigation = performance.getEntriesByType('navigation')[0];
                  if (navigation) {
                    sendToAnalytics({
                      name: 'TTFB',
                      value: navigation.responseStart - navigation.requestStart,
                      id: 'ttfb-' + Date.now()
                    });
                    
                    sendToAnalytics({
                      name: 'Load',
                      value: navigation.loadEventEnd - navigation.loadEventStart,
                      id: 'load-' + Date.now()
                    });
                  }
                }, 0);
              });
              
              // Connection quality detection
              if ('connection' in navigator) {
                const connection = navigator.connection;
                sendToAnalytics({
                  name: 'ConnectionType',
                  value: connection.effectiveType,
                  id: 'connection-' + Date.now()
                });
              }
              
              // Error tracking
              window.addEventListener('error', (event) => {
                console.error('Global error:', event.error);
                sendToAnalytics({
                  name: 'Error',
                  value: event.error?.message || 'Unknown error',
                  id: 'error-' + Date.now()
                });
              });
              
              // Unhandled promise rejection tracking
              window.addEventListener('unhandledrejection', (event) => {
                console.error('Unhandled promise rejection:', event.reason);
                sendToAnalytics({
                  name: 'UnhandledRejection',
                  value: event.reason?.message || 'Unknown rejection',
                  id: 'rejection-' + Date.now()
                });
              });
            `
          }}
        />
        
        {/* Google Analytics 4 (Production'da aktifleştirin) */}
        {process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'GA_MEASUREMENT_ID', {
                    page_title: document.title,
                    page_location: window.location.href,
                    send_page_view: true
                  });
                `
              }}
            />
          </>
        )}
        
        {/* Service Worker Registration */}
        <Script
          id="service-worker"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `
          }}
        />
        
        {/* Cookie Consent (GDPR uyumluluğu için) */}
        {process.env.NODE_ENV === 'production' && (
          <Script
            id="cookie-consent"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                // Basit cookie consent
                if (!localStorage.getItem('cookieConsent')) {
                  const banner = document.createElement('div');
                  banner.innerHTML = \`
                    <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1f2937; color: white; padding: 1rem; z-index: 9999; text-align: center;">
                      <p style="margin: 0 0 1rem 0;">Bu site performansı iyileştirmek için çerezler kullanır.</p>
                      <button onclick="acceptCookies()" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; margin-right: 0.5rem; cursor: pointer;">Kabul Et</button>
                      <button onclick="rejectCookies()" style="background: #6b7280; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Reddet</button>
                    </div>
                  \`;
                  document.body.appendChild(banner);
                  
                  window.acceptCookies = () => {
                    localStorage.setItem('cookieConsent', 'accepted');
                    banner.remove();
                  };
                  
                  window.rejectCookies = () => {
                    localStorage.setItem('cookieConsent', 'rejected');
                    banner.remove();
                  };
                }
              `
            }}
          />
        )}
        
        {/* Structured Data for Organization */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Blog Sitemi",
              "url": "https://blog-sitemi.com",
              "logo": "https://blog-sitemi.com/logo.png",
              "sameAs": [
                "https://twitter.com/blogsitemi",
                "https://linkedin.com/company/blogsitemi",
                "https://instagram.com/blogsitemi",
                "https://github.com/blogsitemi"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "Turkish"
              }
            })
          }}
        />
      </body>
    </html>
  )
}