// src/components/UI/AudioPlayer.tsx
// Core audio playback component - handles audio element and playback logic

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { useAudioStore } from "@/store/audioStore";
import { useEffect } from "react";

interface AudioPlayerProps {
  mode: "educational" | "romantic";
}

const TRACK_URLS = {
  educational: "/audio/educational.mp3",
  romantic: "/audio/romantic.mp3",
} as const;

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ mode }) => {
  const { isPlaying } = useAudioStore();
  const { play, pause } = useAudioPlayer({
    trackUrl: TRACK_URLS[mode],
    autoplay: true,
  });

  useEffect(() => {
    if (isPlaying) {
      void play();
    } else {
      pause();
    }
  }, [isPlaying, play, pause]);

  return null;
};
