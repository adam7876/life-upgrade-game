'use client';

import { PowerUp } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { Zap, CheckCircle, Circle } from 'lucide-react';

interface PowerUpsProps {
  powerUps: PowerUp[];
}

export default function PowerUps({ powerUps }: PowerUpsProps) {
  const { usePowerUp } = useGameStore();

  const handleUsePowerUp = (powerUpId: string) => {
    usePowerUp(powerUpId);
  };

  const getPowerUpIcon = (type: string) => {
    switch (type) {
      case 'warmup':
        return '🏃‍♂️';
      case 'breathing':
        return '🫁';
      case 'focus':
        return '🎯';
      case 'energy':
        return '⚡';
      case 'motivation':
        return '💪';
      default:
        return '✨';
    }
  };

  const getPowerUpColor = (type: string) => {
    switch (type) {
      case 'warmup':
        return 'from-orange-50 to-red-50 border-orange-200';
      case 'breathing':
        return 'from-blue-50 to-cyan-50 border-blue-200';
      case 'focus':
        return 'from-purple-50 to-pink-50 border-purple-200';
      case 'energy':
        return 'from-yellow-50 to-orange-50 border-yellow-200';
      case 'motivation':
        return 'from-green-50 to-emerald-50 border-green-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <div className="game-card">
      <div className="flex items-center space-x-2 mb-4">
        <Zap className="h-6 w-6 text-purple-600" />
        <h2 className="text-xl font-bold text-gray-800">⚡ 能量道具</h2>
      </div>

      <div className="space-y-3">
        {powerUps.map((powerUp) => (
          <div
            key={powerUp.id}
            className={`power-up-card ${getPowerUpColor(powerUp.type)} ${
              powerUp.isUsed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getPowerUpIcon(powerUp.type)}</span>
                  <h3 className={`font-medium ${
                    powerUp.isUsed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {powerUp.name}
                  </h3>
                </div>
                
                <p className={`text-sm mb-2 ${
                  powerUp.isUsed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {powerUp.description}
                </p>
                
                <p className={`text-xs ${
                  powerUp.isUsed ? 'text-gray-400' : 'text-purple-600'
                }`}>
                  效果：{powerUp.effect}
                </p>
              </div>

              <button
                onClick={() => handleUsePowerUp(powerUp.id)}
                disabled={powerUp.isUsed}
                className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                  powerUp.isUsed
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-purple-500 text-white hover:bg-purple-600 hover:scale-110'
                }`}
              >
                {powerUp.isUsed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {powerUps.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Zap className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">今天沒有可用道具</p>
        </div>
      )}

      {/* 使用提示 */}
      <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-xs text-purple-700 text-center">
          💡 在開始任務前使用道具可以提升效果！
        </p>
      </div>
    </div>
  );
}
