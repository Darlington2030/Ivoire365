# Ivoire365.ci

Calendrier numérique pour la Côte d'Ivoire — jours fériés, vacances scolaires,
numéros de semaine, calculateur de dates et compte à rebours. Construit avec
Next.js (App Router) + TypeScript + Tailwind CSS, en statique/ISR pour le SEO.

## Démarrage

```bash
npm install
npm run dev
```

> **Note sur cette livraison** : ce projet a été généré dans un environnement
> sans accès réseau, donc `npm install` n'a pas pu être exécuté ni vérifié ici.
> La logique pure (dates, semaines ISO, données) a été testée à l'exécution
> avec `tsx` et typecheckée avec `tsc` en isolation, et tous les fichiers ont
> été relus pour la cohérence des imports/exports. Mais le premier
> `npm install && npm run build` réel sur votre machine reste la vérification
> définitive — corrigez toute erreur de version de dépendance si elle survient
> (les versions dans `package.json` sont des cibles raisonnables pour
> Next 14 / React 18, à ajuster si besoin).
>
> **Correctif appliqué après un premier `npm run dev`** : Next.js a signalé
> `You cannot use different slug names for the same dynamic path ('slug' !==
> 'year')`, parce que `/jours-feries/[year]` et `/jours-feries/[slug]`
> existaient comme deux dossiers dynamiques distincts à la même position de
> l'arbre de routes — ce que l'App Router interdit. Les deux ont été fusionnés
> en une seule route `/jours-feries/[param]`, qui détecte si la valeur reçue
> est une année à 4 chiffres ou un slug de fête, puis affiche le contenu
> correspondant. Gardez ce principe en tête si vous ajoutez vous-même une
> nouvelle route dynamique sous `/jours-feries/` : il ne peut y avoir qu'un
> seul nom de paramètre par position dans l'arbre.

## Structure du projet

```
src/
  app/                          # Routes (App Router)
    page.tsx                    # Accueil
    calendrier-2026/
      page.tsx                  # Calendrier annuel
      [month]/page.tsx          # Calendrier mensuel (slug FR : janvier, février...)
    jours-feries/
      page.tsx                  # Index (redirige vers l'année en cours si disponible)
      [param]/page.tsx          # Route fusionnée : sert à la fois la table d'une
                                 # année ("2026") et le détail d'une fête ("tabaski-...").
                                 # Next.js interdit deux noms de paramètre différents
                                 # ([year] et [slug]) à la même position dans l'arbre
                                 # de routes — voir l'avertissement ci-dessous.
    vacances-scolaires/
      page.tsx                  # Redirige vers l'année scolaire la plus récente
      [year]/page.tsx           # Détail d'une année scolaire (le param capture
                                 # une chaîne "2025-2026", pas une année simple)
    ramadan-tabaski/page.tsx
    numero-semaine/page.tsx
    calculateur-de-dates/page.tsx
    compte-a-rebours/[event]/page.tsx
    examens/page.tsx
    a-propos/, contact/, mentions-legales/, politique-de-confidentialite/
    sitemap.ts                  # Génère sitemap.xml dynamiquement
    robots.ts                   # Génère robots.txt
    layout.tsx                  # Layout racine, header/footer, JSON-LD WebSite
    globals.css                 # Tokens de couleur CI + styles de base

  components/                   # Composants réutilisables
    CalendarGrid.tsx            # Grille mois — utilisée en mode "compact" (vue
                                 # annuelle) et "full" (vue mensuelle dédiée)
    HolidayBadge.tsx            # Badge type de fête (civil/chrétien/musulman) + mobile
    CountdownTimer.tsx          # Compte à rebours réutilisable (jours/h/min/s)
    DateCalculator.tsx          # Différence, ajout/soustraction, âge
    WeekNumberTool.tsx          # Numéro de semaine ISO 8601
    AdSlot.tsx                  # Emplacement pub vide, dimensions réservées (anti-CLS)
    PrintButton.tsx             # Déclenche window.print() pour l'export PDF
    SiteHeader.tsx, SiteFooter.tsx

  data/                         # Données sources — UN FICHIER PAR ANNÉE
    holidays/2026.ts
    school-holidays/2025-2026.ts
    exams/2026.ts

  lib/                          # Logique métier
    date-utils.ts               # Semaines ISO 8601, formatage FR, calculs de dates
    holidays.ts                 # Registre + accès aux données de jours fériés
    school-holidays.ts          # Registre des années scolaires
    exams.ts                    # Registre des années d'examens
    seo.ts                      # Générateurs JSON-LD (Event, BreadcrumbList, WebSite)

  types/calendar.ts             # Schéma TypeScript partagé

  messages/fr.json, en.json     # Chaînes i18n — fr.json est utilisé en v1 ;
                                 # en.json est un squelette pour une v2 anglaise
```

## Ajouter une nouvelle année de jours fériés

1. Créez `src/data/holidays/2027.ts` en suivant exactement la forme de
   `src/data/holidays/2026.ts` (même type `YearHolidayData`).
2. Pour chaque fête mobile (musulmane), mettez `status: "estimated"` tant que
   la date n'est pas confirmée par une déclaration COSIM/CODISS, puis
   repassez à `"confirmed"` une fois la date connue — ajoutez aussi un champ
   `source` citant la déclaration.
3. Dans `src/lib/holidays.ts`, importez le nouveau fichier et ajoutez-le au
   `REGISTRY` :
   ```ts
   import holidays2027 from "@/data/holidays/2027";
   const REGISTRY: Record<number, YearHolidayData> = {
     2026: holidays2026,
     2027: holidays2027,
   };
   ```
4. C'est tout. `generateStaticParams()` dans `/jours-feries/[param]`,
   `/compte-a-rebours/[event]` et `sitemap.ts` lisent tous `getAvailableYears()` — aucune autre modification de code n'est requise.
5. Pour activer une page `/calendrier-2027` dédiée (avec sa grille annuelle),
   dupliquez le dossier `src/app/calendrier-2026/` en `calendrier-2027/` et
   changez la constante `YEAR` en haut de chaque fichier. (Ce choix — un
   dossier par année plutôt qu'une route dynamique `[year]` — suit la
   structure de routes demandée dans le brief d'origine ; voir la section
   "Pourquoi pas une route dynamique pour /calendrier-*" ci-dessous si vous
   préférez généraliser.)

Le même principe s'applique à `src/data/school-holidays/` (registre dans
`src/lib/school-holidays.ts`) et `src/data/exams/` (registre dans
`src/lib/exams.ts`).

## Comment fonctionne l'auto-SEO

Chaque page de fête et chaque page d'année sous `/jours-feries/[param]`
est **générée à partir des fichiers de données**, pas
écrite à la main :

- `generateStaticParams()` énumère tous les slugs/années connus au moment du
  build, pour que Next.js pré-génère chaque page statiquement (SSG).
- `generateMetadata()` produit un `<title>` et une `<meta description>`
  uniques par page, construits à partir du nom et de la date de la fête.
- Chaque page injecte un bloc `<script type="application/ld+json">` :
  - `Event` pour les pages de fête individuelles (`holidayEventJsonLd`)
  - `BreadcrumbList` pour le fil d'Ariane de navigation
  - `WebSite` une fois, dans le layout racine
- `sitemap.ts` parcourt les mêmes registres de données pour générer
  `sitemap.xml` automatiquement — toute nouvelle année ajoutée au registre
  apparaît dans le sitemap sans intervention supplémentaire.

Concrètement : ajouter une fête au fichier de données 2027 crée
automatiquement sa page détail, son entrée dans le tableau annuel, son entrée
sitemap, et son JSON-LD — sans toucher au code des pages.

## Fiabilité des données (état au 23 juin 2026)

Les données 2026 ont été vérifiées et recoupées auprès de sources publiques
au moment de la construction de ce projet :

- **Jours fériés civils et chrétiens** : dates fixes, fiables.
- **Nuit du Destin, Korité, Maouloud** : confirmées par déclarations
  conjointes COSIM/CODISS (sources citées dans `src/data/holidays/2026.ts`).
- **Tabaski** : les sources consultées ne sont pas unanimes (27 ou 28 mai
  selon la source) — marquée `"estimated"` avec un avertissement explicite
  plutôt que de trancher arbitrairement. **Vérifiez le décret officiel avant
  publication si cette date est critique pour vous.**
- **Vacances scolaires 2025-2026** : données réelles du MENA (Ministère de
  l'Éducation Nationale et de l'Alphabétisation), pas des placeholders.
- **Examens CEPE/BEPC/BAC 2026** : dates réelles de la DECO (Direction des
  Examens et Concours), pas des placeholders — sauf pour les concours de la
  fonction publique, dont les dates varient par corps et restent à vérifier
  au cas par cas.

Toutes les entrées portent un champ `lastVerified` ou `status` pour que le
front-end puisse afficher la fiabilité de chaque donnée plutôt que de la
présenter comme uniformément certaine.

## i18n

`src/messages/fr.json` contient toutes les chaînes d'interface utilisées en
v1. `en.json` est un squelette structurellement identique, prêt pour une
traduction future, mais **n'est pas branché** dans l'app pour l'instant — les
pages utilisent directement les chaînes françaises en dur dans le JSX (plus
simple à lire et modifier pour une v1 mono-langue). Pour activer l'anglais
plus tard, introduisez `next-intl` (ou équivalent), déplacez les chaînes JSX
vers des appels `t("clé")`, et ajoutez un préfixe de locale aux routes.

## Emplacements publicitaires

`AdSlot.tsx` réserve un espace de taille fixe (bannière 728×90, pavé
300×250, sidebar 300×600) sans charger de script publicitaire. Quand vous
serez prêt pour AdSense, remplacez le contenu du composant par le script
AdSense réel — les dimensions étant déjà réservées, l'intégration ne devrait
pas provoquer de CLS (Cumulative Layout Shift).

## Limites connues / TODO avant mise en production

- Pas de favicon ni d'image Open Graph dans `public/` — à ajouter.
- Le calcul d'âge dans `DateCalculator.tsx` utilise une approximation
  (365.25 jours/an, 30.44 jours/mois) suffisante pour un usage grand public,
  mais pas pour un usage juridique/officiel.
- `todayISO()` utilise l'heure du serveur ; la Côte d'Ivoire est en UTC sans
  heure d'été, donc aucun décalage n'est nécessaire en pratique, mais vérifiez
  le fuseau du serveur de déploiement.
- L'année scolaire 2026-2027 n'est pas encore seedée (logiquement, puisque
  l'année scolaire 2025-2026 est en cours) — suivez le même processus
  d'ajout que pour les jours fériés une fois publiée par le MENA.
