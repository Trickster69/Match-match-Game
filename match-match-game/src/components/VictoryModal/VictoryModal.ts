import './VictoryModal.css';
import { ScorePage } from '../../pages/ScorePage/ScorePage';
import { AudioController } from '../AudioConterller';

export class VictoryModal {
  score: string | number;

  overlay: HTMLDivElement;

  element: HTMLDivElement;

  cancelBtn: HTMLElement;

  formFeedback: HTMLElement;

  // firstNameInput: HTMLInputElement| null;
  // LastNameInput: HTMLInputElement | null;
  emailInput: HTMLInputElement | null;

  modalFields: HTMLCollectionOf<Element>;

  sendModalButton: HTMLElement;

  CloseBtn: HTMLElement;

  constructor(score: string | number) {
    this.score = score;
    this.overlay = document.createElement('div');
    this.overlay.classList.add('overlay');
    this.element = document.createElement('div');
    this.element.classList.add('victory-modal');
    this.element.innerHTML = `
        <div class="victory-modal__text">Congratulations! <br> You successfully found all matches!</div>
        <div class="victory-modal__score">Score<span id="score">${this.score}</span></div>

        <div class="register-form">
            <form method="POST
            " id = "register-form__form" action="">
                <div class="register-form__title">Please register:</div>

                <div class="register-form__name first_name">
                    <p class="register-form__name-input">First name:</p>
                    <input name="name" id="input" type = "text" placeholder
                    ="Ellie" class="register-form__input" type="text" required >
                </div>

                <div class="register-form__name last_name">
                    <p class="register-form__name-input">Last name:</p>
                    <input name="last_name" id="input" type = "text" placeholder
                    ="Coward" class="register-form__input" type="text" required >
                </div>

                <div class="register-form__email">
                    <p class="register-form__name-input">Your e-mail:</p>
                    <input name="email" id="input" type = "email" placeholder
                    ="example@gmail.com" class="register-form__input email_input" type="text" required >
                </div>

                <div class="register-form__buttons">
                    <input type="submit" class="register-form__send-button form_btn" value="Add to score"></input>
                    <div class="register-form__close-modal form_btn">Cancel</div>
                </div>

            </form>
        </div>
        `;
    (document.querySelector('body') as HTMLBodyElement).append(this.overlay);
    (document.querySelector('body') as HTMLBodyElement).append(this.element);

    this.cancelBtn = document.querySelector(
      '.register-form__close-modal',
    ) as HTMLElement;
    this.formFeedback = document.querySelector(
      '#register-form__form',
    ) as HTMLElement;

    // this.firstNameInput = document.querySelector('.first_name').querySelector('input');

    // this.LastNameInput = document.querySelector('.last_name').querySelector('input'),
    this.emailInput = (document.querySelector('.email_input'));
    this.modalFields = document.getElementsByClassName('register-form__input');
    this.sendModalButton = (document.querySelector('.register-form__send-button') as HTMLElement);
    this.CloseBtn = (document.querySelector('.register-form__close-modal') as HTMLElement);

    this.showModal();
    this.closeModal();
    this.checkInputValue(
      (document.querySelector('.first_name') as HTMLElement).querySelector(
        'input',
      ),
    );
    this.checkInputValue(
      (document.querySelector('.last_name') as HTMLElement).querySelector(
        'input',
      ),
    );
    this.activeButton();
    this.indexedBd();
  }

  closeModal = () => {
    (
      document.querySelector('.register-form__close-modal') as HTMLElement
    ).addEventListener('click', () => {
      (document.querySelector('.overlay ') as HTMLElement).classList.remove(
        'visible',
      );
      (
        document.querySelector('.victory-modal') as HTMLElement
      ).classList.remove('visible');
      (document.querySelector('body') as HTMLElement).classList.remove(
        'victory',
      );
    });

    (document.querySelector('.overlay') as HTMLElement).addEventListener(
      'click',
      () => {
        (document.querySelector('.overlay ') as HTMLElement).classList.remove(
          'visible',
        );
        (
          document.querySelector('.victory-modal') as HTMLElement
        ).classList.remove('visible');
        (document.querySelector('body') as HTMLElement).classList.remove(
          'victory',
        );
      },
    );
  };

  showModal = () => {
    (document.querySelector('.overlay') as HTMLElement).classList.add(
      'visible',
    );
    (document.querySelector('.victory-modal') as HTMLElement).classList.add(
      'visible',
    );
    (document.querySelector('body') as HTMLElement).classList.add('victory');
  };

  checkInputValue = (element: HTMLInputElement | null) => {
    const patternSymb = new RegExp(/[~!@#$%*()_—+=|:;"'`<>,.?/^]/);
    const regNumsOnly = new RegExp('^\\d+$');

    if (!element) throw Error('check Argument in checkInputValue VicoryModel');
    element.addEventListener('keyup', () => {
      if (
        !patternSymb.test(element.value)
        && !regNumsOnly.test(element.value)
        && element.value.length > 0
        && element.value.length < 30
        && element.value.trim().length > 0
      ) {
        this.validInput(element);
      } else {
        this.noValidInput(element);
      }
    });

    if (!this.emailInput) throw Error('check emailInput in checkInputValue VicoryModel class');
    this.emailInput.addEventListener('keyup', () => {
      if (!this.emailInput) throw Error('check emailInput in checkInputValue VicoryModel class');
      if (this.emailInput.validity.valid && element.value.length > 0 && element.value.length < 30) {
        this.validInput(this.emailInput);
      } else {
        this.noValidInput(this.emailInput);
      }
    });
  };

  validInput = (element: HTMLElement) => {
    element.style.borderBottom = '2px solid #16ea09';
    element.classList.add('valid');
  };

  activeSendBtn() {
    this.sendModalButton.removeAttribute('disabled');
    this.sendModalButton.style.color = '#d3ad21';
  }

  disabledSendBtn() {
    this.sendModalButton.setAttribute('disabled', 'disabled');
    this.sendModalButton.style.color = '#a8afb6';
  }

  noValidInput = (element: HTMLElement) => {
    element.style.borderBottom = '2px solid #ea0909';
    element.classList.remove('valid');
  };

  activeButton() {
    for (let i = 0; i < this.modalFields.length; i++) {
      this.modalFields[i].addEventListener('keyup', () => {
        if (
          [...this.modalFields].every((key) => key.classList.contains('valid'))
        ) {
          this.activeSendBtn();
        } else {
          this.disabledSendBtn();
        }
      });
    }
  }

  indexedBd = () => {
    if (!('indexedDB' in window)) {
      console.warn('IndexedDB not supported');
    } else {
      const request = indexedDB.open('Trickster69');
      request.onupgradeneeded = function () {
        const db = request.result;
        if (!db.objectStoreNames.contains('books')) {
          db.createObjectStore('score', { autoIncrement: true });
        }
      };

      request.onerror = function () {
        console.error('Error', request.error);
      };

      request.onsuccess = function () {
        const db = request.result;

        (document.querySelector('form') as HTMLElement).addEventListener(
          'submit',
          (e) => {
            e.preventDefault();
            const name = (
              document.querySelectorAll(
                '.register-form__input',
              )[0] as HTMLInputElement
            ).value;
            const surname = (
              document.querySelectorAll(
                '.register-form__input',
              )[1] as HTMLInputElement
            ).value;
            const email = (
              document.querySelectorAll(
                '.register-form__input',
              )[2] as HTMLInputElement
            ).value;
            const score = (document.querySelector('#score') as HTMLElement)
              .textContent;
            console.log(name, surname, email, score);

            const transaction = db.transaction('score', 'readwrite');
            const myData = transaction.objectStore('score');
            const result = {
              score,
              name,
              surname,
              email,
            };

            const addScore = myData.put(result);
            console.log(myData.getAll());
            addScore.onsuccess = function () {
              console.log('Результаа записан в базу', addScore.result);
            };

            new ScorePage().renderer();
            new AudioController().clickButton();
          },
        );
      };
    }
  };
}
