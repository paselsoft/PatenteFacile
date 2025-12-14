import React from 'react';
import { Check, Info, UserCog } from 'lucide-react';
import { ChecklistItem } from '../../types';
import { DELEGATE_DOCUMENTS_DATA } from '../../constants';

interface ChecklistItemProps {
  item: ChecklistItem;
  isChecked: boolean;
  onToggle: (id: string) => void;
  onInfoClick: (item: ChecklistItem) => void;
  isDelegateMode: boolean;
}

export const ChecklistItemRow: React.FC<ChecklistItemProps> = ({ 
  item, 
  isChecked, 
  onToggle, 
  onInfoClick,
  isDelegateMode
}) => {
  const isDelegateItem = item.id.startsWith('del_');
  const isExtraEuItem = item.id === 'soggiorno';
  const isMinorItem = item.id.startsWith('doc_genitore');

  const isFirstDelegateItem = isDelegateMode && isDelegateItem && item.id === DELEGATE_DOCUMENTS_DATA[0].id;

  let badge = null;
  if (isDelegateItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">Delegato</span>;
  else if (isExtraEuItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">Extra-UE</span>;
  else if (isMinorItem) badge = <span className="ml-2 text-[10px] uppercase tracking-wider bg-pink-100 text-pink-800 px-2 py-0.5 rounded-full font-bold">Minore</span>;

  return (
    <React.Fragment>
        {isFirstDelegateItem && (
            <div className="mt-8 mb-3 flex items-center px-1 animate-slide-in">
                <div className="h-px bg-gray-200 flex-grow mr-4"></div>
                <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center">
                    <UserCog className="w-3 h-3 mr-1" />
                    Sezione Delegati
                </span>
                <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>
        )}

        <label 
            htmlFor={`check-${item.id}`}
            className={`
                flex items-center justify-between p-4 rounded-xl transition-all duration-300 border-2 group relative cursor-pointer
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
                    onChange={() => onToggle(item.id)}
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
                    <h4 className={`font-medium text-base sm:text-lg transition-colors duration-300 flex flex-wrap items-center ${isChecked ? 'text-gray-400 line-through decoration-gray-300' : 'text-gray-800'}`}>
                        {item.label}
                        {!isChecked && badge}
                    </h4>
                </div>
            </div>

            {/* Info Button - Opens Modal */}
            <button 
                type="button"
                onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation();
                    onInfoClick(item);
                }}
                className={`
                    p-2 rounded-full transition-colors duration-300 ml-2 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-blue-400
                    ${isChecked ? 'text-gray-300 hover:text-gray-500' : 'text-blue-400 hover:text-blue-600 hover:bg-blue-50'}
                `}
                aria-label={`Vedi dettagli per ${item.label}`}
            >
                <Info className="w-5 h-5" />
            </button>
        </label>
    </React.Fragment>
  );
};