import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion, useInView, animate, AnimatePresence } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'criteria'
  const containerRef = useRef(null);

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

  const handleCardClick = (e) => {
    // Calculer les coordonnées locales du clic sur la carte
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    if (!shouldReduceMotion) {
      // 1. Onde de choc (Ripple)
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.left = `${clickX}px`;
      ripple.style.top = `${clickY}px`;
      ripple.style.width = '120px';
      ripple.style.height = '120px';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'radial-gradient(circle, rgba(222,63,107,0.3) 0%, rgba(27,20,100,0) 70%)';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '40';
      ripple.style.transform = 'translate(-50%, -50%)';
      ripple.style.animation = 'specialty-ripple 0.5s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
      ripple.addEventListener('animationend', () => ripple.remove());
      containerRef.current.appendChild(ripple);

      // 2. Explosion de particules (Emojis et étincelles colorées)
      const emojis = ["🎓", "✨", "💡", "🚀", "📚", "⭐", "🎉"];
      const colors = ["#de3f6b", "#1b1464", "#10b981", "#3b82f6", "#f59e0b"];

      for (let i = 0; i < 10; i++) {
        const isEmoji = Math.random() > 0.45;
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.left = `${clickX}px`;
        particle.style.top = `${clickY}px`;
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '50';
        particle.style.willChange = 'transform, opacity';
        
        if (isEmoji) {
          particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
          particle.style.fontSize = `${10 + Math.random() * 6}px`;
          particle.style.userSelect = 'none';
        } else {
          particle.style.width = `${4 + Math.random() * 4}px`;
          particle.style.height = `${4 + Math.random() * 4}px`;
          particle.style.borderRadius = '50%';
          particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        }

        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4;
        const distance = 40 + Math.random() * 70;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance;
        const rotateEnd = (Math.random() - 0.5) * 360;
        const scaleEnd = 0.7 + Math.random() * 0.8;

        particle.style.setProperty('--x-end', `${dx}px`);
        particle.style.setProperty('--y-end', `${dy}px`);
        particle.style.setProperty('--rotate-end', `${rotateEnd}deg`);
        particle.style.setProperty('--scale-end', `${scaleEnd}`);

        particle.style.animation = 'specialty-particle 0.6s cubic-bezier(0.15, 0.85, 0.35, 1) forwards';
        
        particle.addEventListener('animationend', () => particle.remove());
        containerRef.current.appendChild(particle);
      }
    }

    // Déclencher le modal de détails avec un très léger délai (sans bloquer)
    setTimeout(() => {
      if (onClick) onClick();
    }, 120);
  };

  return (
    <>
      {/* ─── STYLES CSS INJECTÉS POUR LES ANIMATIONS NATIVES 60FPS ─── */}
      <style>{`
        @keyframes specialty-particle {
          0% {
            transform: translate(-50%, -50%) translate3d(0, 0, 0) scale(0.1) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) translate3d(var(--x-end), var(--y-end), 0) scale(var(--scale-end)) rotate(var(--rotate-end));
            opacity: 0;
          }
        }
        @keyframes specialty-ripple {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      <motion.div
        ref={containerRef}
        variants={variants}
        whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.01 }}
        whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
        transition={{ type: "spring", stiffness: 450, damping: 20 }}
        onClick={handleCardClick}
        className="relative w-full h-[230px] cursor-pointer group rounded-2xl select-none"
      >
        {/* ─── EFFET DE LUEUR NÉON DYNAMIQUE (GLOW) AU SURVOL ─── */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1b1464]/20 via-[#de3f6b]/15 to-[#de3f6b]/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl -z-10" />
        )}

        {/* ─── CONTENEUR PRINCIPAL (GLASSMORPHISME) ─── */}
        <div className="w-full h-full bg-white/95 backdrop-blur-md border border-gray-200/80 group-hover:border-[#de3f6b]/30 rounded-2xl p-4 flex flex-col justify-between shadow-sm group-hover:shadow-md transition-all duration-300 relative z-10 overflow-hidden">
          
          {/* En-tête de la carte */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-start gap-2">
              <div className="flex flex-col gap-0.5">
                {spec.isNouvelle && (
                  <span className="self-start bg-emerald-50 border border-emerald-150 text-emerald-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider mb-0.5">
                    ✨ Nouvelle filière
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <span className="text-base shrink-0">🎓</span>
                  <h4 className="font-black text-xs md:text-sm text-[#1b1464] leading-snug break-words max-w-[200px] group-hover:text-[#de3f6b] transition-colors">
                    {spec.nom}
                  </h4>
                </div>
              </div>
              <span className="shrink-0 bg-[#de3f6b]/10 text-[#de3f6b] text-[9px] md:text-[10px] font-black px-2.5 py-1 rounded-full text-center leading-normal">
                {spec.duree}
              </span>
            </div>

            {/* ─── ONGLET INTERACTIFS (SEGMENTED CONTROL) ─── */}
            <div 
              className="flex bg-slate-100/80 p-0.5 rounded-lg text-[9px] font-extrabold relative"
              onClick={(e) => e.stopPropagation()} // Évite de déclencher onClick global
            >
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex-1 py-1 rounded-md transition-all duration-200 relative ${activeTab === 'overview' ? 'text-[#1b1464]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {activeTab === 'overview' && (
                  <motion.div
                    layoutId={`${spec.id}-activeTabIndicator`}
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-gray-150"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1">
                  <span>📖</span> Présentation
                </span>
              </button>
              <button
                onClick={() => setActiveTab('criteria')}
                className={`flex-1 py-1 rounded-md transition-all duration-200 relative ${activeTab === 'criteria' ? 'text-[#1b1464]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {activeTab === 'criteria' && (
                  <motion.div
                    layoutId={`${spec.id}-activeTabIndicator`}
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-gray-150"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1">
                  <span>🎯</span> Seuils & Débouchés
                </span>
              </button>
            </div>
          </div>

          {/* ─── CONTENU PRINCIPAL AVEC ANIMATION DE TRANSITION ─── */}
          <div className="flex-1 my-3 overflow-hidden relative min-h-[70px]">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' ? (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex flex-col justify-start"
                >
                  <p className="text-gray-500 text-[11px] md:text-xs font-semibold leading-relaxed line-clamp-3">
                    {spec.description}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="criteria"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 flex flex-col justify-between gap-1.5"
                >
                  {/* Seuils requis */}
                  <div className="space-y-0.5">
                    <span className="text-[8px] font-bold text-gray-450 uppercase tracking-wider block">
                      Seuils de score :
                    </span>
                    <div className="flex flex-wrap gap-1 max-h-[36px] overflow-y-auto pr-1">
                      {Object.keys(bacConfig).map((key) => {
                        const score = spec[key];
                        if (!score || score <= 0) return null;
                        const config = bacConfig[key];

                        return (
                          <span 
                            key={key}
                            className={`border text-[8px] font-extrabold px-1 py-0.5 rounded flex items-center gap-0.5 ${config.color}`}
                          >
                            <span>{config.emoji}</span>
                            <span>{config.label}: </span>
                            <ScoreCountUp value={score} />
                          </span>
                        );
                      })}
                      {/* Fallback si aucun score */}
                      {!Object.keys(bacConfig).some(k => spec[k] > 0) && (
                        <span className="text-[8px] font-bold text-gray-450 bg-gray-50 px-2 py-0.5 rounded">
                          Sur dossier / Concours
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Débouchés */}
                  {spec.debouches && spec.debouches.length > 0 && (
                    <div className="space-y-0.5">
                      <span className="text-[8px] font-bold text-gray-450 uppercase tracking-wider block">
                        Débouchés clés :
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {spec.debouches.slice(0, 2).map((deb, dIdx) => (
                          <span
                            key={dIdx}
                            className="bg-slate-50 border border-slate-100 text-gray-600 text-[8px] font-bold px-1.5 py-0.5 rounded line-clamp-1 max-w-[140px]"
                          >
                            {deb}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Pied de carte avec appel à l'action */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <span className="text-[9px] font-bold text-[#de3f6b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
              En savoir plus ➜
            </span>
            <div 
              className="text-[9px] font-black text-white bg-[#de3f6b] group-hover:bg-[#c93259] px-3.5 py-1.5 rounded-lg uppercase tracking-wider flex items-center gap-1 shadow-sm transition-all duration-300 group-hover:scale-105 active:scale-95"
            >
              <span>Détails</span> 🚀
            </div>
          </div>

        </div>
      </motion.div>
    </>
  );
}
