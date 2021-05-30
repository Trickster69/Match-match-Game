import './SettingPage.css';
import { ClearFields } from '../../components/ClearFields';

export class SettingPage extends ClearFields {
  settingContainer: HTMLDivElement | undefined;

  body: HTMLBodyElement | null = document.querySelector('body');

  headerBtn: HTMLDivElement | null = document.querySelector(
    '.header__setting-btn',
  );

  e: MouseEvent | null | undefined;
  // difficult: HTMLElement | null ;
  // type: HTMLElement | null | undefined;

  constructor() {
    super();
    this.renderer();
    this.setDifficulty();
  }

  renderer() {
    this.settingContainer = document.createElement('div');
    if (!this.settingContainer) throw Error('App element not found');
    this.settingContainer.classList.add('setting-field');
    this.settingContainer.innerHTML = `
      <div class="setting-field__title">Game Settings:</div>

      <div class="settings">
        <div class="setting_item">
            <div class="cards-type-menu__title">Game cards:</div>
            <div id="Nature" class="cardsType set_typecard">Nature</div>
            <div id="Supernatural" class="cardsType set_typecard">Supernatural</div>
            <div id="Wild animals" class="cardsType set_typecard">Wild animals</div>
        </div>

        <div class="setting_item">
            <div class="cards-type-menu__title">Difficulty:</div>
            <div id="4x4" class="cardsType set_difficulty">4x4</div>
            <div id="6x6" class="cardsType set_difficulty">6x6</div>
        </div>
      </div>
      `;
    if (!this.body) throw Error('App element not found');
    this.body.appendChild(this.settingContainer);
    // if(!this.headerBtn) throw Error('App element not found');
    // this.headerBtn.classList.add('active');
  }

  setDifficulty() {
    (document.getElementById('Nature') as HTMLElement).addEventListener('click', () => {
        localStorage.setItem('category', 'Nature');
        this.clearColorBtns('set_typecard', 'Nature');
    });

    (document.getElementById('Supernatural') as HTMLElement).addEventListener('click', () => {
        localStorage.setItem('category', 'Supernatural');
        this.clearColorBtns('set_typecard', 'Supernatural');
    });

    (document.getElementById('Wild animals') as HTMLElement).addEventListener('click', () => {
        localStorage.setItem('category', 'Wild animals');
        this.clearColorBtns('set_typecard', 'Wild animals');
    });

    (document.getElementById('4x4') as HTMLElement).addEventListener('click', () => {
        localStorage.setItem('difficulty', '4x4');
        this.clearColorBtns('set_difficulty', '4x4');
    });

    (document.getElementById('6x6') as HTMLElement).addEventListener('click', () => {
        localStorage.setItem('difficulty', '6x6');
        this.clearColorBtns('set_difficulty', '6x6');
    });

    const nowTypeGame = localStorage.getItem('category');
    const nowDiffcaltyGame = localStorage.getItem('difficulty');

    (document.getElementById(nowTypeGame || 'Nature') as HTMLElement).classList.add('active');
    (document.getElementById(nowDiffcaltyGame || '4x4') as HTMLElement).classList.add('active');
  }

  clearColorBtns = (typeSetting:string, selectBtn:string) => {
    document.querySelectorAll(`.${typeSetting}`).forEach((btn) => {
        btn.classList.remove('active');
        (document.getElementById(`${selectBtn}`) as HTMLElement).classList.add('active');
    });
  };
}
