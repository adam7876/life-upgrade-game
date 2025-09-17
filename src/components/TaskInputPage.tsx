'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { Plus, Clock, Star, Save, Calendar } from 'lucide-react';
import { Task } from '@/types/game';

export default function TaskInputPage() {
  const { player, tomorrowCard, addTask, updateTask, removeTask, saveTomorrowCard } = useAppStore();
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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
            className={`h-3 w-3 ${
              star <= difficulty ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (!player || !tomorrowCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-6">
      {/* 頁面標題 */}
      <div className="mb-12">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Calendar className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">規劃明日任務</h1>
            <p className="text-gray-300 text-lg">為明天 {tomorrowCard.date} 設定你的任務</p>
          </div>
        </div>
        
        {/* Epic Win 顯示 */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-2xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🎯</span>
            </div>
            <h2 className="text-xl font-bold text-white">Epic Win</h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed">{player.currentEpicWin}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左側：任務列表 */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">明日任務</h2>
            <button
              onClick={() => setShowTaskForm(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>新增任務</span>
            </button>
          </div>

          {/* 任務列表 */}
          <div className="space-y-4">
            {tomorrowCard.tasks.length === 0 ? (
              <div className="text-center py-12 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-4xl mb-4">📝</div>
                <p className="text-gray-300 text-lg">還沒有設定任何任務</p>
                <p className="text-gray-400 text-sm mt-2">點擊「新增任務」開始規劃你的明天</p>
              </div>
            ) : (
              tomorrowCard.tasks.map((task, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 hover:bg-white/15 transition-all duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{task.title}</h3>
                      {task.description && (
                        <p className="text-gray-300 text-sm mb-3">{task.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{task.estimatedTime} 分鐘</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4" />
                          <span>難度</span>
                          {renderDifficultyStars(task.difficulty)}
                        </div>
                      </div>
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {task.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="text-red-400 hover:text-red-300 transition-colors ml-4"
                    >
                      ✕
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
            <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-4">新增任務</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">任務標題</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="輸入任務標題"
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">任務描述</label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="輸入任務描述（可選）"
                    rows={3}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">預估時間（分鐘）</label>
                  <input
                    type="number"
                    min="5"
                    max="480"
                    step="5"
                    value={newTask.estimatedTime}
                    onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                    className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">難度</label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <button
                        key={level}
                        onClick={() => setNewTask({ ...newTask, difficulty: level as 1 | 2 | 3 | 4 | 5 })}
                        className={`p-2 rounded-lg transition-colors ${
                          newTask.difficulty >= level
                            ? 'bg-yellow-400 text-yellow-900'
                            : 'bg-white/20 text-gray-300 hover:bg-white/30'
                        }`}
                      >
                        <Star className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim()}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    新增任務
                  </button>
                  <button
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 保存按鈕 */}
          {tomorrowCard.tasks.length > 0 && (
            <div className="mt-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <p className="text-gray-300 mb-4">
                  已設定 <span className="text-white font-semibold">{tomorrowCard.tasks.length}</span> 個任務
                </p>
                <button
                  onClick={handleSaveTomorrowCard}
                  className="flex items-center space-x-3 bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors mx-auto font-semibold text-lg shadow-lg"
                >
                  <Save className="h-5 w-5" />
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