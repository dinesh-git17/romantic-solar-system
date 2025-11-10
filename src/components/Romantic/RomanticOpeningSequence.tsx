// src/components/Romantic/RomanticOpeningSequence.tsx
// MINIMAL TEST VERSION - just overlay, no camera animation

import { useState } from "react";
import { NarrationOverlay } from "./NarrationOverlay";

interface RomanticOpeningSequenceProps {
  controlsRef: React.RefObject<unknown>;
}

export const RomanticOpeningSequence: React.FC<
  RomanticOpeningSequenceProps
> = () => {
  const [showNarration, setShowNarration] = useState(true);

  const handleNarrationComplete = () => {
    setShowNarration(false);
  };

  return (
    <>
      {showNarration && (
        <NarrationOverlay onComplete={handleNarrationComplete} />
      )}
    </>
  );
};
