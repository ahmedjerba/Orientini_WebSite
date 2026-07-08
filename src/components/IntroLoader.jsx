import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────
// INTRO LOADER — Portail lumineux + Particules convergentes
// Ne s'affiche qu'une seule fois par session (sessionStorage).
// Cliquer n'importe où permet de passer directement au site.
// ─────────────────────────────────────────────────────────────

const SESSION_KEY = 'orientini_intro_played';

const PARTICLE_COUNT = 18;
const staticParticles = Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
  const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + ((i * 17) % 100) / 100 * 0.3;
  const distance = 180 + ((i * 37) % 100) / 100 * 160;
  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    delay: ((i * 29) % 100) / 100 * 0.25,
    color: ['bg-pourpre', 'bg-cyan', 'bg-jaune', 'bg-white'][i % 4],
    size: 4 + ((i * 13) % 100) / 100 * 5,
  };
});

export default function IntroLoader({ children }) {
  const prefersReducedMotion = useReducedMotion();

  // On ne joue l'intro que si elle n'a pas déjà tourné dans cette session
  const [showIntro, setShowIntro] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.sessionStorage.getItem(SESSION_KEY);
  });

  const [phase, setPhase] = useState('particles'); // 'particles' -> 'logoLarge' -> 'portal' -> done

  useEffect(() => {
    if (!showIntro) return undefined;

    window.sessionStorage.setItem(SESSION_KEY, '1');

    // Si l'utilisateur a activé "réduire les animations", on fait très court
    if (prefersReducedMotion) {
      const t = setTimeout(() => setShowIntro(false), 400);
      return () => clearTimeout(t);
    }

    const t1 = setTimeout(() => setPhase('logoLarge'), 850);
    const t2 = setTimeout(() => setPhase('portal'), 1450);
    const t3 = setTimeout(() => setShowIntro(false), 1750);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [showIntro, prefersReducedMotion]);

  if (!showIntro) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {showIntro && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1b1464] overflow-hidden select-none cursor-pointer"
            onClick={() => setShowIntro(false)}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center justify-center w-80 h-80">
              
              {/* PARTILES (Uniquement si motion n'est pas réduite) */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {staticParticles.map((p) => (
                    <motion.div
                      key={p.id}
                      className={`absolute rounded-full ${p.color}`}
                      style={{ width: p.size, height: p.size }}
                      initial={{ x: p.x, y: p.y, opacity: 0, scale: 1 }}
                      animate={{ x: 0, y: 0, opacity: [0, 1, 0.6, 0], scale: 0.3 }}
                      transition={{
                        duration: 0.9,
                        delay: p.delay,
                        ease: 'easeIn',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* ── LOGO CENTRAL (apparaît quand les particules arrivent) ── */}
              <motion.img
                src="/logo.webp"
                alt="Orient'ini"
                width="160"
                height="68"
                initial={{ opacity: 0, scale: 0.4 }}
                animate={{
                  opacity: phase === 'portal' ? 0 : 1,
                  scale: phase === 'logoLarge' ? 1.35 : phase === 'portal' ? 2.5 : 1,
                }}
                transition={{
                  duration: phase === 'portal' ? 0.35 : 0.5,
                  ease: phase === 'portal' ? 'easeIn' : 'easeOut',
                  delay: phase === 'particles' ? 0.55 : 0
                }}
                className="w-32 sm:w-40 h-auto object-contain relative z-10 drop-shadow-[0_0_25px_rgba(255,255,255,0.15)]"
              />

              {/* ── PORTAIL LUMINEUX QUI S'AGRANDIT ── */}
              {phase === 'portal' && (
                <motion.div
                  className="absolute rounded-full bg-white z-20"
                  style={{
                    boxShadow: '0 0 80px 40px rgba(222,63,107,0.35)',
                  }}
                  initial={{ width: 20, height: 20, opacity: 0.9 }}
                  animate={{ width: '250vw', height: '250vw', opacity: 1 }}
                  transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                  onAnimationComplete={() => setShowIntro(false)}
                />
              )}
            </div>

            {/* Petit indicateur discret pour signaler que c'est "skippable" */}
            <motion.p
              className="absolute bottom-8 text-[10px] uppercase tracking-widest text-white/40 font-bold z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Cliquez pour passer
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Le site apparaît en fade dessous, révélé par le portail */}
      <motion.div
        initial={{ opacity: showIntro ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
}
