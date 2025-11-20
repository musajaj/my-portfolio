"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function MagneticBuyButton({ link, price, label }: { link: string; price: string; label?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Physics Settings (Heavy but fluid feel)
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Apply magnetic pull (20% of distance)
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const buttonText = label || "احصل على نسختك";

  return (
    <motion.a
      ref={ref}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative group/btn block w-full cursor-pointer"
      style={{ x, y }} // Apply magnetic movement to the whole button
      onMouseDown={(e) => e.stopPropagation()} // Prevent conflict with card click
    >
      {/* 1. The Button Base */}
      <div className="relative overflow-hidden rounded-xl bg-blue-600 py-4 px-6 text-white shadow-lg transition-all duration-300 hover:shadow-blue-500/40 hover:scale-[1.02] border border-blue-400/20">
        
        {/* 2. The Shimmer Effect (The "Premium" Feel) */}
        <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

        {/* 3. The Content (Organized for conversion) */}
        <div className="relative z-20 flex items-center justify-between">
          <span className="flex items-center gap-2 font-bold tracking-wide text-sm">
            {/* Growth Icon */}
            <ArrowUpRight size={20} className="group-hover/btn:rotate-45 transition-transform duration-300" />
            <span>{buttonText}</span>
          </span>
          
          {/* Price Tag Badge */}
          <span className="bg-black/20 px-3 py-1 rounded-lg text-sm font-mono font-semibold text-blue-100 group-hover/btn:bg-white/20 transition-colors">
            {price}
          </span>
        </div>

        {/* 4. The Glow Pulse (Subtle Urgency) */}
        <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 group-hover/btn:ring-white/50 transition-all" />
      </div>

      {/* CSS Keyframes for Shimmer (Injected locally) */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.a>
  );
}