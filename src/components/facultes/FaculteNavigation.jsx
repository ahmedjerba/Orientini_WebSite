import CategoryRow from './CategoryRow';

export default function FaculteNavigation({ data, onCardClick }) {
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

  return (
    <div className="space-y-12">
      {/* LIGNE 1 : LES FACULTÉS DE MÉDECINE */}
      <CategoryRow 
        title="🩺 Sciences de la Santé & Médecine" 
        facultes={medecineFacs} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 2 : LES PRÉPAS INTÉGRÉES */}
      <CategoryRow 
        title="🚀 Cycles Préparatoires Intégrés & Architecture" 
        facultes={prepaIntegrees} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 3 : LES PRÉPAS CLASSIQUES */}
      <CategoryRow 
        title="📚 Instituts Préparatoires Classiques (IPEI)" 
        facultes={prepaClassiques} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 4 : LES ÉCOLES DE COMMERCE & GESTION */}
      <CategoryRow 
        title="💼 Business, Commerce & Gestion" 
        facultes={commerceFacs} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 5 : LES FACULTÉS D'INFORMATIQUE */}
      <CategoryRow 
        title="💻 Licence d'Informatique" 
        facultes={InfoLicenceFacs} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 6 : LES ISET */}
      <CategoryRow 
        title="🛠️ Instituts Supérieurs des Études Technologiques (ISET)" 
        facultes={isetFacs} 
        onCardClick={onCardClick}
      />
      <CategoryRow 
  title="⚖️ Facultés des Sciences Juridiques et Politiques (Droit)" 
  facultes={droitFacs} 
  onCardClick={onCardClick}
/>
    </div>
  );
}