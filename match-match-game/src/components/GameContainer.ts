export class GameContainer {
  gameContainer: HTMLDivElement;
  body: HTMLBodyElement | null;
  constructor() {
      this.gameContainer = document.createElement('div');
      this.gameContainer.classList.add('game-container');
      this.gameContainer.innerHTML = `
          <div class="game-container__info">
              <div class="game-info">
                  Time <span id="time-remaining">0</span>
              </div>

              <div class="game-info">
                  <button class="game-info__start-game">
                      Start/Restart
                  </button>
              </div>

              <div class="game-info">
                  Flips <span id="flips">0</span>
              </div>
          </div>
      `;
      this.body = document.querySelector('body');
      if(!this.body) throw Error('No found body in GameOver Modal')
      this.body.appendChild(this.gameContainer);
  }
}
