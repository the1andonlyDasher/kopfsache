import { useState } from "react";
import { motion } from "framer-motion";
import { mainTexts } from "./mainTexts";


const tileVariants: any = {
  initial: (i: number) => ({
    scale: 0
  }),
  enter: (i: number) => ({
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      delay: Math.random() * i,
    },
  }),
  exit: (i: number) => ({
    scale: 0,
    transition: {
      type: "spring",
      duration: .5,
      delay: Math.random() * i,
    },
  })
}

const Tile = ({ i, id, children, mainText, fallbacksrc, bgImage, bgPosition }: any) => {

  const [hovering, setHover] = useState<any>(false)
  return (
    <motion.div
      variants={tileVariants}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true }}
      exit="exit"
      className={`bg-cover ${bgPosition}`}
      style={{ backgroundImage: `url('${bgImage}')` }}
      data-maintext={mainText}
      data-fallbacksrc={fallbacksrc}
      id={id}
    >
      {children}
    </motion.div>
  );
};



const tiles = (bgPosition: any, array: any) => {
  const defaultItems = [...Array(array.length)];
  return (
    defaultItems.map((value, i) =>
      <Tile
        key={i}
        id={"tile" + i}
        i={value}
        mainText={mainTexts[i]}
        bgImage={array[i]}
        bgPosition={bgPosition}
      >

      </Tile>
    ))
};

export default function Tiles({ addClass, gridClass, array, perspective, bgPosition }: any) {

  const gridVariants = {
    initial: { transition: { staggerChildren: 0.2 } },
    enter: { transition: { staggerChildren: 0.2 } },
    exit: { transition: { staggerChildren: 0.2 } },
  }

  return (
    <>
      {perspective === true ? (
        <motion.div variants={gridVariants} className={`container ${addClass}`}>
          <motion.div variants={gridVariants} className="feature-grid-container grid grid--columns">
            <motion.div variants={gridVariants} className={`grid ${gridClass}`}>
              {tiles(bgPosition, array)}
            </motion.div>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div variants={gridVariants} className={`container ${addClass}`}>
          <motion.div variants={gridVariants} className="relative w-full h-full grid grid--columns">
            <motion.div variants={gridVariants} className={`grid ${gridClass}`}>
              {tiles(bgPosition, array)}
            </motion.div>
          </motion.div>
        </motion.div>
      )}

    </>
  );
}
