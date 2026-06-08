import { useState } from 'react';
import LittleCard from "./LittleCard";

export default function CategoryRow({ title, facultes, onCardClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Nombre de cartes visibles en même temps sur grand écran
  const cardsVisible = 3;

  // Fonctions de navigation avec boucle infinie
  const nextSlide = () => {
    if (currentIndex < facultes.length - cardsVisible) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Revient au tout début
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(Math.max(0, facultes.length - cardsVisible)); // Va à la fin
    }
  };

  // Si la catégorie est vide dans le JSON, on n'affiche rien du tout
  if (!facultes || facultes.length === 0) return null;

  return (
    <div className="space-y-4 relative py-2">
      
      {/* EN-TÊTE DE LA LIGNE (Titre + Boutons de navigation) */}
      <div className="flex justify-between items-center px-1">
        <h3 className="text-base font-black text-[#1b1464] tracking-tight uppercase border-l-4 border-[#de3f6b] pl-3 flex items-center gap-2">
          {title} 
          <span className="text-[11px] font-bold text-gray-400 lowercase bg-slate-100 px-2 py-0.5 rounded-full">
            {facultes.length} {facultes.length > 1 ? 'établissements' : 'établissement'}
          </span>
        </h3>
        
        {/* Les flèches ne s'affichent que s'il y a plus de 3 écoles dans la catégorie */}
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

      {/* CONTENEUR DU CAROUSEL (Masque tout ce qui dépasse) */}
      <div className="overflow-hidden w-full rounded-2xl p-1">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ 
            // Décale la ligne dynamiquement en fonction de l'index actuel
            transform: `translateX(-${currentIndex * (100 / cardsVisible)}%)` 
          }}
        >
          {facultes.map((fac) => (
            <LittleCard
              key={fac.id} 
              fac={fac} 
              onClick={() => onCardClick(fac)} 
            />
          ))}
        </div>
      </div>

    </div>
  );
}