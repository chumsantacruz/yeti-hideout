import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";
import { useEffect, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

export default function Test() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 0, 2],
      }}
      onClick={() => {
        console.log("click");
      }}
    >
      <Experience />
      <OrbitControls />
    </Canvas>
  );
}
