import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  return (
    <>
      <points>
        <sphereGeometry args={[1, 32, 32]} />
        <pointsMaterial color={"red"} size={0.05} />
      </points>
      <OrbitControls />
    </>
  );
}
