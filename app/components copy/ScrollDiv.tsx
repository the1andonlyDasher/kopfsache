import { motion, useAnimationControls } from "framer-motion";
import { forwardRef } from "react";

type divProps = {
    children?: any;
    height?: any;
    id?: string;
    ref?:any
}

interface Props {
    props: divProps
}

function ScrollDiv({ props }: Props) {
    const controls = useAnimationControls();

    const divVariants = {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 },
    }

    const innerDivVariants = {
        initial: { y: 100, opacity: 0 },
        enter: { y: 0, opacity: 1 },
        exit: { y: -100, opacity: 0 }
    }

    return (<>
        <motion.div
            variants={divVariants}
            initial="initial"
            exit="exit"
            animate={controls}
            onViewportEnter={() => controls.start("enter")}
            viewport={{ margin: "100px", amount: "some", once:true }}
            transition={{ease:"easeInOut", duration: 0.75, }}
            style={{height:`${props.height}`}}
            ref={props.ref}
            id={props.id}
        >
            <motion.div variants={innerDivVariants} transition={{ ease:"easeIn", delay: .5 }} className="dot border-l border-[#222]">
                {props.children}
            </motion.div>
        </motion.div></>);
}

export const SDiv = forwardRef<HTMLDivElement, Props>((props, ref) => <ScrollDiv {...props}>{props.props.children}</ScrollDiv>);

