'use client';

import React from 'react';
import { useAppStore } from '@/store/app-store';
import PlayerSetup from '@/components/PlayerSetup';
import TaskInputPage from '@/components/TaskInputPage';
import ExecutionPage from '@/components/ExecutionPage';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { player, currentPage, setCurrentPage } = useAppStore();

  // 如果用戶已登入但沒有設定頁面，預設為 input 頁面
  React.useEffect(() => {
    if (player && currentPage === 'setup') {
      setCurrentPage('input');
    }
  }, [player, currentPage, setCurrentPage]);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'input':
        return <TaskInputPage />;
      case 'execute':
        return <ExecutionPage />;
      default:
        return <PlayerSetup />;
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
        color: 'white'
      }}
    >
      {/* 導航欄 */}
      {player && <Navigation />}
      
      {/* 主要內容 */}
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl flex justify-center">
          <div className="w-full max-w-4xl">
            {renderCurrentPage()}
          </div>
        </div>
      </main>
    </div>
  );
}