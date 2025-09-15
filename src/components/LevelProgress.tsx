'use client';

import { Level } from '@/types/game';
import { CheckCircle, Circle, Lock } from 'lucide-react';

interface LevelProgressProps {
  levels: Level[];
}

export default function LevelProgress({ levels }: LevelProgressProps) {
  const completedLevels = levels.filter(level => level.isCompleted).length;
  const totalLevels = levels.length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <div className="game-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">🏆 人生關卡</h2>
        <div className="text-sm text-gray-600">
          {completedLevels} / {totalLevels} 完成
        </div>
      </div>

      {/* 進度條 */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">整體進度</span>
          <span className="text-sm text-gray-600">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="exp-bar">
          <div 
            className="exp-fill bg-gradient-to-r from-green-400 to-blue-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 關卡列表 */}
      <div className="space-y-3">
        {levels.map((level, index) => (
          <div
            key={level.id}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              level.isCompleted
                ? 'bg-green-50 border-green-200'
                : index === completedLevels
                ? 'bg-blue-50 border-blue-200 animate-pulse'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                {level.isCompleted ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : index === completedLevels ? (
                  <Circle className="h-6 w-6 text-blue-500" />
                ) : (
                  <Lock className="h-6 w-6 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className={`font-medium ${
                    level.isCompleted ? 'text-green-800' : 
                    index === completedLevels ? 'text-blue-800' : 'text-gray-600'
                  }`}>
                    {level.name}
                  </h3>
                  <span className={`level-indicator level-${level.level}`}>
                    Lv{level.level}
                  </span>
                </div>
                
                <p className={`text-sm mb-2 ${
                  level.isCompleted ? 'text-green-600' : 
                  index === completedLevels ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {level.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className={`text-xs ${
                    level.isCompleted ? 'text-green-500' : 
                    index === completedLevels ? 'text-blue-500' : 'text-gray-400'
                  }`}>
                    目標：{level.target}
                  </p>
                  <span className={`text-xs font-medium ${
                    level.isCompleted ? 'text-green-600' : 
                    index === completedLevels ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    +{level.experience} EXP
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 激勵文字 */}
      {completedLevels < totalLevels && (
        <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            {completedLevels === 0 
              ? '開始你的第一關吧！' 
              : `繼續前進！還有 ${totalLevels - completedLevels} 個關卡等待解鎖`
            }
          </p>
        </div>
      )}
    </div>
  );
}
