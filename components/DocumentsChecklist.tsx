import React, { useState, useEffect, useMemo, useRef } from 'react';
import { DOCUMENTS_DATA, DELEGATE_DOCUMENTS_DATA, EXTRA_EU_DOCUMENTS_DATA, MINOR_DOCUMENTS_DATA } from '../constants';
import { ChecklistItem } from '../types';
import { Check, ClipboardList, RefreshCw, Info, X, UserCog, Globe, Baby, Settings, Camera, Trophy, Sparkles, AlertTriangle } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Helper component for accessible toggle switches
const ToggleSwitch = ({ 
  id,
  label, 
  checked, 
  onChange, 
  icon: Icon 
}: { 
  id: string;
  label: string; 
  checked: boolean; 
  onChange: (val: boolean) => void;
  icon: React.ElementType;
}) => (
  <label 
      htmlFor={id}
      className={`
          cursor-pointer flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 select-none
          ${checked ? 'bg-blue-50 border-motorizzazione shadow-sm' : 'bg-white border-gray-100 hover:border-blue-200'}
      `}
  >
      <div className="flex items-center text-sm sm:text-base font-medium text-gray-700">
          <input 
              type="checkbox" 
              id={id} 
              checked={checked} 
              onChange={(e) => onChange(e.target.checked)} 
              className="sr-only"
          />
          <div className={`p-1.5 rounded-lg mr-3 ${checked ? 'bg-motorizzazione text-white' : 'bg-gray-100 text-gray-500'}`}>
              <Icon className="w-5 h-5" />
          </div>
          <span className={checked ? 'text-motorizzazione font-bold' : ''}>{label}</span>
      </div>
      <div className={`
          relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors 
          ${checked ? 'bg-motorizzazione' : 'bg-gray-300'}
      `}>
          <span className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm
              ${checked ? 'translate-x-6' : 'translate-x-1'}
          `} />
      </div>
  </label>
);

export const DocumentsChecklist: React.FC = () => {
  // Use custom hook for robust localStorage management
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('patente_checklist', {});
  const [isDelegateMode, setIsDelegateMode] = useLocalStorage<boolean>('patente_delegate_mode', false);
  const [isExtraEu, setIsExtraEu] = useLocalStorage<boolean>('patente_extra_eu', false);
  const [isMinor, setIsMinor] = useLocalStorage<boolean>('patente_minor', false);
  
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  
  // Refs for focus management
  const resetConfirmRef = useRef<HTMLDivElement>(null);
  const detailModalRef = useRef<HTMLDivElement>(null);

  // Manage body scroll and focus when modals are open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            if (showResetConfirm) setShowResetConfirm(false);
            if (selectedItem) setSelectedItem(null);
        }
    };

    if (showResetConfirm || selectedItem) {
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);
        
        // Focus trap simple implementation
        if (showResetConfirm) setTimeout(() => resetConfirmRef.current?.focus(), 50);
        if (selectedItem) setTimeout(() => detailModalRef.current?.focus(), 50);
    } else {
        document.body.style.overflow = 'unset';
    }

    return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showResetConfirm, selectedItem]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const confirmReset = () => {
    setCheckedItems({});
    setShowResetConfirm(false);
  };

  // Optimize list generation with useMemo
  const currentList = useMemo(() => [
      ...DOCUMENTS_DATA,
      ...(isExtraEu ? EXTRA_EU_DOCUMENTS_DATA : []),
      ...(isMinor ? MINOR_DOCUMENTS_DATA : []),
      ...(isDelegateMode ? DELEGATE_DOCUMENTS_DATA : [])
  ], [isExtraEu, isMinor, isDelegateMode]);

  const totalItems = currentList.length;
  const completedItems = currentList.filter(item => checkedItems[item.id]).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isComplete = progress === 100 && totalItems > 0;

  return (
    <section id="documenti" className="scroll-mt-24 relative">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Main Checklist Column */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                
                {/* Header */}
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
                    
                    {/* Progress Circle */}
                    <div className="flex items-center space-x-5 relative z-10">
                        <div className="text-right">
                            <span className="block text-3xl font-bold leading-none">{progress}%</span>
                            <span className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold">Completato</span>
                        </div>
                        <button 
                            onClick={() => setShowResetConfirm(true)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors group focus:outline-none focus:ring-2 focus:ring-white"
                            title="Resetta checklist"
                            aria-label="Resetta checklist"
                        >
                            <RefreshCw className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-100 h-2">
                    <div 
                        className={`h-2 transition-all duration-700 ease-out ${isComplete ? 'bg-accent-green' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Configuration Toggle Bar - Always Visible */}
                <div className="border-b border-gray-100 bg-gray-50/50 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="flex items-center text-sm font-bold tracking-wide text-gray-700">
                            <Settings className="w-4 h-4 mr-2 text-motorizzazione" />
                            PERSONALIZZA LA TUA LISTA
                        </h3>
                        <span className="text-xs text-gray-400 font-normal hidden sm:block">Seleziona le opzioni che ti riguardano</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <ToggleSwitch 
                            id="toggle-extra-eu"
                            label="Cittadino Extra-UE" 
                            checked={isExtraEu} 
                            onChange={setIsExtraEu}
                            icon={Globe}
                        />
                        <ToggleSwitch 
                            id="toggle-minor"
                            label="Minorenne" 
                            checked={isMinor} 
                            onChange={setIsMinor}
                            icon={Baby}
                        />
                        <ToggleSwitch 
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
                    <div className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-in zoom-in-95 duration-300" role="alert">
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

                {/* List */}
                <div className="p-4 sm:p-6 space-y-3">
                    {currentList.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 flex flex-col items-center">
                             <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                <ClipboardList className="w-8 h-8 opacity-50" />
                             </div>
                             <p>Nessun documento richiesto con i filtri attuali.</p>
                        </div>
                    ) : (
                        currentList.map((item) => {
                            const isChecked = !!checkedItems[item.id];
                            const isDelegateItem = item.id.startsWith('del_');
                            const isExtraEuItem = item.id === 'soggiorno';
                            const isMinorItem = item.id.startsWith('doc_genitore');

                            const isFirstDelegateItem = isDelegateMode && isDelegateItem && item.id === DELEGATE_DOCUMENTS_DATA[0].id;

                            let badge = null;
                            if (isDelegateItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Delegato</span>;
                            else if (isExtraEuItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">Extra-UE</span>;
                            else if (isMinorItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">Minore</span>;

                            return (
                                <React.Fragment key={item.id}>
                                    {isFirstDelegateItem && (
                                        <div className="mt-8 mb-3 flex items-center px-1 animate-in fade-in slide-in-from-top-2">
                                            <div className="h-px bg-gray-200 flex-grow mr-4"></div>
                                            <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                                                <UserCog className="w-3 h-3 mr-1" />
                                                Sezione Delegati
                                            </span>
                                            <div className="h-px bg-gray-200 flex-grow ml-4"></div>
                                        </div>
                                    )}

                                    {/* Semantic Accessible Checkbox */}
                                    <label 
                                        htmlFor={`check-${item.id}`}
                                        className={`
                                            flex items-center justify-between p-4 rounded-xl transition-all duration-200 border-2 group relative cursor-pointer
                                            ${isDelegateItem ? 'bg-amber-50/30 border-amber-100' : ''}
                                            ${isChecked 
                                                ? 'bg-gray-50 border-gray-100 opacity-75' 
                                                : (!isDelegateItem ? 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md' : 'hover:border-amber-300 hover:shadow-md')
                                            }
                                        `}
                                    >
                                        <div className="flex items-center flex-grow">
                                            <input
                                                type="checkbox"
                                                id={`check-${item.id}`}
                                                checked={isChecked}
                                                onChange={() => toggleItem(item.id)}
                                                className="sr-only peer"
                                                aria-describedby={`desc-${item.id}`}
                                            />
                                            
                                            {/* Checkbox Visual Styled via Peer */}
                                            <div className={`
                                                mr-4 flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 border-2
                                                bg-white border-gray-300 text-transparent scale-95 group-hover:scale-110 group-hover:border-blue-400
                                                peer-checked:bg-accent-green peer-checked:border-accent-green peer-checked:text-white peer-checked:scale-100 peer-checked:rotate-0
                                                peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-motorizzazione
                                            `}>
                                                <Check className="w-4 h-4 stroke-[3]" />
                                            </div>
                                            
                                            {/* Label Text */}
                                            <div className="flex-grow">
                                                <h4 className={`font-medium text-base sm:text-lg transition-colors flex flex-wrap items-center ${isChecked ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-800'}`}>
                                                    {item.label}
                                                    {!isChecked && badge}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Info Button - Opens Modal */}
                                        <button 
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault(); // Prevent triggering the label click
                                                e.stopPropagation();
                                                setSelectedItem(item);
                                            }}
                                            className={`
                                                p-2 rounded-full transition-colors ml-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400
                                                ${isChecked ? 'text-gray-300 hover:text-gray-500' : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50'}
                                            `}
                                            aria-label={`Vedi dettagli per ${item.label}`}
                                        >
                                            <Info className="w-5 h-5" />
                                        </button>
                                    </label>
                                </React.Fragment>
                            );
                        })
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
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
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

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
            <div 
                className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={() => setShowResetConfirm(false)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="reset-title"
                aria-describedby="reset-desc"
            >
                <div 
                    ref={resetConfirmRef}
                    className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200 p-6 text-center focus:outline-none" 
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
                            onClick={() => setShowResetConfirm(false)}
                            className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                        >
                            Annulla
                        </button>
                        <button 
                            onClick={confirmReset}
                            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 font-semibold text-white hover:bg-red-700 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        )}

        {/* Detail Modal */}
        {selectedItem && (
            <div 
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" 
                onClick={() => setSelectedItem(null)}
                role="dialog"
                aria-modal="true"
                aria-labelledby="detail-title"
            >
                <div 
                    ref={detailModalRef}
                    className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-white/20 focus:outline-none" 
                    onClick={e => e.stopPropagation()}
                    tabIndex={-1}
                >
                    <div className={`p-5 text-white flex justify-between items-start ${selectedItem.id.startsWith('del_') ? 'bg-amber-500' : 'bg-motorizzazione'}`}>
                        <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${selectedItem.required ? 'bg-white/20 text-white' : 'bg-green-500/20 text-white'}`}>
                                {selectedItem.required ? 'Obbligatorio' : 'Opzionale'}
                            </span>
                            <h3 id="detail-title" className="font-bold text-xl pr-4 leading-tight">{selectedItem.label}</h3>
                        </div>
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-white"
                            aria-label="Chiudi dettagli"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="mb-8">
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {selectedItem.detail}
                            </p>
                        </div>

                        <button 
                            onClick={() => {
                                toggleItem(selectedItem.id);
                                setSelectedItem(null);
                            }}
                            className={`
                                w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                                ${checkedItems[selectedItem.id]
                                    ? 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus:ring-gray-400'
                                    : 'bg-accent-green text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 focus:ring-emerald-500'
                                }
                            `}
                        >
                            {checkedItems[selectedItem.id] ? (
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
        )}
    </section>
  );
};