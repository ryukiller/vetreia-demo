import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "react-three-fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useProxy } from "valtio"
import Menu from "./components/drawer"

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
    roughness: 0.5,
  },
  scale: {
    x: 1,
    y: 1,
    z: 1
  },
})

function Vetreria() {
  const ref = useRef()
  const snap = useProxy(state)
  const snapS = useProxy(statescale)
  // Drei's useGLTF hook sets up draco automatically, that's how it differs from useLoader(GLTFLoader, url)
  // { nodes, materials } are extras that come from useLoader, these do not exist in threejs/GLTFLoader
  // nodes is a named collection of meshes, materials a named collection of materials
  const { nodes, materials } = useGLTF("doccia3.glb")

  // Animate model
  useFrame((state) => {
    //const t = state.clock.getElapsedTime()
    //ref.current.rotation.z = -0.1 - (1 + Math.sin(t / 1.5)) / 20
    //ref.current.rotation.x = Math.cos(t / 4) / 8
    //ref.current.rotation.y = Math.sin(t / 4) / 8
    //ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
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
      <mesh scale={[snapS.scale.x,snapS.scale.y,snapS.scale.z]} geometry={nodes.door_1.geometry} material={nodes.cerniere1.material}  />
      <mesh scale={[snapS.scale.x,snapS.scale.y,snapS.scale.z]} geometry={nodes.door_2.geometry} material={nodes.cerniere1.material} />
      <mesh
        geometry={nodes.pomello.geometry}
        material={materials.pomello}
        position={[0.24, 0.95, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[0.01, 0.03, 0.01]}
      />
      <mesh
        geometry={nodes.cerniere1.geometry}
        material={nodes.cerniere1.material}
        position={[-0.29, 0.42, 0]}
        scale={[1, 1, 0.71]}
      />
      <mesh
        geometry={nodes.cerniereadd.geometry}
        material={nodes.cerniereadd.material}
        position={[-0.29, 1.05, 0]}
        scale={[1, 1, 0.71]}
      />
      <mesh
        geometry={nodes.cerniere2.geometry}
        material={nodes.cerniere2.material}
        position={[-0.29, 1.6, 0]}
        scale={[1, 1, 0.71]}
      />
      <group position={[0.31, 0, -0.2]} scale={[1, 1, 0.64]}>
        <mesh geometry={nodes.panel1_1.geometry} material={nodes.panel1_1.material} />
        <mesh geometry={nodes.panel1_2.geometry} material={nodes.panel1_2.material} />
      </group>
      <group position={[0.31, 1, -0.2]} scale={[1, 0.5, 0.64]}>
        <mesh geometry={nodes.panel2_1.geometry} material={nodes.panel2_1.material} />
        <mesh geometry={nodes.panel2_2.geometry} material={nodes.panel2_2.material} />
        <mesh geometry={nodes.panel2_3.geometry} material={nodes.panel2_3.material} />
      </group>
      <mesh
        geometry={nodes.muras.geometry}
        material={nodes.muras.material}
        position={[0, 0, 0.58]}
        scale={[1, 1.29, 1]}
      />
      <mesh geometry={nodes.muro1.geometry} material={nodes.muro1.material} position={[0, 0, 0.05]} />
      <mesh
        geometry={nodes.muro2.geometry}
        material={nodes.muro2.material}
        position={[0.35, 0, -1.4]}
        rotation={[0, Math.PI / 2, 0]}
      />
    </group>
  )
}

/*function Sphere() {
  const geometry = new THREE.SphereGeometry( 15, 32, 16 );
  const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
  const sphere = new THREE.Mesh( geometry, material );

  return(
    <mesh 
      geometry={geometry} 
      material={material} 
        />
  )


}*/

function Picker() {
  const snap = useProxy(state)
  const [rangeval, setRangeval] = useState(null);

  return (
    <div className="items" style={{ display: snap.current ? "flex" : "none" }}>
      <h1>{snap.current}</h1>
      <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
      <div className="item">
      <label htmlFor="scaleX">Larghezza:</label>
      <input id="scaleX" min="0.1" max="1"  step="0.001" type="range" className="scaleX" value={statescale.scale["x"]}
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["x"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="scaleY">Spessore:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="scaleY" value={statescale.scale["y"]}
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["y"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="scaleZ">Altezza:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="scaleZ" value={statescale.scale["z"]}
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.scale["z"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="transmission">Trasparenza:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="transmission" value={statescale.props["transmission"]}
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.props["transmission"] = rangeval
      }}
      />
      </div>
      <div className="item">
      <label htmlFor="roughness">Roughness:</label>
      <input min="0.1" max="1"  step="0.001" type="range" className="roughness" value={statescale.props["roughness"]}
      onChange={(event) => {
        setRangeval(event.target.value) 
        statescale.props["roughness"] = rangeval
      }}
      />
      </div>
      
    </div>
  )
}

console.log(Math.PI / 2);

export default function App() {
  return (
    <>
      <Canvas concurrent pixelRatio={[1, 1.5]} camera={{ position: [1.5, 1.5, 2.95] }}>
        <ambientLight intensity={0.3} />
        <spotLight intensity={0.3} angle={0.1} penumbra={1} position={[5, 25, 20]} />
        <Suspense fallback={null}>
          <Vetreria />
          <Environment files="royal_esplanade_1k.hdr" />
          <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.8, 0]} opacity={0.25} width={10} height={10} blur={2} far={1} />
        </Suspense>
        <OrbitControls minAzimuthAngle={0.5} maxAzimuthAngle={Math.PI / 2-0.5} maxPolarAngle={Math.PI / 2-0.25} minPolarAngle={0.14}  target={[0,0,0]}  enableZoom={true} enablePan={false} />
      </Canvas>
      <Picker />
      <Menu />
    </>
  )
}

//minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2}
