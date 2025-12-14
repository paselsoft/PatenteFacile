import React from 'react';
import { Info, ExternalLink } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="container mx-auto px-4 flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center justify-center tracking-tight">
                <span className="bg-white/10 p-2 rounded-xl mr-3 border border-white/10">
                    PF
                </span>
                Patente Facile
            </h3>
            
            <p className="opacity-60 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
                {t('footer.disclaimer')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                 <a 
                    href="https://www.ilportaledellautomobilista.it/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-blue-300 hover:text-white transition-colors px-4 py-2 rounded-full bg-white/5 hover:bg-white/10"
                >
                    {t('footer.portal_link')} <ExternalLink className="w-3 h-3 ml-2" />
                 </a>
            </div>
            
            <div className="flex items-center text-xs text-gray-400 bg-black/30 px-4 py-2 rounded-full border border-white/5">
                <Info className="w-3 h-3 mr-2" />
                <span>{t('footer.updated')}</span>
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/5 w-full text-center">
                <p className="text-xs text-gray-600">
                    &copy; {new Date().getFullYear()} {t('footer.rights')}
                </p>
            </div>
        </div>
    </footer>
  );
};