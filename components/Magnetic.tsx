"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function Magnetic({ children }: { children?: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Physics settings: Stiffness (tension) and Damping (friction)
  // These values give it the "heavy" but fluid magnetic feel.
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;

    const { height, width, left, top } = ref.current.getBoundingClientRect();

    // Calculate distance from center
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Move the element only a fraction of the distance (0.3 = 30% magnetic pull)
    x.set(middleX * 0.3);
    y.set(middleY * 0.3);
  };

  const handleMouseLeave = () => {
    // Snap back to center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block" // Ensures it wraps content tightly
    >
      {children}
    </motion.div>
  );
}