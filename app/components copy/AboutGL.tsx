import * as THREE from "three"
import React, { useEffect, useRef, useState } from "react"
import { useGLTF, useAnimations, PerspectiveCamera, useAspect, useScroll } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import scene from "../models/scene2.glb"
import { useAtom } from "jotai"
import { globalScroll } from "./atoms"
import { motion } from "framer-motion-3d"
import { useAnimation, useAnimationControls, useIsPresent } from "framer-motion"
import { useLocation } from "@remix-run/react"

const color = new THREE.Color()

export default function Model({  ...props }:any) {
  const { size } = useThree()
  const [active, setActive] = useState(false)
  size.updateStyle = true;
  const [loaded, setLoaded] = useState(false)
  const [w, h] = useAspect(size.width, size.height)
  const [gScroll, setgScroll] = useAtom(globalScroll)
  const location = useLocation()
  const group = useRef<any>(!null)
  const { nodes, materials, animations }:any = useGLTF(scene)
  const { actions }:any = useAnimations(animations, group)
  const extras = { receiveShadow: false, castShadow: false, "material-envMapIntensity": 0.2 }
  useEffect(() => { (actions["CameraAction"].reset().fadeIn(0.5).play().paused = true), setLoaded(true)}, [])
  useEffect(()=>{

    if(location.pathname === "/about" && loaded === true){
      setActive(true)
      controls.start({scale:1})
    } else {
      setActive(false)
      controls.start({scale:0})
    }
  },[location, loaded])

  useFrame((state, delta) => {
    actions["CameraAction"].time = THREE.MathUtils.lerp(actions["CameraAction"].time, actions["CameraAction"].getClip().duration * gScroll.current, 0.05)
    group.current.children[0].children.forEach((child:any, index:number) => {
      const et = state.clock.elapsedTime
       child.position.y = Math.sin((et + index * 2000) / 2) * 1
       child.rotation.x = Math.sin((et + index * 2000) / 3) / 40
       child.rotation.y = Math.cos((et + index * 2000) / 2) / 40
       child.rotation.z = Math.sin((et + index * 2000) / 3) / 40
    })
  })

  const f = Math.min(Math.max(.5 * (w / 20), 0.5), 1)

  const controls = useAnimationControls()

  return (
    <motion.group ref={group} {...props} dispose={null} >
      <motion.group
        initial={{scale:0}}
        animate={controls} 
        exit={{scale:0}}
        // onPointerOver={(e:any) => (e.stopPropagation(), set(e.object.name))}
        // onPointerOut={(e:any) => (e.stopPropagation(), set(undefined))}
        position={[0.06, 4.04, 0.35]}>
        <mesh name="comb" geometry={nodes.comb.geometry} material={materials.dark_material} {...extras} />
        <mesh name="seat" geometry={nodes.seat.geometry} material={materials.dark_material} {...extras} />
        <mesh name="scissor1" geometry={nodes.scissor1.geometry} material={materials.dark_material} {...extras} />
        <mesh name="scissor2" geometry={nodes.scissor2.geometry} material={materials.dark_material} {...extras} />
        <mesh name="hairdryer" geometry={nodes.hairdryer.geometry} material={materials.dark_material} {...extras} />
        <mesh name="razor" geometry={nodes.razor.geometry} material={materials.dark_material} {...extras} />
        <mesh name="brush" geometry={nodes.brush.geometry} material={materials.dark_material}/>
        <mesh name="chair" geometry={nodes.chair.geometry} material={materials.dark_material}/>
        <mesh name="light" geometry={nodes.light.geometry} material={materials.dark_material}/>
        <mesh name="shaver" geometry={nodes.shaver.geometry} material={materials.dark_material}/>
      </motion.group>
      <group name="Camera" position={[60,-85,53]} rotation={[1.62, 0.01, 0.11]}>
        <PerspectiveCamera makeDefault={active} far={100} near={0.1} fov={22.9} rotation={[-Math.PI / 2, 0, 0]}>
          <directionalLight
            // castShadow
            position={[10, 20, 15]}
            // shadow-camera-right={8}
            // shadow-camera-top={8}
            // shadow-camera-left={-8}
            // shadow-camera-bottom={-8}
            // shadow-mapSize-width={1024}
            // shadow-mapSize-height={1024}
            // shadow-bias={-0.0001}
            intensity={2}
          />
        </PerspectiveCamera>
      </group>
    </motion.group>
  )
}

useGLTF.preload(scene)
