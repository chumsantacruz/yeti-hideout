import { OrbitControls, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { CameraHelper, AdditiveBlending } from "three";

export default function ExampleContainer({ example }) {
  const Example01 = () => {
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
  };

  const Example02 = () => {
    return (
      <>
        <points>
          <sphereGeometry args={[1, 32, 32]} />
          <pointsMaterial color={"red"} size={0.05} />
        </points>
        <OrbitControls />
      </>
    );
  };

  const Example03 = () => {
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
  };

  const Example04 = () => {
    const texture = useTexture("/textures/particles/4.png");

    const count = 5000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const particlesRef = useRef();

    useFrame((state, delta) => {
      const elapsedTime = state.clock.getElapsedTime();
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const x = particlesRef.current.geometry.attributes.position.array[i3];
        particlesRef.current.geometry.attributes.position.array[i3 + 1] =
          Math.sin(elapsedTime + x);
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    });

    useEffect(() => {
      for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random();
      }
    });
    return (
      <>
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={"limegreen"} />
        </mesh>
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach={"attributes-position"}
              array={positions}
              itemSize={3}
              count={count}
            />
            <bufferAttribute
              attach={"attributes-color"}
              array={colors}
              itemSize={3}
              count={count}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.2}
            alphaMap={texture}
            depthWrite={false}
            transparent={true}
            blending={AdditiveBlending}
            vertexColors={true}
          />
        </points>
        <OrbitControls />
      </>
    );
  };

  if (example === 1) {
    return <Example01 />;
  } else if (example === 2) {
    return <Example02 />;
  } else if (example === 3) {
    return <Example03 />;
  } else if (example === 4) {
    return <Example04 />;
  }
}
