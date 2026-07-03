import { useState } from 'react';
import SpecialtyCard from './SpecialtyCard';

export default function PresentationFiliere({ faculte }) {
  // Extraction sécurisée des données
  const {
    description_breve = "Aucune description disponible pour le moment.",
    filieres_phares = [],
    regimes_etudes = "",
    debouches = [],
    score_derniere_annee = {}
  } = faculte || {};

  // État local pour le Deep-Dive de la spécialité cliquée
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  const resolveScore = (key, filiereScores, facScores, isNouvelle) => {
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

  // Génération dynamique locale des détails des spécialités phares
  const matchedSpecialties = filieres_phares.map((filiere, idx) => {
    const isObject = typeof filiere === 'object' && filiere !== null;
    const filiereScores = isObject ? filiere.scores : undefined;

    const hasScoresDefined = filiereScores !== undefined;
    const allScoresNull = hasScoresDefined
      ? (!filiereScores ||
        Object.keys(filiereScores).length === 0 ||
        Object.values(filiereScores).every(val => val === null || val === 0 || val === "" || val === undefined))
      : (!score_derniere_annee ||
        Object.keys(score_derniere_annee).length === 0 ||
        Object.values(score_derniere_annee).every(val => val === null || val === 0 || val === "" || val === undefined));

    const isNouvelle = allScoresNull;

    if (isObject) {
      const isPrepa = filiere.concours ||
        faculte?.categories?.includes("Préparatoire") ||
        faculte?.nom_court?.toLowerCase().includes("ipei") ||
        filiere.nom?.includes("MP") || filiere.nom?.includes("PC") || filiere.nom?.includes("PT") || filiere.nom?.includes("BG");

      return {
        id: filiere.id || `filiere_${idx}`,
        nom: filiere.nom || "Spécialité",
        duree: filiere.duree || (regimes_etudes ? regimes_etudes.split(' pour ')[0] || "N/A" : "N/A"),
        description: filiere.description || `Formation de spécialité de premier plan dispensée à ${faculte?.nom_court}.`,
        bac_math: resolveScore('bac_math', filiereScores, score_derniere_annee, isNouvelle),
        bac_sc: resolveScore('bac_sc', filiereScores, score_derniere_annee, isNouvelle),
        bac_info: resolveScore('bac_info', filiereScores, score_derniere_annee, isNouvelle),
        bac_tech: resolveScore('bac_tech', filiereScores, score_derniere_annee, isNouvelle),
        bac_eco: resolveScore('bac_eco', filiereScores, score_derniere_annee, isNouvelle),
        bac_lettres: resolveScore('bac_lettres', filiereScores, score_derniere_annee, isNouvelle),
        bac_let: resolveScore('bac_let', filiereScores, score_derniere_annee, isNouvelle),
        bac_sport: resolveScore('bac_sport', filiereScores, score_derniere_annee, isNouvelle),
        concours: isPrepa,
        isNouvelle: isNouvelle,
        debouches: filiere.debouches || debouches || []
      };
    }

    // Si la filière est une simple chaîne
    const filiereName = filiere || "";
    const isPrepa = faculte?.categories?.includes("Préparatoire") ||
      faculte?.nom_court?.toLowerCase().includes("ipei") ||
      filiereName.includes("MP") || filiereName.includes("PC") || filiereName.includes("PT") || filiereName.includes("BG");

    return {
      id: filiereName.toLowerCase().replace(/[^a-z0-9]/g, '_') || `filiere_${idx}`,
      nom: filiereName,
      duree: regimes_etudes ? regimes_etudes.split(' pour ')[0] || "N/A" : "N/A",
      description: `Formation de spécialité de premier plan en ${filiereName} dispensée à ${faculte?.nom_court || 'cet établissement'}.`,
      bac_math: resolveScore('bac_math', undefined, score_derniere_annee, isNouvelle),
      bac_sc: resolveScore('bac_sc', undefined, score_derniere_annee, isNouvelle),
      bac_info: resolveScore('bac_info', undefined, score_derniere_annee, isNouvelle),
      bac_tech: resolveScore('bac_tech', undefined, score_derniere_annee, isNouvelle),
      bac_eco: resolveScore('bac_eco', undefined, score_derniere_annee, isNouvelle),
      bac_lettres: resolveScore('bac_lettres', undefined, score_derniere_annee, isNouvelle),
      bac_let: resolveScore('bac_let', undefined, score_derniere_annee, isNouvelle),
      bac_sport: resolveScore('bac_sport', undefined, score_derniere_annee, isNouvelle),
      concours: isPrepa,
      isNouvelle: isNouvelle,
      debouches: debouches || []
    };
  });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-8 h-full flex flex-col justify-between">

      {/* Section 1 : Le texte de présentation de la faculté */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
          🔬 Présentation Détaillée
        </h3>
        <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
          {description_breve}
        </p>
      </div>

      {/* Deep-Dive : Grille de mini-cartes de spécialités */}
      {matchedSpecialties.length > 0 && (
        <div className="space-y-4 border-t border-gray-50 pt-6">
          <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
            🌱 Focus Spécialités & Cursus (Cliquer pour le Deep-Dive)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {matchedSpecialties.map((spec) => (
              <SpecialtyCard
                key={spec.id}
                spec={spec}
                onClick={() => setActiveSpecialty(spec)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Section 3 : Régime d'études global */}
      {regimes_etudes && (
        <div className="border-t border-gray-50 pt-6 flex justify-between items-start">
          <div className="w-full">
            <div className="flex items-start gap-4">
              <span className="text-xl md:text-2xl mt-1 shrink-0">⏳</span>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-[#1b1464]">Régime d'études global</h4>
                <p className="text-gray-600 text-xs md:text-sm font-semibold leading-relaxed">
                  {regimes_etudes}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DEEP-DIVE DE SPÉCIALITÉ (AU CLIC DANS LA VUE FACULTE) */}
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

            {/* En-tête : Spécialité */}
            <div className="flex items-center gap-3.5 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#1b1464]/5 border border-[#1b1464]/10 flex items-center justify-center p-2 shrink-0 text-[#1b1464] font-black text-xl">
                🎓
              </div>
              <div className="space-y-0.5">
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="bg-[#de3f6b]/10 text-[#de3f6b] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Cursus de {activeSpecialty.duree}
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
                <p className="text-xs font-semibold text-gray-400">{faculte?.nom_complet}</p>
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
                <h4 className="text-[11px] font-black text-[#1b1464] uppercase tracking-wider">🚀 Débouchés Associés</h4>
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
              {faculte?.site_web && (
                <a
                  href={faculte.site_web}
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