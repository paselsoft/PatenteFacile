import { useMemo } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { DOCUMENTS_DATA, DELEGATE_DOCUMENTS_DATA, EXTRA_EU_DOCUMENTS_DATA, MINOR_DOCUMENTS_DATA } from '../constants';

export const useChecklist = () => {
  // State persistente
  const [checkedItems, setCheckedItems] = useLocalStorage<Record<string, boolean>>('patente_checklist', {});
  const [isDelegateMode, setIsDelegateMode] = useLocalStorage<boolean>('patente_delegate_mode', false);
  const [isExtraEu, setIsExtraEu] = useLocalStorage<boolean>('patente_extra_eu', false);
  const [isMinor, setIsMinor] = useLocalStorage<boolean>('patente_minor', false);

  // Azioni
  const toggleItem = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    setCheckedItems({});
  };

  // Logica di filtraggio (Memoized)
  const currentList = useMemo(() => [
      ...DOCUMENTS_DATA,
      ...(isExtraEu ? EXTRA_EU_DOCUMENTS_DATA : []),
      ...(isMinor ? MINOR_DOCUMENTS_DATA : []),
      ...(isDelegateMode ? DELEGATE_DOCUMENTS_DATA : [])
  ], [isExtraEu, isMinor, isDelegateMode]);

  // Calcolo Progresso
  const totalItems = currentList.length;
  const completedItems = currentList.filter(item => checkedItems[item.id]).length;
  const progress = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
  const isComplete = progress === 100 && totalItems > 0;

  return {
    // State
    checkedItems,
    isDelegateMode,
    isExtraEu,
    isMinor,
    
    // Derived
    currentList,
    progress,
    isComplete,

    // Setters (esposti per i toggle)
    setIsDelegateMode,
    setIsExtraEu,
    setIsMinor,

    // Actions
    toggleItem,
    resetChecklist
  };
};