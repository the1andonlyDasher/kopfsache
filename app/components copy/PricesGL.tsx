import { Center, Text, Text3D } from "@react-three/drei";
import { useLocation } from "@remix-run/react";
import { FunctionComponent, useEffect, useState } from "react";
import { motion as motion3d } from "framer-motion-3d"
import { useAnimation } from "framer-motion";
import { useThree } from "@react-three/fiber";

interface PricesGLProps {
    margin: number;
}

const contentVariants = {
    initial: { scaleY: 0 },
    enter: { scaleY: 1, transition: { staggerChildren: 0.2, delay: 0.5 } },
    exit: {
        scaleY: 0,
        transition: { staggerChildren: 0.2, staggerDirection: -1 },
    },
};

const PricesGL: FunctionComponent<PricesGLProps> = (props) => {
    const router = useLocation();
    const controls = useAnimation();
    const [disposed, setDisposed] = useState(false);
    const [isInPage, setIsInPage] = useState(false);
    const { width, height } = useThree((state) => state.viewport)
    useEffect(() => {
        if (router.pathname.includes("/prices")) {
            setTimeout(() => {
                setDisposed(false);
                setIsInPage(true);
            }, 1000);
        } else {
            setTimeout(() => {
                controls.start("exit").then(() => {
                    setIsInPage(false), setDisposed(true);
                });
            }, 800);
        }
    }, [router.pathname]);


    useEffect(() => {
        if (isInPage) {
            controls.start("enter");
        }
    }, [isInPage]);
    return (
        <motion3d.group
            variants={contentVariants}
            initial="initial"
            visible={!disposed}
            animate={controls}
            position={[0, 0, -5]}
        >
            {/* <Center top left position={[width / 2 - props.margin, -height / 2 + props.margin, -5]}> */}
            <Center  >
                <Text3D
                    font={"/Khand_Bold.json"}
                    scale={Math.max(0.5, Math.min(width / 2), 1.5)}
                >
                    <meshStandardMaterial color={"#050505"} toneMapped={false} />
                    {`Preise`}
                </Text3D>
            </Center>
        </motion3d.group>);
}

export default PricesGL;