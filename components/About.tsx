import React from 'react';
import { motion } from 'framer-motion';
import { Language, Profile } from '../types';
import { Bot, Sparkles, Video, Database, BrainCircuit, Code } from 'lucide-react';

interface AboutProps {
  lang: Language;
  profile: Profile;
}

export const About: React.FC<AboutProps> = ({ lang, profile }) => {
  const isRTL = lang === Language.AR;

  const getTagIcon = (tag: string) => {
    const lowerTag = tag.toLowerCase();
    if (lowerTag.includes('content')) return <Video size={14} />;
    if (lowerTag.includes('notion')) return <Database size={14} />;
    if (lowerTag.includes('engineering')) return <Code size={14} />;
    if (lowerTag.includes('ai')) return <BrainCircuit size={14} />;
    return <Sparkles size={14} />;
  };

  return (
    <section id="about" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-3xl border border-white/10 bg-zinc-900/30 p-8 backdrop-blur-xl md:p-12 overflow-hidden shadow-2xl shadow-black/20">
        
        {/* Decorative background element */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:text-start md:text-left">
           <div className="relative flex-shrink-0">
              <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-zinc-800/50 shadow-2xl ring-4 ring-blue-500/30">
                <img 
                  src={profile.avatar} 
                  alt={isRTL ? `صورة ${profile.nameAr} الشخصية` : `${profile.name}'s profile picture`}
                  className="h-full w-full object-cover transform hover:scale-110 transition-transform duration-500" 
                />
              </div>
              
              {/* Badge 1: Role (Bot for AI) */}
              <div className="absolute bottom-0 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white ring-4 ring-zinc-900 shadow-lg z-10">
                <Bot size={20} />
              </div>
              
              {/* Badge 2: Sparkle (Decorative) */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-yellow-400 ring-4 ring-zinc-900 border border-white/10 shadow-lg z-10"
              >
                <Sparkles size={14} />
              </motion.div>
           </div>

           <div className="flex-1 relative z-10">
             <div className="flex flex-col md:flex-row items-center md:items-baseline gap-3 mb-3 justify-center md:justify-start">
                <h2 className="text-2xl font-bold text-white">
                    {isRTL ? 'من أنا؟' : 'Who am I?'}
                </h2>
                <span className="hidden md:inline-block h-1.5 w-1.5 rounded-full bg-blue-500/50"></span>
                <span className="text-sm font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20">
                    {isRTL ? profile.roleAr : profile.role}
                </span>
             </div>
             
             <p className="mb-6 text-lg leading-relaxed text-zinc-300">
               {profile.aboutText}
             </p>
             
             <div className="flex flex-wrap justify-center gap-3 md:justify-start">
               {profile.tags.map((tag, i) => (
                 <motion.span 
                   key={tag} 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className="flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm font-medium text-zinc-300 transition-all hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105 cursor-default shadow-sm"
                 >
                   <span className="text-blue-400">{getTagIcon(tag)}</span>
                   {tag}
                 </motion.span>
               ))}
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};