import React from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import heroImage from '@/src/assets/images/hero_moroccan_jellaba_1791757446974.jpg';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { config, setIsWhatsAppModalOpen } = useStore();

  return (
    <section className="relative overflow-hidden bg-[var(--color-primary,#1E1B18)] text-[var(--color-bg,#FAF8F5)]">
      {/* Editorial split showcase for desktop */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Haute Couture Typography & Narrative */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 z-10">
          {/* Subtle Top Kicker */}
          <div className="flex items-center gap-3 text-xs tracking-[0.25em] uppercase text-[var(--color-accent,#C5A059)] font-medium">
            <span>Maison de Couture Marocaine</span>
            <span aria-hidden="true">·</span>
            <span>Collection 2026</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-normal tracking-tight leading-[1.08] text-balance">
              L’Art Intemporel de la <span className="italic font-light opacity-90">Jellaba</span> Haute Couture
            </h1>
            <p className="text-base sm:text-lg opacity-85 font-light leading-relaxed max-w-xl">
              Noblesse des crêpes de soie, passementeries traditionnelles façonnées par nos maîtres artisans et broderies randa d’une finesse absolue.
            </p>
          </div>

          {/* Action Points */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <a
              href="#collection"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--color-accent,#C5A059)] text-[var(--color-primary,#1E1B18)] text-xs font-semibold tracking-widest uppercase hover:brightness-110 transition-colors shadow-sm text-center cursor-pointer"
            >
              <span>Explorer la Collection</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => setIsWhatsAppModalOpen(true)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 border border-white/20 text-white text-xs font-semibold tracking-wider uppercase hover:border-[var(--color-accent,#C5A059)] hover:text-[var(--color-accent,#C5A059)] transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>Commander sur WhatsApp</span>
            </button>
          </div>

          {/* Unboxed Metadata Trust Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs opacity-75 tracking-wide">
            <span>Fait-Main au Maroc</span>
            <span aria-hidden="true">·</span>
            <span>Confection Sur-Mesure</span>
            <span aria-hidden="true">·</span>
            <span>Livraison Partout au Maroc & International</span>
          </div>
        </div>

        {/* Right Column: Hero High-Fashion Imagery */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden rounded-sm shadow-2xl bg-[#141210]">
            <img
              src={heroImage}
              alt="Jellaba marocaine haute couture CHAMASMODE"
              className="w-full h-full object-cover object-center transform hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Subtle luxury vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

            {/* Floating Sample Tag on image */}
            <div className="absolute bottom-5 left-5 right-5 p-4 bg-[#1E1B18]/90 backdrop-blur-md border border-[#3A342E] flex items-center justify-between text-xs">
              <div>
                <p className="text-[#FAF8F5] font-serif font-medium text-sm">
                  Jellaba Émeraude Impériale
                </p>
                <p className="text-[#C5A059] text-[11px] font-sans tracking-wide">
                  [Modèle Démonstration · Sfifa Dorée Fait-Main]
                </p>
              </div>

              <div className="text-right">
                <span className="text-xs text-[#E8D8C3] font-medium tabular-nums">
                  1 850 MAD
                </span>
                <p className="text-[10px] text-[#9E9285]">Prix indicatif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
