import './ScorePage.css';
import { ClearFields } from '../../components/ClearFields';

export class ScorePage extends ClearFields {
  body: HTMLBodyElement | null | undefined;

  scoreContainer: HTMLDivElement | undefined;

  scoreItem: HTMLDivElement | undefined;

  constructor() {
    super();
    this.getScoreFromDB();
  }

  getScoreFromDB = () => {
    const request = indexedDB.open('Trickster69');
    request.onerror = function (event) {
      console.log('error: ');
    };

    request.onsuccess = function (event) {
      const db = request.result;
      const transaction = db.transaction('score', 'readwrite');
      const myData = transaction.objectStore('score');

      const getScores = myData.getAll();

      getScores.onsuccess = function () {
        // (4)
        console.log(getScores.result);
        let scoreCount = 0;
        if (getScores.result.length > 10) {
          scoreCount = 10;
        } else {
          scoreCount = getScores.result.length;
        }

        for (let i = 0; i < scoreCount; i++) {
          const {
            score, name, surname, email,
           } = getScores.result[i];
          // const score = getScores.result[i].score;
          // const name = getScores.result[i].name;
          // const surname = getScores.result[i].surname;
          // const email = getScores.result[i].email;
          console.log(score, name, surname, email);

          const scoreItem = document.createElement('div');
          scoreItem.classList.add('best-score-item');
          scoreItem.innerHTML = `
              <div class="best-score-item__data">
                  <div class="best-score-item__name">
                      <div class="best-score-item__first-name">${name}</div>
                      <div class="best-score-item__last-name">${surname}</div>
                  </div>
                  <div class="best-score-item__email">${email}</div>
              </div>
              <div class="best-score-item__score">Score: <span id="score_table">${score}</span></div>
              `;
          (
            document.querySelector('.best-score__title') as HTMLElement
          ).appendChild(scoreItem);
        }
      };
    };

    request.onupgradeneeded = function (event) {
      const db = request.result;
      if (!db.objectStoreNames.contains('books')) {
        db.createObjectStore('score', { autoIncrement: true });
      }
    };
  };

  renderer() {
    this.scoreContainer = document.createElement('div');
    this.scoreContainer.classList.add('score-container');
    this.scoreContainer.innerHTML = `
          <div class="best-score">
          <div class="best-score__title">Best players:</div>

          </div>
      `;
    this.body = document.querySelector('body');
    if (!this.body) throw Error('No found body in GameOver Modal');
    this.body.appendChild(this.scoreContainer);
    (
      document.querySelector('.header__score-btn') as HTMLDivElement
    ).classList.add('active');
  }
}
