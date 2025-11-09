// src/components/Scene/DevelopmentHelpers.tsx
import type { HelperConfig } from "@/types/scene.types";
import { memo } from "react";

interface DevelopmentHelpersProps {
  config: HelperConfig;
  showHelpers: boolean;
}

export const DevelopmentHelpers = memo<DevelopmentHelpersProps>(
  ({ config, showHelpers }) => {
    if (!showHelpers) {
      return null;
    }

    return (
      <>
        <gridHelper
          args={[
            config.grid.size,
            config.grid.divisions,
            config.grid.colorCenterLine,
            config.grid.colorGrid,
          ]}
        />
        <axesHelper args={[config.axes.size]} />
      </>
    );
  }
);
