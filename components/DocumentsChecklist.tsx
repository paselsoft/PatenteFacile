import React, { useState, useEffect } from 'react';
import { DOCUMENTS_DATA, DELEGATE_DOCUMENTS_DATA, EXTRA_EU_DOCUMENTS_DATA, MINOR_DOCUMENTS_DATA } from '../constants';
import { ChecklistItem } from '../types';
import { Check, ClipboardList, RefreshCw, Info, X, UserCog, Globe, Baby, Settings, ChevronDown, ChevronUp, Camera, Trophy, Sparkles } from 'lucide-react';

export const DocumentsChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Toggle States
  const [isDelegateMode, setIsDelegateMode] = useState(false);
  const [isExtraEu, setIsExtraEu] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // Default closed for cleaner initial look
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedChecklist = localStorage.getItem('patente_checklist');
    const savedDelegateMode = localStorage.getItem('patente_delegate_mode');
    const savedExtraEu = localStorage.getItem('patente_extra_eu');
    const savedMinor = localStorage.getItem('patente_minor');
    
    if (savedChecklist) {
      try {
        setCheckedItems(JSON.parse(savedChecklist));
      } catch (e) {
        console.error("Failed to parse checklist", e);
      }
    }
    
    if (savedDelegateMode) setIsDelegateMode(savedDelegateMode === 'true');
    if (savedExtraEu) setIsExtraEu(savedExtraEu === 'true');
    if (savedMinor) setIsMinor(savedMinor === 'true');

    setIsLoaded(true);
  }, []);

  // Save state to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('patente_checklist', JSON.stringify(checkedItems));
      localStorage.setItem('patente_delegate_mode', String(isDelegateMode));
      localStorage.setItem('patente_extra_eu', String(isExtraEu));
      localStorage.setItem('patente_minor', String(isMinor));
    }
  }, [checkedItems, isDelegateMode, isExtraEu, isMinor, isLoaded]);

  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('Vuoi davvero resettare la checklist?')) {
        setCheckedItems({});
    }
  };

  // Build the dynamic list based on toggles
  const currentList = [
      ...DOCUMENTS_DATA,
      ...(isExtraEu ? EXTRA_EU_DOCUMENTS_DATA : []),
      ...(isMinor ? MINOR_DOCUMENTS_DATA : []),
      ...(isDelegateMode ? DELEGATE_DOCUMENTS_DATA : [])
  ];

  const totalItems = currentList.length;
  const completedItems = currentList.filter(item => checkedItems[item.id]).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isComplete = progress === 100 && totalItems > 0;

  // Helper component for toggle switches
  const ToggleSwitch = ({ 
    label, 
    checked, 
    onChange, 
    icon: Icon 
  }: { 
    label: string; 
    checked: boolean; 
    onChange: (val: boolean) => void;
    icon: React.ElementType;
  }) => (
    <div 
        onClick={() => onChange(!checked)}
        className={`
            cursor-pointer flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-200 select-none
            ${checked ? 'bg-blue-50 border-motorizzazione shadow-sm' : 'bg-white border-gray-100 hover:border-blue-200'}
        `}
    >
        <div className="flex items-center text-sm sm:text-base font-medium text-gray-700">
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
    </div>
  );

  return (
    <section id="documenti" className="scroll-mt-8 relative">
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
                            onClick={resetChecklist}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors group"
                            title="Resetta checklist"
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

                {/* Configuration Toggle Bar */}
                <div className="border-b border-gray-100 bg-gray-50/80">
                    <button 
                        onClick={() => setShowSettings(!showSettings)}
                        className={`w-full px-6 py-4 flex items-center justify-between transition-colors text-sm font-bold tracking-wide
                        ${showSettings ? 'text-motorizzazione bg-blue-50/50' : 'text-gray-500 hover:text-motorizzazione hover:bg-gray-50'}
                        `}
                    >
                        <span className="flex items-center">
                            <Settings className="w-4 h-4 mr-2" />
                            FILTRA LA TUA LISTA
                        </span>
                        <div className="flex items-center text-xs font-normal text-gray-400">
                             {(isExtraEu || isMinor || isDelegateMode) && (
                                <span className="mr-3 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Filtri attivi</span>
                             )}
                            {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                    </button>
                    
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showSettings ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/80">
                            <ToggleSwitch 
                                label="Cittadino Extra-UE" 
                                checked={isExtraEu} 
                                onChange={setIsExtraEu}
                                icon={Globe}
                            />
                            <ToggleSwitch 
                                label="Minorenne" 
                                checked={isMinor} 
                                onChange={setIsMinor}
                                icon={Baby}
                            />
                            <ToggleSwitch 
                                label="Delega a Terzi" 
                                checked={isDelegateMode} 
                                onChange={setIsDelegateMode}
                                icon={UserCog}
                            />
                        </div>
                    </div>
                </div>

                {/* Success Banner */}
                {isComplete && (
                    <div className="mx-4 mt-4 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center animate-in zoom-in-95 duration-300">
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

                                    <div 
                                        className={`
                                            flex items-center justify-between p-4 rounded-xl transition-all duration-200 border-2 group
                                            ${isDelegateItem ? 'bg-amber-50/30 border-amber-100' : ''}
                                            ${isChecked 
                                                ? 'bg-gray-50 border-gray-100 opacity-75' 
                                                : (!isDelegateItem ? 'bg-white border-gray-100 hover:border-blue-300 hover:shadow-md cursor-pointer' : 'hover:border-amber-300 hover:shadow-md cursor-pointer')
                                            }
                                        `}
                                        onClick={() => toggleItem(item.id)}
                                    >
                                        <div className="flex items-center flex-grow">
                                            {/* Checkbox area */}
                                            <div className={`
                                                mr-4 flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300 border-2
                                                ${isChecked 
                                                    ? 'bg-accent-green border-accent-green text-white scale-100 rotate-0' 
                                                    : `bg-white border-gray-300 text-transparent scale-95 group-hover:scale-110 group-hover:border-blue-400`
                                                }
                                            `}>
                                                <Check className="w-4 h-4 stroke-[3]" />
                                            </div>
                                            
                                            {/* Label */}
                                            <div className="flex-grow">
                                                <h4 className={`font-medium text-base sm:text-lg transition-colors flex flex-wrap items-center ${isChecked ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-800'}`}>
                                                    {item.label}
                                                    {!isChecked && badge}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Info Button - Opens Modal */}
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedItem(item);
                                            }}
                                            className={`
                                                p-2 rounded-full transition-colors ml-2 flex-shrink-0 
                                                ${isChecked ? 'text-gray-300 hover:text-gray-500' : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50'}
                                            `}
                                            aria-label="Vedi dettagli"
                                        >
                                            <Info className="w-5 h-5" />
                                        </button>
                                    </div>
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

        {/* Detail Modal */}
        {selectedItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedItem(null)}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-white/20" onClick={e => e.stopPropagation()}>
                    <div className={`p-5 text-white flex justify-between items-start ${selectedItem.id.startsWith('del_') ? 'bg-amber-500' : 'bg-motorizzazione'}`}>
                        <div>
                            <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase mb-2 ${selectedItem.required ? 'bg-white/20 text-white' : 'bg-green-500/20 text-white'}`}>
                                {selectedItem.required ? 'Obbligatorio' : 'Opzionale'}
                            </span>
                            <h3 className="font-bold text-xl pr-4 leading-tight">{selectedItem.label}</h3>
                        </div>
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors mt-1"
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
                                w-full py-3.5 px-4 rounded-xl font-bold flex items-center justify-center transition-all duration-300 transform active:scale-95
                                ${checkedItems[selectedItem.id]
                                    ? 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                    : 'bg-accent-green text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
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