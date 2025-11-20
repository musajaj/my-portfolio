"use client";
import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

const ROTATION_RANGE = 20; // Max rotation in degrees
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

export default function HolographicCard({ children, className }: { children?: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Springs
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Transformations
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale3d(1, 1, 1)`;
  const glareX = useSpring(0, { stiffness: 300, damping: 30 });
  const glareY = useSpring(0, { stiffness: 300, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 300, damping: 30 });
  const glareBackground = useMotionTemplate`radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to card (0 to 1)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (X affects RotateY, Y affects RotateX)
    const rX = (mouseY / height - 0.5) * ROTATION_RANGE * -1; // Invert for natural tilt
    const rY = (mouseX / width - 0.5) * ROTATION_RANGE;

    x.set(rX);
    y.set(rY);

    // Calculate Glare Position
    glareX.set((mouseX / width) * 100);
    glareY.set((mouseY / height) * 100);
    glareOpacity.set(1);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`relative group rounded-3xl transition-all duration-200 ease-out ${className}`}
    >
      {/* The Content Container (Preserves 3D space) */}
      <div className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 bg-zinc-900/40 backdrop-blur-md shadow-2xl">
        {children}
      </div>

      {/* The Holographic Glare Layer (Overlay) */}
      <motion.div
        style={{ background: glareBackground, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0 rounded-3xl z-50 mix-blend-overlay"
      />
    </motion.div>
  );
}