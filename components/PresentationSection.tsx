import React from 'react';
import { AlertTriangle, UserCheck, Users, Building2 } from 'lucide-react';

export const PresentationSection: React.FC = () => {
  return (
    <section id="presentazione" className="scroll-mt-8">
        <h2 className="text-3xl font-bold text-motorizzazione text-center mb-10">
            Chi Può Presentare la Domanda
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Modalità di Presentazione */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-motorizzazione mb-4 flex items-center">
                    <UserCheck className="w-6 h-6 mr-2" />
                    Modalità di Presentazione
                </h3>
                <p className="text-gray-600 mb-6">
                    La domanda (Modello TT 2112) può essere presentata allo sportello in tre modi:
                </p>
                
                <ul className="space-y-4">
                    <li className="p-4 bg-gray-50 rounded-xl border-l-4 border-accent-green shadow-sm hover:shadow-md transition-shadow">
                        <strong className="block font-bold text-lg text-gray-900 mb-1">1. Diretto Interessato</strong>
                        <span className="text-gray-600">Il candidato si presenta personalmente allo sportello.</span>
                    </li>
                    
                    <li className="p-4 bg-gray-50 rounded-xl border-l-4 border-accent-green shadow-sm hover:shadow-md transition-shadow">
                        <strong className="block font-bold text-lg text-gray-900 mb-1">2. Soggetto Delegato</strong>
                        <span className="text-gray-600 block mb-3">Un'altra persona può presentare la pratica per conto del candidato.</span>
                        
                        <div className="bg-white p-4 rounded-lg border border-gray-200 text-sm">
                            <p className="font-semibold text-gray-800 mb-2 border-b pb-2">Documenti OBBLIGATORI per il delegato:</p>
                            <ul className="list-disc list-inside space-y-2 text-gray-700">
                                <li>Delega in carta semplice firmata dal candidato.</li>
                                <li>
                                    Documento del <strong>Delegato</strong> in <span className="text-red-600 font-bold bg-red-50 px-1 rounded">ORIGINALE</span>
                                </li>
                                <li>
                                    Documento del <strong>Delegante</strong> in <span className="text-red-600 font-bold bg-red-50 px-1 rounded">FOTOCOPIA</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    
                    <li className="p-4 bg-gray-50 rounded-xl border-l-4 border-accent-green shadow-sm hover:shadow-md transition-shadow">
                        <strong className="block font-bold text-lg text-gray-900 mb-1">3. Autoscuola</strong>
                        <span className="text-gray-600">Tramite un'agenzia o autoscuola abilitata.</span>
                    </li>
                </ul>
            </div>

            {/* PagoPA Information */}
            <div className="flex flex-col h-full">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-grow">
                    <h3 className="text-xl font-semibold text-motorizzazione mb-4 flex items-center">
                        <Building2 className="w-6 h-6 mr-2" />
                        Versamenti PagoPA
                    </h3>
                    <p className="text-gray-600 mb-6">
                        I versamenti (Diritti e Bolli) devono essere effettuati obbligatoriamente tramite la piattaforma <strong>PagoPA</strong>.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm">
                        <div className="flex items-start">
                            <AlertTriangle className="w-8 h-8 text-red-600 mr-3 flex-shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-red-800 text-lg mb-2">
                                    Attenzione: Intestazione Pagamento
                                </h4>
                                <p className="text-red-700 mb-3 leading-relaxed">
                                    I bollettini PagoPA devono essere generati e pagati esclusivamente a nome del <strong>CANDIDATO</strong> (l'intestatario della futura patente).
                                </p>
                                <p className="text-red-800 font-medium text-sm bg-red-100 p-2 rounded">
                                    Anche se a pagare è un genitore o un delegato, il <strong>Codice Fiscale</strong> sul versamento deve essere quello di chi deve conseguire la patente.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};