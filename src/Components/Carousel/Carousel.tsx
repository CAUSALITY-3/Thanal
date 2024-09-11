"use client";

import { FC, ReactNode, useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import "./Carousel.css";

interface Props {
  children?: ReactNode;
  type?: string;
}

export const Carousel: FC<Props> = ({ children }) => {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [children]);

  return (
    <>
      <motion.div id="carousel">
        <motion.div
          drag="x"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          dragConstraints={{ right: 0, left: -width }}
          ref={carousel}
          id="carousel-child"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
