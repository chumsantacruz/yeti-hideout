import { OrbitControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

export default function ExampleContainer({ example }) {
  const Example01 = () => {
    const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
    return (
      <>
        <mesh>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              array={positionsArray}
              count={3}
              itemSize={3}
            />
          </bufferGeometry>
          <meshBasicMaterial color={"limegreen"} wireframe={true} />
        </mesh>
        <OrbitControls />
      </>
    );
  };

  const Example02 = () => {
    const texture = useTexture("/textures/yeti.png");
    texture.colorSpace = SRGBColorSpace;
    return (
      <>
        <mesh>
          <boxGeometry />
          <meshBasicMaterial map={texture} />
        </mesh>
        <OrbitControls />
      </>
    );
  };

  if (example === 1) {
    return <Example01 />;
  } else if (example === 2) {
    return <Example02 />;
  }
}
