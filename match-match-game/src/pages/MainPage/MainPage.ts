import { AudioController } from '../../components/AudioConterller';
import { Card } from '../../components/Card/Card';
import { Header } from '../Header/Header';
import { GameContainer } from '../../components/GameContainer/GameContainer';
import { Game } from '../../components/Game';
import { ClearFields } from '../../components/ClearFields';
import { AboutPage } from '../AboutPage/AboutPage';
import { ScorePage } from '../ScorePage/ScorePage';
import { SettingPage } from '../SettingPage/SettingPage';

export class MainPage extends ClearFields {
  AudioController: AudioController;

  btnGame: HTMLElement | null;

  category: string;

  difficult: string;

  pauseBtn: HTMLElement | null;

  header!: HTMLElement | null;

  cat!: string;

  images!: string;

  dif!: string;

  logo!: HTMLElement | null;

  cards!: any;

  headerBtns: NodeListOf<Element> | undefined;

  body!: HTMLBodyElement | null;

  Newgame!: Game;

  constructor() {
    super();
    const gameContainer = new GameContainer();
    this.checkNewHeader();
    const header = new Header();
    this.routing();

    this.AudioController = new AudioController();

    this.btnGame = document.getElementById('stop_btn');
    this.category = localStorage.getItem('category') || 'Nature';
    this.difficult = localStorage.getItem('difficulty') || '4x4';
    this.pauseBtn = document.getElementById('stop_btn');
    this.addCards(this.category, this.difficult).then(() => {
      this.ready();
    });
  }

  checkNewHeader() {
    this.header = document.querySelector('.header');
    this.body = document.querySelector('body');
    if (!this.body) throw Error('check body in MainPage');
    if (this.body.contains(this.header)) {
      if (!this.header) throw Error('check Header in MainPage');
      this.header.remove();
    }
  }

  async addCards(category: string, difficult: string) {
    const res = await fetch('./settings.json');
    const obj = await res.json();
    console.log(obj);

    this.cat = '';
    this.images = '';
    this.dif = '';
    if (category == 'Nature') {
      this.cat = obj[0].category;
      this.images = obj[0].images;
    } else if (category === 'Supernatural') {
      this.cat = obj[1].category;
      this.images = obj[1].images;
    } else if (category === 'Wild animals') {
      this.cat = obj[2].category;
      this.images = obj[2].images;
    }
    if (difficult === '4x4') {
      this.dif = '8';
    } else if (difficult === '6x6') {
      this.dif = '18';
    }
    /*Добавили карты на страницу через класс */
    const imagesForRender = this.images.slice(0, parseInt(this.dif));
    const finImages = imagesForRender.concat(imagesForRender);

    for (let i = 0; i < finImages.length; i++) {
      (document.querySelector('.game-container') as HTMLElement).appendChild(
        new Card(finImages[i], this.cat).card,
      );

      if (this.dif === '18') {
        (
          document.querySelector('.game-container') as HTMLElement
        ).style.gridTemplateColumns = 'repeat(6,auto)';

        //  [...document.getElementsByClassName('.card')].forEach(card => {
        //       card.style.height = '105px';
        //       card.style.width = '87.5px';
        //   });
      }
    }
  }

  routing() {
    this.logo = document.querySelector('.header__logo');
    if (!this.logo) throw Error('Check logo in MainPage');
    this.logo.addEventListener('click', () => {
      this.AudioController.clickButton();
      if (!this.Newgame) throw Error('check game in MainPage');
      this.Newgame.stopGame();
      new MainPage();
    });

    this.headerBtns = document.querySelectorAll('.btn_setting');
    if (!this.headerBtns) throw Error('Check headerBtns in MainPage');
    this.headerBtns.forEach((btn) =>
      btn.addEventListener('click', () => {
        if (!this.pauseBtn) throw Error('Check pauseBtn in MainPage');
        this.pauseBtn.setAttribute('disabled', 'disabled');
        this.pauseBtn.textContent = 'pause';
        this.pauseBtn.style.color = '#5f5d56';

        this.AudioController.clickButton();
        if (btn.classList.contains('header__about-btn')) {
          new AboutPage().renderer();
        } else if (btn.classList.contains('header__score-btn')) {
          new ScorePage().renderer();
        } else if (btn.classList.contains('header__setting-btn')) {
          new SettingPage();
        }
      }),
    );
  }

  ready() {
    this.cards = [...document.getElementsByClassName('card')];
    if (this.cards.length == 16) {
      this.Newgame = new Game(100, this.cards) as Game;
    } else {
      this.Newgame = new Game(200, this.cards) as Game;
    }

    (
      document.querySelector('.game-info__start-game') as HTMLElement
    ).addEventListener('click', () => {
      if (!this.Newgame) throw Error('check game in MainPage');
      this.Newgame.startGame();
    });
    document.querySelectorAll('.btn_setting').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (!this.Newgame) throw Error('check game in MainPage');
        this.Newgame.stopGame();
      });
    });

    this.cards.forEach((card: HTMLElement) =>
      card.addEventListener('click', () => this.Newgame.flipCard(card)),
    );
  }
}
