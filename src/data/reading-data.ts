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
    id: 'r_dynamic_1',
    title: 'IELTS Reading Dynamic 1',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/full-dynamic-1.html',
    passages: [],
    questions: []
  }
];
