"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  strength?: number;
  scaleFrom?: number;
  scaleTo?: number;
  rounded?: string;
};

export default function ParallaxImage({
  src,
  alt,
  className = "",
  strength = 20,
  scaleFrom = 1.15,
  scaleTo = 1.02,
  rounded = "rounded-3xl",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${strength}%`, `-${strength}%`]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleFrom, scaleTo, scaleFrom]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${rounded} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
}
