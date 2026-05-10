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
  }
];
