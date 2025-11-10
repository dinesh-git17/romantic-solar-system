// src/hooks/useAudioPlayer.ts
// Custom hook for audio playback logic and controls

import { useAudioStore } from "@/store/audioStore";
import { useCallback, useEffect, useRef } from "react";

interface UseAudioPlayerProps {
  trackUrl: string;
  autoplay?: boolean;
}

interface UseAudioPlayerReturn {
  play: () => Promise<void>;
  pause: () => void;
  setVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;
  audioElement: HTMLAudioElement | null;
}

const FADE_DURATION = 1500;
const FADE_STEPS = 30;
const FADE_INTERVAL = FADE_DURATION / FADE_STEPS;

export const useAudioPlayer = ({
  trackUrl,
  autoplay = false,
}: UseAudioPlayerProps): UseAudioPlayerReturn => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const targetVolumeRef = useRef<number>(0.5);

  const {
    volume,
    isMuted,
    setAutoplayBlocked,
    setLoading,
    setError,
    play: setPlaying,
  } = useAudioStore();

  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
      fadeIntervalRef.current = null;
    }
  }, []);

  const fadeIn = useCallback(
    (audio: HTMLAudioElement, targetVolume: number) => {
      clearFadeInterval();
      audio.volume = 0;
      const volumeStep = targetVolume / FADE_STEPS;

      fadeIntervalRef.current = setInterval(() => {
        const newVolume = Math.min(audio.volume + volumeStep, targetVolume);
        audio.volume = newVolume;

        if (newVolume >= targetVolume) {
          clearFadeInterval();
        }
      }, FADE_INTERVAL);
    },
    [clearFadeInterval]
  );

  const play = useCallback(async (): Promise<void> => {
    if (!audioRef.current) return;

    try {
      setLoading(true);
      targetVolumeRef.current = isMuted ? 0 : volume;
      fadeIn(audioRef.current, targetVolumeRef.current);
      await audioRef.current.play();
      setPlaying();
      setAutoplayBlocked(false);
      setError(false);
    } catch (error) {
      if (error instanceof Error && error.name === "NotAllowedError") {
        setAutoplayBlocked(true);
      } else {
        setError(true);
        console.error("Audio playback error:", error);
      }
    } finally {
      setLoading(false);
    }
  }, [
    volume,
    isMuted,
    fadeIn,
    setPlaying,
    setAutoplayBlocked,
    setError,
    setLoading,
  ]);

  const pause = useCallback(() => {
    if (!audioRef.current) return;
    clearFadeInterval();
    audioRef.current.pause();
  }, [clearFadeInterval]);

  const setVolume = useCallback((newVolume: number) => {
    if (!audioRef.current) return;
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    targetVolumeRef.current = clampedVolume;
    audioRef.current.volume = clampedVolume;
  }, []);

  const setMuted = useCallback((muted: boolean) => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : targetVolumeRef.current;
  }, []);

  useEffect(() => {
    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0;
    audioRef.current = audio;

    const handleCanPlay = () => {
      setLoading(false);
    };

    const handleError = () => {
      setError(true);
      setLoading(false);
      console.error("Failed to load audio track:", trackUrl);
    };

    audio.addEventListener("canplaythrough", handleCanPlay);
    audio.addEventListener("error", handleError);

    if (autoplay) {
      void play();
    }

    return () => {
      clearFadeInterval();
      audio.removeEventListener("canplaythrough", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [trackUrl, autoplay, play, setLoading, setError, clearFadeInterval]);

  useEffect(() => {
    setVolume(volume);
  }, [volume, setVolume]);

  useEffect(() => {
    setMuted(isMuted);
  }, [isMuted, setMuted]);

  return {
    play,
    pause,
    setVolume,
    setMuted,
    audioElement: audioRef.current,
  };
};
