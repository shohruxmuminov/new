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
    id: 'r1',
    title: 'Reading Test 1 (Premium)',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek Read (2).html',
    passages: [],
    questions: []
  },
  {
    id: 'r2',
    title: 'Reading Test 2 (Premium)',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek Reading (2).html',
    passages: [],
    questions: []
  },
  {
    id: 'r_full21',
    title: 'IELTS Reading – Full Test 21',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: 'https://www.sanokulov.uz/reading-test/full-21/',
    passages: [],
    questions: []
  }
];
