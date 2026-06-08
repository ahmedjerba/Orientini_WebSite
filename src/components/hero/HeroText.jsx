export default function HeroText() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-cyan/10 text-bleu border border-cyan/20">
        ✨ 7ème Édition — #Unlock_your_next_chapter
      </span>

      {/* Slogan */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-bleu leading-tight tracking-tight">
        Trouvez votre voie. <br />
        <span className="text-pourpre inline-block mt-2">
          Rencontrez votre future faculté.
        </span>
      </h1>

      {/* Description */}
      <p className="text-gray-500 text-base md:text-lg max-w-xl font-medium leading-relaxed">
        Le grand rendez-vous d'orientation académique organisé par les Jeunes Ingénieurs de Djerba. Ne manquez pas nos sessions en ligne et notre grand salon physique.
      </p>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2">
        <a 
          href="https://forms.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-pourpre text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-lg shadow-pourpre/30 hover:bg-[#c8325c] hover:scale-105 active:scale-95 transition-all text-center"
        >
          🚀 Rejoindre l'événement
        </a>
        <a 
          href="#programme"
          className="bg-slate-100 hover:bg-slate-200 text-bleu px-8 py-4 rounded-full font-bold text-sm tracking-wide transition-all text-center border border-slate-200"
        >
          Voir le Programme
        </a>
      </div>
    </div>
  );
}