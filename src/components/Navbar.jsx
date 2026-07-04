import { useState } from 'react';

export default function Navbar({ onHomeClick, onSearchClick }) {
  // State pour ouvrir/fermer le menu burger sur mobile
  const [isOpen, setIsOpen] = useState(false);
  // State pour afficher le tooltip JID sur mobile lors du premier clic
  const [showMobileTooltip, setShowMobileTooltip] = useState(false);

  const handleMobileJIDClick = (e) => {
    if (!showMobileTooltip) {
      e.preventDefault();
      setShowMobileTooltip(true);
      // Masquer automatiquement après 3 secondes
      setTimeout(() => {
        setShowMobileTooltip(false);
      }, 3000);
    }
  };

  const handleHomeClick = (e) => {
    if (onHomeClick) {
      onHomeClick();
    }
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (onSearchClick) {
      onSearchClick();
    }
  };

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* CÔTÉ GAUCHE : LOGO ORIENT'INI */}
        <div 
          onClick={handleHomeClick}
          className="flex items-center gap-2.5 max-w-[200px] cursor-pointer"
        >
          <img 
            src="/logo_orientini.png" 
            alt="Orient'ini Logo" 
            className="h-10 w-auto object-contain" 
          />
        </div>

        {/* CENTRE : NAVIGATION PC (Cachée sur Mobile) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide text-gray-600">
          <a 
            href="#home" 
            onClick={handleHomeClick}
            className="text-[#de3f6b] border-b-2 border-[#de3f6b] pb-1 transition-all"
          >
            Accueil
          </a>
          <a 
            href="#programme" 
            onClick={handleHomeClick}
            className="hover:text-[#de3f6b] hover:border-b-2 hover:border-[#de3f6b] pb-1 transition-all"
          >
            Programme
          </a>
          <a 
            href="#facultes" 
            onClick={handleSearchClick}
            className="hover:scale-105 transition-transform bg-[#f5d203]/20 text-[#1b1464] px-4 py-2 rounded-xl flex items-center gap-1.5 font-extrabold"
          >
            🔍 Trouver une Fac
          </a>
        </div>

        {/* CÔTÉ DROIT : LOGO JID & CTA (PC) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="text-right">
            <a 
              href="https://jidjerba.tn/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative flex items-center"
            >
              {/* Bulle Tooltip */}
              <span className="absolute right-12 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1b1464] text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 translate-x-1.5 transition-all duration-300">
                Veux-tu nous rejoindre ? 🚀
                {/* Flèche du tooltip vers la droite */}
                <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#1b1464]"></span>
              </span>

              <img 
                src="/logo_jid.png" 
                alt="JID Logo" 
                className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-300" 
              />
            </a>
          </div>
        </div>

        {/* BOUTON BURGER ET LOGO JID (Visible uniquement sur Mobile) */}
        <div className="md:hidden flex items-center gap-3">
          <a 
            href="https://jidjerba.tn/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative flex items-center"
            onClick={handleMobileJIDClick}
          >
            {/* Bulle Tooltip Mobile */}
            <span className={`absolute right-10 top-1/2 -translate-y-1/2 whitespace-nowrap bg-[#1b1464] text-white text-[11px] font-black px-3 py-1.5 rounded-xl shadow-lg transition-all duration-300 ${
              showMobileTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 pointer-events-none translate-x-1.5'
            }`}>
              Veux-tu nous rejoindre ? 🚀
              {/* Flèche du tooltip vers la droite */}
              <span className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-0 h-0 border-y-4 border-y-transparent border-l-[6px] border-l-[#1b1464]"></span>
            </span>

            <img 
              src="/logo_jid.png" 
              alt="JID Logo" 
              className="w-8 h-8 object-contain hover:scale-110 transition-transform duration-300" 
            />
          </a>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="text-[#1b1464] focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                // Icône Croix (Fermer)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              ) : (
                // Icône Hamburger (Ouvrir)
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* MENU DÉROULANT MOBILE (S'affiche uniquement si isOpen est true) */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-slate-50 rounded-2xl p-4 border border-gray-100 flex flex-col gap-4 animate-fadeIn shadow-sm">
          <a 
            onClick={(e) => { setIsOpen(false); handleHomeClick(e); }} 
            href="#home" 
            className="font-bold text-gray-700 hover:text-[#de3f6b] p-2 rounded-lg transition-colors"
          >
            🏠 Accueil
          </a>
          <a 
            onClick={(e) => { setIsOpen(false); handleHomeClick(e); }} 
            href="#programme" 
            className="font-bold text-gray-700 hover:text-[#de3f6b] p-2 rounded-lg transition-colors"
          >
            📅 Programme
          </a>
          <a 
            onClick={(e) => { setIsOpen(false); handleSearchClick(e); }} 
            href="#facultes" 
            className="font-extrabold text-[#1b1464] bg-[#f5d203]/30 p-3 rounded-xl transition-colors flex items-center gap-2"
          >
            🔍 Trouver une Faculté
          </a>
          
          <hr className="border-gray-200 my-1" />
          
          {/* Bouton d'inscription sur mobile */}
          <a 
            href="https://forms.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#de3f6b] text-white text-center py-3 rounded-xl font-bold uppercase tracking-wider text-sm shadow-sm active:scale-95 transition-all"
          >
            S'inscrire (Google Form)
          </a>
        </div>
      )}
    </nav>
  );
}