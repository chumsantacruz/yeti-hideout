import { Canvas } from "@react-three/fiber";
import Experience from "./Example";

export default function ExampleCanvas({ number }) {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
    >
      <Experience number={number} />
    </Canvas>
  );
}
