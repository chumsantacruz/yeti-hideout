import { useFrame, useThree } from "@react-three/fiber";

export default function Experience() {
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
}
