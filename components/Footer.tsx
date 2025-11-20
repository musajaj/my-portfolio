import React from 'react';
import { Mail } from 'lucide-react';
import { PROFILE } from '../constants';
import { Language } from '../types';
import { SocialLink } from './SocialIcons';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const isRTL = lang === Language.AR;

  return (
    <footer id="contact" className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md pt-20 pb-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:items-start">
          
          <div className="max-w-sm text-center md:text-start">
            <h3 className="mb-4 text-2xl font-bold text-white">
              {isRTL ? 'دعنا نبني شيئاً رائعاً' : "Let's Build Something Great"}
            </h3>
            <p className="mb-6 text-zinc-400">
              {isRTL 
                ? 'هل لديك فكرة مشروع أو تريد تحسين إنتاجيتك؟ تواصل معي الآن.'
                : 'Have a project idea or want to boost your productivity? Contact me now.'}
            </p>
            <a 
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-black transition hover:bg-zinc-200"
            >
              <Mail size={18} />
              {PROFILE.email}
            </a>
          </div>

          <div className="flex flex-col gap-4 text-center md:text-start">
            <h4 className="font-bold text-white">
              {isRTL ? 'روابط التواصل' : 'Social Links'}
            </h4>
            <div className="flex gap-3">
               <SocialLink type="notion" href={PROFILE.socials.notionArabs} />
               <SocialLink type="facebook" href={PROFILE.socials.facebook} />
               <SocialLink type="whatsapp" href={PROFILE.socials.whatsapp} />
               <SocialLink type="email" href={`mailto:${PROFILE.email}`} />
            </div>
          </div>

        </div>

        <div className="mt-20 border-t border-white/5 pt-8 text-center">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};