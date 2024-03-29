import React, { FunctionComponent, useState } from "react";
import { motion } from "framer-motion";
import { mainTexts } from "./mainTexts";
import { sideTexts } from "./sideTexts";

interface TileProps {
  id?: any;
  mainText?: any;
  sideText?: any;
  index?: any;
}

const TileHero: FunctionComponent<TileProps> = ({ id, mainText, sideText }) => {
  const variants = {
    initial: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };
  return (
    <>
      <motion.div
        className="tileHero"
        id={id}
        variants={variants}
        initial="initial"
        transition={{
          type: "spring",
          velocity: "10",
          stiffness: 1000,
          restSpeed: 0.5,
          duration: 1,
          delay: 1,
        }}
      >
        <h3>{sideText}</h3>
        <h1 data-before={mainText}>{mainText}</h1>
      </motion.div>
    </>
  );
};

const TileHeros = () => {
  const defaultItems = [...Array(8)];
  const [items] = useState(defaultItems);
  return (
    <>
      {items.map((_, index) => (
        <TileHero
          mainText={mainTexts[index]}
          sideText={sideTexts[index]}
          id={"tile" + index + "hero"}
          key={index}
          index={index}
        />
      ))}
    </>
  );
};

export { TileHeros, TileHero };
