import React from 'react';
import { Navbar } from './components/Navbar';
import { Header } from './components/Header';
import { PresentationSection } from './components/PresentationSection';
import { StepsSection } from './components/StepsSection';
import { CostsSection } from './components/CostsSection';
import { DocumentsChecklist } from './components/DocumentsChecklist';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-16">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-24">
          <PresentationSection />
          <DocumentsChecklist />
          <StepsSection />
          <CostsSection />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;