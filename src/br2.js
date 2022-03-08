import React, { useRef } from 'react'
import { useGLTF } from 'drei'

export default function Model({ ...props }) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/br2.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-1.35, 0.01, -0.97]}>
        <mesh geometry={nodes.doorm.geometry} material={nodes.doorm.material} />
        <mesh geometry={nodes.doorm_1.geometry} material={nodes.doorm_1.material} />
        <mesh geometry={nodes.cerniere.geometry} material={nodes.cerniere.material} position={[1.35, -0.01, 0.97]} />
        <mesh geometry={nodes.frame.geometry} material={nodes.frame.material} position={[1.35, -0.01, 0.97]} />
        <group position={[1.35, -0.01, 0.97]}>
          <mesh geometry={nodes.panelm.geometry} material={nodes.panelm.material} />
          <mesh geometry={nodes.panelm_1.geometry} material={nodes.panelm_1.material} />
        </group>
        <mesh geometry={nodes.pomello.geometry} material={nodes.pomello.material} position={[1.35, -0.01, 0.97]} />
        <mesh geometry={nodes.walldoor.geometry} material={materials['Material.001']} />
      </group>
      <mesh geometry={nodes.wall.geometry} material={materials.walls} scale={[1.88, 1.29, 1.88]} />
      <mesh geometry={nodes.floor.geometry} material={materials.floor} scale={[1.88, 1.29, 1.88]} />
    </group>
  )
}

useGLTF.preload('/br2.gltf')