import React, { useState, useEffect } from 'react';
import { DOCUMENTS_DATA, DELEGATE_DOCUMENTS_DATA, EXTRA_EU_DOCUMENTS_DATA, MINOR_DOCUMENTS_DATA } from '../constants';
import { ChecklistItem } from '../types';
import { Check, ClipboardList, RefreshCw, Info, X, UserCog, Globe, Baby, Settings, ChevronDown, ChevronUp, Camera } from 'lucide-react';

export const DocumentsChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  // Toggle States
  const [isDelegateMode, setIsDelegateMode] = useState(false);
  const [isExtraEu, setIsExtraEu] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [showSettings, setShowSettings] = useState(true); // Default open to see options
  
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
            cursor-pointer flex items-center justify-between p-3 rounded-xl border transition-all duration-200 select-none
            ${checked ? 'bg-blue-50 border-motorizzazione/50 shadow-sm' : 'bg-white border-gray-200 hover:border-blue-200'}
        `}
    >
        <div className="flex items-center text-sm sm:text-base font-medium text-gray-700">
            <div className={`p-1.5 rounded-lg mr-3 ${checked ? 'bg-motorizzazione/10' : 'bg-gray-100'}`}>
                <Icon className={`w-5 h-5 ${checked ? 'text-motorizzazione' : 'text-gray-500'}`} />
            </div>
            <span className={checked ? 'text-motorizzazione font-semibold' : ''}>{label}</span>
        </div>
        <div className={`
            relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors 
            ${checked ? 'bg-motorizzazione' : 'bg-gray-300'}
        `}>
            <span className={`
                inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                ${checked ? 'translate-x-6' : 'translate-x-1'}
            `} />
        </div>
    </div>
  );

  return (
    <section id="documenti" className="scroll-mt-8 relative">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-motorizzazione p-6 text-white flex flex-col sm:flex-row justify-between items-center">
                <div className="flex items-center mb-4 sm:mb-0">
                    <div className="p-2 bg-white/20 rounded-lg mr-3">
                        <ClipboardList className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Checklist Documenti</h2>
                        <p className="text-blue-100 text-sm">Prepara tutto prima di andare allo sportello</p>
                    </div>
                </div>
                
                {/* Progress Circle */}
                <div className="flex items-center space-x-4">
                     <div className="text-right">
                        <span className="block text-2xl font-bold leading-none">{progress}%</span>
                        <span className="text-xs text-blue-200">Completato</span>
                     </div>
                     <div className="h-8 w-px bg-white/20"></div>
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
                    className="bg-accent-green h-2 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Configuration Section */}
            <div className="border-b border-gray-100 bg-gray-50/50">
                <button 
                    onClick={() => setShowSettings(!showSettings)}
                    className="w-full px-6 py-3 flex items-center justify-between text-gray-500 hover:text-motorizzazione transition-colors text-sm font-medium"
                >
                    <span className="flex items-center">
                        <Settings className="w-4 h-4 mr-2" />
                        Personalizza la tua lista
                    </span>
                    {showSettings ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                <div className={`overflow-hidden transition-all duration-300 ${showSettings ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
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

            {/* List */}
            <div className="p-4 sm:p-6 space-y-3">
                {currentList.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        Nessun documento richiesto.
                    </div>
                ) : (
                    currentList.map((item) => {
                        const isChecked = !!checkedItems[item.id];
                        // Identify special items for visual cues
                        const isDelegateItem = item.id.startsWith('del_');
                        const isExtraEuItem = item.id === 'soggiorno';
                        const isMinorItem = item.id.startsWith('doc_genitore');

                        let badge = null;
                        if (isDelegateItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Delegato</span>;
                        else if (isExtraEuItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">Extra-UE</span>;
                        else if (isMinorItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">Minore</span>;

                        return (
                            <div 
                                key={item.id}
                                className={`
                                    flex items-center justify-between p-4 rounded-xl transition-all duration-200 border group
                                    ${isChecked 
                                        ? 'bg-blue-50/30 border-blue-100' 
                                        : 'bg-white border-gray-100 hover:border-blue-200 hover:shadow-md'
                                    }
                                `}
                            >
                                <div className="flex items-center flex-grow cursor-pointer" onClick={() => toggleItem(item.id)}>
                                    {/* Checkbox area */}
                                    <div className={`
                                        mr-4 flex-shrink-0 w-6 h-6 rounded flex items-center justify-center transition-all duration-200 border
                                        ${isChecked 
                                            ? 'bg-accent-green border-accent-green text-white scale-100' 
                                            : 'bg-white border-gray-300 text-transparent scale-90 group-hover:scale-100 group-hover:border-motorizzazione'
                                        }
                                    `}>
                                        <Check className="w-4 h-4" />
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
                                    className="p-2 text-motorizzazione bg-blue-50 hover:bg-blue-100 rounded-full transition-colors ml-2 flex-shrink-0"
                                    aria-label="Vedi dettagli"
                                >
                                    <Info className="w-5 h-5" />
                                </button>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Photo Explanation Note */}
            <div className="bg-blue-50/80 p-4 border-t border-blue-100 flex items-start space-x-3">
                <div className="p-2 bg-white rounded-full shadow-sm">
                    <Camera className="w-5 h-5 text-motorizzazione" />
                </div>
                <div>
                    <h5 className="font-semibold text-motorizzazione text-sm mb-1">Non servono Foto Tessera cartacee</h5>
                    <p className="text-sm text-gray-600 leading-snug">
                        La foto viene scattata e acquisita digitalmente durante la visita medica. Sulla ricevuta telematica che riceverai dal medico sarà già presente la tua foto.
                    </p>
                </div>
            </div>
            
            <div className="p-4 bg-gray-50 text-center text-xs text-gray-500 border-t border-gray-100">
                Spunta le caselle per tenere traccia dei documenti raccolti.
            </div>
        </div>

        {/* Detail Modal */}
        {selectedItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedItem(null)}>
                <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                    <div className="bg-motorizzazione p-4 text-white flex justify-between items-center">
                        <h3 className="font-bold text-lg pr-4">{selectedItem.label}</h3>
                        <button 
                            onClick={() => setSelectedItem(null)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                    
                    <div className="p-6">
                        <div className="mb-6">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${selectedItem.required ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {selectedItem.required ? 'OBBLIGATORIO' : 'OPZIONALE'}
                            </span>
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
                                w-full py-3 px-4 rounded-xl font-bold flex items-center justify-center transition-colors
                                ${checkedItems[selectedItem.id]
                                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    : 'bg-accent-green text-white hover:bg-emerald-600 shadow-lg hover:shadow-xl'
                                }
                            `}
                        >
                            {checkedItems[selectedItem.id] ? (
                                <>
                                    <X className="w-5 h-5 mr-2" />
                                    Segna come da fare
                                </>
                            ) : (
                                <>
                                    <Check className="w-5 h-5 mr-2" />
                                    Segna come completato
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