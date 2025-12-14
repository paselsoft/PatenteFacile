import React, { useState } from 'react';
import { ClipboardList, RefreshCw, Settings, Camera, Trophy, Sparkles, Globe, Baby, UserCog } from 'lucide-react';
import { useChecklist } from '../hooks/useChecklist';
import { ChecklistItem } from '../types';
import { ChecklistToggle } from './checklist/ChecklistToggle';
import { ChecklistItemRow } from './checklist/ChecklistItem';
import { ResetConfirmModal } from './checklist/ResetConfirmModal';
import { ChecklistDetailModal } from './checklist/ChecklistDetailModal';

export const DocumentsChecklist: React.FC = () => {
  // Business Logic from Hook
  const {
    checkedItems,
    isDelegateMode, setIsDelegateMode,
    isExtraEu, setIsExtraEu,
    isMinor, setIsMinor,
    currentList,
    progress,
    isComplete,
    toggleItem,
    resetChecklist
  } = useChecklist();

  // Local UI State for Modals
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const confirmReset = () => {
    resetChecklist();
    setShowResetConfirm(false);
  };

  return (
    <section id="documenti" className="scroll-mt-24 relative">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Main Checklist Column */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                
                {/* Header Section */}
                <div className="bg-motorizzazione p-6 text-white flex flex-col sm:flex-row justify-between items-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    
                    <div className="flex items-center mb-4 sm:mb-0 relative z-10">
                        <div className="p-3 bg-white/20 rounded-xl mr-4 shadow-inner">
                            <ClipboardList className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">Checklist Documenti</h2>
                            <p className="text-blue-100 text-sm">Non dimenticare nulla a casa.</p>
                        </div>
                    </div>
                    
                    {/* Progress Circle & Reset */}
                    <div className="flex items-center space-x-5 relative z-10">
                        <div className="text-right">
                            <span className="block text-3xl font-bold leading-none">{progress}%</span>
                            <span className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold">Completato</span>
                        </div>
                        <button 
                            onClick={() => setShowResetConfirm(true)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors duration-300 group focus:outline-none focus:ring-2 focus:ring-white"
                            title="Resetta checklist"
                            aria-label="Resetta checklist"
                        >
                            <RefreshCw className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-slow" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2">
                    <div 
                        className={`h-2 transition-all duration-slow ease-out ${isComplete ? 'bg-accent-green' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Configuration Toggle Bar */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-sm font-bold tracking-wide text-gray-700">
                            <Settings className="w-4 h-4 mr-2 text-motorizzazione" />
                            PERSONALIZZA LA TUA LISTA
                        </h3>
                        <span className="text-xs text-gray-400 font-normal hidden sm:block">Seleziona le opzioni che ti riguardano</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ChecklistToggle 
                            id="toggle-extra-eu"
                            label="Cittadino Extra-UE" 
                            checked={isExtraEu} 
                            onChange={setIsExtraEu}
                            icon={Globe}
                        />
                        <ChecklistToggle 
                            id="toggle-minor"
                            label="Minorenne" 
                            checked={isMinor} 
                            onChange={setIsMinor}
                            icon={Baby}
                        />
                        <ChecklistToggle 
                            id="toggle-delegate"
                            label="Delega a Terzi" 
                            checked={isDelegateMode} 
                            onChange={setIsDelegateMode}
                            icon={UserCog}
                        />
                    </div>
                </div>

                {/* Success Banner */}
                {isComplete && (
                    <div className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-zoom-in" role="alert">
                        <div className="p-2 bg-green-100 rounded-full mr-4 text-green-600">
                            <Trophy className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-green-800 text-lg flex items-center">
                                Ottimo lavoro! <Sparkles className="w-4 h-4 ml-2 text-yellow-500" />
                            </h4>
                            <p className="text-green-700 text-sm">Hai raccolto tutti i documenti necessari. Sei pronto per lo sportello.</p>
                        </div>
                    </div>
                )}

                {/* Items List */}
                <div className="p-4 sm:p-6 space-y-3">
                    {currentList.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ClipboardList className="w-8 h-8 opacity-50" />
                             </div>
                             <p>Nessun documento richiesto con i filtri attuali.</p>
                        </div>
                    ) : (
                        currentList.map((item) => (
                            <ChecklistItemRow
                                key={item.id}
                                item={item}
                                isChecked={!!checkedItems[item.id]}
                                onToggle={toggleItem}
                                onInfoClick={setSelectedItem}
                                isDelegateMode={isDelegateMode}
                            />
                        ))
                    )}
                </div>
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-1 space-y-6">
                {/* Decorative Image Card */}
                <div className="hidden lg:block rounded-2xl overflow-hidden shadow-lg h-64 relative group">
                     <img 
                        src="https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600" 
                        alt="Pianificazione documenti" 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-cinematic"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <p className="text-white font-medium text-lg leading-tight">
                            "L'organizzazione è la chiave per evitare imprevisti allo sportello."
                        </p>
                    </div>
                </div>

                {/* Photo Tip Card */}
                <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-6 shadow-sm sticky top-24">
                     <div className="flex items-center mb-4">
                        <div className="p-2 bg-white rounded-lg shadow-sm mr-3 text-motorizzazione">
                            <Camera className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-motorizzazione text-lg">Nota sulle Foto</h3>
                     </div>
                     
                     <p className="text-gray-700 text-sm leading-relaxed mb-4">
                         Non è più necessario portare le classiche foto tessera cartacee allo sportello della Motorizzazione.
                     </p>
                     
                     <div className="bg-white p-4 rounded-xl text-sm border border-blue-100 shadow-inner">
                         <p className="text-gray-600">
                             La foto viene <strong>acquisita digitalmente</strong> durante la visita medica. Sulla ricevuta telematica che riceverai dal medico sarà già presente la tua foto.
                         </p>
                     </div>
                </div>
            </div>
        </div>

        {/* Modals */}
        <ResetConfirmModal 
            isOpen={showResetConfirm} 
            onClose={() => setShowResetConfirm(false)} 
            onConfirm={confirmReset} 
        />

        <ChecklistDetailModal 
            item={selectedItem} 
            isChecked={selectedItem ? !!checkedItems[selectedItem.id] : false}
            onClose={() => setSelectedItem(null)} 
            onToggle={toggleItem} 
        />
    </section>
  );
};