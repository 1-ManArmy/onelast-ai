import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AstrologyAI Pro - Advanced Cosmic Intelligence',
  description: 'Experience the most accurate AI-powered astrology readings with real-time astronomical data and professional-grade insights.',
  keywords: 'astrology, AI, horoscope, zodiac, cosmic, planets, birth chart, readings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster 
          theme="dark"
          position="top-right"
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              color: 'white',
            },
          }}
        />
      </body>
    </html>
  )
}
