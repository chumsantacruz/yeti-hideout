import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

export default function Test() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
        position: [0, 3, 5],
      }}
      shadows={true}
    >
      <Experience />
    </Canvas>
  );
}
