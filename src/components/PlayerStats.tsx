'use client';

import { Player } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { User, Star, TrendingUp, MapPin, Cloud } from 'lucide-react';

interface PlayerStatsProps {
  player: Player;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  const { getExperienceToNextLevel } = useGameStore();
  const expToNext = getExperienceToNextLevel();
  const currentLevelExp = player.level * 100;
  const progressPercentage = ((player.experience % 100) / 100) * 100;

  return (
    <div className="game-card">
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">{player.name}</h2>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium text-gray-600">等級 {player.level}</span>
          </div>
        </div>
      </div>

      {/* 經驗值條 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">經驗值</span>
          <span className="text-sm text-gray-600">{player.experience} / {currentLevelExp}</span>
        </div>
        <div className="exp-bar">
          <div 
            className="exp-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          距離下一級還需要 {expToNext} 經驗值
        </p>
      </div>

      {/* 心情和位置 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-gray-700">心情</span>
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((mood) => (
              <div
                key={mood}
                className={`w-3 h-3 rounded-full ${
                  mood <= player.mood 
                    ? 'bg-yellow-400' 
                    : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-700">位置</span>
          </div>
          <span className="text-sm text-gray-600">{player.location}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-700">天氣</span>
          </div>
          <span className="text-sm text-gray-600">{player.weather}</span>
        </div>
      </div>

      {/* 快速操作 */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-2">
          <button className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm hover:bg-blue-200 transition-colors">
            更新心情
          </button>
          <button className="px-3 py-2 bg-green-100 text-green-700 rounded-lg text-sm hover:bg-green-200 transition-colors">
            更新位置
          </button>
        </div>
      </div>
    </div>
  );
}
