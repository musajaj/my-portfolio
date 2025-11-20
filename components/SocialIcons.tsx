import React from 'react';
import { Mail } from 'lucide-react';

// Simple Icons SVGs for Brand Authenticity

const SiNotion = () => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M4.021 2.183 2.583 4.016c-.201.254-.038.508.22.508h2.425l.025.022 4.854 8.728V4.524h-1.2c-.32 0-.349-.273-.257-.508l.56-1.451c.134-.349.374-.382.672-.382h5.952c.309 0 .586.203.403.508l-.478 1.334h-1.488v11.707l-3.29-5.918v5.918h1.344c.292 0 .347.226.257.508l-.562 1.454c-.133.349-.374.382-.672.382H5.32c-.309 0-.586-.203-.403-.508l.481-1.334h1.485l.003-14.57z" />
  </svg>
);

const SiFacebook = () => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036c-2.648 0-3.216 1.665-3.216 3.259v.808h3.698l-1.048 3.667h-8.314v7.98H9.101z" />
  </svg>
);

const SiWhatsapp = () => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

interface SocialLinkProps {
  href: string;
  type: 'notion' | 'facebook' | 'whatsapp' | 'email';
  className?: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ href, type, className = "" }) => {
  const getIcon = () => {
    switch (type) {
      case 'notion': return <SiNotion />;
      case 'facebook': return <SiFacebook />;
      case 'whatsapp': return <SiWhatsapp />;
      case 'email': return <Mail size={20} />;
    }
  };

  const getHoverColor = () => {
     switch (type) {
      case 'notion': return 'hover:text-white hover:bg-zinc-700 group-hover:text-white group-hover:bg-zinc-700';
      case 'facebook': return 'hover:text-[#1877F2] hover:bg-[#1877F2]/10 group-hover:text-[#1877F2] group-hover:bg-[#1877F2]/10';
      case 'whatsapp': return 'hover:text-[#25D366] hover:bg-[#25D366]/10 group-hover:text-[#25D366] group-hover:bg-[#25D366]/10';
      case 'email': return 'hover:text-blue-400 hover:bg-blue-500/10 group-hover:text-blue-400 group-hover:bg-blue-500/10';
    }
  };

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800/50 text-zinc-400 transition-all duration-300 hover:scale-110 ${getHoverColor()} ${className}`}
    >
      {getIcon()}
    </a>
  );
};
