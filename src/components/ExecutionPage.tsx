'use client';

import { useState } from 'react';
import { useAppStore } from '@/store/app-store';
import { 
  CheckCircle, 
  Clock, 
  Star, 
  Heart, 
  MapPin, 
  Cloud,
  Target,
  Zap,
  Users,
  Shield,
  Code,
  Trophy,
  AlertTriangle,
  Plus,
  Edit3
} from 'lucide-react';

export default function ExecutionPage() {
  const { player, todayCard, completeTask, updateMood, updateLocation } = useAppStore();
  const [isEditingMood, setIsEditingMood] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [newMood, setNewMood] = useState(3);
  const [newLocation, setNewLocation] = useState('');
  const [newWeather, setNewWeather] = useState('☀️');

  if (!player || !todayCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">載入今日任務中...</p>
        </div>
      </div>
    );
  }

  const handleCompleteTask = (taskId: string) => {
    completeTask(taskId);
  };

  const handleSaveMood = () => {
    updateMood(newMood);
    setIsEditingMood(false);
  };

  const handleSaveLocation = () => {
    updateLocation(newLocation, newWeather);
    setIsEditingLocation(false);
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

  const completedTasks = todayCard.tasks.filter(task => task.isCompleted).length;
  const totalTasks = todayCard.tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* 頁面標題 */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">執行今日任務</h1>
                <p className="text-gray-600">{todayCard.date}</p>
              </div>
            </div>
            
            {/* 進度條 */}
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{completedTasks}/{totalTasks}</div>
              <div className="text-sm text-gray-500">任務完成</div>
            </div>
          </div>

          {/* 整體進度條 */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 主要內容區域 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 左側：基本信息 */}
          <div className="space-y-6">
            {/* 1) 主線任務（Epic Win） */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-600" />
                1) 主線任務（Epic Win）
              </h2>
              <p className="text-gray-700 bg-purple-50 p-3 rounded-lg">
                {todayCard.epicWin}
              </p>
            </div>

            {/* 2) 今日關卡 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                2) 今日關卡
              </h2>
              <div className="space-y-2 mb-4">
                {todayCard.levels.map((level) => (
                  <div
                    key={level.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      level.isCompleted ? 'bg-green-50 text-green-800' : 'bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="font-medium">{level.name}</span>
                    {level.isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>本關目標：</strong>{todayCard.currentLevelTarget || '設定你的目標'}
                </p>
              </div>
            </div>

            {/* 心情和位置 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3">狀態信息</h2>
              
              {/* 心情 */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4 text-pink-500" />
                  <span className="text-sm text-gray-700">心情</span>
                </div>
                {isEditingMood ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={newMood}
                      onChange={(e) => setNewMood(parseInt(e.target.value))}
                      className="w-20"
                    />
                    <span className="text-sm font-medium">{newMood}/5</span>
                    <button
                      onClick={handleSaveMood}
                      className="text-green-600 hover:text-green-700"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setIsEditingMood(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((mood) => (
                        <div
                          key={mood}
                          className={`w-3 h-3 rounded-full ${
                            mood <= player.mood ? 'bg-pink-400' : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        setNewMood(player.mood);
                        setIsEditingMood(true);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit3 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* 位置和天氣 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-500" />
                  <span className="text-sm text-gray-700">位置</span>
                </div>
                {isEditingLocation ? (
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      placeholder="位置"
                      className="w-20 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                    <input
                      type="text"
                      value={newWeather}
                      onChange={(e) => setNewWeather(e.target.value)}
                      placeholder="天氣"
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                    />
                    <button
                      onClick={handleSaveLocation}
                      className="text-green-600 hover:text-green-700"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setIsEditingLocation(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">{player.location}</span>
                    <span className="text-sm">{player.weather}</span>
                    <button
                      onClick={() => {
                        setNewLocation(player.location);
                        setNewWeather(player.weather);
                        setIsEditingLocation(true);
                      }}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit3 className="h-3 w-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 中間：任務執行 */}
          <div className="space-y-6">
            {/* 3) 今日任務 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                3) 今日任務（最多3項）
              </h2>
              
              <div className="space-y-3">
                {todayCard.tasks.map((task, index) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-lg border transition-all duration-200 ${
                      task.isCompleted
                        ? 'bg-green-50 border-green-200 opacity-75'
                        : 'bg-blue-50 border-blue-200 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-blue-600">Q{index + 1}</span>
                          <h3 className={`font-medium ${
                            task.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                          }`}>
                            {task.title}
                          </h3>
                        </div>
                        
                        {task.description && (
                          <p className={`text-sm mb-2 ${
                            task.isCompleted ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {task.description}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{task.estimatedTime} 分</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>難度：</span>
                            {renderDifficultyStars(task.difficulty)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCompleteTask(task.id)}
                        disabled={task.isCompleted}
                        className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                          task.isCompleted
                            ? 'bg-green-200 text-green-600 cursor-not-allowed'
                            : 'bg-green-500 text-white hover:bg-green-600 hover:scale-110'
                        }`}
                      >
                        <CheckCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {todayCard.ifThenPlan && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>If-Then：</strong>{todayCard.ifThenPlan}
                  </p>
                </div>
              )}
            </div>

            {/* 4) 能量道具 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600" />
                4) 能量道具（Power-Ups）
              </h2>
              <div className="space-y-2">
                {todayCard.powerUps.map((powerUp) => (
                  <div
                    key={powerUp.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      powerUp.isUsed ? 'bg-gray-50 text-gray-500' : 'bg-purple-50 text-purple-800'
                    }`}
                  >
                    <span className="text-sm">{powerUp.name}</span>
                    {powerUp.isUsed ? (
                      <CheckCircle className="h-4 w-4 text-gray-400" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-purple-300 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右側：工具和狀態 */}
          <div className="space-y-6">
            {/* 5) 盟友 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Users className="h-5 w-5 mr-2 text-blue-600" />
                5) 盟友（Co-op）
              </h2>
              <div className="space-y-2">
                {todayCard.allies.map((ally) => (
                  <div
                    key={ally.id}
                    className={`flex items-center justify-between p-2 rounded-lg ${
                      ally.isCheckedIn ? 'bg-green-50 text-green-800' : 'bg-blue-50 text-blue-800'
                    }`}
                  >
                    <div>
                      <span className="text-sm font-medium">{ally.name}</span>
                      <p className="text-xs text-gray-500">{ally.checkInTime} - {ally.method}</p>
                    </div>
                    {ally.isCheckedIn ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <div className="w-4 h-4 border-2 border-blue-300 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 6) 壞蛋 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-red-600" />
                6) 壞蛋（Bad Guys）
              </h2>
              <div className="space-y-3">
                {todayCard.enemies.map((enemy, index) => (
                  <div key={enemy.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1">
                      <AlertTriangle className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium text-red-800">{enemy.name}</span>
                    </div>
                    <p className="text-xs text-red-600">→ {enemy.counterStrategy}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 7) 分心避雷 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                7) 分心避雷
              </h2>
              <div className="space-y-2">
                {todayCard.distractions.map((distraction) => (
                  <div key={distraction.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <p className="text-sm font-medium text-orange-800 mb-1">{distraction.name}</p>
                    <p className="text-xs text-orange-600">→ {distraction.alternativeAction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8) 外掛 */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <Code className="h-5 w-5 mr-2 text-indigo-600" />
                8) 外掛（Cheat Codes）
              </h2>
              <div className="space-y-2">
                {todayCard.cheatCodes.map((cheatCode) => (
                  <div
                    key={cheatCode.id}
                    className={`p-2 rounded-lg ${
                      cheatCode.isUsed ? 'bg-gray-50 text-gray-500' : 'bg-indigo-50 text-indigo-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{cheatCode.name}</span>
                      {cheatCode.isUsed ? (
                        <CheckCircle className="h-4 w-4 text-gray-400" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-indigo-300 rounded-full" />
                      )}
                    </div>
                    {cheatCode.description && (
                      <p className="text-xs text-gray-600 mt-1">{cheatCode.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 底部：計分板和成就 */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 9) 計分板 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
              9) 計分板（Score）
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">+{todayCard.score.experience}</div>
                <div className="text-sm text-yellow-600">經驗值</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">{todayCard.score.streak}</div>
                <div className="text-sm text-blue-600">連擊天數</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-700">心流狀態</span>
                <span className="text-sm text-gray-600">{todayCard.score.flow}/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(todayCard.score.flow / 5) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* 10) 成就 / 戰利品 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy className="h-5 w-5 mr-2 text-green-600" />
              10) 成就 / 戰利品
            </h2>
            <div className="space-y-2">
              {todayCard.achievements.length > 0 ? (
                todayCard.achievements.map((achievement, index) => (
                  <div key={index} className="p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">{achievement}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 text-center py-4">還沒有成就</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
