import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  MessageCircle,
  Instagram,
  Tag,
  Plus,
  Trash2,
  Check,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/store';

export const StoreConfigModal: React.FC = () => {
  const {
    config,
    updateConfig,
    resetConfig,
    products,
    updateProduct,
    addProduct,
    resetProducts,
    isConfigModalOpen,
    setIsConfigModalOpen,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'general' | 'logo' | 'products'>('general');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Local state for editing store config
  const [whatsAppNumber, setWhatsAppNumber] = useState(config.whatsAppNumber);
  const [whatsAppDisplay, setWhatsAppDisplay] = useState(config.whatsAppDisplay);
  const [instagramHandle, setInstagramHandle] = useState(config.instagramHandle);
  const [instagramUrl, setInstagramUrl] = useState(config.instagramUrl);
  const [currency, setCurrency] = useState<'MAD' | 'EUR' | 'USD'>(config.currency);
  const [logoUrl, setLogoUrl] = useState(config.customLogoUrl || '');

  // Local state for editing products
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProductTitle, setEditProductTitle] = useState('');
  const [editProductPrice, setEditProductPrice] = useState(0);
  const [editProductDesc, setEditProductDesc] = useState('');
  const [editProductImage, setEditProductImage] = useState('');

  if (!isConfigModalOpen) return null;

  // Handle logo file upload
  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        setLogoUrl(result);
        updateConfig({ customLogoUrl: result });
        showNotification();
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle product photo upload
  const handleProductPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        const result = loadEvent.target?.result as string;
        setEditProductImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const showNotification = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveGeneral = () => {
    updateConfig({
      whatsAppNumber: whatsAppNumber.replace(/[^0-9]/g, ''),
      whatsAppDisplay: whatsAppDisplay || whatsAppNumber,
      instagramHandle,
      instagramUrl,
      currency,
    });
    showNotification();
  };

  const handleSaveLogo = () => {
    updateConfig({
      customLogoUrl: logoUrl.trim() ? logoUrl.trim() : null,
    });
    showNotification();
  };

  const handleResetToMonogram = () => {
    setLogoUrl('');
    updateConfig({ customLogoUrl: null });
    showNotification();
  };

  const startEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setEditProductTitle(p.name);
    setEditProductPrice(p.samplePrice);
    setEditProductDesc(p.description);
    setEditProductImage(p.image);
  };

  const saveEditedProduct = () => {
    if (!editingProductId) return;
    updateProduct(editingProductId, {
      name: editProductTitle,
      samplePrice: Number(editProductPrice) || 0,
      description: editProductDesc,
      image: editProductImage,
    });
    setEditingProductId(null);
    showNotification();
  };

  const handleAddNewProduct = () => {
    const newId = `product-${Date.now()}`;
    const newProd: Product = {
      id: newId,
      name: 'Nouveau Modèle Jellaba',
      category: 'haute-couture',
      categoryLabel: 'Haute Couture & Cérémonie',
      samplePrice: 499,
      currency: 'MAD',
      description: 'Description de la confection, broderie et tombé du tissu.',
      craftDetails: {
        tissu: 'Crêpe ou Soie',
        sfifa: 'Sfifa artisanale',
        aakad: 'Aakad noués main',
        broderie: 'Broderie artisanale',
      },
      image: products[0]?.image || '',
      colors: [{ name: 'Couleur Principale', hex: '#8A6B32' }],
      sizes: ['36', '38', '40', '42', '44', 'Sur-Mesure'],
      isSample: true,
    };
    addProduct(newProd);
    startEditProduct(newProd);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="relative bg-[#FAF8F5] max-w-3xl w-full border border-[#D9CEBF] shadow-2xl overflow-hidden my-6">
        {/* Modal Top Bar */}
        <div className="p-6 bg-[#1E1B18] text-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center">
              <Sliders className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div>
              <h2 className="font-serif text-xl text-[#FAF8F5]">
                Configuration & Personnalisation de la Boutique
              </h2>
              <p className="text-xs text-[#C8BFB4]">
                Modifiez WhatsApp, Instagram, votre logo officiel et vos modèles sans reconstruire le site
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConfigModalOpen(false)}
            aria-label="Fermer"
            className="p-1.5 text-[#C8BFB4] hover:text-white rounded-full hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#E8E2D9] bg-[#F5F0E6] px-6">
          <button
            onClick={() => setActiveTab('general')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeTab === 'general'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#6B6155] hover:text-[#1E1B18]'
            }`}
          >
            Coordonnées & Réseaux
          </button>
          <button
            onClick={() => setActiveTab('logo')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeTab === 'logo'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#6B6155] hover:text-[#1E1B18]'
            }`}
          >
            Logo Officiel CHAMASMODE
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 cursor-pointer transition-all ${
              activeTab === 'products'
                ? 'border-[#1E1B18] text-[#1E1B18]'
                : 'border-transparent text-[#6B6155] hover:text-[#1E1B18]'
            }`}
          >
            Modèles & Prix d'Exemple
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {saveSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Modifications enregistrées avec succès dans votre navigateur !</span>
            </div>
          )}

          {/* TAB 1: General (WhatsApp & Instagram) */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F0EBE1] border border-[#D9CEBF] text-xs text-[#5C5349] space-y-1">
                <p className="font-semibold text-[#1E1B18]">
                  💡 Mise à jour facile et progressive
                </p>
                <p>
                  Dès que vous obtenez votre numéro professionnel WhatsApp définitif ou vos comptes officiels, saisissez-les ici. Les boutons du site mettront automatiquement à jour leurs liens !
                </p>
              </div>

              {/* WhatsApp Config */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Numéro WhatsApp de l'Atelier</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Numéro international (sans + ni espaces)
                    </label>
                    <input
                      type="text"
                      value={whatsAppNumber}
                      onChange={(e) => setWhatsAppNumber(e.target.value)}
                      placeholder="Ex: 212612345678"
                      className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18] font-mono"
                    />
                    <span className="text-[10px] text-[#8A7E72] mt-0.5 block">
                      Utilisé pour ouvrir automatiquement le lien wa.me/
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Affichage du numéro sur le site
                    </label>
                    <input
                      type="text"
                      value={whatsAppDisplay}
                      onChange={(e) => setWhatsAppDisplay(e.target.value)}
                      placeholder="Ex: +212 6 12 34 56 78"
                      className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18]"
                    />
                    <span className="text-[10px] text-[#8A7E72] mt-0.5 block">
                      Texte lisible affiché aux visiteurs
                    </span>
                  </div>
                </div>
              </div>

              {/* Instagram Config */}
              <div className="space-y-4 pt-4 border-t border-[#E8E2D9]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  <Instagram className="w-4 h-4 text-[#8A6B32]" />
                  <span>Lien & Compte Instagram Temporaire</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Nom d'utilisateur Instagram (affiché)
                    </label>
                    <input
                      type="text"
                      value={instagramHandle}
                      onChange={(e) => setInstagramHandle(e.target.value)}
                      placeholder="@chamasmode"
                      className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Lien complet Instagram
                    </label>
                    <input
                      type="url"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="https://instagram.com/chamasmode"
                      className="w-full px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18]"
                    />
                  </div>
                </div>
              </div>

              {/* Currency Selector */}
              <div className="space-y-2 pt-4 border-t border-[#E8E2D9]">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  Devise d'affichage des prix
                </label>
                <div className="flex gap-3">
                  {(['MAD', 'EUR', 'USD'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => setCurrency(curr)}
                      className={`px-4 py-2 text-xs font-semibold cursor-pointer border ${
                        currency === curr
                          ? 'bg-[#1E1B18] text-[#FAF8F5] border-[#1E1B18]'
                          : 'bg-white text-[#4A443D] border-[#D9CEBF] hover:border-[#8A6B32]'
                      }`}
                    >
                      {curr === 'MAD' ? 'MAD (Dirham Marocain)' : curr === 'EUR' ? 'EUR (€)' : 'USD ($)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-[#E8E2D9]">
                <button
                  onClick={resetConfig}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8A7E72] hover:text-red-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser les coordonnées</span>
                </button>

                <button
                  onClick={handleSaveGeneral}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer les coordonnées</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: Logo Manager & Theme */}
          {activeTab === 'logo' && (
            <div className="space-y-6">
              {/* Theme Presets Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                      1. Thème & Couleurs du Site (Assorti à votre Logo)
                    </h3>
                    <p className="text-xs text-[#6B6155] mt-0.5">
                      Sélectionnez la palette de couleurs qui correspond au style et aux couleurs de votre logo officiel :
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'gold-black',
                      label: 'Noir & Or Impérial',
                      desc: 'Noir profond, or & champagne',
                      primary: '#1E1B18',
                      accent: '#C5A059',
                    },
                    {
                      id: 'powder-rose',
                      label: 'Rose Poudré & Nude',
                      desc: 'Rose poudré, nude & rose gold',
                      primary: '#2D1B22',
                      accent: '#C48A96',
                    },
                    {
                      id: 'royal-emerald',
                      label: 'Vert Émeraude & Or',
                      desc: 'Émeraude royale marocaine',
                      primary: '#0E241B',
                      accent: '#2A7255',
                    },
                    {
                      id: 'bordeaux-gold',
                      label: 'Bordeaux Velours & Or',
                      desc: 'Bordeaux noble & doré',
                      primary: '#2B0E17',
                      accent: '#962B46',
                    },
                    {
                      id: 'minimal-couture',
                      label: 'Blanc Pur & Noir',
                      desc: 'Minimaliste haute couture moderne',
                      primary: '#121212',
                      accent: '#121212',
                    },
                    {
                      id: 'navy-gold',
                      label: 'Bleu Nuit & Or',
                      desc: 'Bleu nuit Majorelle & or',
                      primary: '#0D1B2A',
                      accent: '#C5A059',
                    },
                  ].map((theme) => {
                    const isSelected = (config.themePreset || 'gold-black') === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => updateConfig({ themePreset: theme.id as any })}
                        className={`p-3 text-left border rounded-sm transition-all cursor-pointer flex flex-col justify-between gap-2 ${
                          isSelected
                            ? 'border-[#1E1B18] ring-2 ring-[#C5A059] bg-[#FAF8F5]'
                            : 'border-[#D9CEBF] bg-white hover:border-[#8A6B32]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-xs text-[#1E1B18]">
                            {theme.label}
                          </span>
                          <div className="flex items-center gap-1">
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: theme.primary }}
                            />
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-black/20"
                              style={{ backgroundColor: theme.accent }}
                            />
                          </div>
                        </div>
                        <p className="text-[11px] text-[#8A7E72] leading-tight">
                          {theme.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  2. Importer votre logo officiel CHAMASMODE
                </h3>
                <p className="text-xs text-[#6B6155]">
                  Téléversez votre image de logo (PNG transparent ou JPG). Elle remplacera immédiatement le monogramme sur tout le site.
                </p>
              </div>

              {/* Logo Preview */}
              <div className="p-6 bg-white border border-[#D9CEBF] flex flex-col items-center justify-center space-y-3">
                <span className="text-xs uppercase tracking-wider text-[#8A7E72] font-semibold">
                  Aperçu actuel sur fond clair :
                </span>
                <div className="p-4 border border-dashed border-[#D9CEBF] bg-[#FAF8F5] max-w-sm w-full flex items-center justify-center min-h-[90px]">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo officiel CHAMASMODE"
                      className="max-h-16 w-auto object-contain"
                    />
                  ) : (
                    <div className="text-center text-xs text-[#8A7E72]">
                      <p className="font-serif text-lg font-semibold text-[#1E1B18]">CHAMASMODE</p>
                      <p className="text-[10px] uppercase tracking-widest text-[#8A6B32]">
                        Monogramme Haute Couture Doré (Par Défaut)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Upload Input */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  Option 1 : Téléverser votre fichier logo (Recommandé)
                </label>
                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-[#D9CEBF] hover:border-[#8A6B32] bg-white cursor-pointer transition-colors group">
                  <Upload className="w-8 h-8 text-[#8A7E72] group-hover:text-[#8A6B32] mb-2" />
                  <span className="text-xs font-semibold text-[#1E1B18]">
                    Cliquez ici pour choisir le fichier de votre logo
                  </span>
                  <span className="text-[11px] text-[#8A7E72] mt-1">
                    Format PNG avec fond transparent ou JPG
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* URL Input */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#1E1B18]">
                  Option 2 : Coller l'URL d'une image logo en ligne
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="https://.../mon-logo.png"
                    className="flex-1 px-3 py-2 bg-white border border-[#D9CEBF] text-xs text-[#1E1B18]"
                  />
                  <button
                    onClick={handleSaveLogo}
                    className="px-4 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] cursor-pointer"
                  >
                    Appliquer
                  </button>
                </div>
              </div>

              {/* Reset to Default Monogram */}
              <div className="pt-4 border-t border-[#E8E2D9] flex justify-between items-center">
                <button
                  onClick={handleResetToMonogram}
                  className="text-xs text-[#8A6B32] hover:underline cursor-pointer"
                >
                  Revenir au monogramme haute couture doré
                </button>

                <button
                  onClick={handleSaveLogo}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Enregistrer le Logo</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Products & Sample Prices */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#F0EBE1] border border-[#D9CEBF] text-xs text-[#5C5349] flex items-center justify-between">
                <div>
                  <p className="font-semibold text-[#1E1B18]">
                    Modèles de démonstration & Prix indicatifs
                  </p>
                  <p>
                    Ajustez les titres d'exemple, les tarifs ou remplacez les photos quand vous avez vos premières pièces réelles.
                  </p>
                </div>

                <button
                  onClick={handleAddNewProduct}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#C5A059] text-[#1E1B18] text-xs font-semibold uppercase tracking-wider hover:bg-[#D4B372] shrink-0 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nouveau Modèle</span>
                </button>
              </div>

              {/* Editing a single product */}
              {editingProductId ? (
                <div className="p-5 bg-white border-2 border-[#C5A059] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg font-semibold text-[#1E1B18]">
                      Modifier le modèle
                    </h3>
                    <button
                      onClick={() => setEditingProductId(null)}
                      className="text-xs text-[#8A7E72] hover:text-[#1E1B18] cursor-pointer"
                    >
                      Annuler
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#4A443D] mb-1">
                        Nom de la création
                      </label>
                      <input
                        type="text"
                        value={editProductTitle}
                        onChange={(e) => setEditProductTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#4A443D] mb-1">
                        Prix indicatif (MAD)
                      </label>
                      <input
                        type="number"
                        value={editProductPrice}
                        onChange={(e) => setEditProductPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9CEBF] text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Description & Finitions
                    </label>
                    <textarea
                      rows={3}
                      value={editProductDesc}
                      onChange={(e) => setEditProductDesc(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#4A443D] mb-1">
                      Photo du modèle (Téléverser ou URL)
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={editProductImage}
                        onChange={(e) => setEditProductImage(e.target.value)}
                        placeholder="URL de la photo"
                        className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#D9CEBF] text-xs"
                      />
                      <label className="px-3 py-1.5 bg-[#F0EBE1] border border-[#D9CEBF] hover:bg-[#E2D8C7] text-xs font-medium text-[#1E1B18] cursor-pointer flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Fichier</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleProductPhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => setEditingProductId(null)}
                      className="px-4 py-2 border border-[#D9CEBF] text-xs font-medium text-[#4A443D] hover:bg-[#FAF8F5] cursor-pointer"
                    >
                      Fermer
                    </button>
                    <button
                      onClick={saveEditedProduct}
                      className="px-5 py-2 bg-[#1E1B18] text-[#FAF8F5] text-xs font-semibold uppercase tracking-wider hover:bg-[#332E29] cursor-pointer"
                    >
                      Enregistrer ce modèle
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Product List */}
              <div className="space-y-3">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className="p-3 bg-white border border-[#E8E2D9] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-14 object-cover border border-[#E8E2D9] shrink-0 bg-[#F0EBE1]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-[#1E1B18] truncate font-serif">
                          {p.name}
                        </h4>
                        <p className="text-[11px] text-[#8A7E72]">
                          Prix indicatif :{' '}
                          <strong className="text-[#1E1B18] font-mono">
                            {p.samplePrice} MAD
                          </strong>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => startEditProduct(p)}
                        className="px-3 py-1.5 border border-[#D9CEBF] hover:border-[#1E1B18] text-xs font-medium text-[#1E1B18] cursor-pointer"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reset to defaults button */}
              <div className="pt-4 border-t border-[#E8E2D9] flex justify-between">
                <button
                  onClick={resetProducts}
                  className="inline-flex items-center gap-1.5 text-xs text-[#8A7E72] hover:text-red-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Réinitialiser les modèles par défaut</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
