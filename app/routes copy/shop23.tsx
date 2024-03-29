import * as THREE from 'three'
import { useEffect, useRef, useState } from 'react'
import { Canvas, ReactThreeFiber, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { easing } from 'maath'
import * as geometry from "maath/geometry";

import { useNavigate, useParams } from '@remix-run/react'
import { RoundedPlaneGeometry } from 'maath/geometry'



extend(geometry.RoundedPlaneGeometry)

declare global {
    namespace JSX {
      interface IntrinsicElements {
        roundedPlaneGeometry: ReactThreeFiber.Object3DNode<RoundedPlaneGeometry, typeof RoundedPlaneGeometry>
      }
    }
  }

export const App = () => (
  <Canvas camera={{ fov: 75, position: [0, 0, 20] }}  eventPrefix="client">
    <color attach="background" args={['#f0f0f0']} />
    <Frame id="01" name={`pick\nles`} author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
      <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
    </Frame>
    <Frame id="02" name="tea" author="Omar Faruq Tawsif">
      <Gltf src="fiesta_tea-transformed.glb" position={[0, -2, -3]} />
    </Frame>
    <Frame id="03" name="still" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
      <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
    </Frame>
    <Rig />
  </Canvas>
)

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }:any) {
  const portal = useRef<any>(!null)
  const navigate = useNavigate()
  const {itemId}:any = useParams()
  const [hovered, hover] = useState(false)
  useCursor(hovered)
  useFrame((state, dt) => easing.damp(portal.current, 'blend', itemId === id ? 1 : 0, 0.2, dt))
  return (
    <group {...props}>
      <Text font={"/fonts/economica-v13-latin-700.woff"} fontSize={0.3} anchorY="top" anchorX="left" lineHeight={0.8} position={[-0.375, 0.715, 0.01]} material-toneMapped={false}>
        {name}
      </Text>
      <Text font={"/fonts/economica-v13-latin-700.woff"} fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      <Text font={"/fonts/economica-v13-latin-700.woff"} fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), navigate('/item/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
        <roundedPlaneGeometry args={[width, height, 0.02]} />
        <MeshPortalMaterial ref={portal} events={itemId === id} side={THREE.DoubleSide}>
          <color attach="background" args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  )
}

function Rig({ position = new THREE.Vector3(0, 0, 2), focus = new THREE.Vector3(0, 0, 0) }) {
  const { controls, scene }:any = useThree()
  const {id}:any = useParams()
  useEffect(() => {
    console.log(id)
    const active:any = scene.getObjectByName(id)
    if (active) {
      active.parent.localToWorld(position.set(0, 0.5, 0.25))
      active.parent.localToWorld(focus.set(0, 0, -2))
    }
    controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
  })
  return <CameraControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 2} />
}
