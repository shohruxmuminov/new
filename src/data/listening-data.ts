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
        title: 'Part 1: Questions 1–10',
        description: 'Beach Heads Travel - Customer Request Sheet. Complete the notes below. Write ONE WORD AND/OR A NUMBER for each answer.',
        questions: [
          { id: 'l1q1', type: 'fill', question: '1. Date of arrival: 15 October (staying for _______ weeks)', answer: '2', explanation: '' },
          { id: 'l1q2', type: 'fill', question: '2. Accommodation: Book a _______ on the beach', answer: 'hotel', explanation: '' },
          { id: 'l1q3', type: 'fill', question: '3. Budget: Around _______ a night', answer: '175', explanation: '' },
          { id: 'l1q4', type: 'fill', question: '4. Activities: The children want to go _______', answer: 'sailing', explanation: '' },
          { id: 'l1q5', type: 'fill', question: '5. Activities: Arrange for them to have a _______', answer: 'class', explanation: '' },
          { id: 'l1q6', type: 'fill', question: '6. Activities: Book a time for Susan and Jenny to play _______', answer: 'golf', explanation: '' },
          { id: 'l1q7', type: 'fill', question: '7. Activities: Duncan wants to go _______ – send some information', answer: 'fishing', explanation: '' },
          { id: 'l1q8', type: 'fill', question: '8. Week Two Accommodation: National Park – book a _______ ($100 per night)', answer: 'caravan', explanation: '' },
          { id: 'l1q9', type: 'fill', question: '9. Week Two Activities: Arrange a _______ for Jenny', answer: 'massage', explanation: '' },
          { id: 'l1q10', type: 'fill', question: '10. Week Two Activities: Send Duncan a _______ for Marco’s', answer: 'menu', explanation: '' }
        ]
      },
      {
        title: 'Part 2: Questions 11–20',
        description: 'How to use City Cycle. Questions 11–15: Complete the flow-chart below. Choose FIVE correct answers from the box (A–I: A. button, B. website, C. helmet, D. light, E. locker, F. password, G. rack, H. screen, I. sound). Questions 16–20: Label the plan below. Choose the correct letter, A–H.',
        questions: [
          { id: 'l1q11', type: 'mcq', question: '11. Select a bike by using the', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], answer: 'H', explanation: 'screen' },
          { id: 'l1q12', type: 'mcq', question: '12. Release the bike by using the _______ of your chosen bike', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], answer: 'A', explanation: 'button' },
          { id: 'l1q13', type: 'mcq', question: '13. Remove the bike from the', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], answer: 'G', explanation: 'rack' },
          { id: 'l1q14', type: 'mcq', question: '14. Make sure you have a _______ before setting off', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], answer: 'C', explanation: 'helmet' },
          { id: 'l1q15', type: 'mcq', question: '15. Listen for a _______ to confirm it is locked', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'], answer: 'D', explanation: 'light' },
          { id: 'l1q16', type: 'mcq', question: '16. Coffee cart', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'E', explanation: '' },
          { id: 'l1q17', type: 'mcq', question: '17. Workshop', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'F', explanation: '' },
          { id: 'l1q18', type: 'mcq', question: '18. Lockers', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'A', explanation: '' },
          { id: 'l1q19', type: 'mcq', question: '19. Showers', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'H', explanation: '' },
          { id: 'l1q20', type: 'mcq', question: '20. Towel', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'B', explanation: '' }
        ]
      },
      {
        title: 'Part 3: Questions 21–30',
        description: 'Products using renewable energy sources. Questions 21–23: Complete the notes. Write ONE WORD ONLY. Questions 24–25: Choose TWO correct answers (A–E). Questions 26–30: Choose the correct letter, A, B, or C.',
        questions: [
          { id: 'l1q21', type: 'fill', question: '21. Can use wind power in any _______', answer: 'weather', explanation: '' },
          { id: 'l1q22', type: 'fill', question: '22. Uses _______ as a power source', answer: 'electricity', explanation: '' },
          { id: 'l1q23', type: 'fill', question: '23. Safer than paraffin stoves as less likely to _______', answer: 'explode', explanation: '' },
          { id: 'l1q24', type: 'mcq', question: '24. Who will Sylvia and Greg ask to take part in the survey? (1)', options: ['A. Companies', 'B. Residents', 'C. Local council', 'D. Experts', 'E. University students'], answer: 'A', explanation: '' },
          { id: 'l1q25', type: 'mcq', question: '25. Who will Sylvia and Greg ask to take part in the survey? (2)', options: ['A. Companies', 'B. Residents', 'C. Local council', 'D. Experts', 'E. University students'], answer: 'E', explanation: '' },
          { id: 'l1q26', type: 'mcq', question: '26. Sylvia thinks that the information about wave power:', options: ['A. Many people know little about it', 'B. It is too technical for most people', 'C. It is becoming more widely available'], answer: 'A', explanation: '' },
          { id: 'l1q27', type: 'mcq', question: '27. Sylvia and Greg decide to ask about traditional energy consumption:', options: ['A. current patterns', 'B. possible future developments', 'C. past trends'], answer: 'B', explanation: '' },
          { id: 'l1q28', type: 'mcq', question: '28. Greg says about nuclear power:', options: ['A. It is the most reliable source', 'B. It is cheaper than other sources', 'C. Some people think it is unsafe'], answer: 'C', explanation: '' },
          { id: 'l1q29', type: 'mcq', question: '29. Sylvia and Greg agree about the cost of renewable energy:', options: ['A. Prices will drop in the future', 'B. It is currently very expensive', 'C. Government subsidies are needed'], answer: 'A', explanation: '' },
          { id: 'l1q30', type: 'mcq', question: '30. Sylvia and Greg agree that modern windmills:', options: ['A. are noisy and unsightly', 'B. should be put in carefully selected locations', 'C. are not very efficient'], answer: 'B', explanation: '' }
        ]
      },
      {
        title: 'Part 4: Questions 31–40',
        description: 'Absence from work. Complete the notes below. Write ONE WORD ONLY for each answer.',
        questions: [
          { id: 'l1q31', type: 'fill', question: '31. Main factors: the _______ of employees', answer: 'gender', explanation: '' },
          { id: 'l1q32', type: 'fill', question: '32. Main factors: employees\' attitude', answer: 'attitude', explanation: '' },
          { id: 'l1q33', type: 'fill', question: '33. Main factors: the _______ of the organization', answer: 'culture', explanation: '' },
          { id: 'l1q34', type: 'fill', question: '34. Main factors: higher absence among employees in _______', answer: 'industry', explanation: '' },
          { id: 'l1q35', type: 'fill', question: '35. Main factors: the _______ of an employee\'s work group', answer: 'size', explanation: '' },
          { id: 'l1q36', type: 'fill', question: '36. Public vs Private: Public sector is less _______', answer: 'efficient', explanation: '' },
          { id: 'l1q37', type: 'fill', question: '37. Public vs Private: Bureaucratic because of _______ factors', answer: 'external', explanation: '' },
          { id: 'l1q38', type: 'fill', question: '38. Organizations usually: have a _______ workforce', answer: 'larger', explanation: '' },
          { id: 'l1q39', type: 'fill', question: '39. Organizations usually: provide _______ for longer', answer: 'benefits', explanation: '' },
          { id: 'l1q40', type: 'fill', question: '40. Organizations usually: are less likely to _______ employer', answer: 'dismiss', explanation: '' }
        ]
      }
    ]
  }
];
