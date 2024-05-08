import { OrbitControls, Environment, useGLTF } from "@react-three/drei";

export default function Experience() {
  /**
   * Model
   */
  const room = useGLTF("/model/jeep.glb");
  return (
    <>
      <OrbitControls />
      <Environment preset="city" />
      <primitive
        object={room.scene}
        rotation-y={Math.PI * -0.5}
        position-y={0.5}
      />
    </>
  );
}
