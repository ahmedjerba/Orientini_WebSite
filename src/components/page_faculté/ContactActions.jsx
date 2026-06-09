export default function ContactActions({ faculte }) {
  // Extraction sécurisée des coordonnées et des liens depuis data.json
  const {
    adresse = "Adresse non communiquée",
    telephone = "—",
    site_web = "#",
    stand_id = "M03" // Utilisé pour personnaliser le message du chat
  } = faculte || {};

  const handleLiveChat = () => {
    // Logique pour ouvrir le chat avec l'intervenant du stand
    console.log(`Ouverture du chat pour le stand ${stand_id}`);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between gap-5 h-full">
      
      {/* 1. COORDONNÉES TEXTUELLES */}
      <div className="space-y-3">
        <h3 className="text-sm font-black text-[#1b1464] uppercase tracking-wider border-l-2 border-[#1b1464] pl-2">
          Coordonnées & Accès
        </h3>
        <div className="text-xs font-medium text-gray-500 space-y-2">
          <p className="flex items-start gap-1.5">
            <span className="shrink-0">📍</span> 
            <span><span className="font-bold text-gray-700">Adresse :</span> {adresse}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <span>📞</span> 
            <span><span className="font-bold text-gray-700">Téléphone :</span> {telephone}</span>
          </p>
        </div>
      </div>

      {/* 2. ZONE MAPS VISUELLE */}
      <div className="w-full h-28 bg-slate-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center p-4 text-center shadow-inner group relative overflow-hidden">
        {/* Arrière-plan stylisé simulant une grille de carte */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1b1464_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative z-10 space-y-1">
          <span className="text-xl animate-bounce inline-block">🗺️</span>
          <h4 className="text-[11px] font-black text-[#1b1464] tracking-tight">Localiser l'Établissement</h4>
          <p className="text-[10px] font-bold text-gray-400">Consulter l'emplacement sur Google Maps</p>
        </div>
        
        {/* Lien invisible étendu sur tout le bloc pour rediriger proprement vers Maps */}
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(adresse)}`}
          target="_blank"
          rel="noreferrer"
          className="absolute inset-0 z-20 cursor-pointer"
          aria-label="Voir l'adresse sur Google Maps"
        />
      </div>

      {/* 3. BOUTONS D'ACTION (FLEX/GRID) */}
      <div className="space-y-2 pt-2 border-t border-gray-50">
        {/* Bouton Live Chat (Pourpre / Rose) */}
        <button 
          onClick={handleLiveChat}
          className="w-full bg-[#de3f6b] hover:bg-[#de3f6b]/95 text-white text-center text-xs font-black py-3 rounded-xl shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>💬</span> Discuter en Live
        </button>

        {/* Bouton Site Web Officiel (Bleu Profond) */}
        <a 
          href={site_web} 
          target="_blank" 
          rel="noreferrer"
          className="w-full bg-[#1b1464] hover:bg-[#1b1464]/95 text-center text-xs font-black text-white py-3 rounded-xl shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>🌐</span> Visiter le Site Web
        </a>
      </div>

    </div>
  );
}