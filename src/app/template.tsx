"use client";
import { AnimatePresence, motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5, ease: "easeIn" } }}
        exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
        // style={{ width: "100vw" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
