import { OrbitControls } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import { SRGBColorSpace } from "three";

export default function Experience() {
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
}
