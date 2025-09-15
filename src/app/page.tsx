'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/game-store';
import GameInterface from '@/components/GameInterface';
import PlayerSetup from '@/components/PlayerSetup';

export default function Home() {
  const { isGameStarted } = useGameStore();
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">正在初始化遊戲...</p>
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
