import { useState } from 'react';
import CategoryRow from './CategoryRow';

export default function FaculteNavigation({ data, onCardClick, forceShowAll = false }) {
  const [showAll, setShowAll] = useState(false);

  const categoriesList = [
    { key: "medecine", label: "Médecine, Pharmacie & Médecine Dentaire", displayLabel: "🩺 Médecine, Pharmacie & Médecine Dentaire" },
    { key: "prepaIntegrees", label: "Cycles Préparatoires Intégrés", displayLabel: "🚀 Cycles Préparatoires Intégrés" },
    { key: "informatique", label: "Informatique & Réseaux", displayLabel: "💻 Informatique & Réseaux" },
    { key: "commerce", label: "Business, Commerce, Finance & Gestion", displayLabel: "💼 Business, Commerce, Finance & Gestion" },
    { key: "paramedical", label: "Paramédical & Sciences Infirmières", displayLabel: "🏥 Paramédical & Sciences Infirmières" },
    { key: "prepaClassiques", label: "Classes Préparatoires Classiques", displayLabel: "📚 Classes Préparatoires Classiques" },
    { key: "architecture", label: "Architecture", displayLabel: "🏛️ Architecture" },
    { key: "sciences", label: "Sciences Fondamentales & Biotechnologie", displayLabel: "🔬 Sciences Fondamentales & Biotechnologie" },
    { key: "genie", label: "Génie & Technologies Appliquées", displayLabel: "🛠️ Génie & Technologies Appliquées" },
    { key: "droit", label: "Droit & Sciences Politiques", displayLabel: "⚖️ Droit & Sciences Politiques" },
    { key: "lettres", label: "Lettres, Langues & Sciences Humaines", displayLabel: "✍️ Lettres, Langues & Sciences Humaines" },
    { key: "arts", label: "Arts, Design & Multimédia", displayLabel: "🎨 Arts, Design & Multimédia" },
    { key: "sport", label: "Sport & Éducation Physique", displayLabel: "🏃 Sport & Éducation Physique" }
  ];

  const displayAll = showAll || forceShowAll;
  const initialVisibleCount = 4;
  const visibleCategories = displayAll ? categoriesList : categoriesList.slice(0, initialVisibleCount);

  return (
    <div className="space-y-12">
      {visibleCategories.map(cat => {
        const filteredFacs = data.filter(fac => fac.tags && fac.tags.includes(cat.label));
        return (
          <CategoryRow
            key={cat.key}
            title={cat.displayLabel}
            facultes={filteredFacs}
            onCardClick={onCardClick}
          />
        );
      })}

      {!displayAll && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 border-2 border-gray-200 text-[#1b1464] font-black text-xs px-6 py-3.5 rounded-2xl shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            <span>✨ Voir plus d'établissements ({categoriesList.length - initialVisibleCount} catégories supplémentaires)</span>
          </button>
        </div>
      )}
    </div>
  );
}