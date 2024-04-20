"use client"

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
      <motion.div className="carousel">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          ref={carousel}
          className="child"
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
};
