// src/components/UI/DeveloperAttribution.tsx
// Subtle developer attribution displayed in 3D scene view

import { memo, useEffect, useState } from "react";

const DeveloperAttributionComponent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-10 
        px-4 py-2 
        bg-black/20 backdrop-blur-md 
        border border-white/10 rounded-lg
        transition-opacity duration-1000 ease-out
        ${isVisible ? "opacity-40" : "opacity-0"}
        hover:opacity-70 hover:border-white/20
        max-md:bottom-4 max-md:right-4 max-md:px-3 max-md:py-1.5`}
    >
      <p className="text-xs font-light text-white tracking-wide max-md:text-[0.7rem]">
        Developed by Dinesh D
      </p>
    </div>
  );
};

export const DeveloperAttribution = memo(DeveloperAttributionComponent);
