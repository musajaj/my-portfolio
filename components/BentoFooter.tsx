
"use client";

import React, { useState, useEffect } from "react";
import { Mail, ArrowRight, MapPin, Clock, Wifi, Github, Facebook, Youtube } from "lucide-react";
import Magnetic from "./Magnetic";
import { Profile } from "../types";

// Custom Icons
const SiNotion = (props: any) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M4.021 2.183 2.583 4.016c-.201.254-.038.508.22.508h2.425l.025.022 4.854 8.728V4.524h-1.2c-.32 0-.349-.273-.257-.508l.56-1.451c.134-.349.374-.382.672-.382h5.952c.309 0 .586.203.403.508l-.478 1.334h-1.488v11.707l-3.29-5.918v5.918h1.344c.292 0 .347.226.257.508l-.562 1.454c-.133.349-.374.382-.672.382H5.32c-.309 0-.586-.203-.403-.508l.481-1.334h1.485l.003-14.57z" />
  </svg>
);

const SiWhatsapp = (props: any) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

interface BentoFooterProps {
  profile: Profile;
}

export default function BentoFooter({ profile }: BentoFooterProps) {
  // Hydration-Safe Time Logic
  const [time, setTime] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      try {
        const now = new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Damascus",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setTime(now);
      } catch (e) {
        const now = new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
        setTime(now);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="relative w-full py-12 px-4 md:px-8 mt-20 border-t border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto">
        
        {/* THE BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

          {/* 1. NEWSLETTER CARD (Spans 2 Columns) */}
          <div className="md:col-span-2 relative group overflow-hidden bg-zinc-900/50 border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Mail size={80} />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">ابقَ في الطليعة.</h3>
              <p className="text-zinc-400 text-sm mb-6">احصل على أحدث قوالب Notion ونصائح الذكاء الاصطناعي مباشرة في بريدك.</p>
            </div>
            <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-full border border-white/10 focus-within:border-blue-500/50 transition-colors">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني..." 
                className="bg-transparent w-full px-4 py-2 text-white outline-none placeholder:text-zinc-600 text-sm"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white p-2.5 rounded-full transition-transform active:scale-95">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* 2. STATUS CARD (1 Column) */}
          <div className="md:col-span-1 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-4 hover:bg-zinc-900/80 transition-colors">
            <div className="relative">
              <div className="w-4 h-4 bg-green-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full relative shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
            </div>
            <div className="text-center">
              <h4 className="text-white font-semibold">متاح للعمل</h4>
              <p className="text-xs text-zinc-500 mt-1">Status: Online</p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-zinc-400">
              <Wifi size={12} />
              <span>Remote / Hybrid</span>
            </div>
          </div>

          {/* 3. LOCAL TIME CARD (1 Column) */}
          <div className="md:col-span-1 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-zinc-900/80 transition-colors group">
            <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 mb-2 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            {mounted ? (
              <h2 className="text-3xl font-bold text-white tabular-nums tracking-tight">{time}</h2>
            ) : (
              <div className="h-9 w-24 bg-zinc-800 rounded animate-pulse"></div>
            )}
            <div className="flex items-center gap-1.5 text-xs text-zinc-500 uppercase tracking-wider">
              <MapPin size={12} />
              <span>Aleppo, SY</span>
            </div>
          </div>

          {/* 4. GIANT SOCIALS STRIP (Full Width on Mobile, Spans 4 on Desktop) */}
          <div className="md:col-span-4 bg-zinc-900/50 border border-white/5 rounded-3xl p-6 flex flex-wrap items-center justify-around gap-4">
             <SocialBtn icon={SiNotion} label="Notion" href={profile.socials.notionArabs} color="hover:text-white hover:bg-black" />
             <SocialBtn icon={Youtube} label="YouTube" href="#" color="hover:text-red-500 hover:bg-red-500/10" />
             <SocialBtn icon={Facebook} label="Facebook" href={profile.socials.facebook} color="hover:text-blue-500 hover:bg-blue-600/10" />
             <SocialBtn icon={Github} label="GitHub" href="#" color="hover:text-white hover:bg-zinc-800" />
             <SocialBtn icon={SiWhatsapp} label="WhatsApp" href={profile.socials.whatsapp} color="hover:text-green-500 hover:bg-green-500/10" />
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <p>Engineered with ❤️ & Next.js</p>
        </div>

      </div>
    </footer>
  );
}

// Helper Component for Social Buttons
function SocialBtn({ icon: Icon, label, href, color }: any) {
  return (
    <Magnetic>
      <a 
        href={href} 
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/5 transition-all duration-300 hover:scale-105 ${color} group`}
      >
        <Icon className="w-6 h-6 transition-colors" />
        <span className="font-semibold text-zinc-300 group-hover:text-current">{label}</span>
      </a>
    </Magnetic>
  );
}