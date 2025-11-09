// src/hooks/useCameraAnimation.ts
// Camera animation system for smooth transitions between overview and planet focus modes

import { useCameraStore } from "@/store/cameraStore";
import type { PlanetPosition } from "@/types/scene.types";
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import type { OrbitControls } from "three-stdlib";

interface UseCameraAnimationProps {
  getPlanetPosition: (name: string) => PlanetPosition | undefined;
  controlsRef: React.RefObject<OrbitControls | null>;
}

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const useCameraAnimation = ({
  getPlanetPosition,
  controlsRef,
}: UseCameraAnimationProps) => {
  const { camera } = useThree();
  const {
    selectedPlanet,
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

  const previousPlanetRef = useRef<string | null>(null);

  useEffect(() => {
    if (selectedPlanet && selectedPlanet !== previousPlanetRef.current) {
      const planetData = getPlanetPosition(selectedPlanet);
      if (!planetData) return;

      const viewDistance = planetData.radius * 4;
      const angle = Math.PI / 4;
      const targetPosition = new THREE.Vector3(
        planetData.position.x + viewDistance * Math.cos(angle),
        viewDistance * 0.5,
        planetData.position.z + viewDistance * Math.sin(angle)
      );

      const startTarget =
        controlsRef.current?.target.clone() ?? new THREE.Vector3(0, 0, 0);

      animationRef.current = {
        startPosition: camera.position.clone(),
        endPosition: targetPosition,
        startTarget: startTarget,
        endTarget: planetData.position.clone(),
        startTime: Date.now(),
        duration: 1500,
      };

      setAnimating(true);
      previousPlanetRef.current = selectedPlanet;
    } else if (!selectedPlanet && previousPlanetRef.current !== null) {
      const startTarget =
        controlsRef.current?.target.clone() ?? new THREE.Vector3(0, 0, 0);

      animationRef.current = {
        startPosition: camera.position.clone(),
        endPosition: defaultCameraPosition.clone(),
        startTarget: startTarget,
        endTarget: defaultCameraTarget.clone(),
        startTime: Date.now(),
        duration: 1500,
      };

      setAnimating(true);
      previousPlanetRef.current = null;
    }
  }, [
    selectedPlanet,
    getPlanetPosition,
    controlsRef,
    camera,
    defaultCameraPosition,
    defaultCameraTarget,
    setAnimating,
  ]);

  const updateAnimation = () => {
    if (animationRef.current && controlsRef.current) {
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

      controlsRef.current.target.copy(currentTarget);
      controlsRef.current.update();

      if (progress >= 1) {
        animationRef.current = null;
        setAnimating(false);
      }
    } else if (selectedPlanet && controlsRef.current) {
      const planetData = getPlanetPosition(selectedPlanet);
      if (planetData) {
        controlsRef.current.target.copy(planetData.position);
        controlsRef.current.update();
      }
    }
  };

  return { updateAnimation, currentTarget: animationRef.current?.endTarget };
};
