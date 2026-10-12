import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingControls: React.FC = () => {
  const { config, setIsWhatsAppModalOpen } = useStore();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating WhatsApp Action Only */}
      <button
        onClick={() => setIsWhatsAppModalOpen(true)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl hover:scale-105 transition-all cursor-pointer group relative"
        aria-label="Contacter l'atelier sur WhatsApp"
        title={`WhatsApp Atelier: ${config.whatsAppDisplay}`}
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        <span className="sr-only">WhatsApp</span>
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 px-3 py-1.5 bg-[#0D281E] text-white text-xs font-medium whitespace-nowrap rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg border border-emerald-900/50">
          Commander sur WhatsApp
        </span>
      </button>
    </div>
  );
};

