
import Navbar from './components/Navbar';
// Une fois créés, tu pourras décommenter ces vrais imports :
import HeroSection from './components/HeroSection';
// import Programme from './components/Programme';
// import Facultes from './components/Facultes';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col antialiased selection:bg-[#78bec3]/30">
      
      {/* =========================================================
          1. TEST DE LA NAVBAR (Déjà opérationnelle et responsive)
         ========================================================= */}
      <Navbar />

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main className="flex-grow">
        
        {/* =========================================================
            2. TEST DE LA HERO SECTION (Accueil)
           ========================================================= */}
        <section id="home" className="py-12 border-b border-gray-100 bg-slate-50">
          <HeroSection /> {/* Une fois créé, remplace la balise de fermeture par : <HeroSection /> */}
        </section>

        {/* =========================================================
            3. TEST DE LA SECTION PROGRAMME (PREPA / BAC)
           ========================================================= */}
        <section id="programme" className="py-12 border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xs font-bold text-[#de3f6b] uppercase tracking-wider mb-2">Zone de Test :</h2>
            
            {/* Quand tu auras créé le composant, remplace la div ci-dessous par : <Programme /> */}
            <div className="p-8 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 font-medium">
              [ 📅 Le composant <span className="text-[#1b1464] font-bold">Programme.jsx</span> s'affichera ici ]
            </div>
          </div>
        </section>

        {/* =========================================================
            4. TEST DE LA SECTION RECHERCHE DES FACS
           ========================================================= */}
        <section id="facultes" className="py-12 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-xs font-bold text-[#de3f6b] uppercase tracking-wider mb-2">Zone de Test :</h2>
            
            {/* Quand tu auras créé le composant, remplace la div ci-dessous par : <Facultes /> */}
            <div className="p-8 bg-white rounded-2xl border-2 border-dashed border-gray-200 text-center text-gray-400 font-medium">
              [ 🔍 Le composant <span className="text-[#1b1464] font-bold">Facultes.jsx</span> s'affichera ici ]
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER FIXE */}
      <footer className="bg-[#1b1464] text-white text-center py-4 text-xs font-bold tracking-wide">
        © 2026 JID — Jeunes Ingénieurs de Djerba | 8ème édition d'Orient'ini
      </footer>

    </div>
  );
}