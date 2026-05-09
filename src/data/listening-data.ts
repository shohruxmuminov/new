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
  sections: ListeningSection[];
}

export const listeningTests: ListeningTest[] = [];
