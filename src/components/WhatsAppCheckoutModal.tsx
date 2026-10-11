import React, { useState } from 'react';
import { X, MessageCircle, Copy, Check, Send, Sparkles, MapPin, Phone, User, Settings } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types/store';

export const WhatsAppCheckoutModal: React.FC = () => {
  const {
    config,
    cart,
    directWhatsAppItem,
    isWhatsAppModalOpen,
    setIsWhatsAppModalOpen,
    setDirectWhatsAppItem,
    formatPrice,
    setIsConfigModalOpen,
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Casablanca');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isWhatsAppModalOpen) return null;

  // Determine items to order: either single direct item or entire cart
  const itemsToOrder: (CartItem | {
    id: string;
    productId: string;
    name: string;
    selectedSize: string;
    selectedColor: string;
    samplePrice: number;
    quantity: number;
    customMeasurements?: any;
  })[] = directWhatsAppItem
    ? [directWhatsAppItem]
    : cart.length > 0
    ? cart
    : [
        {
          id: 'inquiry',
          productId: 'inquiry',
          name: 'Demande de renseignement / Modèle sur-mesure',
          selectedSize: 'Sur-Mesure',
          selectedColor: 'Au choix',
          samplePrice: 0,
          quantity: 1,
        },
      ];

  const totalEstimate = itemsToOrder.reduce(
    (sum, item) => sum + item.samplePrice * item.quantity,
    0
  );

  // Generate WhatsApp message body
  const buildWhatsAppMessage = (): string => {
    const lines: string[] = [];
    lines.push(`✨ *COMMANDE / DEMANDE CHAMASMODE* ✨`);
    lines.push(`Bonjour l'Atelier CHAMASMODE,`);
    lines.push(``);
    lines.push(`Je souhaite commander les pièces suivantes :`);
    lines.push(``);

    itemsToOrder.forEach((item, idx) => {
      lines.push(`👗 *${item.quantity}x ${item.name}*`);
      lines.push(`   • Taille : ${item.selectedSize}`);
      lines.push(`   • Couleur : ${item.selectedColor}`);
      if (item.customMeasurements) {
        const m = item.customMeasurements;
        lines.push(`   • Mesures sur-mesure : Longueur ${m.longueur || 'N/A'}, Poitrine ${m.poitrine || 'N/A'}, Hanches ${m.hanches || 'N/A'}`);
      }
      if (item.samplePrice > 0) {
        lines.push(`   • Prix indicatif : ${item.samplePrice * item.quantity} MAD`);
      }
      lines.push(``);
    });

    if (totalEstimate > 0) {
      lines.push(`💰 *Total estimé indicatif :* ${totalEstimate.toLocaleString('fr-FR')} MAD`);
      lines.push(``);
    }

    lines.push(`📋 *Mes coordonnées pour la commande :*`);
    lines.push(`• Nom : ${customerName || '[Mon nom]'}`);
    lines.push(`• Téléphone : ${customerPhone || '[Mon numéro]'}`);
    lines.push(`• Ville de livraison : ${customerCity || 'Maroc'}`);
    if (customerAddress) {
      lines.push(`• Adresse / Précisions : ${customerAddress}`);
    }
    if (customerNotes) {
      lines.push(`• Note spéciale : ${customerNotes}`);
    }

    lines.push(``);
    lines.push(`Merci de me confirmer la confection et les délais de livraison.`);
    return lines.join('\n');
  };

  const messageText = buildWhatsAppMessage();
  const encodedText = encodeURIComponent(messageText);
  // Clean phone number (strip + and spaces)
  const cleanPhone = (config.whatsAppNumber || '212600000000').replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedText}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(messageText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsWhatsAppModalOpen(false);
    setDirectWhatsAppItem(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] max-w-2xl w-full border border-[#D9CEBF] shadow-2xl overflow-hidden my-6">
        {/* Header */}
        <div className="p-6 bg-[#1E1B18] text-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#FAF8F5]">
                Finaliser sur WhatsApp
              </h2>
              <p className="text-xs text-[#C8BFB4]">
                Échangez directement avec l'Atelier CHAMASMODE
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            aria-label="Fermer"
            className="p-1.5 text-[#C8BFB4] hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp destination advisory banner */}
        <div className="px-6 py-2.5 bg-[#F0EBE1] border-b border-[#E8E2D9] flex items-center justify-between text-xs text-[#6B6155]">
          <div className="flex items-center gap-2 truncate">
            <span className="font-medium text-[#1E1B18]">Numéro configuré :</span>
            <span className="font-mono text-[#8A6B32]">{config.whatsAppDisplay}</span>
          </div>
          <button
            onClick={() => {
              handleClose();
              setIsConfigModalOpen(true);
            }}
            className="text-[11px] text-[#8A6B32] hover:underline flex items-center gap-1 shrink-0 font-medium cursor-pointer"
          >
            <Settings className="w-3 h-3" />
            <span>Changer de numéro</span>
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Customer Details Form */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
              1. Vos coordonnées (Optionnel mais recommandé)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-medium text-[#4A443D] mb-1">
                  Nom & Prénom
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A7E72] absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Ex: Laila El Amrani"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A443D] mb-1">
                  Téléphone / WhatsApp
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8A7E72] absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="Ex: +212 6 12 34 56 78"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A443D] mb-1">
                  Ville de Livraison
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-[#8A7E72] absolute left-3 top-2.5" />
                  <select
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32] cursor-pointer"
                  >
                    <option value="Casablanca">Casablanca</option>
                    <option value="Rabat">Rabat</option>
                    <option value="Marrakech">Marrakech</option>
                    <option value="Tanger">Tanger</option>
                    <option value="Fès">Fès</option>
                    <option value="Meknès">Meknès</option>
                    <option value="Agadir">Agadir</option>
                    <option value="Oujda">Oujda</option>
                    <option value="Tétouan">Tétouan</option>
                    <option value="Kenitra">Kenitra</option>
                    <option value="Autre ville (Maroc)">Autre ville (Maroc)</option>
                    <option value="International (France / Europe / Monde)">International (France / Europe / Monde)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#4A443D] mb-1">
                  Adresse de livraison / Quartier
                </label>
                <input
                  type="text"
                  placeholder="Ex: Quartier Gauthier, Casablanca"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#4A443D] mb-1">
                Remarques particulières (retouche, couleur spéciale, événement)
              </label>
              <input
                type="text"
                placeholder="Ex: Pour un mariage le mois prochain, besoin d'une retouche longueur"
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#8A6B32]"
              />
            </div>
          </div>

          {/* Formatted Message Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                2. Aperçu du message WhatsApp généré
              </h3>
              <button
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1.5 text-xs text-[#8A6B32] hover:text-[#1E1B18] cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-green-600 font-semibold">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier le texte</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-[#EFEAE2] border border-[#D9CEBF] rounded-sm font-mono text-xs text-[#332E29] whitespace-pre-wrap max-h-48 overflow-y-auto leading-relaxed shadow-inner">
              {messageText}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2 space-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 px-6 bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-3 transition-colors shadow-lg rounded-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Ouvrir WhatsApp & Envoyer la commande</span>
            </a>

            <div className="flex items-center justify-center gap-4 text-xs text-[#8A7E72] pt-1">
              <span>✓ Aucune inscription requise</span>
              <span>·</span>
              <span>✓ Contact direct avec la créatrice</span>
              <span>·</span>
              <span>✓ Confirmation personnalisée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
