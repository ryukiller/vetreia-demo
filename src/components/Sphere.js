const THREE = require("three");
global.THREE = THREE;
import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import {GlassMaterial, GlassMaterial2, GlassMaterial3, GlassMaterial4} from './Materials'

function Sphere(props) {
    const ref = useRef()
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  // Return the view, these are regular Threejs elements expressed in JSX

  const handleClick = () => {
    props.onClick(props);
    click(!clicked);
  };

  return (
    <mesh
      {...props}
      ref={ref}
      scale={hovered ? 1.2 : 1}
      onClick={handleClick}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      >
      <sphereGeometry args={[.5, 64]} />
    </mesh>
  )
  }

export function Sfera({onClick}) {
    return (
      <>
      <Canvas style={{height:"100px", background:"#fff"}} pixelRatio={[1, 1.5]} concurrent camera={{ fov: 30 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Sphere onClick={onClick} base="679" nome="linea azzurra" material={GlassMaterial} position={[-2.3, 0, 0]} />
        <Sphere onClick={onClick} base="740" nome="linea extra chiaro" material={GlassMaterial2} position={[-0.75, 0, 0]} />
        <Sphere onClick={onClick} base="761" nome="satinato linea azzurra" material={GlassMaterial3} position={[0.8, 0, 0]} />
        <Sphere onClick={onClick} base="875" nome="satinato linea extra chiaro" material={GlassMaterial4} position={[2.3, 0, 0]} />
        <Environment preset="apartment" />
        </Suspense>
     </Canvas>
      </>
    )
  }