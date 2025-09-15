// 遊戲核心類型定義
export interface Player {
  id: string;
  name: string;
  level: number;
  experience: number;
  currentEpicWin: string;
  mood: number; // 1-5
  location: string;
  weather: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: QuestType;
  difficulty: Difficulty;
  estimatedTime: number; // 分鐘
  experience: number;
  isCompleted: boolean;
  isRequired: boolean; // 是否為必做任務
  createdAt: Date;
  dueDate?: Date;
  tags: string[];
}

export type QuestType = 
  | 'main'      // 主線任務
  | 'side'      // 支線任務
  | 'random'    // 隨機任務
  | 'emergency' // 緊急任務
  | 'coop';     // 合作任務

export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Level {
  id: string;
  name: string;
  description: string;
  level: number;
  isCompleted: boolean;
  target: string; // 量化目標
  experience: number;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  type: PowerUpType;
  isUsed: boolean;
  effect: string;
}

export type PowerUpType = 
  | 'warmup'     // 動態熱身
  | 'breathing'  // 呼吸練習
  | 'focus'      // 專注力
  | 'energy'     // 能量恢復
  | 'motivation'; // 動機提升

export interface Ally {
  id: string;
  name: string;
  checkInTime: string;
  method: 'message' | 'call' | 'meet';
  isCheckedIn: boolean;
}

export interface Enemy {
  id: string;
  name: string;
  description: string;
  counterStrategy: string;
  isActive: boolean;
}

export interface Distraction {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  alternativeAction: string;
  isActive: boolean;
}

export interface CheatCode {
  id: string;
  name: string;
  description: string;
  type: CheatCodeType;
  isUsed: boolean;
  effect: string;
}

export type CheatCodeType = 
  | 'responsibility' // 承擔責任
  | 'reality'        // 寫下實況
  | 'reduction'      // 減少幻想
  | 'sharing';       // 分享羞愧

export interface Score {
  experience: number;
  streak: number; // 連擊天數
  flow: number;   // 心流狀態
  resilience: {
    physical: number;
    mental: number;
    emotional: number;
    social: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  category: string;
}

export interface Failure {
  id: string;
  description: string;
  lesson: string;
  adjustment: string;
  createdAt: Date;
}

export interface DailyCard {
  id: string;
  date: string;
  player: Player;
  epicWin: string;
  levels: Level[];
  quests: Quest[];
  powerUps: PowerUp[];
  allies: Ally[];
  enemies: Enemy[];
  distractions: Distraction[];
  cheatCodes: CheatCode[];
  score: Score;
  achievements: Achievement[];
  failures: Failure[];
  nextStep: string;
  nextStepTime: string;
  notes: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
