'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Gamepad2, Target, Sparkles } from 'lucide-react';

export default function PlayerSetup() {
  const [name, setName] = useState('');
  const [epicWin, setEpicWin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { initializePlayer } = useAppStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !epicWin.trim()) return;

    setIsSubmitting(true);
    
    try {
      initializePlayer(name.trim(), epicWin.trim());
    } catch (error) {
      console.error('初始化失敗:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#1a1a2e', color: 'white' }}>
      <div className="max-w-2xl w-full">
        {/* 標題區域 */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Gamepad2 className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">
            🎮 人生升級線上遊戲
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            將你的日常生活轉化為一場精彩的冒險！
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-300">
            <div className="flex items-center">
              <Target className="h-4 w-4 mr-2" />
              任務規劃
            </div>
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              遊戲化體驗
            </div>
          </div>
        </div>

        {/* 設定表單 */}
        <div className="dbc-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                你的名字
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-800 font-medium"
                required
              />
            </div>

            <div>
              <label htmlFor="epicWin" className="block text-sm font-semibold text-gray-700 mb-2">
                你的 Epic Win（終極目標）
              </label>
              <textarea
                id="epicWin"
                value={epicWin}
                onChange={(e) => setEpicWin(e.target.value)}
                placeholder="例如：通過 CASI L3；英文教學口語自然流暢（每週 2 次英教實戰）"
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-gray-800"
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                這是你想要在 8-12 週內達成的主要目標
              </p>
            </div>

            <button
              type="submit"
              disabled={!name.trim() || !epicWin.trim() || isSubmitting}
              className="w-full dbc-button-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
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
