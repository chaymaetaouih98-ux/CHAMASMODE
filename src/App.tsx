/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { CraftsmanshipSection } from './components/CraftsmanshipSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WhatsAppCheckoutModal } from './components/WhatsAppCheckoutModal';
import { StoreConfigModal } from './components/StoreConfigModal';
import { FloatingControls } from './components/FloatingControls';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18]">
        {/* Navigation Bar */}
        <Header />

        {/* Main Content */}
        <main className="flex-1">
          <Hero />
          <ProductGrid />
          <CraftsmanshipSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* Modals & Drawers */}
        <CartDrawer />
        <ProductDetailModal />
        <WhatsAppCheckoutModal />
        <StoreConfigModal />
        <FloatingControls />
      </div>
    </StoreProvider>
  );
}
