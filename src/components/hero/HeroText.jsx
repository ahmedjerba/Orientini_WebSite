import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function HeroText() {
  const shouldReduceMotion = useReducedMotion();

  // Compteur animé 1 → 8 au premier chargement pour le badge "8ème Édition"
  const [editionCount, setEditionCount] = useState(shouldReduceMotion ? 8 : 1);
  useEffect(() => {
    if (shouldReduceMotion) return;
    let count = 1;
    const interval = setInterval(() => {
      count++;
      setEditionCount(count);
      if (count >= 8) clearInterval(interval);
    }, 120);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Animation de cascade pour le parent
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  };

  // Animation d'apparition des éléments enfants
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  // Effet de pulsation unique au chargement pour le bouton d'inscription (2 à 3 fois)
  const ctaPulseVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      scale: shouldReduceMotion ? 1 : [1, 1.04, 1, 1.04, 1], // Pulsation légère
      transition: {
        y: { duration: 0.5, ease: "easeOut" },
        scale: {
          delay: 0.8,
          duration: 1.2,
          times: [0, 0.25, 0.5, 0.75, 1],
          ease: "easeInOut",
        },
      },
    },
  };

  const handleCTAClick = () => {
    // Déclenche un effet festif de confettis sur le CTA principal
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.75 },
      colors: ['#de3f6b', '#1b1464', '#f5d203', '#78bec3'],
      disableForReducedMotion: true // Respecte la préférence de mouvement réduit
    });
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6"
    >
      {/* Badge 8ème Édition enrichi */}
      <motion.span
        variants={itemVariants}
        whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
        className="group relative inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-cyan/10 text-bleu border border-cyan/20 cursor-default select-none"
      >
        ✨{' '}
        {/* Chiffre animé */}
        <motion.span
          key={editionCount}
          initial={shouldReduceMotion ? {} : { y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          className="font-black text-pourpre"
        >
          {editionCount}
        </motion.span>
        ème Édition — #Unlock_your_next_chapter

        {/* Tooltip au survol : continuité historique */}
        <motion.span
          initial={{ opacity: 0, scale: 0.9, y: 4 }}
          whileHover={{ opacity: 1, scale: 1, y: 0 }}
          className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-bleu text-white text-[10px] font-black px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-10"
        >
          🏆 De 2018 à 2026
          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-x-4 border-x-transparent border-b-[5px] border-b-bleu" />
        </motion.span>
      </motion.span>

      {/* Slogan */}
      <motion.h1
        variants={itemVariants}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-bleu leading-tight tracking-tight"
      >
        Trouvez votre voie. <br />
        <span className="text-pourpre inline-block mt-2">
          Rencontrez votre future faculté.
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-gray-500 text-base md:text-lg max-w-xl font-medium leading-relaxed"
      >
        Le grand rendez-vous d'orientation académique organisé par les Jeunes Ingénieurs de Djerba.
      </motion.p>

      {/* Boutons d'action */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center pt-4"
      >
        <motion.a
          href="https://near.tl/sm/nIXQgB1Zu"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleCTAClick}
          variants={ctaPulseVariants}
          whileHover={shouldReduceMotion ? {} : { 
            scale: 1.03, 
            boxShadow: "0 10px 25px -5px rgba(222, 63, 107, 0.4)" 
          }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          className="w-full sm:w-auto bg-gradient-to-r from-pourpre via-[#c0306b] to-bleu bg-[length:200%_auto] text-white px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-lg shadow-pourpre/30 hover:bg-right transition-all duration-500 text-center [box-shadow:0_0_28px_rgba(245,210,3,0.35),0_4px_20px_rgba(222,63,107,0.35)]"
        >
          <span>🚀</span> REJOINDRE L'ÉVÉNEMENT
        </motion.a>

        <motion.a
          href="#programme"
          whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
          className="w-full sm:w-auto bg-slate-100/80 hover:bg-slate-200/80 text-bleu px-7 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-center border border-slate-200/60"
        >
          Voir le Programme
        </motion.a>
      </motion.div>
    </motion.div>
  );
}