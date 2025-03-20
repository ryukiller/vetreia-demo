import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Box,
  Cylinder,
  Plane,
  Line,
  Html,
  useTexture,
  useGLTF,
  TransformControls,
} from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";
import { useFrame } from "@react-three/fiber";
import { GlassMaterial } from "../../components/Materials";
import { useControls } from "leva";

const Virgo = ({ dimensions, material, hinge, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleDoor() {
    setIsOpen(!isOpen);
  }

  let doorRotation = useMemo(() => (isOpen ? -Math.PI / 2.2 : 0), [isOpen]);

  doorRotation =
    props.doorPosition == "left" ? doorRotation : doorRotation * -1;

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

  const { nodes, materials } = useGLTF("./showerbot/untitled.gltf");
  //const mobile = useGLTF("./mobile/mobile.gltf")
  //const muroback = useGLTF("./muroback/muroback.gltf")
  //const wc = useGLTF("./water/water.gltf")
  const rain = useGLTF("./rain/water.gltf");
  const piatto = useGLTF("./piatto/piatto.gltf");

  const positionIfRight = props.doorPosition == "left" ? [0, 0, 0] : [-2.7, 0, -0.04];

  const vetroLateraleArgs = [0.008, doorHeight + 0.06, 0.8]
  const vetroLateralePosition = props.doorPosition == "left" ? [doorWidth - 3.86 / 2, doorPositionY, -1.8] : [-1.68, doorPositionY, doorWidth - 3.94 / 2]
  const vetroLateraleRotation = props.doorPosition == "left" ? [0, 0, 0] : [0, Math.PI / 2, 0]

  //console.log(piatto)

  function renderFloor(z) {
    let planes = [];
    for (let i = 0; i < 10; i++) {
      planes.push(
        <Plane
          key={i}
          args={[1, 1]}
          position={[-2 + i, 0, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          receiveShadow
        >
          <meshStandardMaterial
            attach="material"
            color="#a1a1a1"
            roughness={0.4}
            metalness={0.6}
          />
        </Plane>
      );
    }

    return planes;
  }

  function renderFloors() {
    let floors = [];
    for (let i = 0; i < 10; i++) {
      floors.push(renderFloor(-1.6 + i));
    }

    return floors;
  }

  const dashMaterial = new THREE.LineDashedMaterial({
    color: 0xffffff,
    linewidth: 1,
    scale: 1,
    dashSize: 3,
    gapSize: 1,
  });

  // const materialProps = useControls({
  //   thickness: { value: 0, min: 0, max: 20 },
  //   roughness: { value: 1, min: 0, max: 1, step: 0.1 },
  //   clearcoat: { value: 0, min: 0, max: 1, step: 0.1 },
  //   clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.1 },
  //   transmission: { value: 1, min: 0.9, max: 1, step: 0.01 },
  //   ior: { value: 1, min: 1, max: 2.3, step: 0.05 },
  //   envMapIntensity: { value: 50, min: 0, max: 100, step: 1 },
  //   color: "#ffffff",
  //   attenuationTint: "#ffe79e",
  //   attenuationDistance: { value: 0.20, min: 0, max: 1 },
  //   opacity: { value: 0.20, min: 0, max: 1 },
  // });

  const materialProps = {
    thickness: 0,
    roughness: 1,
    clearcoat: 0,
    clearcoatRoughness: 0,
    transmission: 1,
    ior: 1,
    envMapIntensity: 50,
    color: "#ffffff",
    attenuationTint: "#ffe79e",
    attenuationDistance: 0.2,
    opacity: 0.2,
  }

  return (
    <group dispose={null}>
      {/* muro */}
      {/* {muroback.nodes.muroback.children.map(function(object, i){
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
})} */}
      {/* mobile */}
      {/* {mobile.nodes.Material2020.children.map(function(object, i){
  return <mesh key={i} position={[-1.6, .6, 2]} scale={[.7,.7,.7]} geometry={object.geometry} material={object.material}  />
})} */}
      {/* doccia */}
      {/* {nodes.showerbot.children.map(function (object, i) {
        return (
          <mesh
            key={i}
            position={[-1.94, 1.2, -1.55]}
            scale={[0.7, 0.7, 0.7]}
            geometry={object.geometry}
            material={object.material}
          />
        );
      })}
      {rain.nodes.rain.children.map(function (object, i) {
        return (
          <mesh
            key={i}
            rotation={[0, Math.PI / 2, 0]}
            position={[-1.6, 2, -1.55]}
            scale={[2.5, 2.5, 2.5]}
            geometry={object.geometry}
            material={object.material}
          />
        );
      })} */}

      {/* {piatto.nodes.piatto.children.map(function (object, i) {
        return (
          <mesh
            position={[doorWidth - 5.4 / 2, 0, -1.4]}
            scale={[1.5, 1, 1.1]}
            key={i}
            geometry={object.geometry}
          >
            <meshStandardMaterial
              attach="material"
              color="#c1c1c1"
              roughness={0.5}
              metalness={0.4}
            />
          </mesh>
        );
        //-1.9 + (width / 2)
      })} */}

      {/* water */}
      {/* {wc.nodes.water.children.map(function(object, i){
  return <mesh key={i} position={[doorWidth - 2 / 2, 0.26, -1.9]}  scale={[1,1,1]} geometry={object.geometry} material={object.material}  />
})} */}

      {/* door */}
      <group
        rotation={
          props.doorPosition == "left" ? [0, 0, 0] : [0, -Math.PI / 2, 0]
        }
        position={positionIfRight}
      >
        <animated.group position={[-1.94, 0.03, -1.4]} rotation={rotation}>
          <group position={[0.3, 0, 0]}>
            <group>
              <Line
                points={[
                  [0, 0, 0],
                  [doorWidth, 0, 0],
                ]}
                position={[
                  doorPositionX - doorWidth / 2,
                  doorPositionY * 2.08,
                  0,
                ]}
                color={"white"}
                lineWidth={0.7}
                dashed={true}
                scale={1}
                dashSize={0.03}
                gapSize={0.02}
              />
              <mesh position={[doorWidth - 0.3, doorPositionY * 2.08, 0]}>
                <sphereGeometry attach="geometry" args={[0.02, 32, 32]} />
              </mesh>
              <mesh position={[-0.3, doorPositionY * 2.08, 0]}>
                <sphereGeometry attach="geometry" args={[0.02, 32, 32]} />
              </mesh>
              <Html position={[doorPositionX - 0.1, doorPositionY * 2.2, 0]}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    backgroundColor: "#000",
                    borderRadius: "3px",
                    padding: "2px 5px",
                  }}
                >
                  {(doorWidth * 100).toFixed(0)}CM
                </div>
              </Html>
              <Line
                points={[
                  [0, 0, 0],
                  [0, doorHeight, 0],
                ]}
                position={[doorWidth - 0.15, 0, 0]}
                color={"white"}
                lineWidth={0.5}
                dashed={true}
                scale={1}
                dashSize={0.03}
                gapSize={0.02}
              />
              <mesh position={[doorWidth - 0.15, doorPositionY * 2, 0]}>
                <sphereGeometry attach="geometry" args={[0.02, 32, 32]} />
              </mesh>
              <mesh position={[doorWidth - 0.15, 0, 0]}>
                <sphereGeometry attach="geometry" args={[0.02, 32, 32]} />
              </mesh>
              <Html position={[doorWidth - 0.12, doorHeight / 2, 0]}>
                <div
                  style={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "12px",
                    backgroundColor: "#000",
                    borderRadius: "3px",
                    padding: "2px 5px",
                  }}
                >
                  {(doorHeight * 100).toFixed(0)}CM
                </div>
              </Html>
            </group>
            {/* Glass Door */}
            <Box
              args={[doorWidth, doorHeight, 0.008]}
              position={[doorPositionX, doorPositionY, 0]}
              onClick={toggleDoor}
              receiveShadow
              castShadow
            >
              <meshPhysicalMaterial {...materialProps} />
            </Box>

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
                roughness={0}
              />
            </Box>
            {/* Middle Hinge */}
            {hinge && (
              <Box
                args={[0.08, 0.08, 0.03]}
                position={[-0.28, doorHeight - doorHeight / 2 - 0.04, 0.005]}
                receiveShadow
                castShadow
              >
                <meshStandardMaterial
                  attach="material"
                  color="#ffffff"
                  metalness={1}
                  roughness={0}
                />
              </Box>
            )}

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
                roughness={0}
              />
            </Box>
          </group>
        </animated.group>
      </group>

      {/* vetro laterale */}
      <Box
        args={vetroLateraleArgs}
        position={vetroLateralePosition}
        rotation={vetroLateraleRotation}
        material={material ? material : GlassMaterial}
        receiveShadow
        castShadow
      />

      {/* collone right */}
      {/* <Box
        position={[doorWidth - 3.8 / 2, doorPositionY, -1.5]}
        args={[0.1, doorHeight + 0.1, 1.2]}
      >
        <meshStandardMaterial
          attach="material"
          color="#c1c1c1"
          roughness={0.5}
          metalness={0.4}
        />
      </Box> */}

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
          color="#c1c1c1"
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
          color="#c1c1c1"
          roughness={0.4}
          metalness={0.6}
        />
      </Plane>

      {/* Floor Plane */}
      {renderFloors()}
    </group>
  );
};

export default Virgo;
