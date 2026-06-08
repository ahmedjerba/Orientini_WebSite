import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

// 1. Importation des nouveaux composants modulaires
import FaculteNavigation from './components/facultes/FaculteNavigation';


// 2. Importation de la base de données complète des 11 établissements
import facultesData from './data/facultes.json';

export default function App() {
  // État local pour suivre quelle faculté doit s'ouvrir dans le Pop-up (Modal)
  const [selectedFaculte, setSelectedFaculte] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col antialiased selection:bg-[#78bec3]/30">
      
      {/* =========================================================
          1. NAVBAR 
         ========================================================= */}
      <Navbar />

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main className="flex-grow">
        
        {/* =========================================================
            2. HERO SECTION (Accueil)
           ========================================================= */}
        <section id="home" className="py-12 border-b border-gray-100 bg-slate-50">
          <HeroSection />
        </section>

        {/* =========================================================
            3. SECTION PROGRAMME (PREPA / BAC)
           ========================================================= */}
        <section id="programme" className="py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xs font-bold text-[#de3f6b] uppercase tracking-wider mb-2">Zone de Test :</h2>
            
            <div className="p-8 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 font-medium">
              [ 📅 Le composant <span className="text-[#1b1464] font-bold">Programme.jsx</span> s'affichera ici ]
            </div>
          </div>
        </section>

        {/* =========================================================
            4. SECTION RECHERCHE & EXPLORATION DES FACULTÉS
           ========================================================= */}
        <section id="facultes" className="py-16 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 space-y-8">
            
            {/* En-tête de la section d'orientation */}
            <div className="border-b border-gray-200/60 pb-4">
              <h2 className="text-2xl font-black text-[#1b1464] tracking-tight">
                🎓 Explorez les Établissements par Cursus
              </h2>
              <p className="text-xs text-gray-400 font-bold mt-1">
                Faites défiler horizontalement pour découvrir les filières et cliquez sur une carte pour ouvrir sa fiche complète.
              </p>
            </div>

            {/* Injection du système de navigation par carousels thématiques */}
            <FaculteNavigation 
              data={facultesData} 
              onCardClick={(fac) => setSelectedFaculte(fac)} 
            />

          </div>
        </section>

      </main>

      {/* =========================================================
          FENÊTRE MODALE (POP-UP DETAILED CARD)
          S'affiche au-dessus du site uniquement si selectedFaculte n'est pas nul
         ========================================================= */}
      

      {/* FOOTER FIXE */}
      <footer className="bg-[#1b1464] text-white text-center py-4 text-xs font-bold tracking-wide">
        © 2026 JID — Jeunes Ingénieurs de Djerba | 8ème édition d'Orient'ini
      </footer>

    </div>
  );
}