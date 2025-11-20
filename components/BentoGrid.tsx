
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../constants';
import { Project, Language } from '../types';
import { GlowingBorderCard } from './GlowingBorderCard';

interface BentoGridProps {
  lang: Language;
  onProjectClick: (slug: string) => void;
}

const ProjectCard: React.FC<{ project: Project; index: number; isRTL: boolean; onClick: () => void }> = ({ project, index, isRTL, onClick }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const isUniStack = project.slug === 'unistack-student-dashboard';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Determine placeholder image based on project slug
  const imageUrl = `https://picsum.photos/seed/${project.slug}/800/600`;

  const cardContent = (
    <>
      {/* Spotlight Effect Layer */}
      <div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isFocused ? 1 : 0,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(59, 130, 246, 0.15), transparent 40%)`,
        }}
      />

      {/* Image Background with Overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full rounded-3xl overflow-hidden">
        <img 
          src={imageUrl} 
          alt={project.title} 
          className="h-full w-full object-cover opacity-40 transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-zinc-950/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 flex h-full flex-col justify-end p-8 pointer-events-none">
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full border border-blue-500/30 bg-blue-500/20 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
            {project.category}
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition group-hover:bg-blue-600 group-hover:border-blue-600">
            <ArrowUpRight size={18} />
          </div>
        </div>
        
        <h3 className="mb-2 text-xl font-bold text-white md:text-2xl drop-shadow-sm">{project.title}</h3>
        <p className="text-sm leading-relaxed text-zinc-400 md:text-base line-clamp-3">
          {project.shortDesc}
        </p>
      </div>
    </>
  );

  return (
    <motion.div
      ref={divRef}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 400, damping: 10 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      className={`group relative cursor-pointer rounded-3xl transition-colors ${
        project.featured ? 'md:col-span-2 md:row-span-1' : 'col-span-1'
      } ${!isUniStack ? 'border border-white/10 bg-zinc-950/30 backdrop-blur-md hover:border-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/10' : ''}`}
    >
      {isUniStack ? (
        <GlowingBorderCard 
          className="w-full h-full rounded-3xl" 
          glowColor="from-blue-500 via-indigo-500 to-blue-600"
          speed="normal"
        >
          {cardContent}
        </GlowingBorderCard>
      ) : (
        cardContent
      )}
    </motion.div>
  );
};

export const BentoGrid: React.FC<BentoGridProps> = ({ lang, onProjectClick }) => {
  const isRTL = lang === Language.AR;
  
  return (
    <section id="projects" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex flex-col items-center text-center">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              {isRTL ? 'أعمالي المميزة' : 'Featured Work'}
            </h2>
            <div className="h-1 w-24 rounded-full bg-blue-600" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PROJECTS.map((project, index) => (
            <ProjectCard 
              key={project.slug} 
              project={project} 
              index={index} 
              isRTL={isRTL} 
              onClick={() => onProjectClick(project.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};