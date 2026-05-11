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
  },
  {
    id: 'w_jan1_p1_1',
    part: 1,
    topic: 'News',
    question: 'How do most people find out about the news in your country?',
  },
  {
    id: 'w_jan1_p1_2',
    part: 1,
    topic: 'News',
    question: 'Do you think the news is important?',
  },
  {
    id: 'w_jan1_p1_3',
    part: 1,
    topic: 'News',
    question: 'What kind of news do you usually watch or read?',
  },
  {
    id: 'w_jan1_p1_4',
    part: 1,
    topic: 'News',
    question: 'How has the way we get news changed over the years?',
  },
  {
    id: 'w_jan1_p1_5',
    part: 1,
    topic: 'News',
    question: 'Do you prefer to read newspapers or get news online?',
  },
  {
    id: 'w_jan1_p1_6',
    part: 1,
    topic: 'News',
    question: 'Can we always trust the news we read on the internet?',
  }
];

export const speakingPart3: SpeakingTask[] = [
  {
    id: '2',
    part: 3,
    topic: 'Education',
    question: 'What are the most important qualities of a good teacher?',
    sampleAnswer: 'In my opinion, a good teacher should be patient, knowledgeable, and able to inspire students. They should also be adaptable to different learning styles.'
  },
  {
    id: 'w_jan1_p3_1',
    part: 3,
    topic: 'Sharing News',
    question: 'How do people usually share good news in your culture?',
  },
  {
    id: 'w_jan1_p3_2',
    part: 3,
    topic: 'Sharing News',
    question: 'Is it always necessary to tell the truth, even if the news is bad?',
  },
  {
    id: 'w_jan1_p3_3',
    part: 3,
    topic: 'Sharing News',
    question: 'Do you think children should be exposed to bad news from a young age?',
  },
  {
    id: 'w_jan1_p3_4',
    part: 3,
    topic: 'Sharing News',
    question: 'How does the media influence the way we perceive news?',
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
  },
  {
    id: 'cc_jan1',
    topic: 'Good News',
    prompt: 'Describe a piece of good news you received.',
    bulletPoints: [
      'What the news was',
      'When you received it',
      'Who gave you the news',
      'And explain how you felt about it.'
    ],
    sampleAnswer: '',
    followUpQuestions: [
      'How do people usually share good news in your culture?',
      'Is it always necessary to tell the truth, even if the news is bad?',
      'Do you think children should be exposed to bad news from a young age?',
      'How does the media influence the way we perceive news?'
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
  },
  {
    id: 'wisdom_jan1',
    title: 'Wisdom Speaking – January Set 1 (News)',
    duration: '11-14 mins',
    parts: [
      {
        part: 1,
        duration: '4-5 mins',
        questions: [
          'How do most people find out about the news in your country?',
          'Do you think the news is important?',
          'What kind of news do you usually watch or read?',
          'How has the way we get news changed over the years?',
          'Do you prefer to read newspapers or get news online?',
          'Can we always trust the news we read on the internet?'
        ]
      },
      {
        part: 2,
        duration: '3-4 mins',
        cueCard: 'cc_jan1'
      },
      {
        part: 3,
        duration: '4-5 mins',
        questions: [
          'How do people usually share good news in your culture?',
          'Is it always necessary to tell the truth, even if the news is bad?',
          'Do you think children should be exposed to bad news from a young age?',
          'How does the media influence the way we perceive news?'
        ]
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
