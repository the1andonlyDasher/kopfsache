import { useAspect, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { m, useAnimation } from "framer-motion";
import { motion } from "framer-motion-3d";
import { useEffect, useRef, useState } from "react";
import { GLTF } from 'three-stdlib'

interface glProductProps {
    item: any;
    index: number;
}

type GLTFResult = GLTF & {
    nodes: {
        Plane: THREE.Mesh
    }
    materials: {}
}

export function GLPRoduct(props: glProductProps) {
    const r = ((Math.PI * 2) / m.length) * props.index;
    const { size } = useThree()
    const [w, h] = useAspect(size.width, size.height)
    const [model, setModel] = useState(props.item.url)
    const radius = Math.max(1.5, Math.min(w / 2, 2));
    const { scene }: any = useGLTF(model && model) as GLTFResult
    const groupControls = useAnimation();
    const controls = useAnimation();
    const group = useRef<any>(!null)
    const ref = useRef<any>(!null)
    useEffect(() => {
        setModel(props.item.url)
    }, []);
    useGLTF.preload(model)
    return (<>
        {scene &&
            <motion.group
                ref={group}
                dispose={null}>
                <motion.primitive
                    ref={ref}
                    name={props.item.name}
                    transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 100, bounce: 0.25, mass: 0.5, delay: props.index * 0.2 }}
                    object={scene}
                //  position={[0,loc.pathname.includes("/products/") ? (viewport.size.width < 1024 ? -2 : -3.75):y,0]}
                //  position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), -2, Math.sin(r) * radius]}
                />
            </motion.group>
        }
    </>)

}

