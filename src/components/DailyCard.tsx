'use client';

import { DailyCard as DailyCardType } from '@/types/game';
import { Calendar, MapPin, Cloud, Heart } from 'lucide-react';

interface DailyCardProps {
  dailyCard: DailyCardType;
}

export default function DailyCard({ dailyCard }: DailyCardProps) {
  const completedQuests = dailyCard.quests.filter(q => q.isCompleted).length;
  const totalQuests = dailyCard.quests.length;
  const progressPercentage = totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;

  return (
    <div className="game-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">📅 今日日卡</h2>
        </div>
        <div className="text-sm text-gray-600">
          {new Date(dailyCard.date).toLocaleDateString('zh-TW', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
          })}
        </div>
      </div>

      {/* 基本資訊 */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center p-2 bg-blue-50 rounded-lg">
          <MapPin className="h-4 w-4 text-blue-600 mx-auto mb-1" />
          <p className="text-xs text-blue-700">{dailyCard.player.location}</p>
        </div>
        <div className="text-center p-2 bg-yellow-50 rounded-lg">
          <Cloud className="h-4 w-4 text-yellow-600 mx-auto mb-1" />
          <p className="text-xs text-yellow-700">{dailyCard.player.weather}</p>
        </div>
        <div className="text-center p-2 bg-pink-50 rounded-lg">
          <Heart className="h-4 w-4 text-pink-600 mx-auto mb-1" />
          <p className="text-xs text-pink-700">{dailyCard.player.mood}/5</p>
        </div>
      </div>

      {/* 進度概覽 */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">今日進度</span>
          <span className="text-sm text-gray-600">{completedQuests}/{totalQuests} 任務</span>
        </div>
        <div className="exp-bar">
          <div 
            className="exp-fill bg-gradient-to-r from-green-400 to-blue-500" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {progressPercentage >= 100 
            ? '🎉 恭喜！今日任務全部完成！' 
            : progressPercentage >= 50 
            ? '💪 進度不錯！繼續加油！' 
            : '🚀 開始你的冒險吧！'
          }
        </p>
      </div>

      {/* 快速統計 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-green-700">+{dailyCard.score.experience}</div>
            <div className="text-xs text-green-600">今日經驗值</div>
          </div>
        </div>
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-bold text-blue-700">{dailyCard.score.streak}</div>
            <div className="text-xs text-blue-600">連擊天數</div>
          </div>
        </div>
      </div>

      {/* 標籤 */}
      {dailyCard.tags.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">標籤</h4>
          <div className="flex flex-wrap gap-1">
            {dailyCard.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 備註 */}
      {dailyCard.notes.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">備註</h4>
          <div className="space-y-1">
            {dailyCard.notes.map((note, index) => (
              <p key={index} className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
                {note}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
