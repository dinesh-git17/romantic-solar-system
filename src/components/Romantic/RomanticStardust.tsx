// src/components/Romantic/RomanticStardust.tsx
// GPU-optimized particle system for romantic mode ambient effects

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface RomanticStardustProps {
  count?: number;
}

interface Particle {
  position: THREE.Vector3;
  velocity: number;
  phase: number;
  frequency: number;
  amplitude: number;
  size: number;
  color: THREE.Color;
}

const vertexShader = `
  varying vec2 vUv;
  varying float vDistance;
  
  void main() {
    vUv = uv;
    vec4 mvPosition = modelViewMatrix * instanceMatrix * vec4(position, 1.0);
    vDistance = -mvPosition.z;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float opacity;
  varying vec2 vUv;
  varying float vDistance;
  
  void main() {
    vec2 center = vUv - 0.5;
    float dist = length(center);
    float alpha = smoothstep(0.5, 0.0, dist) * opacity;
    float glow = exp(-dist * 4.0) * 0.6;
    
    vec3 finalColor = color + vec3(glow);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

const getRandomColor = (): THREE.Color => {
  const colors = [
    new THREE.Color("#FFB6D9"),
    new THREE.Color("#FFFFFF"),
    new THREE.Color("#E6D5FF"),
    new THREE.Color("#FFC0E0"),
  ];
  const index = Math.floor(Math.random() * colors.length);
  return colors[index] ?? colors[0] ?? new THREE.Color("#FFB6D9");
};

export const RomanticStardust: React.FC<RomanticStardustProps> = ({
  count = 800,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from(
      { length: count },
      (): Particle => ({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 200,
          Math.random() * 100 - 20,
          (Math.random() - 0.5) * 200
        ),
        velocity: Math.random() * 0.02 + 0.01,
        phase: Math.random() * Math.PI * 2,
        frequency: Math.random() * 0.5 + 0.3,
        amplitude: Math.random() * 2 + 1,
        size: Math.random() * 0.15 + 0.15,
        color: getRandomColor(),
      })
    );
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          color: { value: new THREE.Color("#FFB6D9") },
          opacity: { value: 0.5 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const mesh = meshRef.current;

    particles.forEach((particle, i) => {
      particle.position.y += particle.velocity;

      if (particle.position.y > 100) {
        particle.position.y = -20;
      }

      const horizontalOffset =
        Math.sin(time * particle.frequency + particle.phase) *
        particle.amplitude;

      dummy.position.set(
        particle.position.x + horizontalOffset,
        particle.position.y,
        particle.position.z
      );

      dummy.scale.setScalar(particle.size);
      dummy.updateMatrix();

      mesh.setMatrixAt(i, dummy.matrix);
      if (mesh.instanceColor) {
        mesh.setColorAt(i, particle.color);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;

    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      material={material}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 1]} />
    </instancedMesh>
  );
};
