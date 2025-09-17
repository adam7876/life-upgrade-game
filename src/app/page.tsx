'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import PlayerSetup from '@/components/PlayerSetup';
import TaskInputPage from '@/components/TaskInputPage';
import ExecutionPage from '@/components/ExecutionPage';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { player, currentPage, setCurrentPage, loadTodayCard } = useAppStore();

  // 載入今日日卡
  useEffect(() => {
    loadTodayCard();
  }, [loadTodayCard]);

  // 根據當前頁面渲染不同組件
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'setup':
        return <PlayerSetup />;
      case 'input':
        return <TaskInputPage />;
      case 'execute':
        return <ExecutionPage />;
      default:
        return <PlayerSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* 導航欄 */}
      {player && <Navigation />}
      
      {/* 主要內容 */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
    </div>
  );
}
