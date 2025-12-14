import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useServiceWorker } from '../../hooks/useServiceWorker';

export const UpdatePrompt: React.FC = () => {
  const { isUpdateAvailable, updateServiceWorker } = useServiceWorker();

  if (!isUpdateAvailable) return null;

  return (
    <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in-down w-full max-w-md px-4">
      <div className="bg-slate-900 text-white rounded-xl shadow-2xl p-4 flex items-center justify-between border border-white/10 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center">
            <div className="bg-blue-500/20 p-2 rounded-lg mr-3">
                <RefreshCw className="w-5 h-5 text-blue-300 animate-spin-slow" />
            </div>
            <div>
                <h4 className="font-bold text-sm">Aggiornamento Disponibile</h4>
                <p className="text-xs text-blue-200">Nuove funzionalità pronte.</p>
            </div>
        </div>
        
        <button 
            onClick={updateServiceWorker}
            className="bg-white text-slate-900 hover:bg-blue-50 text-xs font-bold py-2 px-4 rounded-lg transition-colors shadow-sm"
        >
            Aggiorna Ora
        </button>
      </div>
    </div>
  );
};