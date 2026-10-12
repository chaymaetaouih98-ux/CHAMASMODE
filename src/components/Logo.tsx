import React from 'react';
import { useStore } from '../context/StoreContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'dark' }) => {
  const { config } = useStore();

  const isLight = variant === 'light';
  const textColor = isLight ? 'text-[#FAF8F5]' : 'text-[#1E1B18]';
  const subtitleColor = isLight ? 'text-[#E8D8C3]/80' : 'text-[#8A7E72]';

  // If user has uploaded or configured their official logo
  if (config.customLogoUrl) {
    const imgSize =
      size === 'sm'
        ? 'w-10 h-10'
        : size === 'lg'
        ? 'w-20 h-20'
        : 'w-14 h-14';

    const textStyle =
      size === 'sm'
        ? { title: 'text-sm font-semibold tracking-wider', sub: 'text-[8.5px] tracking-widest' }
        : size === 'lg'
        ? { title: 'text-2xl md:text-3xl font-serif font-bold tracking-wider', sub: 'text-xs tracking-widest' }
        : { title: 'text-lg font-serif font-semibold tracking-wider', sub: 'text-[10px] tracking-widest' };

    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <div className={`${imgSize} rounded-full overflow-hidden shrink-0 border border-[#C5A059]/50 bg-white p-0.5 shadow-md transition-transform duration-300 hover:scale-105`}>
          <img
            src={config.customLogoUrl}
            alt={config.brandName}
            className="w-full h-full object-contain rounded-full"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col">
          <span className={`font-serif uppercase ${textColor} ${textStyle.title} leading-none`}>
            {config.brandName}
          </span>
          <span className={`font-sans uppercase ${subtitleColor} ${textStyle.sub} mt-1 font-medium`}>
            Haute Couture · Fès
          </span>
        </div>
      </div>
    );
  }

  // Elegant Haute Couture bespoke emblem for CHAMASMODE
  const dimensions =
    size === 'sm'
      ? { icon: 28, text: 'text-base tracking-[0.25em]', sub: 'text-[9px] tracking-[0.3em]' }
      : size === 'lg'
      ? { icon: 44, text: 'text-2xl md:text-3xl tracking-[0.28em]', sub: 'text-[11px] tracking-[0.35em]' }
      : { icon: 34, text: 'text-lg tracking-[0.25em]', sub: 'text-[9.5px] tracking-[0.3em]' };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Artisanal Moroccan Couture Monogram */}
      <svg
        width={dimensions.icon}
        height={dimensions.icon}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        <circle cx="50" cy="50" r="47" stroke="var(--color-accent, #C5A059)" strokeWidth="1.5" strokeDasharray="3 3" />
        <circle cx="50" cy="50" r="43" stroke="var(--color-accent, #C5A059)" strokeWidth="1" opacity="0.6" />
        
        {/* Moroccan Keyhole Arch Silhouette */}
        <path
          d="M50 18C41 18 34 25 34 34C34 40 37 44 41 47L41 78C41 80 43 82 45 82H55C57 82 59 80 59 78L59 47C63 44 66 40 66 34C66 25 59 18 50 18Z"
          stroke="var(--color-accent, #C5A059)"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Couture Needle & Thread intersection */}
        <line x1="28" y1="28" x2="72" y2="72" stroke="var(--color-accent, #C5A059)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="28" cy="28" r="2.5" fill="var(--color-accent, #C5A059)" />

        {/* Central Monogram CM */}
        <text
          x="50"
          y="58"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', Georgia, serif"
          fontSize="24"
          fontWeight="600"
          fill={isLight ? '#FAF8F5' : 'var(--color-primary, #1E1B18)'}
          style={{ letterSpacing: '0.05em' }}
        >
          C
        </text>
      </svg>

      <div className="flex flex-col">
        <span
          className={`font-serif font-semibold uppercase ${textColor} ${dimensions.text} transition-colors leading-none`}
        >
          {config.brandName}
        </span>
        <span
          className={`font-sans font-medium uppercase ${subtitleColor} ${dimensions.sub} mt-1`}
        >
          Haute Couture · Fès
        </span>
      </div>
    </div>
  );
};
