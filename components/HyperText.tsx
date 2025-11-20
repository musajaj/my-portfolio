"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function HyperText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [displayText, setDisplayText] = useState(text);

  const stopScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const scramble = () => {
    stopScramble();
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  // Trigger on Mount
  useEffect(() => {
    scramble();
    return () => stopScramble();
  }, []);

  return (
    <motion.h1
      className={`overflow-hidden font-mono cursor-default ${className}`}
      onMouseEnter={scramble} // Re-trigger on hover for interactivity
    >
      {displayText}
    </motion.h1>
  );
}