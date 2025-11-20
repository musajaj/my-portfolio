import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, ShoppingCart } from "lucide-react";

// Particle component defined before usage to ensure it's initialized
const Particle: React.FC<{ index: number }> = ({ index }) => {
  const randomX = (Math.random() - 0.5) * 600; // Spread width
  const randomY = (Math.random() - 1) * 200 - 50; // Upward burst
  const randomDelay = Math.random() * 0.2;
  const randomColor = Math.random() > 0.5 ? "#60a5fa" : "#ffffff"; // Blue or White

  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{ 
        x: randomX, 
        y: randomY, 
        opacity: 0, 
        scale: [0, 1.5, 0] 
      }}
      transition={{ 
        duration: 1.5, 
        ease: "easeOut", 
        delay: randomDelay 
      }}
      className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full z-0 pointer-events-none"
      style={{ backgroundColor: randomColor }}
    />
  );
};

export default function CommitmentSwitch() {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <section className="py-24 px-4 relative z-10 flex flex-col items-center justify-center">
      
      {/* Label / Question */}
      <div className="text-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
          القرار بيدك. <span className="text-zinc-500">كيف تريد أن تدير حياتك؟</span>
        </h3>
      </div>

      {/* THE SWITCH CONTAINER */}
      <div 
        className="relative w-full max-w-[500px] h-24 rounded-full cursor-pointer select-none"
        onClick={toggleSwitch}
      >
        {/* Background Layer (Morphing Color) */}
        <motion.div
          className="absolute inset-0 rounded-full border border-white/5 shadow-inner overflow-hidden"
          animate={{
            backgroundColor: isOn ? "#2563eb" : "#27272a", // Blue-600 vs Zinc-800
            boxShadow: isOn ? "0 0 50px rgba(37, 99, 235, 0.6)" : "inset 0 0 20px rgba(0,0,0,0.5)"
          }}
          transition={{ duration: 0.5 }}
        >
          {/* Background Pattern/Glow */}
          {isOn && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-xl"
            />
          )}
        </motion.div>

        {/* TEXT LAYERS (Absolute positioning to crossfade) */}
        <div className="absolute inset-0 flex items-center justify-between px-6 pointer-events-none z-10">
           {/* OFF TEXT */}
           <motion.div 
             animate={{ opacity: isOn ? 0 : 1, x: isOn ? -20 : 0 }}
             className="flex items-center gap-3 text-zinc-400 font-medium text-lg ml-4"
           >
             <X size={24} />
             <span>ما زلت أستخدم الورقة والقلم...</span>
           </motion.div>

           {/* ON TEXT */}
           <motion.div 
             animate={{ opacity: isOn ? 1 : 0, x: isOn ? 0 : 20 }}
             className="flex items-center gap-3 text-white font-bold text-xl absolute right-8"
           >
             <span>أنا جاهز للتنظيم - اشترِ الآن</span>
             <ShoppingCart size={24} />
           </motion.div>
        </div>

        {/* THE HANDLE (Magnetic Circle) */}
        <motion.div
          className="absolute top-2 bottom-2 w-20 h-20 bg-white rounded-full shadow-2xl z-20 flex items-center justify-center"
          animate={{
            left: isOn ? "calc(100% - 5.5rem)" : "0.5rem",
            scale: isOn ? 1.1 : 1,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <motion.div
             animate={{ rotate: isOn ? 360 : 0, color: isOn ? "#2563eb" : "#52525b" }}
          >
            {isOn ? <Check size={32} strokeWidth={4} /> : <div className="w-2 h-8 bg-zinc-300 rounded-full" />}
          </motion.div>
        </motion.div>

        {/* FIREWORKS PARTICLES (Internal System) */}
        <AnimatePresence>
          {isOn && Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </AnimatePresence>

      </div>

      {/* Helper Text */}
      <motion.p 
        animate={{ opacity: isOn ? 1 : 0, y: isOn ? 0 : -10 }}
        className="mt-6 text-blue-400 text-sm font-medium flex items-center gap-2"
      >
        <Sparkles size={14} />
        <span>تم تفعيل عرض الطالب المميز! (خصم 20% لفترة محدودة)</span>
      </motion.p>

    </section>
  );
}