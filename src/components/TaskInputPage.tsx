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
      <div className="max-w-4xl mx-auto">
        {/* 頁面標題 */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">規劃明日任務</h1>
              <p className="text-gray-600">為明天 {tomorrowCard.date} 設定你的任務</p>
            </div>
          </div>
          
          {/* Epic Win 顯示 */}
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-4">
            <h2 className="text-lg font-semibold text-purple-800 mb-2">🎯 Epic Win</h2>
            <p className="text-purple-700">{player.currentEpicWin}</p>
          </div>
        </div>

        {/* 任務列表 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 左側：任務列表 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">明日任務</h2>
              <button
                onClick={() => setShowTaskForm(true)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>新增任務</span>
              </button>
            </div>

            <div className="space-y-3">
              {tomorrowCard.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{task.title}</h3>
                      {task.description && (
                        <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{task.estimatedTime} 分鐘</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>難度</span>
                          {renderDifficultyStars(task.difficulty)}
                        </div>
                      </div>

                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => removeTask(task.id)}
                      className="ml-3 text-red-500 hover:text-red-700 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}

              {tomorrowCard.tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Plus className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>還沒有任務</p>
                  <p className="text-sm">點擊「新增任務」開始規劃</p>
                </div>
              )}
            </div>
          </div>

          {/* 右側：任務表單 */}
          <div className="space-y-6">
            {showTaskForm && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">新增任務</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      任務標題 *
                    </label>
                    <input
                      type="text"
                      value={newTask.title}
                      onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                      placeholder="輸入任務標題"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      任務描述
                    </label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      placeholder="描述任務內容"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        預估時間（分鐘）
                      </label>
                      <input
                        type="number"
                        value={newTask.estimatedTime}
                        onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) || 30 })}
                        min="5"
                        max="240"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        難度
                      </label>
                      <select
                        value={newTask.difficulty}
                        onChange={(e) => setNewTask({ ...newTask, difficulty: parseInt(e.target.value) as 1 | 2 | 3 | 4 | 5 })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value={1}>★ 簡單</option>
                        <option value={2}>★★ 容易</option>
                        <option value={3}>★★★ 中等</option>
                        <option value={4}>★★★★ 困難</option>
                        <option value={5}>★★★★★ 極難</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleAddTask}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      新增任務
                    </button>
                    <button
                      onClick={() => setShowTaskForm(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      取消
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 保存按鈕 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">準備好了嗎？</h3>
                <p className="text-gray-600 mb-4">
                  保存後，明天的任務將被鎖定，無法修改
                </p>
                <button
                  onClick={handleSaveTomorrowCard}
                  className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors mx-auto"
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
