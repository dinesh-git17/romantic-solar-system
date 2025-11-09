// src/components/Scene/SceneSetup.tsx

import type { SceneConfig } from "@/types/scene.types";
import { CameraController } from "./CameraController";
import { DevelopmentHelpers } from "./DevelopmentHelpers";
import { Lighting } from "./Lighting";
import { Starfield } from "./Starfield";
import { Sun } from "./Sun";

interface SceneSetupProps {
  config: SceneConfig;
  showHelpers?: boolean;
}

export const SceneSetup: React.FC<SceneSetupProps> = ({
  config,
  showHelpers = false,
}) => {
  return (
    <>
      <Starfield config={config.starfield} />
      <Lighting config={config.lighting} />
      <Sun config={config.sun} />
      <CameraController config={config.controls} />
      {showHelpers && (
        <DevelopmentHelpers config={config.helpers} showHelpers={showHelpers} />
      )}
    </>
  );
};
