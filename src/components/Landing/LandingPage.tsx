// src/components/Landing/LandingPage.tsx

import type { AppMode } from "@/types/app.types";
import { ModeButton } from "./ModeButton";
import { VideoBackground } from "./VideoBackground";

interface LandingPageProps {
  onModeSelect: (mode: AppMode) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onModeSelect }) => {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden animate-fade-in">
      <VideoBackground videoUrl="/videos/space-background.mp4" />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-12 sm:space-y-16">
          <div className="space-y-4 sm:space-y-6">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-white leading-tight tracking-wide opacity-0 animate-fade-in"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              In the vast cosmos, every star tells a story.
            </h1>
            <p
              className="text-xl sm:text-2xl md:text-3xl font-serif text-gray-300 opacity-0 animate-fade-in"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              What will yours be?
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center opacity-0 animate-fade-in"
            style={{ animationDelay: "1000ms", animationFillMode: "forwards" }}
          >
            <ModeButton
              mode="educational"
              label="Educational Mode"
              onClick={() => {
                onModeSelect("educational");
              }}
            />
            <ModeButton
              mode="romantic"
              label="Romantic Mode"
              onClick={() => {
                onModeSelect("romantic");
              }}
            />
          </div>

          <p
            className="text-sm text-gray-400 opacity-0 animate-fade-in"
            style={{ animationDelay: "1400ms", animationFillMode: "forwards" }}
          >
            Choose your journey through the solar system
          </p>
        </div>
      </div>
    </div>
  );
};
