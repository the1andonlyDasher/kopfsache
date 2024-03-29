import React, { useRef, forwardRef, ReactNode, ReactComponentElement, ReactElement } from "react";
import { motion } from "framer-motion";

const section_variants = {
    initial: {
        transition: { staggerChildren: 0.2 },
    },
    enter: {
        transition: { staggerChildren: 0.2, delayChildren: 0.35 },
    },
    exit: {
        transition: { staggerChildren: 0.2 },
    },
};

const header_variants = {
    initial: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: { ease: "easeIn", duration: 0.5, delay: 0.5 },
    },
    exit: {
        opacity: 0,
        transition: { ease: "easeOut", duration: 0.5 },
    },
};

type sectionProps = {
    sectionName?: string;
    ref?: any
    id?: string;
    left?: true | boolean;
    header?: string | number;
    subheader?: string | number;
    text?: string;
    buttonText?: string;
    children?: JSX.Element;
    deskChildren?: JSX.Element;
    sectionClass?: string;
    headerType?: string;
    subheaderType?: string;
}

interface sProps {
    props: sectionProps;
}

function Section({ props }: sProps) {

    return (<>
        <motion.section
            data-section-name={props.sectionName}
            initial="initial"
            whileInView="enter"
            viewport={{ margin: "100px 0px 100px 0px" }}
            exit="exit"
            ref={props.ref}
            id={props.id}
            variants={section_variants}
            className={props.sectionClass}
        >
            <motion.div className="lr__wrapper relative">
                {props.left === true ? (
                    // <motion.div className="hero-grid grid absolute top-0 left-0 w-full h-full grid-cols-[repeat(auto-fit,_minmax(230px,_1fr))]">
                    <motion.div className="hero-grid grid absolute top-0 left-0 w-full h-full ">
                        <motion.div className="hero-grid_left sec-pad_left grid grid-cols-1 relative justify-center items-center p-5">
                            <div className="img__wrapper flex absolute top-0 left-0 w-full h-full">
                                {props.children}
                            </div>
                            <div className="z-10">
                                {props.header ? (                                
                                    <motion.h4 className="text-[#c7c7c7]" variants={header_variants}>{props.subheader}</motion.h4>
                                ) : null}
                                {props.header ? (
                                    <motion.h1 variants={header_variants}>{props.header}</motion.h1>
                                ) : null}
                                {props.text ? (
                                    <motion.p variants={header_variants}>{props.text}</motion.p>
                                ) : null}
                                {props.buttonText ? (<button className="btn__primary" type="button">{props.buttonText}</button>) : null}
                                {props.deskChildren}        
                            </div>

                        </motion.div>
                        <motion.div className="hero-grid_right sec-pad_right grid grid-cols-1 p-5">

                            {props.children}

                        </motion.div>
                    </motion.div>
                ) : (
<motion.div className="hero-grid grid absolute top-0 left-0 w-full h-full ">
                        <motion.div className="hero-grid_left sec-pad_left grid grid-cols-1 relative justify-center items-center p-5">
                        {props.children}
                        </motion.div>
                        <motion.div className="hero-grid_right sec-pad_right grid grid-cols-1 p-5">
                        <div className="img__wrapper flex absolute top-0 left-0 w-full h-full">
                                {props.children}
                            </div>
                            <div className="z-10">
                                {props.header ? (
                                    <motion.h4 className="text-[#c7c7c7]" variants={header_variants}>{props.subheader}</motion.h4>
                                ) : null}
                                {props.header ? (
                                    <motion.h1 variants={header_variants}>{props.header}</motion.h1>
                                ) : null}
                                {props.text ? (
                                    <motion.p variants={header_variants}>{props.text}</motion.p>
                                ) : null}
                                {props.buttonText ? (<button className="btn__primary" type="button">{props.buttonText}</button>) : null}
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

const Sec = forwardRef<HTMLElement, sProps>((props, ref) => <Section {...props}>{props.props.children}</Section>);

export default Sec;