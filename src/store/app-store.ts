// 重新設計的應用狀態管理
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player, DailyCard, Task } from '@/types/game';

interface AppState {
  // 玩家狀態
  player: Player | null;
  
  // 當前日期
  currentDate: string;
  
  // 今日日卡
  todayCard: DailyCard | null;
  
  // 明日日卡（可編輯）
  tomorrowCard: DailyCard | null;
  
  // 當前頁面
  currentPage: 'setup' | 'input' | 'execute';
  
  // Actions
  initializePlayer: (name: string, epicWin: string) => void;
  setCurrentPage: (page: 'setup' | 'input' | 'execute') => void;
  
  // 任務輸入相關
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  removeTask: (taskId: string) => void;
  
  // 日卡管理
  saveTomorrowCard: () => void;
  loadTodayCard: () => void;
  
  // 任務執行相關
  completeTask: (taskId: string) => void;
  updateMood: (mood: number) => void;
  updateLocation: (location: string, weather: string) => void;
  
  // 工具函數
  getTodayDate: () => string;
  isCardLocked: (date: string) => boolean;
  initializeTomorrowCard: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      player: null,
      currentDate: new Date().toISOString().split('T')[0],
      todayCard: null,
      tomorrowCard: null,
      currentPage: 'setup',

      initializePlayer: (name: string, epicWin: string) => {
        const player: Player = {
          id: `player-${Date.now()}`,
          name,
          currentEpicWin: epicWin,
          mood: 3,
          location: '未知',
          weather: '☀️',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({ 
          player,
          currentPage: 'input'
        });

        // 初始化明日日卡
        get().initializeTomorrowCard();
      },

      setCurrentPage: (page) => {
        set({ currentPage: page });
      },

      addTask: (taskData) => {
        const { tomorrowCard } = get();
        if (!tomorrowCard) return;

        const newTask: Task = {
          id: `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          ...taskData,
          createdAt: new Date()
        };

        const updatedTasks = [...tomorrowCard.tasks, newTask];
        
        set({
          tomorrowCard: {
            ...tomorrowCard,
            tasks: updatedTasks
          }
        });
      },

      updateTask: (taskId, updates) => {
        const { tomorrowCard } = get();
        if (!tomorrowCard) return;

        const updatedTasks = tomorrowCard.tasks.map(task =>
          task.id === taskId ? { ...task, ...updates } : task
        );

        set({
          tomorrowCard: {
            ...tomorrowCard,
            tasks: updatedTasks
          }
        });
      },

      removeTask: (taskId) => {
        const { tomorrowCard } = get();
        if (!tomorrowCard) return;

        const updatedTasks = tomorrowCard.tasks.filter(task => task.id !== taskId);

        set({
          tomorrowCard: {
            ...tomorrowCard,
            tasks: updatedTasks
          }
        });
      },

      saveTomorrowCard: () => {
        const { tomorrowCard } = get();
        if (!tomorrowCard) return;

        // 鎖定明日日卡
        const lockedCard = {
          ...tomorrowCard,
          isLocked: true,
          updatedAt: new Date()
        };

        // 保存到 localStorage
        const savedCards = JSON.parse(localStorage.getItem('dailyCards') || '{}');
        savedCards[tomorrowCard.date] = lockedCard;
        localStorage.setItem('dailyCards', JSON.stringify(savedCards));

        // 更新狀態
        set({
          todayCard: lockedCard,
          tomorrowCard: null,
          currentPage: 'execute'
        });

        // 初始化新的明日日卡
        get().initializeTomorrowCard();
      },

      loadTodayCard: () => {
        const { currentDate } = get();
        const savedCards = JSON.parse(localStorage.getItem('dailyCards') || '{}');
        const todayCard = savedCards[currentDate];

        if (todayCard) {
          set({ todayCard });
        }
      },

      completeTask: (taskId) => {
        const { todayCard } = get();
        if (!todayCard) return;

        const updatedTasks = todayCard.tasks.map(task =>
          task.id === taskId ? { ...task, isCompleted: true } : task
        );

        set({
          todayCard: {
            ...todayCard,
            tasks: updatedTasks,
            updatedAt: new Date()
          }
        });
      },

      updateMood: (mood) => {
        const { player, todayCard } = get();
        if (!player) return;

        const updatedPlayer = { ...player, mood, updatedAt: new Date() };
        
        set({ 
          player: updatedPlayer,
          todayCard: todayCard ? { ...todayCard, player: updatedPlayer } : null
        });
      },

      updateLocation: (location, weather) => {
        const { player, todayCard } = get();
        if (!player) return;

        const updatedPlayer = { ...player, location, weather, updatedAt: new Date() };
        
        set({ 
          player: updatedPlayer,
          todayCard: todayCard ? { ...todayCard, player: updatedPlayer } : null
        });
      },

      getTodayDate: () => {
        return new Date().toISOString().split('T')[0];
      },

      isCardLocked: (date) => {
        const savedCards = JSON.parse(localStorage.getItem('dailyCards') || '{}');
        const card = savedCards[date];
        return card ? card.isLocked : false;
      },

      // 初始化明日日卡的輔助函數
      initializeTomorrowCard: () => {
        const { player } = get();
        if (!player) return;

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().split('T')[0];

        const tomorrowCard: DailyCard = {
          id: `daily-${tomorrowDate}`,
          date: tomorrowDate,
          player,
          epicWin: player.currentEpicWin,
          levels: [
            { id: 'level-1', name: 'Lv1 生存', level: 1, isCompleted: true },
            { id: 'level-2', name: 'Lv2 安全', level: 2, isCompleted: true },
            { id: 'level-3', name: 'Lv3 關係', level: 3, isCompleted: true },
            { id: 'level-4', name: 'Lv4 價值', level: 4, isCompleted: false },
            { id: 'level-5', name: 'Lv5 傳承', level: 5, isCompleted: false }
          ],
          currentLevelTarget: '',
          tasks: [],
          ifThenPlan: '',
          powerUps: [
            { id: 'powerup-1', name: '動態熱身 3 分鐘', isUsed: false },
            { id: 'powerup-2', name: '60 秒方形呼吸', isUsed: false }
          ],
          allies: [
            { id: 'ally-1', name: 'Kevin', checkInTime: '20:30', method: 'message', isCheckedIn: false }
          ],
          enemies: [
            { id: 'enemy-1', name: '右膝外翻', counterStrategy: '膝蓋外推＋腳掌三點受力提醒', isActive: false },
            { id: 'enemy-2', name: '滑行前分心滑手機', counterStrategy: '手機丟包內，僅休息時段查看', isActive: false }
          ],
          distractions: [
            { id: 'distraction-1', name: 'Instagram Reels', alternativeAction: '看 1 段 60 秒教學示範後立刻模仿 2 次' }
          ],
          cheatCodes: [
            { id: 'cheat-1', name: '承擔責任', description: '我「可控的一步」是 開滑前做 3 次無雪轉體熱身', type: 'responsibility', isUsed: false },
            { id: 'cheat-2', name: '寫下實況', description: '', type: 'reality', isUsed: false },
            { id: 'cheat-3', name: '減少幻想', description: '追蹤指標「外側承重自評 0–5」', type: 'reduction', isUsed: false },
            { id: 'cheat-4', name: '分享羞愧', description: '22:00 對 Yexiang 說出 Q3 拖延點', type: 'sharing', isUsed: false }
          ],
          score: {
            experience: 0,
            streak: 0,
            flow: 0,
            resilience: {
              physical: 0,
              mental: 0,
              emotional: 0,
              social: 0
            }
          },
          achievements: [],
          failures: [],
          nextStep: '',
          nextStepTime: '',
          notes: [],
          tags: [],
          isLocked: false,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({ tomorrowCard });
      }
    }),
    {
      name: 'life-upgrade-app-storage',
      partialize: (state) => ({
        player: state.player,
        currentDate: state.currentDate,
        currentPage: state.currentPage
      })
    }
  )
);
