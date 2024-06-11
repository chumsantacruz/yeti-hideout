import { Canvas } from "@react-three/fiber";
import Example from "./Example";

export default function ExampleCanvas({ example }) {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 1000,
      }}
    >
      <Example example={example} />
    </Canvas>
  );
}
