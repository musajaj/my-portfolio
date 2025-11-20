
"use client";

import React from "react";
import { Twitter, Star, MessageCircle, Mail, Quote } from "lucide-react";

// --- MOCK DATA ---
const REVIEWS = [
  {
    id: 1,
    type: "twitter",
    name: "Omar Al-Fares",
    handle: "@omar_dev",
    text: "بكل صراحة، UniStack هو أفضل استثمار عملته كطالب هندسة. المعدل ارتفع والضغط النفسي اختفى. شكراً مصطفى! 🙏💙",
    date: "2h ago"
  },
  {
    id: 2,
    type: "whatsapp",
    name: "Sarah (Content Creator)",
    text: "مصطفى، نظام البودكاست عبقري! 🎙️ وفرت 10 ساعات مونتاج وترتيب هذا الأسبوع فقط.",
    date: "10:42 AM"
  },
  {
    id: 3,
    type: "gumroad",
    name: "Khalid M.",
    rating: 5,
    text: "The Quran Mastery OS is life-changing. The spaced repetition logic is flawless.",
    date: "1 day ago"
  },
  {
    id: 4,
    type: "twitter",
    name: "Layla Tech",
    handle: "@layla_ux",
    text: "التفاصيل في قوالب Notion هذه مرعبة. هذا ليس مجرد قالب، هذا تطبيق كامل مبني داخل نوشن. 🤯",
    date: "5h ago"
  },
  {
    id: 5,
    type: "email",
    name: "Ahmed S.",
    subject: "Feedback on UniStack",
    text: "I just wanted to say this system saved my semester. Highly recommended for every med student.",
    date: "Yesterday"
  },
  {
    id: 6,
    type: "whatsapp",
    name: "Dr. Hisham",
    text: "شريت القالب لطلابي وننصح فيه بشدة. التنظيم هو نصف النجاح. 👍",
    date: "Yesterday"
  }
];

export default function WallOfLove() {
  return (
    <section className="py-24 relative z-10 overflow-hidden bg-transparent border-t border-white/5">
      
      {/* Header */}
      <div className="text-center mb-16 px-4 relative z-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          لا تصدق كلامي. <br/> <span className="text-blue-500">صدق نتائجهم.</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          انضم إلى الآلاف ممن غيروا حياتهم الرقمية باستخدام هذه الأنظمة.
        </p>
      </div>

      {/* --- ROW 1: Left Scroll --- */}


      {/* --- ROW 2: Right Scroll --- */}
      <div className="relative w-full group">
        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-zinc-950 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-zinc-950 to-transparent z-20 pointer-events-none"></div>

        <div className="flex w-max animate-scroll-right group-hover:[animation-play-state:paused]">
          {/* Reversed logic for variety, also quadrupled */}
          {[...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS].reverse().map((review, idx) => (
            <ReviewCard key={`r2-${idx}`} review={review} />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      {/* 
        Logic: With 4 copies, the total width is 400%. 
        Moving -25% shifts exactly one full set length.
        Since set 2 starts exactly where set 1 ends, the loop is seamless.
      */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-25%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-25%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
          will-change: transform;
        }
        .animate-scroll-right {
          animation: scroll-right 70s linear infinite;
          will-change: transform;
        }
      `}</style>
    </section>
  );
}

// --- SUB-COMPONENT: THE CARD ---
function ReviewCard({ review }: { review: any }) {
  const isTwitter = review.type === "twitter";
  const isWhatsapp = review.type === "whatsapp";
  const isGumroad = review.type === "gumroad";
  const isEmail = review.type === "email";

  return (
    <div className="w-[300px] md:w-[380px] mx-3 md:mx-4 p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-blue-500/30 hover:bg-zinc-900/60 transition-all duration-300 select-none flex flex-col justify-between h-[200px] md:h-[220px]">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg
            ${isTwitter ? 'bg-blue-500' : isWhatsapp ? 'bg-green-600' : isGumroad ? 'bg-pink-600' : 'bg-orange-500'}
          `}>
            {review.name.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white">{review.name}</span>
            <span className="text-[10px] md:text-xs text-zinc-400">
              {isTwitter ? review.handle : isWhatsapp ? 'WhatsApp' : isGumroad ? 'Verified Buyer' : 'Email'}
            </span>
          </div>
        </div>
        {/* Platform Icon */}
        <div className="text-zinc-600">
          {isTwitter && <Twitter size={18} className="text-blue-400" />}
          {isWhatsapp && <MessageCircle size={18} className="text-green-500" />}
          {isGumroad && <div className="flex text-yellow-500 gap-0.5"><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/><Star size={12} fill="currentColor"/></div>}
          {isEmail && <Mail size={18} className="text-orange-400" />}
        </div>
      </div>

      {/* Body */}
      <div className="relative">
        <Quote className="absolute -top-2 -left-1 text-white/5 rotate-180" size={24} />
        <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3 relative z-10" dir="auto">
          "{review.text}"
        </p>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-3 border-t border-white/5 text-[10px] text-zinc-500 flex justify-between items-center">
        <span>{review.date}</span>
        {isGumroad && (
          <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full">
            Verified Purchase
          </span>
        )}
      </div>

    </div>
  );
}
