import { AudioController } from './AudioConterller';
import { GameOverModal } from './GameOverModal/GameOverModal';
import { VictoryModal } from './VictoryModal/VictoryModal';

export class Game {
  cardsArray: HTMLElement[];

  totalTime: number;

  timeRemaining: number;

  timer: HTMLElement | null;

  ticker: HTMLElement | null;

  audioController: AudioController;

  pauseBtn: HTMLElement | null;

  backCard: NodeListOf<Element>;

  startGameBtn: HTMLElement | null;

  cardsCount: number;

  busy: boolean | undefined;

  cardToCheck: HTMLElement | null | undefined;

  totalClicks!: number;

  matchedCards: HTMLElement[] | undefined;

  MatchCount!: number;

  MistakeCount: number | undefined;

  myGreeting: NodeJS.Timeout | undefined;

  modal: VictoryModal | undefined;

  countDown!: NodeJS.Timeout;

  constructor(totalTime: number, cards: HTMLElement[]) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
    this.audioController = new AudioController();
    this.pauseBtn = document.getElementById('stop_btn');
    this.backCard = document.querySelectorAll('.card__back');
    this.startGameBtn = document.querySelector('.game-info__start-game');
    this.cardsCount = this.cardsArray.length;

    this.btnPause();
  }

  btnPause() {
    if (!this.pauseBtn) throw Error('Check pauseBtn in Game');
    this.pauseBtn.addEventListener('click', () => {
      this.audioController.clickButton();
      if (!this.pauseBtn) throw Error('Check pauseBtn in Game');
      if (this.pauseBtn.textContent === 'pause') {
        this.pauseBtn.textContent = 'resume';
        this.audioController.pauseMusic();
        this.pauseTimer();
        this.busy = true;
        if (!this.startGameBtn) throw Error('Check startGameBtn in Game');
        this.startGameBtn.style.color = '#5f5d56';
      } else {
        if (!this.startGameBtn) throw Error('Check startGameBtn in Game');
        this.pauseBtn.textContent = 'pause';
        this.resumeTimer();
        this.busy = false;
        this.startGameBtn.style.color = '#d3ad21';
        this.audioController.startMusic();
      }
    });
  }

  startGame() {
    this.audioController.startMusic();
    clearInterval(this.countDown);
    this.showCardsBeforeGame();
    this.audioController.clickButton();
    this.cardToCheck = null;
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.matchedCards = [];
    this.busy = true;
    this.MatchCount = 0;
    this.MistakeCount = 0;

    if (!this.timer) throw Error('Check this.timer.innerText in Game');
    if (!this.ticker) throw Error('Check this.ticker.innerText in Game');
    this.timer.innerText = `${this.timeRemaining}`;
    this.ticker.innerText = `${this.totalClicks}`;
  }

  stopGame() {
    this.audioController.stopMusic();
    clearInterval(this.countDown);
  }

  showCardsBeforeGame() {
    this.shuffleCards();

    this.cardsArray.forEach((card) => {
      (card.querySelector('.card__front') as HTMLElement).classList.remove(
        'matched_bg',
      );
      card.classList.remove('flipped');
      card.classList.remove('matched');
    });

    this.myGreeting = setTimeout(() => {
      this.startTimer();
      if (!this.pauseBtn) throw Error('check pauseBtn in Game');
      this.pauseBtn.removeAttribute('disabled');
      this.pauseBtn.style.color = '#d3ad21';
      this.cardsArray.forEach((card) => {
        card.classList.add('flipped');
      });
    }, 5000);
  }

  startTimer() {
    clearInterval(this.countDown);
    return setTimeout(() => {
      // this.audioController.startMusic(); //запуск музыки
      this.countDown = this.startCountDown();
      this.busy = false;
    }, 500);
  }

  pauseTimer() {
    clearInterval(this.countDown);
    this.backCard.forEach((back) => back.classList.add('disabled'));
    if (!this.startGameBtn) throw Error('check startGameBtn in Game');
    this.startGameBtn.setAttribute('disabled', 'disabled');
  }

  resumeTimer() {
    this.startTimer();
    this.backCard.forEach((back) => back.classList.remove('disabled'));
    if (!this.startGameBtn) throw Error('check startGameBtn in Game');
    this.startGameBtn.removeAttribute('disabled');
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.add('flipped');
      card.classList.remove('matched');
    });
  }

  flipCard(card: HTMLElement) {
    if (this.canFlipCard(card)) {
      this.audioController.flip();
      // if(!this.totalClicks) throw Error('check totalClicks in Game')
      if (!this.ticker) throw Error('check ticker in Game');
      this.totalClicks++;
      this.ticker.innerHTML = `${this.totalClicks}`;
      card.classList.remove('flipped');

      if (this.cardToCheck) {
        this.checkForCardCheckMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardCheckMatch(card: HTMLElement) {
    if (!this.cardToCheck) throw Error('check cardToCheck in Game');
    ++this.MatchCount;
    // console.log('AllCount: ' + this.MatchCount);
    if (this.getCardType(card) === this.getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMisMatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }

  cardMatch(card1: HTMLElement, card2: HTMLElement) {
    if (!this.matchedCards) throw Error('check matchedCards in Game');
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    (card1.querySelector('.card__front') as HTMLElement).classList.add(
      'matched_bg',
    );
    card2.classList.add('matched');
    (card2.querySelector('.card__front') as HTMLElement).classList.add(
      'matched_bg',
    );
    this.audioController.match();
    if (this.matchedCards.length === this.cardsArray.length) {
      this.victory();
    }
  }

  cardMisMatch(card1: HTMLElement, card2: HTMLElement) {
    // if(!this.MistakeCount) throw Error('check MistakeCount in Game')
    // this.MistakeCount ++;
    // console.log('MistakeCount: ' + this.MistakeCount);
    this.busy = true;
    (card1.querySelector('.card__front') as HTMLElement).classList.add(
      'no_matched',
    );
    (card2.querySelector('.card__front') as HTMLElement).classList.add(
      'no_matched',
    );

    setTimeout(() => {
      (card1.querySelector('.card__front') as HTMLElement).classList.remove(
        'no_matched',
      );
      (card2.querySelector('.card__front') as HTMLElement).classList.remove(
        'no_matched',
      );
    }, 1500);

    setTimeout(() => {
      card1.classList.add('flipped');
      card2.classList.add('flipped');
      this.busy = false;
    }, 1000);
  }

  getCardType = (card: HTMLElement) => (card.querySelector('.card__front') as HTMLElement).style.backgroundImage;

  startCountDown() {
    clearInterval(this.countDown);
    return setInterval(() => {
      this.timeRemaining--;
      if (!this.timer) throw Error('check timer in Game');
      this.timer.innerText = `${this.timeRemaining}`;

      if (this.timeRemaining === 0) {
        this.gameOver();
      }
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countDown);
    this.audioController.stopMusic();
    this.audioController.gameOver();
    this.hideCards();
    const GameoverModal = new GameOverModal();

    this.totalClicks = 0;
    if (!this.ticker) throw Error('check ticker in Game');
    if (!this.timer) throw Error('check ticker in Game');
    this.ticker.innerHTML = `${this.totalClicks}`;
    this.timeRemaining = this.totalTime;
    this.timer.innerText = `${this.timeRemaining}`;
    if (!this.pauseBtn) throw Error('check pauseBtn in Game');
    this.pauseBtn.setAttribute('disabled', 'disabled');
    this.pauseBtn.style.color = '#5f5d56';
  }

  victory() {
    if (!this.timer) throw Error('check timer in Game');
    if (!this.pauseBtn) throw Error('check pauseBtn in Game');
    if (!this.ticker) throw Error('check pauseBtn in Game');
    clearInterval(this.countDown);
    this.audioController.victory();
    this.modal = new VictoryModal(this.getScore());
    this.hideCards();
    this.getScore();
    this.timeRemaining = this.totalTime;
    this.timer.innerText = `${this.timeRemaining}`;
    this.pauseBtn.setAttribute('disabled', 'disabled');
    this.totalClicks = 0;
    this.ticker.innerHTML = `${this.totalClicks}`;
  }

  shuffleCards() {
    for (let i = this.cardsArray.length - 1; i > 0; i--) {
      const randIndex: number = Math.floor(Math.random() * (i + 1));
      this.cardsArray[randIndex].style.order = `${i}`;
    }
  }

  canFlipCard(card: HTMLElement) {
    if (!this.matchedCards) throw Error('check matchedCards in Game');
    return (
      !this.busy
      && !this.matchedCards.includes(card)
      && card !== this.cardToCheck
    );
  }

  getScore = () => 5400;
    // if(!this.MatchCount) throw Error('check MatchCount in Game')
    // if(!this.MistakeCount) throw Error('check MistakeCount in Game')
    // if(!this.timer) throw Error('check timer in Game')
    //   //toDo make formula
}
