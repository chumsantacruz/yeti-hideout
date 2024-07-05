import { useState } from "react";
import { Billboard, Text } from "@react-three/drei";
import { Card } from "./Card";
import { photosMeta } from "./importImage";

export function Cards({
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
            url={photosMeta[i].src}
          />
        );
      })}
    </group>
  );
}
