import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ChatRevive - AI Conversation Memory Resurrection | OneLast AI',
  description: 'Resurrect dead AI conversations with perfect memory restoration. Extract context, rebuild personas, and restore chat continuity across all AI platforms.',
  keywords: 'AI chat revival, conversation memory, AI persona restoration, chat continuity, OpenAI memory, Claude context, AI conversation backup',
  openGraph: {
    title: 'ChatRevive - Resurrect Your AI Conversations',
    description: 'Bring dead AI chats back to life with perfect memory and personality restoration.',
    images: ['/api/og?service=chatrevive'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChatRevive - AI Memory Resurrection',
    description: 'Restore dead AI conversations with perfect context and personality preservation.',
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
};
