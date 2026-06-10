import { useState, useEffect } from "react";

export default function HeroBanner({ faculte, onBack, bannerGradient }) {
  const DEFAULT_BANNER = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";

  // Extraction sécurisée
  const {
    logo = "Établissement",
    nom_complet = "Nom complet de la faculté",
    ville = "Tunisie",
    fac_hero_banner = DEFAULT_BANNER
  } = faculte || {};

  // État local pour gérer l'URL de la bannière dynamique
  const [bannerUrl, setBannerUrl] = useState(fac_hero_banner);

  // Mettre à jour l'URL si la faculté change
  useEffect(() => {
    setBannerUrl(fac_hero_banner);
  }, [fac_hero_banner]);

  return (
    // MODIFICATION MOBILE : Hauteur automatique (h-auto) ou fixe minimale (min-h-[320px]) sur mobile pour laisser le texte respirer sans déborder
    <div 
      className="relative min-h-[280px] md:h-72 w-full rounded-2xl md:rounded-3xl overflow-hidden bg-cover bg-center shadow-sm flex flex-col justify-between"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      <img 
        src={fac_hero_banner} 
        alt="" 
        className="hidden" 
        onError={() => setBannerUrl(DEFAULT_BANNER)} 
      />

      {/* Bouton de retour : Reste en haut à gauche, bien visible sur mobile */}
      <div className="p-4 z-20">
        <button
          onClick={onBack}
          className="bg-white/90 hover:bg-white text-[#1b1464] font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
        >
          <span>◀</span> Revenir à la liste
        </button>
      </div>

      {/* MODIFICATION GRADIENT : 
        - Sur mobile : Un gradient du bas vers le haut (bg-gradient-to-t) pour garantir la lisibilité du texte blanc peu importe la photo.
        - Sur PC (md) : Reprend votre gradient de gauche à droite (md:bg-gradient-to-r).
      */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#1b1464] via-[#1b1464]/90 to-transparent md:bg-gradient-to-r ${bannerGradient ? bannerGradient : 'from-[#1b1464] via-[#1b1464]/85 to-transparent'} flex items-end p-5 md:p-8 z-10`}>
        
        {/* MODIFICATION FLEXBOX : 
          - Sur mobile : `flex-col` (Logo au-dessus du texte) et `items-start` pour éviter les collisions.
          - Sur PC : `md:flex-row` (Côte à côte) et `md:items-center`.
        */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 w-full pt-12 md:pt-0">
          
          {/* Logo Circulaire : Légèrement plus petit sur mobile (w-14 h-14) pour économiser de l'espace */}
          <div className="w-14 h-14 md:w-20 md:h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-md shrink-0">
            <img src={logo} alt={nom_complet} className="w-full h-full object-cover rounded-full" />
          </div>
          
          {/* Bloc d'informations textuelles */}
          <div className="space-y-1 text-white balance-text">
            {/* text-lg ou text-xl max sur mobile pour éviter que le nom de l'établissement ne sorte de l'écran */}
            <h1 className="text-lg md:text-3xl font-black tracking-tight leading-tight multi-line-truncate">
              {nom_complet}
            </h1>
            <p className="text-[10px] md:text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-1">
              📍 {ville}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}