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
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
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
          <div className="dbc-card">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">🎯</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Epic Win</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{player.currentEpicWin}</p>
          </div>
        </div>

        {/* 任務列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左側：任務列表 */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">明日任務</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="dbc-button-primary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>新增任務</span>
              </button>
            </div>

            <div className="space-y-4">
              {tomorrowCard.tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="dbc-card hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                          Q{index + 1}
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{task.title}</h3>
                      </div>
                      
                      {task.description && (
                        <p className="text-gray-600 mb-3 ml-9">{task.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500 ml-9">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{task.estimatedTime} 分鐘</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">難度</span>
                          {renderDifficultyStars(task.difficulty)}
                        </div>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 ml-9">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeTask(task.id)}
                      className="ml-4 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              {tomorrowCard.tasks.length === 0 && (
                <div className="dbc-card text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">還沒有任務</h3>
                  <p className="text-gray-500">點擊「新增任務」開始規劃</p>
                </div>
              )}
            </div>
          </div>

          {/* 右側：任務表單 */}
          <div className="space-y-6">
            {showTaskForm && (
              <div className="dbc-card">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">新增任務</h3>
                </div>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      任務標題 *
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="輸入任務標題"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      任務描述
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="描述任務內容"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-800"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        預估時間（分鐘）
                      </label>
                      <input
                        type="number"
                        value={newTask.estimatedTime}
                        onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                        min="5"
                        max="240"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        難度
                      </label>
                      <select
                        value={newTask.difficulty}
                        onChange={(e) => setNewTask({ ...newTask, difficulty: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 font-medium"
                      >
                        <option value={1}>★ 簡單</option>
                        <option value={2}>★★ 容易</option>
                        <option value={3}>★★★ 中等</option>
                        <option value={4}>★★★★ 困難</option>
                        <option value={5}>★★★★★ 極難</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button
                      onClick={handleAddTask}
                      className="flex-1 dbc-button-primary"
                    >
                      新增任務
                    </button>
                    <button
                      onClick={() => setShowTaskForm(false)}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 保存按鈕 */}
            <div className="dbc-card">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Save className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">準備好了嗎？</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  保存後，明天的任務將被鎖定，無法修改
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
          </div>
        </div>
      </div>
    </div>
  );
}
