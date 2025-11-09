// src/components/Scene/Starfield.tsx
import { starfieldFragmentShader } from "@/shaders/starfield.frag";
import { starfieldVertexShader } from "@/shaders/starfield.vert";
import type { StarfieldConfig } from "@/types/scene.types";
import { useMemo, useRef } from "react";
import type { BufferGeometry, Points, ShaderMaterial } from "three";
import { AdditiveBlending, BufferAttribute } from "three";

interface StarfieldProps {
  config: StarfieldConfig;
}

export const Starfield = ({ config }: StarfieldProps) => {
  const pointsRef = useRef<Points<BufferGeometry, ShaderMaterial>>(null);

  const [positions, colors] = useMemo(() => {
    const positionsArray = new Float32Array(config.count * 3);
    const colorsArray = new Float32Array(config.count * 3);

    for (let i = 0; i < config.count; i++) {
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = config.radius + Math.random() * config.depth;

      positionsArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positionsArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positionsArray[i3 + 2] = radius * Math.cos(phi);

      const brightness = 0.8 + Math.random() * 0.2;
      colorsArray[i3] = brightness;
      colorsArray[i3 + 1] = brightness;
      colorsArray[i3 + 2] = brightness;
    }

    return [positionsArray, colorsArray];
  }, [config.count, config.radius, config.depth]);

  const positionAttribute = useMemo(
    () => new BufferAttribute(positions, 3),
    [positions]
  );

  const colorAttribute = useMemo(
    () => new BufferAttribute(colors, 3),
    [colors]
  );

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positionAttribute.array, positionAttribute.itemSize]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colorAttribute.array, colorAttribute.itemSize]}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starfieldVertexShader}
        fragmentShader={starfieldFragmentShader}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        vertexColors
      />
    </points>
  );
};
