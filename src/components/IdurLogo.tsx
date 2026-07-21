import React from 'react';

interface IdurLogoProps {
  className?: string;
  showBadge?: boolean;
}

export const IdurLogo: React.FC<IdurLogoProps> = ({ 
  className = "h-9",
  showBadge = true
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Official Green IDUR Logo Typography with D & U adjusted (+1px) */}
      <span 
        className="font-serif font-black tracking-tighter text-[#00873D] select-none flex items-baseline"
        style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
      >
        <span className="text-3xl sm:text-4xl">I</span>
        <span className="text-[22px] sm:text-[30px]">D</span>
        <span className="text-[22px] sm:text-[30px]">U</span>
        <span className="text-3xl sm:text-4xl">R</span>
      </span>

      {showBadge && (
        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-100 text-[#00873D] border border-emerald-300 font-mono-tech">
          S.A.
        </span>
      )}
    </div>
  );
};
