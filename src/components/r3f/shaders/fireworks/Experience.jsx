import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "../../../../shader/fireworks/vertex.glsl";
import fragmentShader from "../../../../shader/fireworks/fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Experience() {
  const textures = [
    useTexture("/textures/particles/1.png"),
    useTexture("/textures/particles/2.png"),
    useTexture("/textures/particles/3.png"),
    useTexture("/textures/particles/4.png"),
    useTexture("/textures/particles/5.png"),
    useTexture("/textures/particles/6.png"),
    useTexture("/textures/particles/7.png"),
    useTexture("/textures/particles/8.png"),
  ];
  return (
    <>
      <Firework
        count={100}
        position={new THREE.Vector3()}
        size={100}
        texture={textures[7]}
        radius={0.7}
        color={new THREE.Color("#8affff")}
      />
    </>
  );
}

const Firework = ({ count, position, size, texture, radius, color }) => {
  // Geometry
  const positionsArray = new Float32Array(count * 3);
  const sizesArray = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    const spherical = new THREE.Spherical(
      radius * (0.75 + Math.random() * 0.25),
      Math.random() * Math.PI,
      Math.random() * Math.PI * 2,
    );
    const position = new THREE.Vector3();
    position.setFromSpherical(spherical);

    positionsArray[i3] = position.x;
    positionsArray[i3 + 1] = position.y;
    positionsArray[i3 + 2] = position.z;

    sizesArray[i] = Math.random();
  }

  // Material
  texture.flipY = false;

  // Ref
  const points = useRef();
  const geometry = useRef();
  const material = useRef();

  // Destroy
  const destroy = () => {
    const scene = points.current.parent;
    scene.remove(points.current);
    geometry.current.dispose();
    material.current.dispose();
  };

  // Animate
  useEffect(() => {
    gsap.to(material.current.uniforms.uProgress, {
      value: 1,
      duration: 3,
      ease: "linear",
      onComplete: destroy,
    });
  }, []);

  return (
    <points ref={points} position={position}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute
          attach={"attributes-position"}
          count={count}
          array={positionsArray}
          itemSize={3}
        />
        <bufferAttribute
          attach={"attributes-aSize"}
          count={count}
          array={sizesArray}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uSize: new THREE.Uniform(size),
          uTexture: new THREE.Uniform(texture),
          uColor: new THREE.Uniform(color),
          uProgress: new THREE.Uniform(0),
        }}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};
