const THREE = require("three");
global.THREE = THREE;
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useProxy } from "valtio"
import {State} from "./State"
import {GlassMaterial} from './Materials'

import Model001 from './modelli/Model001'



function Vetreria({ x, y, z, x2 }) {

const panelm = useRef()
const doorm = useRef()
const cerniere = useRef()
const frame = useRef()
const pomello = useRef()
const walldoor = useRef()
const pomelloin = useRef()

const { nodes, materials } = useGLTF("br2.gltf")

const offset = x - 1;

const vec = new THREE.Vector3(x, y, z);

const vec2 = new THREE.Vector3(x, y, x2);

const vec3 = new THREE.Vector3(x * 1.35, -0.01, x2 * 0.97);

const vec4 = new THREE.Vector3(x, y, z);

const panelmP = new THREE.Vector3(x * 1.35, -0.01, 0.97);

const pomelloP = new THREE.Vector3((1.35 * x) , -0.01, 0.97); //  -(x1 * offset) - (size*scale)/2) -(size/2)

const frameS = new THREE.Vector3(x * 1.35, -0.01, 0.97);

const cerniereP = new THREE.Vector3(1.35, y * -0.01, 0.97);

const vecM = new THREE.Vector3(1, 1, 1);

let radian = 2 * Math.PI * (180 / 360);


useFrame(() => {

  //scaleY(panelm.current, y)
  
  panelm.current.scale.lerp(vec, 0.1)
  panelm.current.position.lerp(panelmP, 0.1)

  doorm.current.scale.lerp(vec, 0.1)
  walldoor.current.scale.lerp(vec, 0.1)
  frame.current.scale.lerp(vec, 0.1)
  frame.current.position.lerp(frameS, 0.1)
  
  pomello.current.position.lerp(pomelloP, 0.1)
  pomello.current.scale.lerp(vec, 0.1)
  cerniere.current.position.lerp(cerniereP, 0.1)

  panelm.current.scale.lerp(vec2, 0.1)
  panelm.current.position.lerp(vec3, 0.1)

  

  
  

})

     
return (
  <group
    dispose={null} >
      <group position={[-1.35, 0.01, -0.97]}>
      <mesh ref={doorm} geometry={nodes.doorm.geometry} material={GlassMaterial}  />
      
      <mesh ref={cerniere} geometry={nodes.cerniere.geometry} material={nodes.cerniere.material} position={[1.35, -0.01, 0.97]} />
      <mesh ref={frame} geometry={nodes.frame.geometry} material={nodes.frame.material} position={[1.35, -0.01, 0.97]} />
      
      <mesh ref={panelm} geometry={nodes.panelm.geometry} material={GlassMaterial} position={[1.35, -0.01, 0.97]} />
      

      <group ref={pomello} position={[1.35, -0.01, 0.97]}>
        <mesh ref={pomelloin} geometry={nodes.pomello.geometry} material={nodes.pomello.material} scale={[1,1,1]} />
      </group>
      <mesh ref={walldoor} geometry={nodes.walldoor.geometry} material={materials['Material.001']} />
    </group>
    <mesh geometry={nodes.wall.geometry} material={materials.walls} scale={[1.88, 1.29, 1.88]} />
    <mesh geometry={nodes.floor.geometry} material={materials.floor} scale={[1.88, 1.29, 1.88]} />
  </group>
)
}

export default function VetreriaBox({ x, y, z, x2, material, hinge }) {
return (
  <>
    <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 6], fov:30 }}>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
      <Suspense fallback={null}>
        {/* <Vetreria x={x} y={y} z={z} x2={x2}  /> */}
        <Model001 dimensions={[x, y, z]} material={material} hinge={hinge} />
        <Environment preset="studio" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
      </Suspense>
      <OrbitControls minDistance={.5} maxDistance={7} minAzimuthAngle={0.1} maxAzimuthAngle={Math.PI / 2-0.05} maxPolarAngle={Math.PI / 2-0.05} minPolarAngle={0.98}  target={[-0.5,1.45,0]}  enableZoom={true} enablePan={true} />
    </Canvas>
  </>
)
}