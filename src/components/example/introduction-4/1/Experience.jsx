import { OrbitControls } from "@react-three/drei";

export default function Experience() {
  const positionsArray = new Float32Array([0, 0, 0, 0, 1, 0, 1, 0, 0]);
  return (
    <>
      <mesh>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positionsArray}
            count={positionsArray / 3}
            itemSize={3}
          />
        </bufferGeometry>
        <meshBasicMaterial color={"limegreen"} wireframe={true} />
      </mesh>
      <OrbitControls />
    </>
  );
}
