'use client';

import { useAppStore } from '@/store/app-store';
import PlayerSetup from '@/components/PlayerSetup';
import TaskInputPage from '@/components/TaskInputPage';
import ExecutionPage from '@/components/ExecutionPage';
import Navigation from '@/components/Navigation';

export default function Home() {
  const { player, currentPage } = useAppStore();

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* 導航欄 */}
      {player && <Navigation />}
      
      {/* 主要內容 */}
      <main className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-7xl">
          {renderCurrentPage()}
        </div>
      </main>
    </div>
  );
}