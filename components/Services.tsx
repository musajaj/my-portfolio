import React from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, BrainCircuit, PenTool } from 'lucide-react';
import { SERVICES } from '../constants';
import { Language } from '../types';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const isRTL = lang === Language.AR;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'layout': return <LayoutTemplate size={32} className="text-blue-400" />;
      case 'consulting': return <BrainCircuit size={32} className="text-blue-400" />;
      default: return <PenTool size={32} className="text-blue-400" />;
    }
  };

  return (
    <section id="services" className="relative z-10 border-t border-white/5 px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            {isRTL ? 'ماذا أقدم؟' : 'What I Offer'}
          </h2>
          <p className="text-zinc-400">
            {isRTL ? 'حلول تقنية مصممة لرفع مستوى الإنتاجية' : 'Tech solutions designed to boost productivity'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.02 }}
              className="group relative rounded-2xl border border-white/10 bg-zinc-900/30 backdrop-blur-xl p-8 transition-all duration-300 hover:border-blue-500/50 hover:bg-zinc-800/50 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                {getIcon(service.icon)}
              </div>
              <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};