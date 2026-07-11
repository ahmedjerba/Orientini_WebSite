import { useRef, useState, useEffect } from 'react';
import { useReducedMotion } from 'framer-motion';

// ─── Compteur animé : 0 → valeur cible en ~600ms ───────────────────────────
// Déclenché une seule fois lorsque l'élément entre dans le viewport.
// Respecte prefers-reduced-motion : si réduit, affiche directement la valeur.
function AnimatedScore({ value }) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(() =>
    prefersReducedMotion ? value : 0
  );
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.disconnect();

          const duration = 600;
          const startTime = performance.now();
          const numericTarget = parseFloat(value);

          // Si la valeur n'est pas un nombre, afficher directement
          if (isNaN(numericTarget)) {
            setDisplayed(value);
            return;
          }

          const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = numericTarget * eased;

            // Conserver le même nombre de décimales que la valeur cible
            const decimals = String(value).includes('.') ? String(value).split('.')[1].length : 0;
            setDisplayed(current.toFixed(decimals));

            if (progress < 1) {
              requestAnimationFrame(tick);
            } else {
              setDisplayed(value);
            }
          };

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefersReducedMotion]);

  return (
    <span
      ref={ref}
      className="text-xs font-black text-[#1b1464] tabular-nums bg-slate-50 px-2 py-1 rounded-md"
    >
      {displayed}
    </span>
  );
}

// ─── Composant principal ────────────────────────────────────────────────────
export default function Selectivite({ faculte }) {
  // Extraction sécurisée de l'objet score_derniere_annee
  const { score_derniere_annee = {} } = faculte || {};

  // Dictionnaire pour formater proprement les clés du JSON
  const bacConfig = {
    bac_math: { label: "Bac Math", emoji: "📊" },
    bac_sc: { label: "Bac Sciences", emoji: "🧪" },
    bac_info: { label: "Bac Info", emoji: "💻" },
    bac_tech: { label: "Bac Technique", emoji: "⚙️" },
    bac_eco: { label: "Bac Éco", emoji: "📈" },
    bac_let: { label: "Bac Lettres", emoji: "📚" },
    bac_sport: { label: "Bac Sport", emoji: "🏃" }
  };

  // On ne garde que les clés présentes dans score_derniere_annee et définies
  const scoresEntries = Object.keys(bacConfig)
    .filter(key => score_derniere_annee[key] !== undefined && score_derniere_annee[key] !== null && score_derniere_annee[key] !== 0 && score_derniere_annee[key] !== "")
    .map(key => [key, score_derniere_annee[key]]);

  return (
    <div className="bg-[#de3f6b]/5 border-2 border-[#de3f6b]/10 rounded-3xl p-6 flex flex-col justify-between shadow-sm h-full">

      {/* En-tête du bloc */}
      <div>
        <span className="text-xs font-black text-[#de3f6b] uppercase tracking-widest bg-white border border-[#de3f6b]/20 px-2.5 py-0.5 rounded-md shadow-sm">
          Sélectivité
        </span>
        <h3 className="text-sm font-black text-[#1b1464] mt-3 tracking-tight">
          Scores Minimums Requis
        </h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Dernière Année
        </p>
      </div>

      {/* Liste des scores dynamique */}
      <div className="space-y-2.5 my-4">
        {scoresEntries.length > 0 ? (
          scoresEntries.map(([key, value]) => {
            // Récupère la config propre, sinon utilise la clé brute par défaut
            const config = bacConfig[key] || { label: key.replace('_', ' '), emoji: "🎓" };

            return (
              <div
                key={key}
                className="bg-white p-3 rounded-xl flex items-center justify-between border border-gray-100 shadow-sm"
              >
                <span className="text-xs font-extrabold text-gray-500 uppercase flex items-center gap-1.5">
                  <span>{config.emoji}</span> {config.label}
                </span>
                <AnimatedScore value={value} />
              </div>
            );
          })
        ) : (
          /* Fallback si aucune clé ou aucun score n'est dispo */
          <p className="text-xs font-bold text-gray-400 italic text-center py-4">
            Aucun score disponible
          </p>
        )}
      </div>

      {/* Note de bas de page explicative */}
      <p className="text-xs font-bold text-[#de3f6b]/70 italic leading-tight">
        * Score calculé selon la formule d'orientation de base.
      </p>

    </div>
  );
}