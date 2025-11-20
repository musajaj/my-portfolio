
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Globe, ChevronRight, ChevronLeft } from 'lucide-react';
import { Language, Profile } from '../types';
import { SocialLink } from './SocialIcons';

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onNavigate: (target: string) => void;
  profile: Profile;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onNavigate, profile }) => {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const isRTL = lang === Language.AR;

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Hide if scrolling down AND moved more than 150px
    if (latest > previous && latest > 150) {
      setHidden(true);
      setIsOpen(false); // Close mobile menu when hiding
    } else {
      setHidden(false);
    }
  });

  const toggleLang = () => {
    setLang(lang === Language.AR ? Language.EN : Language.AR);
  };

  // Updated to accept generic MouseEvent to support both Div and Anchor clicks
  const handleScroll = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    onNavigate(href);
    setIsOpen(false);
  };

  const navLinks = [
    { name: lang === Language.AR ? 'الرئيسية' : 'Home', href: '#' },
    { name: lang === Language.AR ? 'المشاريع' : 'Projects', href: '#projects' },
    { name: lang === Language.AR ? 'خدماتي' : 'Services', href: '#services' },
    { name: lang === Language.AR ? 'عني' : 'About', href: '#about' },
  ];

  const navbarVariants = {
    visible: { y: 0, opacity: 1 },
    hidden: { y: -100, opacity: 0 },
  };

  return (
    <>
      <motion.nav 
        variants={navbarVariants}
        initial="visible"
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 mx-auto w-[90%] max-w-2xl rounded-full border border-white/10 bg-zinc-950/30 backdrop-blur-md shadow-2xl shadow-black/20 px-4 py-2 sm:px-5"
      >
        <div className="flex items-center justify-between">
          {/* Avatar & Name - Interactive - Scrolls to Top */}
          <motion.div 
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer" 
            onClick={(e) => handleScroll(e, '#')}
          >
            <img 
              src={profile.avatar} 
              alt="Avatar"
              className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/20"
            />
            <span className="font-bold text-sm text-zinc-100 hidden sm:block tracking-wide">
              {lang === Language.AR ? profile.nameAr : profile.name}
            </span>
          </motion.div>

          {/* Desktop Links - Sliding Bubble Effect */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative px-4 py-2 text-xs font-medium transition-colors duration-200"
                style={{ 
                  color: hoveredIndex === index ? '#ffffff' : '#a1a1aa' 
                }}
              >
                {/* The Magic Sliding Background */}
                {hoveredIndex === index && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="absolute inset-0 z-0 bg-white/10 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* The Text */}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={toggleLang}
              className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white border border-white/5"
            >
              <Globe size={12} />
              <span>{lang === Language.AR ? 'EN' : 'AR'}</span>
            </button>
            
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, '#contact')}
              className="hidden sm:flex items-center rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:scale-105 active:scale-95"
            >
              {lang === Language.AR ? 'تواصل معي' : 'Contact'}
            </a>

            <button 
              className="md:hidden flex items-center justify-center h-9 w-9 rounded-full bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition"
              onClick={() => setIsOpen(true)}
            >
              <Menu size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: isRTL ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '-100%' : '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed inset-y-0 z-[70] w-[80%] max-w-sm bg-zinc-900/95 backdrop-blur-2xl border-white/10 shadow-2xl md:hidden ${
                isRTL ? 'left-0 border-r' : 'right-0 border-l'
              }`}
            >
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={(e) => handleScroll(e, '#')}>
                        <img src={profile.avatar} className="h-8 w-8 rounded-full" alt="avatar" />
                        <span className="font-bold text-white">{lang === Language.AR ? 'القائمة' : 'Menu'}</span>
                    </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 bg-white/5 text-zinc-400 hover:text-white transition"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a 
                      key={link.name} 
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.href)}
                      className="group flex items-center justify-between rounded-xl bg-white/5 p-4 text-zinc-300 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="font-medium">{link.name}</span>
                      {isRTL ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                    </a>
                  ))}
                  
                   <a 
                    href="#contact"
                    onClick={(e) => handleScroll(e, '#contact')}
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                  >
                    {lang === Language.AR ? 'تواصل معي' : 'Contact Me'}
                  </a>
                </div>

                <div className="mt-auto">
                   <div className="flex justify-center gap-4 mb-6 pt-6 border-t border-white/10">
                      <SocialLink type="notion" href={profile.socials.notionArabs} />
                      <SocialLink type="facebook" href={profile.socials.facebook} />
                      <SocialLink type="whatsapp" href={profile.socials.whatsapp} />
                   </div>
                   <div className="text-center text-xs text-zinc-600">
                      © {new Date().getFullYear()} {profile.name}
                   </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
