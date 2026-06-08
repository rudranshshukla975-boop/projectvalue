export interface MemberUser {
  email: string;
  name: string;
  joinedAt: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  text: string;
  category: string;
  createdAt: string;
  promptId?: string;
}

export interface ReadingItem {
  id: string;
  title: string;
  author: string;
  era: 'Ancient' | 'Renaissance' | 'Modern' | 'Contemporary';
  category: 'Stoicism' | 'Existentialism' | 'Pragmatism' | 'Ethics & Logic';
  description: string;
  practicalFramework: string;
  completed: boolean;
}

export interface DiscussionPrompt {
  id: string;
  week: number;
  title: string;
  quote: string;
  attribution: string;
  frameworkName: string;
  promptText: string;
  exerciseTitle: string;
  exerciseDescription: string;
}

export interface DichotomyItem {
  id: string;
  text: string;
  correctCategory: 'control' | 'no-control';
  explanation: string;
}

export interface SocraticStage {
  id: number;
  question: string;
  placeholder: string;
  field: keyof SocraticExercise;
}

export interface SocraticExercise {
  limitingBelief: string;
  evidenceFor: string;
  evidenceAgainst: string;
  alternativeInterpretation: string;
  rationalAction: string;
}

export interface PragmaticOption {
  id: string;
  title: string;
  consequencesShortTerm: string;
  consequencesLongTerm: string;
  cashValueRating: number; // 1-5 scale of true practical utility
}
