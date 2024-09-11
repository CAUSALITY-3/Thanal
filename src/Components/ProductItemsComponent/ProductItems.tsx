"use client";
import React, { FC, ReactNode } from "react";
import { motion } from "framer-motion";
export const ProductItems = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75, ease: "easeIn" }}
    >
      {children}
    </motion.div>
  );
};
