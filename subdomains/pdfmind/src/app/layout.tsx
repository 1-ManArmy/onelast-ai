import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDFMind - AI-Powered Document Intelligence | OneLast.ai",
  description: "Upload PDFs and ask questions. Advanced document Q&A with LangChain + FAISS vector search. Transform your document library into an intelligent knowledge base.",
  keywords: "PDF AI, document analysis, LangChain, FAISS, vector search, document Q&A, intelligent documents",
  openGraph: {
    title: "PDFMind - Talk to Your PDFs",
    description: "AI-powered PDF analysis with advanced Q&A capabilities",
    url: "https://pdfmind.onelast.ai",
    siteName: "PDFMind",
    images: [
      {
        url: "https://pdfmind.onelast.ai/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PDFMind - AI PDF Analysis"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "PDFMind - AI-Powered Document Intelligence",
    description: "Upload PDFs and ask questions. Advanced document Q&A with LangChain + FAISS.",
    images: ["https://pdfmind.onelast.ai/twitter-image.jpg"]
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
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://pdfmind.onelast.ai" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
