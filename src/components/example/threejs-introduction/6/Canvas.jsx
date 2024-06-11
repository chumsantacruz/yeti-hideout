import { Canvas } from "@react-three/fiber";
import Example from "./Example";

export default function ExampleCanvas({ example }) {
  console.log(example);
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
      <Example example={example} />
    </Canvas>
  );
}
