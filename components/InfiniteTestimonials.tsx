"use client";

import React from "react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

// 1. The Data (Static & Safe)
const testimonials: Testimonial[] = [
  {
    name: "Ahmed S.",
    role: "Computer Engineering Student",
    text: "UniStack changed how I study. My GPA went up from 2.8 to 3.5!",
  },
  {
    name: "Sarah K.",
    role: "Content Creator",
    text: "نظام البودكاست هو الأفضل عربياً. وفر علي ساعات من التشتت.",
  },
  {
    name: "Omar F.",
    role: "Freelancer",
    text: "The 'Expert Presenter' system saved my last client presentation.",
  },
  {
    name: "Khaled M.",
    role: "Hafiz Student",
    text: "نظام القرآن ساعدني في تثبيت الحفظ بفضل خوارزمية التكرار.",
  },
  {
    name: "Laila Y.",
    role: "Medical Student",
    text: "Finally, a Notion template that actually understands students.",
  },
];

export default function InfiniteTestimonials() {
  return (
    <div className="relative w-full py-10 overflow-hidden bg-transparent">
      
      {/* 2. The CSS Styles (Injected directly to guarantee functionality) */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: scroll 40s linear infinite;
        }
        /* Pause animation on hover for better UX */
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* 3. The Gradient Masks (Fade In/Out Effect) */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950"></div>

      {/* 4. The Marquee Track */}
      <div className="flex group">
        {/* Original Set */}
        <div className="flex animate-marquee gap-8 min-w-full px-4 shrink-0 items-center justify-around">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={`orig-${idx}`} item={item} />
          ))}
        </div>
        
        {/* Duplicate Set (For Seamless Loop) */}
        <div className="flex animate-marquee gap-8 min-w-full px-4 shrink-0 items-center justify-around" aria-hidden="true">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={`dup-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Sub-component for the Card Design
const TestimonialCard: React.FC<{ item: Testimonial }> = ({ item }) => {
  return (
    <div className="flex flex-col justify-center px-6 py-4 bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl w-[300px] h-[120px] shrink-0 hover:border-blue-500/30 transition-colors cursor-default">
      <p className="text-sm text-zinc-300 line-clamp-2 mb-3 leading-relaxed" dir="auto">"{item.text}"</p>
      <div className="flex items-center gap-3 mt-auto">
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
          {item.name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-white">{item.name}</span>
          <span className="text-[10px] text-zinc-500">{item.role}</span>
        </div>
      </div>
    </div>
  );
}
