export interface ReadingQuestion {
  id: string;
  type: 'mcq' | 'tfng' | 'fill';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface ReadingPassage {
  id: number;
  title: string;
  content: string;
}

export interface ReadingTest {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  passages: ReadingPassage[];
  questions: ReadingQuestion[];
}

export const readingTests: ReadingTest[] = [];
