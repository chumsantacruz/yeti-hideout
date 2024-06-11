import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { AdditiveBlending } from "three";
import { useFrame } from "@react-three/fiber";

export default function Experience() {
  const texture = useTexture("/textures/particles/4.png");

  const count = 5000;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  const particlesRef = useRef();

  useFrame((state, delta) => {
    const elapsedTime = state.clock.getElapsedTime();
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const x = particlesRef.current.geometry.attributes.position.array[i3];
      particlesRef.current.geometry.attributes.position.array[i3 + 1] =
        Math.sin(elapsedTime + x);
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
      colors[i] = Math.random();
    }
  });
  return (
    <>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={"limegreen"} />
      </mesh>
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={positions}
            itemSize={3}
            count={count}
          />
          <bufferAttribute
            attach={"attributes-color"}
            array={colors}
            itemSize={3}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.2}
          alphaMap={texture}
          depthWrite={false}
          transparent={true}
          blending={AdditiveBlending}
          vertexColors={true}
        />
      </points>
      <OrbitControls />
    </>
  );
}
