// src/shaders/starfield.vert.ts
export const starfieldVertexShader = `
varying vec3 vColor;

void main() {
  vColor = color;
  
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  
  gl_PointSize = 1.5;
  
  gl_Position = projectionMatrix * mvPosition;
}
`;
