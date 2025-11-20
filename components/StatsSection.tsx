"use client";
import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

// Data
const stats = [
  { label: "إجمالي التحميلات", value: 19000, suffix: "+" },
  { label: "أنظمة Notion", value: 12, suffix: "" },
  { label: "ساعات برمجة", value: 2500, suffix: "+" },
  { label: "سعيد بالخدمة", value: 100, suffix: "%" },
];

// Sub-component for a single counter
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 100 });
  
  // Update number text
  const displayValue = useTransform(springValue, (latest) => 
    Math.floor(latest).toLocaleString("en-US") // Format with commas
  );

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  return (
    <span ref={ref} className="flex items-baseline" dir="ltr">
      <motion.span>{displayValue}</motion.span>
      <span>{suffix}</span>
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/20">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-3xl md:text-5xl font-bold text-white tabular-nums tracking-tight">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-medium text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}