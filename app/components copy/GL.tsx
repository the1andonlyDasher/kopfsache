import * as THREE from "three";
import { Bounds, Center, Environment, useAspect, useGLTF } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useAtom } from "jotai";
import { useEffect, useRef, Suspense, useState, useMemo, forwardRef } from "react";
import { globalLoaded, loadManager, model, productViewer } from "./atoms";
import { motion as motion3d } from "framer-motion-3d"
import { motion, useAnimation, useAnimationControls } from "framer-motion";
import AboutGL from "./AboutGL";
import { ReactThreeFiber, extend, } from '@react-three/fiber';
import * as geometry from "maath/geometry";
import { RoundedPlaneGeometry } from 'maath/geometry';
import { useLocation as useLoc } from "@remix-run/react";
import { Model } from "~/head";
import { FunctionComponent } from "react";
import { useLocation } from "@remix-run/react";
import { easing } from "maath";
import PricesGL from "./PricesGL";





interface HeadProps {

}





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

interface GLProps {
    position: any;
    fov: 15;
    eventSource: any;
}

function GL(props: GLProps) {
    const [m, setM] = useAtom(model)
    const loc = useLoc()
    const [models, setModels] = useState<any>(m)
    const [gLoaded, setGLoaded] = useAtom(globalLoaded)
    const [man, setManager] = useAtom(loadManager);
    const [loaded, setLoaded] = useState(false)
    const bar = useRef<any>(!null)
    const cover_controls = useAnimation();

    useEffect(() => {
        // console.log(gLoaded)
        gLoaded && cover_controls.start({ opacity: 0, transition: { type: "tween", ease: "easeOut" } }).then(() => { cover_controls.start({ display: "none" }) })

    }, [gLoaded])

    const Head: FunctionComponent<HeadProps> = (props) => {
        const loc = useLocation()
        const { viewport, size } = useThree();
        const [w, h] = useAspect(size.width, size.height)
        const [pvAtom, setPVAtom] = useAtom(productViewer)
        const [pos, setPos] = useState([])
        const group = useRef<any>()
        const light = useRef<any>()

        useFrame((state, delta) => {
            group &&
                w > 880 ?
                easing.dampE(group.current.rotation, [0, state.pointer.y * (Math.PI / 4), 0], 1.5, delta)
                :
                easing.dampE(group.current.rotation, [0, -state.pointer.x * (Math.PI / 4), 0], 1.5, delta)

            easing.damp3(group.current.position, [0, 0, 0 - Math.abs(state.pointer.x / 2)], 1, delta)
            easing.damp3(light.current.position, [state.pointer.x * 12, 0, 8 + state.pointer.y * 4], 0.2, delta)
        })

        useEffect(() => {

            const position: any =
                [
                    (((pvAtom?.width) / window.innerWidth) * viewport.width) / 2 -
                    viewport.width / 2 +
                    ((pvAtom?.left) / window.innerWidth) * viewport.width,
                    -1 -
                    (((pvAtom?.height) / window.innerHeight) * viewport.height) / 2 +
                    viewport.height / 2 -
                    (pvAtom?.top / window.innerHeight) * viewport.height,
                    0,
                ];
            setPos(position)

        }, [pvAtom]);

        const headControls = useAnimation()

        useEffect(() => {
            headControls.start(loc.pathname === "/" || "/prices" ? { scale: 1 } : { scale: 0 })
        }, [loc.pathname])

        useEffect(() => {
            headControls.start({ x: pos[0], y: pos[1], z: pos[2], transition: { type: "spring", damping: 10, stiffness: 50 } })
        }, [pos])
        return (<>
            <motion3d.group rotation={[0, Math.PI / 2, 0]} initial={{ scale: 0 }} animate={headControls}>
                {/* <motion3d.group ref={group} animate={{ rotateY: Math.PI, transition: { repeat: Infinity, repeatType: "reverse", type: "spring", stiffness: 50, restDelta: 0.1, damping: 50 } }}> */}
                <motion3d.group ref={group}>
                    <Model scale={loc.pathname === "/" ? 0.45 : loc.pathname === "/prices" ? 0.35 : 0} />
                </motion3d.group>
            </motion3d.group>
            <spotLight angle={0.5} penumbra={0.5} ref={light} castShadow intensity={100} color={"#fff"} shadow-mapSize={1024} shadow-bias={-0.001}>
                <orthographicCamera attach="shadow-camera" args={[-10, 10, -10, 10, 0.1, 50]} />
            </spotLight>
        </>
        );
    }

    const Shop = () => {
        const [initiated, initiate] = useState<any>(false);
        const [pvAtom, setPVAtom] = useAtom(productViewer)
        const [pos, setPos] = useState()
        const group = useRef<any>()
        const { viewport } = useThree();

        useEffect(() => {
            if (loc.pathname === "/collections/kopfsache") {
                const position: any =
                    [
                        (((pvAtom?.width) / window.innerWidth) * viewport.width) / 2 -
                        viewport.width / 2 +
                        ((pvAtom?.left) / window.innerWidth) * viewport.width,
                        -1 -
                        (((pvAtom?.height) / window.innerHeight) * viewport.height) / 2 +
                        viewport.height / 2 -
                        (pvAtom?.top / window.innerHeight) * viewport.height,
                        0,
                    ];
                setPos(position)
            }
        }, [pvAtom]);

        useEffect(() => {
            setModels(m)
            models && setLoaded(true)
            // console.log(models)
        }, [])

        return (
            <Suspense fallback={null}>
                <motion3d.group ref={group} position={pos} >
                    {m.map((item: any, index: any) =>
                        <P key={item.name + index} item={item} index={index + 1} />
                    )}
                </motion3d.group>
            </Suspense>
        )
    }




    function P({ item, index }: productProps) {
        const r = ((Math.PI * 2) / m.length) * index;
        const [pvAtom, setPVAtom] = useAtom(productViewer)

        const { size } = useThree()
        const { viewport } = useThree();
        const [w, h] = useAspect(size.width, size.height)
        const radius = w / 3;
        const ref = useRef<any>(!null)
        const group = useRef<any>(!null)
        const { scene }: any = useGLTF(item.url, true, undefined, (loader: any) => {
            loader.manager.onStart = function (url: any, itemsLoaded: any, itemsTotal: any) { console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.'); };
            loader.manager.onLoad = function () { setGLoaded(true) };
        })
        const controls = useAnimationControls()
        const y = -1 * Math.max((Math.min(0.5, Math.min(w / 4, 2))) - 1.25 / (w / 4), -2);

        useEffect(() => {
            if (loaded === true) {
                if (loc.pathname.includes(`/${item.name}`)) {
                    controls.start({ scale: (viewport.width < 1024 ? Math.max(2, Math.min(w / 4, 3)) : Math.max(1.35, Math.min(w / 4, 2.5))), transition: { duration: 1, type: "spring" } })
                } else {
                    if (loc.pathname.includes(`/collections/${item.collection}`)) {

                        controls.start({ scale: Math.max(0.75, Math.min(w / 4, 1)) })
                    } else {
                        controls.start({ scale: 0 })
                    }
                }
            }
        }, [loc, w])

        const [pos, setPos] = useState()

        useEffect(() => {
            if (loc.pathname.includes(`/${item.name}`)) {
                const position: any =
                    [
                        (((pvAtom?.width) / window.innerWidth) * viewport.width) / 2 -
                        viewport.width / 2 +
                        ((pvAtom?.left) / window.innerWidth) * viewport.width,
                        0 -
                        (((pvAtom?.height * 2) / window.innerHeight) * viewport.height) / 2 +
                        viewport.height / 2 -
                        (pvAtom?.top / window.innerHeight) * viewport.height,
                        0,
                    ];
                setPos(position)

            }
            console.log(viewport)
        }, [pvAtom]);

        useFrame((state, delta) => {
            group.current.rotation.y += delta * 0.1
            ref.current.rotation.y -= delta * 0.1
            if (loc.pathname.includes("/collections/")) {

            }
            if (loc.pathname.includes(item.name)) {
                ref.current.rotation.y -= delta * 0.1
            }
        })

        return (
            <>

                <motion3d.group
                    position={pos ? pos : [Math.cos(r) * radius, 0, Math.sin(r)]}
                    ref={group}
                    dispose={null}>

                    <motion3d.primitive
                        ref={ref}
                        name={item.name}
                        initial={{ scale: 0 }}
                        animate={controls}
                        transition={{ duration: 0.5, type: "spring", stiffness: 500, damping: 100, bounce: 0.25, mass: 0.5, delay: index * 0.2 }}
                        object={scene} />
                </motion3d.group>

            </>
        )
    }

    const canvasWrapper = useRef<any>(!null)


    return (<>
        <motion.div animate={cover_controls} className="fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center bg-[#111]">
            <motion.div className="width-[100%] height-[100%] max-h-[400px] max-w-[400px] p-8 flex flex-col justify-center items-center">
                <h1>KOPFSACHE</h1>
                <motion.div className="w-full h-[10px]">
                    <motion.div ref={bar} className="w-0 h-full bg-[#ffffff]"></motion.div>
                </motion.div>
            </motion.div>
        </motion.div>
        {/* <div ref={canvasWrapper} className='canvas__wrapper' style={{zIndex: loc.pathname.includes("/shop") ? 100 : -1}}> */}
        <div ref={canvasWrapper} className='canvas__wrapper' >
            <Canvas gl={{ antialias: true }} camera={{ position: [2, 3, 20.5], fov: props.fov, }} eventPrefix="client" eventSource={props.eventSource}>
                <color attach={"background"} args={["#111111"]} />
                <Environment preset="city" />
                {/* <ambientLight intensity={10} color="#fff" />
                <directionalLight intensity={10} color="#fff" />
                <pointLight color={"#f9b58e"} intensity={100} position={[10, 0, 0]} />
                <pointLight color={"#fff"} intensity={100} position={[0, 20, 0]} />
                <pointLight color={"#8ed9f9"} intensity={100} position={[-10, 0, 0]} /> */}

                <Shop />

                <Head />
                {loc.pathname.includes("/about") && <AboutGL />}
                {<PricesGL margin={0.2} />}
                {/* {loc.pathname.includes("/shop") && <Rig />} */}
            </Canvas>
        </div>
    </>
    )

}

type sProps = {

}

const FwdGL = forwardRef<HTMLElement, GLProps>((props, ref) => <GL  {...props} />);

export default FwdGL;