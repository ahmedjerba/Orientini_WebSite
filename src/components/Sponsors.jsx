export default function Sponsors() {
  const sponsors = [
    { id: 1, name: "Bricola", logo: "/logos_sponsors/Bricola.jpg" },
    { id: 2, name: "Altec", logo: "/logos_sponsors/Altec.jpg" },
    { id: 3, name: "L'Intégrale", logo: "/logos_sponsors/Intégrale.jpg" },
    { id: 4, name: "Ordre des Ingénieurs Tunisiens", logo: "/logos_sponsors/Ordre.jpg" },
    { id: 5, name: "Espace Salim", logo: "/logos_sponsors/Salim.jpg" },
    { id: 6, name: "Gros Frais", logo: "/logos_sponsors/Gros_Frais.jpg" },
    { id: 7, name: "Codifa", logo: "/logos_sponsors/Codifa.jpg" },
    { id: 8, name: "Halloumi Céram", logo: "/logos_sponsors/Halloumi.jpg" },
    { id: 9, name: "Amen Détergents", logo: "/logos_sponsors/Amen.jpg" },
    { id: 10, name: "Tout est Casa", logo: "/logos_sponsors/Tout_Casa.jpg" },
  ];

  return (
    <section id="sponsors" className="py-20 bg-gradient-to-b from-white to-slate-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 space-y-12">

        {/* En-tête au design premium */}
        <div className="text-center space-y-3">
          <span className="inline-block px-3.5 py-1 text-[10px] font-black uppercase tracking-widest text-[#de3f6b] bg-[#de3f6b]/10 rounded-full">
            Soutiens Officiels
          </span>
          <h2 className="text-3xl font-black text-[#1b1464] tracking-tight sm:text-4xl">
            🤝 Ils nous ont fait Confiance
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto leading-relaxed">
            Ces partenaires soutiennent l'édition d'Orient'ini et contribuent activement à guider nos futurs ingénieurs.
          </p>
        </div>

        {/* Grille responsive de cartes surélevées */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.id}
              className="flex flex-col items-center justify-center p-5 sm:p-7 bg-white rounded-3xl border border-gray-100/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:-translate-y-1 hover:border-[#78bec3]/30 hover:shadow-[0_20px_40px_rgba(120,190,195,0.08)] transition-all group duration-300"
            >
              {/* Conteneur de Logo circulaire en plein écran */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center ring-4 ring-slate-50 group-hover:ring-[#78bec3]/20 shadow-inner group-hover:scale-105 transition-all duration-300 mb-4 overflow-hidden">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {/* Nom du Sponsor */}
              <span className="text-xs sm:text-sm font-black text-gray-700 group-hover:text-[#1b1464] transition-colors text-center line-clamp-2 px-1">
                {sponsor.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
