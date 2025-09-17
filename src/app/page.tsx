'use client';

import React from 'react';
import { useAppStore } from '@/store/app-store';
import PlayerSetup from '@/components/PlayerSetup';
import TaskInputPage from '@/components/TaskInputPage';
import ExecutionPage from '@/components/ExecutionPage';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { player, currentPage, setCurrentPage } = useAppStore();
  const [isInitializing, setIsInitializing] = React.useState(false);

  // 如果用戶已登入但沒有設定頁面，預設為 input 頁面
  React.useEffect(() => {
    if (player && currentPage === 'setup') {
      setIsInitializing(true);
      // 使用 setTimeout 避免立即跳轉
      setTimeout(() => {
        setCurrentPage('input');
        setIsInitializing(false);
      }, 100);
    }
  }, [player, currentPage, setCurrentPage]);

  // 添加載入狀態檢查
  if (player && (currentPage === 'setup' || isInitializing)) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)',
          color: 'white'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">正在載入...</p>
        </div>
      </div>
    );
  }

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
      <main 
        className="min-h-screen flex items-center justify-center p-4"
        style={{ minHeight: 'calc(100vh - 64px)' }}
      >
        <div 
          className="w-full"
          style={{ 
            maxWidth: '1200px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
}