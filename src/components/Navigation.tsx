'use client';

import { useAppStore } from '@/store/app-store';
import { Calendar, Plus, Play, User } from 'lucide-react';

export default function Navigation() {
  const { player, currentPage, setCurrentPage, getTodayDate } = useAppStore();
  const today = getTodayDate();

  const navItems = [
    {
      id: 'input',
      label: '輸入任務',
      icon: Plus,
      description: '規劃明天的任務'
    },
    {
      id: 'execute',
      label: '執行任務',
      icon: Play,
      description: '執行今日任務'
    }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo 和標題 */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">人生升級</h1>
                <p className="text-xs text-gray-500">{today}</p>
              </div>
            </div>
          </div>

          {/* 導航項目 */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as 'input' | 'execute')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* 用戶信息 */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{player?.name}</p>
                <p className="text-xs text-gray-500">等級 1</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
