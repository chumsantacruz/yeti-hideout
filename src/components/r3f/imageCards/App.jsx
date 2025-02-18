import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { Scene } from "./Scene";

export default function App() {
  return (
    <>
      <Canvas>
        <color attach={"background"} args={["white"]} />
        <ScrollControls pages={4} infinite>
          <Scene position={[0, 1.5, 0]} />
        </ScrollControls>
      </Canvas>
    </>
  );
}
