import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function Test() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
    >
      <Experience />
    </Canvas>
  );
}
