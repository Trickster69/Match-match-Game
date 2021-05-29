import './GameOverModal.css'

export class GameOverModal {
  looseModal:HTMLDivElement;
  body: HTMLBodyElement|null;
  constructor() {
      this.looseModal = document.createElement('div');
      this.looseModal.classList.add('lose-text');
      this.looseModal.id = 'game-over-text';
      this.looseModal.innerHTML = `
          GAME OVER
      ` ;

      this.body = document.querySelector('body');
      if(!this.body) throw Error('No found body in GameOver Modal')
      this.body.append(this.looseModal);

      this.closeModal();
  }

  closeModal() {
      this.looseModal.addEventListener('click', ()=> this.looseModal.style.display = 'none');
  }
}
