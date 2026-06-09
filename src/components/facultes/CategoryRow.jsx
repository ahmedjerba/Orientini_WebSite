import { useState, useEffect } from 'react';
import LittleCard from "./LittleCard";

export default function CategoryRow({ title, facultes, onCardClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(3);

  // 1. On gère TOUT dans un seul useEffect au redimensionnement
  useEffect(() => {
    const updateCarousel = () => {
      let visible = 3;
      if (window.innerWidth < 640) {
        visible = 1; // Mobile
      } else if (window.innerWidth < 1024) {
        visible = 2; // Tablette
      } else {
        visible = 3; // PC
      }

      setCardsVisible(visible);

      // On ajuste l'index immédiatement ici pour éviter le conflit d'état décalé
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, facultes.length - visible);
        return prevIndex > maxIndex ? maxIndex : prevIndex;
      });
    };

    // Initialisation au montage
    updateCarousel();

    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [facultes.length]); // S'exécute si la liste de données change

  // 2. Fonctions de navigation
  const nextSlide = () => {
    if (currentIndex < facultes.length - cardsVisible) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Boucle au début
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, facultes.length - cardsVisible)); // Boucle à la fin
    }
  };

  if (!facultes || facultes.length === 0) return null;

  return (
    <div className="space-y-4 relative py-2">
      
      {/* EN-TÊTE (Titre + Flèches) */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-base font-black text-[#1b1464] tracking-tight uppercase border-l-4 border-[#de3f6b] pl-3 flex items-center gap-2">
          {title} 
          <span className="text-[11px] font-bold text-gray-400 lowercase bg-slate-100 px-2 py-0.5 rounded-full">
            {facultes.length} {facultes.length > 1 ? 'établissements' : 'établissement'}
          </span>
        </h3>
        
        {facultes.length > cardsVisible && (
          <div className="flex gap-2">
            <button 
              onClick={prevSlide} 
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Précédent"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide} 
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Suivant"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* CONTENEUR DU CAROUSEL */}
      <div className="overflow-hidden w-full rounded-2xl p-1">
        <div 
          className="flex gap-4 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(calc(-${currentIndex} * (100% / ${cardsVisible}) - (${currentIndex} * 1rem / ${cardsVisible})))`
          }}
        >
          {facultes.map((fac) => (
            <div 
              key={fac.id} 
              style={{ 
                width: `calc((100% - (${cardsVisible} - 1) * 1rem) / ${cardsVisible})` 
              }}
              className="flex-shrink-0"
            >
              <LittleCard
                fac={fac} 
                onClick={() => onCardClick(fac)} 
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}