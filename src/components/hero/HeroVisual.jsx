export default function HeroVisual() {
  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-sm aspect-square bg-gradient-to-tr from-bleu via-[#1a1c4b] to-pourpre rounded-3xl shadow-2xl flex flex-col items-center justify-center p-8 overflow-hidden group border-4 border-white">
        <div className="absolute -inset-10 bg-gradient-to-br from-cyan to-pourpre opacity-30 blur-2xl group-hover:opacity-40 transition-opacity" />
        
        <div className="relative z-10 text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-500">
            <span className="text-4xl font-black bg-gradient-to-tr from-pourpre to-bleu bg-clip-text text-transparent">O'</span>
          </div>
          <div>
            <h3 className="text-white text-3xl font-black tracking-tighter">
              Orient'<span className="text-cyan">ini</span>
            </h3>
            <p className="text-jaune text-xs font-bold tracking-widest uppercase mt-1">
              7th Edition 2026
            </p>
          </div>
          <div className="pt-4 border-t border-white/10 text-gray-300 text-xs font-medium tracking-wide">
            #Unlock_your_next_chapter
          </div>
        </div>

        <div className="absolute bottom-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
          By Jeunes Ingénieurs de Djerba
        </div>
      </div>
    </div>
  );
}