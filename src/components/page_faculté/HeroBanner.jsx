import { useState } from "react";
import { getPrimaryTagColor } from "../../data/categoryColors";

export default function HeroBanner({ faculte, onBack }) {
  const DEFAULT_BANNER = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80";

  const {
    logo = "Établissement",
    nom_complet = "Nom complet de la faculté",
    ville = "Tunisie",
    fac_hero_banner = DEFAULT_BANNER,
    tags = []
  } = faculte || {};

  const [prevBanner, setPrevBanner] = useState(fac_hero_banner);
  const [bannerUrl, setBannerUrl] = useState(fac_hero_banner);

  if (fac_hero_banner !== prevBanner) {
    setPrevBanner(fac_hero_banner);
    setBannerUrl(fac_hero_banner);
  }

  // Couleur / gradient basé sur les TAGS de la faculté
  const primaryColor = getPrimaryTagColor(tags);

  // Mobile : bas très opaque → transparent en haut
  const mobileGradStyle = {
    background: `linear-gradient(to top, ${primaryColor}ff 0%, ${primaryColor}ee 30%, ${primaryColor}99 60%, ${primaryColor}22 85%, transparent 100%)`,
  };

  // PC : gauche très opaque → s'efface après 65%
  const desktopGradStyle = {
    background: `linear-gradient(to right, ${primaryColor}ff 0%, ${primaryColor}f0 25%, ${primaryColor}cc 45%, ${primaryColor}55 65%, transparent 100%)`,
  };

  // Pour les multi-tags : léger gradient diagonal visible sur le bord haut du banner
  const hasMultipleTags = tags.length > 1;

  return (
    <div
      className="relative min-h-[280px] md:h-72 w-full rounded-2xl md:rounded-3xl overflow-hidden bg-cover bg-center shadow-md flex flex-col justify-between"
      style={{ backgroundImage: `url('${bannerUrl}')` }}
    >
      {/* Image fallback */}
      <img
        src={fac_hero_banner}
        alt=""
        className="hidden"
        onError={() => setBannerUrl(DEFAULT_BANNER)}
      />

      {/* Bandeau multi-tags en haut : dégradé coloré */}
      {hasMultipleTags && (
        <div
          className="absolute top-0 left-0 right-0 h-1.5 z-20"
          style={{ background: `linear-gradient(to right, ${primaryColor}ff, ${primaryColor}88, transparent)` }}
        />
      )}

      {/* Bouton de retour */}
      <div className="p-4 z-20">
        <button
          onClick={onBack}
          className="bg-white/90 hover:bg-white text-[#1b1464] font-black text-xs px-4 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer backdrop-blur-sm"
        >
          <span>◀</span> Revenir à la liste
        </button>
      </div>

      {/* Gradient mobile (bas → haut) — masqué sur md+ */}
      <div
        className="absolute inset-0 flex items-end p-5 z-10 md:hidden"
        style={mobileGradStyle}
      >
        <div className="flex flex-col items-start gap-3 w-full pt-12">
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-md shrink-0">
            <img
              src={logo}
              alt={nom_complet}
              loading="lazy"
              width="80"
              height="80"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="space-y-1 text-white">
            <h1 className="text-lg font-black tracking-tight leading-tight">
              {nom_complet}
            </h1>
            <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest flex items-center gap-1">
              📍 {ville}
            </p>
          </div>
        </div>
      </div>

      {/* Gradient PC (gauche → droite) — visible sur md+ */}
      <div
        className="absolute inset-0 hidden md:flex items-end p-8 z-10"
        style={desktopGradStyle}
      >
        <div className="flex flex-row items-center gap-6 w-full">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-4 border-white/20 shadow-md shrink-0">
            <img
              src={logo}
              alt={nom_complet}
              loading="lazy"
              width="80"
              height="80"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="space-y-1 text-white">
            <h1 className="text-3xl font-black tracking-tight leading-tight">
              {nom_complet}
            </h1>
            <p className="text-sm font-bold text-white/80 uppercase tracking-widest flex items-center gap-1">
              📍 {ville}
            </p>
            {/* Tags chips sous le titre */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white/90 backdrop-blur-sm border border-white/15"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}