'use client';

import { Ally } from '@/types/game';
import { useGameStore } from '@/store/game-store';
import { Users, CheckCircle, Circle, MessageCircle, Phone, Coffee } from 'lucide-react';

interface AlliesProps {
  allies: Ally[];
}

export default function Allies({ allies }: AlliesProps) {
  const { checkInWithAlly } = useGameStore();

  const handleCheckIn = (allyId: string) => {
    checkInWithAlly(allyId);
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'message':
        return <MessageCircle className="h-4 w-4" />;
      case 'call':
        return <Phone className="h-4 w-4" />;
      case 'meet':
        return <Coffee className="h-4 w-4" />;
      default:
        return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'message':
        return 'text-blue-500';
      case 'call':
        return 'text-green-500';
      case 'meet':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="game-card">
      <div className="flex items-center space-x-2 mb-4">
        <Users className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-bold text-gray-800">🤝 盟友</h2>
      </div>

      <div className="space-y-3">
        {allies.map((ally) => (
          <div
            key={ally.id}
            className={`ally-card ${
              ally.isCheckedIn ? 'opacity-75' : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {ally.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className={`font-medium ${
                    ally.isCheckedIn ? 'line-through text-gray-500' : 'text-gray-800'
                  }`}>
                    {ally.name}
                  </h3>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Check-in 時間：</span>
                  <span className="font-medium">{ally.checkInTime}</span>
                </div>
                
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-1">
                  <span>方式：</span>
                  <div className={`flex items-center space-x-1 ${getMethodColor(ally.method)}`}>
                    {getMethodIcon(ally.method)}
                    <span className="capitalize">{ally.method}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCheckIn(ally.id)}
                disabled={ally.isCheckedIn}
                className={`ml-3 p-2 rounded-full transition-all duration-200 ${
                  ally.isCheckedIn
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-110'
                }`}
              >
                {ally.isCheckedIn ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {allies.length === 0 && (
        <div className="text-center py-6 text-gray-500">
          <Users className="h-8 w-8 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">今天沒有盟友安排</p>
        </div>
      )}

      {/* 盟友提示 */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700 text-center">
          💡 與盟友保持聯繫可以獲得額外的動力和支持！
        </p>
      </div>
    </div>
  );
}
