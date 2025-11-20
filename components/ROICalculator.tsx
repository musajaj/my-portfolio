"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BookOpen, TrendingUp, AlertCircle } from "lucide-react";

export default function ROICalculator() {
  const [hoursPerDay, setHoursPerDay] = useState(2);

  // The Math
  const yearlyWasted = Math.round(hoursPerDay * 365);
  const hoursSaved = Math.round(yearlyWasted * 0.8); // UniStack saves 80%
  const booksEquivalent = Math.floor(hoursSaved / 7); // Avg book takes 7 hours

  return (
    <section className="py-24 px-4 relative z-10">
      <div className="max-w-4xl mx-auto">
        
        {/* Container Card */}
        <div className="relative bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
          
          {/* Background Gradient Blob */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              هل استثمارك في <span className="text-blue-500">UniStack</span> يستحق؟
            </h2>
            <p className="text-zinc-400">دع الأرقام تتحدث. احسب الوقت الذي ستستعيده سنوياً.</p>
          </div>

          {/* INPUT SECTION */}
          <div className="mb-16 max-w-lg mx-auto relative z-10">
            <label className="block text-center text-zinc-300 mb-6 text-lg font-medium">
              كم ساعة تضيع يومياً في التشتت والبحث عن الملاحظات؟
            </label>
            
            <div className="flex items-center gap-4" dir="ltr">
              <span className="text-zinc-500 font-mono">0h</span>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={hoursPerDay}
                onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
                className="w-full h-2 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-all"
              />
              <span className="text-zinc-500 font-mono">5h</span>
            </div>
            
            <div className="text-center mt-4">
              <span className="inline-block bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1 rounded-full text-xl font-bold">
                {hoursPerDay} ساعات / يومياً
              </span>
            </div>
          </div>

          {/* RESULTS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* Stat 1: The Loss (Pain Point) */}
            <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 text-center transform transition-transform hover:scale-105">
              <div className="flex justify-center mb-4 text-red-500">
                <AlertCircle size={32} />
              </div>
              <p className="text-zinc-400 text-sm mb-2">أنت تخسر سنوياً</p>
              <motion.div 
                key={yearlyWasted}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold text-red-400 tabular-nums"
              >
                {yearlyWasted} <span className="text-lg font-normal text-red-500/60">ساعة</span>
              </motion.div>
            </div>

            {/* Stat 2: The Gain (Solution) */}
            <div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-6 text-center transform transition-transform hover:scale-105 relative overflow-hidden">
              <div className="absolute inset-0 bg-green-500/5 blur-xl"></div>
              <div className="relative z-10">
                <div className="flex justify-center mb-4 text-green-500">
                  <Clock size={32} />
                </div>
                <p className="text-zinc-400 text-sm mb-2">UniStack سيوفر عليك</p>
                <motion.div 
                  key={hoursSaved}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold text-green-400 tabular-nums"
                >
                  {hoursSaved} <span className="text-lg font-normal text-green-500/60">ساعة</span>
                </motion.div>
              </div>
            </div>

            {/* Stat 3: The Potential (Desire) */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-center transform transition-transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
              <div className="flex justify-center mb-4 text-blue-400">
                <BookOpen size={32} />
              </div>
              <p className="text-zinc-300 text-sm mb-2">ما يعادل قراءة</p>
              <motion.div 
                key={booksEquivalent}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold text-white tabular-nums"
              >
                {booksEquivalent} <span className="text-lg font-normal text-blue-300/60">كتاباً 📚</span>
              </motion.div>
            </div>

          </div>

          {/* CTA Footer */}
          <div className="mt-12 text-center">
            <p className="text-zinc-400 mb-6">
              الوقت هو أثمن ما تملك. لا تدعه يضيع في الفوضى.
            </p>
            <a 
              href="/projects/unistack-student-dashboard" // Updated to internal link
              className="inline-flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95"
            >
              <span>احصل على UniStack الآن</span>
              <TrendingUp size={20} />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}