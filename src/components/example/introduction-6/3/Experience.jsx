import { OrbitControls } from "@react-three/drei";
import { useEffect } from "react";

export default function Experience() {
  const count = 500;
  const positions = new Float32Array(count * 3);

  useEffect(() => {
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 10;
    }
  });
  return (
    <>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach={"attributes-position"}
            array={positions}
            itemSize={3}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial color={"red"} size={0.05} />
      </points>
      <OrbitControls />
    </>
  );
}
