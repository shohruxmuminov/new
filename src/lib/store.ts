import { create } from 'zustand';
import { getStorageItem, setStorageItem } from './utils';

// === Bookmark Store ===
export interface Bookmark {
  id: string;
  module: 'speaking' | 'reading' | 'listening' | 'writing';
  title: string;
  path: string;
  createdAt: string;
}

interface BookmarkStore {
  bookmarks: Bookmark[];
  addBookmark: (b: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  loadBookmarks: () => void;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
  bookmarks: [],
  loadBookmarks: () => {
    set({ bookmarks: getStorageItem<Bookmark[]>('cdi-bookmarks', []) });
  },
  addBookmark: (b) => {
    const updated = [...get().bookmarks, b];
    set({ bookmarks: updated });
    setStorageItem('cdi-bookmarks', updated);
  },
  removeBookmark: (id) => {
    const updated = get().bookmarks.filter((b) => b.id !== id);
    set({ bookmarks: updated });
    setStorageItem('cdi-bookmarks', updated);
  },
  isBookmarked: (id) => get().bookmarks.some((b) => b.id === id),
}));

// === Test History Store ===
export interface TestResult {
  id: string;
  module: 'speaking' | 'reading' | 'listening' | 'writing';
  testName: string;
  score: number;
  totalQuestions: number;
  bandScore: string;
  date: string;
  timeTaken: number;
}

interface HistoryStore {
  results: TestResult[];
  addResult: (r: TestResult) => void;
  clearHistory: () => void;
  loadHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
  results: [],
  loadHistory: () => {
    set({ results: getStorageItem<TestResult[]>('cdi-history', []) });
  },
  addResult: (r) => {
    const updated = [r, ...get().results];
    set({ results: updated });
    setStorageItem('cdi-history', updated);
  },
  clearHistory: () => {
    set({ results: [] });
    setStorageItem('cdi-history', []);
  },
}));

// === Draft Store (Writing) ===
export interface WritingDraft {
  taskId: string;
  content: string;
  updatedAt: string;
}

interface DraftStore {
  drafts: WritingDraft[];
  saveDraft: (d: WritingDraft) => void;
  getDraft: (taskId: string) => WritingDraft | undefined;
  deleteDraft: (taskId: string) => void;
  loadDrafts: () => void;
}

export const useDraftStore = create<DraftStore>((set, get) => ({
  drafts: [],
  loadDrafts: () => {
    set({ drafts: getStorageItem<WritingDraft[]>('cdi-drafts', []) });
  },
  saveDraft: (d) => {
    const existing = get().drafts.filter((dr) => dr.taskId !== d.taskId);
    const updated = [...existing, d];
    set({ drafts: updated });
    setStorageItem('cdi-drafts', updated);
  },
  getDraft: (taskId) => get().drafts.find((d) => d.taskId === taskId),
  deleteDraft: (taskId) => {
    const updated = get().drafts.filter((d) => d.taskId !== taskId);
    set({ drafts: updated });
    setStorageItem('cdi-drafts', updated);
  },
}));

// === User Progress ===
interface ProgressStore {
  speakingCompleted: number;
  readingCompleted: number;
  listeningCompleted: number;
  writingCompleted: number;
  streak: number;
  lastActive: string;
  incrementModule: (mod: 'speaking' | 'reading' | 'listening' | 'writing') => void;
  loadProgress: () => void;
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  speakingCompleted: 0,
  readingCompleted: 0,
  listeningCompleted: 0,
  writingCompleted: 0,
  streak: 0,
  lastActive: '',
  loadProgress: () => {
    const data = getStorageItem('cdi-progress', {
      speakingCompleted: 0,
      readingCompleted: 0,
      listeningCompleted: 0,
      writingCompleted: 0,
      streak: 0,
      lastActive: '',
    });
    set(data);
  },
  incrementModule: (mod) => {
    const key = `${mod}Completed` as keyof ProgressStore;
    const current = get()[key] as number;
    const today = new Date().toISOString().split('T')[0];
    const lastActive = get().lastActive;
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    let streak = get().streak;
    if (lastActive === yesterday) streak++;
    else if (lastActive !== today) streak = 1;

    const update = {
      [key]: current + 1,
      streak,
      lastActive: today,
    };
    set(update as Partial<ProgressStore>);
    setStorageItem('cdi-progress', { ...get(), ...update });
  },
}));
