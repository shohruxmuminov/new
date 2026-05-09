export interface MockTest {
  id: string;
  title: string;
  type: 'reading' | 'listening' | 'writing' | 'full';
  htmlUrl: string;
  isPublished: boolean;
  createdAt: number;
}

export const mockTests: MockTest[] = [];
