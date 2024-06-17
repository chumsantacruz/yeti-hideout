import React from 'react'
import { useHelper, useTexture } from "@react-three/drei";
import { DirectionalLightHelper, CameraHelper } from "three";
import { Lensflare, LensflareElement } from 'three/examples/jsm/Addons.js';
import { useControls } from "leva";
import { useRef } from "react";

export default function Light() {
  const directionalLight = useRef();
  const directionalLightCamera = useRef()
  // useHelper(directionalLight, DirectionalLightHelper, 1, "red");
  // useHelper(directionalLightCamera, CameraHelper);

  const texture0 = useTexture("/textures/lensflare/lensflare0.png");
  const texture3 = useTexture("/textures/lensflare/lensflare3.png");

  const lensflare = new Lensflare();
  lensflare.addElement(new LensflareElement(texture0, 512, 0));
  lensflare.addElement(new LensflareElement(texture3, 60, 0.6));
  lensflare.addElement(new LensflareElement(texture3, 70, 0.7));
  lensflare.addElement(new LensflareElement(texture3, 120, 0.9));
  lensflare.addElement(new LensflareElement(texture3, 70, 1));


  const { position, bias, normalBias } = useControls("light", {
    position: {
      value: { x: 5, y: 6, z: 0 },
      step: 1,
    },
    bias: {
      value:- 0.004,
      step: 0.001,
      min: -0.01,
      max: 0
    },
    normalBias: {
      value: 0.027,
      step: 0.001,
      min: -1,
      max: 1
    },
  });
  return (
    <>
      <ambientLight />
      <directionalLight
        ref={directionalLight}
        intensity={5}
        position={[position.x, position.y, position.z]}
        castShadow
        shadow-bias={bias}
        shadow-normalBias={normalBias}
        shadow-mapSize={[1024, 1024]}
      >
        <orthographicCamera ref={directionalLightCamera} attach="shadow-camera" args={[-2, 2, 2, -2, 6, 10]} />
        <primitive object={lensflare} />
      </directionalLight>
    </>
  )
}
