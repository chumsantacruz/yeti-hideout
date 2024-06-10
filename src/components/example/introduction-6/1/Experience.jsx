import { OrbitControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { CameraHelper } from "three";

export default function Experience() {
  const directionalLightRef = useRef();
  const spotLightRef = useRef();
  const boxRef = useRef();
  const three = useThree();

  useFrame((_, delta) => {
    boxRef.current.rotation.y += delta;
    boxRef.current.rotation.x += delta;
    boxRef.current.rotation.z += delta;
  });

  useEffect(() => {
    const directionalLightCameraHelper = new CameraHelper(
      directionalLightRef.current.shadow.camera,
    );
    const spotLightCameraHelper = new CameraHelper(
      spotLightRef.current.shadow.camera,
    );
    three.scene.add(directionalLightCameraHelper, spotLightCameraHelper);
  }, []);
  return (
    <>
      <mesh ref={boxRef} castShadow={true}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={"limegreen"} />
      </mesh>
      <mesh rotation-x={-Math.PI * 0.5} position-y={-1} receiveShadow={true}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={directionalLightRef}
        castShadow={true}
        position={[0, 2, -1]}
        intensity={0.5}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={4}
        shadow-camera-left={-2}
        shadow-camera-right={2}
        shadow-camera-top={2}
        shadow-camera-bottom={-2}
      />
      <spotLight
        ref={spotLightRef}
        position={[-3, 2, 0]}
        intensity={5}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={6}
        shadow-camera-near={2}
      />
      <OrbitControls />
    </>
  );
}
