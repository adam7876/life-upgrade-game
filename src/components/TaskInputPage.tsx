'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Plus, Clock, Star, Save, Calendar, Target, X } from 'lucide-react';
import { Task } from '@/types/game';

export default function TaskInputPage() {
  const { player, tomorrowCard, addTask, removeTask, saveTomorrowCard } = useAppStore();
  const [showTaskForm, setShowTaskForm] = useState(false);

  // 新任務表單狀態
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    estimatedTime: 30,
    difficulty: 3 as 1 | 2 | 3 | 4 | 5,
    tags: [] as string[]
  });

  const handleAddTask = () => {
    if (!newTask.title.trim()) return;

    addTask({
      title: newTask.title.trim(),
      description: newTask.description.trim(),
      estimatedTime: newTask.estimatedTime,
      difficulty: newTask.difficulty,
      isCompleted: false,
      tags: newTask.tags
    });

    // 重置表單
    setNewTask({
      title: '',
      description: '',
      estimatedTime: 30,
      difficulty: 3,
      tags: []
    });
    setShowTaskForm(false);
  };

  const handleSaveTomorrowCard = () => {
    saveTomorrowCard();
  };

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

  if (!player || !tomorrowCard) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* 頁面標題 */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <Calendar className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          規劃明日任務
        </h1>
        <p className="text-xl text-gray-300">為明天 {tomorrowCard.date} 設定你的任務</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：任務列表 */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">明日任務</h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              <span>新增任務</span>
            </button>
          </div>

          {/* 任務列表 */}
          <div className="space-y-6">
            {tomorrowCard.tasks.length === 0 ? (
              <div className="text-center py-16 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
                <div className="text-6xl mb-6">📝</div>
                <p className="text-gray-300 text-xl mb-2">還沒有設定任何任務</p>
                <p className="text-gray-400">點擊「新增任務」開始規劃你的明天</p>
              </div>
            ) : (
              tomorrowCard.tasks.map((task, index) => (
                <div key={task.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3">{task.title}</h3>
                      {task.description && (
                        <p className="text-gray-300 mb-4 leading-relaxed">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-6 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{task.estimatedTime} 分鐘</span>
                        </div>
                        <div className="flex items-center space-x-2">
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
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-400 hover:text-red-300 transition-colors ml-4 p-2 hover:bg-red-500/10 rounded-lg"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 右側：任務表單 */}
        <div className="lg:col-span-1">
          {showTaskForm && (
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 shadow-2xl sticky top-8">
              <h3 className="text-2xl font-bold text-white mb-6">新增任務</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-white mb-3">任務標題</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="輸入任務標題"
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-4 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">任務描述</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="輸入任務描述（可選）"
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-300 focus:ring-4 focus:ring-blue-400/50 focus:border-transparent resize-none backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">預估時間（分鐘）</label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    step="5"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:ring-4 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="block text-lg font-semibold text-white mb-3">難度</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => setNewTask({ ...newTask, difficulty: level as 1 | 2 | 3 | 4 | 5 })}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          newTask.difficulty >= level
                            ? 'bg-yellow-400 text-yellow-900 shadow-lg'
                            : 'bg-white/20 text-gray-300 hover:bg-white/30'
                        }`}
                      >
                        <Star className="h-5 w-5" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim()}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    新增任務
                  </button>
                  <button
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-3 text-gray-300 hover:text-white transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 保存按鈕 */}
          {tomorrowCard.tasks.length > 0 && (
            <div className="mt-8">
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-6 text-center">
                <p className="text-gray-300 mb-4 text-lg">
                  已設定 <span className="text-white font-bold text-xl">{tomorrowCard.tasks.length}</span> 個任務
                </p>
                <button
                  onClick={handleSaveTomorrowCard}
                  className="flex items-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 mx-auto font-bold text-lg shadow-2xl"
                >
                  <Save className="h-6 w-6" />
                  <span>保存明日任務</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}