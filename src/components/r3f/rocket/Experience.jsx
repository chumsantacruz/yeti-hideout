import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Experience() {
  /**
   * Model
   */
  const room = useGLTF("/model/rocket.glb");

  const rocket = useRef();

  useFrame((state, delta) => {
    rocket.current.rotation.y += delta;
  });

  const { scale, positionY, rotationY } = useControls({
    scale: { value: 0.15, step: 0.1 },
    positionY: { value: 0.5, step: 0.1 },
    rotationY: { value: -0.3, step: 0.1 },
  });

  return (
    <>
      <OrbitControls />
      <Environment preset="city" />
      <primitive
        ref={rocket}
        object={room.scene}
        rotation-y={Math.PI * rotationY}
        position-y={positionY}
        scale={scale}
      />
      <Leva hidden />
    </>
  );
}
