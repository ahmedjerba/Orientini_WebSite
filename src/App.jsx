import { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Programme from './components/Programme';

// 1. Importation du système de navigation des stands
import FaculteNavigation from './components/facultes/FaculteNavigation';

// 2. Importation de ton nouveau composant d'assemblage final (Page Unique)
import FacultyDetailPage from './components/page_faculté/FacultePage';

// 3. Importation de la recherche avancée
import AdvancedSearchPage from './components/AdvancedSearchPage';

// 4. Importation de la base de données complète des établissements
import facultesData from './data/facultes.json';

export default function App() {
  // Mode d'affichage de l'application : 'home' | 'search' | 'detail'
  const [viewMode, setViewMode] = useState('home');
  const [selectedFaculte, setSelectedFaculte] = useState(null);

  // LOGIQUE DE FILTRAGE & RECHERCHE DE BASE (Sur l'accueil)
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  // Options de filtres uniques extraites dynamiquement
  const filterOptions = useMemo(() => {
    const filters = new Set(facultesData.map(fac => fac.filtre).filter(Boolean));
    return ["Tous", ...Array.from(filters)];
  }, []);

  // Filtrage hybride des facultés (nom, nom court, et spécialités reliées)
  const filteredFacultes = useMemo(() => {
    return facultesData.filter(fac => {
      if (selectedFilter !== "Tous" && fac.filtre !== selectedFilter) {
        return false;
      }
      if (!searchQuery.trim()) {
        return true;
      }
      const query = searchQuery.toLowerCase().trim();
      const matchNomComplet = fac.nom_complet?.toLowerCase().includes(query);
      const matchNomCourt = fac.nom_court?.toLowerCase().includes(query);
      
      if (matchNomComplet || matchNomCourt) {
        return true;
      }

      const matchSpecialite = fac.filieres_phares?.some(filiere => {
        return filiere.toLowerCase().includes(query);
      });

      return !!matchSpecialite;
    });
  }, [searchQuery, selectedFilter]);

  // Handlers de navigation
  const handleGoToDetail = (fac) => {
    setSelectedFaculte(fac);
    setViewMode('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    setSelectedFaculte(null);
    setViewMode('home');
  };

  const handleGoToSearch = () => {
    setViewMode('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col antialiased selection:bg-[#78bec3]/30">
      
      {/* =========================================================
          1. NAVBAR (Gère maintenant le retour d'état)
         ========================================================= */}
      <Navbar onHomeClick={handleGoHome} onSearchClick={handleGoToSearch} />

      {/* ZONE DE CONTENU DYNAMIQUE (ROUTAGE) */}
      <main className="flex-grow">
        
        {viewMode === 'detail' && selectedFaculte && (
          /* Vue détaillée */
          <FacultyDetailPage 
            faculte={selectedFaculte} 
            onBack={handleGoHome} 
          />
        )}

        {viewMode === 'search' && (
          /* Vue recherche avancée */
          <AdvancedSearchPage 
            onCardClick={handleGoToDetail} 
            onBack={handleGoHome}
          />
        )}

        {viewMode === 'home' && (
          /* Vue d'accueil par défaut */
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
                <div className="border-b border-gray-200/60 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-black text-[#1b1464] tracking-tight">
                      🎓 Explorez les Établissements par Cursus
                    </h2>
                    <p className="text-xs text-gray-400 font-bold mt-1">
                      Faites défiler horizontalement pour découvrir les filières et cliquez sur une carte pour ouvrir sa fiche complète.
                    </p>
                  </div>

                  {/* BARRE DE RECHERCHE RAPIDE */}
                  <div className="relative w-full md:w-80">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Rechercher une fac, prépa..."
                      className="w-full bg-white border border-gray-200/80 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-semibold text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all shadow-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 text-xs font-bold"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>

                {/* FILTRES DÉFILABLES */}
                <div className="overflow-x-auto whitespace-nowrap pb-2 -mx-6 px-6 scrollbar-hide flex gap-2">
                  {filterOptions.map((filter) => {
                    const isActive = selectedFilter === filter;
                    return (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`inline-block px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all ${
                          isActive
                            ? 'bg-[#de3f6b] text-white shadow-md shadow-[#de3f6b]/20'
                            : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation par carrousels */}
                {filteredFacultes.length > 0 ? (
                  <FaculteNavigation 
                    data={filteredFacultes} 
                    onCardClick={handleGoToDetail} 
                  />
                ) : (
                  <div className="text-center py-12 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
                    <span className="text-3xl">🔍</span>
                    <h3 className="text-sm font-black text-[#1b1464]">Aucun établissement trouvé</h3>
                    <p className="text-xs text-gray-400 font-semibold max-w-md mx-auto">
                      Nous n'avons pas trouvé de résultats. Essayez d'utiliser la recherche avancée par score ou par région.
                    </p>
                    <button
                      onClick={handleGoToSearch}
                      className="text-xs font-black text-white bg-[#de3f6b] px-4 py-2 rounded-xl mt-2 inline-block shadow-sm"
                    >
                      Aller à la recherche avancée 🚀
                    </button>
                  </div>
                )}

              </div>
            </section>
          </>
        )}

      </main>

      {/* =========================================================
          FOOTER FIXE
         ========================================================= */}
      <footer className="bg-[#1b1464] text-white text-center py-4 text-xs font-bold tracking-wide">
        © 2026 JID — Jeunes Ingénieurs de Djerba | 8ème édition d'Orient'ini
      </footer>

    </div>
  );
}