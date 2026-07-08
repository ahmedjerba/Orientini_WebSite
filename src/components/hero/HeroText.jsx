import { motion, useReducedMotion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function HeroText() {
  const shouldReduceMotion = useReducedMotion();

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
      {/* Badge */}
      <motion.span
        variants={itemVariants}
        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-cyan/10 text-bleu border border-cyan/20"
      >
        ✨ 8ème Édition — #Unlock_your_next_chapter
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
          className="w-full sm:w-auto bg-gradient-to-r from-pourpre via-[#f5d203] to-pourpre bg-[length:200%_auto] text-white px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-lg shadow-pourpre/30 hover:bg-right transition-all duration-500 text-center"
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