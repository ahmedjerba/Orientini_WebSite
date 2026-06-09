import { useState, useEffect } from 'react';
import LittleCard from "./LittleCard";

export default function CategoryRow({ title, facultes, onCardClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(3); // 3 par défaut (PC)

  // 1. Écoute de la taille de l'écran pour adapter le nombre de cartes
  useEffect(() => {
    const updateCardsVisible = () => {
      if (window.innerWidth < 640) {
        setCardsVisible(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setCardsVisible(2); // Tablette
      } else {
        setCardsVisible(3); // PC grand écran
      }
    };

    updateCardsVisible();
    window.addEventListener('resize', updateCardsVisible);
    
    return () => window.removeEventListener('resize', updateCardsVisible);
  }, []);

  // 2. Sécurité pour éviter que l'index dépasse la fin si on agrandit l'écran
  useEffect(() => {
    const maxIndex = Math.max(0, facultes.length - cardsVisible);
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [cardsVisible, facultes.length, currentIndex]);

  // 3. Fonctions de navigation
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
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95"
              aria-label="Précédent"
            >
              ◀
            </button>
            <button 
              onClick={nextSlide} 
              className="bg-white hover:bg-slate-50 border border-gray-200 text-[#1b1464] w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all shadow-sm active:scale-95"
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
          className="flex transition-transform duration-500 ease-out"
          style={{ 
            // Translate exactement selon la fraction de cartes visibles
            transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)` 
          }}
        >
          {facultes.map((fac) => (
            <div 
              key={fac.id} 
              // Assure une synchronisation parfaite entre la taille de la carte et le décalage
              style={{ width: `${100 / cardsVisible}%` }}
              className="flex-shrink-0 px-2"
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