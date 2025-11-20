import React from "react";

export function BorderBeam() {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden rounded-3xl">
      {/* The Rotating Beam */}
      <div 
        className="absolute -inset-[50%] w-[200%] h-[200%]"
        style={{ 
          background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 300deg, #3b82f6 360deg)',
          opacity: 0.5,
          animation: 'spin 4s linear infinite'
        }}
      />
      
      {/* The CSS Animation Keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}