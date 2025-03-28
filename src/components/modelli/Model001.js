import React, { useState, useMemo, useEffect } from "react";
import { Box, Plane, useTexture } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { GlassMaterial } from "../../components/Materials";

const Model001 = ({ dimensions, material, hinge }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDoor() {
    setIsOpen(!isOpen);
  }

  const doorRotation = useMemo(() => (isOpen ? -Math.PI / 2.2 : 0), [isOpen]);

  const springConfig = {
    mass: 2,
    tension: 270,
    friction: 26,
  };

  const { rotation } = useSpring({
    rotation: [0, doorRotation, 0],
    config: springConfig,
  });

  const floorTexture = useTexture("./floor.jpg");
  const wallTexture = useTexture("./concrete_polished_matte_basecolor.png");

  const [width, height, depth] = dimensions;

  const doorWidth = width ? width : 0.6;
  const doorPositionX = (doorWidth - 0.6) / 2;

  const doorHeight = height ? height : 2; //2 + height  //height ? height : 2;

  const doorPositionY = doorHeight > 2 ? doorHeight / 2 : 1; //(doorHeight - 2) / 2  //doorHeight > 2 ? (doorHeight - 2) / 2 : 2;

  return (
    <group dispose={null}>
      <animated.group position={[-1.76, 0.01, -0.97]} rotation={rotation}>
        <group position={[0.3, 0, 0]}>
        {/* Glass Door */}
        <Box
          args={[doorWidth, doorHeight, 0.008]}
          position={[doorPositionX, doorPositionY, 0]}
          material={material ? material : GlassMaterial}
          onClick={toggleDoor}
          receiveShadow
          castShadow
        />

        {/* Pomello */}
        <Box
          args={[0.03, 0.03, 0.06]}
          position={[doorWidth - 0.8 / 2, 1, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial attach="material" color="gold" />
        </Box>

        {/* Hinges */}
        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, doorHeight - 0.16, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial attach="material" color="silver" />
        </Box>
        {/* Middle Hinge */}
        {hinge &&
        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, doorHeight - (doorHeight / 2) - 0.04, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial attach="material" color="silver" />
        </Box>
        }

        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, 0.2, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial attach="material" color="silver" />
        </Box>
        </group>
      </animated.group>

      {/* collone right */}
      <Box position={[doorWidth - 3.38 / 2, doorPositionY, -1.5]} args={[0.1, doorHeight + 0.1, 1.2]}>
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={wallTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Box>

      {/* collone left */}
      <Box position={[-1.9, doorPositionY, -1]} args={[0.2, doorHeight + 0.1, 0.1]}>
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={wallTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Box>

      {/* left wall */}
      <Plane
        position={[-2, 1, 0]}
        args={[16, 16]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={wallTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>

      {/* Right wall */}
      <Plane
        position={[0, 1, -2]}
        args={[16, 16]}
        rotation={[0, 0, -Math.PI / 2]}
        receiveShadow
      >
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={wallTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>

      {/* Floor Plane */}
      <Plane args={[20, 20]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={floorTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>
    </group>
  );
};

export default Model001;
