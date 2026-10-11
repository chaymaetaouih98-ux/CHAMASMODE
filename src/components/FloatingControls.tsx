import React, { useState } from 'react';
import { MessageCircle, Sliders, Share2, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingControls: React.FC = () => {
  const { config, setIsConfigModalOpen, setIsWhatsAppModalOpen } = useStore();
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-qa2alfb6cp32mpbimzm5tw-568931983872.europe-west2.run.app';

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'CHAMASMODE | Haute Couture Marocaine',
          text: 'Découvrez la boutique CHAMASMODE Haute Couture & Jellabas Marocaines :',
          url: shareUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    // Fallback: clipboard copy
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // prompt fallback
      window.prompt('Copiez ce lien :', shareUrl);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Quick Share Pill */}
      <button
        onClick={handleShare}
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 bg-[var(--color-bg,#FAF8F5)] text-[var(--color-primary,#1E1B18)] hover:bg-white text-xs font-semibold rounded-full shadow-lg border border-[var(--color-border,#E8E2D9)] transition-all hover:scale-105 cursor-pointer"
        title="Partager le lien du site"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span className="text-emerald-700">Lien copié !</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-[var(--color-accent,#C5A059)]" />
            <span>Partager le lien</span>
          </>
        )}
      </button>

      {/* Quick Setup Pill for Owner Preview */}
      <button
        onClick={() => setIsConfigModalOpen(true)}
        className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 bg-[var(--color-primary,#1E1B18)] text-[var(--color-bg,#FAF8F5)] hover:brightness-125 text-xs font-medium rounded-full shadow-lg border border-white/20 transition-all hover:scale-105 cursor-pointer"
        title="Ouvrir le panneau de configuration CHAMASMODE"
      >
        <Sliders className="w-3.5 h-3.5 text-[var(--color-accent,#C5A059)]" />
        <span className="hidden sm:inline">Logo & Paramètres</span>
        <span className="sm:hidden">Paramètres</span>
      </button>

      {/* Floating WhatsApp Action */}
      <button
        onClick={() => setIsWhatsAppModalOpen(true)}
        className="pointer-events-auto w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer group relative"
        aria-label="Contacter l'atelier sur WhatsApp"
        title={`WhatsApp Atelier: ${config.whatsAppDisplay}`}
      >
        <MessageCircle className="w-6 h-6 fill-current" />
        <span className="sr-only">WhatsApp</span>
        
        {/* Tooltip on hover */}
        <span className="absolute right-15 px-3 py-1.5 bg-[#1E1B18] text-white text-[11px] font-medium whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-md">
          Commander sur WhatsApp
        </span>
      </button>
    </div>
  );
};

