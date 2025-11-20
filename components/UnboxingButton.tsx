"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, FileText, PlayCircle, Zap, ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Project, Language } from "../types";

interface UnboxingButtonProps {
  project: Project;
  lang: Language;
}

export default function UnboxingButton({ project, lang }: UnboxingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isRTL = lang === Language.AR;

  // Dynamic Items based on project features or defaults
  const icons = [Package, FileText, PlayCircle, Zap, Check];
  const items = project.features && project.features.length > 0
    ? project.features.slice(0, 4).map((f, i) => ({
        icon: icons[i % icons.length],
        text: f
      }))
    : [
        { icon: Package, text: isRTL ? "نظام نوشن المتكامل" : "The Complete Notion System" },
        { icon: FileText, text: isRTL ? "ملفات شرح PDF" : "Advanced PDF Guides" },
        { icon: PlayCircle, text: isRTL ? "فيديو شرح تفصيلي" : "Walkthrough Video" },
        { icon: Zap, text: isRTL ? "تحديثات مدى الحياة" : "Lifetime Updates & Support" },
      ];

  const isPaid = project.externalLink.includes("gumroad");
  const price = isPaid ? "$XX" : (isRTL ? "مجانًا" : "Free");

  return (
    <div className="relative h-16 w-full mx-auto z-50">
      {/* Placeholder to hold space in layout */}
      <div className="h-14 w-full" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(37,99,235,0.3)] border border-white/10"
        initial={false}
        animate={{
          height: isHovered ? "auto" : 56, // 56px is standard button height
          y: 0,
          backgroundColor: isHovered ? "rgba(9, 9, 11, 0.95)" : "#2563eb", // Zinc-950 vs Blue-600
          backdropFilter: isHovered ? "blur(20px)" : "blur(0px)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
            originY: 1, // Expands upwards
            zIndex: 50
        }} 
      >
        {/* IDLE STATE CONTENT */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center gap-2 font-bold text-lg pointer-events-none"
          animate={{ opacity: isHovered ? 0 : 1 }}
        >
           {isRTL ? (
            <>
               <ArrowRight size={20} className="rotate-180" />
               <span>احصل على القالب</span>
            </>
           ) : (
            <>
               <span>Get Template</span>
               <ArrowRight size={20} />
            </>
           )}
        </motion.div>

        {/* HOVER STATE CONTENT (The Unboxing) */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="p-6 flex flex-col"
            >
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider mb-4 text-start">
                {isRTL ? "محتويات الحزمة" : "Inside The Package"}
              </div>

              <div className="space-y-3 mb-6">
                {items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="flex items-center gap-3 text-sm text-zinc-300 text-start"
                  >
                    <div className="p-1.5 bg-blue-500/10 rounded-full text-blue-400 shrink-0">
                      <item.icon size={14} />
                    </div>
                    <span className="truncate">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              <a
                href={project.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-95"
              >
                <span>{isRTL ? "تحميل الآن" : "Unlock Access"}</span>
                {isPaid && <span className="bg-white/20 px-2 py-0.5 rounded text-xs">{price}</span>}
              </a>
              
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-center text-zinc-500 mt-3">
                <ShieldCheck size={10} />
                <span>{isRTL ? "تحميل آمن ومضمون" : "Secure Digital Delivery"}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
