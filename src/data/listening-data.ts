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
    id: 'l_full9',
    title: 'Listening Test 9',
    audioUrl: '/test materials/listening/audio/listening_9.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-listening-9.html',
    sections: []
  },
  {
    id: 'l_full10',
    title: 'Listening Test 10',
    audioUrl: '/test materials/listening/audio/listening_10.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-listening-10.html',
    sections: []
  },
  {
    id: 'l_full11',
    title: 'Listening Test 11',
    audioUrl: '/test materials/listening/audio/listening_11.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-listening-11.html',
    sections: []
  },
  {
    id: 'l_full12',
    title: 'Listening Test 12',
    audioUrl: '/test materials/listening/audio/listening_12.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-listening-12.html',
    sections: []
  },
  {
    id: 'l_full13',
    title: 'Listening Test 13',
    audioUrl: '/test materials/listening/audio/listening_13.mp3',
    duration: 30,
    htmlUrl: '/test materials/listening/full-listening-13.html',
    sections: []
  }
];
