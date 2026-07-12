// Importation de tes briques isolées
import { motion, useReducedMotion } from 'framer-motion';
import HeroBanner from './HeroBanner';
import PresentationFiliere from './PresentationFiliere';
import DebouchesIntervenant from './DebouchesIntervenant';
import ContactActions from './ContactActions';

function DetailLoadingState({ onBack, shouldReduceMotion }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <motion.div
          animate={shouldReduceMotion ? {} : { opacity: [0.45, 1, 0.45], scale: [0.98, 1.03, 0.98] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-16 w-16 rounded-3xl bg-linear-to-br from-pourpre to-cyan shadow-lg shadow-pourpre/20"
        />

        <div className="w-full max-w-xl space-y-3 rounded-3xl border border-white bg-white/80 p-6 shadow-sm backdrop-blur-sm">
          <div className="h-4 w-2/3 rounded-full bg-slate-100" />
          <div className="h-3 w-full rounded-full bg-slate-100" />
          <div className="h-3 w-5/6 rounded-full bg-slate-100" />
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="h-24 rounded-2xl bg-slate-100" />
            <div className="h-24 rounded-2xl bg-slate-100" />
          </div>
        </div>

        <p className="text-sm font-black tracking-wide text-bleu">Chargement de la fiche complète...</p>
        {onBack && (
          <button onClick={onBack} className="text-xs font-bold underline text-gray-500">
            Retourner à l'accueil
          </button>
        )}
      </div>
    </div>
  );
}

function DetailMessageState({ title, message, onBack }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <div className="max-w-lg rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm">
        <p className="text-lg font-black text-bleu">{title}</p>
        <p className="mt-2 text-sm font-medium text-gray-500">{message}</p>
        {onBack && (
          <button
            onClick={onBack}
            className="mt-6 rounded-2xl bg-pourpre px-4 py-2 text-xs font-black text-white shadow-sm"
          >
            Retour à l'accueil
          </button>
        )}
      </div>
    </div>
  );
}

export default function FacultePage({ faculte, loading = true, error, onBack }) {
  const shouldReduceMotion = useReducedMotion();
  const title = faculte?.nom_complet ?? faculte?.nom_court ?? 'Fiche établissement';

  if (loading) {
    return <DetailLoadingState onBack={onBack} shouldReduceMotion={shouldReduceMotion} />;
  }

  if (error) {
    return (
      <DetailMessageState
        title="Impossible de charger la fiche"
        message={error.message || 'Une erreur est survenue pendant le chargement du JSON.'}
        onBack={onBack}
      />
    );
  }

  if (!faculte) {
    return (
      <DetailMessageState
        title="Fiche introuvable"
        message="Aucun établissement ne correspond à cet identifiant."
        onBack={onBack}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full bg-slate-50 min-h-screen"
    >

      {/* 1. ZONE HAUTE : HeroBanner avec gradient catégorie intégré */}
      <div className="p-4 md:p-8">
        <HeroBanner faculte={faculte} onBack={onBack} title={title} />
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
        <p className="text-xs font-black text-gray-300 uppercase tracking-[0.2em]">
          {title} — Orient'ini — 8ème édition — By Jeunes Ingénieurs de Djerba
        </p>
      </footer>
    </motion.div>
  );
}