"use client";

import React, { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { Star, Download, ShieldCheck } from "lucide-react";
import MagneticBuyButton from "./MagneticBuyButton";

const ROTATION_RANGE = 20; // Max tilt in degrees

export default function ProductCard({ product }: { product: any }) {
  const ref = useRef<HTMLDivElement>(null);

  // Motion Values for Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth Physics (Stiffness = Tension, Damping = Friction)
  // High stiffness + medium damping = snappy but smooth spring
  const xSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Create the 3D Transform String
  const transform = useMotionTemplate`perspective(1000px) rotateX(${xSpring}deg) rotateY(${ySpring}deg) scale3d(1, 1, 1)`;
  
  // Glare Motion Values
  const glareX = useSpring(0, { stiffness: 300, damping: 30 });
  const glareY = useSpring(0, { stiffness: 300, damping: 30 });
  const glareBackground = useMotionTemplate`radial-gradient(farthest-corner circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate rotation based on cursor position relative to card center
    // Range: -20 to +20 degrees
    const rY = ((e.clientX - rect.left) / width - 0.5) * ROTATION_RANGE * 2; 
    const rX = ((e.clientY - rect.top) / height - 0.5) * -ROTATION_RANGE * 2;

    x.set(rX);
    y.set(rY);
    
    // Glare tracks the mouse position (0% to 100%)
    glareX.set(((e.clientX - rect.left) / width) * 100);
    glareY.set(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseLeave = () => {
    // Reset rotation to flat when mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className="relative group flex flex-col h-full rounded-2xl bg-zinc-900 border border-white/10 shadow-2xl cursor-default"
    >
      {/* --- IMAGE LAYER (Background Depth) --- */}
      <div 
        className="relative h-48 w-full overflow-hidden bg-zinc-800 rounded-t-2xl"
        style={{ transform: "translateZ(20px)" }}
      >
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-80"></div>
        
        {product.isRecommended && (
          <div 
            className="absolute top-3 right-3 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-md flex items-center gap-1 shadow-lg z-20"
            style={{ transform: "translateZ(30px)" }} // Pops out further
          >
            <ShieldCheck size={12} />
            <span>موصى به</span>
          </div>
        )}
      </div>

      {/* --- CONTENT LAYER (Foreground Depth) --- */}
      <div 
        className="flex flex-col flex-1 p-6 relative z-10 bg-zinc-900 rounded-b-2xl"
        style={{ transform: "translateZ(40px)" }} // Pops out even further
      >
        <div className="flex justify-between items-start mb-2">
           <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{product.category}</span>
           <span className="text-green-400 text-xs bg-green-500/10 px-2 py-1 rounded border border-green-500/10 flex items-center gap-1">
             <Download size={10} /> {product.downloads.toLocaleString()}+
           </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-blue-400 transition-colors">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={i < product.rating ? "fill-yellow-500 text-yellow-500" : "text-zinc-700"} 
            />
          ))}
          <span className="text-xs text-zinc-500 ml-2">({product.rating}.0/5)</span>
        </div>

        {/* Action Button */}
        <div className="mt-auto pt-5 border-t border-white/5 relative z-20"> 
          {/* z-20 ensures it's above any glare layers */}
          <MagneticBuyButton 
            link={product.link} 
            price={product.price} 
            label="احصل على نسختك" 
          />
        </div>
      </div>

      {/* --- HOLOGRAPHIC GLARE (Overlay) --- */}
      <motion.div
        style={{ background: glareBackground }}
        className="pointer-events-none absolute inset-0 rounded-2xl z-50 mix-blend-overlay opacity-75"
      />
      
      {/* Border Glow on Hover */}
      <div 
        className="absolute inset-0 rounded-2xl border border-blue-500/0 group-hover:border-blue-500/30 transition-colors pointer-events-none" 
        style={{ transform: "translateZ(50px)" }}
      />

    </motion.div>
  );
}