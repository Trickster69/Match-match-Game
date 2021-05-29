export class Card {
  card: HTMLDivElement;
  constructor(image: String, type: String) {
      this.card = document.createElement('div');
      this.card.classList.add('card');
      this.card.classList.add('flipped');
      this.card.innerHTML = `
       <div class="card__back"></div>
       <div class="card__front" style="background-image: url('./assets/${type}/${image}')"></div>
      `;
   }
}
