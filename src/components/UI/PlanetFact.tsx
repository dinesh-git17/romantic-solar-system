// src/components/UI/PlanetFact.tsx
// Individual fact item component with icon and staggered animation

import type { PlanetFact as PlanetFactType } from "@/types/planet-info.types";
import { memo } from "react";

interface PlanetFactProps {
  fact: PlanetFactType;
  index: number;
  colorClass: string;
}

const PlanetFactComponent: React.FC<PlanetFactProps> = ({
  fact,
  index,
  colorClass,
}) => {
  return (
    <div
      className="flex items-start gap-3 opacity-0 animate-fade-in"
      style={{
        animationDelay: `${String(index * 100)}ms`,
        animationFillMode: "forwards",
      }}
    >
      <div
        className={`flex-shrink-0 w-10 h-10 rounded-full ${colorClass} bg-white/5 flex items-center justify-center`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          {fact.icon === "ruler" && <path d="M4 6h16M4 12h16M4 18h16" />}
          {fact.icon === "clock" && (
            <>
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </>
          )}
          {fact.icon === "sun" && (
            <>
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </>
          )}
          {fact.icon === "moon" && (
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          )}
          {fact.icon === "thermometer" && (
            <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
          )}
          {fact.icon === "droplets" && (
            <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
          )}
          {fact.icon === "sparkles" && (
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.7-.7M6.34 6.34l-.7-.7m12.72 0l-.7.7M6.34 17.66l-.7.7M16 8l-1.5 1.5M12 12l-1.5 1.5M8 16l-1.5 1.5" />
          )}
          {fact.icon === "wind" && (
            <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
          )}
          {fact.icon === "circle" && <circle cx="12" cy="12" r="10" />}
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-400 mb-1">{fact.label}</div>
        <div className="text-lg font-medium text-white">{fact.value}</div>
      </div>
    </div>
  );
};

export const PlanetFact = memo(PlanetFactComponent);
