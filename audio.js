// Gestionnaire Audio (Effets sonores Web Audio API + Synthèse Vocale Web Speech API)

class SoundManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.voiceEnabled = true;
    this.synth = typeof window !== "undefined" ? window.speechSynthesis : null;
    this.frenchVoice = null;
    this.isSpeaking = false;

    // Charger les préférences stockées
    try {
      const savedSound = localStorage.getItem("phraseForge_sound");
      if (savedSound !== null) this.soundEnabled = savedSound === "true";

      const savedVoice = localStorage.getItem("phraseForge_voice");
      if (savedVoice !== null) this.voiceEnabled = savedVoice === "true";
    } catch (e) {}

    this.initVoice();
  }

  ensureContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  initVoice() {
    if (!this.synth) return;
    const findVoice = () => {
      const voices = this.synth.getVoices();
      this.frenchVoice = voices.find(v => v.lang === "fr-FR" && !v.name.includes("Google")) ||
                         voices.find(v => v.lang.startsWith("fr")) ||
                         null;
    };
    findVoice();
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = findVoice;
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    try { localStorage.setItem("phraseForge_sound", this.soundEnabled); } catch (e) {}
    if (this.soundEnabled) this.playPop();
    return this.soundEnabled;
  }

  toggleVoice() {
    this.voiceEnabled = !this.voiceEnabled;
    try { localStorage.setItem("phraseForge_voice", this.voiceEnabled); } catch (e) {}
    return this.voiceEnabled;
  }

  playPop() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (e) {}
  }

  playPlace() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playRemove() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.07);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      const now = this.ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + index * 0.1;
        const duration = 0.35;

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.22, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {}
  }

  playError() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [280, 220].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + i * 0.12;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.11);
      });
    } catch (e) {}
  }

  speak(text, onStart, onEnd) {
    if (!this.synth) {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = text.replace(/\s+([.,!?;:])/g, "$1").trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    try {
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = "fr-FR";
      utterance.rate = 0.92;
      utterance.pitch = 1.05;

      if (this.frenchVoice) {
        utterance.voice = this.frenchVoice;
      }

      utterance.onstart = () => {
        this.isSpeaking = true;
        if (onStart) onStart();
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      utterance.onerror = () => {
        this.isSpeaking = false;
        if (onEnd) onEnd();
      };

      this.synth.speak(utterance);
    } catch (err) {
      if (onEnd) onEnd();
    }
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
    }
  }
}

const soundManager = new SoundManager();

if (typeof window !== "undefined") {
  window.soundManager = soundManager;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { soundManager };
}
