import { OrbitControls } from "@react-three/drei";
import Light from "./Light";
import Planet from "./Planet";
import Particles from "./Particles";
import { Suspense } from "react";

const Placeholder = () => {
  return (
    <mesh>
      <sphereBufferGeometry args={[2, 32, 32]} />
      <meshBasicMaterial color={"#fff"} />
    </mesh>
  );
};

export default function Scene() {
  return (
    <>
      <color args={["#000000"]} attach={"background"} />
      <Light />
      <Suspense fallback={<Placeholder />}>
        <Planet />
      </Suspense>
      <Particles />
      <OrbitControls
        maxDistance={6}
        minDistance={3}
        autoRotate
        autoRotateSpeed={1}
      />
    </>
  );
}
