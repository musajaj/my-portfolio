"use client";

import React, { useState } from "react";
import { Twitter, Star, MessageCircle, Mail } from "lucide-react";

const REVIEWS = [
  { id: 1, type: "twitter", name: "Omar Al-Fares", handle: "@omar_dev", text: "بكل صراحة، UniStack هو أفضل استثمار عملته كطالب هندسة. المعدل ارتفع والضغط النفسي اختفى. شكراً مصطفى! 🙏💙", date: "2h ago" },
  { id: 2, type: "whatsapp", name: "Sarah (Content Creator)", text: "مصطفى، نظام البودكاست عبقري! 🎙️ وفرت 10 ساعات مونتاج وترتيب هذا الأسبوع فقط.", date: "10:42 AM" },
  { id: 3, type: "gumroad", name: "Khalid M.", rating: 5, text: "The Quran Mastery OS is life-changing. The spaced repetition logic is flawless.", date: "1 day ago" },
  { id: 4, type: "twitter", name: "Layla Tech", handle: "@layla_ux", text: "التفاصيل في قوالب Notion هذه مرعبة. هذا ليس مجرد قالب، هذا تطبيق كامل مبني داخل نوشن. 🤯", date: "5h ago" },
  { id: 5, type: "email", name: "Ahmed S.", subject: "Feedback", text: "I just wanted to say this system saved my semester. Highly recommended for every med student.", date: "Yesterday" },
  { id: 6, type: "whatsapp", name: "Dr. Hisham", text: "شريت القالب لطلابي وننصح فيه بشدة. التنظيم هو نصف النجاح. 👍", date: "Yesterday" }
];

export default function WallOfLove() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section className="py-24 relative z-10 overflow-hidden bg-transparent group/wall border-t border-white/5">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          لا تصدق كلامي. <br/> <span className="text-blue-500">صدق نتائجهم.</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">انضم إلى الآلاف ممن غيروا حياتهم الرقمية.</p>
      </div>

      {/* Rows Container */}
      <div 
        className="space-y-8"
        onMouseLeave={() => setHoveredId(null)} // Reset focus when leaving the section
      >
        {/* ROW 1: Left */}
        <MarqueeRow 
          reviews={[...REVIEWS, ...REVIEWS, ...REVIEWS]} 
          direction="left" 
          hoveredId={hoveredId} 
          setHoveredId={setHoveredId} 
        />
        
        {/* ROW 2: Right */}
        <MarqueeRow 
          reviews={[...REVIEWS, ...REVIEWS, ...REVIEWS].reverse()} 
          direction="right" 
          hoveredId={hoveredId} 
          setHoveredId={setHoveredId} 
        />
      </div>

      <style>{`
        @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
        @keyframes scroll-right { 0% { transform: translateX(-33.33%); } 100% { transform: translateX(0); } }
        .animate-scroll-left { animation: scroll-left 60s linear infinite; }
        .animate-scroll-right { animation: scroll-right 60s linear infinite; }
      `}</style>
    </section>
  );
}

function MarqueeRow({ reviews, direction, hoveredId, setHoveredId }: any) {
  return (
    <div className="relative w-full">
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>
      
      <div className={`flex w-max ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'} hover:[animation-play-state:paused]`}>
        {reviews.map((review: any, idx: number) => {
           // Unique key logic for duplicate items
           const uniqueKey = `${direction}-${review.id}-${idx}`;
           // Focus Logic: Blur if something is hovered AND it's not me
           const isBlur = hoveredId !== null && hoveredId !== review.id;
           
           return (
             <div 
               key={uniqueKey}
               className={`transition-all duration-500 ease-out ${isBlur ? 'blur-[2px] opacity-40 scale-95 grayscale' : 'blur-0 opacity-100 scale-100 grayscale-0'}`}
               onMouseEnter={() => setHoveredId(review.id)}
             >
               <ReviewCard review={review} />
             </div>
           );
        })}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  const isTwitter = review.type === "twitter";
  const isWhatsapp = review.type === "whatsapp";
  const isGumroad = review.type === "gumroad";
  const isEmail = review.type === "email";

  return (
    <div className="w-[350px] mx-4 p-6 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/5 hover:border-blue-500/50 hover:bg-zinc-900/80 transition-all cursor-default flex flex-col justify-between h-[200px] shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${isTwitter ? 'bg-blue-500' : isWhatsapp ? 'bg-green-500' : isGumroad ? 'bg-pink-500' : 'bg-orange-500'}`}>
            {review.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{review.name}</span>
            <span className="text-xs text-zinc-500">{isTwitter ? review.handle : "Verified User"}</span>
          </div>
        </div>
        <div className="text-zinc-600">
          {isTwitter && <Twitter size={18} className="text-blue-400" />}
          {isWhatsapp && <MessageCircle size={18} className="text-green-500" />}
          {isGumroad && <div className="flex text-yellow-500 gap-0.5"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>}
          {isEmail && <Mail size={18} className="text-orange-400" />}
        </div>
      </div>
      <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3" dir="auto">"{review.text}"</p>
      <div className="mt-auto pt-3 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between">
        <span>{review.date}</span>
        {isGumroad && <span className="text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">Verified Purchase</span>}
      </div>
    </div>
  );
}