"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  className?: string;
  once?: boolean;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { ease: [0.2, 0.7, 0.2, 1], duration: 1 },
  },
};

export default function Reveal({
  children,
  delay = 0,
  y = 40,
  duration = 1,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={{
        hidden: { opacity: 0, y, filter: "blur(6px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { ease: [0.2, 0.7, 0.2, 1], duration, delay },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export { variants as revealVariants };
