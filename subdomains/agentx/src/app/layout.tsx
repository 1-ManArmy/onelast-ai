import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AgentX - AI Automation Platform | agentx.onelast.ai',
  description: 'AgentX: AI Agent that does your dirty work (legal, mostly). Self-learning automation across apps, APIs, and web. Maximum efficiency guaranteed.',
  keywords: 'AI automation, agent AI, web scraping, task automation, self-learning AI, API automation, browser automation, productivity AI',
  authors: [{ name: 'OneLast.AI', url: 'https://onelast.ai' }],
  creator: 'OneLast.AI',
  publisher: 'OneLast.AI',
  robots: 'index, follow',
  openGraph: {
    title: 'AgentX - Ultimate AI Automation Agent',
    description: 'Self-learning AI agent that automates everything. Web scraping, API calls, file processing, and more.',
    url: 'https://agentx.onelast.ai',
    siteName: 'AgentX',
    type: 'website',
    images: [
      {
        url: '/agentx-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AgentX - AI Automation Platform'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgentX - AI That Does Your Dirty Work',
    description: 'Self-learning automation agent for maximum efficiency',
    images: ['/agentx-twitter.jpg']
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  },
  manifest: '/site.webmanifest'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0891b2" />
        <link rel="canonical" href="https://agentx.onelast.ai" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance optimization
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js');
              }
              
              // Analytics placeholder
              window.agentxAnalytics = {
                track: (event, data) => console.log('AgentX Event:', event, data)
              };
            `
          }}
        />
      </head>
      <body className="bg-gradient-to-br from-agent-darker via-gray-950 to-black min-h-screen text-white antialiased">
        {/* Neural Grid Background */}
        <div className="neural-grid fixed inset-0 pointer-events-none opacity-10 z-0" />
        
        {/* Matrix Rain Effect */}
        <div className="matrix-bg">
          <div className="animate-matrix-rain">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-px h-20 bg-gradient-to-b from-transparent via-agent-secondary to-transparent"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor performance
              window.addEventListener('load', () => {
                if (window.performance && window.performance.timing) {
                  const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
                  console.log('AgentX Load Time:', loadTime + 'ms');
                }
              });
            `
          }}
        />
      </body>
    </html>
  )
}
