export default function Selectivite({ faculte }) {
  // Extraction sécurisée de l'objet score depuis la faculté passée en prop
  const { score = {} } = faculte || {};

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

      {/* Liste des scores dynamique depuis le JSON */}
      <div className="space-y-2.5 my-4">
        {/* Ligne Bac Math */}
        <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm">
          <span className="text-[11px] font-extrabold text-gray-500 uppercase">
            📊 Bac Math
          </span>
          <span className="text-xs font-black text-[#1b1464] tabular-nums bg-slate-50 px-2 py-1 rounded-md">
            {score.bac_math || "—"}
          </span>
        </div>

        {/* Ligne Bac Sciences */}
        <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm">
          <span className="text-[11px] font-extrabold text-gray-500 uppercase">
            🧪 Bac Sciences
          </span>
          <span className="text-xs font-black text-[#1b1464] tabular-nums bg-slate-50 px-2 py-1 rounded-md">
            {score.bac_sc || "—"}
          </span>
        </div>

        {/* Ligne Bac Info */}
        <div className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm">
          <span className="text-[11px] font-extrabold text-gray-500 uppercase">
            💻 Bac Info
          </span>
          <span className="text-xs font-black text-[#1b1464] tabular-nums bg-slate-50 px-2 py-1 rounded-md">
            {score.bac_info || "—"}
          </span>
        </div>
      </div>

      {/* Note de bas de page explicative */}
      <p className="text-[10px] font-bold text-[#de3f6b]/70 italic leading-tight">
        * Score calculé selon la formule d'orientation de base.
      </p>
      
    </div>
  );
}