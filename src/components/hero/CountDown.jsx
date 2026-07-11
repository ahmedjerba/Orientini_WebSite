import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function Countdown() {
  const shouldReduceMotion = useReducedMotion();

  // ─── Date de l'événement ─────────────────────────────────────────────────
  const EVENT_DATE = new Date("2026-07-19T09:00:00");
  const TOTAL_DURATION = EVENT_DATE - new Date("2026-06-21T17:00:00"); // référence début d'année

  const calculateTimeLeft = () => {
    const difference = +EVENT_DATE - +new Date();
    if (difference <= 0) return { jours: 0, heures: 0, minutes: 0, secondes: 0 };
    return {
      jours: Math.floor(difference / (1000 * 60 * 60 * 24)),
      heures: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      secondes: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearTimeout(timer);
  });

  const formatNumber = (num) => String(num).padStart(2, '0');

  // Pourcentage de temps ÉCOULÉ (0% = juste annoncé, 100% = événement maintenant)
  const elapsed = Math.max(0, +new Date() - (+EVENT_DATE - TOTAL_DURATION));
  const progressPct = Math.min(100, (elapsed / TOTAL_DURATION) * 100);

  const timeBlocks = [
    { label: 'Jours', value: timeLeft.jours },
    { label: 'Heures', value: timeLeft.heures },
    { label: 'Min', value: timeLeft.minutes },
    { label: 'Sec', value: timeLeft.secondes },
  ];

  // Position verticale de la fusée : monte de 85% → 5% à mesure qu'on approche
  const rocketY = 85 - progressPct * 0.80; // en % du conteneur

  return (
    <div className="w-full max-w-md mt-6 mx-auto lg:mx-0">
      {/* ─── TITRE THÉMATISÉ ─────────────────────────────────────────────── */}
      <p className="text-center lg:text-left text-xs font-bold uppercase tracking-widest text-cyan mb-3 flex items-center gap-1.5 justify-center lg:justify-start">
        🚀 Décollage dans :
      </p>

      {/* ─── CARTE PRINCIPALE : fond bleu / rail de lancement à gauche ──── */}
      <div className="relative bg-bleu rounded-2xl shadow-xl border border-white/10 overflow-hidden">

        {/* Lueur jaune d'ambiance qui grandit avec la progression */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% ${20 + progressPct * 0.4}% at 10% 80%, rgba(245,210,3,${0.04 + progressPct * 0.002}) 0%, transparent 70%)`,
          }}
        />

        <div className="flex gap-0">

          {/* ─── RAIL DE LANCEMENT (colonne gauche) ─────────────────────── */}
          <div className="relative w-10 shrink-0 flex flex-col items-center py-4 border-r border-white/10">

            {/* Barre de progression verticale (fond gris) */}
            <div className="absolute inset-y-4 w-[3px] bg-white/10 rounded-full left-1/2 -translate-x-1/2" />

            {/* Remplissage doré du bas vers le haut selon progressPct */}
            <div
              className="absolute bottom-4 w-[3px] bg-gradient-to-t from-jaune via-pourpre to-cyan rounded-full left-1/2 -translate-x-1/2 transition-all duration-1000"
              style={{ height: `calc(${progressPct}% - 2rem)` }}
            />

            {/* Fusée qui monte le long du rail */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 text-base select-none z-10"
              style={{ top: `${rocketY}%` }}
              animate={shouldReduceMotion ? {} : {
                y: [0, -3, 0],
                transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }}
            >
              🚀
            </motion.div>

            {/* Flamme d'échappement sous la fusée */}
            {!shouldReduceMotion && (
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 text-[10px] select-none opacity-80"
                style={{ top: `calc(${rocketY}% + 18px)` }}
                animate={{ opacity: [0.6, 1, 0.6], scaleY: [0.8, 1.2, 0.8] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                🔥
              </motion.div>
            )}

            {/* Étoiles fixes le long du rail */}
            {[15, 35, 60].map((top, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 text-[8px] select-none"
                style={{ top: `${top}%` }}
                animate={shouldReduceMotion ? {} : {
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.1, 0.8],
                  transition: { duration: 2 + i * 0.7, repeat: Infinity, delay: i * 0.4 }
                }}
              >
                ⭐
              </motion.div>
            ))}
          </div>

          {/* ─── BLOCS TEMPS ─────────────────────────────────────────────── */}
          <div className="flex-1 p-4">
            <div className="grid grid-cols-4 gap-2 text-center">
              {timeBlocks.map((item, idx) => (
                <div key={idx} className="relative flex flex-col items-center">
                  {/* Fond bloc avec bordure jaune si c'est le dernier bloc (secondes) */}
                  <div className={`w-full bg-white/10 backdrop-blur-sm rounded-xl py-2 border ${idx === 3 ? 'border-jaune/40' : 'border-white/5'
                    } flex flex-col items-center`}>
                    {/* Chiffre animé */}
                    <div className="relative overflow-hidden h-9 w-full flex items-center justify-center">
                      <AnimatePresence mode="popLayout">
                        <motion.span
                          key={item.value}
                          initial={{ y: shouldReduceMotion ? 0 : 15, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: shouldReduceMotion ? 0 : -15, opacity: 0 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          className="absolute block text-2xl md:text-3xl font-black text-jaune tabular-nums"
                        >
                          {formatNumber(item.value)}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                    <span className="text-xs uppercase font-bold text-gray-300 tracking-wider mt-1">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Barre de progression linéaire en bas */}
            <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan via-pourpre to-jaune rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
              />
            </div>
            <p className="text-right text-[10px] text-white/30 font-bold mt-1 uppercase tracking-wider">
              {progressPct.toFixed(0)}% du parcours accompli
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}