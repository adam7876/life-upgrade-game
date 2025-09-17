'use client';

import { useAppStore } from '@/store/app-store';
import { Calendar, User, Home } from 'lucide-react';

export default function Navigation() {
  const { currentPage, setCurrentPage, player } = useAppStore();

  const navItems = [
    { id: 'input', label: '輸入任務', icon: Calendar },
    { id: 'execute', label: '執行任務', icon: User },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Home className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">人生升級</h1>
              <p className="text-xs text-gray-400">{player?.name}</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as 'input' | 'execute')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}