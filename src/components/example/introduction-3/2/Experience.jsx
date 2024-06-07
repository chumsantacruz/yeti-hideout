import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useState } from "react";

export default function Experience() {
  const { camera, gl } = useThree();
  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("mousemove", (e) => {
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
}
