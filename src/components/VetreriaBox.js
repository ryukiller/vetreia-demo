const THREE = require("three");
global.THREE = THREE;
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useProxy } from "valtio"
import {State} from "./State"
import {GlassMaterial} from './Materials'

/*function getWorldPosition(obj)
{
    
    var vec= new THREE.Vector3();
    vec.setFromMatrixPosition(obj.matrixWorld);
    return (vec.x, vec.y, vec.z); // Like this?
}*/

function Vetreria({ x, y, z }) {

const panelm = useRef()
const doorm = useRef()
const cerniere = useRef()
const frame = useRef()
const pomello = useRef()
const walldoor = useRef()

// Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
// { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
// nodes is a named collection of meshes, materials a named collection of materials
const { nodes, materials } = useGLTF("br2.gltf")

const vec = new THREE.Vector3(x, y, z);

const panelmP = new THREE.Vector3(x * 1.35, -0.01, 0.97);

const pomelloP = new THREE.Vector3(1.35 * x, -0.01, 0.97);

const frameS = new THREE.Vector3(x * 1.35, -0.01, 0.97);

// Using the GLTFJSX output here to wire in app-state and hook up events
useFrame(() => {
  //ref2.current.position.x = ref3.current.position.x + 1.35;

  doorm.current.scale.lerp(vec, 0.1)
  walldoor.current.scale.lerp(vec, 0.1)
  frame.current.scale.lerp(vec, 0.1)
  frame.current.position.lerp(frameS, 0.1)
  panelm.current.scale.lerp(vec, 0.1)
  panelm.current.position.lerp(panelmP, 0.1)
  pomello.current.position.lerp(pomelloP, 0.1)

  //console.log(ref3.current.position.x)
  //console.log(ref3.matrixWorld);
})



/*var boundingBox = objMesh.geometry.boundingBox; scale={[State.scale["x"],State.scale["y"],State.scale["z"]]}

var position = new THREE.Vector3();
position.subVectors( boundingBox.max, boundingBox.min );
position.multiplyScalar( 0.5 );
position.add( boundingBox.min );

position.applyMatrix4( objMesh.matrixWorld );

alert(position.x + ',' + position.y + ',' + position.z);
<mesh ref={doorm_1} geometry={nodes.doorm_1.geometry} material={GlassMaterial} />
*/ 
return (
  <group
    dispose={null} >
      <group position={[-1.35, 0.01, -0.97]}>
      <mesh ref={doorm} geometry={nodes.doorm.geometry} material={GlassMaterial}  />
      
      <mesh ref={cerniere} geometry={nodes.cerniere.geometry} material={nodes.cerniere.material} position={[1.35, -0.01, 0.97]} />
      <mesh ref={frame} geometry={nodes.frame.geometry} material={nodes.frame.material} position={[1.35, -0.01, 0.97]} />
      <group ref={panelm} position={[1.35, -0.01, 0.97]}>
        <mesh geometry={nodes.panelm.geometry} material={GlassMaterial} />
        <mesh geometry={nodes.panelm_1.geometry} material={GlassMaterial} />
      </group>
      <mesh ref={pomello} geometry={nodes.pomello.geometry} material={nodes.pomello.material} position={[1.35, -0.01, 0.97]} />
      <mesh ref={walldoor} geometry={nodes.walldoor.geometry} material={materials['Material.001']} />
    </group>
    <mesh geometry={nodes.wall.geometry} material={materials.walls} scale={[1.88, 1.29, 1.88]} />
    <mesh geometry={nodes.floor.geometry} material={materials.floor} scale={[1.88, 1.29, 1.88]} />
  </group>
)
}

export default function VetreriaBox({ x, y, z }) {
return (
  <>
    <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 3.95], fov:30 }}>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
      <Suspense fallback={null}>
        <Vetreria x={x} y={y} z={z}  />
        <Environment preset="apartment" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
      </Suspense>
      <OrbitControls minDistance={.5} maxDistance={5} minAzimuthAngle={0.1} maxAzimuthAngle={Math.PI / 2-0.05} maxPolarAngle={Math.PI / 2-0.05} minPolarAngle={0.98}  target={[-0.5,1.45,0]}  enableZoom={true} enablePan={true} />
    </Canvas>
  </>
)
}
