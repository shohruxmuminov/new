export interface MockTest {
  id: string;
  title: string;
  type: 'reading' | 'listening' | 'writing' | 'full';
  htmlUrl: string; // For full tests, this is the base filename used for all 3 parts
}

export const mockTests: MockTest[] = [
  {
    id: 'mock-1',
    title: 'IELTS Full Mock Test 1',
    type: 'full',
    htmlUrl: '/test materials/mock test/mock listening/1.html'
  }
];
