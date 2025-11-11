// src/components/Romantic/OpeningProgressBar.tsx
// Progress indicator for romantic opening sequence

import { useEffect, useState } from "react";

interface OpeningProgressBarProps {
  duration: number;
  onComplete?: () => void;
}

export const OpeningProgressBar: React.FC<OpeningProgressBarProps> = ({
  duration,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        onComplete?.();
      }
    }, 16);

    return () => {
      clearInterval(interval);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 animate-fade-in">
      <div className="relative h-1 bg-black/20 backdrop-blur-sm">
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress.toFixed(2)}%` }}
        >
          <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-r from-transparent to-white/30 animate-pulse" />
        </div>
      </div>

      <div className="absolute top-2 right-4 text-xs text-white/60 font-medium">
        {Math.round(progress)}%
      </div>
    </div>
  );
};
