// src/components/UI/PlanetInfoPanel.tsx
// Main information panel with tabbed interface for facts and romantic messages

import { planetFacts } from "@/data/planetFacts";
import { useCameraStore } from "@/store/cameraStore";
import type { PlanetName } from "@/types/planet-info.types";
import { memo, useEffect, useState } from "react";
import { PlanetFact } from "./PlanetFact";

type TabType = "facts" | "message";

const PlanetInfoPanelComponent: React.FC = () => {
  const { selectedPlanet, isAnimating } = useCameraStore();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPlanet, setCurrentPlanet] = useState<PlanetName | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("facts");

  useEffect(() => {
    if (selectedPlanet && !isAnimating) {
      setCurrentPlanet(selectedPlanet as PlanetName);
      setIsVisible(true);
      setActiveTab("facts");
    } else if (!selectedPlanet) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setCurrentPlanet(null);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
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

        <div className="flex gap-2 mb-6 border-b border-white/10 pb-4">
          <button
            onClick={() => {
              setActiveTab("facts");
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300
              ${
                activeTab === "facts"
                  ? `${planetInfo.colorTheme.text} bg-white/10`
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            Facts
          </button>
          <button
            onClick={() => {
              setActiveTab("message");
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2
              ${
                activeTab === "message"
                  ? `${planetInfo.colorTheme.text} bg-white/10`
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            Message
          </button>
        </div>
      </div>

      <div className="px-8 pb-8 overflow-y-auto max-h-[calc(85vh-240px)] max-md:max-h-[calc(65vh-220px)] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        {activeTab === "facts" && (
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

        {activeTab === "message" && planetInfo.romanticMessage && (
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
