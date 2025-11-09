// src/components/UI/ModeToggle.tsx
// Modern toggle switch for Educational vs Romantic viewing modes

import { useCameraStore } from "@/store/cameraStore";
import { memo } from "react";

const ModeToggleComponent: React.FC = () => {
  const { viewMode, setViewMode, selectedPlanet } = useCameraStore();

  if (selectedPlanet) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-fade-in">
      <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl p-2 shadow-2xl">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setViewMode("educational");
            }}
            className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 min-w-[140px]
              ${
                viewMode === "educational"
                  ? "text-white bg-gradient-to-r from-blue-500/30 to-cyan-500/30 shadow-lg shadow-blue-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c3 3 9 3 12 0v-5" />
              </svg>
              <span>Educational</span>
            </div>
            {viewMode === "educational" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => {
              setViewMode("romantic");
            }}
            className={`relative px-6 py-3 rounded-xl font-medium transition-all duration-300 min-w-[140px]
              ${
                viewMode === "romantic"
                  ? "text-white bg-gradient-to-r from-pink-500/30 to-rose-500/30 shadow-lg shadow-pink-500/20"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Romantic</span>
            </div>
            {viewMode === "romantic" && (
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-pink-500/10 to-rose-500/10 animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModeToggle = memo(ModeToggleComponent);
