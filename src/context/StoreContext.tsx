import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_CONFIG, INITIAL_PRODUCTS } from '../data/initialData';
import { CartItem, Product, StoreConfig, ThemePreset } from '../types/store';

const THEME_STYLES: Record<string, Record<string, string>> = {
  'royal-emerald': {
    '--color-primary': '#0D281E',
    '--color-primary-hover': '#163B2D',
    '--color-accent': '#1C6B4D',
    '--color-accent-hover': '#268C65',
    '--color-gold': '#C5A059',
    '--color-bg': '#F4F8F5',
    '--color-surface': '#E8F1EC',
    '--color-border': '#D2E2D9',
    '--color-text': '#0D281E',
    '--color-muted': '#5B7669',
    '--color-banner-bg': '#071913',
  },
};

interface StoreContextType {
  config: StoreConfig;
  updateConfig: (patch: Partial<StoreConfig>) => void;
  resetConfig: () => void;
  products: Product[];
  updateProduct: (id: string, patch: Partial<Product>) => void;
  addProduct: (product: Product) => void;
  resetProducts: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  formatPrice: (amountInMAD: number) => string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isConfigModalOpen: boolean;
  setIsConfigModalOpen: (open: boolean) => void;
  isWhatsAppModalOpen: boolean;
  setIsWhatsAppModalOpen: (open: boolean) => void;
  directWhatsAppItem: CartItem | null;
  setDirectWhatsAppItem: (item: CartItem | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Config state
  const [config, setConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('chamasmode_config_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_CONFIG,
          ...parsed,
          customLogoUrl: INITIAL_CONFIG.customLogoUrl,
          brandName: "Chama's MODE",
          themePreset: 'royal-emerald',
          whatsAppNumber: '212771186111',
          whatsAppDisplay: '+212 7 71 18 61 11',
          instagramHandle: '@chamasmode',
          instagramUrl: 'https://www.instagram.com/chamasmode?xtok=NnRyMDU4Zmp5eWUx',
          atelierCity: 'Fès',
        };
      }
    } catch {
      // ignore
    }
    return INITIAL_CONFIG;
  });

  // Products state
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('chamasmode_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p: Product) => ({ ...p, samplePrice: 499 }));
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS;
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chamasmode_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // UI Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  const [directWhatsAppItem, setDirectWhatsAppItem] = useState<CartItem | null>(null);

  // Apply Theme CSS variables
  useEffect(() => {
    const vars = THEME_STYLES[config.themePreset] || THEME_STYLES['royal-emerald'];
    if (typeof document !== 'undefined') {
      Object.entries(vars).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }, [config.themePreset]);

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('chamasmode_config_v1', JSON.stringify(config));
    } catch {
      // ignore
    }
  }, [config]);

  useEffect(() => {
    try {
      localStorage.setItem('chamasmode_products_v1', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('chamasmode_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const updateConfig = (patch: Partial<StoreConfig>) => {
    setConfig((prev) => ({ ...prev, ...patch }));
  };

  const resetConfig = () => {
    setConfig(INITIAL_CONFIG);
  };

  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const resetProducts = () => {
    setProducts(INITIAL_PRODUCTS);
  };

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    const id = `${item.productId}-${item.selectedSize}-${item.selectedColor}`;
    setCart((prev) => {
      const existing = prev.find((x) => x.id === id);
      if (existing) {
        return prev.map((x) =>
          x.id === id ? { ...x, quantity: x.quantity + item.quantity } : x
        );
      }
      return [...prev, { ...item, id }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((x) => x.id !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((x) => (x.id === cartItemId ? { ...x, quantity: qty } : x))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.samplePrice * item.quantity,
    0
  );

  const formatPrice = (amountInMAD: number): string => {
    const currency = config.currency || 'MAD';
    if (currency === 'EUR') {
      const val = (amountInMAD * (config.currencyRate?.EUR || 0.092)).toFixed(0);
      return `${val} €`;
    }
    if (currency === 'USD') {
      const val = (amountInMAD * (config.currencyRate?.USD || 0.10)).toFixed(0);
      return `$${val}`;
    }
    return `${amountInMAD.toLocaleString('fr-FR')} MAD`;
  };

  return (
    <StoreContext.Provider
      value={{
        config,
        updateConfig,
        resetConfig,
        products,
        updateProduct,
        addProduct,
        resetProducts,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        formatPrice,
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isConfigModalOpen,
        setIsConfigModalOpen,
        isWhatsAppModalOpen,
        setIsWhatsAppModalOpen,
        directWhatsAppItem,
        setDirectWhatsAppItem,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
