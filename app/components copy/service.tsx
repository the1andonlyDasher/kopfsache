import { forwardRef, useState } from "react";
import Section from "./Section";
import { AnimationProps, Variant, Variants, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";

type serviceType = {
    title?: string;
    description?: string;
    cost?: string | number;
    duration?: string | number;
    variants?: Variants;
}

interface serviceProps {
    props: serviceType;
}

const priceVariants: any = {
    initial: { opacity: 0, x: -10 },
    enter: { opacity: 1, x: 0, transition: { staggerChidlren: 0.2, when: "beforeChildren" } },
    exit: { opacity: 0, x: 10, transition: { staggerChidlren: 0.2, when: "afterChildren" } },
}

const arrow_variants = {
    closed: { rotate: "0deg" },
    open: { rotate: "180deg" },
};

const desc_variants = {
    closed: { gridTemplateRows: "0fr", opacity: 0, marginTop: 0, paddingTop: 0 },
    open: { gridTemplateRows: "1fr", opacity: 1, marginTop: "0.75rem", paddingTop: "0.75rem" }
}

const ServiceBasic = ({ props }: serviceProps) => {
    const [click, setClicked] = useState(false);
    return (<>
        <motion.div variants={priceVariants} className="p-4 my-2 bg-[#050505] border border-[#222] h-full grid grid-cols-1 md:grid-cols-2 justif-start grid-rows-1 gap-x-4 rounded-md hover:bg-black">
            <motion.dl className="flex flex-col mb-auto">
                <motion.div
                    onClick={() => { setClicked(!click) }}
                    className="flex gap-6 cursor-pointer justify-start flex-row items-center">
                    <h4 className="m-0 w-auto text-slate-400">
                        {props.title}
                    </h4>
                    <motion.div
                        className="w-4 h-4 origin-center"
                        variants={arrow_variants}
                        animate={click ? "open" : "closed"}>
                        <FontAwesomeIcon icon={faChevronDown} scale={5} />
                    </motion.div>
                </motion.div>
            </motion.dl>
            <motion.dl className="flex pt-4 mt-4 md:m-0 md:p-0 flex-row  md:justify-center items-center gap-2 border-t border-[#222] md:border-none">
                <h4 className="m-0 text-center ">{props.cost}</h4>|<p className="m-0 text-center">{props.duration}</p>
            </motion.dl>
            <motion.div variants={desc_variants} animate={click ? "open" : "closed"} className="grid overflow-hidden w-full col-span-1 md:col-span-2 border-t border-stone-950 justify-items-center items-center">
                <p className="m-0 overflow-hidden ">{props.description}</p>
            </motion.div>
        </motion.div>
    </>)
}

const Service = forwardRef<HTMLElement, serviceProps>((props, ref) => <ServiceBasic {...props}></ServiceBasic>);

export default Service;