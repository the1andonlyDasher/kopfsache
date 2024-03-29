import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { useAtom } from "jotai";
import { currentSection } from "./atoms";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      transition:{ease:"backIn"}
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    };
  }
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Carousel = ({ input }: { input: any }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionCurrent, setSection] = useAtom(currentSection)

  useEffect(()=>{

  },[])

  const handleClick = () => {
    if(typeof window !== "undefined" || null){
      document.getElementById(`${Object.keys(input[imageIndex])}`)?.scrollIntoView()
    }
  }

  const handleNext = () => {
    paginate(1)
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === input.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    paginate(-1)
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? input.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const imageIndex = wrap(0, input.length, page);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction}>

        <motion.div
          className="w-full h-full top-0 left-0 flex justify-center items-center absolute"
        >
          <motion.li
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="px-6 list-none" onClick={handleClick}>{`${Object.values(input[imageIndex]).map((item: any) => Object.values(item)[0])}`}</motion.li>
        </motion.div>

      </AnimatePresence>
      <div className="next" onClick={handleNext}>
        <svg className="rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 96 960 960"
          width="20"
        >
          <path fill="white" d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
        </svg>
      </div>
      <div className="indicator">
        {input.map((_: any, index: number) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></div>
        ))}
      </div>
      <div className="prev" onClick={handlePrevious}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 96 960 960"
          width="20"
        >
          <path fill="white" d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
        </svg>
      </div>
    </>
  );
};
