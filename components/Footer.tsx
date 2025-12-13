import React from 'react';
import { Info } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
                <span className="bg-white/10 p-2 rounded-lg mr-2">
                    PF
                </span>
                Guida Patente Facile
            </h3>
            
            <p className="opacity-70 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                Questa guida è a scopo informativo e semplifica la normativa vigente della Motorizzazione Civile.
                Verifica sempre le informazioni ufficiali sul Portale dell'Automobilista.
            </p>
            
            <div className="flex items-center text-xs text-gray-500 bg-black/20 px-4 py-2 rounded-full">
                <Info className="w-3 h-3 mr-2" />
                <span>Aggiornato al 2024</span>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 w-full text-center">
                <p className="text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} Patente Facile. Tutti i diritti riservati.
                </p>
            </div>
        </div>
    </footer>
  );
};