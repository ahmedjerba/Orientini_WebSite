import { useEffect, useState, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import facultesData from '../data/facultes.json';

const defaultInitialState = {
  searchQuery: '',
  selectedRegion: 'Toutes',
  selectedCategory: 'Toutes',
  selectedScoreType: 'bac_math',
  minScore: '',
  activeSpecialty: null,
};

export default function AdvancedSearchPage({ onCardClick, onBack, initialState, onStateChange }) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.35, ease: "easeOut" }
    }
  };

  // Etats pour les filtres avancés
  const [searchQuery, setSearchQuery] = useState(initialState?.searchQuery ?? defaultInitialState.searchQuery);
  const [selectedRegion, setSelectedRegion] = useState(initialState?.selectedRegion ?? defaultInitialState.selectedRegion);
  const [selectedCategory, setSelectedCategory] = useState(initialState?.selectedCategory ?? defaultInitialState.selectedCategory);
  const [selectedScoreType, setSelectedScoreType] = useState(initialState?.selectedScoreType ?? defaultInitialState.selectedScoreType);
  const [minScore, setMinScore] = useState(initialState?.minScore ?? defaultInitialState.minScore);

  // Etat pour la spécialité sélectionnée dans le modal / panneau de Deep-Dive
  const [activeSpecialty, setActiveSpecialty] = useState(initialState?.activeSpecialty ?? defaultInitialState.activeSpecialty);

  // Extraction dynamique des villes (régions) uniques
  const regions = useMemo(() => {
    const list = new Set(facultesData.map(fac => fac.ville).filter(Boolean));
    return ["Toutes", "Grand Tunis", ...Array.from(list).sort()];
  }, []);

  // Extraction dynamique des catégories de disciplines
  const categories = useMemo(() => {
    const list = new Set();
    facultesData.forEach(fac => {
      if (fac.categories) {
        fac.categories.forEach(cat => list.add(cat));
      }
    });
    return ["Toutes", ...Array.from(list).sort()];
  }, []);

  // Filtrage avancé multi-critères
  const filteredResults = useMemo(() => {
    return facultesData.filter(fac => {
      // 1. Filtre par Région / Ville
      if (selectedRegion !== "Toutes") {
        if (selectedRegion === "Grand Tunis") {
          const grandTunisVilles = ["Tunis", "Ariana", "Manouba", "Ben Arous"];
          if (!grandTunisVilles.includes(fac.ville)) {
            return false;
          }
        } else if (fac.ville !== selectedRegion) {
          return false;
        }
      }

      // 2. Filtre par Catégorie discipline
      if (selectedCategory !== "Toutes" && !fac.categories?.includes(selectedCategory)) {
        return false;
      }

      // 3. Filtre par Score d'accès (recherche sur les scores de n'importe quelle filière de la fac)
      if (minScore) {
        const threshold = parseFloat(minScore);
        if (!isNaN(threshold)) {
          const hasMatchingScore = fac.filieres_phares?.some(filiere => {
            if (typeof filiere === 'object' && filiere !== null) {
              const scores = filiere.scores || {};
              const score = scores[selectedScoreType] ||
                (selectedScoreType === 'bac_lettres' ? scores.bac_lettres || scores.bac_let : undefined);
              return score !== undefined && score <= threshold;
            }
            return false;
          });
          if (!hasMatchingScore) {
            return false;
          }
        }
      }

      // 4. Recherche textuelle (Insensible à la casse sur nom de fac, spécialités et descriptions)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();

        const matchNomComplet = fac.nom_complet?.toLowerCase().includes(query);
        const matchNomCourt = fac.nom_court?.toLowerCase().includes(query);

        if (matchNomComplet || matchNomCourt) {
          return true;
        }

        const matchSpecialite = fac.filieres_phares?.some(filiere => {
          if (typeof filiere === 'object' && filiere !== null) {
            return filiere.nom?.toLowerCase().includes(query) ||
              filiere.description?.toLowerCase().includes(query);
          }
          return filiere.toLowerCase().includes(query);
        });

        return !!matchSpecialite;
      }

      return true;
    });
  }, [searchQuery, selectedRegion, selectedCategory, selectedScoreType, minScore]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange({
        searchQuery,
        selectedRegion,
        selectedCategory,
        selectedScoreType,
        minScore,
        activeSpecialty,
      });
    }
  }, [searchQuery, selectedRegion, selectedCategory, selectedScoreType, minScore, activeSpecialty, onStateChange]);

  // Handler d'ouverture pour le deep-dive poussé d'une spécialité
  const resolveScore = (key, filiereScores, facScores) => {
    if (filiereScores !== undefined) {
      if (filiereScores && key in filiereScores) {
        const val = filiereScores[key];
        return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
      }
      if (key === 'bac_lettres' && filiereScores && 'bac_let' in filiereScores) {
        const val = filiereScores['bac_let'];
        return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
      }
      if (key === 'bac_let' && filiereScores && 'bac_lettres' in filiereScores) {
        const val = filiereScores['bac_lettres'];
        return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
      }
      return null;
    }
    if (facScores && key in facScores) {
      const val = facScores[key];
      return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
    }
    if (key === 'bac_lettres' && facScores && 'bac_let' in facScores) {
      const val = facScores['bac_let'];
      return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
    }
    if (key === 'bac_let' && facScores && 'bac_lettres' in facScores) {
      const val = facScores['bac_lettres'];
      return (val === null || val === undefined || val === 0 || val === "") ? "-" : val;
    }
    return null;
  };

  // Handler d'ouverture pour le deep-dive poussé d'une spécialité
  const handleOpenSpecialty = (filiere, fac) => {
    const isObject = typeof filiere === 'object' && filiere !== null;
    const filiereScores = isObject ? filiere.scores : undefined;
    const facScores = fac.score_derniere_annee;

    const hasScoresDefined = filiereScores !== undefined;
    const allScoresNull = hasScoresDefined
      ? (!filiereScores ||
        Object.keys(filiereScores).length === 0 ||
        Object.values(filiereScores).every(val => val === null || val === 0 || val === "" || val === undefined))
      : (!facScores ||
        Object.keys(facScores).length === 0 ||
        Object.values(facScores).every(val => val === null || val === 0 || val === "" || val === undefined));

    const isNouvelle = allScoresNull;

    if (isObject) {
      const isPrepa = filiere.concours ||
        fac?.categories?.includes("Préparatoire") ||
        fac?.nom_court?.toLowerCase().includes("ipei") ||
        filiere.nom?.includes("MP") || filiere.nom?.includes("PC") || filiere.nom?.includes("PT") || filiere.nom?.includes("BG");

      setActiveSpecialty({
        id: filiere.id || filiere.nom?.toLowerCase().replace(/[^a-z0-9]/g, '_'),
        nom: filiere.nom || "Spécialité",
        duree: filiere.duree || (fac.regimes_etudes ? fac.regimes_etudes.split(' pour ')[0] || "N/A" : "N/A"),
        description: filiere.description || `Formation de spécialité de premier plan dispensée à ${fac.nom_court}.`,
        bac_math: resolveScore('bac_math', filiereScores, facScores),
        bac_sc: resolveScore('bac_sc', filiereScores, facScores),
        bac_info: resolveScore('bac_info', filiereScores, facScores),
        bac_tech: resolveScore('bac_tech', filiereScores, facScores),
        bac_eco: resolveScore('bac_eco', filiereScores, facScores),
        bac_lettres: resolveScore('bac_lettres', filiereScores, facScores),
        bac_let: resolveScore('bac_let', filiereScores, facScores),
        bac_sport: resolveScore('bac_sport', filiereScores, facScores),
        concours: isPrepa,
        isNouvelle: isNouvelle,
        debouches: filiere.debouches || fac.debouches || [],
        facName: fac.nom_complet,
        facLogo: fac.logo,
        facUrl: fac.site_web
      });
      return;
    }

    const filiereName = filiere || "";
    const isPrepa = fac?.categories?.includes("Préparatoire") ||
      fac?.nom_court?.toLowerCase().includes("ipei") ||
      filiereName.includes("MP") || filiereName.includes("PC") || filiereName.includes("PT") || filiereName.includes("BG");

    setActiveSpecialty({
      id: filiereName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      nom: filiereName,
      duree: fac.regimes_etudes ? fac.regimes_etudes.split(' pour ')[0] || "N/A" : "N/A",
      description: `Formation de spécialité de premier plan en ${filiereName} dispensée à ${fac.nom_court}.`,
      bac_math: resolveScore('bac_math', undefined, facScores, isNouvelle),
      bac_sc: resolveScore('bac_sc', undefined, facScores, isNouvelle),
      bac_info: resolveScore('bac_info', undefined, facScores, isNouvelle),
      bac_tech: resolveScore('bac_tech', undefined, facScores, isNouvelle),
      bac_eco: resolveScore('bac_eco', undefined, facScores, isNouvelle),
      bac_lettres: resolveScore('bac_lettres', undefined, facScores, isNouvelle),
      bac_let: resolveScore('bac_let', undefined, facScores, isNouvelle),
      bac_sport: resolveScore('bac_sport', undefined, facScores, isNouvelle),
      concours: isPrepa,
      isNouvelle: isNouvelle,
      debouches: fac.debouches || [],
      facName: fac.nom_complet,
      facLogo: fac.logo,
      facUrl: fac.site_web
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8 animate-fadeIn">

      {/* En-tête avec bouton retour */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-black text-[#de3f6b] uppercase tracking-wider flex items-center gap-1 hover:underline mb-2"
          >
            ← Retour à l'accueil
          </button>
          <h2 className="text-2xl font-black text-[#1b1464] tracking-tight">
            🔍 Recherche Avancée Multi-critères
          </h2>
          <p className="text-xs font-bold text-gray-400 mt-1">
            Filtrez les établissements tunisiens selon vos préférences, votre score de bac et votre région.
          </p>
        </div>
      </div>

      {/* PANNEAU DE FILTRAGE (Filtres, Score, Région, Catégorie) */}
      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Recherche par mot-clé (Fac, Spécialité...) */}
        <div className="space-y-1.5 col-span-1 md:col-span-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Mot-clé / Spécialité</label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Ex: FMT, Informatique, Générale..."
              className="w-full bg-slate-50 border border-gray-100 rounded-2xl pl-4 pr-10 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 font-bold text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtrer par Ville / Région */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">📍 Ville / Région</label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-4 py-3 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all cursor-pointer"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Filtrer par Discipline / Catégorie */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">🌿 Discipline / Catégorie</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-slate-50 border border-gray-100 rounded-2xl px-4 py-3 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all cursor-pointer"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Filtre par score maximal */}
        <div className="space-y-1.5 col-span-1 md:col-span-2">
          <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">📊 Score Maximal</label>
          <div className="flex gap-2">
            <select
              value={selectedScoreType}
              onChange={(e) => setSelectedScoreType(e.target.value)}
              className="bg-slate-50 border border-gray-100 rounded-2xl px-3 py-3 text-xs font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all cursor-pointer"
            >
              <option value="bac_math">📊 Bac Math</option>
              <option value="bac_sc">🧪 Bac Sciences</option>
              <option value="bac_info">💻 Bac Info</option>
              <option value="bac_tech">⚙️ Bac Technique</option>
              <option value="bac_eco">📈 Bac Éco</option>
              <option value="bac_lettres">📖 Bac Lettres</option>
              <option value="bac_sport">🏃 Bac Sport</option>
            </select>
            <input
              type="number"
              step="0.1"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              placeholder="Ex: 145"
              className="flex-1 bg-slate-50 border border-gray-100 rounded-2xl px-4 py-3 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#de3f6b]/20 focus:border-[#de3f6b] transition-all"
            />
          </div>
        </div>

        {/* Bouton de réinitialisation */}
        <div className="col-span-1 md:col-span-2 flex justify-end">
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedRegion("Toutes");
              setSelectedCategory("Toutes");
              setMinScore("");
            }}
            className="text-xs font-black text-gray-400 hover:text-gray-600 underline"
          >
            Réinitialiser tous les filtres
          </button>
        </div>
      </div>

      {/* RÉSULTATS DE RECHERCHE */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider">
            Établissements correspondants ({filteredResults.length})
          </h3>
        </div>

        {filteredResults.length > 0 ? (
          <motion.div 
            key={`${selectedRegion}-${selectedCategory}-${selectedScoreType}-${minScore}-${searchQuery.length}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredResults.map(fac => (
              <motion.div
                key={fac.id}
                variants={itemVariants}
                onClick={() => onCardClick(fac)}
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Identité Faculté */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center p-1.5 shrink-0">
                      {fac.logo ? (
                        <img 
                          src={fac.logo} 
                          alt={fac.nom_court} 
                          loading="lazy"
                          width="44"
                          height="44"
                          className="w-full h-full object-contain" 
                        />
                      ) : (
                        <span className="text-xs font-black text-[#1b1464]">{fac.nom_court}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-black text-base text-[#1b1464] leading-tight hover:text-[#de3f6b]">
                        {fac.nom_court}
                      </h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">📍 {fac.ville} • {fac.universite}</p>
                    </div>
                  </div>

                  <p className="text-gray-500 text-xs font-medium line-clamp-2 leading-relaxed">
                    {fac.description_breve}
                  </p>

                  {/* Ligne des filières phares interactive (Deep-Dive au clic sur badge) */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block">
                      Spécialités (cliquer pour le deep-dive) :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {fac.filieres_phares?.slice(0, 3).map((filiere, idx) => {
                        const filiereName = typeof filiere === 'object' && filiere !== null ? filiere.nom : filiere;
                        return (
                          <button
                            key={idx}
                            onClick={(e) => {
                              e.stopPropagation(); // Évite d'ouvrir la page de la faculté
                              handleOpenSpecialty(filiere, fac);
                            }}
                            className="bg-slate-50 border border-gray-150 text-[#1b1464] hover:bg-[#de3f6b]/10 hover:text-[#de3f6b] font-extrabold text-[10px] px-2.5 py-1 rounded-xl shadow-inner transition-all"
                          >
                            🔍 {filiereName}
                          </button>
                        );
                      })}
                      {fac.filieres_phares?.length > 3 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onCardClick(fac);
                          }}
                          className="bg-slate-50 border border-dashed border-[#de3f6b] text-[#de3f6b] hover:bg-[#de3f6b] hover:text-white font-extrabold text-[10px] px-2.5 py-1 rounded-xl transition-all"
                        >
                          Voir plus...
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Score & Bouton Fiche */}
                <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-50">
                  <div className="flex gap-2">
                    {fac.score_derniere_annee?.bac_math && (
                      <span className="text-[9px] font-extrabold text-[#1b1464] bg-[#1b1464]/5 px-1.5 py-0.5 rounded">
                        📊 Math: {fac.score_derniere_annee.bac_math}
                      </span>
                    )}
                    {fac.score_derniere_annee?.bac_sc && (
                      <span className="text-[9px] font-extrabold text-[#de3f6b] bg-[#de3f6b]/5 px-1.5 py-0.5 rounded">
                        🧪 Sc: {fac.score_derniere_annee.bac_sc}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-black text-[#de3f6b] uppercase tracking-wider group-hover:underline">
                    Voir la Fiche complète →
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <span className="text-4xl">🔍</span>
            <h4 className="text-sm font-black text-[#1b1464]">Aucun établissement correspondant à vos filtres</h4>
            <p className="text-xs text-gray-400 font-semibold max-w-md mx-auto">
              Ajustez vos filtres de scores minimaux ou changez de discipline pour découvrir de nouvelles opportunités.
            </p>
          </div>
        )}
      </div>

      {/* MODAL DE DEEP-DIVE SPÉCIALITÉ AVANCÉE */}
      {activeSpecialty && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-gray-100 max-w-xl w-full shadow-2xl p-6 md:p-8 space-y-6 relative overflow-hidden animate-scaleIn">

            {/* Bouton fermeture */}
            <button
              onClick={() => setActiveSpecialty(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-lg font-black bg-slate-50 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* En-tête : Spécialité + Fac Origine */}
            <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center p-2 shrink-0">
                <img 
                  src={activeSpecialty.facLogo} 
                  alt={activeSpecialty.facName} 
                  loading="lazy"
                  width="48"
                  height="48"
                  className="w-full h-full object-contain" 
                />
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="bg-[#de3f6b]/10 text-[#de3f6b] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    🎓 Spécialité • {activeSpecialty.duree}
                  </span>
                  {activeSpecialty.isNouvelle && (
                    <span className="bg-emerald-50 border border-emerald-150 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      ✨ Nouvelle filière
                    </span>
                  )}
                </div>
                <h3 className="text-base md:text-lg font-black text-[#1b1464] tracking-tight">
                  {activeSpecialty.nom}
                </h3>
                <p className="text-xs font-semibold text-gray-400">{activeSpecialty.facName}</p>
              </div>
            </div>

            {/* Corps détaillé */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <h4 className="text-[11px] font-black text-[#1b1464] uppercase tracking-wider">🔬 Description du Programme</h4>
                <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
                  {activeSpecialty.description}
                </p>
              </div>

              {/* Admission / Scores */}
              {(activeSpecialty.isNouvelle || activeSpecialty.bac_math || activeSpecialty.bac_sc || activeSpecialty.bac_info || activeSpecialty.bac_tech || activeSpecialty.bac_eco || activeSpecialty.bac_lettres || activeSpecialty.bac_let || activeSpecialty.bac_sport) && (
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-gray-100/50">
                  <h4 className="text-[11px] font-black text-[#1b1464] uppercase tracking-wider">📊 Admission & Sélectivité</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {activeSpecialty.bac_math && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-[#1b1464] flex items-center gap-1">
                        <span>📊</span> Bac Math : {activeSpecialty.bac_math}
                      </span>
                    )}
                    {activeSpecialty.bac_sc && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-[#de3f6b] flex items-center gap-1">
                        <span>🧪</span> Bac Sciences : {activeSpecialty.bac_sc}
                      </span>
                    )}
                    {activeSpecialty.bac_info && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-cyan-800 flex items-center gap-1">
                        <span>💻</span> Bac Info : {activeSpecialty.bac_info}
                      </span>
                    )}
                    {activeSpecialty.bac_tech && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-amber-800 flex items-center gap-1">
                        <span>⚙️</span> Bac Tech : {activeSpecialty.bac_tech}
                      </span>
                    )}
                    {activeSpecialty.bac_eco && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-emerald-800 flex items-center gap-1">
                        <span>📈</span> Bac Éco : {activeSpecialty.bac_eco}
                      </span>
                    )}
                    {(activeSpecialty.bac_lettres || activeSpecialty.bac_let) && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-purple-800 flex items-center gap-1">
                        <span>📖</span> Bac Lettres : {activeSpecialty.bac_lettres || activeSpecialty.bac_let}
                      </span>
                    )}
                    {activeSpecialty.bac_sport && (
                      <span className="bg-white border border-gray-200/60 px-3 py-1.5 rounded-xl text-xs font-black text-orange-800 flex items-center gap-1">
                        <span>🏃</span> Bac Sport : {activeSpecialty.bac_sport}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Débouchés */}
              <div className="space-y-2">
                <h4 className="text-[11px] font-black text-[#1b1464] uppercase tracking-wider">🚀 Débouchés Académiques & Professionnels</h4>
                <div className="flex flex-wrap gap-2">
                  {activeSpecialty.debouches?.map((deb, index) => (
                    <span
                      key={index}
                      className="bg-[#1b1464]/5 border border-[#1b1464]/10 text-[#1b1464] text-xs font-bold px-3 py-1 rounded-xl"
                    >
                      🎯 {deb}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-3 border-t border-gray-100 justify-end">
              <button
                onClick={() => setActiveSpecialty(null)}
                className="bg-slate-100 hover:bg-slate-200 text-gray-700 text-xs font-black px-4 py-2.5 rounded-xl transition-all"
              >
                Fermer
              </button>
              {activeSpecialty.facUrl && (
                <a
                  href={activeSpecialty.facUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#de3f6b] hover:bg-[#c9345e] text-white text-xs font-black px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#de3f6b]/10"
                >
                  Visiter le site officiel
                </a>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
