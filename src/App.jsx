import { useEffect, useMemo, useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Programme from './components/Programme';
import IntroLoader from './components/IntroLoader';
import RouteLoader from './components/RouteLoader';

// 1. Importation du système de navigation des stands
import FaculteNavigation from './components/facultes/FaculteNavigation';

// 2. Importation de la recherche et détails avec Lazy Loading
const FacultyDetailPage = lazy(() => import('./components/page_faculté/FacultePage'));
const AdvancedSearchPage = lazy(() => import('./components/AdvancedSearchPage'));

import Sponsors from './components/Sponsors';

// 4. Importation de la base de données complète des établissements
import facultesData from './data/facultes.json';
import { getCategoryColor, getContrastText } from './data/categoryColors';

const defaultSearchPageState = {
  searchQuery: '',
  selectedRegion: 'Toutes',
  selectedCategory: 'Toutes',
  selectedScoreType: 'bac_math',
  minScore: '',
  activeSpecialty: null,
};

const defaultHomeState = {
  searchQuery: '',
  selectedFilter: 'Tous',
};

// Wrapper pour la résolution automatique de la faculté via l'ID de l'URL
function FacultePageWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();

  const faculte = useMemo(() => {
    return facultesData.find((fac) => fac.id === id) || null;
  }, [id]);

  const handleBack = () => {
    navigate('/');
  };

  return (
    <FacultyDetailPage
      faculte={faculte}
      onBack={handleBack}
    />
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const navigate = useNavigate();
  const location = useLocation();

  // LOGIQUE DE FILTRAGE & RECHERCHE DE BASE (Sur l'accueil)
  const [searchQuery, setSearchQuery] = useState(defaultHomeState.searchQuery);
  const [selectedFilter, setSelectedFilter] = useState(defaultHomeState.selectedFilter);

  // Etat conservé pour la recherche avancée
  const [searchPageState, setSearchPageState] = useState(defaultSearchPageState);

  // Options de filtres uniques extraites dynamiquement
  const filterOptions = useMemo(() => {
    const filters = new Set(facultesData.map(fac => fac.filtre).filter(Boolean));
    return ["Tous", ...Array.from(filters)];
  }, []);

  const handleSearchPageStateChange = (nextState) => {
    setSearchPageState((currentState) => {
      const mergedState = {
        ...defaultSearchPageState,
        ...currentState,
        ...nextState,
      };

      const isSame = Object.keys(defaultSearchPageState).every((key) => currentState?.[key] === mergedState[key]);
      return isSame ? currentState : mergedState;
    });
  };

  // Filtrage hybride des facultés
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
        const filiereName = typeof filiere === 'object' && filiere !== null ? filiere.nom : filiere;
        return filiereName?.toLowerCase().includes(query);
      });

      return !!matchSpecialite;
    });
  }, [searchQuery, selectedFilter]);

  // Gestion du scroll-to-section sur navigation ou hash change
  useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash === '#programme') {
        setTimeout(() => {
          document.getElementById('programme')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else if (location.hash === '#facultes') {
        setTimeout(() => {
          document.getElementById('facultes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      } else if (location.hash === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!location.hash) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location.pathname, location.hash]);

  // Handlers de navigation pour Navbar
  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoToProgramme = () => {
    navigate('/#programme');
  };

  const handleGoToSearch = () => {
    navigate('/recherche');
  };

  const handleGoToDetail = (fac) => {
    navigate(`/faculte/${fac.id}`);
  };

  return (
    <IntroLoader>
      <div className="min-h-screen bg-white text-gray-900 flex flex-col antialiased selection:bg-[#78bec3]/30">
        {/* Barre de Progression de Scroll */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#de3f6b] to-[#78bec3] z-[100]"
          style={{ scaleX, transformOrigin: "0%" }}
        />

        {/* NAVBAR */}
        <Navbar
          onHomeClick={handleGoHome}
          onProgrammeClick={handleGoToProgramme}
          onSearchClick={handleGoToSearch}
        />

        {/* ZONE DE CONTENU DYNAMIQUE (ROUTAGE) */}
        <main className="flex-grow relative overflow-hidden">
          <Suspense fallback={<RouteLoader />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* 1. Page d'accueil */}
                <Route path="/" element={
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    {/* HERO SECTION */}
                    <section id="home" className="py-12 border-b border-gray-100 bg-slate-50">
                      <HeroSection />
                    </section>

                    {/* SECTION PROGRAMME */}
                    <section id="programme" className="py-12 border-b border-gray-100">
                      <Programme />
                    </section>

                    {/* SECTION EXPLORATION DES FACULTÉS */}
                    <section id="facultes" className="py-16 bg-slate-50 overflow-hidden">
                      <div className="max-w-7xl mx-auto px-6 space-y-8">
                        <div className="border-b border-gray-200/60 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <h2 className="text-2xl font-black text-[#1b1464] tracking-tight">
                              🎓 Explorez les Établissements par Cursus
                            </h2>
                            <p className="text-xs text-gray-400 font-bold mt-1">
                              Faites défiler horizontalement pour découvrir les filières et cliquez sur une carte pour ouvrir sa fiche complète.
                            </p>
                          </div>

                          {/* BARRE DE RECHERCHE RAPIDE & CTA RECHERCHE AVANCÉE */}
                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
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

                            <button
                              onClick={handleGoToSearch}
                              className="flex items-center justify-center gap-2 bg-[#f5d203]/20 hover:bg-[#f5d203]/30 text-[#1b1464] border border-[#f5d203]/40 px-4 py-2.5 rounded-2xl text-xs font-black transition-all hover:scale-[1.02] active:scale-95 shadow-sm"
                            >
                              🔍 Trouver une Fac (Recherche Avancée)
                            </button>
                          </div>
                        </div>

                        {/* FILTRES DÉFILABLES */}
                        <div className="overflow-x-auto whitespace-nowrap pb-2 -mx-6 px-6 scrollbar-hide flex gap-2">
                          {filterOptions.map((filter) => {
                            const isActive = selectedFilter === filter;
                            const catColor = filter === 'Tous' ? '#de3f6b' : getCategoryColor(filter);
                            const textColor = getContrastText(catColor);
                            return (
                              <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                style={isActive ? { backgroundColor: catColor, color: textColor } : {}}
                                className={`inline-block px-4 py-2 rounded-xl text-xs font-black tracking-wide transition-all ${isActive
                                  ? 'shadow-md shadow-slate-200/50'
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

                    {/* SECTION SPONSORS */}
                    <Sponsors />
                  </motion.div>
                } />

                {/* 2. Recherche avancée */}
                <Route path="/recherche" element={
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <AdvancedSearchPage
                      onCardClick={handleGoToDetail}
                      onBack={handleGoHome}
                      initialState={searchPageState}
                      onStateChange={handleSearchPageStateChange}
                    />
                  </motion.div>
                } />

                {/* 3. Fiche faculté */}
                <Route path="/faculte/:id" element={
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <FacultePageWrapper />
                  </motion.div>
                } />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </main>

        {/* FOOTER */}
        <footer className="bg-[#1b1464] text-white text-center py-4 text-xs font-bold tracking-wide">
          © 2026 JID — Jeunes Ingénieurs de Djerba | 8ème édition d'Orient'ini
        </footer>
      </div>
    </IntroLoader>
  );
}