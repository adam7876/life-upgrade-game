'use client';

import { Quest } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { CheckCircle, Clock, Star, Target, Zap } from 'lucide-react';

interface QuestListProps {
  quests: Quest[];
}

export default function QuestList({ quests }: QuestListProps) {
  const { completeQuest } = useGameStore();

  const handleQuestComplete = (questId: string) => {
    completeQuest(questId);
  };

  const getQuestTypeIcon = (type: string) => {
    switch (type) {
      case 'main':
        return <Target className="h-4 w-4 text-red-500" />;
      case 'side':
        return <Star className="h-4 w-4 text-blue-500" />;
      case 'random':
        return <Zap className="h-4 w-4 text-yellow-500" />;
      case 'emergency':
        return <Zap className="h-4 w-4 text-orange-500" />;
      case 'coop':
        return <Target className="h-4 w-4 text-green-500" />;
      default:
        return <Target className="h-4 w-4 text-gray-500" />;
    }
  };

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case 'main':
        return 'border-red-200 bg-red-50';
      case 'side':
        return 'border-blue-200 bg-blue-50';
      case 'random':
        return 'border-yellow-200 bg-yellow-50';
      case 'emergency':
        return 'border-orange-200 bg-orange-50';
      case 'coop':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const renderDifficultyStars = (difficulty: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-3 w-3 ${
              star <= difficulty ? 'difficulty-star' : 'difficulty-star empty'
            }`}
            fill={star <= difficulty ? 'currentColor' : 'none'}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="game-card">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">📋 今日任務</h2>
        <div className="text-sm text-gray-600">
          {quests.filter(q => q.isCompleted).length} / {quests.length} 完成
        </div>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`quest-card ${getQuestTypeColor(quest.type)} ${
              quest.isCompleted ? 'quest-completed' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  {getQuestTypeIcon(quest.type)}
                  <h3 className={`font-medium ${
                    quest.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {quest.title}
                  </h3>
                  {quest.isRequired && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      必做
                    </span>
                  )}
                </div>
                
                <p className={`text-sm mb-2 ${
                  quest.isCompleted ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {quest.description}
                </p>

                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{quest.estimatedTime} 分鐘</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{quest.experience} EXP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>難度</span>
                    {renderDifficultyStars(quest.difficulty)}
                  </div>
                </div>

                {quest.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {quest.tags.map((tag) => (
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
                onClick={() => handleQuestComplete(quest.id)}
                disabled={quest.isCompleted}
                className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                  quest.isCompleted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 hover:scale-110'
                }`}
              >
                <CheckCircle className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {quests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Target className="h-12 w-12 mx-auto mb-3 text-gray-300" />
          <p>今天沒有任務</p>
          <p className="text-sm">系統會根據你的目標自動生成任務</p>
        </div>
      )}
    </div>
  );
}
