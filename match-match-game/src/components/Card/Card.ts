import './Card.css'
export class Card {
  card: HTMLElement;
  // card: HTMLDivElement;
  constructor(image: string, type: string | null | undefined) {
      this.card = document.createElement('div');
      this.card.classList.add('card');
      this.card.classList.add('flipped');
      this.card.innerHTML = `
       <div class="card__back"></div>
       <div class="card__front" style="background-image: url('./images/${type}/${image}')"></div>
      `;
   }
}
