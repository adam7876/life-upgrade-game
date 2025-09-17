'use client';

import { useAppStore } from '@/store/app-store';
import { CheckCircle, Clock, Star, Target, Calendar, User } from 'lucide-react';

export default function ExecutionPage() {
  const { player, todayCard } = useAppStore();

  if (!player || !todayCard) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">載入中...</p>
        </div>
      </div>
    );
  }

  const renderDifficultyStars = (difficulty: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= difficulty ? 'text-yellow-400 fill-current' : 'text-gray-400'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6">
          <User className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          執行任務
        </h1>
        <p className="text-xl text-gray-300">今天是 {todayCard.date}，開始你的冒險吧！</p>
      </div>

      {/* Epic Win 顯示 */}
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 mb-12 shadow-2xl">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Target className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Epic Win</h2>
        </div>
        <p className="text-gray-300 text-lg leading-relaxed pl-16">{player.currentEpicWin}</p>
      </div>

      {/* 任務列表 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-white">今日任務</h2>
          <div className="flex items-center space-x-2 text-gray-300">
            <Calendar className="h-5 w-5" />
            <span>{todayCard.date}</span>
          </div>
        </div>

        {todayCard.tasks.length === 0 ? (
          <div className="text-center py-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
            <div className="text-6xl mb-6">🎯</div>
            <p className="text-gray-300 text-xl mb-2">今天沒有任務</p>
            <p className="text-gray-400">去輸入任務頁面設定明天的任務吧！</p>
          </div>
        ) : (
          todayCard.tasks.map((task, index) => (
            <div key={task.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start space-x-4">
                <button className="mt-1">
                  <CheckCircle className={`h-6 w-6 ${
                    task.isCompleted ? 'text-green-400' : 'text-gray-400 hover:text-green-400'
                  } transition-colors`} />
                </button>
                
                <div className="flex-1">
                  <h3 className={`text-xl font-semibold mb-3 ${
                    task.isCompleted ? 'text-gray-400 line-through' : 'text-white'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.description && (
                    <p className={`mb-4 leading-relaxed ${
                      task.isCompleted ? 'text-gray-500' : 'text-gray-300'
                    }`}>
                      {task.description}
                    </p>
                  )}
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{task.estimatedTime} 分鐘</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Star className="h-4 w-4" />
                      <span>難度</span>
                      {renderDifficultyStars(task.difficulty)}
                    </div>
                  </div>
                  
                  {task.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {task.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 統計信息 */}
      {todayCard.tasks.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-white mb-2">{todayCard.tasks.length}</div>
            <div className="text-gray-300">總任務數</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {todayCard.tasks.filter(task => task.isCompleted).length}
            </div>
            <div className="text-gray-300">已完成</div>
          </div>
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {todayCard.tasks.reduce((total, task) => total + task.estimatedTime, 0)}
            </div>
            <div className="text-gray-300">總時間（分鐘）</div>
          </div>
        </div>
      )}
    </div>
  );
}