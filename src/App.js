const THREE = require("three");
global.THREE = THREE;
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import Menu from "./components/drawer"
import { proxy, useProxy } from "valtio"
import {State} from "./components/State"
import {GlassMaterial} from './components/Materials'

function Vetreria() {
const ref = useRef()
const ref2 = useRef()
const snapS = useProxy(State)
// Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
// { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
// nodes is a named collection of meshes, materials a named collection of materials
const { nodes, materials } = useGLTF("br2.gltf")

// Using the GLTFJSX output here to wire in app-state and hook up events
console.log(ref2)
return (
  <group
    ref={ref}
    dispose={null} >
      <group position={[-1.35, 0.01, -0.97]}>
      <mesh geometry={nodes.doorm.geometry} material={GlassMaterial} scale={[State.scale["x"],State.scale["y"],State.scale["z"]]} />
      <mesh geometry={nodes.doorm_1.geometry} material={GlassMaterial} />
      <mesh geometry={nodes.cerniere.geometry} material={nodes.cerniere.material} position={[1.35, -0.01, 0.97]} />
      <mesh geometry={nodes.frame.geometry} material={nodes.frame.material} position={[1.35, -0.01, 0.97]} />
      <group ref={ref2} position={[1.35 * State.scale["x"], -0.01, 0.97]}>
        <mesh geometry={nodes.panelm.geometry} material={GlassMaterial} />
        <mesh geometry={nodes.panelm_1.geometry} material={GlassMaterial} />
      </group>
      <mesh geometry={nodes.pomello.geometry} material={nodes.pomello.material} position={[1.35, -0.01, 0.97]} />
      <mesh geometry={nodes.walldoor.geometry} material={materials['Material.001']} />
    </group>
    <mesh geometry={nodes.wall.geometry} material={materials.walls} scale={[1.88, 1.29, 1.88]} />
    <mesh geometry={nodes.floor.geometry} material={materials.floor} scale={[1.88, 1.29, 1.88]} />
  </group>
)
}

export default function App() {
return (
  <>
    <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 3.95], fov:30 }}>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
      <Suspense fallback={null}>
        <Vetreria />
        <Environment preset="apartment" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
      </Suspense>
      <OrbitControls minDistance={.5} maxDistance={5} minAzimuthAngle={0.1} maxAzimuthAngle={Math.PI / 2-0.05} maxPolarAngle={Math.PI / 2-0.05} minPolarAngle={0.98}  target={[-0.5,1.45,0]}  enableZoom={true} enablePan={true} />
    </Canvas>
    <Menu />
  </>
)
}
