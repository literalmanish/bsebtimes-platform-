import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'BSEBTimes — बिहार बोर्ड 10वीं व 12वीं परीक्षा तैयारी एवं OMR सिम्युलेटर',
  description: 'BSEB Class 10 (Matric) & Class 12 (Science, Arts, Commerce). Bihar Board 50/100 OMR Sheet Simulator, State/District/Block Rank Leaderboard, Model Papers & Topper Mentorship.',
  keywords: 'BSEB, Bihar Board, Class 10 Matric, Class 12 Intermediate, BSEB OMR Sheet, BSEB Model Paper 2026, Bihar Board Topper, BSEBTimes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className="antialiased flex flex-col min-h-screen bg-stone-50 text-stone-900 dark:bg-[#0d0f12] dark:text-stone-100 transition-colors">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
