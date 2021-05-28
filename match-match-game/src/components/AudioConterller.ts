export class AudioController {
  bgMusic: HTMLAudioElement;
  flipSound: HTMLAudioElement;
  matchSound: HTMLAudioElement;
  vicotrySound: HTMLAudioElement;
  gameOverSound: HTMLAudioElement;
  buttonClick: HTMLAudioElement;

  constructor() {
      this.bgMusic = new Audio('./assets/Audio/match-bg2.mp3');
      this.flipSound = new Audio('./assets/Audio/flip.wav');
      this.matchSound = new Audio('./assets/Audio/match.wav');
      this.vicotrySound = new Audio('./assets/Audio/victory.mp3');
      this.gameOverSound = new Audio('./assets/Audio/game-over.mp3');
      this.buttonClick = new Audio('./assets/Audio/btn.mp3');
      this.bgMusic.volume = 0.4;
      this.gameOverSound.volume = 0.1;
      this.bgMusic.loop = true;
  }

  clickButton() {
      this.buttonClick.play();
  }

  startMusic() {
      this.bgMusic.play();
  }

  gameOver() {
      this.gameOverSound.play();
  }

  stopMusic() {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
  }

  pauseMusic() {
      this.bgMusic.pause();
      // this.bgMusic.currentTime = 0;
  }

  flip() {
      this.flipSound.play();
  }

  match() {
      this.matchSound.play();
  }

  victory() {
      this.stopMusic();
      this.vicotrySound.play();
  }
}
