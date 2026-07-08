import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

// Données réelles du planning sans le champ intervenant
const parcoursData = [
  {
    id: 1,
    heure: "09:00 - 09:30",
    titre: "Accueil & Installation",
    description: "Arrivée des étudiants, remise des guides de l'orientation et installation dans l'amphithéâtre.",
    icon: "👋"
  },
  {
    id: 2,
    heure: "09:30 - 11:30",
    titre: "Grande Conférence",
    description: "Présentation générale des filières, des scores de l'année dernière et conseils clés pour réussir son parcours.",
    icon: "📢"
  },
  {
    id: 3,
    heure: "11:30 - 14:00",
    titre: "Échanges sur les Stands",
    description: "Ouverture des stands par faculté. Les étudiants discutent directement avec les représentants des écoles (IPEIT, IPEIEM, etc.) pour poser leurs questions.",
    icon: "🎪"
  },
  {
    id: 4,
    heure: "14:00",
    titre: "Clôture du Salon",
    description: "Fin des sessions d'échanges et fermeture des portes du salon virtuel.",
    icon: "✨"
  }
];

export default function Programme() {
  const [activeStationId, setActiveStationId] = useState(parcoursData[0].id);
  const shouldReduceMotion = useReducedMotion();

  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' && index < parcoursData.length - 1) {
      setActiveStationId(parcoursData[index + 1].id);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveStationId(parcoursData[index - 1].id);
    }
  };

  const activeStation = parcoursData.find(s => s.id === activeStationId);

  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-slate-50 rounded-3xl border border-gray-100 p-6 md:p-8 shadow-inner max-w-5xl mx-auto space-y-8"
    >
      
      {/* 1. Titre et Indicateur */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 border-b border-gray-200/60 pb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🗺️</span>
          <motion.h3 
            variants={wordContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg font-black text-[#1b1464] tracking-tight uppercase"
          >
            {"Le Déroulement de votre Journée".split(" ").map((word, idx) => (
              <motion.span 
                key={idx} 
                variants={wordVariants} 
                className="inline-block mr-1.5"
              >
                {word}
              </motion.span>
            ))}
          </motion.h3>
        </div>
        <p className="sm:ml-auto text-xs font-bold text-gray-400 bg-white border border-gray-100 px-3 py-1 rounded-full shadow-sm">
          📍 Cliquez sur une étape pour voir les détails
        </p>
      </div>

      {/* 2. LE VISUEL DU PARCOURS */}
      <div className="relative pt-8 pb-4 px-2 overflow-x-auto md:overflow-x-visible scrollbar-none">
        <div className="min-w-[600px] md:min-w-full relative">
          
          {/* La ligne directrice (le chemin) */}
          <div className="absolute top-7 left-0 right-0 h-1 bg-gray-200 rounded-full z-0" />
          
          {/* Les stations (les points du parcours) */}
          <div className="flex justify-between items-center relative z-10">
            {parcoursData.map((station, index) => (
              <div key={station.id} className="flex flex-col items-center gap-3 flex-1">
                
                {/* Le point d'étape */}
                <button
                  onClick={() => setActiveStationId(station.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  aria-selected={activeStationId === station.id}
                  className={`group flex items-center justify-center transition-all duration-300 relative ${
                    activeStationId === station.id 
                      ? "w-14 h-14 bg-[#1b1464] border-4 border-white shadow-md scale-110" 
                      : "w-11 h-11 bg-white border border-gray-200 shadow-sm hover:border-[#1b1464]/50"
                  } rounded-full cursor-pointer`}
                >
                  <span className={`${activeStationId === station.id ? "text-xl" : "text-lg"}`}>
                    {station.icon}
                  </span>
                  
                  {/* Point lumineux d'état actif */}
                  {activeStationId === station.id && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-[#de3f6b] rounded-full border-2 border-white animate-pulse" />
                  )}
                </button>

                {/* Heure et Titre simplifié sous la bulle */}
                <div className="text-center space-y-0.5 max-w-[130px]">
                  <span className={`block text-xs font-black tracking-tight transition-colors ${
                    activeStationId === station.id ? "text-[#1b1464]" : "text-gray-500"
                  }`}>
                    {station.heure}
                  </span>
                  <span className={`block text-[11px] font-bold tracking-tight transition-colors leading-tight line-clamp-1 ${
                    activeStationId === station.id ? "text-[#1b1464]" : "text-gray-400"
                  }`}>
                    {station.titre}
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* 3. LE PANNEAU D'INFORMATION (La station sélectionnée) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm relative group overflow-hidden min-h-[140px]">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#de3f6b]/5 rounded-full group-hover:scale-110 transition-transform duration-500" />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStationId}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="relative z-10 space-y-2"
          >
            {/* Badge de l'étape */}
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#de3f6b]/10 text-[#de3f6b] border border-[#de3f6b]/10">
                Étape {parcoursData.indexOf(activeStation) + 1} • {activeStation.heure}
              </span>
            </div>
            
            {/* Titre & Description */}
            <h4 className="font-black text-lg md:text-xl text-[#1b1464] tracking-tight leading-tight">
              {activeStation.titre}
            </h4>
            <p className="text-xs font-medium text-gray-500 leading-relaxed max-w-3xl">
              {activeStation.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </motion.div>
  );
}