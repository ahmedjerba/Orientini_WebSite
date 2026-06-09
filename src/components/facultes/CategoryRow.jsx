import { useState, useEffect } from 'react';
import LittleCard from "./LittleCard";

export default function CategoryRow({ title, facultes, onCardClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(3);
  
  // États pour le swipe tactile
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // 1. Gestion responsive du nombre de cartes visibles
  useEffect(() => {
    const updateCarousel = () => {
      let visible = 3;
      if (window.innerWidth < 640) {
        visible = 1;      // Mobile (Smartphone)
      } else if (window.innerWidth < 1024) {
        visible = 2;      // Tablette
      } else {
        visible = 3;      // PC / Écrans larges
      }

      setCardsVisible(visible);

      // Sécurité : recalcule l'index si la fenêtre change de taille
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, facultes.length - visible);
        return prevIndex > maxIndex ? maxIndex : prevIndex;
      });
    };

    updateCarousel();
    window.addEventListener('resize', updateCarousel);
    return () => window.removeEventListener('resize', updateCarousel);
  }, [facultes.length]);

  // 2. Fonctions de navigation (flèches et swipe)
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

  // 3. Gestionnaires d'événements tactiles (Swipe)
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    
    const difference = touchStartX - touchEndX;
    const minSwipeDistance = 50; // Seuil en pixels

    if (difference > minSwipeDistance) {
      nextSlide(); // Swipe gauche -> Suivant
    } else if (difference < -minSwipeDistance) {
      prevSlide(); // Swipe droite -> Précédent
    }

    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (!facultes || facultes.length === 0) return null;

  return (
    <div className="space-y-4 relative py-2 w-full max-w-full overflow-hidden">
      
      {/* EN-TÊTE RESPONSIVE (S'empile sur petit mobile, s'aligne sur PC) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-2">
        <h3 className="text-sm sm:text-base font-black text-[#1b1464] tracking-tight uppercase border-l-4 border-[#de3f6b] pl-3 flex flex-wrap items-center gap-2">
          {title} 
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 lowercase bg-slate-100 px-2 py-0.5 rounded-full whitespace-nowrap">
            {facultes.length} {facultes.length > 1 ? 'établissements' : 'établissement'}
          </span>
        </h3>
        
        {/* BOUTONS FLÈCHES RESPONSIVES (Masqués si pas assez de cartes) */}
        {facultes.length > cardsVisible && (
          <div className="flex gap-2 self-end sm:self-auto">
            <button 
              onClick={prevSlide} 
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Précédent"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide} 
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95 cursor-pointer touch-manipulation"
              aria-label="Suivant"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* ZONE DE GRILLE / CAROUSEL RESPONSIVE */}
      <div 
        className="overflow-hidden w-full rounded-2xl px-1 py-1 touch-pan-y cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex gap-3 sm:gap-4 transition-transform duration-500 ease-out"
          style={{ 
            transform: `translateX(calc(-${currentIndex} * (100% / ${cardsVisible}) - (${currentIndex} * ${window.innerWidth < 640 ? '0.75rem' : '1rem'} / ${cardsVisible})))`
          }}
        >
          {facultes.map((fac) => (
            <div 
              key={fac.id} 
              style={{ 
                // Adapte dynamiquement la largeur en fonction de l'espace des gaps (gap-3 sur mobile vs gap-4 sur PC)
                width: `calc((100% - (${cardsVisible} - 1) * ${window.innerWidth < 640 ? '0.75rem' : '1rem'}) / ${cardsVisible})` 
              }}
              className="flex-shrink-0 w-full"
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