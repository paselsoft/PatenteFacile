import React from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { PresentationSection } from './components/PresentationSection';
import { StepsSection } from './components/StepsSection';
import { CostsSection } from './components/CostsSection';
import { DocumentsChecklist } from './components/DocumentsChecklist';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PwaManager } from './components/pwa/PwaManager';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <div className="min-h-screen flex flex-col">
          {/* Gestore Prompt PWA (Installazione & Aggiornamenti) */}
          <PwaManager />

          {/* Skip Link for Accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-4 focus:left-4 bg-motorizzazione text-white px-4 py-2 rounded-lg shadow-lg font-bold transition-transform"
          >
            Salta al contenuto principale
          </a>

          <Navbar />
          
          {/* Add top padding to account for fixed navbar */}
          <div className="pt-16">
            <Header />
            
            <main id="main-content" className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-24 outline-none" tabIndex={-1}>
              <PresentationSection />
              <DocumentsChecklist />
              <StepsSection />
              <CostsSection />
            </main>

            <Footer />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default App;