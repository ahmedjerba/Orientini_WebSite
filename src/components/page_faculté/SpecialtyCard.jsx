export default function SpecialtyCard({ spec, onClick }) {
  return (
    <div 
      onClick={onClick}
      className="bg-slate-50/50 hover:bg-slate-50 border border-gray-100 rounded-2xl p-4 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 cursor-pointer h-full overflow-hidden"
    >
      {/* En-tête : Nom + Durée avec alignement propre et gestion du wrap */}
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5">
          <h4 className="font-black text-xs md:text-sm text-[#1b1464] leading-snug break-words max-w-full">
            {spec.nom}
          </h4>
          <span className="shrink-0 bg-[#de3f6b]/10 text-[#de3f6b] text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full text-center leading-normal block sm:inline-block max-w-full break-words">
            {spec.duree}
          </span>
        </div>

        {/* Corps : Description */}
        <p className="text-gray-500 text-[11px] md:text-xs font-semibold leading-relaxed mb-3 break-words">
          {spec.description}
        </p>
      </div>

      {/* Pied de la mini-carte : Score & Débouchés */}
      <div className="space-y-3 pt-3 border-t border-gray-100/60 mt-auto">
        {/* Scores minimums ou Concours */}
        {spec.concours ? (
          <div className="bg-amber-50 border border-amber-200/50 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
            <span className="text-[11px]">🏆</span>
            <span className="text-amber-800 text-[9px] font-black uppercase tracking-wider">
              Accès sur Concours
            </span>
          </div>
        ) : (spec.bac_math || spec.bac_sc || spec.bac_info || spec.bac_tech || spec.bac_eco || spec.bac_lettres || spec.bac_let || spec.bac_sport) ? (
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Seuils requis :</span>
            <div className="flex flex-wrap gap-1">
              {spec.bac_math && (
                <span className="bg-[#1b1464]/5 border border-[#1b1464]/10 text-[#1b1464] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  📊 Math: {spec.bac_math}
                </span>
              )}
              {spec.bac_sc && (
                <span className="bg-[#de3f6b]/5 border border-[#de3f6b]/10 text-[#de3f6b] text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  🧪 Sc: {spec.bac_sc}
                </span>
              )}
              {spec.bac_info && (
                <span className="bg-cyan-50 border border-cyan-150 text-cyan-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  💻 Info: {spec.bac_info}
                </span>
              )}
              {spec.bac_tech && (
                <span className="bg-amber-50 border border-amber-150 text-amber-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  ⚙️ Tech: {spec.bac_tech}
                </span>
              )}
              {spec.bac_eco && (
                <span className="bg-emerald-50 border border-emerald-150 text-emerald-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  📈 Éco: {spec.bac_eco}
                </span>
              )}
              {(spec.bac_lettres || spec.bac_let) && (
                <span className="bg-purple-50 border border-purple-150 text-purple-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  📖 Lettres: {spec.bac_lettres || spec.bac_let}
                </span>
              )}
              {spec.bac_sport && (
                <span className="bg-orange-50 border border-orange-150 text-orange-800 text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  🏃 Sport: {spec.bac_sport}
                </span>
              )}
            </div>
          </div>
        ) : null}

        {/* Débouchés associés */}
        {spec.debouches && spec.debouches.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {spec.debouches.slice(0, 2).map((deb, dIdx) => (
              <span 
                key={dIdx} 
                className="bg-gray-100/75 text-gray-600 text-[9px] font-bold px-2 py-0.5 rounded"
              >
                {deb}
              </span>
            ))}
            {spec.debouches.length > 2 && (
              <span className="text-[9px] font-bold text-gray-400 self-center ml-0.5">
                +{spec.debouches.length - 2}
              </span>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
