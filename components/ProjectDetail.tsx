import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, Download, ExternalLink } from 'lucide-react';
import { Project, Language } from '../types';
import UnboxingButton from './UnboxingButton';

interface ProjectDetailProps {
  project: Project;
  lang: Language;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, lang, onBack }) => {
  const isRTL = lang === Language.AR;
  const Arrow = isRTL ? ArrowRight : ArrowLeft;

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen w-full bg-zinc-950/70 backdrop-blur-2xl pt-24 pb-20 px-6 relative z-50 flex flex-col"
    >
      <div className="mx-auto max-w-6xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="group mb-8 flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors hover:text-white"
        >
          <Arrow size={18} className="transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
          {isRTL ? 'العودة للمشاريع' : 'Back to Projects'}
        </button>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex flex-wrap items-center gap-3">
             <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-300 backdrop-blur-md">
                {project.category}
             </span>
             <span className="flex items-center gap-1 rounded-full border border-zinc-700 bg-zinc-800/50 px-3 py-1 text-xs font-medium text-zinc-300">
                <Download size={12} />
                {project.downloadCount}
             </span>
          </div>
          <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Image */}
            <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 shadow-2xl aspect-video relative">
               <img 
                  src={`https://picsum.photos/seed/${project.slug}/1200/600`} 
                  alt={project.title}
                  className="h-full w-full object-cover opacity-80 hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]" />
            </div>

            <div className="prose prose-invert prose-lg max-w-none">
              <h3 className="mb-4 text-2xl font-bold text-white">
                {isRTL ? 'عن المشروع' : 'About Project'}
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-zinc-300">
                {project.fullDesc}
              </p>

              <h3 className="mb-6 text-2xl font-bold text-white">
                {isRTL ? 'المميزات الرئيسية' : 'Key Features'}
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.features?.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-zinc-900/30 p-4 backdrop-blur-sm"
                  >
                    <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-blue-500" />
                    <span className="text-zinc-300">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-6 lg:sticky lg:top-28">
              <div className="rounded-3xl border border-white/10 bg-zinc-900/40 p-8 shadow-2xl backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-zinc-400">{isRTL ? 'السعر' : 'Price'}</span>
                  <span className="text-xl font-bold text-white">
                     {project.externalLink.includes('gumroad') ? '$' : 'Free / Premium'}
                  </span>
                </div>
                
                {/* Unboxing Button Replacement */}
                <div className="mb-4">
                    <UnboxingButton project={project} lang={lang} />
                </div>

                <p className="text-center text-xs text-zinc-500 mt-2">
                  {isRTL 
                    ? 'سيتم تحويلك إلى الصفحة الرسمية للتحميل' 
                    : 'You will be redirected to the official download page'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
