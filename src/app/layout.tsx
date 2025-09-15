import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: '🎮 人生升級線上遊戲',
  description: '基於待辦清單概念設計的遊戲化人生管理系統，將你的日常生活轉化為一場精彩的冒險！',
  keywords: ['遊戲化', '人生管理', '待辦清單', '生產力', '自我提升'],
  authors: [{ name: 'Adam' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
          {children}
        </div>
      </body>
    </html>
  );
}
