/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

export default function Planet(props) {
  const { nodes, materials } = useGLTF("/model/planet.glb");
  const planetRef = useRef();
  const cloudsRef = useRef();
  const rocketRef = useRef();

  const { planetSpeed } = useControls("rotationSpeed", {
    planetSpeed: {
      value: 0.1,
      step: 0.1,
    },
  });

  useFrame((_, delta) => {
    planetRef.current.rotation.y += delta * planetSpeed;
    planetRef.current.rotation.z += delta * planetSpeed;

    cloudsRef.current.rotation.y -= delta * 0.05;
    cloudsRef.current.rotation.x -= delta * 0.05;

    rocketRef.current.rotation.z += delta * 0.5;
  });
  return (
    <group {...props} dispose={null}>
      <group ref={rocketRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rocket_1.geometry}
          material={materials.rocket}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.rocket_2.geometry}
          material={materials.rocketWing}
        />
      </group>
      <mesh
        ref={cloudsRef}
        castShadow
        receiveShadow
        geometry={nodes.clouds.geometry}
        material={materials.cloud}
      />
      <group ref={planetRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_1.geometry}
          material={materials.tree}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_2.geometry}
          material={materials.wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_3.geometry}
          material={materials.house}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_4.geometry}
          material={materials.houseRoof}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_5.geometry}
          material={materials.sea}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_6.geometry}
          material={materials.boat}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_7.geometry}
          material={materials.boatFrag}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.planet_8.geometry}
          material={materials.planet}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/model/planet.glb");
