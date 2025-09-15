'use client';

import { Enemy } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { Shield, AlertTriangle, CheckCircle, Circle } from 'lucide-react';

interface EnemiesProps {
  enemies: Enemy[];
}

export default function Enemies({ enemies }: EnemiesProps) {
  const { activateEnemy } = useGameStore();

  const handleActivateEnemy = (enemyId: string) => {
    activateEnemy(enemyId);
  };

  return (
    <div className="game-card">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-bold text-gray-800">👹 壞蛋</h2>
      </div>

      <div className="space-y-3">
        {enemies.map((enemy) => (
          <div
            key={enemy.id}
            className={`enemy-card ${
              enemy.isActive ? 'ring-2 ring-red-300' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <h3 className={`font-medium ${
                    enemy.isActive ? 'text-red-800' : 'text-gray-800'
                  }`}>
                    {enemy.name}
                  </h3>
                  {enemy.isActive && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      活躍中
                    </span>
                  )}
                </div>
                
                <p className={`text-sm mb-2 ${
                  enemy.isActive ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {enemy.description}
                </p>
                
                <div className={`p-2 rounded-lg text-xs ${
                  enemy.isActive 
                    ? 'bg-red-100 text-red-700 border border-red-200' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  <strong>應對策略：</strong>{enemy.counterStrategy}
                </div>
              </div>

              <button
                onClick={() => handleActivateEnemy(enemy.id)}
                className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                  enemy.isActive
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {enemy.isActive ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {enemies.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Shield className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">今天沒有識別到壞蛋</p>
        </div>
      )}

      {/* 壞蛋提示 */}
      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-xs text-red-700 text-center">
          ⚠️ 識別並標記壞蛋可以幫助你更好地應對挑戰！
        </p>
      </div>
    </div>
  );
}
