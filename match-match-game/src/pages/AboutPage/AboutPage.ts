import './AboutPage.css'
import {ClearFields} from '../../components/ClearFields'

export class AboutPage extends ClearFields{
  body: HTMLBodyElement | null = document.querySelector('body');
  abouContainer: HTMLDivElement | null = document.createElement('div');
  headerAbout: HTMLElement | null = document.querySelector('.header__about-btn');
  constructor() {
      super();
  }

  renderer() {
      if (!this.abouContainer) throw Error('App element not found');
      this.abouContainer.classList.add('about-container');
      this.abouContainer.innerHTML = `
      <div class="about-game">
          <div class="about-game__title">How to play?</div>
          <div class="about-game__rules">
              <div class="step">1. Configure your game settings. (if you want)</div>
              <div class="step">2. Start new game! Remember card positions and match it before times up.</div>
              <div class="step">3. Fill out the form after the game ends. </div>
              <div class="step">4. Enjoy the game</div>

          </div>
      </div>
      `;

      if (!this.body) throw Error('App element not found');
      this.body.appendChild(this.abouContainer);


      if (!this.headerAbout) throw Error('App element not found');
      this.headerAbout.classList.add('active');


  }
}

