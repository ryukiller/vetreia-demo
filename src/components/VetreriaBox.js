const THREE = require("three");
global.THREE = THREE;
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
} from "@react-three/drei";

import Virgo from "./modelli/Virgo";
import Model001 from "./modelli/Model001";
import Model002 from "./modelli/Model002";

export default function VetreriaBox({
  x,
  y,
  z,
  x2,
  material,
  hinge,
  model,
  ...props
}) {
  const modelMap = {
    virgo: {
      component: Virgo,
      props: {
        dimensions: [x, y, z],
        material: material,
        hinge: hinge,
        doorPosition: props.doorPosition,
      },
    },
    fenix: {
      component: Model002,
      props: { dimensions: [x, y, z], material: material, hinge: hinge },
    },
  };

  const { component: SelectedModel, props: modelProps } =
    modelMap[model] || modelMap["virgo"];

  return (
    <>
      <Canvas
        concurrent
        pixelRatio={[1, 1.5]}
        camera={{ position: [1.5, 1.5, 6], fov: 30 }}
      >
        <ambientLight intensity={0.8} />
        <spotLight
          intensity={0.8}
          angle={0.1}
          penumbra={1}
          position={[6, 25, 20]}
        />
        <Suspense fallback={null}>
          <SelectedModel {...modelProps} />
          <Environment files={"brown_photostudio_02_1k.hdr"} />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={2}
            far={1}
          />
        </Suspense>
        <OrbitControls
          minDistance={0.5}
          maxDistance={7}
          minAzimuthAngle={0.1}
          maxAzimuthAngle={Math.PI / 2 - 0.05}
          maxPolarAngle={Math.PI / 2 - 0.05}
          minPolarAngle={0.98}
          target={[-0.5, 1.75, 0]}
          enableZoom={true}
          enablePan={true}
        />
      </Canvas>
    </>
  );
}
