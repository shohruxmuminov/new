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
    id: 'r_jurabek_full1',
    title: 'Jurabek Reading FULL 1',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek FULL Reading 1 (2).html',
    passages: [],
    questions: []
  },
  {
    id: 'r_jurabek_full2',
    title: 'Jurabek Reading FULL 2',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek FULL Reading 2 (2).html',
    passages: [],
    questions: []
  },
  {
    id: 'r_jurabek_read',
    title: 'Jurabek Reading Practice',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek Read (2).html',
    passages: [],
    questions: []
  },
  {
    id: 'r_jurabek_reading2',
    title: 'Jurabek Reading 2',
    difficulty: 'Hard',
    duration: 60,
    htmlUrl: '/test materials/reading/IELTSwithJurabek Reading (2).html',
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
