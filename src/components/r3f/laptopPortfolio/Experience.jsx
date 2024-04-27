import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";
import { useControls } from "leva";

export default function Experience() {
  /**
   * Debug
   */
  const { htmlPositionX, htmlPositionY, htmlPositionZ } = useControls(
    "htmlPosition",
    {
      htmlPositionX: { value: -0.28, step: 0.01 },
      htmlPositionY: { value: 1.31, step: 0.01 },
      htmlPositionZ: { value: -1.44, step: 0.01 },
    },
  );
  const { distanceFactor } = useControls("distanceFactor", {
    distanceFactor: { value: 1.11, step: 0.01 },
  });
  const { htmlRotationX } = useControls("htmlRotationX", {
    htmlRotationX: { value: -0.256, step: 0.001 },
  });

  /**
   * Model
   */
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
  );
  return (
    <>
      {/* <color args={["orange"]} attach={"background"} /> */}
      <Environment preset="city" />
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <rectAreaLight
            width={2.5}
            height={1.65}
            intensity={65}
            color={"#e6e3e1"}
            rotation={[-0.1, Math.PI, 0]}
            position={[0, 0.55, -1.15]}
          />
          <primitive object={computer.scene} position-y={-1.2}>
            <Html
              transform
              distanceFactor={distanceFactor}
              position={[htmlPositionX, htmlPositionY, htmlPositionZ]}
              rotation-x={htmlRotationX}
            >
              <iframe src="https://www.chumsantacruz.com/"></iframe>
            </Html>
          </primitive>
        </Float>
      </PresentationControls>

      <ContactShadows position-y={-1.4} opacity={0.4} scale={5} blur={2.4} />
    </>
  );
}
