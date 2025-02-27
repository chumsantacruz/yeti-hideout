import {
  PresentationControls,
  Float,
  Environment,
  useGLTF,
  ContactShadows,
  Html,
} from "@react-three/drei";

export default function Experience() {
  /**
   * Model
   */
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf",
  );
  return (
    <>
      <Environment preset="city" />
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.1, 0.1]}
        azimuth={[-0.5, 0.1]}
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
              distanceFactor={1.14}
              position={[-0.2, 2.06, -1.5]}
              rotation-x={-0.256}
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
