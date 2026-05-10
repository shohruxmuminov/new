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
    id: 'l_full8',
    title: 'IELTS Listening – Full Test 8',
    audioUrl: 'https://www.sanokulov.uz/media/listening_tests/audio/6d7f7fd0d0c248808436ca4d1261d7cc.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-8.html',
    sections: []
  },
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
    id: 'l_jurabek_5',
    title: 'Jurabek Listening 5',
    audioUrl: '',
    duration: 30,
    htmlUrl: '/test materials/listening/IELTSwithJurabek Listening (5).html',
    sections: []
  }
];
