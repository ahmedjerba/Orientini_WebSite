export default function PresentationFiliere({ faculte }) {
  // Extraction sécurisée de la description et du tableau des filières
  const {
    description = "Aucune description disponible pour le moment.",
    filieres = []
  } = faculte || {};

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 h-full">
      
      {/* Section 1 : Le texte de présentation de la faculté */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
          🔬 Présentation Détaillée
        </h3>
        <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
          {description}
        </p>
      </div>

      {/* Section 2 : Les tags des filières disponibles (si présents dans le JSON) */}
      {filieres.length > 0 && (
        <div className="space-y-3 border-t border-gray-50 pt-6">
          <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
            🌿 Filières & Spécialités
          </h3>
          <div className="flex flex-wrap gap-2">
            {filieres.map((filiere, idx) => (
              <span 
                key={idx} 
                className="bg-slate-50 border border-gray-100 text-[#1b1464] font-extrabold text-[11px] px-3 py-1.5 rounded-xl shadow-inner transition-colors hover:bg-slate-100"
              >
                {filiere}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}