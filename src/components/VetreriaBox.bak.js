const THREE = require("three");
global.THREE = THREE;
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, useGLTF, OrbitControls } from '@react-three/drei'
import { proxy, useProxy } from "valtio"
import {State} from "./State"
import {GlassMaterial} from './Materials'


function scaleY ( mesh, scale ) {
  mesh.scale.y = scale ;
  if( ! mesh.geometry.boundingBox ) mesh.geometry.computeBoundingBox();
  var height = mesh.geometry.boundingBox.max.y - mesh.geometry.boundingBox.min.y;

  //height is here the native height of the geometry
  //that does not change with scaling. 
  //So we need to multiply with scale again
  mesh.position.y = height * scale / 2 ;
}

/*function getWorldPosition(obj)
{
    
    var vec= new THREE.Vector3();
    vec.setFromMatrixPosition(obj.matrixWorld);
    return (vec.x, vec.y, vec.z); // Like this?
}*/

/*THREE.Object3D.prototype.updateMatrix = function () {

	this.matrix.compose( this.position, this.quaternion, this.scale );

	if ( this.pivot && this.pivot.isVector3 ) {

		var px = this.pivot.x;
		var py = this.pivot.y;
		var pz = this.pivot.z;

		var te = this.matrix.elements;

		te[ 12 ] += px - te[ 0 ] * px - te[ 4 ] * py - te[ 8 ] * pz;
		te[ 13 ] += py - te[ 1 ] * px - te[ 5 ] * py - te[ 9 ] * pz;
		te[ 14 ] += pz - te[ 2 ] * px - te[ 6 ] * py - te[ 10 ] * pz;

	}

	this.matrixWorldNeedsUpdate = true;

};*/

/*function originToLeft( geometry ) {

  //1. Find the lowest `y` coordinate
  var shift = geometry.boundingBox ? geometry.boundingBox.min.x : geometry.computeBoundingBox().min.x;

  //2. Then you translate all your vertices up 
  //so the vertical origin is the bottom of the feet :
  for ( var i = 0 ; i < geometry.vertices.length ; i++ ) {
      geometry.vertices[ i ].x -= shift;
  }
  //or as threejs implements (WestLangley's answer) : 
  geometry.translate( 0, -shift, 0);

  //finally
  geometry.verticesNeedUpdate = true;
}*/

function Vetreria({ x, y, z, x2 }) {

const panelm = useRef()
const doorm = useRef()
const cerniere = useRef()
const frame = useRef()
const pomello = useRef()
const walldoor = useRef()
const pomelloin = useRef()

//originToLeft(doorm);




// Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
// { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
// nodes is a named collection of meshes, materials a named collection of materials
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

//nodes.panelm.pivot = new THREE.Vector3( 1, 5, 5 );
let radian = 2 * Math.PI * (180 / 360);

 // mesh.geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, - mesh.geometry.parameters.height / 2, 0 ) ); 
  // mesh.translateY(mesh.geometry.parameters.height / 2);


/*
var boundingBox = nodes.pomello.geometry.boundingBox; 

var position = new THREE.Vector3();
position.subVectors( boundingBox.max, boundingBox.min );
position.multiplyScalar( 0.5 );
position.add( boundingBox.min );

position.applyMatrix4( nodes.pomello.matrixWorld );

console.log(position.x + ',' + position.y + ',' + position.z);
*/

// Using the GLTFJSX output here to wire in app-state and hook up events

/*if (myPos.x > blockPos.x)
  {
      zDistance = myPos.x - blockPos.x;

      block.position += Vector3.forward * zDistance / 2;

      let newposm = new THREE.Vector3(1, 0.1, block.x + zDistance);
  }*/

  //geometry.translate( 0, 0.5, 0 );

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

  //var myPos = walldoor.position;
  //var block = spawnedBlocks[spawnedBlocks.Count - 1].transform;
  //var blockPos = doorm.position;

  

  
  

})

/*<group ref={panelm} position={[1.35, -0.01, 0.97]}>
        <mesh ref={panelm} geometry={nodes.panelm.geometry} material={GlassMaterial} />
       <mesh ref={doorm} geometry={nodes.doorm.geometry} material={GlassMaterial}  />
       <mesh ref={panelm} geometry={nodes.doorm.geometry} material={GlassMaterial} rotation={[0, -Math.PI / 2, 0]} position={[1.35, -0.01, 0.97]} />
     </group>
     
     
     <group rotation={[0, -radian, 0]} position={[1.28, 0, -0.4]} >
      <mesh ref={panelm} geometry={nodes.panelm.geometry} material={GlassMaterial} />
      <mesh ref={panelm} geometry={nodes.panelm.geometry} material={GlassMaterial} position={[1.35, -0.01, 0.97]} />
      </group>
     */

     
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

export default function VetreriaBox({ x, y, z, x2 }) {
return (
  <>
    <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 3.95], fov:30 }}>
      <ambientLight intensity={0.3} />
      <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
      <Suspense fallback={null}>
        <Vetreria x={x} y={y} z={z} x2={x2}  />
        <Environment preset="apartment" />
        <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
      </Suspense>
      <OrbitControls minDistance={.5} maxDistance={5} minAzimuthAngle={0.1} maxAzimuthAngle={Math.PI / 2-0.05} maxPolarAngle={Math.PI / 2-0.05} minPolarAngle={0.98}  target={[-0.5,1.45,0]}  enableZoom={true} enablePan={true} />
    </Canvas>
  </>
)
}