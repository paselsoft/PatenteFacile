import React from 'react';
import { Car, ChevronDown, CheckSquare } from 'lucide-react';
import { useScrollTo } from '../hooks/useScrollTo';
import { useTranslation } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const scrollToId = useScrollTo();
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-br from-motorizzazione to-blue-800 text-white pb-16 pt-20 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-white opacity-[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-accent-green opacity-[0.05] rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-4 bg-white/10 rounded-2xl mb-8 backdrop-blur-md shadow-inner border border-white/10 animate-fade-in-down">
                <Car className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
                {t('header.title_prefix')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-white">{t('header.title_suffix')}</span>
            </h1>
            
            {/* A11Y Fix: Increased contrast from text-blue-100 to text-blue-50 */}
            <p className="text-lg sm:text-2xl font-light text-blue-50 max-w-2xl mx-auto leading-relaxed mb-10">
                {t('header.subtitle')} 
                <span className="block mt-2 font-medium text-white opacity-90">{t('header.subtitle_highlight')}</span>
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                    onClick={() => scrollToId('documenti')}
                    className="group bg-accent-green hover:bg-emerald-400 text-white text-lg font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-1 flex items-center focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
                >
                    <CheckSquare className="w-5 h-5 mr-2" />
                    {t('header.cta_docs')}
                </button>
                
                <button 
                    onClick={() => scrollToId('procedura')}
                    className="group bg-white/10 hover:bg-white/20 text-white text-lg font-medium py-4 px-8 rounded-full backdrop-blur-sm border border-white/20 transition-all duration-300 flex items-center focus:outline-none focus:ring-4 focus:ring-white/30"
                >
                    {t('header.cta_steps')}
                    <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    </header>
  );
};