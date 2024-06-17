import { Canvas } from "@react-three/fiber";
import Scene from "./Scene";
import { useControls, Leva } from "leva";
import { Fog } from "three";

function App() {
  const { cameraPosition } = useControls("cameraPosition", {
    cameraPosition: {
      value: {
        x: 5,
        y: -2,
        z: 1,
      },
      step: 1,
    },
  });

  return (
    <>
      <Canvas
        shadows={true}
        camera={{
          position: [cameraPosition.x, cameraPosition.y, cameraPosition.z],
        }}
        gl={{ alpha: true }}
        scene={{ fog: new Fog(0x000000, 0, 20) }}
      >
        <Scene />
      </Canvas>
      <Leva collapsed hidden />
    </>
  );
}

export default App;
