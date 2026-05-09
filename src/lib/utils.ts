export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

export function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

export function calculateScore(correct: number, total: number): number {
  return Math.round((correct / total) * 100);
}

export function getBandScore(percentage: number): string {
  if (percentage >= 90) return '9.0';
  if (percentage >= 82) return '8.5';
  if (percentage >= 75) return '8.0';
  if (percentage >= 68) return '7.5';
  if (percentage >= 60) return '7.0';
  if (percentage >= 52) return '6.5';
  if (percentage >= 45) return '6.0';
  if (percentage >= 37) return '5.5';
  if (percentage >= 30) return '5.0';
  if (percentage >= 22) return '4.5';
  return '4.0';
}

export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}
