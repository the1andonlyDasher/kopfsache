import { FunctionComponent, useEffect, useState } from "react";
import { useLocation } from "@remix-run/react";
import { Model } from "~/head";
import { motion as motion3d } from "framer-motion-3d"


interface HeadProps {

}

const Head: FunctionComponent<HeadProps> = (props) => {
    const loc = useLocation()

    return (
        <motion3d.group transition={{ type: "spring", stiffness: 50, damping: 10, restDelta: 0.1 }}>
            <motion3d.group animate={{ rotateY: Math.PI / 2, transition: { repeat: Infinity, repeatType: "reverse", type: "spring", stiffness: 200 } }}>
                <Model />
            </motion3d.group>
        </motion3d.group>
    );
}

export default Head;