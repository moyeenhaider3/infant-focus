export type BabyStage = 1 | 2 | 3 | 4;

export type CardCategory = 'shapes' | 'faces' | 'patterns' | 'animals' | 'objects';

export interface CardItem {
  id: string;
  stage: BabyStage;
  category: CardCategory;
  title: string;
  scienceNote: string;
  citation: string;
  svgType: string;
  colors?: {
    primary?: string;
    accent?: string;
    background?: string;
  };
}

export interface StageInfo {
  stage: BabyStage;
  ageLabel: string;
  title: string;
  description: string;
  visualStyle: string;
  focalDistance: string;
  colorPalette: string[];
  validCategories: CardCategory[];
}

export interface SessionRecord {
  id: string;
  date: string; // ISO string
  stage: BabyStage;
  category: CardCategory | 'all';
  durationSeconds: number;
  completedCardsCount: number;
}

export interface ParentPreferences {
  autoAdvanceSeconds: number;
  sessionLimitMinutes: number; // default 3
  trackingMode: boolean;
  invertedColors: boolean;
  soundCue: boolean;
  reminderEnabled: boolean;
  reminderTime: string; // "10:00"
  pinnedDecks: string[]; // e.g. "stage-1-shapes"
}
