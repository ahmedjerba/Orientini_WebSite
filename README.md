# Orient'ini - Site Vitrine Officiel

Ce projet est le site vitrine de l'événement **Orient'ini** (8ème édition), le grand salon de l'orientation académique organisé par l'association **Jeunes Ingénieurs de Djerba (JID)**.

Le site permet aux bacheliers et étudiants d'explorer les établissements universitaires tunisiens par catégorie, de filtrer les facultés et de réaliser des recherches avancées par score ou région pour trouver leur voie.

---

## 🚀 Technologies Utilisées

- **Framework** : [React 19](https://react.dev/)
- **Build Tool** : [Vite](https://vite.dev/)
- **Styles** : [Tailwind CSS v4](https://tailwindcss.com/)
- **Routage client** : [React Router DOM v6](https://reactrouter.com/)
- **Animations** : [Framer Motion v12](https://www.framer.com/motion/)
- **Effets** : [Canvas Confetti](https://github.com/catdad/canvas-confetti)

---

## 🛠️ Démarrage Local

### Prérequis
Assurez-vous d'avoir installé [Node.js](https://nodejs.org/) (version 18+ recommandée).

### Installation
Installez les dépendances du projet :
```bash
npm install
```

### Lancement du serveur de développement
Démarrez le projet localement :
```bash
npm run dev
```
Le site sera accessible à l'adresse [http://localhost:5173/](http://localhost:5173/).

### Construction pour la production
Générez le bundle optimisé et minifié :
```bash
npm run build
```

### Validation et Qualité du code (Linter)
Exécutez ESLint pour valider la qualité du code :
```bash
npm run lint
```

---

## 📂 Structure du projet `/src`

```text
src/
├── assets/          # Fichiers statiques et styles secondaires
├── components/      # Composants React de l'application
│   ├── facultes/    # Composants liés à l'affichage et carrousel des facultés
│   ├── hero/        # Composants de la section d'en-tête (Compte à rebours, Textes, Visuel)
│   ├── page_faculté/# Fiche détaillée d'un établissement (Banner, Débouchés, Présentation)
│   ├── AdvancedSearchPage.jsx # Page de recherche multicritère par score du bac
│   ├── IntroLoader.jsx        # Écran de chargement d'introduction interactif
│   ├── Navbar.jsx             # Barre de navigation principale
│   ├── Programme.jsx          # Section d'affichage du programme de l'événement
│   └── Sponsors.jsx           # Section affichant les partenaires officiels
├── data/
│   └── facultes.json # Base de données locale de tous les établissements
├── App.css          # Styles globaux additionnels
├── App.jsx          # Cœur de l'application (Routing principal et gestion d'états)
├── index.css        # Point d'entrée des styles Tailwind
└── main.jsx         # Point d'entrée de l'application React
```

---

## ➕ Comment ajouter un établissement dans `facultes.json` ?

La base de données des établissements est stockée dans [src/data/facultes.json](file:///c:/Users/user/Desktop/personal/orientini/orientini-vitrine/src/data/facultes.json). Pour ajouter une nouvelle faculté, ajoutez un nouvel objet à la liste en respectant la structure suivante :

```json
  {
    "id": "nom_unique_id",
    "nom_court": "NOM_COURT",
    "nom_complet": "Nom complet de l'établissement",
    "universite": "Nom de l'Université de rattachement",
    "ville": "Ville",
    "logo": "/logos/NOM_LOGOTYPE.webp",
    "fac_hero_banner": "/banners/NOM_BANNIERE.webp",
    "description_breve": "Description courte de l'établissement pour la carte d'aperçu.",
    "adresse": "Adresse physique de l'établissement",
    "lien_google_maps": "https://maps.google.com/?q=Nom+de+l+etablissement",
    "categories": [
      "Santé",
      "Médecine"
    ],
    "filtre": "🩺 Sciences de la Santé & Médecine",
    "regimes_etudes": "Durée générale des études (ex: 9 ans)",
    "filieres_phares": [
      {
        "id": "id_unique_filiere",
        "nom": "Nom de la filière",
        "duree": "Durée",
        "description": "Présentation succincte de la formation.",
        "scores": {
          "bac_math": 190.33,
          "bac_sc": 184.8,
          "bac_info": 180.0,
          "bac_tech": 178.5,
          "bac_eco": null,
          "bac_lettres": null,
          "bac_sport": null
        }
      }
    ],
    "debouches": [
      "Métier ciblé 1",
      "Métier ciblé 2"
    ],
    "site_web": "https://site-web-officiel.tn"
  }
```

### Recommandations pour les images :
1. Déposez les images de logo dans `/public/logos/` et les bannières dans `/public/banners/`.
2. Pour optimiser les performances de chargement, convertissez vos images au format **WebP** avec une résolution maximale de `256x256` pour les logos et `1200x800` pour les bannières.
