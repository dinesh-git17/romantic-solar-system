// src/components/Romantic/RomanticOpeningSequence.tsx
// Orchestrates romantic mode opening sequence with camera animation and narration

import { useCameraStore } from "@/store/cameraStore";
import { useRomanticStore } from "@/store/romanticStore";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";
import { NarrationOverlay } from "./NarrationOverlay";

interface RomanticOpeningSequenceProps {
  controlsRef: React.RefObject<OrbitControls | null>;
}

const easeInOutQuad = (t: number): number => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

export const RomanticOpeningSequence: React.FC<
  RomanticOpeningSequenceProps
> = ({ controlsRef }) => {
  const { camera } = useThree();
  const { setRomanticOpeningSeen } = useRomanticStore();
  const { setAnimating } = useCameraStore();
  const [isSequenceActive, setIsSequenceActive] = useState(true);
  const [showNarration, setShowNarration] = useState(true);

  const startTime = useRef<number | null>(null);
  const startPosition = useRef(new THREE.Vector3(100, 40, 100));
  const startTarget = useRef(new THREE.Vector3(30, 0, 30));
  const endPosition = useRef(new THREE.Vector3(0, 50, 100));
  const endTarget = useRef(new THREE.Vector3(0, 0, 0));

  const animationDuration = 8000;

  useEffect(() => {
    setAnimating(true);

    camera.position.copy(startPosition.current);

    if (controlsRef.current) {
      controlsRef.current.target.copy(startTarget.current);
      controlsRef.current.update();
    }

    return () => {
      setAnimating(false);
    };
  }, [camera, controlsRef, setAnimating]);

  useFrame(() => {
    if (!isSequenceActive) return;

    const currentTime = performance.now();
    startTime.current ??= currentTime;

    const elapsed = currentTime - startTime.current;
    const progress = Math.min(elapsed / animationDuration, 1);
    const easedProgress = easeInOutQuad(progress);

    camera.position.lerpVectors(
      startPosition.current,
      endPosition.current,
      easedProgress
    );

    if (controlsRef.current) {
      controlsRef.current.target.lerpVectors(
        startTarget.current,
        endTarget.current,
        easedProgress
      );
      controlsRef.current.update();
    }

    if (progress >= 1) {
      setIsSequenceActive(false);
      setAnimating(false);
      setRomanticOpeningSeen();
    }
  });

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
