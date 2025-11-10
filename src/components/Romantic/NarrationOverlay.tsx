// src/components/Romantic/NarrationOverlay.tsx
// MINIMAL TEST VERSION - no animation, just static text

import { useEffect } from "react";

interface NarrationOverlayProps {
  onComplete: () => void;
}

export const NarrationOverlay: React.FC<NarrationOverlayProps> = ({
  onComplete,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none">
      <div className="max-w-3xl mx-auto px-8 py-12 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
        <p className="text-white text-2xl md:text-3xl text-center leading-relaxed font-serif italic">
          Love is not found in a single moment, but in the journey between two
          souls. Let me show you the map of our hearts...
        </p>
      </div>
    </div>
  );
};
