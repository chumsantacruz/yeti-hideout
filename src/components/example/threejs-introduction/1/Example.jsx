import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function ExampleContainer({ example }) {
  const Example01 = () => {
    const cube = useRef();
    useFrame(() => {
      cube.current.rotation.x += 0.01;
      cube.current.rotation.y += 0.01;
    });
    return (
      <>
        <mesh ref={cube}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"limegreen"} />
        </mesh>
      </>
    );
  };

  if (example === 1) {
    return <Example01 />;
  }
}
