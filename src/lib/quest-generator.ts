// 智能任務生成器
import { Quest, QuestType, Difficulty, Player, DailyCard } from '@/types/game';

export class QuestGenerator {
  private questTemplates: QuestTemplate[] = [];
  private playerHistory: PlayerHistory = {};

  constructor() {
    this.initializeQuestTemplates();
  }

  // 根據玩家狀態生成每日任務
  generateDailyQuests(player: Player, previousCard?: DailyCard): Quest[] {
    const quests: Quest[] = [];
    
    // 1. 生成必做主線任務
    const mainQuest = this.generateMainQuest(player);
    if (mainQuest) quests.push(mainQuest);

    // 2. 生成支線任務
    const sideQuests = this.generateSideQuests(player, 2);
    quests.push(...sideQuests);

    // 3. 生成隨機任務
    const randomQuest = this.generateRandomQuest(player);
    if (randomQuest) quests.push(randomQuest);

    // 4. 根據歷史表現調整難度
    this.adjustQuestDifficulty(quests, player);

    return quests;
  }

  private generateMainQuest(player: Player): Quest | null {
    // 基於 Epic Win 生成主線任務
    const epicWin = player.currentEpicWin;
    
    if (epicWin.includes('滑雪') || epicWin.includes('CASI')) {
      return {
        id: `main-${Date.now()}`,
        title: '滑雪技能練習',
        description: '根據你的 Epic Win 目標，今天需要進行滑雪相關練習',
        type: 'main',
        difficulty: this.calculateDifficulty(player),
        estimatedTime: 60,
        experience: 100,
        isCompleted: false,
        isRequired: true,
        createdAt: new Date(),
        tags: ['滑雪', '技能', '主線']
      };
    }

    if (epicWin.includes('英文') || epicWin.includes('教學')) {
      return {
        id: `main-${Date.now()}`,
        title: '英文教學練習',
        description: '提升英文教學口語流暢度',
        type: 'main',
        difficulty: this.calculateDifficulty(player),
        estimatedTime: 30,
        experience: 80,
        isCompleted: false,
        isRequired: true,
        createdAt: new Date(),
        tags: ['英文', '教學', '主線']
      };
    }

    return null;
  }

  private generateSideQuests(player: Player, count: number): Quest[] {
    const sideQuests: Quest[] = [];
    const templates = this.questTemplates.filter(t => t.type === 'side');

    for (let i = 0; i < count; i++) {
      const template = templates[Math.floor(Math.random() * templates.length)];
      const quest = this.createQuestFromTemplate(template, player);
      sideQuests.push(quest);
    }

    return sideQuests;
  }

  private generateRandomQuest(player: Player): Quest | null {
    // 30% 機率生成隨機任務
    if (Math.random() > 0.3) return null;

    const randomTemplates = this.questTemplates.filter(t => t.type === 'random');
    const template = randomTemplates[Math.floor(Math.random() * randomTemplates.length)];
    
    return this.createQuestFromTemplate(template, player);
  }

  private calculateDifficulty(player: Player): Difficulty {
    // 根據玩家等級和歷史表現計算難度
    const baseDifficulty = Math.min(5, Math.max(1, Math.floor(player.level / 2)));
    
    // 根據經驗值調整
    if (player.experience > 1000) return Math.min(5, baseDifficulty + 1) as Difficulty;
    if (player.experience < 200) return Math.max(1, baseDifficulty - 1) as Difficulty;
    
    return baseDifficulty as Difficulty;
  }

  private adjustQuestDifficulty(quests: Quest[], player: Player): void {
    // 根據玩家歷史表現調整任務難度
    const playerHistory = this.playerHistory[player.id];
    
    if (playerHistory) {
      const successRate = playerHistory.completedQuests / playerHistory.totalQuests;
      
      quests.forEach(quest => {
        if (successRate > 0.8 && quest.difficulty < 5) {
          quest.difficulty = Math.min(5, quest.difficulty + 1) as Difficulty;
          quest.experience = Math.floor(quest.experience * 1.2);
        } else if (successRate < 0.5 && quest.difficulty > 1) {
          quest.difficulty = Math.max(1, quest.difficulty - 1) as Difficulty;
          quest.experience = Math.floor(quest.experience * 0.8);
        }
      });
    }
  }

  private createQuestFromTemplate(template: QuestTemplate, player: Player): Quest {
    return {
      id: `${template.type}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: template.title,
      description: template.description,
      type: template.type,
      difficulty: this.calculateDifficulty(player),
      estimatedTime: template.estimatedTime,
      experience: template.baseExperience,
      isCompleted: false,
      isRequired: template.isRequired,
      createdAt: new Date(),
      tags: template.tags
    };
  }

  private initializeQuestTemplates(): void {
    this.questTemplates = [
      // 主線任務模板
      {
        type: 'main',
        title: '核心技能練習',
        description: '專注於你的主要目標技能提升',
        estimatedTime: 60,
        baseExperience: 100,
        isRequired: true,
        tags: ['技能', '主線']
      },
      
      // 支線任務模板
      {
        type: 'side',
        title: '體能訓練',
        description: '進行 30 分鐘的體能訓練，提升身體素質',
        estimatedTime: 30,
        baseExperience: 50,
        isRequired: false,
        tags: ['健身', '體能']
      },
      {
        type: 'side',
        title: '學習新知識',
        description: '閱讀或學習 20 分鐘的新知識',
        estimatedTime: 20,
        baseExperience: 40,
        isRequired: false,
        tags: ['學習', '知識']
      },
      {
        type: 'side',
        title: '創意練習',
        description: '進行 15 分鐘的創意活動',
        estimatedTime: 15,
        baseExperience: 30,
        isRequired: false,
        tags: ['創意', '藝術']
      },
      
      // 隨機任務模板
      {
        type: 'random',
        title: '驚喜挑戰',
        description: '完成一個隨機的挑戰任務',
        estimatedTime: 25,
        baseExperience: 60,
        isRequired: false,
        tags: ['挑戰', '隨機']
      },
      {
        type: 'random',
        title: '探索新領域',
        description: '嘗試一個你從未做過的事情',
        estimatedTime: 20,
        baseExperience: 50,
        isRequired: false,
        tags: ['探索', '新體驗']
      }
    ];
  }

  // 更新玩家歷史記錄
  updatePlayerHistory(playerId: string, questCompleted: boolean): void {
    if (!this.playerHistory[playerId]) {
      this.playerHistory[playerId] = {
        totalQuests: 0,
        completedQuests: 0,
        streak: 0,
        lastActiveDate: new Date()
      };
    }

    const history = this.playerHistory[playerId];
    history.totalQuests++;
    
    if (questCompleted) {
      history.completedQuests++;
      history.streak++;
    } else {
      history.streak = 0;
    }
    
    history.lastActiveDate = new Date();
  }
}

interface QuestTemplate {
  type: QuestType;
  title: string;
  description: string;
  estimatedTime: number;
  baseExperience: number;
  isRequired: boolean;
  tags: string[];
}

interface PlayerHistory {
  [playerId: string]: {
    totalQuests: number;
    completedQuests: number;
    streak: number;
    lastActiveDate: Date;
  };
}
