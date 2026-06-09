export default function DebouchesIntervenant({ faculte }) {
  // Extraction sécurisée des données depuis ton fichier data.json
  const {
    debouches = [],
    temoignage = {}
  } = faculte || {};

  // Extraction des champs de témoignage avec des valeurs de repli (fallbacks)
  const texteDetaille = temoignage?.texte_detaille || "Aucun témoignage disponible pour le moment.";
  const auteurTemoignage = temoignage?.auteur || "Intervenant";

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm space-y-6 h-full">
      
      {/* 1. LES DÉBOUCHÉS */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
          🚀 Débouchés Métiers & Avenir
        </h3>
        
        {debouches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {debouches.map((metier, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-slate-50 border border-gray-100 px-3 py-2 rounded-xl"
              >
                <span className="text-xs">🎯</span>
                <span className="text-gray-600 text-xs font-bold leading-tight">
                  {metier}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-xs italic">
            Les secteurs d'activité seront bientôt listés.
          </p>
        )}
      </div>

      {/* 2. LE MOT DE L'INTERVENANT */}
      <div className="space-y-3 border-t border-gray-50 pt-6">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider flex items-center gap-2">
          💬 Le Mot de l'Intervenant
        </h3>
        
        <div className="relative bg-[#1b1464]/5 border border-[#1b1464]/10 rounded-2xl p-4 md:p-5">
          {/* Guillemet décoratif en fond */}
          <span className="absolute right-4 bottom-2 text-6xl font-serif text-[#1b1464]/10 select-none pointer-events-none">
            ”
          </span>
          
          <p className="text-gray-600 text-xs md:text-sm font-medium italic leading-relaxed relative z-10">
            "{texteDetaille}"
          </p>
          
          {/* Signature unique de l'intervenant avec logo JID */}
          <div className="mt-4 flex items-center gap-3 border-t border-gray-200/50 pt-3 relative z-10">
            {/* Rond bleu contenant le logo JID */}
            <div className="w-8 h-8 bg-[#1b1464] rounded-full flex items-center justify-center p-1.5 shrink-0 shadow-sm">
              <img 
                src="/logo_jid.png" 
                alt="Logo JID" 
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-xs font-black text-[#1b1464] leading-tight">
                {auteurTemoignage}
              </h4>
              <p className="text-[10px] font-bold text-[#de3f6b] uppercase tracking-wider mt-0.5">
                Représentant
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}