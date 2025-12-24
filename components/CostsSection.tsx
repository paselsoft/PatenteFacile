import React from 'react';
import { COSTS_DATA } from '../constants';
import { Wallet, Info, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

export const CostsSection: React.FC = () => {
  // Separate individual costs from total for better UI structure
  const individualCosts = COSTS_DATA.filter(c => !c.isTotal);
  const totalCost = COSTS_DATA.find(c => c.isTotal);
  const { t } = useTranslation();

  return (
    <section id="costi" className="scroll-mt-8">
        <h2 className="text-3xl font-bold text-motorizzazione text-center mb-10">
            {t('costs.title')}
        </h2>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
            
            {/* Left Column: Context & Image */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                    <div className="p-3 bg-blue-50 rounded-full mb-4 inline-block">
                        <Wallet className="w-8 h-8 text-motorizzazione" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t('costs.card_title')}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        {t('costs.card_desc')}
                    </p>
                    <div className="flex items-center text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">
                        <Info className="w-4 h-4 mr-2 flex-shrink-0" />
                        {t('costs.card_note')}
                    </div>
                </div>

                <div className="w-full rounded-2xl overflow-hidden shadow-lg h-56 relative group hidden lg:block">
                     <img 
                        src="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=600" 
                        alt="Calcolo costi" 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-cinematic"
                    />
                    <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                </div>
            </div>

            {/* Right Column: Costs List & Total Card */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Total Cost Highlight Card */}
                {totalCost && (
                    <div className="bg-gradient-to-r from-motorizzazione to-blue-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                            <h3 className="text-lg text-blue-100 font-medium mb-1">{t('costs.total_label')}</h3>
                            <p className="text-sm opacity-80">{t('costs.total_sublabel')}</p>
                        </div>
                        <div className="flex items-center">
                            <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                                {totalCost.amount}
                            </span>
                        </div>
                    </div>
                )}

                {/* Detailed Table Card */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                        <h4 className="font-bold text-gray-700">{t('costs.table_title')}</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {individualCosts.map((cost, index) => (
                            <div key={index} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-gray-50 transition-colors group">
                                <div className="mb-2 sm:mb-0">
                                    <div className="flex items-center mb-1">
                                        <span className="font-semibold text-gray-900 text-lg">{t(cost.reasonKey)}</span>
                                        <span className="ml-3 px-2 py-0.5 bg-gray-100 text-gray-500 text-xs font-mono rounded border border-gray-200">
                                            {cost.code}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm">{t(cost.detailKey)}</p>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold text-gray-900 text-xl group-hover:text-motorizzazione transition-colors">
                                        {cost.amount}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-gray-50/50 px-6 py-3 text-center sm:text-right border-t border-gray-100">
                        <a href="https://www.ilportaledellautomobilista.it/" target="_blank" rel="noopener noreferrer" className="text-sm text-motorizzazione hover:underline font-medium inline-flex items-center">
                            {t('costs.verify_link')} <ArrowRight className="w-3 h-3 ml-1" />
                        </a>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
  );
};