export interface SpeakingTask {
  id: string;
  part: 1 | 2 | 3;
  topic: string;
  question: string;
  sampleAnswer?: string;
}

export interface SpeakingMockTest {
  id: string;
  title: string;
  duration: string;
  parts: (
    | { part: 1 | 3; duration: string; questions: string[] }
    | { part: 2; duration: string; cueCard: string }
  )[];
}

export interface CueCard {
  id: string;
  topic: string;
  prompt: string;
  bulletPoints: string[];
  sampleAnswer: string;
  followUpQuestions: string[];
}

export interface BandDescriptor {
  band: number;
  title: string;
  fluency: string;
  vocabulary: string;
  grammar: string;
  pronunciation: string;
}

export const speakingPart1: SpeakingTask[] = [
  {
    id: '1',
    part: 1,
    topic: 'Work or Study',
    question: 'Do you work or are you a student?',
    sampleAnswer: 'I am currently a final-year student at university, majoring in Computer Science. I really enjoy my studies, especially the practical coding parts.'
  }
];

export const speakingPart3: SpeakingTask[] = [
  {
    id: '2',
    part: 3,
    topic: 'Education',
    question: 'What are the most important qualities of a good teacher?',
    sampleAnswer: 'In my opinion, a good teacher should be patient, knowledgeable, and able to inspire students. They should also be adaptable to different learning styles.'
  }
];

export const speakingTasks: SpeakingTask[] = [...speakingPart1, ...speakingPart3];

export const cueCards: CueCard[] = [
  {
    id: 'cc1',
    topic: 'A beautiful place',
    prompt: 'Describe a beautiful place you have visited.',
    bulletPoints: [
      'Where it is',
      'When you went there',
      'What you did there',
      'And explain why you think it is beautiful.'
    ],
    sampleAnswer: 'One of the most beautiful places I have ever visited is the Lake District in England. It is famous for its stunning lakes, mountains, and forests. I went there last summer with my family...',
    followUpQuestions: [
      'Do you think modern cities are beautiful?',
      'Why do you think nature is important for people?'
    ]
  }
];

export const mockTests: SpeakingMockTest[] = [
  {
    id: 'mock1',
    title: 'Standard Speaking Test 1',
    duration: '11-14 mins',
    parts: [
      {
        part: 1,
        duration: '4-5 mins',
        questions: ['What is your full name?', 'Do you live in a house or an apartment?', 'What do you like about your home?']
      },
      {
        part: 2,
        duration: '3-4 mins',
        cueCard: 'cc1'
      },
      {
        part: 3,
        duration: '4-5 mins',
        questions: ['Why do people like to visit beautiful places?', 'Do you think modern architecture is as beautiful as traditional one?']
      }
    ]
  }
];

export const bandDescriptors: BandDescriptor[] = [
  {
    band: 9,
    title: 'Expert User',
    fluency: 'Speaks fluently with only rare repetition or self-correction.',
    vocabulary: 'Uses vocabulary with full flexibility and precision in all topics.',
    grammar: 'Uses a full range of structures naturally and appropriately.',
    pronunciation: 'Uses a full range of pronunciation features with precision and subtlety.'
  },
  {
    band: 8,
    title: 'Very Good User',
    fluency: 'Speaks fluently with only occasional repetition or self-correction.',
    vocabulary: 'Uses a wide vocabulary resource readily and flexibly to convey precise meaning.',
    grammar: 'Uses a wide range of structures flexibly.',
    pronunciation: 'Uses a wide range of pronunciation features.'
  },
  {
    band: 7,
    title: 'Good User',
    fluency: 'Speaks at length without noticeable effort or loss of coherence.',
    vocabulary: 'Uses vocabulary resource flexibly to discuss a variety of topics.',
    grammar: 'Uses a range of complex structures with some flexibility.',
    pronunciation: 'Shows all the positive features of Band 6 and some, but not all, of the positive features of Band 8.'
  },
  {
    band: 6,
    title: 'Competent User',
    fluency: 'Is willing to speak at length, though may lose coherence at times due to occasional repetition.',
    vocabulary: 'Has a wide enough vocabulary to discuss topics at length and make meaning clear.',
    grammar: 'Uses a mix of simple and complex structures, but with limited flexibility.',
    pronunciation: 'Uses a range of pronunciation features with mixed control.'
  }
];
