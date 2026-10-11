import React from 'react';
import { Instagram, MessageCircle, Sliders, MapPin, Shield } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const { config, setIsConfigModalOpen, setIsWhatsAppModalOpen } = useStore();

  const cleanPhone = (config.whatsAppNumber || '212600000000').replace(/[^0-9]/g, '');

  return (
    <footer id="contact" className="bg-[#141210] text-[#E8D8C3] border-t border-[#292522]">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
        {/* Brand & Mission */}
        <div className="lg:col-span-5 space-y-4">
          <Logo size="lg" variant="light" />
          <p className="text-xs text-[#A89C8F] leading-relaxed max-w-sm pt-2">
            Maison marocaine de confection haute couture et créations contemporaines de jellabas. Noblesse des matières, broderies à la main et élégance intemporelle.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram CHAMASMODE"
              className="w-9 h-9 rounded-full bg-[#24201C] hover:bg-[#C5A059] text-[#E8D8C3] hover:text-[#1E1B18] flex items-center justify-center transition-colors"
              title={`Suivre ${config.instagramHandle} sur Instagram`}
            >
              <Instagram className="w-4 h-4" />
            </a>

            <a
              href={`https://wa.me/${cleanPhone}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp CHAMASMODE"
              className="w-9 h-9 rounded-full bg-[#24201C] hover:bg-[#25D366] text-[#E8D8C3] hover:text-white flex items-center justify-center transition-colors"
              title={`Écrire sur WhatsApp au ${config.whatsAppDisplay}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Collections Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
            Collections
          </h4>
          <ul className="space-y-2 text-xs text-[#A89C8F]">
            <li>
              <a href="#collection" className="hover:text-white transition-colors">
                Haute Couture
              </a>
            </li>
            <li>
              <a href="#collection" className="hover:text-white transition-colors">
                Randa Fait-Main
              </a>
            </li>
            <li>
              <a href="#collection" className="hover:text-white transition-colors">
                Velours Cérémonie
              </a>
            </li>
            <li>
              <a href="#collection" className="hover:text-white transition-colors">
                Soie & Crêpe
              </a>
            </li>
          </ul>
        </div>

        {/* Savoir-Faire */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
            Maison & Atelier
          </h4>
          <ul className="space-y-2 text-xs text-[#A89C8F]">
            <li>
              <a href="#savoir-faire" className="hover:text-white transition-colors">
                Artisanat Marocain
              </a>
            </li>
            <li>
              <a href="#sur-mesure" className="hover:text-white transition-colors">
                Prise de Mesures
              </a>
            </li>
            <li>
              <button
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="hover:text-white transition-colors text-left cursor-pointer"
              >
                Commander sur WhatsApp
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Boutique Administration */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#FAF8F5]">
            Contact Atelier
          </h4>
          <div className="space-y-2 text-xs text-[#A89C8F]">
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>Atelier de Confection au Maroc</span>
            </p>
            <p className="flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
              <span className="font-mono text-white">{config.whatsAppDisplay}</span>
            </p>
            <p className="flex items-center gap-2">
              <Instagram className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>{config.instagramHandle}</span>
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setIsConfigModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#24201C] hover:bg-[#332E29] text-[#C5A059] text-xs font-medium rounded border border-[#3A342E] transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Configurer coordonnées</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#24201C] py-6 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7E72]">
          <p>© {new Date().getFullYear()} CHAMASMODE. Tous droits réservés.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Version de prévisualisation</span>
            <span aria-hidden="true">·</span>
            <span>Produits d'exemple modifiables</span>
            <span aria-hidden="true">·</span>
            <span>Haute Couture Marocaine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
