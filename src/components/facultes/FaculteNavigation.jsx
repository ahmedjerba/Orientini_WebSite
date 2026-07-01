import { useState } from 'react';
import CategoryRow from './CategoryRow';

export default function FaculteNavigation({ data, onCardClick, forceShowAll = false }) {
  const [showAll, setShowAll] = useState(false);

  const rows = {
    medecine: "🩺 Sciences de la Santé & Médecine",
    prepaIntegrees: "🚀 Cycles Préparatoires Intégrés & Architecture",
    prepaClassiques: "📚 Instituts Préparatoires Classiques (IPEI)",
    commerce: "💼 Business, Commerce & Gestion",
    informatique: "💻 Licence d'Informatique",
    iset: "🛠️ Instituts Supérieurs des Études Technologiques (ISET)",
    droit: "⚖️ Facultés des Sciences Juridiques et Politiques (Droit)"
  };

  const medecineFacs = data.filter(fac => fac.filtre === rows.medecine);
  const prepaIntegrees = data.filter(fac => fac.filtre === rows.prepaIntegrees);
  const prepaClassiques = data.filter(fac => fac.filtre === rows.prepaClassiques);
  const commerceFacs = data.filter(fac => fac.filtre === rows.commerce);
  const InfoLicenceFacs = data.filter(fac => fac.filtre === rows.informatique);
  const isetFacs = data.filter(fac => fac.filtre === rows.iset);
  const droitFacs = data.filter(fac => fac.filtre === rows.droit);

  const displayAll = showAll || forceShowAll;

  return (
    <div className="space-y-12">
      {/* LIGNE 1 : LES FACULTÉS DE MÉDECINE */}
      <CategoryRow 
        title={rows.medecine} 
        facultes={medecineFacs} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 2 : LES PRÉPAS INTÉGRÉES */}
      <CategoryRow 
        title={rows.prepaIntegrees} 
        facultes={prepaIntegrees} 
        onCardClick={onCardClick}
      />

      {displayAll ? (
        <>
          {/* LIGNE 3 : LES PRÉPAS CLASSIQUES */}
          <CategoryRow 
            title={rows.prepaClassiques} 
            facultes={prepaClassiques} 
            onCardClick={onCardClick}
          />

          {/* LIGNE 4 : LES ÉCOLES DE COMMERCE & GESTION */}
          <CategoryRow 
            title={rows.commerce} 
            facultes={commerceFacs} 
            onCardClick={onCardClick}
          />

          {/* LIGNE 5 : LES FACULTÉS D'INFORMATIQUE */}
          <CategoryRow 
            title={rows.informatique} 
            facultes={InfoLicenceFacs} 
            onCardClick={onCardClick}
          />

          {/* LIGNE 6 : LES ISET */}
          <CategoryRow 
            title={rows.iset} 
            facultes={isetFacs} 
            onCardClick={onCardClick}
          />

          {/* LIGNE 7 : LE DROIT */}
          <CategoryRow 
            title={rows.droit} 
            facultes={droitFacs} 
            onCardClick={onCardClick}
          />
        </>
      ) : (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border-2 border-gray-200 text-[#1b1464] font-black text-xs px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span>✨ Voir plus d'établissements ({Object.keys(rows).length - 2} catégories supplémentaires)</span>
          </button>
        </div>
      )}
    </div>
  );
}