"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Smooth out the progress value for a fluid fill animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Show/Hide logic based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.05) { // Show after 5% scroll
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center cursor-pointer group"
          onClick={scrollToTop}
        >
          {/* The SVG Ring Container */}
          <svg width="50" height="50" viewBox="0 0 100 100" className="transform -rotate-90">
            {/* Background Circle (Track) */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6" // Thinner for elegance
              fill="transparent"
              className="text-zinc-800" // Dark track color
            />
            
            {/* Progress Circle (Fill) */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="currentColor"
              strokeWidth="6"
              fill="transparent"
              className="text-blue-500" // Your accent color
              style={{ pathLength: scaleX }} // The magic happens here
              strokeLinecap="round"
            />
          </svg>

          {/* The Center Arrow */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-zinc-900 rounded-full p-2 group-hover:bg-blue-600 transition-colors duration-300">
               <ArrowUp size={18} className="text-white" />
            </div>
          </div>
          
          {/* Glow Effect on Hover */}
          <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}