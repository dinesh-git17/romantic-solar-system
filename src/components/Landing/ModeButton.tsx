// src/components/Landing/ModeButton.tsx

import type { AppMode } from "@/types/app.types";

interface ModeButtonProps {
  mode: AppMode;
  label: string;
  onClick: () => void;
}

export const ModeButton: React.FC<ModeButtonProps> = ({
  mode,
  label,
  onClick,
}) => {
  const isEducational = mode === "educational";

  const baseClasses =
    "w-full sm:w-72 h-16 rounded-xl font-semibold text-lg backdrop-blur-xl border transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl";

  const modeClasses = isEducational
    ? "bg-blue-500/10 border-blue-400/30 text-white hover:bg-blue-500/20 hover:border-blue-400/50 hover:shadow-blue-500/40 hover:-translate-y-1"
    : "bg-pink-500/10 border-pink-400/30 text-white hover:bg-pink-500/20 hover:border-pink-400/50 hover:shadow-pink-500/40 hover:-translate-y-1";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${modeClasses}`}
      aria-label={`Select ${label} mode`}
    >
      {isEducational ? (
        <svg
          className="w-6 h-6"
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
      ) : (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clipRule="evenodd"
          />
        </svg>
      )}
      <span>{label}</span>
    </button>
  );
};
