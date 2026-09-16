# 🧩 La Fabrique à Phrases

Un jeu vidéo accessible, ludique et coloré où l'objectif est de reconstituer des phrases à l'aide d'étiquettes de mots magnétiques.

---

## 🚀 Comment lancer le jeu ?

C'est immédiat et sans installation :
- **Option 1 (Le plus simple)** : Double-clique sur [`Lancer_le_Jeu.bat`](file:///C:/Projets/bacasable/SentenceFactory/Lancer_le_Jeu.bat) ou ouvre [`index.html`](file:///C:/Projets/bacasable/SentenceFactory/index.html) dans ton navigateur préféré (Chrome, Firefox, Edge, Safari).
- **Option 2 (Serveur local si souhaité)** :
  ```bash
  python -m http.server 8000
  ```
  Puis rends-toi sur `http://localhost:8000`.

---

## 🎮 Comment jouer ?

1. **Construire la phrase** :
   - **Par clic / tactile** : Clique sur une étiquette dans les *Mots disponibles* pour l'ajouter à ta phrase. Clique sur un mot dans *Ta phrase* pour le renvoyer dans la réserve (en mode normal) ou le retirer (en mode créatif).
   - **Par glisser-déposer** : Attrape une étiquette à la souris ou au doigt et dépose-la dans la zone de phrase à l'emplacement souhaité.
2. **Écouter** :
   - Clique sur le bouton 🔊 **« Écouter »** à tout moment pour que la synthèse vocale lise la phrase à voix haute.
3. **Vérifier** :
   - Clique sur **« Vérifier la phrase »** (ou raccourci clavier <kbd>Ctrl</kbd> + <kbd>Entrée</kbd>).
   - Les mots corrects sont mis en valeur en vert avec des confettis !
   - Le moteur accepte aussi les **alternatives syntaxiques valides** (ex: inversion de compléments).
   - En cas d'erreur, le jeu t'indique avec bienveillance où se situent les blocages.
4. **Coup de pouce** :
   - Si tu es bloqué, clique sur le bouton ✨ **« Coup de pouce »** pour placer automatiquement le prochain mot attendu.

---

## 🌟 Modes de Difficulté (30 Puzzles + Atelier Libre)

1. **🌱 Facile (Apprenti) - 10 Puzzles** :
   - Phrases courtes (3 à 6 mots).
   - Tous les mots disponibles sont utilisés (aucun intrus).
   - Thématiques variées : animaux, nature, vie quotidienne, voyage.
2. **🔍 Moyen (Avec Intrus) - 10 Puzzles** :
   - Phrases plus longues (5 à 8 mots).
   - Présence de 2 à 4 mots intrus qui ne font pas partie de la phrase.
   - Thématiques : pirates, espace, dragons, océan, cuisine, musique.
3. **🏆 Difficile (Accords & Pièges) - 10 Puzzles** :
   - Phrases riches (7 à 11 mots) avec pièges grammaticaux d'accords en genre et en nombre (*singulier vs pluriel*, adjectifs féminins, formes verbales).
4. **🎨 Bac à sable (Atelier Créatif) - 119 Mots** :
   - Un réservoir complet de **119 mots** classés par filtres rapides (*Articles, Noms, Verbes, Adjectifs, Prépositions, Autres*).
   - Possibilité de réutiliser les mots plusieurs fois pour composer des histoires poétiques ou loufoques à l'infini !

---

## ♿ Accessibilité (A11y) intégrée

- **🔤 Police Dyslexie** : active une typographie renforcée pour faciliter la lecture.
- **🌓 Mode Fort Contraste** : contrastes élevés pour les personnes malvoyantes.
- **🎨 Code Couleur Grammatical** : code couleur visuel pour identifier les natures grammaticales.
- **🔊 Effets sonores & Voix** : synthèse Web Audio sans latence et synthèse vocale française naturelle.
- **⌨️ Navigation 100% Clavier** :
  - <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> : naviguer entre les étiquettes.
  - <kbd>Entrée</kbd> ou <kbd>Espace</kbd> : ajouter / retirer l'étiquette.
  - <kbd>Flèche Gauche</kbd> / <kbd>Flèche Droite</kbd> : déplacer et réordonner un mot à l'intérieur de la phrase.
  - <kbd>Ctrl</kbd> + <kbd>Entrée</kbd> : valider la phrase instantanément.

---

## 🛠️ Ajouter de nouveaux niveaux

Tu peux ajouter tes propres puzzles très facilement dans [`levels.js`](file:///C:/Projets/bacasable/SentenceFactory/levels.js) !
