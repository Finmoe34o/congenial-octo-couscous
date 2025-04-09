import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { validateEnv } from './lib/env';
import { Analytics } from "@vercel/analytics/react"

// Validate environment variables
validateEnv();

// Load Inter font
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata: Metadata = {
  title: 'SkillPay | Freelancer Rate Calculator',
  description: 'An intelligent AI-driven freelancer pricing platform that provides sophisticated project cost estimation through advanced analytics and personalized pricing insights.',
  keywords: 'freelance, pricing, rates, calculator, project cost, estimation',
};

// Root layout that wraps all pages
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen max-w-[100vw] overflow-x-hidden bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  );
}