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
    id: 'w1',
    type: 'Task 1',
    title: 'Line Graph: World Population',
    prompt: 'The graph below shows the changes in world population between 1900 and 2000. Summarize the information by selecting and reporting the main features.',
    minWords: 150,
    duration: 20,
    sampleEssay: 'The line graph illustrates the growth in the global population over a century from 1900 to 2000...',
    template: 'Introduction: The chart/graph shows...\nOverview: Overall, there was a significant increase...\nBody Paragraph 1: In 1900, the population stood at...\nBody Paragraph 2: By contrast, in 2000...',
    vocabulary: ['illustrates', 'significant increase', 'stood at', 'by contrast']
  },
  {
    id: 'w2',
    type: 'Task 2',
    title: 'Technology and Society',
    prompt: 'Some people think that technology has made our lives more complex. Others believe it has simplified them. Discuss both views and give your opinion.',
    minWords: 250,
    duration: 40,
    sampleEssay: 'In the modern era, technology has become an inseparable part of human existence...',
    template: 'Introduction: It is often argued that...\nBody 1 (Complexity): On the one hand, some believe...\nBody 2 (Simplicity): On the other hand, others argue...\nConclusion: In conclusion, while technology adds complexity...',
    vocabulary: ['inseparable part', 'on the one hand', 'on the other hand', 'in conclusion']
  },
  {
    id: 'w3',
    type: 'Task 1',
    title: 'Writing Task 1 (Premium)',
    prompt: 'Premium Writing Task 1',
    minWords: 150,
    duration: 20,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Appeared Full writing (4).html'
  },
  {
    id: 'w4',
    type: 'Task 2',
    title: 'Writing Task 2 (Premium)',
    prompt: 'Premium Writing Task 2',
    minWords: 250,
    duration: 40,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED full writing (5).html'
  },
  {
    id: 'w5',
    type: 'Task 1',
    title: 'Writing Task 1 (Premium New)',
    prompt: 'Premium Writing Task 1',
    minWords: 150,
    duration: 20,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED writing (2).html'
  },
  {
    id: 'w6',
    type: 'Task 2',
    title: 'Writing Task 2 (Premium New)',
    prompt: 'Premium Writing Task 2',
    minWords: 250,
    duration: 40,
    sampleEssay: 'Loading...',
    template: 'Loading...',
    vocabulary: [],
    htmlUrl: '/test materials/writing/APPEARED full writing (6).html'
  }
];
