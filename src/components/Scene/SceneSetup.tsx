// src/components/Scene/SceneSetup.tsx
// Main scene orchestrator with conditional camera animation control

import { useCameraAnimation } from "@/hooks/useCameraAnimation";
import { usePlanetClick } from "@/hooks/usePlanetClick";
import { usePlanetTracking } from "@/hooks/usePlanetTracking";
import { useCameraStore } from "@/store/cameraStore";
import type { SceneConfig } from "@/types/scene.types";
import { useFrame } from "@react-three/fiber";
import { useCallback, useRef, useState } from "react";
import type { Mesh } from "three";
import type { OrbitControls } from "three-stdlib";
import { RomanticOpeningSequence } from "../Romantic/RomanticOpeningSequence";
import { CameraController } from "./CameraController";
import { DevelopmentHelpers } from "./DevelopmentHelpers";
import { Effects } from "./Effects";
import { Lighting } from "./Lighting";
import { PlanetarySystem } from "./PlanetarySystem";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";

interface SceneSetupProps {
  config: SceneConfig;
  showHelpers?: boolean;
  enableOpeningSequence?: boolean;
}

export const SceneSetup: React.FC<SceneSetupProps> = ({
  config,
  showHelpers = false,
  enableOpeningSequence = false,
}) => {
  const [planetMeshRefs, setPlanetMeshRefs] = useState<Map<string, Mesh>>(
    new Map()
  );
  const controlsRef = useRef<OrbitControls | null>(null);
  const { selectedPlanet } = useCameraStore();
  const { getPlanetPosition } = usePlanetTracking(
    config.planetarySystem.planets
  );
  const { updateAnimation, currentTarget } = useCameraAnimation({
    getPlanetPosition,
    controlsRef,
  });

  usePlanetClick({ planetMeshRefs });

  const handlePlanetMeshesReady = useCallback((meshes: Map<string, Mesh>) => {
    setPlanetMeshRefs(meshes);
  }, []);

  useFrame(() => {
    if (!enableOpeningSequence) {
      updateAnimation();
    }
  });

  const planetData = selectedPlanet
    ? getPlanetPosition(selectedPlanet)
    : undefined;

  return (
    <>
      {enableOpeningSequence && (
        <RomanticOpeningSequence controlsRef={controlsRef} />
      )}
      <Starfield config={config.starfield} />
      <Lighting config={config.lighting} />
      <Sun config={config.sun} />
      <PlanetarySystem
        config={config.planetarySystem}
        onPlanetMeshesReady={handlePlanetMeshesReady}
      />
      <CameraController
        ref={controlsRef}
        config={config.controls}
        dynamicTarget={currentTarget}
        planetRadius={planetData?.radius}
      />
      {showHelpers && (
        <DevelopmentHelpers config={config.helpers} showHelpers={showHelpers} />
      )}
      <Effects sunConfig={config.sun} />
    </>
  );
};
