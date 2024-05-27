import * as THREE from "three";
import gsap from "gsap";
import vertexShader from "../../../../shader/fireworks/vertex.glsl";
import fragmentShader from "../../../../shader/fireworks/fragment.glsl";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import GUI from "lil-gui";
import { Sky } from "three/addons/objects/Sky.js";
import { useEffect } from "react";

export default function Experience() {
  const three = useThree();
  const gui = new GUI();
  gui.hide();
  // Add Sky
  const sky = new Sky();
  sky.scale.setScalar(450000);
  three.scene.add(sky);
  const skyParameters = {
    turbidity: 10,
    rayleigh: 3,
    mieCoefficient: 0.005,
    mieDirectionalG: 0.95,
    elevation: -2.2,
    azimuth: 180,
  };
  const sun = new THREE.Vector3();

  function updateSky() {
    const uniforms = sky.material.uniforms;
    uniforms["turbidity"].value = skyParameters.turbidity;
    uniforms["rayleigh"].value = skyParameters.rayleigh;
    uniforms["mieCoefficient"].value = skyParameters.mieCoefficient;
    uniforms["mieDirectionalG"].value = skyParameters.mieDirectionalG;

    const phi = THREE.MathUtils.degToRad(90 - skyParameters.elevation);
    const theta = THREE.MathUtils.degToRad(skyParameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    uniforms["sunPosition"].value.copy(sun);
  }

  gui.add(skyParameters, "turbidity", 0.0, 20.0, 0.1).onChange(updateSky);
  gui.add(skyParameters, "rayleigh", 0.0, 4, 0.001).onChange(updateSky);
  gui.add(skyParameters, "mieCoefficient", 0.0, 0.1, 0.001).onChange(updateSky);
  gui.add(skyParameters, "mieDirectionalG", 0.0, 1, 0.001).onChange(updateSky);
  gui.add(skyParameters, "elevation", -3, 10, 0.01).onChange(updateSky);
  gui.add(skyParameters, "azimuth", -180, 180, 0.1).onChange(updateSky);

  updateSky();

  const textures = [
    useTexture("/textures/particles/1.png"),
    useTexture("/textures/particles/2.png"),
    useTexture("/textures/particles/3.png"),
    useTexture("/textures/particles/4.png"),
    useTexture("/textures/particles/5.png"),
    useTexture("/textures/particles/6.png"),
  ];
  const createRandomFirework = () => {
    const count = Math.round(400 + Math.random() * 1000);
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      Math.random() - 0.5,
      (Math.random() - 0.5) * 2,
    );
    const size = 50 + Math.random() * 0.1;
    const texture = textures[Math.floor(Math.random() * textures.length)];
    const radius = 0.1 + Math.random();
    const color = new THREE.Color();
    color.setHSL(Math.random(), 1, 0.7);
    createFirework({ count, position, size, texture, radius, color, three });
  };
  useEffect(() => {
    createRandomFirework();
  }, []);
  three.gl.domElement.addEventListener("click", createRandomFirework);
}

const createFirework = ({
  count,
  position,
  size,
  texture,
  radius,
  color,
  three,
}) => {
  // Geometry
  const positionsArray = new Float32Array(count * 3);
  const sizesArray = new Float32Array(count);
  const timeMultipliersArray = new Float32Array(count);

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
    timeMultipliersArray[i] = 1 + Math.random();
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positionsArray, 3),
  );
  geometry.setAttribute(
    "aSize",
    new THREE.Float32BufferAttribute(sizesArray, 1),
  );
  geometry.setAttribute(
    "aTimeMultiplier",
    new THREE.Float32BufferAttribute(timeMultipliersArray, 1),
  );

  // Material
  texture.flipY = false;
  const material = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: {
      uSize: new THREE.Uniform(size),
      uTexture: new THREE.Uniform(texture),
      uColor: new THREE.Uniform(color),
      uProgress: new THREE.Uniform(0),
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  // Points
  const firework = new THREE.Points(geometry, material);
  firework.position.copy(position);
  three.scene.add(firework);

  // Destroy
  const destroy = () => {
    three.scene.remove(firework);
    geometry.dispose();
    material.dispose();
  };

  // Animate
  gsap.to(material.uniforms.uProgress, {
    value: 1,
    duration: 3,
    ease: "linear",
    onComplete: destroy,
  });
};
