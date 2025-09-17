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
    <article className="w-full" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 2rem' }}>
      {/* 文章標題區域 */}
      <header className="text-center mb-20">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl mb-8 shadow-2xl">
          <Gamepad2 className="h-12 w-12 text-white" />
        </div>
        
        <h1 
          className="text-7xl font-bold mb-8"
          style={{
            background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            lineHeight: '1.1'
          }}
        >
          人生升級
        </h1>
        
        <p 
          className="text-2xl mb-12 leading-relaxed"
          style={{ 
            color: '#e5e7eb',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            fontWeight: '300'
          }}
        >
          將你的日常生活轉化為一場精彩的冒險！設定目標，完成任務，升級人生
        </p>
        
        <div 
          className="flex items-center justify-center space-x-12 text-base"
          style={{ color: '#9ca3af' }}
        >
          <div className="flex items-center space-x-3">
            <Target className="h-6 w-6 text-blue-400" />
            <span className="font-medium">智能規劃</span>
          </div>
          <div className="flex items-center space-x-3">
            <Sparkles className="h-6 w-6 text-purple-400" />
            <span className="font-medium">遊戲化體驗</span>
          </div>
          <div className="flex items-center space-x-3">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span className="font-medium">成就系統</span>
          </div>
        </div>
      </header>

      {/* 主要內容區域 */}
      <section className="mb-16">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-12 shadow-2xl">
          <div className="text-center mb-12">
            <h2 
              className="text-4xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              開始你的冒險
            </h2>
            <p 
              className="text-xl leading-relaxed"
              style={{ color: '#d1d5db' }}
            >
              告訴我們你的名字和終極目標，讓我們為你量身打造專屬的成長旅程
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="space-y-4">
              <label 
                htmlFor="name" 
                className="block text-xl font-semibold"
                style={{ color: 'white' }}
              >
                你的名字
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="輸入你的名字"
                className="w-full px-6 py-5 bg-transparent border border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 text-white placeholder-gray-300 text-lg font-medium"
                required
              />
            </div>

            <div className="space-y-4">
              <label 
                htmlFor="epicWin" 
                className="block text-xl font-semibold"
                style={{ color: 'white' }}
              >
                你的 Epic Win（終極目標）
              </label>
              <textarea
                id="epicWin"
                value={epicWin}
                onChange={(e) => setEpicWin(e.target.value)}
                placeholder="例如：通過 CASI L3 滑雪教練認證；英文教學口語自然流暢（每週 2 次英教實戰）"
                rows={5}
                className="w-full px-6 py-5 bg-transparent border border-white/30 rounded-2xl focus:ring-4 focus:ring-blue-400/50 focus:border-transparent transition-all duration-300 resize-none text-white placeholder-gray-300 text-lg leading-relaxed"
                required
              />
              <p 
                className="text-base leading-relaxed"
                style={{ color: '#9ca3af' }}
              >
                這是你想要在 8-12 週內達成的主要目標。請具體描述你想要實現的成果，這將幫助我們為你設計最適合的任務和挑戰。
              </p>
            </div>

            <div className="text-center pt-6">
              <button
                type="submit"
                disabled={!name.trim() || !epicWin.trim() || isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-6 px-12 rounded-2xl font-bold text-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-2xl transform hover:scale-105 mx-auto"
                style={{ minWidth: '280px' }}
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
            </div>
          </form>
        </div>
      </section>

      {/* 特色說明區域 */}
      <section className="mt-20">
        <div className="text-center mb-16">
          <h2 
            className="text-3xl font-bold mb-6"
            style={{ color: 'white' }}
          >
            為什麼選擇人生升級？
          </h2>
          <p 
            className="text-lg leading-relaxed max-w-2xl mx-auto"
            style={{ color: '#d1d5db' }}
          >
            我們結合了最新的遊戲化設計理念和科學的目標管理方法，為你打造一個既有趣又有效的成長平台
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <article className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-8">
              <Target className="h-10 w-10 text-white" />
            </div>
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              智能任務生成
            </h3>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#d1d5db' }}
            >
              系統會根據你的目標自動生成每日任務，讓規劃變得簡單。不再需要花時間思考今天要做什麼，專注於執行就好。
            </p>
          </article>
          
          <article className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl mb-8">
              <Trophy className="h-10 w-10 text-white" />
            </div>
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              遊戲化體驗
            </h3>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#d1d5db' }}
            >
              經驗值、等級、成就系統讓成長過程更有趣。每完成一個任務都能獲得即時反饋，讓你的努力變得更有意義。
            </p>
          </article>
          
          <article className="text-center p-10 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:bg-white/15 transition-all duration-300">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl mb-8">
              <Users className="h-10 w-10 text-white" />
            </div>
            <h3 
              className="text-2xl font-bold mb-4"
              style={{ color: 'white' }}
            >
              社交互動
            </h3>
            <p 
              className="text-lg leading-relaxed"
              style={{ color: '#d1d5db' }}
            >
              與朋友一起成長，互相支持，共同進步。分享你的成就，獲得他人的鼓勵，讓成長路上不再孤單。
            </p>
          </article>
        </div>
      </section>
    </article>
  );
}