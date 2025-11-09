// src/components/Scene/SceneSetup.tsx
import type { HelperConfig, SceneConfig } from "@/types/scene.types";
import { memo } from "react";
import { CameraController } from "./CameraController";
import { DevelopmentHelpers } from "./DevelopmentHelpers";
import { Lighting } from "./Lighting";
import { Starfield } from "./Starfield";

interface SceneSetupProps {
  showHelpers?: boolean;
}

const SCENE_CONFIG: SceneConfig = {
  camera: {
    position: [0, 50, 100],
    fov: 75,
    near: 0.1,
    far: 2000,
  },
  controls: {
    enableDamping: true,
    dampingFactor: 0.05,
    minDistance: 10,
    maxDistance: 200,
    minPolarAngle: 0.1,
    maxPolarAngle: Math.PI - 0.1,
    enablePan: true,
    panSpeed: 0.5,
    rotateSpeed: 0.5,
    zoomSpeed: 0.8,
    autoRotate: false,
    autoRotateSpeed: 0.5,
  },
  lighting: {
    ambient: {
      intensity: 0.3,
      color: "#ffffff",
    },
    directional: {
      intensity: 1.5,
      position: [50, 50, 50],
      color: "#ffffff",
    },
  },
  starfield: {
    count: 8000,
    radius: 300,
    depth: 200,
    size: 1.0,
    color: "#ffffff",
  },
  showHelpers: false,
};

const HELPER_CONFIG: HelperConfig = {
  grid: {
    size: 100,
    divisions: 20,
    colorCenterLine: "#1a1a1a",
    colorGrid: "#333333",
  },
  axes: {
    size: 50,
  },
};

export const SceneSetup = memo<SceneSetupProps>(
  ({ showHelpers = SCENE_CONFIG.showHelpers }) => {
    return (
      <>
        <Starfield config={SCENE_CONFIG.starfield} />
        <Lighting config={SCENE_CONFIG.lighting} />
        <CameraController config={SCENE_CONFIG.controls} />
        <DevelopmentHelpers config={HELPER_CONFIG} showHelpers={showHelpers} />
      </>
    );
  }
);
