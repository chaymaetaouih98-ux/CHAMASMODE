import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC = () => {
  const { products } = useStore();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const categories = [
    { id: 'all', label: 'Toutes les créations' },
    { id: 'haute-couture', label: 'Haute Couture' },
    { id: 'randa', label: 'Randa Fait-Main' },
    { id: 'velours', label: 'Velours Précieux' },
    { id: 'soie-crepe', label: 'Soie & Crêpe' },
  ];

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.samplePrice - b.samplePrice);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.samplePrice - a.samplePrice);
    }
    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <section id="collection" className="py-16 md:py-24 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#E8E2D9]">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-[#8A6B32] font-semibold mb-2">
            <span>Collection Haute Couture</span>
            <span aria-hidden="true">·</span>
            <span>Édition 2026</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1E1B18] tracking-tight">
            Nos Modèles & Créations Jellabas
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B6155] max-w-2xl leading-relaxed">
            Chaque création est confectionnée à la main dans notre atelier par nos maîtres artisans maâlems. Tissus nobles, sfifa d'exception et finitions sur-mesure.
          </p>
        </div>
      </div>

      {/* Filter Tabs & Sorting Toolbar */}
      <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Interactive Filter Tabs (Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F0EBE1] rounded-sm">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1E1B18] text-[#FAF8F5] shadow-xs'
                    : 'text-[#6B6155] hover:text-[#1E1B18] hover:bg-[#FAF8F5]/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs text-[#6B6155] self-end sm:self-auto">
          <span>Trier :</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-[#FAF8F5] border border-[#D9CEBF] px-2.5 py-1.5 text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32] cursor-pointer"
          >
            <option value="default">Recommandés</option>
            <option value="price-asc">Prix indicatif : Croissant</option>
            <option value="price-desc">Prix indicatif : Décroissant</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pt-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-16 text-center text-[#8A7E72] bg-[#F5F0E6] p-8 border border-dashed border-[#D9CEBF]">
          <p className="font-serif text-lg text-[#1E1B18]">Aucun modèle dans cette catégorie.</p>
          <button
            onClick={() => setActiveCategory('all')}
            className="mt-3 text-xs underline font-medium text-[#8A6B32] cursor-pointer"
          >
            Afficher tous les modèles
          </button>
        </div>
      )}
    </section>
  );
};
