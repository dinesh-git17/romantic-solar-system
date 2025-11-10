// src/components/Romantic/NarrationOverlay.tsx
// Glassmorphism text overlay for romantic opening sequence narration

import { useEffect, useState } from "react";

interface NarrationOverlayProps {
  onComplete: () => void;
}

export const NarrationOverlay: React.FC<NarrationOverlayProps> = ({
  onComplete,
}) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const fadeInDuration = 2000;
    const holdDuration = 4000;
    const fadeOutDuration = 1000;

    const fadeInStart = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - fadeInStart;

      if (elapsed < fadeInDuration) {
        setOpacity(elapsed / fadeInDuration);
        requestAnimationFrame(animate);
      } else if (elapsed < fadeInDuration + holdDuration) {
        setOpacity(1);
        requestAnimationFrame(animate);
      } else if (elapsed < fadeInDuration + holdDuration + fadeOutDuration) {
        const fadeOutProgress =
          (elapsed - fadeInDuration - holdDuration) / fadeOutDuration;
        setOpacity(1 - fadeOutProgress);
        requestAnimationFrame(animate);
      } else {
        setOpacity(0);
        onComplete();
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      <div className="max-w-3xl mx-auto px-8 py-12 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
        <p className="text-white text-2xl md:text-3xl text-center leading-relaxed font-serif italic">
          Love is not found in a single moment, but in the journey between two
          souls. Let me show you the map of our hearts...
        </p>
      </div>
    </div>
  );
};
