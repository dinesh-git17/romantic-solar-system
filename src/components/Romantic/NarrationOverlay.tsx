// src/components/Romantic/NarrationOverlay.tsx
// Modern romantic narration overlay with typewriter effect completing before fade

import { useEffect, useState } from "react";

interface NarrationOverlayProps {
  onComplete: () => void;
}

export const NarrationOverlay: React.FC<NarrationOverlayProps> = ({
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [displayedText, setDisplayedText] = useState("");

  const fullText =
    "Love is not found in a single moment, but in the journey between two souls. Let me show you the map of our hearts...";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 75;

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    const fadeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 11000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete, fullText]);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-[4000ms] ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative max-w-4xl mx-auto px-6 py-8">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-rose-500/20 rounded-3xl blur-2xl animate-pulse" />

        <div className="absolute -top-4 -right-4 w-24 h-24 bg-pink-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />

        <div className="relative bg-black/40 backdrop-blur-2xl border border-pink-500/30 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-purple-500/5" />

          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="absolute top-6 left-6 w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
          <div className="absolute top-10 right-8 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse delay-150" />
          <div className="absolute bottom-8 left-10 w-1 h-1 bg-rose-400 rounded-full animate-pulse delay-300" />
          <div className="absolute bottom-6 right-6 w-2 h-2 bg-pink-300 rounded-full animate-pulse delay-500" />

          <div className="relative px-12 py-10">
            <div className="flex items-center justify-center mb-6">
              <svg
                className="w-8 h-8 text-pink-400 animate-pulse"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="text-white text-2xl md:text-3xl text-center leading-relaxed font-serif">
              {displayedText}
              <span className="inline-block w-0.5 h-7 ml-1 bg-pink-400 animate-pulse" />
            </p>

            <div className="mt-8 flex items-center justify-center gap-1">
              <div className="w-2 h-2 rounded-full bg-pink-400/50 animate-bounce" />
              <div
                className="w-2 h-2 rounded-full bg-purple-400/50 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 rounded-full bg-rose-400/50 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/60 rounded-full animate-twinkle" />
          <div
            className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/60 rounded-full animate-twinkle"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white/60 rounded-full animate-twinkle"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
      </div>
    </div>
  );
};
