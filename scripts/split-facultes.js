#!/usr/bin/env node
/**
 * scripts/split-facultes.js
 *
 * Génère src/data/facultes-index.json (version allégée, ~30 Ko) à partir de
 * src/data/facultes.json (version complète, ~250 Ko).
 *
 * Usage :
 *   node scripts/split-facultes.js
 *
 * Relancer après chaque mise à jour de facultes.json (ex: export Google Sheet).
 * Ajouter en npm script dans package.json :
 *   "split-data": "node scripts/split-facultes.js"
 *
 * Champs INCLUS dans l'index (home + recherche avancée) :
 *   id, nom_court, nom_complet, universite, ville, logo, filtre, tags,
 *   description_breve, score_derniere_annee,
 *   filieres_phares : version allégée (id, nom, duree, scores uniquement — pas description)
 *
 * Champs EXCLUS (page détail uniquement) :
 *   fac_hero_banner, adresse, lien_google_maps, categories, regimes_etudes,
 *   debouches, site_web, filieres_phares.description
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const INPUT  = resolve(ROOT, 'src/data/facultes.json');
const OUTPUT = resolve(ROOT, 'src/data/facultes-index.json');

// ── Champs à conserver au niveau racine de chaque faculté ─────────────────
const ROOT_FIELDS = [
  'id',
  'nom_court',
  'nom_complet',
  'universite',
  'ville',
  'logo',
  'filtre',
  'categories',
  'tags',
  'description_breve',
];

// ── Champs à conserver dans chaque objet filiere_phare ────────────────────
const FILIERE_FIELDS = ['id', 'nom', 'duree', 'scores'];

function pickFields(obj, fields) {
  return fields.reduce((acc, key) => {
    if (key in obj) acc[key] = obj[key];
    return acc;
  }, {});
}

// ── Lecture ───────────────────────────────────────────────────────────────
const fullData = JSON.parse(readFileSync(INPUT, 'utf-8'));

// ── Transformation ────────────────────────────────────────────────────────
const indexData = fullData.map((fac) => {
  const slim = pickFields(fac, ROOT_FIELDS);

  // filieres_phares : on garde seulement id/nom/duree/scores (pas description)
  if (Array.isArray(fac.filieres_phares)) {
    slim.filieres_phares = fac.filieres_phares.map((f) => {
      if (typeof f === 'object' && f !== null) {
        return pickFields(f, FILIERE_FIELDS);
      }
      return f; // string simple — pas touché
    });
  }

  return slim;
});

// ── Écriture ──────────────────────────────────────────────────────────────
const output = JSON.stringify(indexData, null, 2);
writeFileSync(OUTPUT, output, 'utf-8');

const inputKb  = Math.round(readFileSync(INPUT).length  / 1024);
const outputKb = Math.round(output.length / 1024);
const savings  = Math.round((1 - outputKb / inputKb) * 100);

console.log(`✅  facultes-index.json généré`);
console.log(`    Entrée  : ${inputKb} Ko  (facultes.json)`);
console.log(`    Sortie  : ${outputKb} Ko  (facultes-index.json)`);
console.log(`    Gain    : ${savings}% de poids en moins`);
console.log(`    Objets  : ${indexData.length} facultés`);
