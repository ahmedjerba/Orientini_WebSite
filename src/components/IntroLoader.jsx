import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// INTRO LOADER — Écran complet, spectaculaire & fluide
// • Phase 1 : Particules convergent vers le centre (0–800ms)
// • Phase 2 : Logo s'agrandit + anneaux de lumière (800–1600ms)
// • Phase 3 : Portail blanc explose vers l'extérieur (1600–2400ms)
// • L'app n'est rendue QU'APRÈS la fin de l'intro (plein écran garanti)
// ─────────────────────────────────────────────────────────────

const SESSION_KEY = 'orientini_intro_played';

const CATEGORY_COLORS = [
  "#e15b5b", "#78bec3", "#f0930d", "#2e9e6b", "#8b5cf6", "#f5d203", "#de3f6b"
];

// Particules pré-calculées (évite le recalcul au render)
const PARTICLE_COUNT = 22;
const staticParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + ((i * 17) % 100) / 100 * 0.4;
  const distance = 220 + ((i * 37) % 100) / 100 * 180;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: ((i * 29) % 100) / 100 * 0.3,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
    size: 5 + ((i * 13) % 100) / 100 * 7,
    blur: i % 3 === 0 ? 2 : 0,
  };
});

// Anneaux de lumière concentriques
const RINGS = [
  { size: 120, delay: 0.3, opacity: 0.25, duration: 1.0 },
  { size: 200, delay: 0.5, opacity: 0.18, duration: 1.1 },
  { size: 290, delay: 0.7, opacity: 0.12, duration: 1.2 },
];

export default function IntroLoader({ children }) {
  const prefersReducedMotion = useReducedMotion();

  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });

  // 'particles' → 'logo' → 'portal' → 'done'
  const [phase, setPhase] = useState('particles');
  // Contrôle le fade-in de l'app après la fin de l'intro
  const [appVisible, setAppVisible] = useState(!showIntro);

  useEffect(() => {
    if (!showIntro) return undefined;

    window.sessionStorage.setItem(SESSION_KEY, '1');

    if (prefersReducedMotion) {
      const t = setTimeout(() => {
        setShowIntro(false);
        setAppVisible(true);
      }, 300);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase('logo'), 700);
    const t2 = setTimeout(() => setPhase('portal'), 1500);
    // L'app apparaît en même temps que le portail commence à s'effacer
    const t3 = setTimeout(() => {
      setShowIntro(false);
      setAppVisible(true);
    }, 2200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [showIntro, prefersReducedMotion]);

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const activeParticles = isTouch ? staticParticles.slice(0, 14) : staticParticles;

  return (
    <>
      {/* ── ANIMATION PLEIN ÉCRAN ─────────────────────────────────── */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden select-none cursor-pointer"
            style={{ backgroundColor: '#0d0e2c' }}
            onClick={() => { setShowIntro(false); setAppVisible(true); }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {/* Bouton passer — visible et accessible */}
            <button
              onClick={(e) => { e.stopPropagation(); setShowIntro(false); setAppVisible(true); }}
              className="absolute top-6 right-6 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-all z-30 cursor-pointer"
            >
              Passer ⏭
            </button>

            {/* Fond étoilé subtil */}
            {!prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      width: `${1 + (i * 7) % 3}px`,
                      height: `${1 + (i * 7) % 3}px`,
                      top: `${(i * 47) % 100}%`,
                      left: `${(i * 61) % 100}%`,
                      opacity: 0.1 + (i % 5) * 0.05,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Zone centrale */}
            <div className="relative flex items-center justify-center w-96 h-96">

              {/* ANNEAUX DE LUMIÈRE (phase logo) */}
              {!prefersReducedMotion && phase === 'logo' && RINGS.map((ring, idx) => (
                <motion.div
                  key={idx}
                  className="absolute rounded-full border border-[#de3f6b]/40 pointer-events-none"
                  style={{ width: ring.size, height: ring.size }}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: [0.3, 1.8], opacity: [0, ring.opacity, 0] }}
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
                        filter: p.blur ? `blur(${p.blur}px)` : undefined,
                        boxShadow: `0 0 ${p.size * 1.5}px ${p.color}88`,
                      }}
                      initial={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                      animate={{ x: 0, y: 0, opacity: [0, 1, 0.7, 0], scale: 0.2 }}
                      transition={{
                        duration: 0.85,
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
                initial={{ opacity: 0, scale: 0.3, filter: 'blur(8px)' }}
                animate={{
                  opacity: phase === 'portal' ? 0 : 1,
                  scale: phase === 'logo' ? 1.25 : phase === 'portal' ? 2.8 : 0.8,
                  filter: phase === 'portal' ? 'blur(4px)' : 'blur(0px)',
                }}
                transition={{
                  duration: phase === 'portal' ? 0.4 : 0.65,
                  ease: phase === 'portal' ? [0.55, 0, 1, 0.45] : [0.16, 1, 0.3, 1],
                  delay: phase === 'particles' ? 0.5 : 0,
                }}
              >
                <img
                  src="/logo.webp"
                  alt="Orient'ini"
                  width="160"
                  height="68"
                  className="w-36 sm:w-44 h-auto object-contain drop-shadow-[0_0_40px_rgba(222,63,107,0.5)]"
                />

                {/* Tagline animée sous le logo */}
                <motion.p
                  className="text-white/70 text-[11px] font-black uppercase tracking-[0.3em] text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: phase !== 'particles' ? 1 : 0, y: phase !== 'particles' ? 0 : 8 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  Salon d'orientation • JID
                </motion.p>
              </motion.div>

              {/* ÉCLAT CENTRAL (halo pulsant derrière le logo) */}
              {!prefersReducedMotion && phase === 'logo' && (
                <motion.div
                  className="absolute rounded-full pointer-events-none z-0"
                  style={{
                    background: 'radial-gradient(circle, rgba(222,63,107,0.4) 0%, rgba(27,20,100,0) 70%)',
                    width: 260,
                    height: 260,
                  }}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: [0.5, 1.1, 1.0], opacity: [0, 0.9, 0.7] }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                />
              )}

              {/* PORTAIL — explosion finale */}
              {phase === 'portal' && (
                <motion.div
                  className="absolute rounded-full z-20 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, #ffffff 30%, #e0e7ff 70%, #c7d2fe 100%)',
                    boxShadow: '0 0 120px 60px rgba(222,63,107,0.6), 0 0 200px 100px rgba(120,190,195,0.3)',
                  }}
                  initial={{ width: 30, height: 30, opacity: 1 }}
                  animate={{ width: '300vw', height: '300vw', opacity: 1 }}
                  transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
                  onAnimationComplete={() => { setShowIntro(false); setAppVisible(true); }}
                />
              )}
            </div>

            {/* Texte hint bas de page */}
            <motion.p
              className="absolute bottom-8 text-[10px] uppercase tracking-widest text-white/30 font-bold z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Appuyez n'importe où pour passer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── APPLICATION — rendue SEULEMENT après l'intro ─────────── */}
      {appVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}
