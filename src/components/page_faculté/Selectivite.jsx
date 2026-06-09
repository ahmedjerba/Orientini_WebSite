export default function Selectivite({ faculte }) {
  // Extraction sécurisée de l'objet score_derniere_annee
  const { score_derniere_annee = {} } = faculte || {};

  // Dictionnaire pour formater proprement les clés du JSON
  const bacConfig = {
    bac_math: { label: "Bac Math", emoji: "📊" },
    bac_sc: { label: "Bac Sciences", emoji: "🧪" },
    bac_info: { label: "Bac Info", emoji: "💻" },
    bac_tech: { label: "Bac Technique", emoji: "⚙️" },
    bac_eco: { label: "Bac Éco", emoji: "📈" },
    bac_let: { label: "Bac Lettres", emoji: "📚" },
    bac_sport: { label: "Bac Sport", emoji: "🏃" }
  };

  // On ne garde que les clés présentes dans score_derniere_annee et définies
  const scoresEntries = Object.keys(bacConfig)
  .filter(key => score_derniere_annee[key] !== undefined && score_derniere_annee[key] !== null && score_derniere_annee[key] !== 0 && score_derniere_annee[key] !== "")
  .map(key => [key, score_derniere_annee[key]]);

  return (
    <div className="bg-[#de3f6b]/5 border-2 border-[#de3f6b]/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm h-full">
      
      {/* En-tête du bloc */}
      <div>
        <span className="text-[9px] font-black text-[#de3f6b] uppercase tracking-widest bg-white border border-[#de3f6b]/20 px-2.5 py-0.5 rounded-md shadow-sm">
          Sélectivité
        </span>
        <h3 className="text-sm font-black text-[#1b1464] mt-3 tracking-tight">
          Scores Minimums Requis
        </h3>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Dernière Année
        </p>
      </div>

      {/* Liste des scores dynamique */}
      <div className="space-y-2.5 my-4">
        {scoresEntries.length > 0 ? (
          scoresEntries.map(([key, value]) => {
            // Récupère la config propre, sinon utilise la clé brute par défaut
            const config = bacConfig[key] || { label: key.replace('_', ' '), emoji: "🎓" };

            return (
              <div 
                key={key} 
                className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm"
              >
                <span className="text-[11px] font-extrabold text-gray-500 uppercase flex items-center gap-1.5">
                  <span>{config.emoji}</span> {config.label}
                </span>
                <span className="text-xs font-black text-[#1b1464] tabular-nums bg-slate-50 px-2 py-1 rounded-md">
                  {value}
                </span>
              </div>
            );
          })
        ) : (
          /* Fallback si aucune clé ou aucun score n'est dispo */
          <p className="text-xs font-bold text-gray-400 italic text-center py-4">
            Aucun score disponible
          </p>
        )}
      </div>

      {/* Note de bas de page explicative */}
      <p className="text-[10px] font-bold text-[#de3f6b]/70 italic leading-tight">
        * Score calculé selon la formule d'orientation de base.
      </p>
      
    </div>
  );
}