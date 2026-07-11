import { motion, useReducedMotion } from 'framer-motion';

/**
 * RouteLoader — Mini-loader thématisé, cohérent avec l'intro cinématique.
 * Remplace le spinner Tailwind générique dans le Suspense fallback de App.jsx.
 * Respects useReducedMotion : si actif, logo statique sans pulsation.
 */
export default function RouteLoader() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50 p-8 gap-5">

      {/* Logo pulsant avec glow pourpre — inspiré du pulse de IntroLoader.jsx */}
      <motion.div
        animate={shouldReduceMotion ? {} : {
          scale: [1, 1.08, 1],
          filter: [
            'drop-shadow(0 0 0px rgba(222,63,107,0))',
            'drop-shadow(0 0 18px rgba(222,63,107,0.45))',
            'drop-shadow(0 0 0px rgba(222,63,107,0))',
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <img
          src="/logo.webp"
          alt="Orient'ini"
          width="72"
          height="30"
          className="h-8 w-auto object-contain opacity-90"
        />
      </motion.div>

      {/* Points de chargement animés */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-pourpre"
            animate={shouldReduceMotion ? {} : {
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <p className="text-bleu font-black text-sm tracking-wide">
        Chargement des données...
      </p>

    </div>
  );
}
