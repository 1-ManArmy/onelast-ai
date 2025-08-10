import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Onelast.AI - Your AI Memory Assistant",
  description: "AI-powered memory and knowledge management platform that learns and remembers everything you share.",
  keywords: ["AI", "memory", "assistant", "SaaS", "knowledge management"],
  authors: [{ name: "AI-Digital-Market" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative`}>
        <ParticleBackground />
        <AuthProvider>
          <div className="relative z-10">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
