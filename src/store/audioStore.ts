// src/store/audioStore.ts
// Audio state management with localStorage persistence

import { create } from "zustand";

type TrackType = "educational" | "romantic";

interface AudioState {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  currentTrack: TrackType;
  isAutoplayBlocked: boolean;
  isLoading: boolean;
  hasError: boolean;

  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setTrack: (track: TrackType) => void;
  setAutoplayBlocked: (blocked: boolean) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: boolean) => void;
}

const STORAGE_KEYS = {
  VOLUME: "audioVolume",
  MUTED: "audioMuted",
} as const;

const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored !== null ? (JSON.parse(stored) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const saveToStorage = (key: string, value: unknown): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`Failed to save ${key} to localStorage`);
  }
};

export const useAudioStore = create<AudioState>((set) => ({
  isPlaying: false,
  isMuted: loadFromStorage(STORAGE_KEYS.MUTED, false),
  volume: loadFromStorage(STORAGE_KEYS.VOLUME, 0.5),
  currentTrack: "educational",
  isAutoplayBlocked: false,
  isLoading: false,
  hasError: false,

  play: () => {
    set({ isPlaying: true, isAutoplayBlocked: false });
  },

  pause: () => {
    set({ isPlaying: false });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  setVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    saveToStorage(STORAGE_KEYS.VOLUME, clampedVolume);
    set({ volume: clampedVolume });
  },

  toggleMute: () => {
    set((state) => {
      const newMuted = !state.isMuted;
      saveToStorage(STORAGE_KEYS.MUTED, newMuted);
      return { isMuted: newMuted };
    });
  },

  setTrack: (track: TrackType) => {
    set({ currentTrack: track });
  },

  setAutoplayBlocked: (blocked: boolean) => {
    set({ isAutoplayBlocked: blocked });
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: boolean) => {
    set({ hasError: error });
  },
}));
