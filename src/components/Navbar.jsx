import { useState } from 'react'; //  Garde uniquement ça !
export default function Navbar() {
  // State pour ouvrir/fermer le menu burger sur mobile
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* CÔTÉ GAUCHE : LOGO ORIENT'INI */}
        <div className="flex items-center gap-2.5 max-w-[200px]"> {/* Conteneur large mais limité */}
  {/* L'image contrôle maintenant sa propre taille. 'w-auto' et 'h-full' la font s'ajuster à la hauteur du conteneur en conservant son ratio (longueur). */}
  <img 
    src="/logo_orientini.png" 
    alt="Orient'ini Logo" 
    className="h-10 w-auto object-contain" 
  />
</div>

        {/* CENTRE : NAVIGATION PC (Cachée sur Mobile) */}
        <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-wide text-gray-600">
          <a href="#home" className="text-[#de3f6b] border-b-2 border-[#de3f6b] pb-1 transition-all">
            Accueil
          </a>
          <a href="#programme" className="hover:text-[#de3f6b] hover:border-b-2 hover:border-[#de3f6b] pb-1 transition-all">
            Programme
          </a>
          <a 
            href="#facultes" 
            className="hover:scale-105 transition-transform bg-[#f5d203]/20 text-[#1b1464] px-4 py-2 rounded-xl flex items-center gap-1.5 font-extrabold"
          >
            🔍 Trouver une Fac
          </a>
        </div>

        {/* CÔTÉ DROIT : LOGO JID & CTA (PC) */}
        <div className="hidden md:flex items-center gap-5">
          <div className="text-right">
            <img src="/logo_jid.png" alt="JID Logo" className="w-10 h-10 object-contain" />
          </div>
        </div>

        {/* BOUTON BURGER (Visible uniquement sur Mobile) */}
        <div className="md:hidden flex items-center">
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
            onClick={() => setIsOpen(false)} 
            href="#home" 
            className="font-bold text-gray-700 hover:text-[#de3f6b] p-2 rounded-lg transition-colors"
          >
            🏠 Accueil
          </a>
          <a 
            onClick={() => setIsOpen(false)} 
            href="#programme" 
            className="font-bold text-gray-700 hover:text-[#de3f6b] p-2 rounded-lg transition-colors"
          >
            📅 Programme
          </a>
          <a 
            onClick={() => setIsOpen(false)} 
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