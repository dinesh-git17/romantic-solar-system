// src/components/Scene/SceneSetup.tsx

import type { SceneConfig } from "@/types/scene.types";
import { CameraController } from "./CameraController";
import { DevelopmentHelpers } from "./DevelopmentHelpers";
import { Effects } from "./Effects";
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
    <Effects sunConfig={config.sun}>
      <Starfield config={config.starfield} />
      <Lighting config={config.lighting} />
      <Sun config={config.sun} />
      <CameraController config={config.camera} />
      {showHelpers && (
        <DevelopmentHelpers config={config} showHelpers={showHelpers} />
      )}
    </Effects>
  );
};
