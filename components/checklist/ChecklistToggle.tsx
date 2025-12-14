import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ChecklistToggleProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  icon: LucideIcon;
}

export const ChecklistToggle: React.FC<ChecklistToggleProps> = ({ 
  id,
  label, 
  checked, 
  onChange, 
  icon: Icon 
}) => (
  <label 
      htmlFor={id}
      className={`
          cursor-pointer flex items-center justify-between p-3 rounded-xl border-2 transition-all duration-300 select-none
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
          relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-300
          ${checked ? 'bg-motorizzazione' : 'bg-gray-300'}
      `}>
          <span className={`
              inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-sm
              ${checked ? 'translate-x-6' : 'translate-x-1'}
          `} />
      </div>
  </label>
);