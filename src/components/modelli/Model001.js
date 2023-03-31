import React, { useState, useMemo, useEffect, useRef } from "react";
import { Box, Cylinder, Plane, useTexture, useGLTF, TransformControls } from "@react-three/drei";
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

  const { nodes, materials } = useGLTF("./showerbot/untitled.gltf")
  const mobile = useGLTF("./mobile/mobile.gltf")
  const muroback = useGLTF("./muroback/muroback.gltf")
  const wc = useGLTF("./water/water.gltf")
  const rain = useGLTF("./rain/water.gltf")
  const piatto = useGLTF("./piatto/piatto.gltf")

  //console.log(piatto)

  function renderFloor(z) {
    let planes = [];
      for(let i = 0; i < 10; i++) {
        planes.push(<Plane key={i} args={[1, 1]}  position={[-2 + i, 0, z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <meshStandardMaterial
          attach="material"
          color="#fff"
          map={floorTexture}
          roughnessMap={wallTexture}
          metalnessMap={wallTexture}
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>)
      }

      return planes;

  }

  function renderFloors() {
    let floors = [];
    for(let i = 0; i < 10; i++) {
      floors.push(renderFloor(-1.6 + i))
    }

    return floors;
  }

  return (
    <group dispose={null}>
{/* muro */}
{muroback.nodes.muroback.children.map(function(object, i){
  return <mesh key={i} position={[-2, 0.1, -2]} scale={[1,1.8,1]} geometry={object.geometry} material={object.material}  />
})}
{muroback.nodes.muroback.children.map(function(object, i){
  return <mesh key={i} position={[-0.45, 0.1, -2]} scale={[1,1.8,1]} geometry={object.geometry} material={object.material}  />
})}
{muroback.nodes.muroback.children.map(function(object, i){
  return <mesh key={i} position={[1.1, 0.1, -2]} scale={[1,1.8,1]} geometry={object.geometry} material={object.material}  />
})}
{muroback.nodes.muroback.children.map(function(object, i){
  return <mesh key={i} position={[-2, 0.1, 0]} rotation={[0,Math.PI / 2,0]} scale={[1.3,1.8,1]} geometry={object.geometry} material={object.material}  />
})}
{/* mobile */}
{mobile.nodes.Material2020.children.map(function(object, i){
  return <mesh key={i} position={[-1.6, .6, 2]} scale={[.7,.7,.7]} geometry={object.geometry} material={object.material}  />
})}
{/* doccia */}
{nodes.showerbot.children.map(function(object, i){
  return <mesh key={i} position={[-1.94, 1.2, -1.55]} scale={[.7,.7,.7]} geometry={object.geometry} material={object.material}  />
})}
{rain.nodes.rain.children.map(function(object, i){
  return <mesh key={i} rotation={[0,Math.PI / 2,0]} position={[-1.6, 2, -1.55]} scale={[2.5,2.5,2.5]} geometry={object.geometry} material={object.material}  />
})}

{piatto.nodes.piatto.children.map(function(object, i){
  return (<mesh position={[doorWidth - 5.4 / 2,0, -1.4]} scale={[1.5, 1, 1.1]} key={i} geometry={object.geometry} material={object.material} />)
     //-1.9 + (width / 2)
})}

{/* water */}
{wc.nodes.water.children.map(function(object, i){
  return <mesh key={i} position={[doorWidth - 2 / 2, 0.26, -1.9]}  scale={[1,1,1]} geometry={object.geometry} material={object.material}  />
})}
      
      <animated.group position={[-1.94, 0.03, -0.97]} rotation={rotation}>
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
        <Cylinder
          args={[0.015, 0.015, 0.04, 32]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[doorWidth - 0.8 / 2, 1, 0.005]}
        >
          <meshStandardMaterial 
          attach="material"
          color="#ffffff"
          metalness={1}
          roughness={0}
          />
        </Cylinder>

        {/* Hinges */}
        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, doorHeight - 0.16, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial  
        attach="material"
        color="#ffffff"
        metalness={1}
        roughness={0} />
        </Box>
        {/* Middle Hinge */}
        {hinge &&
        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, doorHeight - (doorHeight / 2) - 0.04, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial  
        attach="material"
        color="#ffffff"
        metalness={1}
        roughness={0} />
        </Box>
        }

        <Box
          args={[0.08, 0.08, 0.03]}
          position={[-0.28, 0.2, 0.005]}
          receiveShadow
          castShadow
        >
          <meshStandardMaterial  
        attach="material"
        color="#ffffff"
        metalness={1}
        roughness={0} />
        </Box>
        </group>
      </animated.group>

      {/* collone right */}
      <Box position={[doorWidth - 3.8 / 2, doorPositionY, -1.5]} args={[0.1, doorHeight + 0.1, 1.2]} material={muroback.nodes.muroback.children[0].material}>
        
      </Box>

      {/* collone left */}
      {/* <Box position={[-1.9, doorPositionY, -1]} args={[0.2, doorHeight + 0.1, 0.1]} material={muroback.nodes.muroback.children[0].material}>

      </Box> */}

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
          roughness={0.5}
          metalness={0.4}
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
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>

      {/* Floor Plane */}
     {renderFloors()}
    </group>
  );
};

export default Model001;

