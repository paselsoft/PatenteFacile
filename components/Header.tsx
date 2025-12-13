import React from 'react';
import { Car } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-motorizzazione text-white pb-12 pt-16 rounded-b-[3rem] shadow-xl relative overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                <Car className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
                Patente Facile
            </h1>
            <p className="text-xl sm:text-2xl font-light text-blue-100 max-w-2xl mx-auto leading-relaxed">
                La guida completa e semplificata per il conseguimento della patente di guida in Italia.
            </p>
        </div>
    </header>
  );
};