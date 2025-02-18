import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { Cards } from "./Cards";
import { ActiveCard } from "./ActiveCard";
import { easing } from "maath";

export function Scene({ children, ...props }) {
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
