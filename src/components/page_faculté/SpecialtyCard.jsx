import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView, animate } from 'framer-motion';

// Petit composant performant pour l'animation progressive du score (Count-Up)
function ScoreCountUp({ value }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.0,
      ease: "easeOut",
      onUpdate(currentVal) {
        node.textContent = currentVal.toFixed(2);
      }
    });
    return () => controls.stop();
  }, [value, inView]);

  return <span ref={ref}>0.00</span>;
}

export default function SpecialtyCard({ spec, onClick, variants }) {
  const shouldReduceMotion = useReducedMotion();
  const [isFlipped, setIsFlipped] = useState(false);

  const bacConfig = {
    bac_math: { label: "Math", emoji: "📊", color: "text-[#1b1464] bg-[#1b1464]/5 border-[#1b1464]/10" },
    bac_sc: { label: "Sc", emoji: "🧪", color: "text-[#de3f6b] bg-[#de3f6b]/5 border-[#de3f6b]/10" },
    bac_info: { label: "Info", emoji: "💻", color: "text-cyan-800 bg-cyan-50 border-cyan-150" },
    bac_tech: { label: "Tech", emoji: "⚙️", color: "text-amber-800 bg-amber-50 border-amber-150" },
    bac_eco: { label: "Éco", emoji: "📈", color: "text-emerald-800 bg-emerald-50 border-emerald-150" },
    bac_lettres: { label: "Lettres", emoji: "📖", color: "text-purple-800 bg-purple-50 border-purple-150" },
    bac_let: { label: "Lettres", emoji: "📖", color: "text-purple-800 bg-purple-50 border-purple-150" },
    bac_sport: { label: "Sport", emoji: "🏃", color: "text-orange-800 bg-orange-50 border-orange-150" }
  };

  // Flip sur mobile tactile (via clic) et hover sur PC
  const handleTap = (e) => {
    e.stopPropagation();
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    
    if (isTouch) {
      if (!isFlipped) {
        setIsFlipped(true);
      } else {
        // Si c'est déjà retourné sur mobile, un tap ouvre directement le modal
        if (onClick) onClick();
      }
    } else {
      // Sur PC (curseur fin), un clic ouvre directement
      if (onClick) onClick();
    }
  };

  const handleFlipBack = (e) => {
    e.stopPropagation();
    setIsFlipped(false);
  };

  const handleDeepDive = (e) => {
    e.stopPropagation();
    if (onClick) onClick();
  };

  // Style CSS 3D inline pour assurer le rendu cross-browser
  const perspectiveStyle = {
    perspective: "1000px"
  };

  const innerCardStyle = {
    transformStyle: "preserve-3d",
    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
    transition: shouldReduceMotion ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
  };

  const faceStyle = {
    backfaceVisibility: "hidden"
  };

  const backFaceStyle = {
    backfaceVisibility: "hidden",
    transform: "rotateY(180deg)"
  };

  return (
    <motion.div
      variants={variants}
      style={perspectiveStyle}
      className="w-full h-[220px] cursor-pointer group"
      onClick={handleTap}
      onMouseEnter={() => {
        if (!window.matchMedia("(pointer: coarse)").matches) {
          setIsFlipped(true);
        }
      }}
      onMouseLeave={() => {
        if (!window.matchMedia("(pointer: coarse)").matches) {
          setIsFlipped(false);
        }
      }}
    >
      <div 
        style={innerCardStyle} 
        className="w-full h-full relative"
      >
        {/* ─── FACE RECTO ─── */}
        <div
          style={faceStyle}
          className="absolute inset-0 w-full h-full bg-slate-50/50 hover:bg-slate-50 border border-gray-100 rounded-2xl p-5 flex flex-col justify-between shadow-sm"
        >
          <div className="flex flex-col gap-2.5">
            <div className="flex justify-between items-start gap-2.5">
              <div className="flex flex-col gap-1">
                {spec.isNouvelle && (
                  <span className="self-start bg-emerald-50 border border-emerald-150 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-0.5">
                    ✨ Nouvelle filière
                  </span>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-lg shrink-0">🎓</span>
                  <h4 className="font-black text-xs md:text-sm text-[#1b1464] leading-snug break-words max-w-[200px]">
                    {spec.nom}
                  </h4>
                </div>
              </div>
              <span className="shrink-0 bg-[#de3f6b]/10 text-[#de3f6b] text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full text-center leading-normal">
                {spec.duree}
              </span>
            </div>

            <p className="text-gray-500 text-[11px] md:text-xs font-semibold leading-relaxed line-clamp-4">
              {spec.description}
            </p>
          </div>

          <div className="text-[9px] font-bold text-gray-400/80 uppercase tracking-widest text-right flex items-center justify-end gap-1">
            <span>Seuils & débouchés</span> 🔄
          </div>
        </div>

        {/* ─── FACE VERSO ─── */}
        <div
          style={backFaceStyle}
          className="absolute inset-0 w-full h-full bg-white border border-gray-250/90 rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-[#de3f6b]/40 transition-colors"
        >
          <div className="space-y-3">
            <h5 className="font-black text-xs text-[#1b1464] border-b border-gray-100 pb-1.5 line-clamp-1">
              {spec.nom}
            </h5>

            {/* Seuils requis */}
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                Seuils de score requis :
              </span>
              <div className="flex flex-wrap gap-1">
                {Object.keys(bacConfig).map((key) => {
                  const score = spec[key];
                  if (!score || score <= 0) return null;
                  const config = bacConfig[key];

                  return (
                    <span 
                      key={key}
                      className={`border text-[9px] font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 ${config.color}`}
                    >
                      <span>{config.emoji}</span>
                      <span>{config.label}: </span>
                      <ScoreCountUp value={score} />
                    </span>
                  );
                })}
                {/* Fallback si aucun score */}
                {!Object.keys(bacConfig).some(k => spec[k] > 0) && (
                  <span className="text-[9px] font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                    Sur dossier / Concours
                  </span>
                )}
              </div>
            </div>

            {/* Débouchés */}
            {spec.debouches && spec.debouches.length > 0 && (
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider block">
                  Débouchés clés :
                </span>
                <div className="flex flex-wrap gap-1">
                  {spec.debouches.slice(0, 2).map((deb, dIdx) => (
                    <span
                      key={dIdx}
                      className="bg-slate-50 border border-slate-100 text-gray-600 text-[9px] font-bold px-1.5 py-0.5 rounded line-clamp-1 max-w-[140px]"
                    >
                      {deb}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions pied de carte */}
          <div className="flex items-center justify-between pt-1.5 border-t border-slate-50">
            <button
              onClick={handleFlipBack}
              className="text-[9px] font-black text-gray-400 hover:text-[#de3f6b] hover:bg-[#de3f6b]/5 border border-gray-200 rounded-lg px-2.5 py-1.5 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>◀ Retour</span>
            </button>
            <div 
              onClick={handleDeepDive}
              className="text-[9px] font-black text-white bg-[#de3f6b] hover:bg-[#c93259] px-3 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-sm transition-all hover:scale-105 active:scale-95 animate-pulse"
            >
              <span>Ouvrir les détails</span> 🚀
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
