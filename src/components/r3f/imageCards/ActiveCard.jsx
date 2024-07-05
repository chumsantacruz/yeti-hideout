import { useLayoutEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Text, Image } from "@react-three/drei";
import { photosMeta } from "./importImage";
import { easing } from "maath";

export function ActiveCard({ hovered, ...props }) {
  const ref = useRef();
  const name = "name";
  useLayoutEffect(() => void (ref.current.material.zoom = 1.2), [hovered]);
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
        scale={[
          0.01 * photosMeta[+hovered].width,
          0.01 * photosMeta[+hovered].height,
          0.2,
          1,
        ]}
        url={photosMeta[+hovered].src}
      />
    </Billboard>
  );
}
