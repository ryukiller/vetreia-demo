import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"

// Using a Valtio state model to bridge reactivity between
// the canvas and the dom, both can write to it and/or react to it.
const state = proxy({
  current: null,
  items: {
    glass: "#000000"
  },
})

const statescale = proxy({
  current: null,
  props: {
    transmission: .5,
    roughness: 0.1,
  },
  scale: {
    x: .5,
    y: 1,
    z: 1
  },
})

function Shoe() {
  const ref = useRef()
  const snap = useProxy(state)
  const snapS = useProxy(statescale)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("glass-draco2.glb")

  // Animate model
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    //ref.current.rotation.z = -0.1 - (1 + Math.sin(t / 1.5)) / 20
    ref.current.rotation.x = Math.cos(t / 4) / 8
    ref.current.rotation.y = Math.sin(t / 4) / 8
    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
  })

  // Cursor showing current color
  const [hovered, set] = useState(null)
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(hovered ? cursor : auto)}'), auto`
  }, [hovered])

  // Using the GLTFJSX output here to wire in app-state and hook up events
  return (
    <group
      ref={ref}
      dispose={null}
      onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
      onPointerOut={(e) => e.intersections.length === 0 && set(null)}
      onPointerMissed={() => (state.current = null)}
      onPointerDown={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
      <mesh 
      geometry={nodes.Plane.geometry} 
      material={materials.glass} 
      material-color={snap.items.glass} 
      material-transmission={snapS.props.transmission}
      material-roughness={snapS.props.roughness}
        scale={[snapS.scale.x,snapS.scale.y,snapS.scale.z]}
        rotation={[1.5, 0, 0]} 
        />
    </group>
  )
}

function Picker() {
  const snap = useProxy(state)
  const [rangeval, setRangeval] = useState(null);

  return (
    <div className="items" style={{ display: snap.current ? "flex" : "none" }}>
      <h1>{snap.current}</h1>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <div className="item">
      <label htmlFor="scaleX">Larghezza:</label>
      <input id="scaleX" min="0.1" max="1"  step="0.001" type="range" className="scaleX" 
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["x"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="scaleY">Spessore:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="scaleY" 
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["y"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="scaleZ">Altezza:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="scaleZ" 
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["z"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="transmission">Trasparenza:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="transmission" 
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.props["transmission"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="roughness">Roughness:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="roughness" 
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.props["roughness"] = rangeval
      }}
      />
      </div>
      
    </div>
  )
}

export default function App() {
  return (
    <>
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [0, 0, 2.75] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <Shoe />
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
        </Suspense>
        <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
      </Canvas>
      <Picker />
    </>
  )
}
