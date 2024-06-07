import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { OrbitControls } from "@react-three/drei";

export default function Fireworks() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 0, 3],
      }}
    >
      <Experience />
      <OrbitControls />
    </Canvas>
  );
}
