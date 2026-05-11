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
  htmlUrl?: string;
  passages: ReadingPassage[];
  questions: ReadingQuestion[];
}

export const readingTests: ReadingTest[] = [
  {
    id: 'r_full22',
    title: 'IELTS Reading – Full Test 22',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/full-22.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full21',
    title: 'Reading Test 21',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/full-reading-21.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full25',
    title: 'Reading Test 25',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/full-reading-25.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full26',
    title: 'Reading Test 26',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/full-reading-26.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full27',
    title: 'Reading Test 27',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/full-reading-27.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full29',
    title: 'Reading Test 29',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/full-reading-29.html',
    passages: [],
    questions: []
  }
];
