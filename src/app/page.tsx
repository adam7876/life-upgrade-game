'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/game-store';
import GameInterface from '@/components/GameInterface';
import PlayerSetup from '@/components/PlayerSetup';

export default function Home() {
  const { isGameStarted, player } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  // 調試信息
  useEffect(() => {
    console.log('Home component - isGameStarted:', isGameStarted);
    console.log('Home component - player:', player);
  }, [isGameStarted, player]);

  // 超時機制：如果載入超過 10 秒，自動停止載入
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        console.log('載入超時，停止載入狀態');
        setIsLoading(false);
      }, 10000);

      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在初始化遊戲...</p>
          <p className="text-sm text-gray-500 mt-2">如果卡住太久，請重新整理頁面</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {!isGameStarted ? (
        <PlayerSetup onStart={() => setIsLoading(true)} />
      ) : (
        <GameInterface />
      )}
    </main>
  );
}
