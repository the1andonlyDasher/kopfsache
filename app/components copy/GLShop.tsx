import * as THREE from "three";
import { Bounds, Center, Environment, Float, GradientTexture, Grid, SpotLight, Text3D, useAspect, useGLTF } from "@react-three/drei";
import { Canvas, Vector3, Vector3Props, useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef, Suspense, useState, useMemo, forwardRef } from "react";
import { globalLoaded, loadManager, model, pDisplay } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import { motion, useAnimation, useAnimationControls } from "framer-motion";
import AboutGL from "./AboutGL";
import { ReactThreeFiber, extend, } from '@react-three/fiber';
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from 'maath/geometry';
import { useLocation as useLoc } from "@remix-run/react";
import { r3f } from "~/helpers/global";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            roundedPlaneGeometry: ReactThreeFiber.Object3DNode<RoundedPlaneGeometry, typeof RoundedPlaneGeometry>
        }
    }
}

extend(geometry)

interface productProps {
    index: number;
    item: {
        name: string,
        url: string,
        collection: string
    };
};



export function GLShop({ position = new THREE.Vector3(2, 3, 20.5), fov = 15, w = 0.7, gap = 0.15 }) {
    const canvasWrapper = useRef<any>(!null)
    const [m, setM] = useAtom(model)
    const loc = useLoc()
    const [models, setModels] = useState<any>(m)
    const [gLoaded, setGLoaded] = useAtom(globalLoaded)
    const [man, setManager] = useAtom(loadManager);
    const [loaded, setLoaded] = useState(false)
    const bar = useRef<any>(!null)
    const cover_controls = useAnimation();

    useEffect(() => {
        // console.log(models)
        gLoaded && cover_controls.start({ opacity: 0, transition: { type: "tween", ease: "easeOut" } }).then(() => { cover_controls.start({ display: "none" }) })

    }, [gLoaded])


    const Shop = () => {
        const [initiated, initiate] = useState<any>(false);

        useEffect(() => {
            setModels(m)
            models && setLoaded(true)
            // console.log(models)
        }, [])

        return (

            <Bounds>
                {m.map((item: any, index: any) =>
                    <P key={item.name + index} item={item} index={index + 1} />
                )}
            </Bounds>

        )
    }




    function P({ item, index }: productProps) {
        const r = ((Math.PI * 2) / m.length) * index;
        const [p, setP] = useAtom(pDisplay)
        const [display, setDisplay] = useState(p)
        const { size } = useThree()
        const { viewport } = useThree();
        const [w, h] = useAspect(size.width, size.height)
        const radius = Math.max(1.5, Math.min(w / 2, 2));
        const ref = useRef<any>(!null)
        const group = useRef<any>(!null)
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { setGLoaded(true) };
        })
        const controls = useAnimationControls()


        useEffect(() => {
            if (loaded === true) {
                if (loc.pathname.includes(`/${item.name}`)) {
                    controls.start({ scale: 1, x: (viewport.width < 1024 ? 0 : 0 - w / 4), z: 0, y: 0, transition: { duration: 1, type: "spring" } })
                } else {
                    if (loc.pathname.includes(`/collections/${item.collection}`)) {
                        controls.start({ scale: 1, x: Math.cos(r) * radius, z: Math.sin(r) * radius })
                    } else {
                        controls.start({ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r) * radius })
                    }
                }
            }
        }, [])


        useEffect(() => {
            const varyingNum = 1 * (4 - Math.max(1.5, Math.min(w / 3, 4)))
            if (loaded === true) {
                if (loc.pathname.includes(`/${item.name}`)) {
                    controls.start({ scale: (viewport.width < 1024 ? Math.max(2, Math.min(w / 4, 3)) : Math.max(1.35, Math.min(w / 4, 2.5))), x: (viewport.width < 1024 ? 0 : 0 - w / 4), z: 0, y: (viewport.width < 1024 ? -0.5 : -2), transition: { duration: 1, type: "spring" } })
                } else {
                    if (loc.pathname.includes(`/collections/${item.collection}`)) {

                        controls.start({ scale: 0.85, x: Math.cos(r) * radius, z: Math.sin(r) * radius })
                    } else {
                        controls.start({ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r) * radius })
                    }
                }
            }

            console.log()
        }, [loc, w])




        useFrame((state, delta) => {
            if (loc.pathname.includes("/collections/")) {
                group.current.rotation.y += delta * 0.1
                ref.current.rotation.y -= delta * 0.1
            }
            if (loc.pathname.includes(item.name)) {
                ref.current.rotation.y -= delta * 0.1
            }
        })

        return (
            <>
                <motion3d.group
                    scale={Math.max(0.35, Math.min(w / 4, 0.5 + w / 10))}
                    ref={group}
                    dispose={null}
                >
                    <motion3d.primitive
                        ref={ref}
                        name={item.name}
                        initial={{ scale: 0, x: Math.cos(r) * radius, z: Math.sin(r), y: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 100, bounce: 0.25, mass: 0.5, delay: index * 0.2 }}
                        object={scene}
                    //  position={[0,loc.pathname.includes("/products/") ? (viewport.size.width < 1024 ? -2 : -3.75):y,0]}
                    //  position={[(viewport.size.width < 768 ? 0 : Math.cos(r) * radius + w / 4), -2, Math.sin(r) * radius]}
                    />
                </motion3d.group>
            </>
        )
    }



    return (

        <Shop />

    )

}

