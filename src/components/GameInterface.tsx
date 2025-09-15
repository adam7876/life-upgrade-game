'use client';

import { useGameStore } from '@/store/game-store';
import PlayerStats from './PlayerStats';
import DailyCard from './DailyCard';
import QuestList from './QuestList';
import LevelProgress from './LevelProgress';
import PowerUps from './PowerUps';
import Allies from './Allies';
import Enemies from './Enemies';
import CheatCodes from './CheatCodes';
import ScoreBoard from './ScoreBoard';
import { Calendar, Gamepad2 } from 'lucide-react';

export default function GameInterface() {
  const { currentDailyCard, player } = useGameStore();

  if (!currentDailyCard || !player) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入遊戲中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* 標題區域 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">人生升級遊戲</h1>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="h-4 w-4" />
              <span>{new Date(currentDailyCard.date).toLocaleDateString('zh-TW')}</span>
            </div>
          </div>
          
          {/* Epic Win 顯示 */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">🎯 Epic Win</h2>
            <p className="text-purple-700">{currentDailyCard.epicWin}</p>
          </div>
        </div>

        {/* 主要遊戲區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側：玩家狀態和關卡 */}
          <div className="space-y-6">
            <PlayerStats player={player} />
            <LevelProgress levels={currentDailyCard.levels} />
            <PowerUps powerUps={currentDailyCard.powerUps} />
          </div>

          {/* 中間：任務和日卡 */}
          <div className="space-y-6">
            <QuestList quests={currentDailyCard.quests} />
            <DailyCard dailyCard={currentDailyCard} />
          </div>

          {/* 右側：社交和工具 */}
          <div className="space-y-6">
            <Allies allies={currentDailyCard.allies} />
            <Enemies enemies={currentDailyCard.enemies} />
            <CheatCodes cheatCodes={currentDailyCard.cheatCodes} />
            <ScoreBoard score={currentDailyCard.score} />
          </div>
        </div>

        {/* 底部：失敗回饋和明日規劃 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {currentDailyCard.failures.length > 0 && (
            <div className="game-card">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">📚 失敗回饋</h3>
              <div className="space-y-3">
                {currentDailyCard.failures.map((failure) => (
                  <div key={failure.id} className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-800 text-sm mb-2">{failure.description}</p>
                    <p className="text-red-600 text-xs">
                      <strong>學到：</strong>{failure.lesson}
                    </p>
                    <p className="text-red-600 text-xs">
                      <strong>明日微調：</strong>{failure.adjustment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="game-card">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🚀 明日規劃</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  明日第一步
                </label>
                <input
                  type="text"
                  placeholder="輸入明日的第一步行動"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  執行時段
                </label>
                <input
                  type="text"
                  placeholder="例如：08:30–08:50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
