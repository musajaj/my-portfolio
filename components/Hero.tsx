
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { Language, Profile } from '../types';
import Magnetic from './Magnetic';
import HolographicArtifact from './HolographicArtifact';

interface HeroProps {
  lang: Language;
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ lang, profile }) => {
  const isRTL = lang === Language.AR;
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row items-center justify-center overflow-hidden px-6 pt-24 lg:pt-0 gap-12 lg:gap-20">
      {/* Abstract Background Glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px] opacity-50 mix-blend-screen" />
      <div className="pointer-events-none absolute bottom-1/4 right-1/4 -z-10 h-[300px] w-[300px] rounded-full bg-purple-600/10 blur-[100px] opacity-30" />

      {/* Text Content */}
      <div className="relative z-10 flex max-w-2xl flex-col items-center lg:items-start text-center lg:text-start">
        
        {/* Status Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-xs font-medium text-blue-300">
            {isRTL ? 'متاح للمشاريع الجديدة' : 'Available for new projects'}
          </span>
        </motion.div>

        {/* Primary Headline (Gradient & Animated Fade-In) */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-6 tracking-tight leading-tight"
        >
          {profile.headline}
        </motion.h1>
        
        {/* Sub-headline (Clean Fade-In with Delay) */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl"
        >
          {profile.subHeadline}
        </motion.p>

        {/* Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row items-center justify-center lg:justify-start"
        >
          {/* Magnetic Primary Button */}
          <Magnetic>
            <a 
              href="#projects"
              onClick={(e) => handleScroll(e, '#projects')}
              className="group relative flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-500 active:scale-95"
            >
              <Sparkles size={18} />
              {isRTL ? 'استكشف مشاريعي' : 'Explore Projects'}
            </a>
          </Magnetic>

          {/* Secondary Button */}
          <Magnetic>
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="group flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 active:scale-95"
            >
              {isRTL ? 'تواصل معي' : 'Contact Me'}
              <Arrow size={18} className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Holographic Artifact Section (Visible on Desktop/Large screens) */}
      <div className="hidden lg:flex flex-1 items-center justify-center h-[500px] w-full perspective-[2000px] z-10">
        <HolographicArtifact />
      </div>
    </section>
  );
};