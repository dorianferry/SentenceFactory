// Logique principale du jeu "La Fabrique à Phrases"

(function() {
  // Références globales
  const LEVELS_DATA = window.LEVELS_DATA;
  const GRAMMAR_TYPES = window.GRAMMAR_TYPES;
  const soundManager = window.soundManager;
  const ConfettiEffect = window.ConfettiEffect;

  class SentenceGame {
    constructor() {
      this.confetti = new ConfettiEffect("confetti-canvas");
      this.currentDifficulty = "easy";
      this.currentLevelIndex = 0;
      this.sandboxFilter = "all";
      
      // État des mots
      this.sentenceWords = []; // Mots dans la phrase active
      this.bankWords = [];     // Mots disponibles dans la réserve
      this.wordUidCounter = 0;

      // Suivi de progression persisté
      this.completedLevels = {};
      try {
        const savedCompleted = localStorage.getItem("phraseForge_completed");
        if (savedCompleted) this.completedLevels = JSON.parse(savedCompleted);
      } catch (e) {}

      // Éléments du DOM
      this.dom = {
        levelBadge: document.getElementById("level-badge"),
        levelHeading: document.getElementById("level-heading"),
        hintContainer: document.getElementById("hint-container"),
        hintText: document.getElementById("hint-text"),
        levelNavControls: document.getElementById("level-nav-controls"),
        btnPrevLevel: document.getElementById("btn-prev-level"),
        btnNextLevel: document.getElementById("btn-next-level"),
        sentencesSelectorContainer: document.getElementById("sentences-selector-container"),
        sentenceStepperList: document.getElementById("sentence-stepper-list"),
        progressionLabel: document.getElementById("progression-label"),
        progressBarFill: document.getElementById("progress-bar-fill"),
        sentenceDropzone: document.getElementById("sentence-dropzone"),
        wordsBank: document.getElementById("words-bank"),
        wordsCountInfo: document.getElementById("words-count-info"),
        sandboxFilters: document.getElementById("sandbox-filters"),
        filterChips: document.querySelectorAll(".filter-chip"),
        btnSpeak: document.getElementById("btn-speak-sentence"),
        btnValidate: document.getElementById("btn-validate"),
        btnReset: document.getElementById("btn-reset"),
        btnHint: document.getElementById("btn-hint"),
        tabButtons: document.querySelectorAll(".tab-btn"),
        modal: document.getElementById("celebration-modal"),
        modalTitle: document.getElementById("modal-title"),
        modalSentence: document.getElementById("modal-sentence"),
        btnModalNext: document.getElementById("btn-modal-next"),
        btnReplayVoice: document.getElementById("btn-replay-voice"),
        btnToggleSound: document.getElementById("btn-toggle-sound"),
        btnToggleVoice: document.getElementById("btn-toggle-voice"),
        grammarLegend: document.getElementById("grammar-legend")
      };

      // État d'accessibilité
      this.showGrammar = true;
      document.body.classList.add("show-grammar");

      this.bindEvents();
      this.loadLevel();
    }

    // --- Initialisation des Événements ---
    bindEvents() {
      // Déblocage audio sur premier geste
      window.addEventListener("click", () => soundManager.ensureContext(), { once: true });
      window.addEventListener("keydown", () => soundManager.ensureContext(), { once: true });

      // Changement d'onglet de difficulté
      this.dom.tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          const diff = btn.dataset.difficulty;
          if (diff === this.currentDifficulty) return;

          this.dom.tabButtons.forEach(b => {
            b.classList.remove("active");
            b.setAttribute("aria-selected", "false");
          });
          btn.classList.add("active");
          btn.setAttribute("aria-selected", "true");

          this.currentDifficulty = diff;
          this.currentLevelIndex = 0;
          soundManager.playPop();
          this.loadLevel();
        });
      });

      // Filtres par catégorie en mode Bac à sable
      if (this.dom.filterChips) {
        this.dom.filterChips.forEach(chip => {
          chip.addEventListener("click", () => {
            this.dom.filterChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");
            this.sandboxFilter = chip.dataset.filter;
            soundManager.playPop();
            this.renderWordsBank();
          });
        });
      }

      // Navigation des niveaux
      this.dom.btnPrevLevel.addEventListener("click", () => {
        if (this.currentLevelIndex > 0) {
          this.currentLevelIndex--;
          soundManager.playPop();
          this.loadLevel();
        }
      });

      this.dom.btnNextLevel.addEventListener("click", () => {
        const maxLevels = this.getCurrentLevelsList().length;
        if (this.currentLevelIndex < maxLevels - 1) {
          this.currentLevelIndex++;
          soundManager.playPop();
          this.loadLevel();
        }
      });

      // Actions principales
      this.dom.btnReset.addEventListener("click", () => this.resetLevel());
      this.dom.btnHint.addEventListener("click", () => this.giveHint());
      this.dom.btnValidate.addEventListener("click", () => this.validateSentence());

      // Synthèse vocale de la phrase
      this.dom.btnSpeak.addEventListener("click", () => {
        soundManager.ensureContext();
        this.speakCurrentSentence();
      });

      // Modale de fin de niveau
      this.dom.btnModalNext.addEventListener("click", () => {
        this.closeModal();
        const maxLevels = this.getCurrentLevelsList().length;
        if (this.currentDifficulty === "sandbox") {
          // Reste dans le mode bac à sable
          return;
        }
        if (this.currentLevelIndex < maxLevels - 1) {
          this.currentLevelIndex++;
        } else {
          this.currentLevelIndex = 0;
        }
        this.loadLevel();
      });

      this.dom.btnReplayVoice.addEventListener("click", () => {
        const sentenceText = this.buildSentenceString();
        soundManager.speak(sentenceText);
      });

      // Contrôles Audio (Son et Synthèse vocale)
      this.dom.btnToggleSound.addEventListener("click", () => {
        const enabled = soundManager.toggleSound();
        this.dom.btnToggleSound.classList.toggle("active", enabled);
        this.dom.btnToggleSound.innerHTML = enabled ? "<span>🔔</span>" : "<span>🔕</span>";
      });

      this.dom.btnToggleVoice.addEventListener("click", () => {
        const enabled = soundManager.toggleVoice();
        this.dom.btnToggleVoice.classList.toggle("active", enabled);
        this.dom.btnToggleVoice.innerHTML = enabled ? "<span>🗣️</span>" : "<span>🤐</span>";
        if (enabled) soundManager.playPop();
      });

      // Glisser-déposer sur la dropzone
      this.setupDropzoneEvents();

      // Raccourci clavier global Ctrl+Entrée pour valider
      window.addEventListener("keydown", (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
          e.preventDefault();
          this.validateSentence();
        }
      });
    }

    // --- Récupération des données ---
    getCurrentLevelsList() {
      if (this.currentDifficulty === "sandbox") return [];
      return LEVELS_DATA[this.currentDifficulty] || [];
    }

    getCurrentLevel() {
      if (this.currentDifficulty === "sandbox") {
        return LEVELS_DATA.sandbox;
      }
      const list = this.getCurrentLevelsList();
      return list[this.currentLevelIndex] || list[0];
    }

    // --- Chargement d'un niveau ---
    loadLevel() {
      this.sentenceWords = [];
      this.bankWords = [];

      const level = this.getCurrentLevel();

      if (this.currentDifficulty === "sandbox") {
        this.dom.levelBadge.textContent = "Mode Créatif (119 mots)";
        this.dom.levelHeading.textContent = level.title;
        this.dom.hintText.textContent = level.description;
        this.dom.btnPrevLevel.style.display = "none";
        this.dom.btnNextLevel.style.display = "none";
        if (this.dom.levelNavControls) this.dom.levelNavControls.style.display = "none";
        if (this.dom.sentencesSelectorContainer) this.dom.sentencesSelectorContainer.style.display = "none";
        this.dom.btnHint.style.display = "none";
        this.dom.btnValidate.innerHTML = '<span>🌟</span> Écouter & Célébrer';
        if (this.dom.sandboxFilters) {
          this.dom.sandboxFilters.style.display = "flex";
        }

        level.words.forEach((item) => {
          this.bankWords.push({
            uid: ++this.wordUidCounter,
            text: item.text,
            type: item.type
          });
        });
      } else {
        const list = this.getCurrentLevelsList();
        this.dom.btnPrevLevel.style.display = "inline-flex";
        this.dom.btnNextLevel.style.display = "inline-flex";
        if (this.dom.levelNavControls) this.dom.levelNavControls.style.display = "flex";
        if (this.dom.sentencesSelectorContainer) this.dom.sentencesSelectorContainer.style.display = "flex";
        this.dom.btnHint.style.display = "inline-flex";
        this.dom.btnValidate.innerHTML = '<span>✅</span> Vérifier la phrase';
        if (this.dom.sandboxFilters) {
          this.dom.sandboxFilters.style.display = "none";
        }

        this.dom.btnPrevLevel.disabled = this.currentLevelIndex === 0;
        this.dom.btnNextLevel.disabled = this.currentLevelIndex === list.length - 1;

        const diffLabels = { easy: "Facile", medium: "Moyen", hard: "Difficile" };
        this.dom.levelBadge.textContent = `${diffLabels[this.currentDifficulty]} : Phrase ${this.currentLevelIndex + 1} / ${list.length}`;
        this.dom.levelHeading.textContent = `Phrase ${this.currentLevelIndex + 1} : ${level.title}`;
        this.dom.hintText.textContent = level.hint;

        this.renderSentenceStepper();

        const targetTokens = level.sentence.trim().split(/\s+/);
        const allWords = [...targetTokens];

        if (level.distractors && level.distractors.length > 0) {
          allWords.push(...level.distractors);
        }

        const shuffled = this.shuffleArray(allWords);

        shuffled.forEach(text => {
          const type = (level.wordTypes && level.wordTypes[text]) || "noun";
          this.bankWords.push({
            uid: ++this.wordUidCounter,
            text: text,
            type: type
          });
        });
      }

      this.render();
    }

    // --- Rendu du sélecteur de phrases (1 à 10) ---
    renderSentenceStepper() {
      if (!this.dom.sentenceStepperList) return;
      this.dom.sentenceStepperList.innerHTML = "";
      const list = this.getCurrentLevelsList();
      let completedCount = 0;

      list.forEach((lvl, i) => {
        const isCompleted = !!this.completedLevels[lvl.id];
        if (isCompleted) completedCount++;

        const pill = document.createElement("button");
        pill.type = "button";
        pill.className = `step-pill ${i === this.currentLevelIndex ? "active" : ""} ${isCompleted ? "completed" : ""}`;
        pill.textContent = `${i + 1}`;
        pill.title = `Phrase ${i + 1} : ${lvl.title} ${isCompleted ? "(Réussie ⭐)" : ""}`;
        pill.setAttribute("aria-label", `Aller à la phrase ${i + 1} : ${lvl.title}`);
        pill.setAttribute("role", "tab");
        pill.setAttribute("aria-selected", i === this.currentLevelIndex ? "true" : "false");

        pill.addEventListener("click", () => {
          if (this.currentLevelIndex !== i) {
            this.currentLevelIndex = i;
            soundManager.playPop();
            this.loadLevel();
          }
        });

        this.dom.sentenceStepperList.appendChild(pill);
      });

      if (this.dom.progressionLabel) {
        this.dom.progressionLabel.textContent = `${completedCount} / ${list.length} réussie(s)`;
      }
      if (this.dom.progressBarFill) {
        const pct = list.length > 0 ? (completedCount / list.length) * 100 : 0;
        this.dom.progressBarFill.style.width = `${pct}%`;
      }
    }

    // --- Rendu dans le DOM ---
    render() {
      this.renderSentenceDropzone();
      this.renderWordsBank();
      this.updateInfo();
    }

    renderSentenceDropzone() {
      this.dom.sentenceDropzone.innerHTML = "";

      if (this.sentenceWords.length === 0) {
        const placeholder = document.createElement("p");
        placeholder.className = "dropzone-empty-placeholder";
        placeholder.textContent = "Clique ou glisse les mots ci-dessous pour composer ta phrase...";
        this.dom.sentenceDropzone.appendChild(placeholder);
        return;
      }

      this.sentenceWords.forEach((wordObj, index) => {
        const tile = this.createTileElement(wordObj, true, index);
        this.dom.sentenceDropzone.appendChild(tile);
      });
    }

    renderWordsBank() {
      this.dom.wordsBank.innerHTML = "";

      let wordsToDisplay = this.bankWords;

      // Filtrage par catégorie en mode bac à sable
      if (this.currentDifficulty === "sandbox" && this.sandboxFilter !== "all") {
        if (this.sandboxFilter === "other") {
          wordsToDisplay = this.bankWords.filter(w => ["adv", "conj", "punct"].includes(w.type));
        } else {
          wordsToDisplay = this.bankWords.filter(w => w.type === this.sandboxFilter);
        }
      }

      if (wordsToDisplay.length === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.className = "dropzone-empty-placeholder";
        emptyMsg.textContent = this.currentDifficulty === "sandbox"
          ? "Aucun mot dans cette catégorie."
          : "Tous les mots sont placés dans ta phrase !";
        this.dom.wordsBank.appendChild(emptyMsg);
        return;
      }

      wordsToDisplay.forEach((wordObj, index) => {
        const tile = this.createTileElement(wordObj, false, index);
        this.dom.wordsBank.appendChild(tile);
      });
    }

    createTileElement(wordObj, inSentence, index) {
      const tile = document.createElement("button");
      tile.type = "button";
      tile.className = `word-tile ${inSentence ? "in-sentence" : "in-bank"} type-${wordObj.type}`;
      tile.dataset.uid = wordObj.uid;
      tile.dataset.index = index;
      tile.dataset.inSentence = inSentence ? "true" : "false";
      tile.textContent = wordObj.text;
      tile.tabIndex = 0;

      const categoryLabel = (GRAMMAR_TYPES && GRAMMAR_TYPES[wordObj.type]?.label) || "";
      tile.setAttribute("aria-label", `${wordObj.text}, ${categoryLabel}. ${inSentence ? "Appuie sur Entrée pour retirer ou Flèches gauche/droite pour déplacer" : "Appuie sur Entrée pour ajouter à la phrase"}`);
      
      // Support Drag and Drop HTML5
      tile.draggable = true;

      tile.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", JSON.stringify({
          uid: wordObj.uid,
          fromSentence: inSentence,
          index: index,
          text: wordObj.text,
          type: wordObj.type
        }));
        e.dataTransfer.effectAllowed = "move";
        tile.classList.add("is-dragging");
      });

      tile.addEventListener("dragend", () => {
        tile.classList.remove("is-dragging");
      });

      // Clic simple / tactile : déplace instantanément le mot
      tile.addEventListener("click", () => {
        if (inSentence) {
          // Retirer de la phrase
          this.moveWordToBank(wordObj.uid);
          soundManager.playRemove();
        } else {
          // Ajouter à la phrase
          this.moveWordToSentence(wordObj.uid);
          soundManager.playPlace();
        }
      });

      // Navigation clavier avancée (Flèches gauche/droite pour réordonner dans la phrase)
      tile.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          tile.click();
        } else if (inSentence && (e.key === "ArrowLeft" || e.key === "ArrowRight")) {
          e.preventDefault();
          const targetOffset = e.key === "ArrowLeft" ? -1 : 1;
          const newPos = index + targetOffset;
          if (newPos >= 0 && newPos < this.sentenceWords.length) {
            const [moved] = this.sentenceWords.splice(index, 1);
            this.sentenceWords.splice(newPos, 0, moved);
            soundManager.playPlace();
            this.render();
            // Conserver le focus sur la tuile déplacée
            setTimeout(() => {
              const movedTile = this.dom.sentenceDropzone.querySelector(`[data-uid="${wordObj.uid}"]`);
              if (movedTile) movedTile.focus();
            }, 10);
          }
        }
      });

      return tile;
    }

    updateInfo() {
      if (this.currentDifficulty === "sandbox") {
        this.dom.wordsCountInfo.textContent = `${this.sentenceWords.length} mot(s) dans ta création · 119 mots en réserve`;
      } else {
        this.dom.wordsCountInfo.textContent = `${this.sentenceWords.length} mot(s) placé(s) · ${this.bankWords.length} disponible(s)`;
      }
    }

    // --- Gestion du Glisser-Déposer ---
    setupDropzoneEvents() {
      const dropzone = this.dom.sentenceDropzone;
      const bank = this.dom.wordsBank;

      // Dropzone
      dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        dropzone.classList.add("drag-over");
      });

      dropzone.addEventListener("dragleave", (e) => {
        if (!dropzone.contains(e.relatedTarget)) {
          dropzone.classList.remove("drag-over");
        }
      });

      dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("drag-over");

        const dataStr = e.dataTransfer.getData("text/plain");
        if (!dataStr) return;

        try {
          const data = JSON.parse(dataStr);
          const uid = data.uid;

          const targetTile = e.target.closest(".word-tile.in-sentence");
          let targetIndex = this.sentenceWords.length;

          if (targetTile) {
            targetIndex = parseInt(targetTile.dataset.index, 10);
          }

          if (data.fromSentence) {
            // Réorganisation interne
            const currentIndex = this.sentenceWords.findIndex(w => w.uid === uid);
            if (currentIndex !== -1) {
              const [word] = this.sentenceWords.splice(currentIndex, 1);
              this.sentenceWords.splice(targetIndex, 0, word);
              soundManager.playPlace();
              this.render();
            }
          } else {
            // Transfert depuis la réserve
            if (this.currentDifficulty === "sandbox") {
              // En bac à sable, duplication infinie du mot
              const newWord = {
                uid: ++this.wordUidCounter,
                text: data.text,
                type: data.type
              };
              this.sentenceWords.splice(targetIndex, 0, newWord);
            } else {
              const bankIndex = this.bankWords.findIndex(w => w.uid === uid);
              if (bankIndex !== -1) {
                const [word] = this.bankWords.splice(bankIndex, 1);
                this.sentenceWords.splice(targetIndex, 0, word);
              }
            }
            soundManager.playPlace();
            this.render();
          }
        } catch (err) {}
      });

      // Réserve de mots
      bank.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
      });

      bank.addEventListener("drop", (e) => {
        e.preventDefault();
        const dataStr = e.dataTransfer.getData("text/plain");
        if (!dataStr) return;

        try {
          const data = JSON.parse(dataStr);
          if (data.fromSentence) {
            this.moveWordToBank(data.uid);
            soundManager.playRemove();
          }
        } catch (err) {}
      });
    }

    // --- Manipulations de mots ---
    moveWordToSentence(uid) {
      if (this.currentDifficulty === "sandbox") {
        // En mode Bac à sable : ajoute une instance sans vider la réserve !
        const orig = this.bankWords.find(w => w.uid === uid);
        if (orig) {
          this.sentenceWords.push({
            uid: ++this.wordUidCounter,
            text: orig.text,
            type: orig.type
          });
          this.render();
        }
        return;
      }

      const index = this.bankWords.findIndex(w => w.uid === uid);
      if (index !== -1) {
        const [word] = this.bankWords.splice(index, 1);
        this.sentenceWords.push(word);
        this.render();
      }
    }

    moveWordToBank(uid) {
      const index = this.sentenceWords.findIndex(w => w.uid === uid);
      if (index !== -1) {
        const [word] = this.sentenceWords.splice(index, 1);
        if (this.currentDifficulty !== "sandbox") {
          this.bankWords.push(word);
        }
        this.render();
      }
    }

    resetLevel() {
      if (this.currentDifficulty === "sandbox") {
        this.sentenceWords = [];
      } else {
        while (this.sentenceWords.length > 0) {
          this.bankWords.push(this.sentenceWords.pop());
        }
      }
      soundManager.playRemove();
      this.render();
    }

    // --- Coup de pouce (Hint) ---
    giveHint() {
      if (this.currentDifficulty === "sandbox") return;

      const level = this.getCurrentLevel();
      const targetTokens = level.sentence.trim().split(/\s+/);

      let firstMistakeIndex = -1;
      for (let i = 0; i < targetTokens.length; i++) {
        if (!this.sentenceWords[i] || this.sentenceWords[i].text !== targetTokens[i]) {
          firstMistakeIndex = i;
          break;
        }
      }

      if (firstMistakeIndex === -1 && this.sentenceWords.length === targetTokens.length) {
        this.validateSentence();
        return;
      }

      const expectedText = targetTokens[firstMistakeIndex];

      if (this.sentenceWords[firstMistakeIndex]) {
        const wrongWord = this.sentenceWords.splice(firstMistakeIndex, 1)[0];
        this.bankWords.push(wrongWord);
      }

      let foundInBankIndex = this.bankWords.findIndex(w => w.text === expectedText);
      if (foundInBankIndex !== -1) {
        const [word] = this.bankWords.splice(foundInBankIndex, 1);
        this.sentenceWords.splice(firstMistakeIndex, 0, word);
      } else {
        let foundInSentenceIndex = this.sentenceWords.findIndex((w, idx) => idx > firstMistakeIndex && w.text === expectedText);
        if (foundInSentenceIndex !== -1) {
          const [word] = this.sentenceWords.splice(foundInSentenceIndex, 1);
          this.sentenceWords.splice(firstMistakeIndex, 0, word);
        }
      }

      soundManager.playPop();
      this.render();

      const targetEl = this.dom.sentenceDropzone.children[firstMistakeIndex];
      if (targetEl) {
        targetEl.classList.add("correct");
        setTimeout(() => targetEl.classList.remove("correct"), 800);
      }
    }

    // --- Construction et Lecture Vocale ---
    buildSentenceString() {
      return this.sentenceWords.map(w => w.text).join(" ");
    }

    speakCurrentSentence() {
      const text = this.buildSentenceString();
      if (!text.trim()) {
        soundManager.speak("La phrase est encore vide. Ajoute des mots pour commencer !");
        return;
      }

      this.dom.btnSpeak.classList.add("speaking");
      soundManager.speak(
        text,
        () => this.dom.btnSpeak.classList.add("speaking"),
        () => this.dom.btnSpeak.classList.remove("speaking")
      );
    }

    // --- Validation Multi-Alternatives ---
    validateSentence() {
      soundManager.ensureContext();

      if (this.sentenceWords.length === 0) {
        soundManager.playError();
        this.dom.hintText.textContent = "⚠️ Place au moins un mot pour composer ta phrase !";
        return;
      }

      // Mode Bac à sable
      if (this.currentDifficulty === "sandbox") {
        const sentenceText = this.buildSentenceString();
        soundManager.playSuccess();
        this.confetti.burst(75);
        this.speakCurrentSentence();

        this.dom.modalTitle.textContent = "Magnifique création !";
        this.dom.modalSentence.textContent = `« ${sentenceText.replace(/\s+([.,!?;:])/g, "$1")} »`;
        this.openModal();
        return;
      }

      const level = this.getCurrentLevel();
      const validSentences = [level.sentence, ...(level.alternatives || [])];
      const userTokens = this.sentenceWords.map(w => w.text);

      // Chercher si la phrase correspond à la phrase cible ou à l'une de ses alternatives valides
      const matchedSentence = validSentences.find(s => {
        const sTokens = s.trim().split(/\s+/);
        return userTokens.length === sTokens.length &&
               userTokens.every((token, idx) => token === sTokens[idx]);
      });

      const isCorrect = !!matchedSentence;
      const targetTokens = (matchedSentence || level.sentence).trim().split(/\s+/);
      const tiles = this.dom.sentenceDropzone.querySelectorAll(".word-tile");

      if (isCorrect) {
        tiles.forEach(tile => tile.classList.add("correct"));
        soundManager.playSuccess();
        this.confetti.burst(90);

        // Enregistrer la réussite pour la persistance des étoiles
        if (level.id) {
          this.completedLevels[level.id] = true;
          try {
            localStorage.setItem("phraseForge_completed", JSON.stringify(this.completedLevels));
          } catch (e) {}
          this.renderSentenceStepper();
        }

        const cleanPhrase = this.buildSentenceString().replace(/\s+([.,!?;:])/g, "$1");
        if (soundManager.voiceEnabled) {
          soundManager.speak(cleanPhrase);
        }

        setTimeout(() => {
          this.dom.modalTitle.textContent = "Bravo ! C'est parfait !";
          this.dom.modalSentence.textContent = `« ${cleanPhrase} »`;
          this.openModal();
        }, 700);

      } else {
        soundManager.playError();

        tiles.forEach((tile, index) => {
          if (targetTokens[index] === userTokens[index]) {
            tile.classList.add("correct");
          } else {
            tile.classList.add("misplaced");
          }
        });

        setTimeout(() => {
          tiles.forEach(t => t.classList.remove("correct", "misplaced"));
        }, 1000);

        if (userTokens.length < targetTokens.length) {
          this.dom.hintText.textContent = "💡 Il manque encore des mots pour compléter la phrase.";
        } else if (userTokens.length > targetTokens.length) {
          this.dom.hintText.textContent = "💡 Il y a des mots en trop ! Retire les intrus.";
        } else {
          this.dom.hintText.textContent = "💡 Presque ! Regarde bien l'ordre des mots ou les accords.";
        }
      }
    }

    // --- Modale ---
    openModal() {
      this.dom.modal.classList.add("open");
    }

    closeModal() {
      this.dom.modal.classList.remove("open");
    }

    // --- Utilitaire Mélange ---
    shuffleArray(array) {
      const arr = [...array];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
  }

  // Lancement automatique
  window.addEventListener("DOMContentLoaded", () => {
    new SentenceGame();
  });
})();
