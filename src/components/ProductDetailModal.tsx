import React, { useState } from 'react';
import { X, MessageCircle, ShoppingBag, Check, Sparkles, Scissors } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    formatPrice,
    addToCart,
    setDirectWhatsAppItem,
    setIsWhatsAppModalOpen,
  } = useStore();

  const [selectedSize, setSelectedSize] = useState<string>('38');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [customLongueur, setCustomLongueur] = useState<string>('');
  const [customPoitrine, setCustomPoitrine] = useState<string>('');
  const [customHanches, setCustomHanches] = useState<string>('');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!selectedProduct) return null;

  const activeColor = selectedColor || selectedProduct.colors[0]?.name || 'Standard';
  const isSurMesure = selectedSize === 'Sur-Mesure';

  const handleAddToCart = () => {
    addToCart({
      productId: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      selectedSize,
      selectedColor: activeColor,
      customMeasurements: isSurMesure
        ? {
            longueur: customLongueur || 'À préciser sur WhatsApp',
            poitrine: customPoitrine || 'À préciser sur WhatsApp',
            hanches: customHanches || 'À préciser sur WhatsApp',
          }
        : undefined,
      samplePrice: selectedProduct.samplePrice,
      quantity,
    });
    setAddedNotice(true);
    setTimeout(() => {
      setAddedNotice(false);
      setSelectedProduct(null);
    }, 800);
  };

  const handleDirectWhatsApp = () => {
    setDirectWhatsAppItem({
      id: `${selectedProduct.id}-direct`,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      image: selectedProduct.image,
      selectedSize,
      selectedColor: activeColor,
      customMeasurements: isSurMesure
        ? {
            longueur: customLongueur || 'À convenir ensemble',
            poitrine: customPoitrine || 'À convenir ensemble',
            hanches: customHanches || 'À convenir ensemble',
          }
        : undefined,
      samplePrice: selectedProduct.samplePrice,
      quantity,
    });
    setSelectedProduct(null);
    setIsWhatsAppModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] max-w-4xl w-full border border-[#D9CEBF] shadow-2xl overflow-hidden my-8">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          aria-label="Fermer la vue produit"
          className="absolute top-4 right-4 z-20 p-2 bg-[#FAF8F5]/90 hover:bg-[#1E1B18] text-[#1E1B18] hover:text-[#FAF8F5] transition-colors rounded-full cursor-pointer shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] overflow-y-auto">
          {/* Left Column: Image Gallery */}
          <div className="md:col-span-5 bg-[#F0EBE1] relative aspect-[3/4] md:aspect-auto">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 bg-[#1E1B18]/90 text-[#E8D8C3] px-3 py-1 text-xs tracking-wider uppercase">
              Modèle Exemple
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Category & Status */}
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#8A7E72]">
                <span>{selectedProduct.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span>Confection Artisanale</span>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1E1B18] leading-tight">
                {selectedProduct.name}
              </h2>

              {/* Price Banner */}
              <div className="p-3 bg-[#F5F0E6] border border-[#E8E2D9] flex items-baseline justify-between">
                <div>
                  <span className="text-xl font-bold tabular-nums text-[#1E1B18]">
                    {formatPrice(selectedProduct.samplePrice)}
                  </span>
                  <span className="ml-2 text-xs text-[#8A7E72] italic">
                    (Prix d'exemple modifiable)
                  </span>
                </div>
                <span className="text-xs text-[#8A6B32] font-medium">
                  Pièce sur commande
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#5C5349] leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* Color Selection */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#1E1B18] flex items-center justify-between">
                  <span>Couleur du tissu :</span>
                  <span className="text-[#8A6B32] normal-case font-medium">{activeColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {selectedProduct.colors.map((c) => {
                    const isSelected = activeColor === c.name;
                    return (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-1.5 border text-xs cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#1E1B18] bg-[#1E1B18] text-white shadow-xs'
                            : 'border-[#D9CEBF] bg-[#FAF8F5] text-[#1E1B18] hover:border-[#8A6B32]'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold uppercase tracking-wider text-[#1E1B18]">
                    Taille :
                  </span>
                  <span className="text-[#8A7E72] text-[11px]">
                    Sélectionnez votre taille ou Sur-Mesure
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {selectedProduct.sizes.map((sz) => {
                    const isSelected = selectedSize === sz;
                    return (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-medium text-center border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#1E1B18] bg-[#1E1B18] text-[#FAF8F5]'
                            : 'border-[#D9CEBF] bg-[#FAF8F5] text-[#1E1B18] hover:border-[#8A6B32]'
                        }`}
                      >
                        {sz}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Sizing Drawer if Sur-Mesure is selected */}
                {isSurMesure && (
                  <div className="mt-3 p-3.5 bg-[#F0EBE1] border border-[#D9CEBF] space-y-2.5 text-xs">
                    <div className="flex items-center gap-2 text-[#8A6B32] font-semibold">
                      <Scissors className="w-4 h-4" />
                      <span>Option Sur-Mesure Personnalisée</span>
                    </div>
                    <p className="text-[11px] text-[#6B6155]">
                      Indiquez vos mesures approximatives ci-dessous ou convenez-en directement sur WhatsApp lors de la confirmation :
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] text-[#4A443D] block mb-1">Longueur (cm)</label>
                        <input
                          type="text"
                          placeholder="Ex: 140 cm"
                          value={customLongueur}
                          onChange={(e) => setCustomLongueur(e.target.value)}
                          className="w-full px-2 py-1 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#4A443D] block mb-1">Poitrine (cm)</label>
                        <input
                          type="text"
                          placeholder="Ex: 95 cm"
                          value={customPoitrine}
                          onChange={(e) => setCustomPoitrine(e.target.value)}
                          className="w-full px-2 py-1 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#4A443D] block mb-1">Hanches (cm)</label>
                        <input
                          type="text"
                          placeholder="Ex: 105 cm"
                          value={customHanches}
                          onChange={(e) => setCustomHanches(e.target.value)}
                          className="w-full px-2 py-1 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Artisanal Craft Breakdown */}
              <div className="pt-3 border-t border-[#E8E2D9] space-y-2 text-xs">
                <span className="font-semibold text-[#1E1B18] tracking-wider uppercase block text-[11px]">
                  Détails du Savoir-Faire :
                </span>
                <div className="grid grid-cols-2 gap-2 text-[#5C5349] text-[11px]">
                  <div>
                    <span className="text-[#8A7E72] block">Tissu noble :</span>
                    <span className="font-medium text-[#1E1B18]">{selectedProduct.craftDetails.tissu}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7E72] block">Passementerie :</span>
                    <span className="font-medium text-[#1E1B18]">{selectedProduct.craftDetails.sfifa}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7E72] block">Boutons Aakad :</span>
                    <span className="font-medium text-[#1E1B18]">{selectedProduct.craftDetails.aakad}</span>
                  </div>
                  <div>
                    <span className="text-[#8A7E72] block">Broderie & Finition :</span>
                    <span className="font-medium text-[#1E1B18]">{selectedProduct.craftDetails.broderie}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity & CTAs */}
            <div className="pt-4 border-t border-[#E8E2D9] space-y-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#D9CEBF] bg-[#FAF8F5]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm hover:bg-[#F0EBE1] cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-semibold tabular-nums min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm hover:bg-[#F0EBE1] cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={addedNotice}
                  className="flex-1 py-3 px-4 bg-[#1E1B18] hover:bg-[#332E29] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-[#C5A059]" />
                      <span>Ajouté au Panier !</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#C5A059]" />
                      <span>Ajouter au Panier</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct WhatsApp Action */}
              <button
                onClick={handleDirectWhatsApp}
                className="w-full py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Commander directement sur WhatsApp</span>
              </button>

              <p className="text-[11px] text-center text-[#8A7E72]">
                Vous serez redirigé vers WhatsApp avec les détails de ce modèle pour échanger avec notre atelier.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
