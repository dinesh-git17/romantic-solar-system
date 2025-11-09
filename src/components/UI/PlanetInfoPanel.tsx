// src/components/UI/PlanetInfoPanel.tsx
// Main information panel displaying content based on global view mode

import { planetFacts } from "@/data/planetFacts";
import { useCameraStore } from "@/store/cameraStore";
import type { PlanetName } from "@/types/planet-info.types";
import { memo, useEffect, useState } from "react";
import { PlanetFact } from "./PlanetFact";

const PlanetInfoPanelComponent: React.FC = () => {
  const { selectedPlanet, isAnimating, viewMode } = useCameraStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState<PlanetName | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (selectedPlanet && !isAnimating) {
      setCurrentPlanet(selectedPlanet as PlanetName);
      setIsVisible(true);
    } else if (!selectedPlanet) {
      setIsVisible(false);
      timer = setTimeout(() => {
        setCurrentPlanet(null);
      }, 500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [selectedPlanet, isAnimating]);

  if (!currentPlanet) return null;

  const planetInfo = planetFacts[currentPlanet];

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-40 w-[420px] max-h-[85vh] overflow-hidden
        bg-black/40 backdrop-blur-xl border ${planetInfo.colorTheme.border} rounded-3xl
        shadow-2xl ${planetInfo.colorTheme.glow}
        transition-all duration-500 ease-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
        max-md:right-auto max-md:left-1/2 max-md:-translate-x-1/2 max-md:top-auto max-md:bottom-6 max-md:translate-y-0
        max-md:w-[90vw] max-md:max-h-[65vh]
        ${isVisible ? "max-md:translate-y-0" : "max-md:translate-y-full"}`}
    >
      <div className="p-8 pb-6">
        <div className="mb-6">
          <h2
            className={`text-4xl font-bold ${planetInfo.colorTheme.text} mb-2`}
          >
            {planetInfo.name}
          </h2>
          <p className="text-lg text-gray-400 uppercase tracking-wide">
            {planetInfo.type}
          </p>
        </div>
      </div>

      <div className="px-8 pb-8 overflow-y-auto max-h-[calc(85vh-180px)] max-md:max-h-[calc(65vh-160px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {viewMode === "educational" && (
          <div className="space-y-5">
            {planetInfo.facts.map((fact, index) => (
              <PlanetFact
                key={`${currentPlanet}-${fact.label}`}
                fact={fact}
                index={index}
                colorClass={planetInfo.colorTheme.text}
              />
            ))}
          </div>
        )}

        {viewMode === "romantic" && planetInfo.romanticMessage && (
          <div
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
          >
            <div
              className={`relative pl-6 border-l-2 ${planetInfo.colorTheme.border}`}
            >
              <div
                className={`absolute -left-2 top-0 w-3 h-3 rounded-full ${planetInfo.colorTheme.text} bg-current`}
              />
              <p className="text-base leading-relaxed text-gray-200 font-light">
                {planetInfo.romanticMessage}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const PlanetInfoPanel = memo(PlanetInfoPanelComponent);
