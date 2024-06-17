import React from "react";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending } from "three";

export default function Particles() {
  const count = 10000;
  const positions = new Float32Array(count * 3);
  const sphereRadius = 3;
  const particleTexture = useTexture("/textures/particles/particle.png");
  for (let i = 0; i < count; i++) {
    let x, y, z;
    do {
      x = (Math.random() - 0.5) * 15;
      y = (Math.random() - 0.5) * 15;
      z = (Math.random() - 0.5) * 15;
    } while (Math.sqrt(x * x + y * y + z * z) < sphereRadius + 4);
    const i3 = i * 3;
    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;
  }
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach={"attributes-position"}
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        transparent
        alphaMap={particleTexture}
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}
