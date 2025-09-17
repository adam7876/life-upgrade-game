// 重新設計的系統類型定義
export interface Player {
  id: string;
  name: string;
  currentEpicWin: string;
  mood: number; // 1-5
  location: string;
  weather: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  estimatedTime: number; // 分鐘
  difficulty: Difficulty;
  isCompleted: boolean;
  createdAt: Date;
  tags: string[];
}

export type Difficulty = 1 | 2 | 3 | 4 | 5;

// 基於 rule.txt 的日卡結構
export interface DailyCard {
  id: string;
  date: string; // YYYY-MM-DD 格式
  player: Player;
  
  // 1) 主線任務（Epic Win）
  epicWin: string;
  
  // 2) 今日關卡
  levels: Level[];
  currentLevelTarget: string; // 本關目標（量化）
  
  // 3) 今日任務（最多3項）
  tasks: Task[];
  ifThenPlan: string; // If-Then 計劃
  
  // 4) 能量道具（Power-Ups）
  powerUps: PowerUp[];
  
  // 5) 盟友（Co-op）
  allies: Ally[];
  
  // 6) 壞蛋（Bad Guys）→ 應對招
  enemies: Enemy[];
  
  // 7) 分心避雷 → 替代行為
  distractions: Distraction[];
  
  // 8) 外掛（Cheat Codes）
  cheatCodes: CheatCode[];
  
  // 9) 計分板（Score）
  score: Score;
  
  // 10) 成就 / 戰利品
  achievements: string[];
  
  // 11) 失敗 → 回饋
  failures: Failure[];
  
  // 12) 明日第一步 & 時段
  nextStep: string;
  nextStepTime: string;
  
  // 13) 備註（Notes）
  notes: string[];
  tags: string[];
  
  // 系統字段
  isLocked: boolean; // 是否已鎖定（隔天無法修改）
  createdAt: Date;
  updatedAt: Date;
}

export interface Level {
  id: string;
  name: string;
  level: number;
  isCompleted: boolean;
}

export interface PowerUp {
  id: string;
  name: string;
  isUsed: boolean;
}

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
  counterStrategy: string;
  isActive: boolean;
}

export interface Distraction {
  id: string;
  name: string;
  alternativeAction: string;
}

export interface CheatCode {
  id: string;
  name: string;
  description: string;
  type: 'responsibility' | 'reality' | 'reduction' | 'sharing';
  isUsed: boolean;
}

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

export interface Failure {
  id: string;
  description: string;
  lesson: string;
  adjustment: string;
  createdAt: Date;
}
