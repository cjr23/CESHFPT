# CESHFPT Tambacounda — site web

Site vitrine du **Centre Énergie Solaire d’Hygiène et de la Formation Professionnelle de Tambacounda** (Sénégal), créé en 2003.

Site statique en **HTML, CSS et JavaScript**, sans dépendance ni étape de compilation.

## Contenu

- Présentation du centre, historique (1992 → aujourd’hui), mot et parcours du promoteur, Abdou Karim Sané
- Vidéos de la chaîne YouTube du centre : présentation du centre et forum des métiers (septembre 2026)
- Les **7 formations** affichées à l’entrée du centre : Énergie solaire, Bureautique, Infographie, Réseaux informatiques, Comptabilité, Transport logistique, Marketing et communication
- Les trois pôles (énergie solaire, hygiène & assainissement, formation professionnelle) et les services
- Estimateur d’installation solaire
- Galerie photo avec visionneuse
- FAQ, plan d’accès et formulaire de demande (envoi par WhatsApp ou par e-mail)
- Mise en page adaptée au téléphone, à la tablette et à l’ordinateur

## Structure

```
index.html        Page unique du site
css/style.css     Styles (couleurs du logo définies en haut du fichier)
js/script.js      Interactions (menu, filtres, galerie, formulaire…)
assets/logo.png   Logo du centre
assets/img/       Photos du centre (WebP)
assets/og-image.jpg  Image d’aperçu pour les partages
sitemap.xml       Plan du site pour Google
```

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```bash
python -m http.server 5500
```

puis aller sur http://localhost:5500.

## Modifier le contenu

- **Formations** : dans `index.html`, section `id="formations"`. Chaque formation est un bloc `<article class="formation-card">` ; la liste du formulaire se met à jour automatiquement.
- **Réseaux sociaux** : section `id="reseaux"` (une carte par réseau) et icônes du pied de page (`footer-social`). Facebook est affiché « Bientôt » en attendant le lien de la page : le commentaire au-dessus de la carte et de l’icône indique quoi remplacer. Ajoutez aussi le lien dans `sameAs` (données structurées en haut de la page).
- **Vidéos** : section `id="video"` de `index.html`. Pour changer une vidéo, remplacez l’identifiant YouTube (après `watch?v=`) dans `data-video-id` et dans le lien `href`. Le lecteur ne se charge qu’au clic.
- **Coordonnées** : téléphones, e-mail et adresse sont dans `index.html` (en-tête, contact, pied de page).
- **Destinataires du formulaire** : constantes `WHATSAPP_NUMBER` et `CONTACT_EMAIL` en haut de `js/script.js`.
- **Couleurs** : variables `--logo-orange`, `--logo-blue`, `--logo-sky` en haut de `css/style.css`.

## Photos

Les photos proviennent de la fiche Google Maps du centre. Elles sont enregistrées dans `assets/img/` au format WebP, en plusieurs largeurs (`-600`, `-1000`, `-1600`) pour rester légères sur mobile.

## Partage et référencement

- **Aperçu de partage** : `assets/og-image.jpg` (1200 × 630) s’affiche quand le lien du site est partagé sur WhatsApp, Facebook, etc.
- **Fiche Google** : les données structurées (adresse, horaires, téléphones) sont dans la balise `application/ld+json` en haut de `index.html`. À mettre à jour en même temps que les coordonnées.
- **Plan du site** : `sitemap.xml`. Pour suivre le référencement, ajouter le site dans [Google Search Console](https://search.google.com/search-console) puis y déclarer `https://cjr23.github.io/CESHFPT/sitemap.xml`.
- **Bouton WhatsApp flottant** : le numéro et le message pré-rempli sont dans le lien `wa-float` en bas de `index.html`.

## Contact

Quartier Liberté 1, Tambacounda — 77 874 10 31 / 33 981 05 17 — centreenergiesolairetamba@gmail.com
