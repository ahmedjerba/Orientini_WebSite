// ─── Couleurs par TAG (champ `tags` dans facultes.json) ───────────────────────
// Rouge réservé au Droit, bleu clair à la Médecine.
// Pour les établissements multi-tags → dégradé automatique.

export const tagColors = {
  "Droit & Sciences Politiques":               "#dc2626", // Rouge (réservé)
  "Médecine, Pharmacie & Médecine Dentaire":   "#3b9edd", // Bleu médical clair
  "Paramédical & Sciences Infirmières":        "#06b6d4", // Cyan médical
  "Génie & Technologies Appliquées":           "#f0930d", // Orange technique
  "Informatique & Réseaux":                    "#6366f1", // Indigo tech
  "Business, Commerce, Finance & Gestion":     "#2e9e6b", // Vert commerce
  "Cycles Préparatoires Intégrés":             "#1d4ed8", // Bleu royal tech (électrique, ingénierie)
  "Classes Préparatoires Classiques":          "#7c3aed", // Violet
  "Sciences Fondamentales & Biotechnologie":   "#0369a1", // Bleu scientifique
  "Architecture":                              "#b45309", // Brun doré
  "Arts, Design & Multimédia":                "#db2777", // Rose créatif
  "Lettres, Langues & Sciences Humaines":      "#7e22ce", // Violet sombre
  "Sport & Éducation Physique":               "#16a34a", // Vert vif
};

const DEFAULT_COLOR = "#9ca3af";

// ─── Couleur principale : premier tag reconnu ────────────────────────────────
export const getCategoryColor = (filter) => {
  // Rétro-compatibilité : si appelé avec l'ancien champ `filtre`, on retourne gris
  return tagColors[filter] || DEFAULT_COLOR;
};

// ─── Couleur(s) à partir du tableau de tags ───────────────────────────────────
export const getTagColors = (tags) => {
  if (!tags || tags.length === 0) return [DEFAULT_COLOR];
  const colors = tags
    .map((t) => tagColors[t])
    .filter(Boolean);
  return colors.length > 0 ? colors : [DEFAULT_COLOR];
};

// ─── Gradient CSS inline à partir des tags ────────────────────────────────────
// 1 tag  → couleur unie (pas de gradient)
// 2 tags → dégradé à 2 couleurs
// 3+ tags → dégradé avec les 3 premières couleurs
export const getTagGradient = (tags, direction = "to right") => {
  const colors = getTagColors(tags);
  if (colors.length === 1) return colors[0]; // couleur simple
  const stops = colors.slice(0, 3);
  if (stops.length === 2) {
    return `linear-gradient(${direction}, ${stops[0]} 0%, ${stops[1]} 100%)`;
  }
  return `linear-gradient(${direction}, ${stops[0]} 0%, ${stops[1]} 50%, ${stops[2]} 100%)`;
};

// ─── Couleur principale pour les badges / bordures ───────────────────────────
export const getPrimaryTagColor = (tags) => {
  return getTagColors(tags)[0];
};

// ─── WCAG AA helper ───────────────────────────────────────────────────────────
// Renvoie #ffffff ou #1b1464 selon la luminosité du fond.
export const getContrastText = (bgColor) => {
  // Couleurs sombres → texte blanc
  const needsWhite = [
    "#1b1464", "#6366f1", "#ec4899", "#3b9edd", "#2e9e6b", "#f0930d",
    "#dc2626", "#06b6d4", "#7c3aed", "#0369a1", "#db2777", "#7e22ce",
    "#16a34a", "#b45309", "#1d4ed8",
  ];
  if (needsWhite.includes(bgColor)) return "#ffffff";
  return "#1b1464";
};

// ─── Rétro-compat : ancienne map `filtre` → conservée pour LittleCard/App ─────
export const categoryColors = {
  "🩺 Sciences de la Santé & Médecine":                          "#3b9edd",
  "💻 Licence d'Informatique":                                    "#6366f1",
  "🛠️ Instituts Supérieurs des Études Technologiques (ISET)":    "#f0930d",
  "⚖️ Facultés des Sciences Juridiques et Politiques (Droit)":   "#dc2626",
  "💼 Business, Commerce & Gestion":                             "#2e9e6b",
  "🚀 Cycles Préparatoires Intégrés & Architecture":             "#1d4ed8",
  "📚 Instituts Préparatoires Classiques (IPEI)":                "#7c3aed",
};
