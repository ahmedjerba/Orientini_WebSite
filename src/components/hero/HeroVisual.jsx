export default function HeroVisual() {
  return (
    <div className="flex justify-center items-center w-full relative min-h-[500px] overflow-hidden rounded-3xl">
      
      {/* ─── LES COUCHES DE DÉGRADÉ FLUIDE (Arrière-plan) ─── */}
      {/* Tache Bleu (Fond principal) */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-bleu blur-[80px] opacity-70 z-0 animate-pulse duration-[6000ms]"></div>
      
      {/* Tache Pourpre (Éclat gauche) */}
      <div className="absolute bottom-1/4 -left-12 w-64 h-64 rounded-full bg-pourpre blur-[90px] opacity-60 z-0"></div>
      
      {/* Tache Cyan (Lumière centre-droit) */}
      <div className="absolute top-12 right-12 w-80 h-80 rounded-full bg-cyan blur-[100px] opacity-50 z-0"></div>
      
      {/* Tache Jaune (Touche de peps en haut à gauche) */}
      <div className="absolute -top-12 left-12 w-48 h-48 rounded-full bg-jaune blur-[70px] opacity-30 z-0"></div>


      {/* ─── TON IMAGE DE L'AFFICHE (Au-dessus du dégradé) ─── */}
      <img 
        src="/logo_orientini.png" 
        alt="Illustration Hero" 
        className="w-full max-w-md lg:max-w-lg object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(27,20,100,0.3)] transform hover:scale-[1.02] transition-transform duration-500" 
      />


      {/* ─── SIGNATURE ─── */}
      <div className="absolute bottom-4 text-[10px] text-blanc/60 font-bold uppercase tracking-widest z-10 backdrop-blur-sm px-3 py-1 rounded-full bg-bleu/10">
        By Jeunes Ingénieurs de Djerba
      </div>

    </div>
  );
}