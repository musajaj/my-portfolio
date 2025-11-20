"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Clock, FileText, PlayCircle, Database, RotateCcw } from "lucide-react";

export default function ValueScale() {
  const [step, setStep] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  
  // Ref to track the current animation sequence ID to allow cancellation
  const runIdRef = useRef(0);

  const startAnimation = async () => {
    // Increment ID to invalidate any previous running sequences
    const currentId = ++runIdRef.current;
    
    setStep(0); // Reset instantly
    
    // Small pause before starting to allow exit animations to play
    await new Promise(r => setTimeout(r, 600));
    if (runIdRef.current !== currentId) return;

    setStep(1); // Price drops
    await new Promise(r => setTimeout(r, 1500));
    if (runIdRef.current !== currentId) return;

    setStep(2); // Product drops
    await new Promise(r => setTimeout(r, 1500));
    if (runIdRef.current !== currentId) return;

    setStep(3); // Bonuses drop
    await new Promise(r => setTimeout(r, 1500));
    if (runIdRef.current !== currentId) return;

    setStep(4); // Massive Value drops
  };

  // Start animation when in view
  useEffect(() => {
    if (inView) {
      startAnimation();
    }
  }, [inView]);

  // Beam Rotation Logic based on Step
  const beamRotation = step === 0 ? 0 : step === 1 ? 15 : step === 2 ? 0 : step === 3 ? -10 : -20;

  return (
    <section ref={ref} className="py-24 px-4 relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          قيمة هائلة. <span className="text-blue-500">سعر رمزي.</span>
        </h2>
        <p className="text-zinc-400">شاهد كيف تتفوق القيمة التي ستحصل عليها مقابل ما تدفعه.</p>
      </div>

      <div className="relative w-full h-[500px] flex items-end justify-center">
        
        {/* Reset Button */}
        <button 
          onClick={startAnimation}
          className="absolute top-0 right-4 md:right-20 z-30 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-white/10 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-all text-sm backdrop-blur-md group"
        >
          <RotateCcw size={14} className="group-hover:-rotate-180 transition-transform duration-500" />
          <span>إعادة المشهد</span>
        </button>

        {/* THE SCALE ASSEMBLY */}
        <div className="relative w-[600px] h-[400px]">
          
          {/* 1. The Base (Static) */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-40 bg-zinc-700 rounded-t-lg z-0"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-zinc-700 rounded-full z-0"></div>

          {/* 2. The Beam (Rotates) */}
          <motion.div
            className="absolute top-10 left-0 right-0 h-2 bg-zinc-500 rounded-full origin-center z-10"
            animate={{ rotate: beamRotation }}
            transition={{ type: "spring", stiffness: 60, damping: 10 }}
          >
            {/* Pivot Point */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-400 rounded-full border-4 border-zinc-800 z-20"></div>

            {/* --- LEFT PAN (VALUE) --- */}
            <div className="absolute left-0 top-1/2 w-0 h-0">
               {/* String */}
               <div className="absolute top-0 left-0 w-[2px] h-32 bg-zinc-600 origin-top -translate-x-1/2"></div>
               {/* Pan Container (Counter-Rotates to stay upright) */}
               <motion.div 
                 className="absolute top-32 left-0 -translate-x-1/2 w-40 flex flex-col-reverse items-center justify-start gap-1"
                 animate={{ rotate: -beamRotation }} // Counter-rotation
                 transition={{ type: "spring", stiffness: 60, damping: 10 }}
               >
                  {/* Pan Plate */}
                  <div className="w-40 h-2 bg-blue-500 rounded-full shadow-[0_10px_30px_rgba(59,130,246,0.4)]"></div>
                  
                  {/* STACKING ITEMS (Bottom to Top) */}
                  <AnimatePresence>
                    {step >= 2 && (
                      <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{ y: -50, opacity: 0 }} className="w-32 p-3 bg-zinc-800 border border-blue-500/30 rounded-lg text-center shadow-lg mb-0 z-10">
                        <Database className="mx-auto text-blue-400 mb-1" size={20} />
                        <span className="text-xs font-bold text-white block">Notion System</span>
                      </motion.div>
                    )}
                    {step >= 3 && (
                      <motion.div initial={{y: -100, opacity: 0}} animate={{y: 0, opacity: 1}} exit={{ y: -50, opacity: 0 }} transition={{delay: 0.2}} className="w-28 p-2 bg-zinc-800 border border-purple-500/30 rounded-lg text-center shadow-lg -mb-2 z-20">
                        <div className="flex justify-center gap-2 mb-1">
                           <FileText size={14} className="text-purple-400"/>
                           <PlayCircle size={14} className="text-purple-400"/>
                        </div>
                        <span className="text-[10px] font-bold text-white block">Guides + Video</span>
                      </motion.div>
                    )}
                    {step >= 4 && (
                      <motion.div 
                        initial={{y: -200, opacity: 0, scale: 0.5}} 
                        animate={{y: 0, opacity: 1, scale: 1.1}} 
                        exit={{ y: -100, opacity: 0, scale: 0.5 }}
                        transition={{type: "spring", stiffness: 200}}
                        className="w-36 p-4 bg-gradient-to-b from-green-500 to-green-700 rounded-xl text-center shadow-[0_0_30px_rgba(34,197,94,0.5)] -mb-2 z-30 relative top-[-10px]"
                      >
                        <Clock className="mx-auto text-white mb-1" size={24} />
                        <span className="text-sm font-black text-white block leading-tight">700 HOURS<br/>SAVED</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
            </div>

            {/* --- RIGHT PAN (PRICE) --- */}
            <div className="absolute right-0 top-1/2 w-0 h-0">
               {/* String */}
               <div className="absolute top-0 right-0 w-[2px] h-32 bg-zinc-600 origin-top translate-x-1/2"></div>
               {/* Pan Container */}
               <motion.div 
                 className="absolute top-32 right-0 translate-x-1/2 w-24 flex flex-col-reverse items-center justify-start"
                 animate={{ rotate: -beamRotation }} 
                 transition={{ type: "spring", stiffness: 60, damping: 10 }}
               >
                  {/* Pan Plate */}
                  <div className="w-24 h-2 bg-zinc-600 rounded-full"></div>
                  
                  {/* PRICE WEIGHT */}
                  <AnimatePresence>
                    {step >= 1 && (
                      <motion.div 
                        initial={{y: -100, opacity: 0}} 
                        animate={{y: 0, opacity: 1}}
                        exit={{ y: -50, opacity: 0 }} 
                        className="w-16 h-16 bg-zinc-200 rounded-lg flex items-center justify-center shadow-lg border-b-4 border-zinc-400"
                      >
                        <span className="text-xl font-black text-zinc-800">$50</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
               </motion.div>
            </div>

          </motion.div>
        </div>
        
        {/* Labels (Visual Anchors) */}
        <div className="absolute bottom-0 w-full flex justify-between max-w-2xl px-12 text-sm font-bold tracking-widest uppercase text-zinc-600">
           <span>The Cost</span>
           <span>The Value</span>
        </div>

      </div>
    </section>
  );
}