import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { DoubleSide } from "three";
import { extend, useFrame, Canvas } from "@react-three/fiber";
import { easing, geometry } from "maath";
import {
  ScrollControls,
  useScroll,
  Image,
  Text,
  Billboard,
} from "@react-three/drei";

export default function App() {
  return (
    <>
      <Canvas>
        <color attach={"background"} args={["white"]} />
        <ScrollControls pages={4} infinite>
          <Scene position={[0, 1.5, 0]} />
        </ScrollControls>
      </Canvas>
    </>
  );
}

function Scene({ children, ...props }) {
  const ref = useRef();
  const scroll = useScroll();
  const [hovered, hover] = useState(null);
  useFrame((state, delta) => {
    ref.current.rotation.y = -scroll.offset * (Math.PI * 2);
    state.events.update();
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y * 2 + 4.5, 9],
      0.3,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={ref} {...props}>
      <Cards
        category={"spring"}
        from={0}
        length={Math.PI / 4}
        onPointerOver={hover}
        onPointerOut={hover}
      />
      <Cards
        category={"summer"}
        from={Math.PI / 4}
        length={Math.PI / 2}
        position={[0, 0.4, 0]}
        onPointerOver={hover}
        onPointerOut={hover}
      />
      <Cards
        category={"autumn"}
        from={Math.PI / 4 + Math.PI / 2}
        length={Math.PI / 2}
        onPointerOver={hover}
        onPointerOut={hover}
      />
      <Cards
        category={"winter"}
        from={Math.PI * 1.25}
        length={Math.PI * 2 - Math.PI * 1.25}
        position={[0, -0.4, 0]}
        onPointerOver={hover}
        onPointerOut={hover}
      />
      <ActiveCard hovered={hovered} />
    </group>
  );
}

function Cards({
  category,
  data,
  from = 0,
  length = Math.PI * 2,
  radius = 5.25,
  onPointerOver,
  onPointerOut,
  ...props
}) {
  const [hovered, hover] = useState(null);
  const amount = Math.round(length * 22);
  const textPosition = from + (amount / 2 / amount) * length;

  return (
    <group {...props}>
      <Billboard
        position={[
          Math.sin(textPosition) * radius * 1.4,
          0.5,
          Math.cos(textPosition) * radius * 1.4,
        ]}
      >
        <Text fontSize={0.25} anchorX={"center"} color={"black"}>
          {category}
        </Text>
      </Billboard>
      {Array.from({ length: amount - 3 }, (_, i) => {
        const angle = from + (i / amount) * length;
        return (
          <Card
            key={angle}
            onPointerOver={(e) => (
              e.stopPropagation(), hover(i), onPointerOver(i)
            )}
            onPointerOut={() => (hover(null), onPointerOut(null))}
            position={[Math.sin(angle) * radius, 0, Math.cos(angle) * radius]}
            rotation={[0, Math.PI / 2 + angle, 0]}
            active={hovered !== null}
            hovered={hovered === i}
            url={`/image/img${Math.floor(i % 10) + 1}.jpg`}
          />
        );
      })}
    </group>
  );
}

function Card({ url, active, hovered, ...props }) {
  const ref = useRef();
  useFrame((state, delta) => {
    const f = hovered ? 1.4 : active ? 1.25 : 1;
    easing.damp3(ref.current.position, [0, hovered ? 0.25 : 0, 0], 0.1, delta);
    easing.damp3(ref.current.scale, [1.618 * f, 1 * f, 1], 0.15, delta);
  });
  return (
    <group {...props}>
      <Image
        ref={ref}
        transparent
        radius={0.075}
        url={url}
        scale={[1.618, 1, 1]}
        side={DoubleSide}
      />
    </group>
  );
}

function ActiveCard({ hovered, ...props }) {
  const ref = useRef();
  const name = "name";
  useLayoutEffect(() => void (ref.current.material.zoom = 0.8), [hovered]);
  useFrame((state, delta) => {
    easing.damp(ref.current.material, "zoom", 1, 0.5, delta);
    easing.damp(ref.current.material, "opacity", hovered !== null, 0.3, delta);
  });

  return (
    <Billboard>
      <Text
        fontSize={0.5}
        position={[2.15, 3.85, 0]}
        anchorX={"left"}
        color={"black"}
      >
        {hovered !== null && `${name}\n${hovered}`}
      </Text>
      <Image
        ref={ref}
        transparent
        radius={0.3}
        position={[0, 1.5, 0]}
        scale={[3.5, 1.618 * 3.5, 0.2, 1]}
        url={`/image/img${Math.floor(hovered % 10) + 1}.jpg`}
      />
    </Billboard>
  );
}
