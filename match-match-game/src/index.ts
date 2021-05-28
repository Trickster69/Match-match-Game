
import './style.css';
// import img from './assets/card-back.png';
// import { MainPage } from './pages/MainPage.ts';
import {AboutPage} from './pages/AboutPage/AboutPage'

window.onload = () => {
  new AboutPage().renderer();
};
