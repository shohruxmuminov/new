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
  audioUrl: string;
  duration: number;
  htmlUrl?: string;
  sections: ListeningSection[];
}

export const listeningTests: ListeningTest[] = [
  {
    id: 'l1',
    title: 'Listening Test 1',
    audioUrl: '/test materials/listening/1.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/1.html',
    sections: []
  },
  {
    id: 'l2',
    title: 'Listening Test 2',
    audioUrl: '/test materials/listening/2.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/2.html',
    sections: []
  },
  {
    id: 'l_full8',
    title: 'IELTS Listening – Full Test 8',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6d7f7fd0d0c248808436ca4d1261d7cc.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-8.html',
    sections: []
  },
  {
    id: 'l_full14',
    title: 'IELTS Listening – Full Test 14',
    audioUrl: '/test materials/listening/14/part1.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-14.html',
    sections: []
  },
  {
    id: 'l_sanokulov_dynamic14',
    title: 'Sanokulov Listening – Dynamic 14 (Test Plus 3)',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6f170c30fb314475a7ff92b978e4987c.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/sanokulov-dynamic-14.html',
    sections: []
  },
  {
    id: 'l_sanokulov_dynamic12',
    title: 'Sanokulov Listening – Dynamic 12',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6be6c363335b437d9e83a11cf837e317.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/sanokulov-dynamic-12.html',
    sections: []
  },
  {
    id: 'l_sanokulov_test1',
    title: 'Sanokulov Listening – Test 1 (Full)',
    audioUrl: '', 
    duration: 30,
    htmlUrl: '/test materials/listening/sanokulov-test1-full.html',
    sections: []
  }
];
