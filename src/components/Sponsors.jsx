import { motion, useReducedMotion } from 'framer-motion';

export default function Sponsors() {
  const shouldReduceMotion = useReducedMotion();

  const sponsors = [
    { id: 1, name: "Bricola", logo: "/logos_sponsors/Bricola.webp" },
    { id: 2, name: "Altec", logo: "/logos_sponsors/Altec.webp" },
    { id: 3, name: "L'Intégrale", logo: "/logos_sponsors/Intégrale.webp" },
    { id: 4, name: "Ordre des Ingénieurs Tunisiens", logo: "/logos_sponsors/Ordre.webp" },
    { id: 5, name: "Espace Salim", logo: "/logos_sponsors/Salim.webp" },
    { id: 6, name: "Gros Frais", logo: "/logos_sponsors/Gros_Frais.webp" },
    { id: 7, name: "Codifa", logo: "/logos_sponsors/Codifa.webp" },
    { id: 8, name: "Halloumi Céram", logo: "/logos_sponsors/Halloumi.webp" },
    { id: 9, name: "Amen Détergents", logo: "/logos_sponsors/Amen.webp" },
    { id: 10, name: "Tout est Casa", logo: "/logos_sponsors/Tout_Casa.webp" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.06
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.05
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 6 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-white to-slate-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* En-tête au design premium */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#de3f6b] bg-[#de3f6b]/10 rounded-full">
            Soutiens Officiels
          </span>
          <motion.h2 
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="text-3xl font-black text-[#1b1464] tracking-tight sm:text-4xl"
          >
            {"🤝 Ils nous ont fait Confiance".split(" ").map((word, idx) => (
              <motion.span 
                key={idx} 
                variants={wordVariants} 
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Ces partenaires soutiennent l'édition d'Orient'ini et contribuent activement à guider nos futurs ingénieurs.
          </p>
        </div>

        {/* Grille responsive de cartes surélevées */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {sponsors.map((sponsor) => (
            <motion.div
              key={sponsor.id}
              variants={itemVariants}
              whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.02 }}
              className="flex flex-col items-center justify-center p-5 sm:p-7 bg-white rounded-3xl border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-[#78bec3]/30 hover:shadow-[0_20px_40px_rgba(120,190,195,0.08)] transition-all group duration-300 cursor-pointer"
            >
              {/* Conteneur de Logo circulaire en plein écran */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center ring-4 ring-slate-50 group-hover:ring-[#78bec3]/20 shadow-inner group-hover:scale-105 transition-all duration-300 mb-4 overflow-hidden">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  loading="lazy"
                  width="128"
                  height="128"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Nom du Sponsor */}
              <span className="text-xs sm:text-sm font-black text-gray-700 group-hover:text-[#1b1464] transition-colors text-center line-clamp-2 px-1">
                {sponsor.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
