export class ClearFields {
  body: HTMLBodyElement | null;
  game: HTMLElement | null = document.querySelector('.game-container');
  about: HTMLElement | null = document.querySelector('.about-container');
  score: HTMLElement | null = document.querySelector('.score-container');
  setting: HTMLElement | null = document.querySelector('.setting-field');
  victory: HTMLElement | null = document.querySelector('.victory-modal');
  overlay: NodeListOf<Element>;
  constructor() {
      this.body = document.querySelector('body');
      if (!this.body) throw Error('App element not found');
      if (!this.game) throw Error('App element not found');
      if (!this.about) throw Error('App element not found');
      if (!this.score) throw Error('App element not found');
      if (!this.setting) throw Error('App element not found');
      if (!this.victory) throw Error('App element not found');

      this.overlay = document.querySelectorAll('.overlay');

      if(this.body.contains(this.about)){
          this.about.remove();
      }
      if(this.body.contains(this.score)){
          this.score.remove();
      }
      if(this.body.contains(this.setting)){
          this.setting.remove();
      }
      if(this.body.contains(this.game)){
          this.game.remove();
      }
      if(this.body.contains(this.victory)){
          this.victory.remove();
      }
      if([...this.overlay].length > 0){
          this.overlay[0].remove();
      }

      document.querySelectorAll('.btn_setting').forEach(btn => {
          btn.classList.remove("active");
      });
  }
}
