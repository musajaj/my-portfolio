
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Zap } from "lucide-react";
import { Language } from "../types";

// The Problem-Solution Pairs (Bilingual Data Structure)
const MATRIX_ITEMS = [
  { 
    id: 1, 
    pain: { ar: "الفوضى والعشوائية", en: "Chaos & Mess" }, 
    cure: { ar: "نظام مثالي", en: "Perfect Order" }, 
    icon: Zap 
  },
  { 
    id: 2, 
    pain: { ar: "التسويف والمماطلة", en: "Procrastination" }, 
    cure: { ar: "تركيز عميق", en: "Deep Focus" }, 
    icon: Check 
  },
  { 
    id: 3, 
    pain: { ar: "ضياع الملاحظات", en: "Lost Notes" }, 
    cure: { ar: "عقل ثاني رقمي", en: "Second Brain" }, 
    icon: Check 
  },
  { 
    id: 4, 
    pain: { ar: "تراجع الدرجات", en: "Bad Grades" }, 
    cure: { ar: "معدل امتياز (4.0)", en: "4.0 GPA" }, 
    icon: Check 
  },
  { 
    id: 5, 
    pain: { ar: "التوتر والقلق", en: "Stress" }, 
    cure: { ar: "راحة بال تامة", en: "Peace of Mind" }, 
    icon: Check 
  },
  { 
    id: 6, 
    pain: { ar: "تراكم المهام", en: "Overwhelmed" }, 
    cure: { ar: "سيطرة كاملة", en: "Total Control" }, 
    icon: Check 
  },
];

interface PainMatrixProps {
  lang: Language;
}

export default function PainMatrix({ lang }: PainMatrixProps) {
  const isRTL = lang === Language.AR;
  
  // Track IDs of fixed items
  const [fixedIds, setFixedIds] = useState<number[]>([]);

  const handleFix = (id: number) => {
    if (!fixedIds.includes(id)) {
      // Trigger vibration on device if supported
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(50);
      }
      setFixedIds((prev) => [...prev, id]);
    }
  };

  const allFixed = fixedIds.length === MATRIX_ITEMS.length;

  // Content Dictionary
  const content = {
    headlineStart: isRTL ? "ما الذي" : "What",
    headlinePain: isRTL ? "يؤلمك" : "Hurts You",
    headlineEnd: isRTL ? "الآن؟" : "Right Now?",
    subHeadline: isRTL 
      ? "اضغط على مشاكلك لترى كيف يحلها UniStack." 
      : "Tap on your pain points to see how UniStack solves them.",
    clickToFix: isRTL ? "اضغط للحل" : "Click to fix",
    successTitle: isRTL ? "لقد قضيت على كل المشاكل! 🎉" : "You've Destroyed All Problems! 🎉",
    successDesc: isRTL ? "أنت جاهز الآن لبدء حياة جديدة." : "You are now ready to start a new life.",
    ctaButton: isRTL ? "احصل على النظام الكامل" : "Get The Full System"
  };

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            {content.headlineStart} <span className="text-red-500">{content.headlinePain}</span> {content.headlineEnd}
          </h2>
          <p className="text-zinc-400">{content.subHeadline}</p>
        </div>

        {/* THE MATRIX GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {MATRIX_ITEMS.map((item) => {
            const isFixed = fixedIds.includes(item.id);
            const painText = isRTL ? item.pain.ar : item.pain.en;
            const cureText = isRTL ? item.cure.ar : item.cure.en;

            return (
              <div 
                key={item.id} 
                className="relative h-32 md:h-40 rounded-2xl overflow-hidden cursor-pointer select-none"
                onClick={() => handleFix(item.id)}
              >
                <AnimatePresence mode="wait">
                  
                  {!isFixed ? (
                    /* STATE 1: PAIN (RED) */
                    <motion.div
                      key="pain"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: 1,
                        x: [0, -2, 2, -2, 2, 0], // Jitter effect
                      }}
                      exit={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                      transition={{ 
                        x: { repeat: Infinity, duration: 0.5, repeatDelay: Math.random() * 2 } 
                      }}
                      className="absolute inset-0 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/50 flex flex-col items-center justify-center transition-colors rounded-2xl group"
                    >
                      <X className="text-red-500 mb-2 group-hover:scale-110 transition-transform" size={32} />
                      <span className="text-red-400 font-bold text-lg md:text-xl uppercase tracking-wider px-2 text-center">
                        {painText}
                      </span>
                      <span className="text-[10px] text-red-500/50 mt-2">{content.clickToFix}</span>
                    </motion.div>
                  ) : (
                    /* STATE 2: CURE (GREEN/BLUE) */
                    <motion.div
                      key="cure"
                      initial={{ scale: 1.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute inset-0 bg-blue-500/10 border border-blue-500/50 flex flex-col items-center justify-center rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                    >
                      <div className="p-2 bg-blue-500 rounded-full mb-2 shadow-lg">
                         <item.icon className="text-white" size={20} />
                      </div>
                      <span className="text-blue-100 font-bold text-lg md:text-xl px-2 text-center">
                        {cureText}
                      </span>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* REWARD MESSAGE (When all are clicked) */}
        <AnimatePresence>
          {allFixed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 p-6 bg-green-500/10 border border-green-500/30 rounded-3xl inline-block"
            >
              <h3 className="text-2xl font-bold text-white mb-2">{content.successTitle}</h3>
              <p className="text-zinc-400 mb-6">{content.successDesc}</p>
              <a 
                href="#projects" 
                className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors inline-block"
              >
                {content.ctaButton}
              </a>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
