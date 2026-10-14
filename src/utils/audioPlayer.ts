// Audio utility for Urdu poetry recitation & meditative Eastern ambient sounds
class AudioManager {
  private ctx: AudioContext | null = null;
  private isAmbientPlaying = false;
  private ambientGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private rainNoiseNode: AudioNode | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Meditative Tanpura / Indian Classical drone (Sa-Pa harmonic chord)
  public toggleAmbientMusic(onStateChange?: (playing: boolean) => void): boolean {
    this.initContext();
    if (!this.ctx) return false;

    if (this.isAmbientPlaying) {
      this.stopAmbient();
      onStateChange?.(false);
      return false;
    } else {
      this.startAmbient();
      onStateChange?.(true);
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isAmbientPlaying;
  }

  private startAmbient() {
    if (!this.ctx) return;
    this.stopAmbient();

    this.ambientGain = this.ctx.createGain();
    this.ambientGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    this.ambientGain.gain.exponentialRampToValueAtTime(0.12, this.ctx.currentTime + 2);
    this.ambientGain.connect(this.ctx.destination);

    // Fundamental frequencies in C# (Sa ~ 138.59 Hz, Pa ~ 207.65 Hz, High Sa ~ 277.18 Hz)
    const baseFreqs = [138.59, 207.65, 277.18, 554.37];

    baseFreqs.forEach((freq, idx) => {
      if (!this.ctx || !this.ambientGain) return;
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();

      // Warm harmonic sine + triangle blend
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Gentle tremolo / vibrato
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(0.15 + idx * 0.08, this.ctx.currentTime);
      lfoGain.gain.setValueAtTime(1.2, this.ctx.currentTime);
      lfo.connect(osc.frequency);
      lfo.start();

      oscGain.gain.setValueAtTime(0.25 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.ambientGain);
      osc.start();

      this.oscillators.push(osc, lfo);
    });

    this.isAmbientPlaying = true;
  }

  public stopAmbient() {
    if (this.ambientGain && this.ctx) {
      try {
        this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.8);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      this.oscillators.forEach(o => {
        try { o.stop(); o.disconnect(); } catch { /* ignore */ }
      });
      this.oscillators = [];
      this.isAmbientPlaying = false;
    }, 850);
  }

  // Recite verse using SpeechSynthesis API with Urdu voice priority
  public recitePoem(text: string, onEnd?: () => void): boolean {
    if (!('speechSynthesis' in window)) {
      return false;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    
    // Look for urdu, ur, or hindi
    const urduVoice = voices.find(v => v.lang.startsWith('ur')) ||
                      voices.find(v => v.lang.startsWith('hi')) ||
                      voices.find(v => v.lang.includes('India') || v.lang.includes('Pakistan'));
    
    if (urduVoice) {
      utterance.voice = urduVoice;
      utterance.lang = urduVoice.lang;
    } else {
      utterance.lang = 'ur-PK';
    }

    utterance.rate = 0.85; // slower, soulful recitation speed for poetry
    utterance.pitch = 0.95;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  }

  public stopReciting() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}

export const audioManager = new AudioManager();
