import CategoryRow from './CategoryRow';

export default function FaculteNavigation({ data, onCardClick }) {
  // 1. Filtrage automatique pour la section Médecine / Santé
  const medecineFacs = data.filter(fac => fac.categories.includes('Médecine'));

  // 2. Filtrage automatique pour les Prépas Intégrées (On garde ton filtrage par ID)
  const prepaIntegrees = data.filter(fac => 
    (fac.id === 'insat' || fac.id === 'fst' || fac.id === 'mse' || fac.id === 'hide_tunis' || fac.id === 'issat_sousse' || fac.id === 'enau') 
  );

  // 3. Filtrage automatique pour les Prépas Classiques
  const prepaClassiques = data.filter(fac => 
    fac.categories.includes('Préparatoire') && fac.id !== 'insat'
  );

  // 4. Filtrage automatique pour les Écoles de Commerce & Gestion (En excluant les ISET)
  const commerceFacs = data.filter(fac => 
    (fac.categories.includes('Commerce') || fac.categories.includes('Gestion')) && !fac.id.startsWith('iset_')
  );

  // 5. Filtrage automatique pour les Facultés d'Informatique (En excluant les ISET)
  const InfoLicenceFacs = data.filter(fac => 
    fac.categories.includes('Informatique') && !fac.id.startsWith('iset_')
  );

  // 6. NOUVEAU : Filtrage automatique pour les ISET (Radès, Nabeul, Sfax, etc.)
  const isetFacs = data.filter(fac => fac.id.startsWith('iset_'));

  const droitFacs = data.filter(fac => fac.categories.includes('Droit Privé') || fac.categories.includes('Droit Public'));

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