import { useState } from 'react';

// Données des conférences adaptées pour un parcours (avec icônes thématiques)
const parcoursData = [
  {
    id: 1,
    heure: "10:00",
    titre: "Méthodes Prépa",
    description: "Réussir son entrée : méthodes et pièges à éviter.",
    intervenant: "Khalil, Major IPEIT",
    icon: "🎓"
  },
  {
    id: 2,
    heure: "11:00",
    titre: "Filières d'Avenir",
    description: "IA, Big Data et Cybersécurité : les débouchés porteurs.",
    intervenant: "Table ronde ENSI",
    icon: "💻"
  },
  {
    id: 3,
    heure: "14:00",
    titre: "Bourses & Étranger",
    description: "Tout savoir sur les aides et les cursus internationaux.",
    intervenant: "Ministère Orientation",
    icon: "🌍"
  },
  {
    id: 4,
    heure: "15:15",
    titre: "Ingénieur Alternance",
    description: "Mode d'emploi et entreprises partenaires pour se lancer.",
    intervenant: "DRH Entreprises Tech",
    icon: "🤝"
  }
];

export default function Programme() {
  const [activeStationId, setActiveStationId] = useState(parcoursData[0].id);

  // Pour changer de station avec les flèches du clavier (bonus d'accessibilité)
  const handleKeyDown = (e, index) => {
    if (e.key === 'ArrowRight' && index < parcoursData.length - 1) {
      setActiveStationId(parcoursData[index + 1].id);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      setActiveStationId(parcoursData[index - 1].id);
    }
  };

  const activeStation = parcoursData.find(s => s.id === activeStationId);

  return (
    <div className="w-full bg-slate-50 rounded-3xl border border-gray-100 p-8 shadow-inner max-w-5xl mx-auto space-y-10">
      
      {/* 1. Titre et Indicateur */}
      <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
        <span className="text-3xl">🗺️</span>
        <h3 className="text-xl font-black text-[#1b1464] tracking-tight">
          Votre Parcours de Conférences
        </h3>
        <p className="ml-auto text-sm font-medium text-gray-500">
          Sélectionnez une station pour voir les détails
        </p>
      </div>

      {/* 2. LE VISUEL DU PARCOURS (Timeline/Chemin) */}
      <div className="relative pt-12 pb-6 px-4">
        {/* La ligne directrice (le chemin) */}
        <div className="absolute top-[calc(50%+12px)] left-0 right-0 h-1 bg-gray-200 rounded-full" />
        
        {/* Les stations (les points du parcours) */}
        <div className="flex justify-between items-center gap-4 relative z-10">
          {parcoursData.map((station, index) => (
            <div key={station.id} className="flex flex-col items-center gap-3">
              {/* Le point d'étape */}
              <button
                onClick={() => setActiveStationId(station.id)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                aria-selected={activeStationId === station.id}
                title={`Cliquez pour voir : ${station.titre}`}
                className={`group flex items-center justify-center transition-all duration-300 relative ${
                  activeStationId === station.id 
                    ? "w-16 h-16 bg-[#1b1464] border-4 border-white shadow-lg scale-110" 
                    : "w-12 h-12 bg-white border border-gray-200 shadow-sm hover:border-[#1b1464]"
                } rounded-full`}
              >
                <span className={`${
                  activeStationId === station.id ? "text-2xl" : "text-xl"
                }`}>
                  {station.icon}
                </span>
                
                {/* Icône de statut "Actif" */}
                {activeStationId === station.id && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#de3f6b] rounded-full border-2 border-white animate-pulse" />
                )}
              </button>

              {/* L'heure et le titre abrégé */}
              <div className="text-center space-y-1 max-w-[100px]">
                <span className={`block text-sm font-black transition-colors ${
                  activeStationId === station.id ? "text-[#1b1464]" : "text-gray-500"
                }`}>
                  {station.heure}
                </span>
                <span className={`block text-[11px] font-bold tracking-tight transition-colors ${
                  activeStationId === station.id ? "text-[#1b1464]" : "text-gray-400"
                }`}>
                  {station.titre}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LE PANNEAU D'INFORMATION (La station sélectionnée) */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm transition-all duration-500 transform scale-100 relative group overflow-hidden">
        
        {/* Élément de décoration graphique (bonus) */}
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#de3f6b]/5 rounded-full group-hover:scale-125 transition-transform" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          {/* Bloc Titre et Description */}
          <div className="space-y-2 flex-1 min-w-0">
            <span className="inline-block text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-[#de3f6b]/10 text-[#de3f6b] border border-[#de3f6b]/10">
              Station {parcoursData.indexOf(activeStation) + 1} • {activeStation.heure}
            </span>
            <h4 className="font-black text-lg md:text-xl text-[#1b1464] tracking-tight leading-tight">
              {activeStation.titre}
            </h4>
            <p className="text-xs font-medium text-gray-600">
              {activeStation.description}
            </p>
          </div>

          {/* Bloc Intervenant (à droite sur PC) */}
          <div className="shrink-0 md:text-right space-y-1 md:pl-6 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0">
            <span className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">
              Intervenant
            </span>
            <span className="block text-sm font-black text-[#1b1464]">
              {activeStation.intervenant}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
}