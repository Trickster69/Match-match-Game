import './SettingPage.css'
import {ClearFields} from '../../components/ClearFields'

export class SettingPage extends ClearFields {
  settingContainer: HTMLDivElement | undefined;
  body: HTMLBodyElement | null = document.querySelector('body');
  headerBtn: HTMLDivElement | null = document.querySelector('.header__setting-btn');
  e:  MouseEvent | null | undefined;
  // difficult: HTMLElement | null ;
  // type: HTMLElement | null | undefined;

    constructor() {
        super();
        this.renderer();
        this.setDifficulty();

    }

    renderer() {

      this.settingContainer = document.createElement('div');
      if(!this.settingContainer)  throw Error('App element not found');
      this.settingContainer.classList.add('setting-field');
      this.settingContainer.innerHTML = `
      <div class="setting-field__title">Game Settings:</div>

      <div class="settings">
          <div class="setting_item">
              <div class="cards-type-menu__title">Game cards:</div>
              <div class="form-type-game">
                  <select id="type" name="select_type">
                      <option selected="selected">Select game cards type</option>
                      <option id="animal">Nature</option>
                      <option id="cars">Supernatural</option>
                      <option id="cars">Wild animals</option>
                  </select>
              </div>
          </div>

          <div class="setting_item">
              <div class="cards-type-menu__title">Difficulty:</div>
              <form class="form-type-game">
                  <select id="difficult" name="select_difficulty">
                      <option selected="selected" style="font-family: 'Adigiana2'">Select game difficulty</option>
                      <option id="fourth">4x4</option>
                      <option id="six">6x6</option>
                  </select>
              </form>

          </div>
      </div>
      `;
      if(!this.body) throw Error('App element not found');
      this.body.appendChild(this.settingContainer);

      // if(!this.headerBtn) throw Error('App element not found');
      // this.headerBtn.classList.add('active');


    }

     setDifficulty() {
      const type = document.querySelector('#type');
      if(!type) throw Error('App element not found');

        type.addEventListener('change', (e: any)=> {

            localStorage.setItem('category', e.target.value);
            console.log(e.target.value);

        });

        const difficult = document.getElementById('difficult');
        if(!difficult) throw Error('App element not found');

        difficult.addEventListener('change', function(e:any) {
          localStorage.setItem('difficulty', e.target.value);
        });
    }
}
