import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function ExampleContainer({ number }) {
  const Example01 = () => {
    const { camera } = useThree();
    useFrame(({ clock }) => {
      const elapsedTime = clock.getElapsedTime();
      camera.position.x = Math.cos(elapsedTime);
      camera.position.y = Math.sin(elapsedTime);
      camera.lookAt(0, 0, 0);
    });
    return (
      <>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"limegreen"} />
        </mesh>
      </>
    );
  };

  const Example02 = () => {
    const { camera, gl } = useThree();
    const [cursorX, setCursorX] = useState(0);
    const [cursorY, setCursorY] = useState(0);

    useEffect(() => {
      const canvas = gl.domElement;
      canvas.addEventListener("pointermove", (e) => {
        setCursorX(e.offsetX / canvas.clientWidth - 0.5);
        setCursorY(-(e.offsetY / canvas.clientHeight - 0.5));
      });
    }, []);

    useFrame(() => {
      camera.position.x = Math.sin(cursorX * Math.PI * 2) * 2;
      camera.position.z = Math.cos(cursorX * Math.PI * 2) * 2;
      camera.position.y = cursorY * 3;
      camera.lookAt(0, 0, 0);
    });
    return (
      <>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"limegreen"} />
        </mesh>
      </>
    );
  };

  if (number === 1) {
    return <Example01 />;
  } else if (number === 2) {
    return <Example02 />;
  }
}
