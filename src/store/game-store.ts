// 遊戲狀態管理
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Player, DailyCard, Quest, Level, PowerUp, Ally, Enemy, Distraction, CheatCode, Score, Achievement, Failure } from '@/types/game';
import { QuestGenerator } from '@/lib/quest-generator';

interface GameState {
  // 玩家狀態
  player: Player | null;
  currentDailyCard: DailyCard | null;
  
  // 遊戲狀態
  isGameStarted: boolean;
  currentLevel: number;
  totalExperience: number;
  
  // 任務生成器
  questGenerator: QuestGenerator;
  
  // Actions
  initializePlayer: (name: string, epicWin: string) => void;
  generateDailyCard: () => void;
  completeQuest: (questId: string) => void;
  usePowerUp: (powerUpId: string) => void;
  checkInWithAlly: (allyId: string) => void;
  activateEnemy: (enemyId: string) => void;
  useCheatCode: (cheatCodeId: string) => void;
  addFailure: (failure: Omit<Failure, 'id' | 'createdAt'>) => void;
  updatePlayerMood: (mood: number) => void;
  updatePlayerLocation: (location: string, weather: string) => void;
  
  // 計算屬性
  getPlayerLevel: () => number;
  getExperienceToNextLevel: () => number;
  getDailyProgress: () => number;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      player: null,
      currentDailyCard: null,
      isGameStarted: false,
      currentLevel: 1,
      totalExperience: 0,
      questGenerator: new QuestGenerator(),

      initializePlayer: (name: string, epicWin: string) => {
        const player: Player = {
          id: `player-${Date.now()}`,
          name,
          level: 1,
          experience: 0,
          currentEpicWin: epicWin,
          mood: 3,
          location: '未知',
          weather: '☀️',
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({
          player,
          isGameStarted: true,
          currentLevel: 1,
          totalExperience: 0
        });

        // 自動生成第一天的日卡
        get().generateDailyCard();
      },

      generateDailyCard: () => {
        const { player, questGenerator } = get();
        if (!player) return;

        const today = new Date().toISOString().split('T')[0];
        
        // 生成任務
        const quests = questGenerator.generateDailyQuests(player);
        
        // 生成關卡
        const levels = generateLevels(player);
        
        // 生成道具
        const powerUps = generatePowerUps();
        
        // 生成盟友
        const allies = generateAllies();
        
        // 生成壞蛋
        const enemies = generateEnemies();
        
        // 生成分心
        const distractions = generateDistractions();
        
        // 生成外掛
        const cheatCodes = generateCheatCodes();
        
        // 計算分數
        const score: Score = {
          experience: 0,
          streak: 0,
          flow: 0,
          resilience: {
            physical: 0,
            mental: 0,
            emotional: 0,
            social: 0
          }
        };

        const dailyCard: DailyCard = {
          id: `daily-${today}`,
          date: today,
          player,
          epicWin: player.currentEpicWin,
          levels,
          quests,
          powerUps,
          allies,
          enemies,
          distractions,
          cheatCodes,
          score,
          achievements: [],
          failures: [],
          nextStep: '',
          nextStepTime: '',
          notes: [],
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date()
        };

        set({ currentDailyCard: dailyCard });
      },

      completeQuest: (questId: string) => {
        const { currentDailyCard, player, questGenerator } = get();
        if (!currentDailyCard || !player) return;

        const quest = currentDailyCard.quests.find(q => q.id === questId);
        if (!quest || quest.isCompleted) return;

        // 標記任務完成
        quest.isCompleted = true;
        
        // 增加經驗值
        const newExperience = player.experience + quest.experience;
        const newLevel = Math.floor(newExperience / 100) + 1;
        
        // 更新玩家狀態
        const updatedPlayer = {
          ...player,
          experience: newExperience,
          level: newLevel,
          updatedAt: new Date()
        };

        // 更新分數
        currentDailyCard.score.experience += quest.experience;
        currentDailyCard.score.streak = Math.max(1, currentDailyCard.score.streak + 1);

        // 更新任務生成器歷史
        questGenerator.updatePlayerHistory(player.id, true);

        set({
          player: updatedPlayer,
          currentDailyCard: { ...currentDailyCard, player: updatedPlayer },
          totalExperience: newExperience,
          currentLevel: newLevel
        });
      },

      usePowerUp: (powerUpId: string) => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return;

        const powerUp = currentDailyCard.powerUps.find(p => p.id === powerUpId);
        if (!powerUp || powerUp.isUsed) return;

        powerUp.isUsed = true;
        set({ currentDailyCard: { ...currentDailyCard } });
      },

      checkInWithAlly: (allyId: string) => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return;

        const ally = currentDailyCard.allies.find(a => a.id === allyId);
        if (!ally) return;

        ally.isCheckedIn = true;
        set({ currentDailyCard: { ...currentDailyCard } });
      },

      activateEnemy: (enemyId: string) => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return;

        const enemy = currentDailyCard.enemies.find(e => e.id === enemyId);
        if (!enemy) return;

        enemy.isActive = true;
        set({ currentDailyCard: { ...currentDailyCard } });
      },

      useCheatCode: (cheatCodeId: string) => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return;

        const cheatCode = currentDailyCard.cheatCodes.find(c => c.id === cheatCodeId);
        if (!cheatCode || cheatCode.isUsed) return;

        cheatCode.isUsed = true;
        set({ currentDailyCard: { ...currentDailyCard } });
      },

      addFailure: (failureData) => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return;

        const failure: Failure = {
          id: `failure-${Date.now()}`,
          ...failureData,
          createdAt: new Date()
        };

        currentDailyCard.failures.push(failure);
        set({ currentDailyCard: { ...currentDailyCard } });
      },

      updatePlayerMood: (mood: number) => {
        const { player, currentDailyCard } = get();
        if (!player) return;

        const updatedPlayer = { ...player, mood, updatedAt: new Date() };
        set({ 
          player: updatedPlayer,
          currentDailyCard: currentDailyCard ? { ...currentDailyCard, player: updatedPlayer } : null
        });
      },

      updatePlayerLocation: (location: string, weather: string) => {
        const { player, currentDailyCard } = get();
        if (!player) return;

        const updatedPlayer = { ...player, location, weather, updatedAt: new Date() };
        set({ 
          player: updatedPlayer,
          currentDailyCard: currentDailyCard ? { ...currentDailyCard, player: updatedPlayer } : null
        });
      },

      getPlayerLevel: () => {
        const { player } = get();
        return player ? Math.floor(player.experience / 100) + 1 : 1;
      },

      getExperienceToNextLevel: () => {
        const { player } = get();
        if (!player) return 100;
        const currentLevel = Math.floor(player.experience / 100) + 1;
        const nextLevelExp = currentLevel * 100;
        return nextLevelExp - player.experience;
      },

      getDailyProgress: () => {
        const { currentDailyCard } = get();
        if (!currentDailyCard) return 0;
        
        const completedQuests = currentDailyCard.quests.filter(q => q.isCompleted).length;
        const totalQuests = currentDailyCard.quests.length;
        
        return totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0;
      }
    }),
    {
      name: 'life-upgrade-game-storage',
      partialize: (state) => ({
        player: state.player,
        currentDailyCard: state.currentDailyCard,
        isGameStarted: state.isGameStarted,
        currentLevel: state.currentLevel,
        totalExperience: state.totalExperience
      })
    }
  )
);

// 輔助函數
function generateLevels(player: Player): Level[] {
  return [
    {
      id: 'level-1',
      name: 'Lv1 生存',
      description: '基本生存需求',
      level: 1,
      isCompleted: true,
      target: '完成基本日常任務',
      experience: 10
    },
    {
      id: 'level-2',
      name: 'Lv2 安全',
      description: '安全感和穩定性',
      level: 2,
      isCompleted: true,
      target: '建立安全習慣',
      experience: 20
    },
    {
      id: 'level-3',
      name: 'Lv3 關係',
      description: '人際關係和社交',
      level: 3,
      isCompleted: true,
      target: '維護重要關係',
      experience: 30
    },
    {
      id: 'level-4',
      name: 'Lv4 價值',
      description: '自我價值實現',
      level: 4,
      isCompleted: false,
      target: '追求個人目標',
      experience: 50
    },
    {
      id: 'level-5',
      name: 'Lv5 傳承',
      description: '影響他人和傳承',
      level: 5,
      isCompleted: false,
      target: '幫助他人成長',
      experience: 100
    }
  ];
}

function generatePowerUps(): PowerUp[] {
  return [
    {
      id: 'powerup-1',
      name: '動態熱身',
      description: '3分鐘動態熱身',
      type: 'warmup',
      isUsed: false,
      effect: '提升專注力和能量'
    },
    {
      id: 'powerup-2',
      name: '方形呼吸',
      description: '60秒方形呼吸練習',
      type: 'breathing',
      isUsed: false,
      effect: '降低壓力，提升冷靜'
    }
  ];
}

function generateAllies(): Ally[] {
  return [
    {
      id: 'ally-1',
      name: 'Kevin',
      checkInTime: '20:30',
      method: 'message',
      isCheckedIn: false
    }
  ];
}

function generateEnemies(): Enemy[] {
  return [
    {
      id: 'enemy-1',
      name: '右膝外翻',
      description: '滑雪時右膝容易外翻',
      counterStrategy: '膝蓋外推＋腳掌三點受力提醒',
      isActive: false
    },
    {
      id: 'enemy-2',
      name: '滑行前分心',
      description: '滑行前容易分心滑手機',
      counterStrategy: '手機丟包內，僅休息時段查看',
      isActive: false
    }
  ];
}

function generateDistractions(): Distraction[] {
  return [
    {
      id: 'distraction-1',
      name: 'Instagram Reels',
      description: '高風險分心源',
      riskLevel: 'high',
      alternativeAction: '看 1 段 60 秒教學示範後立刻模仿 2 次',
      isActive: false
    }
  ];
}

function generateCheatCodes(): CheatCode[] {
  return [
    {
      id: 'cheat-1',
      name: '承擔責任',
      description: '我「可控的一步」是開滑前做 3 次無雪轉體熱身',
      type: 'responsibility',
      isUsed: false,
      effect: '增加自我控制感'
    },
    {
      id: 'cheat-2',
      name: '寫下實況',
      description: '記錄當下的真實情況',
      type: 'reality',
      isUsed: false,
      effect: '提升自我覺察'
    },
    {
      id: 'cheat-3',
      name: '減少幻想',
      description: '追蹤指標「外側承重自評 0–5」',
      type: 'reduction',
      isUsed: false,
      effect: '減少不切實際的期望'
    },
    {
      id: 'cheat-4',
      name: '分享羞愧',
      description: '22:00 對 Yexiang 說出拖延點',
      type: 'sharing',
      isUsed: false,
      effect: '減輕心理負擔'
    }
  ];
}
