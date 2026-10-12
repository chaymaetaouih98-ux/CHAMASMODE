import React from 'react';
import { Sparkles, Scissors, Heart, ShieldCheck } from 'lucide-react';
import randaImage from '@/src/assets/images/jellaba_crepe_randa_1791757457227.jpg';
import veloursImage from '@/src/assets/images/jellaba_velours_noir_1791757466616.jpg';

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section id="savoir-faire" className="py-20 md:py-28 bg-[#F5F0E6] border-y border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <div className="flex items-center justify-center gap-2 text-xs tracking-[0.25em] uppercase text-[#8A6B32] font-semibold">
            <span>Héritage & Confection</span>
            <span aria-hidden="true">·</span>
            <span>Atelier de Fès</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
            Le Savoir-Faire Artisanal de Chama's MODE
          </h2>
          <p className="text-sm sm:text-base text-[#6B6155] leading-relaxed">
            Chaque jellaba est une œuvre façonnée avec patience. Nos créations perpétuent l'art noble des Maâlems marocains tout en sublimant les coupes contemporaines.
          </p>
        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-[#FAF8F5] p-6 border border-[#E8E2D9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#8A6B32]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1E1B18]">
              01. La Sfifa & Le Zouaq
            </h3>
            <p className="text-xs text-[#6B6155] leading-relaxed">
              Passementeries nobles en fil de soie de Fès ou fil d’or raffiné, tissées pour encadrer avec grâce le col et la capuche.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#E8E2D9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#8A6B32]">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1E1B18]">
              02. Les Aakad Tressés
            </h3>
            <p className="text-xs text-[#6B6155] leading-relaxed">
              Des dizaines de boutons traditionnels sphériques minutieusement noués à la main un par un, symboles de patience et d'authenticité.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#E8E2D9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#8A6B32]">
              <Scissors className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1E1B18]">
              03. La Broderie Randa
            </h3>
            <p className="text-xs text-[#6B6155] leading-relaxed">
              Dentelle à l’aiguille d’une précision magistrale, créant des motifs ajourés géométriques ou floraux d'une finesse incomparable.
            </p>
          </div>

          <div className="bg-[#FAF8F5] p-6 border border-[#E8E2D9] space-y-3">
            <div className="w-10 h-10 rounded-full bg-[#EFE9DF] flex items-center justify-center text-[#8A6B32]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg text-[#1E1B18]">
              04. Confection Sur-Mesure
            </h3>
            <p className="text-xs text-[#6B6155] leading-relaxed">
              Possibilité d’ajuster la longueur, le tour de poitrine et la coupe selon vos mensurations pour un tombé impérial.
            </p>
          </div>
        </div>

        {/* Storytelling Double Feature */}
        <div id="sur-mesure" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] border border-[#E8E2D9] p-8 md:p-12">
          <div className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-[#E8E2D9]">
            <img
              src={randaImage}
              alt="Broderie randa artisanale"
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-6 lg:pl-6">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8A6B32] font-semibold">
              <span>Service Personnalisé</span>
              <span aria-hidden="true">·</span>
              <span>Accompagnement Dédié</span>
            </div>

            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1E1B18] leading-tight">
              Une Jellaba Pensée Spécialement Pour Vous
            </h3>

            <p className="text-sm text-[#5C5349] leading-relaxed">
              Vous avez un événement particulier, un mariage familial ou vous recherchez une couleur spécifique qui ne figure pas encore dans notre catalogue ?
            </p>

            <p className="text-sm text-[#5C5349] leading-relaxed">
              L'atelier CHAMASMODE vous conseille directement sur WhatsApp : choix du tissu (crêpe georgette, satin de soie, velours royal), sélection des teintes et validation de vos mensurations.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#collection"
                className="px-6 py-3 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] transition-colors"
              >
                Explorer Nos Modèles
              </a>

              <span className="text-xs text-[#8A7E72]">
                Échange direct avec la créatrice via WhatsApp
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
