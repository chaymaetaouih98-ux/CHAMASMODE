import React, { useState } from 'react';
import { ShoppingBag, Instagram, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    config,
    cartCount,
    setIsCartOpen,
  } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner: Authentic Maison Announcement */}
      <div className="bg-[var(--color-banner-bg,#071913)] text-[var(--color-bg,#F4F8F5)] px-4 py-2.5 text-xs tracking-wider border-b border-emerald-950/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center text-center">
          <p className="text-[11px] sm:text-xs font-light tracking-widest uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
            <span>Maison Chama's MODE · Haute Couture & Jellabas Fès</span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-[var(--color-muted)]">Livraison Partout au Maroc & International</span>
          </p>
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
                className="flex items-center gap-1.5 text-[var(--color-muted)] hover:text-[var(--color-accent)]"
              >
                <Instagram className="w-4 h-4 text-[var(--color-accent)]" />
                <span>{config.instagramHandle}</span>
              </a>

              <a
                href={`https://wa.me/${config.whatsAppNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 font-semibold flex items-center gap-1 hover:underline"
              >
                <span>{config.whatsAppDisplay}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
