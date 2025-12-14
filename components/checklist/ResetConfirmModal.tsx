import React, { useEffect, useRef } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ResetConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus semplice all'apertura
    setTimeout(() => modalRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-title"
        aria-describedby="reset-desc"
    >
        <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-zoom-in p-6 text-center focus:outline-none" 
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
        >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            
            <h3 id="reset-title" className="text-xl font-bold text-gray-900 mb-2">Resettare la Checklist?</h3>
            <p id="reset-desc" className="text-gray-500 text-sm mb-6 leading-relaxed">
                Stai per cancellare tutti i documenti segnati. Questa azione non può essere annullata.
            </p>

            <div className="flex gap-3">
                <button 
                    onClick={onClose}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Annulla
                </button>
                <button 
                    onClick={onConfirm}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Reset
                </button>
            </div>
        </div>
    </div>
  );
};