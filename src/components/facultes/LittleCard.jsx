export default function LittleCard({ fac, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="w-full md:w-[calc(33.333%-16px)] shrink-0 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 ease-out cursor-pointer group relative overflow-hidden flex flex-col justify-between"
    >
      {/* Badge de l'emplacement au salon (en haut à droite) */}
      <div className="absolute top-4 right-4 bg-slate-50 border border-gray-100 text-[10px] font-black text-gray-400 px-2 py-0.5 rounded-md uppercase tracking-wider group-hover:bg-pourpre/10 group-hover:text-pourpre group-hover:border-pourpre/10 transition-colors">
        {fac.emplacement_salon}
      </div>

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
          {fac.filieres_phares.slice(0, 2).map((filiere, idx) => (
            <span 
              key={idx} 
              className="bg-cyan/5 text-cyan text-[10px] font-extrabold px-2.5 py-0.5 rounded-md border border-cyan/10"
            >
              {filiere.split(' ')[0]}
            </span>
          ))}
          {fac.filieres_phares.length > 2 && (
            <span className="text-[10px] font-bold text-gray-300 px-1.5 py-0.5">
              +{fac.filieres_phares.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* PIED DE LA CARTE : SCORE */}
      <div className="flex items-center justify-between pt-4 mt-5 border-t border-gray-50">
        <span className="text-[11px] font-bold text-gray-400">
          Score Min (Math)
        </span>
        <span className="text-xs font-black text-bleu bg-slate-50 px-2.5 py-1 rounded-lg group-hover:bg-[#f5d203]/20 group-hover:text-bleu transition-colors duration-300 tabular-nums">
          {fac.score_derniere_annee.bac_math}
        </span>
      </div>

    </div>
  );
}