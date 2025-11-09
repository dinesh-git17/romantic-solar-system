// src/shaders/starfield.frag.ts
export const starfieldFragmentShader = `
varying vec3 vColor;

void main() {
  float distanceToCenter = length(gl_PointCoord - vec2(0.5));
  
  if (distanceToCenter > 0.5) {
    discard;
  }
  
  float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
  
  gl_FragColor = vec4(vColor, alpha);
}
`;
