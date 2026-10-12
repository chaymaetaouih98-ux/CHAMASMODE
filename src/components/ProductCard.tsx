import React from 'react';
import { Eye, MessageCircle, ShoppingBag } from 'lucide-react';
import { Product } from '../types/store';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, formatPrice, addToCart, setDirectWhatsAppItem, setIsWhatsAppModalOpen } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      selectedSize: product.sizes[0] || 'Sur-Mesure',
      selectedColor: product.colors[0]?.name || 'Standard',
      samplePrice: product.samplePrice,
      quantity: 1,
    });
  };

  const handleQuickWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirectWhatsAppItem({
      id: `${product.id}-direct`,
      productId: product.id,
      name: product.name,
      image: product.image,
      selectedSize: product.sizes[0] || 'Sur-Mesure',
      selectedColor: product.colors[0]?.name || 'Standard',
      samplePrice: product.samplePrice,
      quantity: 1,
    });
    setIsWhatsAppModalOpen(true);
  };

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group flex flex-col bg-[var(--color-bg,#FAF8F5)] border border-[var(--color-border,#E8E2D9)] rounded-none overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-surface,#F0EBE1)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Fallback if custom URL fails
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />

        {/* Fallback container if image fails to load */}
        <div className="absolute inset-0 bg-[var(--color-surface,#EFE9DF)] hidden items-center justify-center p-6 text-center text-[var(--color-muted)]">
          <span className="font-serif text-lg">{product.name}</span>
        </div>

        {/* Prestige Badge */}
        <div className="absolute top-3 left-3 bg-[#0D281E]/90 backdrop-blur-sm text-[#F4F8F5] px-2.5 py-1 text-[10px] font-sans tracking-widest uppercase border border-emerald-900/40">
          Haute Couture
        </div>

        {/* Quick View Hover Overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProduct(product);
            }}
            className="px-4 py-2.5 bg-[var(--color-bg,#FAF8F5)] text-[var(--color-primary,#1E1B18)] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shadow-md hover:bg-[var(--color-accent)] hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Détails & Tailles</span>
          </button>
        </div>
      </div>

      {/* Card Content & Metadata */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-1.5">
          {/* Unboxed Category Metadata */}
          <div className="flex items-center gap-2 text-xs text-[var(--color-muted,#8A7E72)] uppercase tracking-wider">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>Fès</span>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-lg font-medium text-[var(--color-text,#1E1B18)] group-hover:text-[var(--color-accent,#8A6B32)] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-xs text-[var(--color-muted,#6B6155)] line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Primary Interactive Buttons */}
        <div className="pt-3 border-t border-[var(--color-border,#E8E2D9)] space-y-3">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-sm font-semibold tabular-nums text-[var(--color-text,#1E1B18)]">
                {formatPrice(product.samplePrice)}
              </span>
              <span className="ml-1.5 text-[11px] text-[var(--color-muted)] italic">
                (Prix indicatif)
              </span>
            </div>

            {/* Colors Preview Dots */}
            <div className="flex items-center gap-1">
              {product.colors.slice(0, 3).map((col) => (
                <span
                  key={col.name}
                  className="w-3 h-3 rounded-full border border-black/10 shrink-0"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
            </div>
          </div>

          {/* Action Strip */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleQuickWhatsApp}
              className="w-full py-2 px-2.5 bg-[var(--color-surface,#F0EBE1)] hover:brightness-95 text-[var(--color-text,#1E1B18)] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Demander ce modèle sur WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={handleQuickAdd}
              className="w-full py-2 px-2.5 bg-[var(--color-primary,#1E1B18)] hover:brightness-125 text-[var(--color-bg,#FAF8F5)] text-[11px] font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              title="Ajouter au Panier"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[var(--color-accent,#C5A059)]" />
              <span>Panier</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
