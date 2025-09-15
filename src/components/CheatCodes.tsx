'use client';

import { CheatCode } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { Code, CheckCircle, Circle } from 'lucide-react';

interface CheatCodesProps {
  cheatCodes: CheatCode[];
}

export default function CheatCodes({ cheatCodes }: CheatCodesProps) {
  const { useCheatCode } = useGameStore();

  const handleUseCheatCode = (cheatCodeId: string) => {
    useCheatCode(cheatCodeId);
  };

  const getCheatCodeIcon = (type: string) => {
    switch (type) {
      case 'responsibility':
        return '🎯';
      case 'reality':
        return '📝';
      case 'reduction':
        return '📊';
      case 'sharing':
        return '💬';
      default:
        return '✨';
    }
  };

  const getCheatCodeColor = (type: string) => {
    switch (type) {
      case 'responsibility':
        return 'from-green-50 to-emerald-50 border-green-200';
      case 'reality':
        return 'from-blue-50 to-cyan-50 border-blue-200';
      case 'reduction':
        return 'from-purple-50 to-pink-50 border-purple-200';
      case 'sharing':
        return 'from-orange-50 to-red-50 border-orange-200';
      default:
        return 'from-gray-50 to-gray-100 border-gray-200';
    }
  };

  return (
    <div className="game-card">
      <div className="flex items-center space-x-2 mb-4">
        <Code className="h-6 w-6 text-indigo-600" />
        <h2 className="text-xl font-bold text-gray-800">🛠️ 外掛技能</h2>
      </div>

      <div className="space-y-3">
        {cheatCodes.map((cheatCode) => (
          <div
            key={cheatCode.id}
            className={`cheat-code-card ${getCheatCodeColor(cheatCode.type)} ${
              cheatCode.isUsed ? 'opacity-60' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-lg">{getCheatCodeIcon(cheatCode.type)}</span>
                  <h3 className={`font-medium ${
                    cheatCode.isUsed ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {cheatCode.name}
                  </h3>
                </div>
                
                <p className={`text-sm mb-2 ${
                  cheatCode.isUsed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {cheatCode.description}
                </p>
                
                <p className={`text-xs ${
                  cheatCode.isUsed ? 'text-gray-400' : 'text-indigo-600'
                }`}>
                  效果：{cheatCode.effect}
                </p>
              </div>

              <button
                onClick={() => handleUseCheatCode(cheatCode.id)}
                disabled={cheatCode.isUsed}
                className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                  cheatCode.isUsed
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600 hover:scale-110'
                }`}
              >
                {cheatCode.isUsed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {cheatCodes.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Code className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">今天沒有可用外掛</p>
        </div>
      )}

      {/* 外掛提示 */}
      <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-lg">
        <p className="text-xs text-indigo-700 text-center">
          💡 外掛技能是基於心理學的自我提升技巧！
        </p>
      </div>
    </div>
  );
}
