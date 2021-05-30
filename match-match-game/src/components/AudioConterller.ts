export class AudioController {
  bgMusic: HTMLAudioElement;

  flipSound: HTMLAudioElement;

  matchSound: HTMLAudioElement;

  vicotrySound: HTMLAudioElement;

  gameOverSound: HTMLAudioElement;

  buttonClick: HTMLAudioElement;

  constructor() {
    this.bgMusic = new Audio('./Audio/match-bg2.mp3');
    this.flipSound = new Audio('./Audio/flip.wav');
    this.matchSound = new Audio('./Audio/match.wav');
    this.vicotrySound = new Audio('./Audio/victory.mp3');
    this.gameOverSound = new Audio('./Audio/game-over.mp3');
    this.buttonClick = new Audio('./Audio/btn.mp3');
    this.bgMusic.volume = 0.4;
    this.gameOverSound.volume = 0.1;
  }

  clickButton() {
    this.buttonClick.play();
  }

  startMusic() {
    this.bgMusic.play();
    this.bgMusic.loop = true;
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
