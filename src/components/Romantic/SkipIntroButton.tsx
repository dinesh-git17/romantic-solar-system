// src/components/Romantic/SkipIntroButton.tsx
// Skip button for romantic opening sequence - appears after 5 seconds

import { useEffect, useState } from "react";

interface SkipIntroButtonProps {
  onSkip: () => void;
}

export const SkipIntroButton: React.FC<SkipIntroButtonProps> = ({ onSkip }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={onSkip}
      className="fixed bottom-8 right-8 z-50 group
        px-6 py-3 
        bg-gradient-to-r from-pink-500/30 to-purple-500/30 
        hover:from-pink-500/50 hover:to-purple-500/50
        backdrop-blur-xl border border-pink-500/30 
        rounded-full shadow-2xl
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-pink-500/30
        animate-fade-in"
    >
      <div className="flex items-center gap-2">
        <span className="text-white font-medium text-sm">Skip Intro</span>
        <svg
          className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </div>

      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 animate-pulse" />
    </button>
  );
};
