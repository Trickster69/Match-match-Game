import './Header.css';

export class Header {
  header: HTMLDivElement;
  body: HTMLBodyElement|null;
  constructor() {
    this.header = document.createElement('div');
    this.header.classList.add('header');

    this.header.innerHTML = `
    <div class="header__container">
        <h1 class="header__logo">
        <div class="header__line-1-logo">Match-Match</div>
        <div class="header__line-2-logo">GAME</div>
        </h1>
        <div class="header_buttons">
        <div class="header__about-btn btn_setting">About Game</div>
        <div class="header__score-btn btn_setting">Best Score</div>
        <div class="header__setting-btn btn_setting">Game Settings</div>
        </div>
        <div class="header__stop-btn">
        <button disabled='disabled' id="stop_btn">pause</button>
        </div>
    </div>
    `;

    this.body = document.querySelector('body');
    if(!this.body) throw Error('No found body in GameOver Modal')
    this.body.appendChild(this.header);
  }
}
