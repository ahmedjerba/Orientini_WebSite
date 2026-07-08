import { motion, useReducedMotion } from 'framer-motion';

export default function HeroVisual() {
  const shouldReduceMotion = useReducedMotion();

  // Animation de flottement pour les halos
  const floatAnimationLeft = shouldReduceMotion ? {} : {
    y: [0, -12, 0],
    x: [0, 8, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  const floatAnimationRight = shouldReduceMotion ? {} : {
    y: [0, 12, 0],
    x: [0, -8, 0],
    transition: {
      duration: 7,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <div className="flex justify-center items-center w-full relative py-6 sm:py-10 overflow-hidden rounded-3xl">

      {/* ─── HALOS LUMINEUX EN ARRIÈRE-PLAN ─── */}
      <motion.div
        animate={floatAnimationLeft}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#de3f6b]/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={floatAnimationRight}
        className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-[#f5d203]/15 rounded-full blur-3xl pointer-events-none"
      />

      {/* ─── CONTENEUR DE L'AFFICHE (Cadre fluide style mockup/glassmorphism) ─── */}
      <motion.div
        initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? {} : { scale: 1.02, rotate: -0.5, transition: { duration: 0.3 } }}
        className="relative p-2.5 sm:p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl max-w-[280px] sm:max-w-xs md:max-w-sm lg:max-w-[340px] z-10"
      >
        <img
          src="Affiche.jpg"
          alt="Illustration Hero"
          className="w-full h-auto object-contain rounded-xl shadow-inner border border-slate-100"
        />
      </motion.div>

      {/* ─── SIGNATURE ─── */}
      <div className="absolute bottom-1 text-[9px] sm:text-[10px] text-gray-500 font-bold uppercase tracking-widest z-20 backdrop-blur-md px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200/50 shadow-sm">
        By Jeunes Ingénieurs de Djerba
      </div>

    </div>
  );
}