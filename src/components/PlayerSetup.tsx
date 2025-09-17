'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Gamepad2, Target, Sparkles, Trophy, Users } from 'lucide-react';

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
    <div className="w-full max-w-4xl mx-auto">
      {/* 主標題區域 */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
          <Gamepad2 className="h-12 w-12 text-white" />
        </div>
        
        <h1 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          人生升級
        </h1>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          將你的日常生活轉化為一場精彩的冒險！設定目標，完成任務，升級人生
        </p>
        
        <div className="flex items-center justify-center space-x-8 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span>智能規劃</span>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-purple-400" />
            <span>遊戲化體驗</span>
          </div>
          <div className="flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span>成就系統</span>
          </div>
        </div>
      </div>

      {/* 設定表單 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">開始你的冒險</h2>
          <p className="text-gray-300">告訴我們你的名字和終極目標</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-3">
            <label htmlFor="name" className="block text-lg font-semibold text-white">
              你的名字
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="輸入你的名字"
              className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300 text-lg font-medium"
              required
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="epicWin" className="block text-lg font-semibold text-white">
              你的 Epic Win（終極目標）
            </label>
            <textarea
              id="epicWin"
              value={epicWin}
              onChange={(e) => setEpicWin(e.target.value)}
              placeholder="例如：通過 CASI L3 滑雪教練認證；英文教學口語自然流暢（每週 2 次英教實戰）"
              rows={4}
              className="w-full px-6 py-4 bg-transparent border border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-300 text-lg"
              required
            />
            <p className="text-sm text-gray-400">
              這是你想要在 8-12 週內達成的主要目標
            </p>
          </div>

          <button
            type="submit"
            disabled={!name.trim() || !epicWin.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-5 px-8 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                <span>正在初始化...</span>
              </>
            ) : (
              <>
                <Gamepad2 className="h-6 w-6" />
                <span>開始遊戲！</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 特色說明 */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">智能任務生成</h3>
          <p className="text-gray-300 leading-relaxed">系統會根據你的目標自動生成每日任務，讓規劃變得簡單</p>
        </div>
        
        <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl mb-6">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">遊戲化體驗</h3>
          <p className="text-gray-300 leading-relaxed">經驗值、等級、成就系統讓成長過程更有趣</p>
        </div>
        
        <div className="text-center p-8 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-6">
            <Users className="h-8 w-8 text-white" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">社交互動</h3>
          <p className="text-gray-300 leading-relaxed">與朋友一起成長，互相支持，共同進步</p>
        </div>
      </div>
    </div>
  );
}