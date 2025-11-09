// src/components/UI/BackToOverviewButton.tsx
// Button to return camera to sun-centered overview mode

import { useCameraStore } from "@/store/cameraStore";

export const BackToOverviewButton: React.FC = () => {
  const { selectedPlanet, isAnimating, deselectPlanet } = useCameraStore();

  if (!selectedPlanet || isAnimating) return null;

  return (
    <button
      onClick={deselectPlanet}
      className="fixed top-6 left-6 z-50 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 shadow-lg animate-fade-in"
      aria-label="Return to overview"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span>Back to Overview</span>
    </button>
  );
};
