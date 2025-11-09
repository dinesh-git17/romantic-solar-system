// src/components/UI/BackToHomeButton.tsx

import { useAppStore } from "@/store/appStore";
import { useCameraStore } from "@/store/cameraStore";

export const BackToHomeButton: React.FC = () => {
  const { showLanding } = useAppStore();
  const { selectedPlanet } = useCameraStore();

  if (showLanding || selectedPlanet) return null;

  const handleBackToHome = () => {
    window.location.reload();
  };

  return (
    <button
      onClick={handleBackToHome}
      className="fixed top-6 left-6 z-50 px-6 py-3 bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl text-white font-medium hover:bg-black/60 hover:border-white/30 transition-all duration-300 flex items-center gap-3 shadow-2xl animate-fade-in group"
      aria-label="Return to home screen"
    >
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span>Home</span>
    </button>
  );
};
