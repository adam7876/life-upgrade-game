'use client';

import { useState } from 'react';
import { useGameStore } from '@/store/game-store';
import { Gamepad2, Target, Sparkles } from 'lucide-react';

interface PlayerSetupProps {
  onStart: () => void;
}

export default function PlayerSetup({ onStart }: PlayerSetupProps) {
  const [name, setName] = useState('');
  const [epicWin, setEpicWin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initializePlayer } = useGameStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !epicWin.trim()) return;

    console.log('開始初始化玩家:', { name: name.trim(), epicWin: epicWin.trim() });
    setIsSubmitting(true);
    
    try {
      // 初始化玩家
      console.log('調用 initializePlayer...');
      initializePlayer(name.trim(), epicWin.trim());
      console.log('initializePlayer 完成');
      
      // 短暫延遲後開始遊戲
      setTimeout(() => {
        console.log('調用 onStart...');
        onStart();
      }, 500);
    } catch (error) {
      console.error('初始化失敗:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Gamepad2 className="h-16 w-16 text-blue-600 animate-float" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎮 人生升級線上遊戲
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            將你的日常生活轉化為一場精彩的冒險！
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-1" />
              智能任務生成
            </div>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1" />
              遊戲化體驗
            </div>
          </div>
        </div>

        {/* 設定表單 */}
        <div className="game-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                你的名字
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                required
              />
            </div>

            <div>
              <label htmlFor="epicWin" className="block text-sm font-medium text-gray-700 mb-2">
                你的 Epic Win（終極目標）
              </label>
              <textarea
                id="epicWin"
                value={epicWin}
                onChange={(e) => setEpicWin(e.target.value)}
                placeholder="例如：通過 CASI L3；英文教學口語自然流暢（每週 2 次英教實戰）"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                這是你想要在 8-12 週內達成的主要目標
              </p>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !epicWin.trim() || isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  正在初始化...
                </>
              ) : (
                <>
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  開始遊戲！
                </>
              )}
            </button>
          </form>
        </div>

        {/* 特色說明 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-medium text-gray-800 mb-1">智能任務生成</h3>
            <p className="text-sm text-gray-600">系統會根據你的目標自動生成每日任務</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🏆</div>
            <h3 className="font-medium text-gray-800 mb-1">遊戲化體驗</h3>
            <p className="text-sm text-gray-600">經驗值、等級、成就系統讓成長更有趣</p>
          </div>
          <div className="text-center p-4 bg-white rounded-lg shadow-sm">
            <div className="text-2xl mb-2">🤝</div>
            <h3 className="font-medium text-gray-800 mb-1">社交互動</h3>
            <p className="text-sm text-gray-600">與朋友一起成長，互相支持</p>
          </div>
        </div>
      </div>
    </div>
  );
}
