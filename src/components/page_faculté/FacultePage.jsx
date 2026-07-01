// Importation de tes briques isolées
import HeroBanner from './HeroBanner';
import PresentationFiliere from './PresentationFiliere';
import DebouchesIntervenant from './DebouchesIntervenant';
import ContactActions from './ContactActions';

export default function FacultePage({ faculte, onBack }) {
  // Sécurité : si aucune faculté n'est sélectionnée ou trouvée dans le JSON
  if (!faculte) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8">
        <p className="text-[#1b1464] font-black">Chargement des données...</p>
        <button onClick={onBack} className="mt-4 text-xs font-bold underline">Retourner à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* 1. ZONE HAUTE : Immersion totale avec la Banner & le bouton Retour */}
      <div className="p-4 md:p-8">
        <HeroBanner faculte={faculte} onBack={onBack} />
      </div>

      {/* 2. ZONE DE CONTENU : Grille structurée */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* COLONNE GAUCHE (Largeur 2/3 sur PC - 65%) */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Bloc Présentation & Spécialités */}
            <section>
               <PresentationFiliere faculte={faculte} />
            </section>

            {/* Bloc Débouchés & Mot de l'intervenant */}
            <section>
               <DebouchesIntervenant faculte={faculte} />
            </section>
            
          </div>

          {/* COLONNE DROITE (Largeur 1/3 sur PC - 35%) */}
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-8">

            {/* Bloc Coordonnées & Actions */}
            <section>
              <ContactActions faculte={faculte} />
            </section>

          </div>

        </div>
      </main>

      {/* Footer Orient'ini */}
      <footer className="py-10 text-center">
        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
          Orient'ini — 8ème édition — By Jeunes Ingénieurs de Djerba
        </p>
      </footer>
    </div>
  );
}