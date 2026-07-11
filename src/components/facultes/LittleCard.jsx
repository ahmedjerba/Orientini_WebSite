import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';


export default function LittleCard({ fac, onClick, color = '#9ca3af' }) {
  const shouldReduceMotion = useReducedMotion();
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    // Désactiver sur mobile (touch/coarse) ou si reduced motion est actif
    if (window.matchMedia("(pointer: coarse)").matches || shouldReduceMotion) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const angleX = (yc - y) / 12; // inclinaison modérée (max ~10deg)
    const angleY = (x - xc) / 12;
    
    setTiltStyle({
      transform: `perspective(500px) rotateX(${angleX}deg) rotateY(${angleY}deg)`
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({});
  };

  // Liste des emojis et labels pour les scores
  const bacConfig = {
    bac_math: { label: "Bac Math", emoji: "📐" },
    bac_sc: { label: "Bac Sciences", emoji: "🧪" },
    bac_info: { label: "Bac Info", emoji: "💻" },
    bac_tech: { label: "Bac Tech", emoji: "⚙️" },
    bac_eco: { label: "Bac Éco", emoji: "📈" },
    bac_lettres: { label: "Bac Lettres", emoji: "📝" },
    bac_let: { label: "Bac Lettres", emoji: "📝" },
    bac_sport: { label: "Bac Sport", emoji: "🏃" }
  };


  return (
    <motion.div 
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ ...tiltStyle, borderLeft: `4px solid ${color}`, willChange: "transform" }}
      whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.985 }}
      className="w-full bg-white rounded-3xl border-y border-r border-gray-100 p-6 shadow-sm hover:shadow-xl cursor-pointer group relative overflow-hidden flex flex-col justify-between h-full"
    >
      {/* BLOC SUPÉRIEUR : LOGO + IDENTITÉ */}
      <div>
        <div className="flex items-center gap-4 pr-12">
          {/* Container du Logo de la Fac */}
          <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-gray-100 flex items-center justify-center p-2 shrink-0 group-hover:bg-white group-hover:border-pourpre/20 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            {fac.logo ? (
              <img 
                src={fac.logo} 
                alt={`${fac.nom_court} logo`} 
                loading="lazy"
                width="48"
                height="48"
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
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest block">
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
                className="text-xs font-extrabold px-2.5 py-0.5 rounded-md border"
                style={{
                  backgroundColor: `${color}12`,
                  color: color,
                  borderColor: `${color}30`,
                }}
              >
                {shortName}
              </span>
            );
          })}
          {fac.filieres_phares.length > 2 && (
            <span className="text-xs font-bold text-gray-300 px-1.5 py-0.5">
              +{fac.filieres_phares.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* PIED DE LA CARTE */}
      <div className="flex items-center justify-end pt-4 mt-5 border-t border-gray-50">
        <span className="text-xs font-black text-[#de3f6b] uppercase tracking-wider group-hover:underline">
          Voir la fiche complète →
        </span>
      </div>

    </motion.div>
  );
}

// Composant Skeleton avec effet Shimmer (Wave animation)
export function LittleCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between h-full min-h-[190px] relative overflow-hidden select-none">
      {/* Effet Shimmer brillant */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer" style={{ animationDuration: '1.5s' }} />
      
      <div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-4 bg-slate-100 rounded-md w-2/3" />
            <div className="h-3 bg-slate-100 rounded-md w-1/3" />
          </div>
        </div>
        <div className="space-y-2 mt-5">
          <div className="h-3 bg-slate-100 rounded-md w-full" />
          <div className="h-3 bg-slate-100 rounded-md w-4/5" />
        </div>
      </div>
      <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
        <div className="h-3 bg-slate-100 rounded-md w-1/4" />
        <div className="h-3 bg-slate-100 rounded-md w-1/3" />
      </div>
    </div>
  );
}