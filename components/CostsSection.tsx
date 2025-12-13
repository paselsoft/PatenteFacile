import React from 'react';
import { COSTS_DATA } from '../constants';
import { Wallet } from 'lucide-react';

export const CostsSection: React.FC = () => {
  return (
    <section id="costi" className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 scroll-mt-8">
        <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-blue-50 rounded-full mb-4">
                <Wallet className="w-8 h-8 text-motorizzazione" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-motorizzazione text-center">
                Costi Amministrativi Fissi
            </h2>
            <p className="text-center text-gray-500 mt-2 max-w-lg">
                Tariffe ufficiali PagoPA da saldare prima della presentazione della domanda.
            </p>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
            <table className="min-w-full bg-white">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="py-4 px-6 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Causale
                        </th>
                        <th className="py-4 px-6 text-center text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                            Codice Tariffa
                        </th>
                        <th className="py-4 px-6 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">
                            Importo
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {COSTS_DATA.map((cost, index) => (
                        <tr 
                            key={index} 
                            className={`transition-colors hover:bg-gray-50 ${cost.isTotal ? 'bg-blue-50/50' : ''}`}
                        >
                            <td className="py-5 px-6">
                                <div className={`text-sm ${cost.isTotal ? 'font-bold text-lg text-motorizzazione' : 'font-medium text-gray-900'}`}>
                                    {cost.reason}
                                </div>
                                {!cost.isTotal && (
                                    <div className="text-xs text-gray-500 mt-1">
                                        {cost.detail}
                                    </div>
                                )}
                                {/* Mobile-only code display */}
                                {!cost.isTotal && (
                                    <div className="sm:hidden text-xs text-gray-400 mt-1 font-mono">
                                        Cod: {cost.code}
                                    </div>
                                )}
                            </td>
                            <td className="py-5 px-6 text-sm text-gray-500 text-center font-mono hidden sm:table-cell">
                                {cost.code || '-'}
                            </td>
                            <td className={`py-5 px-6 text-right ${cost.isTotal ? 'text-lg text-motorizzazione' : 'text-gray-900'} font-bold`}>
                                {cost.amount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        <p className="mt-6 text-sm text-gray-400 text-center italic">
            * Esclusi costi visita medica privatistica e costo certificato anamnestico.
        </p>
    </section>
  );
};