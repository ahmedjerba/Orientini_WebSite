export default function HeroText() {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
      {/* Badge */}
      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wider uppercase bg-cyan/10 text-bleu border border-cyan/20">
        ✨ 8ème Édition — #Unlock_your_next_chapter
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
        Le grand rendez-vous d'orientation académique organisé par les Jeunes Ingénieurs de Djerba.
      </p>
      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto items-center pt-4">
        <a
          href="https://near.tl/sm/nIXQgB1Zu"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto bg-gradient-to-r from-pourpre via-[#f5d203] to-pourpre bg-[length:200%_auto] text-white px-10 py-5 rounded-full font-black text-base uppercase tracking-widest shadow-lg shadow-pourpre/30 hover:bg-right transition-all duration-500 animate-bounce [animation-duration:3s] text-center"
        >
          <span>🚀</span> REJOINDRE L'ÉVÉNEMENT
        </a>

        <a
          href="#programme"
          className="w-full sm:w-auto bg-slate-100/80 hover:bg-slate-200/80 text-bleu px-7 py-4 rounded-full font-bold text-sm tracking-wide transition-all duration-300 text-center border border-slate-200/60"
        >
          Voir le Programme
        </a>
      </div>
    </div>
  );
}