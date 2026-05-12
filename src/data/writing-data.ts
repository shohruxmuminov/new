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
    id: 'w_new_cdi_1',
    type: 'Task 1',
    title: 'CDI Writing - New Set 1',
    prompt: 'The graph below shows the average time spent by four car manufacturers to produce vehicles at their US factories.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/CDI WRITING.html'
  },
  {
    id: 'w_new_cdi_2',
    type: 'Task 1',
    title: 'CDI Writing - New Set 2',
    prompt: 'The bar chart below shows the percentage of the population in the UK who consumed the recommended daily amount of fruit and vegetables.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/CDI WRITING (2).html'
  },
  {
    id: 'w_new_cdi_3',
    type: 'Task 1',
    title: 'CDI Writing - New Set 3',
    prompt: 'Two trends show population of southern pacific ocean countries from 1950 and projections of 2040.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/CDI WRITING (3).html'
  },
  {
    id: 'w_new_full_a',
    type: 'Task 1',
    title: 'Writing Full Test - New A',
    prompt: 'The table below shows the postgraduate course fees in US Dollars that international students paid in three countries in 2007.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/Writing.html'
  },
  {
    id: 'w_new_full_b',
    type: 'Task 1',
    title: 'Writing Full Test - New B',
    prompt: 'The diagram shows a small local museum and its surroundings in 1957 and 2007.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/Writing (2).html'
  },
  {
    id: 'w_new_task12_1',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 - New Set 1',
    prompt: 'The bar chart shows the distribution of employment among agriculture, services, industries in three countries in 1980 and projected distribution in 2020.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/Writing-Task 1 and 2.html'
  },
  {
    id: 'w_new_task12_2',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 - New Set 2',
    prompt: 'The graph shows the information about international conferences in 3 capital cities in 1980-2010.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/new writing/Writing-Task 1 and 2 (2).html'
  },
  {

    id: 'w_cdi_writing_1',
    type: 'Task 1',
    title: 'CDI Writing – Set 1',
    prompt: 'The graph below shows the average time spent by four car manufacturers to produce vehicles at their US factories.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/CDI WRITING.html'
  },
  {
    id: 'w_cdi_writing_2',
    type: 'Task 1',
    title: 'CDI Writing – Set 2',
    prompt: 'The bar chart below shows the percentage of the population in the UK who consumed the recommended daily amount of fruit and vegetables.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/CDI WRITING (2).html'
  },
  {
    id: 'w_cdi_writing_3',
    type: 'Task 1',
    title: 'CDI Writing – Set 3',
    prompt: 'Two trends show population of southern pacific ocean countries from 1950 and projections of 2040.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/CDI WRITING (3).html'
  },
  {
    id: 'w_writing_full_a',
    type: 'Task 1',
    title: 'Writing Full Test – A',
    prompt: 'The table below shows the postgraduate course fees in US Dollars that international students paid in three countries in 2007.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing.html'
  },
  {
    id: 'w_writing_full_b',
    type: 'Task 1',
    title: 'Writing Full Test – B',
    prompt: 'The diagram shows a small local museum and its surroundings in 1957 and 2007.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing (2).html'
  },
  {
    id: 'w_full_task_1_and_2_set1',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 – Set 1',
    prompt: 'The bar chart shows the distribution of employment among agriculture, services, industries in three countries in 1980 and projected distribution in 2020.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing-Task 1 and 2.html'
  },
  {
    id: 'w_full_task_1_and_2_set2',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 – Set 2',
    prompt: 'The charts below show the performance of spending on roads and transport in four countries from 1990 to 2005.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing-Task 1 and 2 (2).html'
  },
  {
    id: 'w_full_task_1_and_2_set3',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 – Set 3',
    prompt: 'The graph below shows the information about medical care in three European countries between 1980 and 2000.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing-Task 1 and 2 (3).html'
  },
  {
    id: 'w_full_task_1_and_2_set4',
    type: 'Task 1',
    title: 'Writing Task 1 & 2 – Set 4',
    prompt: 'The graph below shows the production levels of the main kinds of fuel in the UK between 1981 and 2000.',
    minWords: 150,
    duration: 60,
    sampleEssay: '',
    template: '',
    vocabulary: [],
    htmlUrl: '/test materials/writing/Writing-Task 1 and 2 (4).html'
  },
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
  },
  {
    id: 'w_full_1_t1',
    type: 'Task 1',
    title: 'Writing Full 1 - Task 1',
    prompt: 'The diagrams below show the changes of a town called Bridgetown in 1700 and 2000. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: '/test materials/writing/images/writing_full_1_task_1.png',
    minWords: 150,
    duration: 20,
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_full_1_t2',
    type: 'Task 2',
    title: 'Writing Full 1 - Task 2',
    prompt: 'Some people believe that it is possible for a country to be economically successful and have a clean environment. Others argue that these two objectives are not compatible. Discuss both the views and give your opinion.',
    minWords: 250,
    duration: 40,
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_full_2_t1',
    type: 'Task 1',
    title: 'Writing Full 2 - Task 1',
    prompt: 'The graph shows the percentage of people who recycle their rubbish, in five countries, over 12 years. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: '/test materials/writing/images/writing_full_2_task_1.png',
    minWords: 150,
    duration: 20,
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_full_2_t2',
    type: 'Task 2',
    title: 'Writing Full 2 - Task 2',
    prompt: 'The tendency of news reporters in the media to focus more on problems and emergencies than on positive developments is harmful to the individuals and the society as a whole. To what extend do you agree or disagree? Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    minWords: 250,
    duration: 40,
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_full_3_t1',
    type: 'Task 1',
    title: 'Writing Full 3 - Task 1',
    prompt: 'The diagrams below show the present building of a college and the plan for changes to the college site in the future. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    imageUrl: '/test materials/writing/images/writing_full_3_task_1.png',
    minWords: 150,
    duration: 20,
    sampleEssay: '',
    template: '',
    vocabulary: []
  },
  {
    id: 'w_full_3_t2',
    type: 'Task 2',
    title: 'Writing Full 3 - Task 2',
    prompt: 'Some people say it is acceptable to use animals for our benefit, others say it is wrong to exploit them. Discuss both points of view and give your opinion. Give reasons for your answer and include any relevant examples from your own knowledge or experience.',
    minWords: 250,
    duration: 40,
    sampleEssay: '',
    template: '',
    vocabulary: []
  }
];
