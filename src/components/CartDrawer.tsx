import React from 'react';
import { X, Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    clearCart,
    setIsWhatsAppModalOpen,
    setDirectWhatsAppItem,
  } = useStore();

  if (!isCartOpen) return null;

  const handleCheckoutWhatsApp = () => {
    setDirectWhatsAppItem(null); // Full cart checkout
    setIsCartOpen(false);
    setIsWhatsAppModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#D9CEBF] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E8E2D9] flex items-center justify-between bg-[#F5F0E6]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#8A6B32]" />
              <h2 className="font-serif text-xl font-semibold text-[#1E1B18]">
                Votre Panier
              </h2>
              <span className="text-xs text-[#8A7E72] font-medium">
                ({cart.length} {cart.length > 1 ? 'articles' : 'article'})
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Fermer le panier"
              className="p-1.5 text-[#6B6155] hover:text-[#1E1B18] transition-colors rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F0EBE1] flex items-center justify-center text-[#8A7E72]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="font-serif text-lg text-[#1E1B18]">Votre panier est vide</p>
                  <p className="text-xs text-[#8A7E72]">
                    Découvrez nos modèles de jellabas et ajoutez vos créations préférées.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] transition-colors cursor-pointer"
                >
                  <span>Voir la collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between text-xs text-[#8A7E72] pb-2 border-b border-[#E8E2D9]">
                  <span>Articles sélectionnés</span>
                  <button
                    onClick={clearCart}
                    className="hover:text-red-700 underline text-[11px] cursor-pointer"
                  >
                    Vider le panier
                  </button>
                </div>

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#FFFFFF] border border-[#E8E2D9] flex gap-3.5 items-start"
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-20 object-cover bg-[#F0EBE1] shrink-0 border border-[#E8E2D9]"
                      referrerPolicy="no-referrer"
                    />

                    {/* Details */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <h3 className="text-xs font-semibold text-[#1E1B18] truncate font-serif">
                        {item.name}
                      </h3>

                      <div className="flex flex-wrap gap-x-2 text-[11px] text-[#6B6155]">
                        <span>Taille : <strong className="text-[#1E1B18]">{item.selectedSize}</strong></span>
                        <span>·</span>
                        <span>Couleur : <strong className="text-[#1E1B18]">{item.selectedColor}</strong></span>
                      </div>

                      {item.customMeasurements && (
                        <p className="text-[10px] text-[#8A6B32] italic">
                          Sur-mesure : L.{item.customMeasurements.longueur || '-'} / P.{item.customMeasurements.poitrine || '-'}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between">
                        {/* Quantity Stepper */}
                        <div className="flex items-center border border-[#D9CEBF] bg-[#FAF8F5]">
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-0.5 text-xs hover:bg-[#F0EBE1] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2 py-0.5 text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-0.5 text-xs hover:bg-[#F0EBE1] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-bold text-[#1E1B18] tabular-nums">
                            {formatPrice(item.samplePrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Supprimer cet article"
                      className="text-[#B8A892] hover:text-red-700 p-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & WhatsApp Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#E8E2D9] bg-[#F5F0E6] space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-baseline text-sm">
                  <span className="text-[#6B6155]">Sous-total indicatif :</span>
                  <span className="text-lg font-bold text-[#1E1B18] tabular-nums">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-[#8A7E72]">
                  <span>Expédition :</span>
                  <span className="text-[#8A6B32] font-medium">À convenir sur WhatsApp</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleCheckoutWhatsApp}
                  className="w-full py-3.5 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Finaliser la commande sur WhatsApp</span>
                </button>
              </div>

              <p className="text-[11px] text-center text-[#8A7E72] leading-tight">
                Votre récapitulatif sera automatiquement préparé pour être envoyé à notre numéro d'atelier.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
