'use client';

import { Score } from '@/types/game';
import { Trophy, Zap, Heart, Target, Users, Brain, Smile, Users2 } from 'lucide-react';

interface ScoreBoardProps {
  score: Score;
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  const getStreakEmoji = (streak: number) => {
    if (streak >= 7) return '🔥';
    if (streak >= 3) return '⚡';
    if (streak >= 1) return '✨';
    return '💤';
  };

  const getFlowEmoji = (flow: number) => {
    if (flow >= 4) return '🌊';
    if (flow >= 2) return '💫';
    if (flow >= 1) return '✨';
    return '💤';
  };

  return (
    <div className="game-card">
      <div className="flex items-center space-x-2 mb-4">
        <Trophy className="h-6 w-6 text-yellow-600" />
        <h2 className="text-xl font-bold text-gray-800">📊 計分板</h2>
      </div>

      {/* 主要分數 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Zap className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">經驗值</span>
          </div>
          <div className="text-2xl font-bold text-yellow-700">+{score.experience}</div>
        </div>

        <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <span className="text-lg">{getStreakEmoji(score.streak)}</span>
            <span className="text-sm font-medium text-blue-800">連擊</span>
          </div>
          <div className="text-2xl font-bold text-blue-700">{score.streak} 天</div>
        </div>
      </div>

      {/* 心流狀態 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-1">
            <span className="text-lg">{getFlowEmoji(score.flow)}</span>
            <span className="text-sm font-medium text-gray-700">心流狀態</span>
          </div>
          <span className="text-sm text-gray-600">{score.flow}/5</span>
        </div>
        <div className="exp-bar">
          <div 
            className="exp-fill bg-gradient-to-r from-purple-400 to-pink-500" 
            style={{ width: `${(score.flow / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* 韌性指標 */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700 mb-3">韌性指標</h3>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm text-gray-600">身體</span>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= score.resilience.physical 
                      ? 'bg-red-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">心理</span>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= score.resilience.mental 
                      ? 'bg-blue-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smile className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-600">情緒</span>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= score.resilience.emotional 
                      ? 'bg-green-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Users2 className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-gray-600">社會</span>
            </div>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`w-2 h-2 rounded-full ${
                    level <= score.resilience.social 
                      ? 'bg-purple-400' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 激勵文字 */}
      <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-700 text-center">
          {score.streak >= 7 
            ? '🔥 太棒了！你已經連續完成 7 天以上！' 
            : score.streak >= 3 
            ? '⚡ 很好的連擊！繼續保持！' 
            : score.streak >= 1 
            ? '✨ 好的開始！建立你的連擊吧！' 
            : '💤 開始你的第一關吧！'
          }
        </p>
      </div>
    </div>
  );
}
