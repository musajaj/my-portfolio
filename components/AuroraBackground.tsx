import React from 'react';
import { motion } from 'framer-motion';

export const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-zinc-950">
      {/* The Noise Texture */}
      <div 
        className="absolute inset-0 z-[1] opacity-20 pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}
      ></div>

      {/* Blob 1: Blue (Top Left) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-blue-600/30 rounded-full blur-[100px]"
      />

      {/* Blob 2: Purple (Bottom Right) */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, -90, 0],
          x: [0, -50, 0],
          y: [0, -100, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-600/20 rounded-full blur-[120px]"
      />

      {/* Blob 3: Cyan (Bottom Left) */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, 100, 0],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-[20%] -left-[10%] w-[50vw] h-[50vw] bg-cyan-500/20 rounded-full blur-[100px]"
      />
    </div>
  );
};