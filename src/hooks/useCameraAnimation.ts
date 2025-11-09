// src/hooks/useCameraAnimation.ts
// Hook for smooth camera animation transitions

import { useCameraStore } from "@/store/cameraStore";
import type { PlanetPosition } from "@/types/scene.types";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

interface UseCameraAnimationProps {
  getPlanetPosition: (name: string) => PlanetPosition | undefined;
}

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const useCameraAnimation = ({
  getPlanetPosition,
}: UseCameraAnimationProps) => {
  const { camera } = useThree();
  const {
    selectedPlanet,
    isAnimating,
    setAnimating,
    defaultCameraPosition,
    defaultCameraTarget,
  } = useCameraStore();

  const animationRef = useRef<{
    startPosition: THREE.Vector3;
    endPosition: THREE.Vector3;
    startTarget: THREE.Vector3;
    endTarget: THREE.Vector3;
    startTime: number;
    duration: number;
  } | null>(null);

  useEffect(() => {
    if (selectedPlanet) {
      const planetData = getPlanetPosition(selectedPlanet);
      if (!planetData) return;

      const viewDistance = planetData.radius * 4;
      const angle = Math.PI / 4;
      const targetPosition = new THREE.Vector3(
        planetData.position.x + viewDistance * Math.cos(angle),
        viewDistance * 0.5,
        planetData.position.z + viewDistance * Math.sin(angle)
      );

      animationRef.current = {
        startPosition: camera.position.clone(),
        endPosition: targetPosition,
        startTarget: new THREE.Vector3(0, 0, 0),
        endTarget: planetData.position.clone(),
        startTime: Date.now(),
        duration: 1500,
      };

      setAnimating(true);
    } else if (!selectedPlanet && isAnimating) {
      animationRef.current = {
        startPosition: camera.position.clone(),
        endPosition: defaultCameraPosition.clone(),
        startTarget: camera.position
          .clone()
          .add(new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)),
        endTarget: defaultCameraTarget.clone(),
        startTime: Date.now(),
        duration: 1500,
      };

      setAnimating(true);
    }
  }, [
    selectedPlanet,
    camera,
    getPlanetPosition,
    setAnimating,
    defaultCameraPosition,
    defaultCameraTarget,
    isAnimating,
  ]);

  const updateAnimation = () => {
    if (!animationRef.current) return;

    const elapsed = Date.now() - animationRef.current.startTime;
    const progress = Math.min(elapsed / animationRef.current.duration, 1);
    const easedProgress = easeInOutCubic(progress);

    camera.position.lerpVectors(
      animationRef.current.startPosition,
      animationRef.current.endPosition,
      easedProgress
    );

    const currentTarget = new THREE.Vector3().lerpVectors(
      animationRef.current.startTarget,
      animationRef.current.endTarget,
      easedProgress
    );

    camera.lookAt(currentTarget);

    if (progress >= 1) {
      animationRef.current = null;
      setAnimating(false);
    }
  };

  return { updateAnimation, currentTarget: animationRef.current?.endTarget };
};
