import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { usePwaInstall } from '../../hooks/usePwaInstall';

export const PwaInstallPrompt: React.FC = () => {
  const { isInstallable, promptInstall } = usePwaInstall();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!isInstallable || isDismissed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-in flex justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-4 border border-blue-100 max-w-sm w-full flex items-center justify-between ring-1 ring-black/5">
        <div className="flex items-center">
            <div className="bg-motorizzazione p-3 rounded-xl mr-4 shadow-sm">
                <Download className="w-6 h-6 text-white" />
            </div>
            <div>
                <h4 className="font-bold text-gray-900">Installa App</h4>
                <p className="text-xs text-gray-500">Accesso rapido e offline</p>
            </div>
        </div>
        
        <div className="flex items-center gap-2">
            <button 
                onClick={promptInstall}
                className="bg-accent-green hover:bg-emerald-600 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-md"
            >
                Installa
            </button>
            <button 
                onClick={() => setIsDismissed(true)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Ignora installazione"
            >
                <X className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
};