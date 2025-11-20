import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { ARTICLES } from '../constants';
import { Language } from '../types';

interface ArticlesProps {
  lang: Language;
}

export const Articles: React.FC<ArticlesProps> = ({ lang }) => {
  const isRTL = lang === Language.AR;

  return (
    <section id="articles" className="relative z-10 px-6 py-24">
      <div className="mx-auto max-w-5xl">
         {/* Header */}
         <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
             <div>
                <h2 className="text-3xl font-bold text-white md:text-4xl mb-4">
                  {isRTL ? 'أحدث كتاباتي' : 'Latest Writing'}
                </h2>
                <p className="text-zinc-400 max-w-2xl leading-relaxed">
                  {isRTL 
                    ? 'مقالات متعمقة حول الإنتاجية، بناء أنظمة "العقل الثاني" في نوشن، وهندسة المعلومات.' 
                    : 'In-depth articles about productivity, building "Second Brain" systems in Notion, and information architecture.'}
                </p>
             </div>
             
             <a 
                href="https://www.notionarabs.com/creators/mustafaajaj" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group hidden md:flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
             >
                {isRTL ? 'عرض كل المقالات' : 'View all articles'}
                <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
             </a>
         </div>

         {/* Articles Grid */}
         <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {ARTICLES.map((article, index) => (
               <motion.a
                  key={article.id}
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-zinc-900/30 p-6 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/30 hover:bg-zinc-900/50 hover:shadow-xl hover:shadow-blue-500/5"
               >
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <span className="inline-flex items-center rounded-md border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                            {article.category}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">{article.date}</span>
                    </div>
                    <h3 className="text-lg font-bold leading-relaxed text-zinc-100 transition-colors group-hover:text-blue-400">
                        {article.title}
                    </h3>
                  </div>
                  
                  <div className="mt-auto flex items-center justify-end pt-6 border-t border-white/5">
                     <div className="flex items-center gap-2 text-sm font-bold text-zinc-500 transition-colors group-hover:text-white">
                        <span>{isRTL ? 'اقرأ المقال' : 'Read Article'}</span>
                        <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
                     </div>
                  </div>
               </motion.a>
            ))}
         </div>

         {/* Mobile "View All" Button */}
         <div className="mt-8 flex justify-center md:hidden">
            <a 
                href="https://www.notionarabs.com/creators/mustafaajaj" 
                target="_blank" 
                className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
            >
                {isRTL ? 'عرض كل المقالات' : 'View all articles'}
                <ArrowUpRight size={16} />
            </a>
         </div>
      </div>
    </section>
  );
};