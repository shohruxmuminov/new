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
    id: 'r_cdi_pack_mar_apr_2',
    title: 'CDI Pack Mar-APR Reading Test 2',
    difficulty: 'Medium',
    duration: 60,
    htmlUrl: '/test materials/reading/cdi-pack-mar-apr-read-2.html',
    passages: [],
    questions: [
      // Passage 1: 1-13
      { id: 'rq1', type: 'tfng', question: '1', answer: 'TRUE', explanation: '' },
      { id: 'rq2', type: 'tfng', question: '2', answer: 'NOT GIVEN', explanation: '' },
      { id: 'rq3', type: 'tfng', question: '3', answer: 'TRUE', explanation: '' },
      { id: 'rq4', type: 'tfng', question: '4', answer: 'TRUE', explanation: '' },
      { id: 'rq5', type: 'tfng', question: '5', answer: 'NOT GIVEN', explanation: '' },
      { id: 'rq6', type: 'tfng', question: '6', answer: 'NOT GIVEN', explanation: '' },
      { id: 'rq7', type: 'tfng', question: '7', answer: 'FALSE', explanation: '' },
      { id: 'rq8', type: 'fill', question: '8', answer: 'ZOOS', explanation: '' },
      { id: 'rq9', type: 'fill', question: '9', answer: 'TOMBS', explanation: '' },
      { id: 'rq10', type: 'fill', question: '10', answer: 'INCUBATION', explanation: '' },
      { id: 'rq11', type: 'fill', question: '11', answer: 'HUMIDITY', explanation: '' },
      { id: 'rq12', type: 'fill', question: '12', answer: 'OVENS', explanation: '' },
      { id: 'rq13', type: 'fill', question: '13', answer: 'PREDATORS', explanation: '' },
      // Passage 2: 14-26
      { id: 'rq14', type: 'fill', question: '14', answer: 'VI', explanation: '' },
      { id: 'rq15', type: 'fill', question: '15', answer: 'VIII', explanation: '' },
      { id: 'rq16', type: 'fill', question: '16', answer: 'IV', explanation: '' },
      { id: 'rq17', type: 'fill', question: '17', answer: 'VII', explanation: '' },
      { id: 'rq18', type: 'fill', question: '18', answer: 'III', explanation: '' },
      { id: 'rq19', type: 'fill', question: '19', answer: 'I', explanation: '' },
      { id: 'rq20', type: 'fill', question: '20', answer: 'II', explanation: '' },
      { id: 'rq21', type: 'mcq', question: '21', answer: 'B', explanation: '' },
      { id: 'rq22', type: 'mcq', question: '22', answer: 'E', explanation: '' },
      { id: 'rq23', type: 'fill', question: '23', answer: 'COMPETITIVE', explanation: '' },
      { id: 'rq24', type: 'fill', question: '24', answer: 'IMPLICATIONS', explanation: '' },
      { id: 'rq25', type: 'fill', question: '25', answer: 'SURVEYS', explanation: '' },
      { id: 'rq26', type: 'fill', question: '26', answer: 'PRODUCTIVITY', explanation: '' },
      // Passage 3: 27-40
      { id: 'rq27', type: 'fill', question: '27', answer: 'C', explanation: '' },
      { id: 'rq28', type: 'fill', question: '28', answer: 'C', explanation: '' },
      { id: 'rq29', type: 'fill', question: '29', answer: 'B', explanation: '' },
      { id: 'rq30', type: 'fill', question: '30', answer: 'A', explanation: '' },
      { id: 'rq31', type: 'fill', question: '31', answer: 'F', explanation: '' },
      { id: 'rq32', type: 'fill', question: '32', answer: 'I', explanation: '' },
      { id: 'rq33', type: 'fill', question: '33', answer: 'A', explanation: '' },
      { id: 'rq34', type: 'fill', question: '34', answer: 'F', explanation: '' },
      { id: 'rq35', type: 'fill', question: '35', answer: 'B', explanation: '' },
      { id: 'rq36', type: 'tfng', question: '36', answer: 'TRUE', explanation: '' },
      { id: 'rq37', type: 'tfng', question: '37', answer: 'TRUE', explanation: '' },
      { id: 'rq38', type: 'tfng', question: '38', answer: 'FALSE', explanation: '' },
      { id: 'rq39', type: 'tfng', question: '39', answer: 'NOT GIVEN', explanation: '' },
      { id: 'rq40', type: 'tfng', question: '40', answer: 'TRUE', explanation: '' }
    ]
  },
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
    id: 'r_wisdom_fp9',
    title: 'Wisdom Reading – Full Practice 9',
    difficulty: 'Medium',
    duration: 20,
    htmlUrl: '/test materials/reading/wisdom-fp-9.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_sanokulov_dynamic1',
    title: 'Sanokulov Reading – Dynamic 1 (The kākāpō)',
    difficulty: 'Medium',
    duration: 20,
    htmlUrl: '/test materials/reading/sanokulov-dynamic-1.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_sanokulov_dynamic2',
    title: 'Sanokulov Reading – Dynamic 2 (To Britain)',
    difficulty: 'Hard',
    duration: 20,
    htmlUrl: '/test materials/reading/sanokulov-dynamic-2.html',
    passages: [],
    questions: []
  },
  {
    id: 'r_sanokulov_dynamic3',
    title: 'Sanokulov Reading – Dynamic 3 (Stress & Judgement)',
    difficulty: 'Hard',
    duration: 20,
    htmlUrl: '/test materials/reading/sanokulov-dynamic-3.html',
    passages: [],
    questions: []
  }
];
