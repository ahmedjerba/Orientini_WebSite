import CategoryRow from './CategoryRow';

export default function FaculteNavigation({ data, onCardClick }) {
  // 1. Filtrage automatique pour la section Médecine / Santé
  const medecineFacs = data.filter(fac => fac.categories.includes('Médecine'));

  // 2. Filtrage automatique pour les Prépas Intégrées
  const prepaIntegrees = data.filter(fac => 
    (fac.id === 'insat' || fac.id === 'fst' || fac.id === 'mse')
  );

  // 3. Filtrage automatique pour les Prépas Classiques
  const prepaClassiques = data.filter(fac => 
    fac.categories.includes('Préparatoire') && fac.id !== 'insat'
  );

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
        title="🚀 Cycles Préparatoires Intégrés" 
        facultes={prepaIntegrees} 
        onCardClick={onCardClick}
      />

      {/* LIGNE 3 : LES PRÉPAS CLASSIQUES */}
      <CategoryRow 
        title="📚 Instituts Préparatoires Classiques (IPEI)" 
        facultes={prepaClassiques} 
        onCardClick={onCardClick}
      />
    </div>
  );
}