export interface WritingTask {
  id: string;
  type: 'Task 1' | 'Task 2';
  title: string;
  prompt: string;
  imageUrl?: string;
  minWords: number;
  duration: number;
  sampleEssay: string;
  template: string;
  vocabulary: string[];
  htmlUrl?: string;
}

export const writingTasks: WritingTask[] = [
  {
    id: 'w_appeared_4',
    type: 'Task 1',
    title: 'Appeared Full Writing 4',
    prompt: 'Premium Writing Task 1',
    minWords: 150,
    duration: 20,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Appeared Full writing (4).html'
  },
  {
    id: 'w_appeared_5',
    type: 'Task 2',
    title: 'APPEARED Full Writing 5',
    prompt: 'Premium Writing Task 2',
    minWords: 250,
    duration: 40,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED full writing (5).html'
  },
  {
    id: 'w_appeared_6',
    type: 'Task 2',
    title: 'APPEARED Full Writing 6',
    prompt: 'Premium Writing Task 2',
    minWords: 250,
    duration: 40,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED full writing (6).html'
  },
  {
    id: 'w_appeared_2',
    type: 'Task 1',
    title: 'APPEARED Writing 2',
    prompt: 'Premium Writing Task 1',
    minWords: 150,
    duration: 20,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED writing (2).html'
  },
  {
    id: 'w_practice_29',
    title: 'Writing Practice - Set 29',
    type: 'Task 1',
    duration: 60,
    minWords: 150,
    prompt: 'The graph below shows the percentage of people visiting GYM once a month or more between 1984 to 2003. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
    htmlUrl: '/test materials/writing/full-writing-29.html',
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_practice_28',
    title: 'Writing Practice - Set 28',
    type: 'Task 2',
    duration: 60,
    minWords: 250,
    prompt: 'Most important invention: The Internet.',
    htmlUrl: '/test materials/writing/full-28.html',
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_wisdom_mt1',
    title: 'Wisdom Writing – Mock Test 1',
    type: 'Task 2',
    duration: 40,
    minWords: 250,
    prompt: 'Completing university education is thought by some to be the best way to get a good job. On the other hand, other people think that getting experience and developing soft skills is more important. Discuss both sides and give your opinion.',
    sampleEssay: '',
    template: '',
    vocabulary: []
  }
];
