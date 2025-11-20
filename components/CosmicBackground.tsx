import React, { useEffect, useState } from 'react';

export const CosmicBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden bg-[#05050a]">
      {/* 1. The Deep Space Gradient (Nebula) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-blue-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }}></div>
      
      {/* 2. The Grid (Engineering Vibe) */}
      <div 
        className="absolute inset-0 opacity-20" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(circle at center, transparent 20%, black 100%)',
          WebkitMaskImage: 'radial-gradient(circle at center, transparent 20%, black 100%)' 
        }} 
      ></div>

      {/* 3. The Stars (Static CSS for Performance) */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(1px 1px at 10% 10%, white, transparent), radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(2px 2px at 40% 70%, white, transparent), radial-gradient(1px 1px at 60% 40%, white, transparent), radial-gradient(1px 1px at 80% 10%, white, transparent), radial-gradient(2px 2px at 90% 90%, white, transparent)', opacity: 0.6 }}></div>
    </div>
  );
};