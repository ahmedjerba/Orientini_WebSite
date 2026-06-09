export default function HeroBanner({ faculte, onBack }) {
  // Extraction sécurisée des données du JSON avec valeurs par défaut
  const {
    logo = "Établissement",
    nom_complet = "Nom complet de la faculté",
    ville = "Tunisie",
    emplacement_salon = "STAND --",
    image_banner = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80"
  } = faculte || {};

  return (
    <div 
      className="relative h-64 md:h-72 w-full rounded-3xl overflow-hidden bg-cover bg-center shadow-sm"
      style={{ backgroundImage: `url('${image_banner}')` }}
    >
      {/* Dégradé linéaire : du bleu profond (#1b1464) vers la transparence */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1b1464] via-[#1b1464]/85 to-transparent flex items-end p-6 md:p-8">
        
        {/* Contenu de la bannière (Logo + Titres) */}
        <div className="flex items-center gap-4 md:gap-6 z-10">
          
          {/* Logo Circulaire basé sur le nom court */}
          <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-md shrink-0">
            <span className="text-[#1b1464] font-black text-xl md:text-2xl tracking-tight">
              <img src={logo} alt={nom_complet} className="w-full h-full object-cover rounded-full" />
            </span>
          </div>
          
          {/* Bloc d'informations textuelles */}
          <div className="space-y-1 text-white">
            <span className="inline-block bg-[#de3f6b] text-white font-black text-[10px] px-2.5 py-0.5 rounded-md uppercase tracking-wider mb-1">
              {emplacement_salon}
            </span>
            <h1 className="text-xl md:text-3xl font-black tracking-tight leading-tight">
              {nom_complet}
            </h1>
            <p className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-1">
              📍 {ville}
            </p>
          </div>

        </div>
      </div>

      {/* Bouton de retour absolu */}
      <button
        onClick={onBack}
        className="absolute top-4 left-4 z-20 bg-white/90 hover:bg-white text-[#1b1464] font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
      >
        <span>◀</span> Revenir à la liste
      </button>
    </div>
  );
}