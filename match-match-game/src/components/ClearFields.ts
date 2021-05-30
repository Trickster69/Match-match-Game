export class ClearFields {
  body: HTMLBodyElement | null | undefined;

  game: HTMLElement | null;

  about: HTMLElement | null;

  score: HTMLElement | null;

  setting: HTMLElement | null;

  victory: HTMLElement | null;

  overlay: NodeListOf<Element>;

  constructor() {
    this.body = document.querySelector('body');
    if (!this.body) throw Error('check body in ClearFields');
    this.game = document.querySelector('.game-container');
    this.about = document.querySelector('.about-container');
    this.score = document.querySelector('.score-container');
    this.setting = document.querySelector('.setting-field');
    this.victory = document.querySelector('.victory-modal');
    this.overlay = document.querySelectorAll('.overlay');

    if (this.body.contains(this.about)) {
      if (!this.about) throw Error('check about in ClearFields');
      this.about.remove();
    }
    if (this.body.contains(this.score)) {
      if (!this.score) throw Error('check score in ClearFields');
      this.score.remove();
    }
    if (this.body.contains(this.setting)) {
      if (!this.setting) throw Error('check setting in ClearFields');
      this.setting.remove();
    }
    if (this.body.contains(this.game)) {
      if (!this.game) throw Error('check game in ClearFields');
      this.game.remove();
    }
    if (this.body.contains(this.victory)) {
      if (!this.victory) throw Error('check victory in ClearFields');
      this.victory.remove();
    }
    if ([...this.overlay].length > 0) {
      this.overlay[0].remove();
    }

    document.querySelectorAll('.btn_setting').forEach((btn) => {
      btn.classList.remove('active');
    });
  }
}
