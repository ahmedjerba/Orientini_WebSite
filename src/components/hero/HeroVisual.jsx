export default function HeroVisual() {
  return (
    <div className="flex justify-center items-center w-full relative min-h-[500px] overflow-hidden rounded-3xl bg-[#0d1527]">
      
      {/* ─── LES COUCHES DE DÉGRADÉ FLUIDE (Harmonisées avec l'affiche) ─── */}
      
      {/* Éclat Cyan / Turquoise (En haut à droite, rappelle les constellations) */}
      <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-cyan-500 blur-[120px] opacity-40 z-0 animate-pulse duration-[8000ms]"></div>
      
      {/* Éclat Rose / Pourpre Orient'ini (Centre-gauche, pour faire ressortir le logo) */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-[#e11d48] blur-[100px] opacity-30 z-0"></div>
      
      {/* Lueur d'ambiance Bleue Profonde (Ambiance générale de l'affiche) */}
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full bg-blue-600 blur-[90px] opacity-40 z-0"></div>
      
      {/* Touche Dorée subtile (Pour rappeler les étoiles/constellations de l'affiche) */}
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-amber-400 blur-[80px] opacity-20 z-0"></div>


      {/* ─── TON IMAGE DE L'AFFICHE (Au-dessus du dégradé) ─── */}
      <img 
        src="/logo_orientini.png" 
        alt="Illustration Hero Orient'ini" 
        className="w-full max-w-md lg:max-w-lg object-contain relative z-10 drop-shadow-[0_25px_60px_rgba(6,182,212,0.15)] transform hover:scale-[1.02] transition-transform duration-500" 
      />


      {/* ─── SIGNATURE AMÉLIORÉE ─── */}
      <div className="absolute bottom-4 text-[10px] text-white/70 font-bold uppercase tracking-widest z-10 backdrop-blur-md px-4 py-1.5 rounded-full bg-white/5 border border-white/10">
        By Jeunes Ingénieurs de Djerba
      </div>

    </div>
  );
}