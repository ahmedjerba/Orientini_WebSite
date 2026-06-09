export default function PresentationFiliere({ faculte }) {
  // Extraction sécurisée des données
  const {
    description_breve = "Aucune description disponible pour le moment.",
    filieres_phares = [],
    regimes_etudes = ""
  } = faculte || {};

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 h-full flex flex-col justify-between">
      
      {/* Section 1 : Le texte de présentation de la faculté */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
          🔬 Présentation Détaillée
        </h3>
        <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed">
          {description_breve}
        </p>
      </div>

      {/* Section 2 : Filières & Régime d'études côte à côte */}
      {(filieres_phares.length > 0 || regimes_etudes) && (
        <div className="border-t border-gray-50 pt-6 flex flex-col md:flex-row gap-6 md:gap-12 justify-between items-start">
          
          {/* Bloc Gauche : Badges des filières */}
          {filieres_phares.length > 0 && (
            <div className="space-y-3 flex-1">
              <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
                🌿 Filières & Spécialités
              </h3>
              <div className="flex flex-wrap gap-2">
                {filieres_phares.map((filiere, idx) => (
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

          {/* Bloc Droite : Régime d'études avec design "Léger" */}
          {regimes_etudes && (
            <div className="w-full md:w-auto md:max-w-[280px] shrink-0 md:border-l md:border-gray-50 md:pl-8">
              <div className="flex items-start gap-4">
                {/* Icône décalée sur le côté */}
                <span className="text-xl md:text-2xl mt-1 shrink-0">⏳</span>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1b1464]">Régime d'études</h4>
                  <p className="text-gray-600 text-xs md:text-sm font-semibold leading-relaxed">
                    {regimes_etudes}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}