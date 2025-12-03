"use client";
import { LayoutTextFlip } from "./ui/layout-text-flip";
import { motion } from "motion/react";
import { useTheme } from "../Context/theme/Themecontext.jsx";
export function LayoutTextFlipDemo() {
  const { darkMode } = useTheme();
  return (
    <div>
      <motion.div className={`${darkMode?"text-white":"text-gray-800"} relative mx-4 my-4 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:mb-0 sm:flex-row`}>
        <LayoutTextFlip
          text="A Picture "
          words={[
            "Worth",
            "Reveals",
            "Encodes",
            "Explains",
            "Contains",
            "Uncovers"
          ]}
        />
      </motion.div>
    </div>
  );
}
