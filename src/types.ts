export type Difficulty = 'ងាយស្រួល' | 'មធ្យម' | 'ពិបាក' | 'មេបញ្ជាការ (Boss)';

export type CategoryId = 'basics' | 'control_flow' | 'functions' | 'arrays' | 'objects' | 'algorithms' | 'components' | 'styling' | 'routing' | 'backend' | 'ai_generated';

export type LanguageTrackId =
  | 'html'
  | 'css'
  | 'tailwindcss'
  | 'javascript'
  | 'reactjs'
  | 'vuejs'
  | 'nuxtjs'
  | 'nextjs'
  | 'nodejs'
  | 'express'
  | 'nestjs'
  | 'laravel'
  | 'postgresql'
  | 'mysql'
  | 'oracle';

export interface LanguageTrack {
  id: LanguageTrackId;
  nameKhmer: string;
  nameEn: string;
  icon: string;
  color: string;
  borderColor: string;
  badgeBg: string;
  descriptionKhmer: string;
  categoryType: 'frontend' | 'backend' | 'fullstack' | 'database';
}

export interface TestCase {
  id: string;
  inputDescription: string;
  testFnCall: string;
  expectedOutput: string;
  isSecret?: boolean;
  explanationKhmer?: string;
}

export interface CodingChallenge {
  id: string;
  language: LanguageTrackId;
  levelNum: number;
  titleKhmer: string;
  titleEn: string;
  category: CategoryId;
  difficulty: Difficulty;
  xp: number;
  gems: number;
  storyKhmer: string;
  descriptionKhmer: string;
  theoryKhmer: string;
  keyConcepts: string[];
  starterCode: string;
  solutionHintKhmer: string;
  solutionCode: string;
  testCases: TestCase[];
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  inputDesc: string;
  expected: string;
  actual: string;
  logs: string[];
  errorMessage?: string;
}

export interface UserStats {
  level: number;
  xp: number;
  maxXp: number;
  gems: number;
  hearts: number;
  maxHearts: number;
  streakDays: number;
  completedChallengeIds: string[];
  unlockedChallengeIds: string[];
  avatar: string;
  title: string;
  soundEnabled: boolean;
  theme: 'default' | 'cyberpunk' | 'emerald' | 'sunset';
  purchasedItems: string[];
}

export interface ShopItem {
  id: string;
  nameKhmer: string;
  nameEn: string;
  type: 'avatar' | 'title' | 'heart' | 'theme';
  priceGems: number;
  icon: string;
  descriptionKhmer: string;
  value: string;
}

export interface AchievementBadge {
  id: string;
  titleKhmer: string;
  titleEn: string;
  descKhmer: string;
  icon: string;
  requiredXpOrLevel: number;
  unlocked: boolean;
  rewardGems: number;
}

export interface AiMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  emailOrPhone: string;
  avatar: string;
  role?: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  loading: boolean;
  error: string | null;
}

