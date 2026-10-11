import React, { useState } from 'react';
import { ShoppingBag, Instagram, Sliders, Menu, X, Upload, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    config,
    updateConfig,
    cartCount,
    setIsCartOpen,
    setIsConfigModalOpen,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoUploadedFeedback, setLogoUploadedFeedback] = useState(false);

  // Handle direct file upload for logo
  const handleDirectLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        updateConfig({ customLogoUrl: result });
        setLogoUploadedFeedback(true);
        setTimeout(() => setLogoUploadedFeedback(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* Top Banner: Maison Announcement & Quick Actions */}
      <div className="bg-[var(--color-banner-bg,#071913)] text-[var(--color-bg,#F4F8F5)] px-4 py-2 text-xs tracking-wide border-b border-emerald-950/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Maison Slogan */}
          <div className="flex items-center gap-2 text-[11px] tracking-wider opacity-90">
            <span className="w-2 h-2 rounded-full bg-[#C5A059] shrink-0" />
            <span className="font-light">
              Maison CHAMASMODE · Haute Couture Marocaine & Jellabas d’Exception · Thème Vert Émeraude Royal
            </span>
          </div>

          {/* Direct Logo Upload Trigger & Paramètres */}
          <div className="flex items-center gap-3 shrink-0 text-[11px]">
            <label className="flex items-center gap-1.5 px-2.5 py-1 bg-[#C5A059] hover:brightness-110 text-[#071913] font-semibold rounded cursor-pointer transition-all">
              {logoUploadedFeedback ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Logo Enregistré !</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Importer mon Logo</span>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleDirectLogoUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="flex items-center gap-1 hover:underline text-white/80 hover:text-white cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-[#C5A059]" />
              <span>Paramètres</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation complying with Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-[var(--color-bg,#FAF8F5)]/95 backdrop-blur-md border-b border-[var(--color-border,#E8E2D9)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Zone */}
          <a
            href="#"
            className="flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent)]"
            aria-label="CHAMASMODE Accueil"
          >
            <Logo size="md" />
          </a>

          {/* Zone 2: 4-5 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-[var(--color-text)]/80 tracking-wide">
            <a
              href="#collection"
              className="hover:text-[var(--color-text)] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Collections
            </a>
            <a
              href="#savoir-faire"
              className="hover:text-[var(--color-text)] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Savoir-Faire
            </a>
            <a
              href="#sur-mesure"
              className="hover:text-[var(--color-text)] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Sur-Mesure
            </a>
            <a
              href="#contact"
              className="hover:text-[var(--color-text)] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-8"
            >
              Atelier & Contact
            </a>
          </nav>

          {/* Zone 3: Primary Action / Shopping Bag & Instagram */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Instagram link */}
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Suivre CHAMASMODE sur Instagram"
              className="hidden sm:flex items-center gap-1.5 text-xs text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1.5 px-2.5 rounded hover:bg-black/5"
              title={`Instagram: ${config.instagramHandle}`}
            >
              <Instagram className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="font-medium">{config.instagramHandle}</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`Panier (${cartCount} articles)`}
              className="relative flex items-center gap-2.5 px-4 py-2.5 bg-[var(--color-primary,#1E1B18)] text-[var(--color-bg,#FAF8F5)] text-xs font-semibold tracking-wider uppercase rounded hover:opacity-90 transition-all focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[var(--color-accent,#C5A059)]" />
              <span className="hidden sm:inline">Panier</span>
              <span className="tabular-nums px-1.5 py-0.5 bg-[var(--color-accent,#C5A059)] text-[var(--color-primary,#1E1B18)] text-[11px] font-bold rounded-full min-w-5 text-center">
                {cartCount}
              </span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[var(--color-text)]/80 hover:text-[var(--color-text)]"
              aria-label="Menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[var(--color-bg)] border-b border-[var(--color-border)] px-6 py-4 flex flex-col gap-4 text-sm font-medium text-[var(--color-text)]">
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--color-accent)]"
            >
              Collections Jellabas
            </a>
            <a
              href="#savoir-faire"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--color-accent)]"
            >
              Savoir-Faire Artisanal
            </a>
            <a
              href="#sur-mesure"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--color-accent)]"
            >
              Confection Sur-Mesure
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[var(--color-accent)]"
            >
              Atelier & Contact
            </a>

            <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[var(--color-muted)]"
              >
                <Instagram className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{config.instagramHandle}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsConfigModalOpen(true);
                }}
                className="text-[var(--color-accent)] font-semibold flex items-center gap-1"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Paramètres Boutique</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
