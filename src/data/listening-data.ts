export interface ListeningQuestion {
  id: string;
  type: 'mcq' | 'fill' | 'map';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}

export interface ListeningSection {
  title: string;
  description: string;
  questions: ListeningQuestion[];
}

export interface ListeningTest {
  id: string;
  title: string;
  audioUrl?: string;
  duration: number;
  htmlUrl?: string;
  sections: ListeningSection[];
}

export const listeningTests: ListeningTest[] = [
  {
    id: 'l1',
    title: 'Listening Test 1',
    audioUrl: '/test%20materials/listening/1.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/1.html',
    sections: []
  },
  {
    id: 'l2',
    title: 'Listening Test 2',
    audioUrl: '/test%20materials/listening/2.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/2.html',
    sections: []
  },
  {
    id: 'l_full8',
    title: 'IELTS Listening – Full Test 8',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6d7f7fd0d0c248808436ca4d1261d7cc.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/full-8.html',
    sections: []
  },
  {
    id: 'l_full14',
    title: 'IELTS Listening – Full Test 14',
    audioUrl: '/test%20materials/listening/14/part1.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/full-14.html',
    sections: []
  },
  {
    id: 'l_sanokulov_dynamic14',
    title: 'Sanokulov Listening – Dynamic 14 (Test Plus 3)',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6f170c30fb314475a7ff92b978e4987c.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/sanokulov-dynamic-14.html',
    sections: []
  },
  {
    id: 'l_sanokulov_dynamic12',
    title: 'Sanokulov Listening – Dynamic 12',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6be6c363335b437d9e83a11cf837e317.mp3',
    duration: 30,
    htmlUrl: '/test%20materials/listening/sanokulov-dynamic-12.html',
    sections: []
  },
  {
    id: 'l_sanokulov_test1',
    title: 'Sanokulov Listening – Test 1 (Full)',
    duration: 30,
    htmlUrl: '/test%20materials/listening/sanokulov-test1-full.html',
    sections: []
  },
  {
    id: 'l_sanokulov_test2',
    title: 'Sanokulov Listening – Test 2 (Full)',
    duration: 30,
    htmlUrl: '/test%20materials/listening/sanokulov-test2-full.html',
    sections: []
  },
  {
    id: 'l_sanokulov_test3',
    title: 'Sanokulov Listening – Test 3 (Full)',
    duration: 30,
    htmlUrl: '/test%20materials/listening/sanokulov-test3-full.html',
    sections: []
  },
  {
    id: 'l_full1_ieltsmaterials',
    title: 'IELTS Listening – Full Test 1',
    audioUrl: '/test materials/listening/listening_full_1.mp3',
    duration: 30,
    sections: [
      {
        title: 'Section 1: Questions 1-10',
        description: 'Questions 1-10: Complete the notes below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.',
        questions: [
          { id: 'l1q1', type: 'fill', question: '1. Name of club: _______ Health Club', answer: 'KINGSWELL', explanation: '' },
          { id: 'l1q2', type: 'fill', question: '2. Contact number: _______', answer: '08967 443203', explanation: '' },
          { id: 'l1q3', type: 'fill', question: '3. Preferred membership type: _______', answer: 'OFF-PEAK', explanation: '' },
          { id: 'l1q4', type: 'fill', question: '4. Reason for joining: to improve _______', answer: 'FITNESS', explanation: '' },
          { id: 'l1q5', type: 'fill', question: '5. Current physical problem: _______', answer: 'BACK', explanation: '' },
          { id: 'l1q6', type: 'fill', question: '6. Date of birth: _______', answer: '22ND JULY', explanation: '' },
          { id: 'l1q7', type: 'fill', question: '7. Address: 14 _______ Street', answer: 'ELMWORTH', explanation: '' },
          { id: 'l1q8', type: 'fill', question: '8. Postcode: _______', answer: 'LS14 2JW', explanation: '' },
          { id: 'l1q9', type: 'fill', question: '9. Payment method: _______', answer: 'MONTHLY', explanation: '' },
          { id: 'l1q10', type: 'fill', question: '10. Initial payment: £_______', answer: '40', explanation: '' }
        ]
      },
      {
        title: 'Section 2: Questions 11-20',
        description: 'Questions 11-16: Choose the correct letter, A, B or C. Questions 17-20: Choose the correct letter, A, B or C.',
        questions: [
          { id: 'l1q11', type: 'mcq', question: '11. The local radio station is called', options: ['A. Radio North', 'B. Radio One', 'C. Radio East'], answer: 'A', explanation: '' },
          { id: 'l1q12', type: 'mcq', question: '12. The station began broadcasting', options: ['A. 10 years ago', 'B. 15 years ago', 'C. 20 years ago'], answer: 'B', explanation: '' },
          { id: 'l1q13', type: 'mcq', question: '13. The main aim of the station is to', options: ['A. provide entertainment', 'B. promote local businesses', 'C. inform the community'], answer: 'C', explanation: '' },
          { id: 'l1q14', type: 'mcq', question: '14. The station is funded by', options: ['A. local government', 'B. advertising', 'C. donations'], answer: 'B', explanation: '' },
          { id: 'l1q15', type: 'mcq', question: '15. The most popular program is', options: ['A. the news', 'B. the talk show', 'C. the music show'], answer: 'C', explanation: '' },
          { id: 'l1q16', type: 'mcq', question: '16. The station is located in', options: ['A. the town centre', 'B. an industrial estate', 'C. a residential area'], answer: 'A', explanation: '' },
          { id: 'l1q17', type: 'mcq', question: '17. What does the speaker say about the news program?', options: ['A. It is broadcast every hour.', 'B. It is only about local news.', 'C. It is very popular.'], answer: 'B', explanation: '' },
          { id: 'l1q18', type: 'mcq', question: '18. The sports program is on', options: ['A. Friday evening', 'B. Saturday afternoon', 'C. Sunday morning'], answer: 'B', explanation: '' },
          { id: 'l1q19', type: 'mcq', question: '19. The station is looking for', options: ['A. new presenters', 'B. more listeners', 'C. volunteers'], answer: 'C', explanation: '' },
          { id: 'l1q20', type: 'mcq', question: '20. Listeners can contact the station by', options: ['A. phone', 'B. email', 'C. social media'], answer: 'A', explanation: '' }
        ]
      },
      {
        title: 'Section 3: Questions 21-30',
        description: 'Questions 21-25: Choose the correct letter, A, B or C. Questions 26-30: Complete the sentences below. Write ONE WORD ONLY for each answer.',
        questions: [
          { id: 'l1q21', type: 'mcq', question: '21. Why did the students choose the topic of recycling?', options: ['A. It is a current issue.', 'B. They have previous knowledge.', 'C. It was recommended by their tutor.'], answer: 'A', explanation: '' },
          { id: 'l1q22', type: 'mcq', question: '22. What was the main problem with the survey?', options: ['A. The questions were too long.', 'B. The sample size was too small.', 'C. The responses were biased.'], answer: 'B', explanation: '' },
          { id: 'l1q23', type: 'mcq', question: '23. Most people in the survey said they recycle because', options: ['A. it is good for the environment', 'B. it is easy to do', 'C. they feel guilty if they don\'t'], answer: 'C', explanation: '' },
          { id: 'l1q24', type: 'mcq', question: '24. What surprised the students about the results?', options: ['A. The high rate of plastic recycling.', 'B. The lack of knowledge about glass recycling.', 'C. The importance of council initiatives.'], answer: 'B', explanation: '' },
          { id: 'l1q25', type: 'mcq', question: '25. What do the students plan to do next?', options: ['A. Rewrite the survey.', 'B. Interview more people.', 'C. Analyse the data more deeply.'], answer: 'C', explanation: '' },
          { id: 'l1q26', type: 'fill', question: '26. The students need to prepare a _______ for their presentation.', answer: 'POSTER', explanation: '' },
          { id: 'l1q27', type: 'fill', question: '27. They should include more _______ in their final report.', answer: 'GRAPHS', explanation: '' },
          { id: 'l1q28', type: 'fill', question: '28. The tutor suggested that they look at some _______ online.', answer: 'ARTICLES', explanation: '' },
          { id: 'l1q29', type: 'fill', question: '29. The deadline for the project is next _______', answer: 'WEDNESDAY', explanation: '' },
          { id: 'l1q30', type: 'fill', question: '30. The presentation will take place in the _______', answer: 'AUDITORIUM', explanation: '' }
        ]
      },
      {
        title: 'Section 4: Questions 31-40',
        description: 'Questions 31-40: Complete the notes below. Write NO MORE THAN TWO WORDS for each answer.',
        questions: [
          { id: 'l1q31', type: 'fill', question: '31. The pepper plant is a _______ that grows in tropical climates.', answer: 'VINE', explanation: '' },
          { id: 'l1q32', type: 'fill', question: '32. It was originally found in southern _______', answer: 'INDIA', explanation: '' },
          { id: 'l1q33', type: 'fill', question: '33. Pepper was once so valuable that it was used as _______', answer: 'CURRENCY', explanation: '' },
          { id: 'l1q34', type: 'fill', question: '34. In the Middle Ages, pepper was imported to Europe by _______ traders.', answer: 'ARAB', explanation: '' },
          { id: 'l1q35', type: 'fill', question: '35. The Portuguese explorer who found a sea route to the pepper-growing regions was _______', answer: 'VASCO DA GAMA', explanation: '' },
          { id: 'l1q36', type: 'fill', question: '36. Black pepper is produced from berries that are _______ when they are harvested.', answer: 'GREEN', explanation: '' },
          { id: 'l1q37', type: 'fill', question: '37. White pepper is made by removing the _______ of the berry.', answer: 'SKIN', explanation: '' },
          { id: 'l1q38', type: 'fill', question: '38. Most of the world\'s pepper is now grown in _______', answer: 'VIETNAM', explanation: '' },
          { id: 'l1q39', type: 'fill', question: '39. Pepper contains a substance called _______, which gives it its heat.', answer: 'PIPERINE', explanation: '' },
          { id: 'l1q40', type: 'fill', question: '40. Historically, pepper was also used for its _______ properties.', answer: 'MEDICINAL', explanation: '' }
        ]
      }
    ]
  }
];
