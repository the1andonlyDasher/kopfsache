import React, { useRef, forwardRef, ReactNode, ReactComponentElement, ReactElement, useEffect, MutableRefObject, RefObject } from "react";
import { inView, motion, useAnimation, useAnimationControls, useInView } from "framer-motion";
import { useAtom } from "jotai";
import { loc } from "./atoms";

const section_variants = {
    initial: {
        transition: { staggerChildren: 0.2 },
    },
    enter: {
        transition: { staggerChildren: 0.2, delayChildren: 0.35, when: "beforeChildren" },
    },
    exit: {
        transition: { staggerChildren: 0.2, when: "afterChildren" },
    },
};



type sectionProps = {
    sectionName?: string;
    ref?: any;
    id?: string;
    left?: true | boolean;
    header?: string | number;
    subheader?: string | number;
    text?: string;
    buttonText?: string;
    children?: JSX.Element;
    deskChildren?: JSX.Element;
    background?: JSX.Element;
    sectionClass?: string;
    headerType?: string;
    subheaderType?: string;
}

interface sProps {
    props: sectionProps;
}




function Section({ props }: sProps) {
    const [app, setApp] = useAtom(loc)
    const controls = useAnimationControls();

    const left_variants = {
        initial: { opacity: 0, y: -100 },
        enter: { opacity: 1, y: 0, transition: { ease: "easeIn", duration: .5, staggerChildren: 0.2 } },
        exit: {
            opacity: 0,
            y: 100,
            transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.2 },
        },
    };

    const right_variants = {
        initial: { opacity: 0, y: 100 },
        enter: { opacity: 1, y: 0, transition: { ease: "easeIn", duration: .5, delay: .5, staggerChildren: 0.2 } },
        exit: {
            opacity: 0,
            y: -100,
            transition: { ease: "easeOut", duration: 0.5, staggerChildren: 0.2 },
        },
    };

    return (<>
        <motion.section
            data-section-name={props.sectionName}
            initial="initial"
            animate={controls}
            exit="exit"
            whileInView={"enter"}
            viewport={{ margin: "0px", amount: "some", once: true }}
            ref={props.ref}
            id={props.id}
            variants={section_variants}
            className={props.sectionClass + "" + "overflow-hidden snap-center"}
        // onViewportEnter={(entry) => {
        //     controls.start("enter")
        //     entry?.isIntersecting
        //         ? setApp(
        //             `${entry.target?.getAttribute(
        //                 "data-section-name"
        //             )}`
        //         )
        //         : null;
        // }}
        >
            {props.background}
            <motion.div variants={left_variants} className="lr__wrapper flex-col left-0 top-0 w-full h-full">
                {props.left === true ? (
                    // <motion.div className="hero-grid grid absolute top-0 left-0 w-full h-full grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]">
                    <motion.div className="hero-grid grid flex-[1_1_100%] top-0 left-0 w-full h-full ">
                        <motion.div variants={{ initial: { opacity: 0 }, enter: { opacity: 1 }, exit: { opacity: 0 } }} className="hero-grid_left  grid grid-cols-1 relative justify-center items-center">
                            <motion.div className="img__wrapper flex  top-0 left-0 w-full h-full">
                                {props.children}
                            </motion.div>
                            <motion.div className="grid h-full z-20 ">
                                {props.deskChildren}
                            </motion.div>
                        </motion.div>
                        <motion.div variants={right_variants} className="hero-grid_right  grid grid-cols-1">
                            {props.children}
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div className="hero-grid grid flex-[1_1_100%] top-0 left-0 w-full h-full ">
                        <motion.div className="hero-grid_left  grid grid-cols-1 relative justify-center items-center">
                            {props.children}
                        </motion.div>
                        <motion.div className="hero-grid_right  grid grid-cols-1">
                            <div className="img__wrapper flex top-0 left-0 w-full h-full">
                                {props.children}
                            </div>
                            <div className="grid h-full z-20 ">
                                {props.deskChildren}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </motion.div>
        </motion.section>
    </>
    );
}

const DoubleSec = forwardRef<HTMLElement, sProps>((props, ref) => <Section {...props}>{props.props.children}</Section>);

export default DoubleSec;