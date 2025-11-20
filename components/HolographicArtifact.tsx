"use client";

import React from "react";
import { motion } from "framer-motion";

export default function HolographicArtifact() {
  const rotationDuration = 18; // Seconds for one full rotation

  return (
    <div className="relative flex items-center justify-center h-full w-full perspective-[1200px] pointer-events-none select-none">
      
      {/* Container for the 3D artifact */}
      <motion.div
        className="relative w-[320px] h-[420px]"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: [0, 360],
          y: [0, -20, 0], // Gentle float
        }}
        transition={{
          rotateY: { duration: rotationDuration, ease: "linear", repeat: Infinity },
          y: { duration: rotationDuration / 4, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" },
        }}
      >
        {/* Shadow / Base Glow */}
        <motion.div 
            className="absolute inset-0 bg-blue-500/20 rounded-[40px] blur-3xl -z-10"
            style={{ 
                transform: 'translateZ(-80px) translateY(40px) scale(1.1)' 
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Outer Glass Casing - Front Face */}
        <motion.div 
          className="absolute inset-0 bg-white/5 border border-white/10 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl"
          style={{ transform: "translateZ(60px)" }} // Frontmost layer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Subtle reflection glare */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent transform -rotate-45 translate-x-1/2 translate-y-1/2 opacity-60"></div>
        </motion.div>

        {/* Inner UI Screen Layer (Simulated Notion UI) */}
        <motion.div
          className="absolute inset-[15px] bg-zinc-900 border border-white/5 rounded-2xl overflow-hidden"
          style={{ transform: "translateZ(40px)" }} // Slightly behind the front glass
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
        >
          {/* Mock Notion Header */}
          <div className="h-8 bg-zinc-800 border-b border-white/5 flex items-center px-3 gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          {/* Mock Notion Content */}
          <div className="p-4 flex flex-col gap-3">
            <div className="w-full h-4 bg-zinc-700 rounded animate-pulse" style={{animationDelay: '0s'}}></div>
            <div className="w-5/6 h-4 bg-zinc-700 rounded animate-pulse" style={{animationDelay: '0.1s'}}></div>
            <div className="w-4/5 h-20 bg-zinc-700/50 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-full h-4 bg-zinc-700 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="w-3/4 h-4 bg-zinc-700 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
          {/* UniStack Text Watermark */}
          <div className="absolute inset-0 flex items-center justify-center text-white/5 text-5xl font-extrabold select-none">
            UniStack
          </div>
        </motion.div>

        {/* Back Plate / Depth Layer */}
        <motion.div
          className="absolute inset-0 bg-zinc-950 border border-white/5 rounded-3xl shadow-lg"
          style={{ transform: "translateZ(-20px)" }} // Backmost solid layer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        />
        
        {/* Side Glows (Simulate edges) */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none">
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-blue-500/10 blur-xl"></div>
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-purple-500/10 blur-xl"></div>
        </div>

      </motion.div>
    </div>
  );
}