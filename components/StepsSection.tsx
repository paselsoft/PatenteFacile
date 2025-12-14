import React from 'react';
import { STEPS_DATA } from '../constants';

export const StepsSection: React.FC = () => {
  return (
    <section id="procedura" className="scroll-mt-8">
      <h2 className="text-3xl font-bold text-motorizzazione text-center mb-10">
        I 4 Passi Fondamentali
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column: Steps List */}
          <div className="relative">
            {/* Connector Line (visible on desktop) */}
            <div className="hidden sm:block absolute left-[3.25rem] top-8 bottom-8 w-1 bg-blue-100 -z-10"></div>

            <div className="space-y-8">
                {STEPS_DATA.map((step) => (
                <div 
                    key={step.id} 
                    className="group bg-white p-6 sm:p-8 rounded-2xl shadow-lg flex flex-col sm:flex-row items-start border border-gray-100 hover:border-motorizzazione/30 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                    <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-motorizzazione shadow-inner border-4 border-white ring-4 ring-blue-50 group-hover:scale-110 transition-transform duration-300">
                        <step.icon className="w-8 h-8" strokeWidth={2.5} />
                    </div>
                    </div>
                    
                    <div className="flex-grow">
                    <div className="flex items-start mb-2">
                        <span className="bg-motorizzazione text-white text-xs font-bold px-2 py-1 rounded-full mr-3 uppercase tracking-wider flex-shrink-0 mt-1">
                        Fase {step.id}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-motorizzazione transition-colors leading-tight">
                        {step.title}
                        </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed">
                        {step.description}
                    </p>
                    
                    {step.note && (
                        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100 text-sm text-blue-900 flex items-start">
                        <span className="font-bold mr-1">Nota:</span> {step.note.replace('Nota:', '')}
                        </div>
                    )}
                    </div>
                </div>
                ))}
            </div>
          </div>

          {/* Right Column: Sticky Image */}
          <div className="hidden lg:block sticky top-24">
              {/* Fix: use responsive height classes instead of fixed arbitrary value */}
              <div className="rounded-3xl overflow-hidden shadow-2xl h-96 lg:h-[600px] relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800" 
                    alt="Vista dal posto di guida" 
                    loading="lazy"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-cinematic"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-motorizzazione/80 via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                      <p className="text-lg font-light opacity-90 mb-2">Il tuo obiettivo è vicino</p>
                      <h3 className="text-3xl font-bold leading-tight">
                          Dalla teoria alla strada,<br/>
                          guidiamo il tuo successo.
                      </h3>
                  </div>
              </div>
          </div>
      </div>
    </section>
  );
};