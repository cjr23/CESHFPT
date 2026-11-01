# CESHFPT Tambacounda — site web

Site vitrine du **Centre Énergie Solaire d’Hygiène et de la Formation Professionnelle de Tambacounda** (Sénégal), créé en 2003.

Site statique en **HTML, CSS et JavaScript**, sans dépendance ni étape de compilation.

## Contenu

- Présentation du centre, historique (2003 → aujourd’hui) et mot du promoteur, Abdou Karim Sané
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
```

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```bash
python -m http.server 5500
```

puis aller sur http://localhost:5500.

## Modifier le contenu

- **Formations** : dans `index.html`, section `id="formations"`. Chaque formation est un bloc `<article class="formation-card">` ; la liste du formulaire se met à jour automatiquement.
- **Coordonnées** : téléphones, e-mail et adresse sont dans `index.html` (en-tête, contact, pied de page).
- **Destinataires du formulaire** : constantes `WHATSAPP_NUMBER` et `CONTACT_EMAIL` en haut de `js/script.js`.
- **Couleurs** : variables `--logo-orange`, `--logo-blue`, `--logo-sky` en haut de `css/style.css`.

## Photos

Les photos proviennent de la fiche Google Maps du centre et sont chargées depuis les serveurs de Google. Pour plus de fiabilité, elles peuvent être enregistrées dans `assets/` et les liens mis à jour dans `index.html`.

## Contact

Quartier Liberté 1, Tambacounda — 77 874 10 31 / 33 981 05 17 — centreenergiesolairetamba@gmail.com
