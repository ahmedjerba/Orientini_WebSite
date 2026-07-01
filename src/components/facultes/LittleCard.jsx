export default function LittleCard({ fac, onClick }) {
  const bacConfig = {
    bac_math: { label: "Bac Math", emoji: "📊" },
    bac_sc: { label: "Bac Sciences", emoji: "🧪" },
    bac_info: { label: "Bac Info", emoji: "💻" },
    bac_tech: { label: "Bac Technique", emoji: "⚙️" },
    bac_eco: { label: "Bac Éco", emoji: "📈" },
    bac_let: { label: "Bac Lettres", emoji: "📚" },
    bac_sport: { label: "Bac Sport", emoji: "🏃" }
  };
  return (
    <div 
      onClick={onClick}
      // ICI : w-full uniquement ! C'est le parent (le carrousel) qui décide de la taille réelle.
      className="w-full bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden flex flex-col justify-between"
    >
      {/* Tout le reste de ton code à l'intérieur reste STRICTEMENT le même */}

      {/* BLOC SUPÉRIEUR : LOGO + IDENTITÉ */}
      <div>
        <div className="flex items-center gap-4 pr-12">
          {/* Container du Logo de la Fac */}
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center p-2 shrink-0 group-hover:bg-white group-hover:border-pourpre/20 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            {fac.logo ? (
              <img 
                src={fac.logo} 
                alt={`${fac.nom_court} logo`} 
                className="w-full h-full object-contain"
              />
            ) : (
              // Fallback textuel élégant si le logo n'est pas encore chargé
              <span className="text-sm font-black text-pourpre">
                {fac.nom_court.substring(0, 2)}
              </span>
            )}
          </div>

          {/* Titre et Ville */}
          <div className="space-y-0.5"> 
            <h4 className="font-black text-lg text-bleu tracking-tight group-hover:text-pourpre transition-colors duration-300 leading-tight">
              {fac.nom_court}
            </h4>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">
              📍 {fac.ville}
            </p>
          </div>
        </div>

        {/* Description très brève */}
        <p className="text-gray-500 text-xs font-medium mt-4 line-clamp-2 leading-relaxed">
          {fac.description_breve}
        </p>

        {/* Tags des filières phares */}
        <div className="flex flex-wrap gap-1 mt-4">
          {fac.filieres_phares.slice(0, 2).map((filiere, idx) => {
            const filiereName = typeof filiere === 'object' && filiere !== null ? filiere.nom : filiere;
            const shortName = filiereName ? filiereName.split(' ')[0] : "Spécialité";
            return (
              <span 
                key={idx} 
                className="bg-cyan/5 text-cyan text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-cyan/10"
              >
                {shortName}
              </span>
            );
          })}
          {fac.filieres_phares.length > 2 && (
            <span className="text-[10px] font-bold text-gray-300 px-1.5 py-0.5">
              +{fac.filieres_phares.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* PIED DE LA CARTE : SECTIONS ADMISSIBLES */}
<div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-50">
  <span className="text-[11px] font-bold text-gray-400">
    Bacs acceptés
  </span>
  
  {/* PIED DE LA CARTE : SECTIONS ADMISSIBLES */}
<div className="pt-3 mt-4 border-t border-gray-50 flex items-center justify-end">
  <div className="flex flex-wrap items-center gap-1">
    {Object.keys(fac.score_derniere_annee || {})
      .filter((cle) => fac.score_derniere_annee[cle] > 0)
      .map((cle) => {
        const config = bacConfig[cle] || { label: cle, emoji: "🎓" };

        return (
          <span 
            key={cle}
            className="text-[9px] font-black text-[#1b1464] bg-slate-50 border border-gray-100/70 px-1.5 py-0 rounded-md flex items-center gap-0.5 transition-all duration-300 group-hover:bg-[#1b1464]/5 group-hover:border-[#1b1464]/10"
          >
            <span className="text-[10px]">{config.emoji}</span>
            <span>{config.label}</span>
          </span>
        );
      })}
  </div>
</div>
</div>

    </div>
  );
}