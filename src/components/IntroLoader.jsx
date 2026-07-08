import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// INTRO LOADER — Optimisé latence & mobile
// • Phase 1 : Particules convergent vers le centre (0–700ms)
// • Phase 2 : Logo s'agrandit + anneaux de lumière (700–1500ms)
// • Phase 3 : Portail explose vers l'extérieur (1500–2100ms)
// ─────────────────────────────────────────────────────────────

const SESSION_KEY = 'orientini_intro_played';

const CATEGORY_COLORS = [
  "#e15b5b", "#78bec3", "#f0930d", "#2e9e6b", "#8b5cf6", "#f5d203", "#de3f6b"
];

// Particules pré-calculées (évite le recalcul au render)
// Pas de blur filter — trop coûteux sur GPU mobile
const PARTICLE_COUNT = 22;
const staticParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + ((i * 17) % 100) / 100 * 0.4;
  const distance = 200 + ((i * 37) % 100) / 100 * 150;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: ((i * 29) % 100) / 100 * 0.25,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    size: 5 + ((i * 13) % 100) / 100 * 6,
    // Pas de blur — supprimé pour perf mobile
  };
});

// Anneaux de lumière — durées raccourcies
const RINGS = [
  { size: 110, delay: 0.2, opacity: 0.22, duration: 0.85 },
  { size: 185, delay: 0.4, opacity: 0.16, duration: 0.95 },
  { size: 265, delay: 0.6, opacity: 0.10, duration: 1.05 },
];

// Étoiles pré-calculées pour éviter le recalcul
const STARS_DESKTOP = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  w: 1 + (i * 7) % 3,
  top: (i * 47) % 100,
  left: (i * 61) % 100,
  opacity: 0.08 + (i % 5) * 0.04,
}));
const STARS_MOBILE = STARS_DESKTOP.slice(0, 12);

export default function IntroLoader({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });

  // 'particles' → 'logo' → 'portal' → 'done'
  const [phase, setPhase] = useState('particles');
  const [appVisible, setAppVisible] = useState(!showIntro);

  // Détection touch — stable, calculée une seule fois
  const [isTouch] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  const dismiss = () => { setShowIntro(false); setAppVisible(true); };

  useEffect(() => {
    if (!showIntro) return undefined;

    window.sessionStorage.setItem(SESSION_KEY, '1');

    if (prefersReducedMotion) {
      const t = setTimeout(dismiss, 300);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase('logo'), 650);
    const t2 = setTimeout(() => setPhase('portal'), 1400);
    const t3 = setTimeout(dismiss, 2050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showIntro, prefersReducedMotion]);

  const activeParticles = isTouch ? staticParticles.slice(0, 12) : staticParticles;
  const stars = isTouch ? STARS_MOBILE : STARS_DESKTOP;

  return (
    <>
      {/* ── ANIMATION PLEIN ÉCRAN ─────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden select-none cursor-pointer"
            style={{ backgroundColor: '#0d0e2c', willChange: 'opacity' }}
            onClick={dismiss}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
          >
            {/* Bouton passer */}
            <button
              onClick={(e) => { e.stopPropagation(); dismiss(); }}
              className="absolute top-5 right-5 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all z-30 cursor-pointer active:scale-95"
              style={{ minWidth: '80px', minHeight: '36px' }}
            >
              Passer ⏭
            </button>

            {/* Fond étoilé — rendu statique, pas de framer-motion */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                {stars.map((s) => (
                  <div
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${s.w}px`,
                      height: `${s.w}px`,
                      top: `${s.top}%`,
                      left: `${s.left}%`,
                      opacity: s.opacity,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Zone centrale */}
            <div className="relative flex items-center justify-center" style={{ width: '22rem', height: '22rem' }}>

              {/* ANNEAUX DE LUMIÈRE (phase logo) */}
              {!prefersReducedMotion && phase === 'logo' && RINGS.map((ring, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full border border-[#de3f6b]/40 pointer-events-none"
                  style={{ width: ring.size, height: ring.size, willChange: 'transform, opacity' }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.7], opacity: [0, ring.opacity, 0] }}
                  transition={{ duration: ring.duration, delay: ring.delay, ease: 'easeOut' }}
                />
              ))}

              {/* PARTICULES — convergent vers le centre */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {activeParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      className="absolute rounded-full"
                      style={{
                        width: p.size,
                        height: p.size,
                        backgroundColor: p.color,
                        // boxShadow supprimé sur mobile pour perf
                        boxShadow: isTouch ? undefined : `0 0 ${p.size * 1.2}px ${p.color}66`,
                        willChange: 'transform, opacity',
                      }}
                      initial={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                      animate={{ x: 0, y: 0, opacity: [0, 1, 0.6, 0], scale: 0.2 }}
                      transition={{
                        duration: 0.75,
                        delay: p.delay,
                        ease: [0.25, 0.46, 0.45, 0.94],
                      }}
                    />
                  ))}
                </div>
              )}

              {/* LOGO CENTRAL */}
              <motion.div
                className="relative z-10 flex flex-col items-center gap-3"
                style={{ willChange: 'transform, opacity' }}
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{
                  opacity: phase === 'portal' ? 0 : 1,
                  scale: phase === 'logo' ? 1.2 : phase === 'portal' ? 2.5 : 0.8,
                }}
                transition={{
                  duration: phase === 'portal' ? 0.35 : 0.6,
                  ease: phase === 'portal' ? [0.55, 0, 1, 0.45] : [0.16, 1, 0.3, 1],
                  delay: phase === 'particles' ? 0.4 : 0,
                }}
              >
                <img
                  src="/logo.webp"
                  alt="Orient'ini"
                  width="160"
                  height="68"
                  className="w-32 sm:w-44 h-auto object-contain drop-shadow-[0_0_30px_rgba(222,63,107,0.5)]"
                  loading="eager"
                  decoding="async"
                />

                {/* Tagline */}
                <motion.p
                  className="text-white/70 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] sm:tracking-[0.3em] text-center px-4"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: phase !== 'particles' ? 1 : 0, y: phase !== 'particles' ? 0 : 6 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                >
                  Salon d'orientation • JID
                </motion.p>
              </motion.div>

              {/* ÉCLAT CENTRAL (halo derrière le logo) */}
              {!prefersReducedMotion && phase === 'logo' && (
                <motion.div
                  className="absolute rounded-full pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(222,63,107,0.35) 0%, rgba(27,20,100,0) 70%)',
                    width: 240,
                    height: 240,
                    willChange: 'transform, opacity',
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 1.05, 1.0], opacity: [0, 0.85, 0.65] }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                />
              )}

              {/* PORTAIL — explosion finale — taille réduite pour perf */}
              {phase === 'portal' && (
                <motion.div
                  className="absolute rounded-full z-20 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #ffffff 30%, #e0e7ff 70%, #c7d2fe 100%)',
                    boxShadow: '0 0 80px 40px rgba(222,63,107,0.5), 0 0 150px 70px rgba(120,190,195,0.25)',
                    willChange: 'width, height',
                  }}
                  initial={{ width: 30, height: 30, opacity: 1 }}
                  animate={{ width: '220vw', height: '220vw', opacity: 1 }}
                  transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                  onAnimationComplete={dismiss}
                />
              )}
            </div>

            {/* Hint bas de page — adapté selon touch/mouse */}
            <motion.p
              className="absolute bottom-6 sm:bottom-8 text-[10px] sm:text-[11px] uppercase tracking-widest text-white/30 font-bold z-10 text-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isTouch ? "Appuyez n\u2019importe où pour passer" : "Cliquez n\u2019importe où pour passer"}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── APPLICATION — rendue SEULEMENT après l'intro ─────────── */}
      {appVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
