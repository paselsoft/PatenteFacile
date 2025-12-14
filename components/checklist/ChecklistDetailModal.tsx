import React, { useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { ChecklistItem } from '../../types';

interface ChecklistDetailModalProps {
  item: ChecklistItem | null;
  isChecked: boolean;
  onClose: () => void;
  onToggle: (id: string) => void;
}

export const ChecklistDetailModal: React.FC<ChecklistDetailModalProps> = ({ item, isChecked, onClose, onToggle }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);
    
    // Focus semplice
    setTimeout(() => modalRef.current?.focus(), 50);

    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div 
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-title"
    >
        <div 
            ref={modalRef}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300 ring-1 ring-white/20 focus:outline-none" 
            onClick={e => e.stopPropagation()}
            tabIndex={-1}
        >
            <div className={`p-5 text-white flex justify-between items-start ${item.id.startsWith('del_') ? 'bg-amber-500' : 'bg-motorizzazione'}`}>
                <div>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${item.required ? 'bg-white/20 text-white' : 'bg-green-500/20 text-white'}`}>
                        {item.required ? 'Obbligatorio' : 'Opzionale'}
                    </span>
                    <h3 id="detail-title" className="font-bold text-xl pr-4 leading-tight">{item.label}</h3>
                </div>
                <button 
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors duration-300 mt-1 focus:outline-none focus:ring-2 focus:ring-white"
                    aria-label="Chiudi dettagli"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            <div className="p-6">
                <div className="mb-8">
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {item.detail}
                    </p>
                </div>

                <button 
                    onClick={() => {
                        onToggle(item.id);
                        onClose();
                    }}
                    className={`
                        w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                        ${isChecked
                            ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400'
                            : 'bg-accent-green text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-emerald-500'
                        }
                    `}
                >
                    {isChecked ? (
                        <>
                            <X className="w-5 h-5 mr-2" />
                            Rimuovi dalla lista
                        </>
                    ) : (
                        <>
                            <Check className="w-5 h-5 mr-2" />
                            Ho questo documento
                        </>
                    )}
                </button>
            </div>
        </div>
    </div>
  );
};