import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Programme from './components/Programme';

// 1. Importation du système de navigation des stands
import FaculteNavigation from './components/facultes/FaculteNavigation';

// 2. Importation de ton nouveau composant d'assemblage final (Page Unique)
import FacultyDetailPage from './components/page_faculté/FacultePage';

// 3. Importation de la base de données complète des établissements
import facultesData from './data/facultes.json';

export default function App() {
  // État local pour suivre quelle faculté est actuellement affichée en page unique
  const [selectedFaculte, setSelectedFaculte] = useState(null);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col antialiased selection:bg-[#78bec3]/30">
      
      {/* =========================================================
          1. NAVBAR (Reste visible ou masquée selon tes préférences)
         ========================================================= */}
      <Navbar />

      {/* ZONE DE CONTENU DYNAMIQUE */}
      <main className="flex-grow">
        
        {selectedFaculte ? (
          /* =========================================================
              VUE DETRAILLÉE : S'affiche si une faculté est sélectionnée
             ========================================================= */
          <FacultyDetailPage 
            faculte={selectedFaculte} 
            onBack={() => setSelectedFaculte(null)} 
          />
        ) : (
          /* =========================================================
              VUE ACCUEIL : S'affiche par défaut si selectedFaculte est nul
             ========================================================= */
          <>
            {/* 2. HERO SECTION */}
            <section id="home" className="py-12 border-b border-gray-100 bg-slate-50">
              <HeroSection />
            </section>

            {/* 3. SECTION PROGRAMME */}
            <section id="programme" className="py-12 border-b border-gray-100">
              <Programme />
            </section>

            {/* 4. SECTION RECHERCHE & EXPLORATION DES FACULTÉS */}
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
          </>
        )}

      </main>

      {/* =========================================================
          FOOTER FIXE (Reste présent sur tout le site)
         ========================================================= */}
      <footer className="bg-[#1b1464] text-white text-center py-4 text-xs font-bold tracking-wide">
        © 2026 JID — Jeunes Ingénieurs de Djerba | 8ème édition d'Orient'ini
      </footer>

    </div>
  );
}