import React from 'react';
import { AlertTriangle, UserCheck, Users, Building2, Download, FileText, Printer } from 'lucide-react';

export const PresentationSection: React.FC = () => {
  return (
    <section id="presentazione" className="scroll-mt-8">
        <h2 className="text-3xl font-bold text-motorizzazione text-center mb-10">
            Chi Può Presentare la Domanda
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Modalità di Presentazione */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                {/* Image Header */}
                <div className="h-48 overflow-hidden relative">
                    <img 
                        src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" 
                        alt="Ufficio e documenti" 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                        <h3 className="text-white text-xl font-bold p-6 flex items-center shadow-sm">
                            <UserCheck className="w-6 h-6 mr-2 text-accent-green" />
                            Modalità di Presentazione
                        </h3>
                    </div>
                </div>

                <div className="p-6">
                    {/* Highlighted Download Box */}
                    <div className="mb-6 p-4 bg-blue-50/50 border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:bg-blue-50 hover:border-blue-200 shadow-sm">
                        <div className="flex items-start gap-3 w-full sm:w-auto">
                             <div className="p-2.5 bg-white text-motorizzazione rounded-lg shadow-sm border border-blue-50 flex-shrink-0">
                                 <FileText className="w-6 h-6" />
                             </div>
                             <div>
                                 <h4 className="text-gray-900 font-bold leading-tight pt-1">Modello TT 2112</h4>
                                 <p className="text-xs text-gray-500 mt-1 mb-2">Scarica il modulo obbligatorio.</p>
                                 
                                 {/* Printing Warning */}
                                 <div className="inline-flex items-center px-2 py-1 bg-amber-100 border border-amber-200 rounded-md text-[10px] sm:text-xs font-bold text-amber-800 leading-tight whitespace-nowrap">
                                    <Printer className="w-3 h-3 mr-1.5 flex-shrink-0" />
                                    Stampa fogli singoli (NO Fronte-Retro)
                                 </div>
                             </div>
                        </div>
                        
                        <a 
                            href="https://www.ilportaledellautomobilista.it/documents/56611/128846273/TT2112.pdf/826c655d-eba2-465a-8ab8-c618bddf1d4e" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto bg-motorizzazione hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group whitespace-nowrap"
                        >
                            <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                            Scarica PDF
                        </a>
                    </div>

                    <p className="text-gray-600 mb-6">
                        Una volta compilato, il modulo può essere presentato allo sportello in tre modi:
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
            </div>

            {/* PagoPA Information */}
            <div className="flex flex-col h-full space-y-8">
                <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex-grow relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                         <Building2 className="w-32 h-32" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-motorizzazione mb-4 flex items-center relative z-10">
                        <Building2 className="w-6 h-6 mr-2" />
                        Versamenti PagoPA
                    </h3>
                    <p className="text-gray-600 mb-6 relative z-10">
                        I versamenti (Diritti e Bolli) devono essere effettuati obbligatoriamente tramite la piattaforma <strong>PagoPA</strong>.
                    </p>

                    <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-xl shadow-sm relative z-10">
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

                {/* Decorative Image Block for Payments */}
                 <div className="rounded-2xl overflow-hidden shadow-lg h-64 relative group">
                    <img 
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=800" 
                        alt="Pagamenti elettronici" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <span className="text-white font-bold text-lg border-2 border-white px-4 py-2 rounded uppercase tracking-widest">
                            Pagamenti Digitali
                        </span>
                    </div>
                 </div>
            </div>
        </div>
    </section>
  );
};