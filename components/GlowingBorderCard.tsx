"use client";
import React, { useRef, useState } from "react";

export function GlowingBorderCard({
  children,
  className,
  glowColor = "from-blue-500 via-blue-700 to-transparent", // Default blue glow
  speed = "slow", // "slow", "normal", "fast"
}: {
  // Made children optional to prevent TS error about missing children prop
  children?: React.ReactNode;
  className?: string;
  glowColor?: string;
  speed?: "slow" | "normal" | "fast";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={containerRef}
      className={`relative rounded-[inherit] overflow-hidden p-[1.5px] ${className}`} // p-[1.5px] creates the gap for the glow
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Layer (The actual rotating glow) */}
      <div
        className={`absolute inset-0 z-0 rounded-[inherit] ${glowColor}`} // Inherit border-radius from parent and apply gradient colors
        style={{
          background: `conic-gradient(from var(--angle) at 50% 50%, var(--tw-gradient-from), var(--tw-gradient-via), var(--tw-gradient-to))`,
          // We need to map the Tailwind classes to variables or use the raw color values.
          // Since passed prop is a string of classes like "from-blue-500 ...", we can't easily extract exact colors in inline style without a helper or using the classes.
          // However, Tailwind 'from-X' classes set CSS variables --tw-gradient-from, etc.
          // So applying the class to this div makes those vars available.
          animation: `rotate-glow ${speed === 'slow' ? '8s' : speed === 'normal' ? '4s' : '2s'} linear infinite`,
          filter: 'blur(10px) opacity-70', // Blur and opacity for glow effect
          opacity: isHovered ? 1 : 0.6, // More visible on hover
          transition: 'opacity 0.3s ease-in-out',
          '--angle': '0deg',
        } as React.CSSProperties}
      />

      {/* Local Keyframe Injection */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes rotate-glow {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>

      {/* Actual Card Content Layer (This covers the inner part of the glow) */}
      <div className="relative z-10 w-full h-full rounded-[calc(0.75rem-1.5px)] bg-zinc-950/80 backdrop-blur-md border border-white/5">
        {children}
      </div>
    </div>
  );
}
