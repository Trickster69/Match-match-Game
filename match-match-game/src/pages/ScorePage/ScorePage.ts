import './ScorePage.css'
import {ClearFields} from "../../components/ClearFields";

export class ScorePage {
    scoreContainer!: HTMLDivElement;
    body!: HTMLBodyElement | null;

    constructor() {
        // super();

        this.getScoreFromDB();
    }

    getScoreFromDB() {
        let request = indexedDB.open("Trickster69");
        request.onerror = function() {
            console.log("error: ");
          };

        request.onsuccess = function() {

            let db = request.result;
            let transaction = db.transaction("score", "readwrite");
            let myData = transaction.objectStore("score");


            let getScores = myData.getAll();

            getScores.onsuccess = function() { // (4)
                console.log(getScores.result);
                let scoreCount = 0;
                if(getScores.result.length > 10){
                    scoreCount = 10;
                }else {
                    scoreCount = getScores.result.length;
                }

                for (let i = 0; i < scoreCount; i++) {
                    let score = getScores.result[i].score;
                    let name = getScores.result[i].name;
                    let surname = getScores.result[i].surname;
                    let email = getScores.result[i].email;
                    console.log(score,name,surname,email);

                    this.scoreItem = document.createElement('div');
                    this.scoreItem.classList.add('best-score-item');
                    this.scoreItem.innerHTML = `
                    <div class="best-score-item__data">
                        <div class="best-score-item__name">
                            <div class="best-score-item__first-name">${name}</div>
                            <div class="best-score-item__last-name">${surname}</div>
                        </div>
                        <div class="best-score-item__email">${email}</div>
                    </div>
                    <div class="best-score-item__score">Score: <span id="score_table">${score}</span></div>
                    `;
                    this.BestScoreTitle = document.querySelector('.best-score__title')
                    // if(!this.BestScoreTitle) throw Error('check BestScoreTitle in Score Page')
                    this.BestScoreTitle.appendChild(this.scoreItem);
                }
            };
        };

        request.onupgradeneeded = function(event) {
            let db = request.result;
            if (!db.objectStoreNames.contains('books')) {
                db.createObjectStore('score', { autoIncrement: true});
            }
       }
    }

    renderer() {
        this.scoreContainer = document.createElement('div');
        this.scoreContainer.classList.add('score-container');
        this.scoreContainer.innerHTML = `
            <div class="best-score">
            <div class="best-score__title">Best players:</div>

            </div>
        `;
        this.body = document.querySelector('body');
        if(!this.body) throw Error('No found body in GameOver Modal')
        this.body.appendChild(this.scoreContainer);
        (document.querySelector('.header__score-btn') as HTMLDivElement).classList.add('active');
    }



}
